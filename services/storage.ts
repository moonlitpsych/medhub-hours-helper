import { WeekSchedule, WeeklyTemplate, WorkSetting, UserId } from "../types";
import { SEED_SETTINGS } from "../data/seeds";
import { formatDateISO, generateId, getMonday } from "../utils";

const KEYS = {
    SETTINGS: 'medhub_settings',
    TEMPLATES: 'medhub_templates',
    SCHEDULES: 'medhub_schedules',
};

// Initialize
if (!localStorage.getItem(KEYS.SETTINGS)) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(SEED_SETTINGS));
}

export const StorageService = {
    getSettings: (): WorkSetting[] => {
        const stored = localStorage.getItem(KEYS.SETTINGS);
        return stored ? JSON.parse(stored) : SEED_SETTINGS;
    },

    getTemplates: (userId: UserId): WeeklyTemplate[] => {
        const stored = localStorage.getItem(KEYS.TEMPLATES);
        const templates: WeeklyTemplate[] = stored ? JSON.parse(stored) : [];
        return templates.filter(t => t.userId === userId);
    },

    saveTemplate: (template: WeeklyTemplate): void => {
        const stored = localStorage.getItem(KEYS.TEMPLATES);
        const templates: WeeklyTemplate[] = stored ? JSON.parse(stored) : [];
        // update if exists, else add
        const idx = templates.findIndex(t => t.id === template.id);
        if (idx >= 0) {
            templates[idx] = template;
        } else {
            templates.push(template);
        }
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(templates));
    },

    deleteTemplate: (id: string): void => {
        const stored = localStorage.getItem(KEYS.TEMPLATES);
        if(!stored) return;
        const templates: WeeklyTemplate[] = JSON.parse(stored);
        const filtered = templates.filter(t => t.id !== id);
        localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(filtered));
    },

    getWeekSchedule: (userId: UserId, weekStart: Date): WeekSchedule => {
        const dateKey = formatDateISO(weekStart); // Ensure we look up by Monday date
        const stored = localStorage.getItem(KEYS.SCHEDULES);
        const allSchedules: Record<string, WeekSchedule> = stored ? JSON.parse(stored) : {};
        
        const scheduleKey = `${userId}_${dateKey}`;
        
        if (allSchedules[scheduleKey]) {
            return allSchedules[scheduleKey];
        }

        // Return empty structure if not found
        return {
            id: generateId(),
            userId,
            weekStartDate: dateKey,
            source: 'manual',
            days: Array.from({ length: 7 }).map((_, i) => {
                const d = new Date(weekStart);
                d.setDate(d.getDate() + i);
                return {
                    date: formatDateISO(d),
                    blocks: []
                };
            })
        };
    },

    saveWeekSchedule: (schedule: WeekSchedule): void => {
        const stored = localStorage.getItem(KEYS.SCHEDULES);
        const allSchedules: Record<string, WeekSchedule> = stored ? JSON.parse(stored) : {};
        const scheduleKey = `${schedule.userId}_${schedule.weekStartDate}`;
        allSchedules[scheduleKey] = schedule;
        localStorage.setItem(KEYS.SCHEDULES, JSON.stringify(allSchedules));
    }
};