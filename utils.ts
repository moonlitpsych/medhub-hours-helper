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