import { TimeBlock, WorkSetting } from "./types";

/**
 * Date Helpers
 * Using native Date to avoid heavy dependencies, keeping it lightweight.
 */

export const getMonday = (d: Date): Date => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const addDays = (d: Date, days: number): Date => {
  const date = new Date(d);
  date.setDate(date.getDate() + days);
  return date;
};

export const formatDateISO = (d: Date): string => {
  return d.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateStr: string): string => {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatTime = (isoString: string): string => {
  const d = new Date(isoString);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// Returns "08:00" format from date object
export const toTimeInputStr = (d: Date): string => {
    return d.toTimeString().slice(0, 5);
};

// Merges a date string "2023-01-01" with time string "14:30"
export const combineDateAndTime = (dateStr: string, timeStr: string): string => {
    return new Date(`${dateStr}T${timeStr}:00`).toISOString();
}

/**
 * ID Generator
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Duration Calculation
 */
export const calculateDurationHours = (startIso: string, endIso: string): number => {
    const start = new Date(startIso).getTime();
    const end = new Date(endIso).getTime();
    return (end - start) / (1000 * 60 * 60);
}

/**
 * Fuzzy Search for Settings
 */
export const searchSettings = (query: string, settings: WorkSetting[]): WorkSetting[] => {
    if (!query) return settings;
    const lowerQuery = query.toLowerCase();

    return settings.filter(s => {
        // High priority: Exact friendly name start
        if (s.friendlyName.toLowerCase().startsWith(lowerQuery)) return true;
        // Medium: Synonyms or label
        if (s.medHubLabel.toLowerCase().includes(lowerQuery)) return true;
        if (s.synonyms.some(syn => syn.toLowerCase().includes(lowerQuery))) return true;
        // Low: Tags
        if (s.tags.some(t => t.toLowerCase().includes(lowerQuery))) return true;
        return false;
    }).sort((a, b) => {
        // Simple prioritization: Favorites first
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return 0;
    });
}

/**
 * Smart Time Parsing
 * Parses natural time input and snaps to 30-minute increments for MedHub compatibility.
 *
 * Supported formats:
 * - "7a", "7A", "7am", "7AM", "7 am" -> "07:00"
 * - "7p", "7P", "7pm", "7PM", "7 pm" -> "19:00"
 * - "7:30a", "7:30 am" -> "07:30"
 * - "5:45p" -> "18:00" (snapped up from 17:45)
 * - "08:00", "8:00" -> "08:00"
 * - "1430", "0800" -> "14:30", "08:00" (military time)
 * - "7" -> "07:00" (assumes AM for 6-11)
 * - "5" -> "17:00" (assumes PM for 1-5)
 */
export const snapTo30Min = (time: string): string => {
    const [h, m] = time.split(':').map(Number);
    let hours = h;
    let mins: number;

    if (m < 15) {
        mins = 0;
    } else if (m < 45) {
        mins = 30;
    } else {
        mins = 0;
        hours = (hours + 1) % 24;
    }

    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const parseTimeInput = (input: string): string | null => {
    const cleaned = input.trim().toLowerCase().replace(/\s+/g, '');

    if (!cleaned) return null;

    // Already valid HH:MM format
    if (/^\d{2}:\d{2}$/.test(cleaned)) {
        return snapTo30Min(cleaned);
    }

    // Military time: "1430" -> "14:30"
    if (/^\d{4}$/.test(cleaned)) {
        const hours = parseInt(cleaned.slice(0, 2), 10);
        const mins = parseInt(cleaned.slice(2), 10);
        if (hours > 23 || mins > 59) return null;
        const raw = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        return snapTo30Min(raw);
    }

    // Natural formats: "7a", "7:30p", "7am", "730pm", "7"
    const match = cleaned.match(/^(\d{1,2}):?(\d{2})?(a|p|am|pm)?$/);
    if (!match) return null;

    let hours = parseInt(match[1], 10);
    const mins = match[2] ? parseInt(match[2], 10) : 0;
    const meridiem = match[3]?.charAt(0);

    // Validate ranges
    if (hours > 23 || mins > 59) return null;
    if (meridiem && hours > 12) return null; // "13pm" is invalid

    // Handle AM/PM
    if (meridiem === 'p' && hours < 12) hours += 12;
    if (meridiem === 'a' && hours === 12) hours = 0;

    // No meridiem: smart defaults for typical resident hours
    // 6-11 without meridiem -> assume AM
    // 1-5 without meridiem -> assume PM
    if (!meridiem) {
        if (hours >= 1 && hours <= 5) hours += 12;
        // 6-11 stays as-is (AM)
        // 12+ stays as-is (already PM in 24hr)
    }

    const timeStr = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    return snapTo30Min(timeStr);
};

/**
 * Format time for display (e.g., "07:00" -> "7:00 AM")
 */
export const formatTimeDisplay = (time: string): string => {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
};