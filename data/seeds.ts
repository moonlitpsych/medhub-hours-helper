import { WorkSetting } from "../types";

export const SEED_SETTINGS: WorkSetting[] = [
  {
    id: "hmhi_inpatient",
    medHubCode: "101",
    medHubLabel: "UNI - Adult Inpatient",
    friendlyName: "HMHI Adult Inpatient",
    synonyms: ["HMHI", "UNI", "psych ward"],
    tags: ["inpatient", "psych"],
    isFavorite: true
  },
  {
    id: "va_consults",
    medHubCode: "205",
    medHubLabel: "VAMC - Consult Liaison",
    friendlyName: "VA Consults",
    synonyms: ["VA", "CL", "consults"],
    tags: ["consults", "va"],
    isFavorite: true
  },
  {
    id: "umc_er",
    medHubCode: "300",
    medHubLabel: "UUH - Emergency Psychiatry",
    friendlyName: "U of U ER Psych",
    synonyms: ["ER", "ED", "emergency"],
    tags: ["emergency", "uuh"],
  },
  {
    id: "res_clinic",
    medHubCode: "401",
    medHubLabel: "UUH - Resident Continuity Clinic",
    friendlyName: "Resident Clinic (Outpatient)",
    synonyms: ["clinic", "outpatient", "continuity"],
    tags: ["outpatient", "clinic"],
    isFavorite: true
  },
  {
    id: "didactics",
    medHubCode: "900",
    medHubLabel: "Didactics / Conference",
    friendlyName: "Didactics",
    synonyms: ["class", "lecture", "grand rounds"],
    tags: ["education"],
  },
  {
      id: "admin",
      medHubCode: "999",
      medHubLabel: "Administrative / Research",
      friendlyName: "Admin/Research Time",
      synonyms: ["research", "admin"],
      tags: ["admin"]
  }
];

export const CURRENT_USER_ID = "resident_001";