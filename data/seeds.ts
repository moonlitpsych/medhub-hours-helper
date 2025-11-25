import { WorkSetting } from "../types";

/**
 * University of Utah Psychiatry Residency - MedHub Clinical Settings
 *
 * Organized by location prefix:
 * - HMHI: Huntsman Mental Health Institute
 * - VA: VA Medical Center (Salt Lake)
 * - UH: University Hospital
 * - MHI: Utah State Hospital (Mental Health Institute)
 * - ID: Intermountain/Idaho locations
 * - Davis: Davis County
 * - etc.
 */

export const SEED_SETTINGS: WorkSetting[] = [
  // ============================================
  // HMHI - Huntsman Mental Health Institute
  // ============================================
  {
    id: "hmhi_cccbh",
    medHubCode: "HMHI CCCBH",
    medHubLabel: "HMHI CCCBH",
    friendlyName: "HMHI - Crisis Care Center / BH",
    synonyms: ["crisis", "ccc", "behavioral health", "emergency"],
    tags: ["hmhi", "crisis", "emergency"],
    isFavorite: true
  },
  {
    id: "hmhi_chief",
    medHubCode: "HMHI CHIEF",
    medHubLabel: "HMHI CHIEF",
    friendlyName: "HMHI - Chief Resident",
    synonyms: ["chief", "admin", "leadership"],
    tags: ["hmhi", "admin", "chief"],
  },
  {
    id: "hmhi_child",
    medHubCode: "HMHI CHILD",
    medHubLabel: "HMHI CHILD",
    friendlyName: "HMHI - Child & Adolescent",
    synonyms: ["peds", "pediatric", "child", "adolescent", "CAP"],
    tags: ["hmhi", "child", "inpatient"],
    isFavorite: true
  },
  {
    id: "hmhi_cop",
    medHubCode: "HMHI COP",
    medHubLabel: "HMHI COP",
    friendlyName: "HMHI - COP (Community Outreach)",
    synonyms: ["cop", "community", "outreach", "outpatient"],
    tags: ["hmhi", "outpatient", "community"],
  },
  {
    id: "hmhi_ect",
    medHubCode: "HMHI ECT",
    medHubLabel: "HMHI ECT",
    friendlyName: "HMHI - ECT Service",
    synonyms: ["ect", "electroconvulsive", "neuromodulation"],
    tags: ["hmhi", "ect", "procedure"],
  },
  {
    id: "hmhi_geri",
    medHubCode: "HMHI GERI",
    medHubLabel: "HMHI GERI",
    friendlyName: "HMHI - Geriatric Psychiatry",
    synonyms: ["geri", "geriatric", "elderly", "older adult"],
    tags: ["hmhi", "geriatric", "inpatient"],
  },
  {
    id: "hmhi_group",
    medHubCode: "HMHI GROUP",
    medHubLabel: "HMHI GROUP",
    friendlyName: "HMHI - Group Therapy",
    synonyms: ["group", "therapy", "groups"],
    tags: ["hmhi", "therapy", "outpatient"],
  },
  {
    id: "hmhi_home",
    medHubCode: "HMHI HOME",
    medHubLabel: "HMHI HOME",
    friendlyName: "HMHI - Home Call",
    synonyms: ["home", "call", "on-call"],
    tags: ["hmhi", "call"],
  },
  {
    id: "hmhi_ic",
    medHubCode: "HMHI IC",
    medHubLabel: "HMHI IC",
    friendlyName: "HMHI - Intensive Care / ICU Consults",
    synonyms: ["ic", "icu", "intensive", "consult"],
    tags: ["hmhi", "consult", "icu"],
  },
  {
    id: "hmhi_jr_ip",
    medHubCode: "HMHI JR IP",
    medHubLabel: "HMHI JR IP",
    friendlyName: "HMHI - Junior Resident Inpatient",
    synonyms: ["junior", "inpatient", "jr", "pgy1", "pgy2", "intern"],
    tags: ["hmhi", "inpatient", "junior"],
    isFavorite: true
  },
  {
    id: "hmhi_jr_op",
    medHubCode: "HMHI JR OP",
    medHubLabel: "HMHI JR OP",
    friendlyName: "HMHI - Junior Resident Outpatient",
    synonyms: ["junior", "outpatient", "jr", "clinic"],
    tags: ["hmhi", "outpatient", "junior"],
  },
  {
    id: "hmhi_kit",
    medHubCode: "HMHI KIT",
    medHubLabel: "HMHI KIT",
    friendlyName: "HMHI - KIT (Keep In Touch?)",
    synonyms: ["kit"],
    tags: ["hmhi"],
  },
  {
    id: "hmhi_mi",
    medHubCode: "HMHI MI",
    medHubLabel: "HMHI MI",
    friendlyName: "HMHI - Motivational Interviewing",
    synonyms: ["mi", "motivational", "interviewing"],
    tags: ["hmhi", "therapy"],
  },
  {
    id: "hmhi_php",
    medHubCode: "HMHI PHP",
    medHubLabel: "HMHI PHP",
    friendlyName: "HMHI - Partial Hospital Program",
    synonyms: ["php", "partial", "day program"],
    tags: ["hmhi", "partial", "outpatient"],
  },
  {
    id: "hmhi_ptx",
    medHubCode: "HMHI PTX",
    medHubLabel: "HMHI PTX",
    friendlyName: "HMHI - Psychotherapy",
    synonyms: ["ptx", "psychotherapy", "therapy"],
    tags: ["hmhi", "therapy", "outpatient"],
  },
  {
    id: "hmhi_rc",
    medHubCode: "HMHI RC",
    medHubLabel: "HMHI RC",
    friendlyName: "HMHI - Resident Clinic (Continuity)",
    synonyms: ["rc", "resident clinic", "continuity", "outpatient"],
    tags: ["hmhi", "clinic", "outpatient"],
    isFavorite: true
  },
  {
    id: "hmhi_tstss",
    medHubCode: "HMHI TSTSS",
    medHubLabel: "HMHI TSTSS",
    friendlyName: "HMHI - Trauma / PTSD Service",
    synonyms: ["trauma", "ptsd", "tstss"],
    tags: ["hmhi", "trauma", "specialty"],
  },
  {
    id: "hmhi_ycat",
    medHubCode: "HMHI YCAT",
    medHubLabel: "HMHI YCAT",
    friendlyName: "HMHI - Youth Crisis Assessment Team",
    synonyms: ["ycat", "youth", "crisis", "adolescent"],
    tags: ["hmhi", "crisis", "child"],
  },

  // ============================================
  // VA - VA Medical Center (Salt Lake City)
  // ============================================
  {
    id: "va_cl",
    medHubCode: "VA CL",
    medHubLabel: "VA CL",
    friendlyName: "VA - Consult Liaison",
    synonyms: ["va", "cl", "consult", "liaison", "med psych"],
    tags: ["va", "consult"],
    isFavorite: true
  },
  {
    id: "va_cloz",
    medHubCode: "VA CLOZ",
    medHubLabel: "VA CLOZ",
    friendlyName: "VA - Clozapine Clinic",
    synonyms: ["clozapine", "cloz", "clozaril"],
    tags: ["va", "clinic", "specialty"],
  },
  {
    id: "va_couples",
    medHubCode: "VA COUPLES",
    medHubLabel: "VA COUPLES",
    friendlyName: "VA - Couples Therapy",
    synonyms: ["couples", "marriage", "family"],
    tags: ["va", "therapy"],
  },
  {
    id: "va_ect",
    medHubCode: "VA ECT",
    medHubLabel: "VA ECT",
    friendlyName: "VA - ECT Service",
    synonyms: ["ect", "electroconvulsive"],
    tags: ["va", "ect", "procedure"],
  },
  {
    id: "va_geri",
    medHubCode: "VA GERI",
    medHubLabel: "VA GERI",
    friendlyName: "VA - Geriatric Psychiatry",
    synonyms: ["geri", "geriatric", "elderly"],
    tags: ["va", "geriatric"],
  },
  {
    id: "va_ipu",
    medHubCode: "VA IPU",
    medHubLabel: "VA IPU",
    friendlyName: "VA - Inpatient Unit",
    synonyms: ["inpatient", "ipu", "unit", "ward"],
    tags: ["va", "inpatient"],
    isFavorite: true
  },
  {
    id: "va_jr_ip",
    medHubCode: "VA JR IP",
    medHubLabel: "VA JR IP",
    friendlyName: "VA - Junior Resident Inpatient",
    synonyms: ["junior", "inpatient", "jr"],
    tags: ["va", "inpatient", "junior"],
  },
  {
    id: "va_orient",
    medHubCode: "VA ORIENT",
    medHubLabel: "VA ORIENT",
    friendlyName: "VA - Orientation",
    synonyms: ["orientation", "orient", "onboarding"],
    tags: ["va", "admin"],
  },
  {
    id: "va_pcmhi",
    medHubCode: "VA PCMHI",
    medHubLabel: "VA PCMHI",
    friendlyName: "VA - Primary Care Mental Health Integration",
    synonyms: ["pcmhi", "primary care", "integrated", "collab care"],
    tags: ["va", "primary care", "outpatient"],
  },
  {
    id: "va_ptsd",
    medHubCode: "VA PTSD",
    medHubLabel: "VA PTSD",
    friendlyName: "VA - PTSD Clinic",
    synonyms: ["ptsd", "trauma", "veteran"],
    tags: ["va", "trauma", "specialty"],
  },
  {
    id: "va_rcc",
    medHubCode: "VA RCC",
    medHubLabel: "VA RCC",
    friendlyName: "VA - Residential Care / Rehab",
    synonyms: ["rcc", "residential", "rehab"],
    tags: ["va", "residential"],
  },
  {
    id: "va_saartp",
    medHubCode: "VA SAARTP",
    medHubLabel: "VA SAARTP",
    friendlyName: "VA - Substance Abuse / Addiction (SAARTP)",
    synonyms: ["saartp", "substance", "addiction", "sud", "rehab"],
    tags: ["va", "addiction", "residential"],
  },
  {
    id: "va_soar",
    medHubCode: "VA SOAR",
    medHubLabel: "VA SOAR",
    friendlyName: "VA - SOAR Program",
    synonyms: ["soar"],
    tags: ["va", "program"],
  },
  {
    id: "va_subox",
    medHubCode: "VA SUBOX",
    medHubLabel: "VA SUBOX",
    friendlyName: "VA - Suboxone / MAT Clinic",
    synonyms: ["suboxone", "subox", "mat", "buprenorphine", "opioid"],
    tags: ["va", "addiction", "mat"],
  },
  {
    id: "voa_ccc",
    medHubCode: "VOA CCC",
    medHubLabel: "VOA CCC",
    friendlyName: "VOA - Community Care Center",
    synonyms: ["voa", "volunteers of america", "community"],
    tags: ["va", "community"],
  },

  // ============================================
  // UH - University Hospital
  // ============================================
  {
    id: "uh_add_cl",
    medHubCode: "UH ADD CL",
    medHubLabel: "UH ADD CL",
    friendlyName: "UH - Addiction Clinic",
    synonyms: ["addiction", "add", "sud", "substance"],
    tags: ["uh", "addiction", "outpatient"],
  },
  {
    id: "uh_bhidc",
    medHubCode: "UH BHIDC",
    medHubLabel: "UH BHIDC",
    friendlyName: "UH - Behavioral Health IDC",
    synonyms: ["bhidc", "behavioral health", "idc"],
    tags: ["uh", "behavioral health"],
  },
  {
    id: "uh_cl",
    medHubCode: "UH CL",
    medHubLabel: "UH CL",
    friendlyName: "UH - Consult Liaison",
    synonyms: ["cl", "consult", "liaison", "med psych"],
    tags: ["uh", "consult"],
    isFavorite: true
  },
  {
    id: "uh_de",
    medHubCode: "UH DE",
    medHubLabel: "UH DE",
    friendlyName: "UH - Diagnostic Evaluation",
    synonyms: ["de", "diagnostic", "evaluation", "assessment"],
    tags: ["uh", "assessment"],
  },
  {
    id: "uh_ect",
    medHubCode: "UH ECT",
    medHubLabel: "UH ECT",
    friendlyName: "UH - ECT Service",
    synonyms: ["ect", "electroconvulsive"],
    tags: ["uh", "ect", "procedure"],
  },
  {
    id: "uh_for",
    medHubCode: "UH FOR",
    medHubLabel: "UH FOR",
    friendlyName: "UH - Forensic Psychiatry",
    synonyms: ["forensic", "for", "legal", "court"],
    tags: ["uh", "forensic"],
  },
  {
    id: "uh_geri",
    medHubCode: "UH GERI",
    medHubLabel: "UH GERI",
    friendlyName: "UH - Geriatric Psychiatry",
    synonyms: ["geri", "geriatric", "elderly"],
    tags: ["uh", "geriatric"],
  },
  {
    id: "uh_ioc",
    medHubCode: "UH IOC",
    medHubLabel: "UH IOC",
    friendlyName: "UH - Intensive Outpatient Care",
    synonyms: ["ioc", "intensive", "outpatient", "iop"],
    tags: ["uh", "intensive", "outpatient"],
  },
  {
    id: "uh_mst",
    medHubCode: "UH MST",
    medHubLabel: "UH MST",
    friendlyName: "UH - Medical Student Teaching",
    synonyms: ["mst", "teaching", "medical student", "education"],
    tags: ["uh", "education"],
  },
  {
    id: "uh_mvmt",
    medHubCode: "UH MVMT",
    medHubLabel: "UH MVMT",
    friendlyName: "UH - Movement Disorders",
    synonyms: ["movement", "mvmt", "tardive", "eps"],
    tags: ["uh", "specialty"],
  },
  {
    id: "uh_ncog",
    medHubCode: "UH NCOG",
    medHubLabel: "UH NCOG",
    friendlyName: "UH - Neurocognitive / Neuropsych",
    synonyms: ["ncog", "neurocognitive", "neuropsych", "dementia"],
    tags: ["uh", "neuropsych"],
  },
  {
    id: "uh_res",
    medHubCode: "UH RES",
    medHubLabel: "UH RES",
    friendlyName: "UH - Research",
    synonyms: ["research", "res", "study"],
    tags: ["uh", "research"],
  },
  {
    id: "uh_sleep",
    medHubCode: "UH SLEEP",
    medHubLabel: "UH SLEEP",
    friendlyName: "UH - Sleep Medicine",
    synonyms: ["sleep", "insomnia"],
    tags: ["uh", "sleep", "specialty"],
  },
  {
    id: "uh_superad",
    medHubCode: "UH SUPeRAD",
    medHubLabel: "UH SUPeRAD",
    friendlyName: "UH - SUPeRAD Program",
    synonyms: ["superad", "perinatal", "reproductive"],
    tags: ["uh", "specialty"],
  },
  {
    id: "uh_trmd",
    medHubCode: "UH TRMD",
    medHubLabel: "UH TRMD",
    friendlyName: "UH - Treatment Resistant / TRD",
    synonyms: ["trmd", "trd", "treatment resistant", "refractory"],
    tags: ["uh", "specialty"],
  },

  // ============================================
  // MHI - Utah State Hospital (Mental Health Institute)
  // ============================================
  {
    id: "mhi_center",
    medHubCode: "MHI CENTER",
    medHubLabel: "MHI CENTER",
    friendlyName: "State Hospital - Center Unit",
    synonyms: ["state hospital", "mhi", "center"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_cocm",
    medHubCode: "MHI COCM",
    medHubLabel: "MHI COCM",
    friendlyName: "State Hospital - COCM",
    synonyms: ["cocm", "state hospital"],
    tags: ["mhi", "state"],
  },
  {
    id: "mhi_farm",
    medHubCode: "MHI Farm",
    medHubLabel: "MHI Farm",
    friendlyName: "State Hospital - Farm Unit",
    synonyms: ["farm", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_green",
    medHubCode: "MHI GREEN",
    medHubLabel: "MHI GREEN",
    friendlyName: "State Hospital - Green Unit",
    synonyms: ["green", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_mad_fm",
    medHubCode: "MHI MAD FM",
    medHubLabel: "MHI MAD FM",
    friendlyName: "State Hospital - MAD Female",
    synonyms: ["mad", "female", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_mad_sh",
    medHubCode: "MHI MAD SH",
    medHubLabel: "MHI MAD SH",
    friendlyName: "State Hospital - MAD (Short Stay)",
    synonyms: ["mad", "short stay", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_red",
    medHubCode: "MHI RED",
    medHubLabel: "MHI RED",
    friendlyName: "State Hospital - Red Unit",
    synonyms: ["red", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_sojo",
    medHubCode: "MHI SOJO",
    medHubLabel: "MHI SOJO",
    friendlyName: "State Hospital - South Jordan",
    synonyms: ["sojo", "south jordan", "state hospital"],
    tags: ["mhi", "state"],
  },
  {
    id: "mhi_stans",
    medHubCode: "MHI STANS",
    medHubLabel: "MHI STANS",
    friendlyName: "State Hospital - Stansbury",
    synonyms: ["stansbury", "stans", "state hospital"],
    tags: ["mhi", "state"],
  },
  {
    id: "mhi_sugar",
    medHubCode: "MHI SUGAR",
    medHubLabel: "MHI SUGAR",
    friendlyName: "State Hospital - Sugar House",
    synonyms: ["sugar house", "sugar", "state hospital"],
    tags: ["mhi", "state"],
  },
  {
    id: "mhi_west",
    medHubCode: "MHI WEST",
    medHubLabel: "MHI WEST",
    friendlyName: "State Hospital - West Unit",
    synonyms: ["west", "state hospital"],
    tags: ["mhi", "inpatient", "state"],
  },
  {
    id: "mhi_wstrdg",
    medHubCode: "MHI WSTRDG",
    medHubLabel: "MHI WSTRDG",
    friendlyName: "State Hospital - West Ridge",
    synonyms: ["west ridge", "wstrdg", "state hospital"],
    tags: ["mhi", "state"],
  },

  // ============================================
  // ID - Intermountain / Community Sites
  // ============================================
  {
    id: "id_chc",
    medHubCode: "ID CHC",
    medHubLabel: "ID CHC",
    friendlyName: "Intermountain - Community Health Center",
    synonyms: ["chc", "community health", "intermountain"],
    tags: ["intermountain", "community"],
  },
  {
    id: "id_chief",
    medHubCode: "ID CHIEF",
    medHubLabel: "ID CHIEF",
    friendlyName: "Intermountain - Chief Duties",
    synonyms: ["chief", "intermountain"],
    tags: ["intermountain", "admin"],
  },
  {
    id: "id_cl",
    medHubCode: "ID CL",
    medHubLabel: "ID CL",
    friendlyName: "Intermountain - Consult Liaison",
    synonyms: ["cl", "consult", "intermountain"],
    tags: ["intermountain", "consult"],
  },
  {
    id: "id_cmh",
    medHubCode: "ID CMH",
    medHubLabel: "ID CMH",
    friendlyName: "Intermountain - Community Mental Health",
    synonyms: ["cmh", "community", "intermountain"],
    tags: ["intermountain", "community"],
  },
  {
    id: "id_cpc",
    medHubCode: "ID CPC",
    medHubLabel: "ID CPC",
    friendlyName: "Intermountain - CPC",
    synonyms: ["cpc", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_hiv_hw",
    medHubCode: "ID HIV HW",
    medHubLabel: "ID HIV HW",
    friendlyName: "Intermountain - HIV Health & Wellness",
    synonyms: ["hiv", "health wellness", "intermountain"],
    tags: ["intermountain", "specialty"],
  },
  {
    id: "id_mat_hw",
    medHubCode: "ID MAT HW",
    medHubLabel: "ID MAT HW",
    friendlyName: "Intermountain - MAT / Health & Wellness",
    synonyms: ["mat", "medication assisted", "intermountain"],
    tags: ["intermountain", "addiction"],
  },
  {
    id: "id_mhi_hw",
    medHubCode: "ID MHI HW",
    medHubLabel: "ID MHI HW",
    friendlyName: "Intermountain - Mental Health / Wellness",
    synonyms: ["mhi", "mental health", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_mhs",
    medHubCode: "ID MHS",
    medHubLabel: "ID MHS",
    friendlyName: "Intermountain - Mental Health Services",
    synonyms: ["mhs", "mental health", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_ncmc",
    medHubCode: "ID NCMC",
    medHubLabel: "ID NCMC",
    friendlyName: "Intermountain - NCMC",
    synonyms: ["ncmc", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_pfc",
    medHubCode: "ID PFC",
    medHubLabel: "ID PFC",
    friendlyName: "Intermountain - PFC",
    synonyms: ["pfc", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_prison",
    medHubCode: "ID PRISON",
    medHubLabel: "ID PRISON",
    friendlyName: "Intermountain - Prison / Correctional",
    synonyms: ["prison", "correctional", "jail", "intermountain"],
    tags: ["intermountain", "forensic"],
  },
  {
    id: "id_pvfc_tx",
    medHubCode: "ID PVFC TX",
    medHubLabel: "ID PVFC TX",
    friendlyName: "Intermountain - PVFC Texas?",
    synonyms: ["pvfc", "texas", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_res",
    medHubCode: "ID RES",
    medHubLabel: "ID RES",
    friendlyName: "Intermountain - Research",
    synonyms: ["research", "intermountain"],
    tags: ["intermountain", "research"],
  },
  {
    id: "id_shs",
    medHubCode: "ID SHS",
    medHubLabel: "ID SHS",
    friendlyName: "Intermountain - Student Health Services",
    synonyms: ["shs", "student health", "intermountain"],
    tags: ["intermountain", "student"],
  },
  {
    id: "id_th",
    medHubCode: "ID TH",
    medHubLabel: "ID TH",
    friendlyName: "Intermountain - Telehealth",
    synonyms: ["telehealth", "th", "virtual", "intermountain"],
    tags: ["intermountain", "telehealth"],
  },
  {
    id: "id_uh",
    medHubCode: "ID UH",
    medHubLabel: "ID UH",
    friendlyName: "Intermountain - UH Site",
    synonyms: ["uh", "intermountain"],
    tags: ["intermountain"],
  },
  {
    id: "id_va_geri",
    medHubCode: "ID VA GERI",
    medHubLabel: "ID VA GERI",
    friendlyName: "Intermountain - VA Geriatrics",
    synonyms: ["va", "geri", "geriatric", "intermountain"],
    tags: ["intermountain", "va", "geriatric"],
  },
  {
    id: "id_va_op",
    medHubCode: "ID VA OP",
    medHubLabel: "ID VA OP",
    friendlyName: "Intermountain - VA Outpatient",
    synonyms: ["va", "outpatient", "intermountain"],
    tags: ["intermountain", "va", "outpatient"],
  },
  {
    id: "id_village",
    medHubCode: "ID Village",
    medHubLabel: "ID Village",
    friendlyName: "Intermountain - The Village",
    synonyms: ["village", "intermountain"],
    tags: ["intermountain", "community"],
  },

  // ============================================
  // Davis County
  // ============================================
  {
    id: "davis_bh",
    medHubCode: "DAVIS BH",
    medHubLabel: "DAVIS BH",
    friendlyName: "Davis County - Behavioral Health",
    synonyms: ["davis", "behavioral health", "county"],
    tags: ["davis", "community"],
  },
  {
    id: "davis_cru",
    medHubCode: "Davis CRU",
    medHubLabel: "Davis CRU",
    friendlyName: "Davis County - Crisis Unit",
    synonyms: ["davis", "cru", "crisis"],
    tags: ["davis", "crisis"],
  },

  // ============================================
  // Other Community / Specialty Sites
  // ============================================
  {
    id: "adol_dbt",
    medHubCode: "Adol DBT",
    medHubLabel: "Adol DBT",
    friendlyName: "Adolescent DBT Program",
    synonyms: ["dbt", "adolescent", "dialectical", "borderline"],
    tags: ["dbt", "child", "therapy"],
  },
  {
    id: "adult_dbt",
    medHubCode: "Adult DBT",
    medHubLabel: "Adult DBT",
    friendlyName: "Adult DBT Program",
    synonyms: ["dbt", "adult", "dialectical", "borderline"],
    tags: ["dbt", "therapy"],
  },
  {
    id: "asst_chief",
    medHubCode: "ASST CHIEF",
    medHubLabel: "ASST CHIEF",
    friendlyName: "Assistant Chief Resident",
    synonyms: ["assistant chief", "asst", "leadership"],
    tags: ["admin", "chief"],
  },
  {
    id: "farm_bh",
    medHubCode: "FARM BH",
    medHubLabel: "FARM BH",
    friendlyName: "Farmington - Behavioral Health",
    synonyms: ["farmington", "farm", "behavioral health"],
    tags: ["community", "farmington"],
  },
  {
    id: "hartland",
    medHubCode: "HARTLAND",
    medHubLabel: "HARTLAND",
    friendlyName: "Hartland Clinic",
    synonyms: ["hartland"],
    tags: ["community", "clinic"],
  },
  {
    id: "hci_p_onc",
    medHubCode: "HCI P ONC",
    medHubLabel: "HCI P ONC",
    friendlyName: "Huntsman Cancer - Psycho-Oncology",
    synonyms: ["hci", "huntsman cancer", "oncology", "psycho-oncology"],
    tags: ["hci", "specialty", "oncology"],
  },
  {
    id: "home_cl",
    medHubCode: "HOME CL",
    medHubLabel: "HOME CL",
    friendlyName: "Home Call",
    synonyms: ["home", "call", "on-call"],
    tags: ["call"],
  },
  {
    id: "imc_cl",
    medHubCode: "IMC CL",
    medHubLabel: "IMC CL",
    friendlyName: "IMC - Consult Liaison",
    synonyms: ["imc", "intermountain medical center", "consult"],
    tags: ["imc", "consult"],
  },
  {
    id: "kap_pc",
    medHubCode: "KAP PC",
    medHubLabel: "KAP PC",
    friendlyName: "KAP - Primary Care",
    synonyms: ["kap", "primary care"],
    tags: ["primary care"],
  },
  {
    id: "lbhs",
    medHubCode: "LBHS",
    medHubLabel: "LBHS",
    friendlyName: "LBHS",
    synonyms: ["lbhs"],
    tags: ["community"],
  },
  {
    id: "mfhc",
    medHubCode: "MFHC",
    medHubLabel: "MFHC",
    friendlyName: "Maliheh Free Health Clinic",
    synonyms: ["mfhc", "maliheh", "free clinic"],
    tags: ["community", "clinic"],
  },
  {
    id: "mhccc",
    medHubCode: "MHCCC",
    medHubLabel: "MHCCC",
    friendlyName: "MHCCC - Outpatient",
    synonyms: ["mhccc"],
    tags: ["community"],
  },
  {
    id: "mhccc_ip",
    medHubCode: "MHCCC IP",
    medHubLabel: "MHCCC IP",
    friendlyName: "MHCCC - Inpatient",
    synonyms: ["mhccc", "inpatient"],
    tags: ["community", "inpatient"],
  },
  {
    id: "pch_cl",
    medHubCode: "PCH CL",
    medHubLabel: "PCH CL",
    friendlyName: "Primary Children's - Consult Liaison",
    synonyms: ["pch", "primary childrens", "peds", "consult"],
    tags: ["pch", "child", "consult"],
  },
  {
    id: "pedscc_uh",
    medHubCode: "PedsCC-UH",
    medHubLabel: "PedsCC-UH",
    friendlyName: "Pediatric Collaborative Care - UH",
    synonyms: ["peds", "collaborative care", "pediatric"],
    tags: ["uh", "child", "collab care"],
  },
  {
    id: "rcc_dt",
    medHubCode: "RCC DT",
    medHubLabel: "RCC DT",
    friendlyName: "RCC - Day Treatment",
    synonyms: ["rcc", "day treatment"],
    tags: ["rcc"],
  },
  {
    id: "rcc_pc",
    medHubCode: "RCC PC",
    medHubLabel: "RCC PC",
    friendlyName: "RCC - Primary Care",
    synonyms: ["rcc", "primary care"],
    tags: ["rcc", "primary care"],
  },
  {
    id: "tanner",
    medHubCode: "TANNER",
    medHubLabel: "TANNER",
    friendlyName: "Tanner Clinic",
    synonyms: ["tanner"],
    tags: ["community", "clinic"],
  },
  {
    id: "th_tx_rmm",
    medHubCode: "TH TX RMM",
    medHubLabel: "TH TX RMM",
    friendlyName: "Telehealth TX / RMM",
    synonyms: ["telehealth", "rmm", "virtual"],
    tags: ["telehealth"],
  },
  {
    id: "thrive",
    medHubCode: "THRIVE",
    medHubLabel: "THRIVE",
    friendlyName: "THRIVE Program",
    synonyms: ["thrive"],
    tags: ["program"],
  },
  {
    id: "udoc",
    medHubCode: "UDOC",
    medHubLabel: "UDOC",
    friendlyName: "Utah Dept of Corrections",
    synonyms: ["udoc", "corrections", "prison", "jail"],
    tags: ["forensic", "corrections"],
  },
  {
    id: "unhs",
    medHubCode: "UNHS",
    medHubLabel: "UNHS",
    friendlyName: "UNHS",
    synonyms: ["unhs"],
    tags: ["community"],
  },
  {
    id: "ush",
    medHubCode: "USH",
    medHubLabel: "USH",
    friendlyName: "Utah State Hospital",
    synonyms: ["ush", "state hospital"],
    tags: ["state", "inpatient"],
  },

  // ============================================
  // Education & Administrative
  // ============================================
  {
    id: "didactics",
    medHubCode: "DIDACTICS",
    medHubLabel: "DIDACTICS",
    friendlyName: "Didactics / Lectures",
    synonyms: ["didactics", "lecture", "class", "education", "conference", "grand rounds"],
    tags: ["education"],
    isFavorite: true
  },
  {
    id: "res_edu",
    medHubCode: "RES EDU",
    medHubLabel: "RES EDU",
    friendlyName: "Resident Education",
    synonyms: ["education", "resident", "teaching"],
    tags: ["education"],
  },
];

export const CURRENT_USER_ID = "resident_001";

// Helper to get settings organized by category
export const getSettingsByCategory = () => {
  const categories: Record<string, WorkSetting[]> = {
    "HMHI - Huntsman Mental Health Institute": [],
    "VA - VA Medical Center": [],
    "UH - University Hospital": [],
    "MHI - Utah State Hospital": [],
    "Intermountain / Community": [],
    "Education & Admin": [],
    "Other": [],
  };

  SEED_SETTINGS.forEach(setting => {
    if (setting.medHubCode.startsWith("HMHI")) {
      categories["HMHI - Huntsman Mental Health Institute"].push(setting);
    } else if (setting.medHubCode.startsWith("VA") || setting.medHubCode === "VOA CCC") {
      categories["VA - VA Medical Center"].push(setting);
    } else if (setting.medHubCode.startsWith("UH")) {
      categories["UH - University Hospital"].push(setting);
    } else if (setting.medHubCode.startsWith("MHI")) {
      categories["MHI - Utah State Hospital"].push(setting);
    } else if (setting.medHubCode.startsWith("ID") || setting.medHubCode.startsWith("Davis")) {
      categories["Intermountain / Community"].push(setting);
    } else if (["DIDACTICS", "RES EDU", "ASST CHIEF"].includes(setting.medHubCode)) {
      categories["Education & Admin"].push(setting);
    } else {
      categories["Other"].push(setting);
    }
  });

  return categories;
};
