// Identity Types
export type UserId = string;
export type MedHubSettingId = string;

// Core Entities

export interface WorkSetting {
  id: MedHubSettingId;
  medHubCode: string;      // Raw code / ID used in API
  medHubLabel: string;     // Exact label as shown in MedHub
  friendlyName: string;    // "UofU Psych Inpatient - HMHI"
  synonyms: string[];      // ["HMHI", "inpatient psych", ...]
  tags: string[];          // ["inpatient", "psychiatry", "HMHI"]
  isFavorite?: boolean;
}

export type TimeBlockType = "standard" | "moonlighting" | "home_call" | "remote_work";

export interface TimeBlock {
  id: string; // Added for UI keying
  start: string;           // ISO time with date: "2025-11-23T08:00:00-07:00"
  end: string;             // same
  workSettingId: MedHubSettingId;
  type: TimeBlockType;
}

export interface DayEntry {
  date: string;            // ISO date "2025-11-23"
  blocks: TimeBlock[];
  notes?: string;
}

export interface WeekSchedule {
  id: string;
  userId: UserId;
  weekStartDate: string;   // Monday (or institution’s week start)
  days: DayEntry[];
  source: "template" | "manual" | "imported";
}

export interface WeeklyTemplate {
  id: string;
  userId: UserId;
  name: string;            // "PGY3 HMHI + RL outpatient"
  baseWeek: WeekSchedule;  // WeekSchedule where weekStartDate is just a reference
  createdAt: string;
  updatedAt: string;
}

// UI specific helper types
export interface ViewState {
    currentWeekStart: Date;
    isEditingBlock: boolean;
    isTemplateModalOpen: boolean;
    isExportModalOpen: boolean;
    activeDayIndex: number | null; // If adding a block, which day index (0-6)
    editingBlockId: string | null; // If editing existing
}