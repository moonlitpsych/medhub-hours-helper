# MedHub Hours Helper

A companion tool to make MedHub work-hours logging faster for residents. Built for a psychiatry resident at University of Utah, but designed to work for any program using MedHub.

## Current Status: Phase 1 Complete (MVP)

**Last updated:** November 25, 2024

### What Works Now

| Feature | Status | Notes |
|---------|--------|-------|
| Weekly schedule view | ✅ Done | Calendar UI with week navigation |
| Time block editor | ✅ Done | Add/edit/delete blocks per day |
| Smart time parsing | ✅ Done | Type "7a", "5:30p", auto-snaps to 30-min |
| Clinical settings (97 total) | ✅ Done | All UofU Psych settings with fuzzy search |
| Weekly templates | ✅ Done | Save, apply, delete templates |
| Export (CSV + clipboard) | ✅ Done | Copy-paste friendly for manual MedHub entry |
| Local persistence | ✅ Done | localStorage for schedules, templates |

### What's NOT Built Yet

| Feature | Status | Blocked By |
|---------|--------|------------|
| MedHub API integration | ❌ Not started | Awaiting GME approval |
| Direct submit to MedHub | ❌ Not started | Needs API credentials |
| Overlap validation | ❌ Not started | - |
| Multi-user auth | ❌ Not started | Phase 3 |

---

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (CDN)
- **Storage:** Browser localStorage (no backend yet)
- **Build:** `npm run dev` → http://localhost:3000

---

## Project Structure

```
/
├── App.tsx                 # Main app component
├── types.ts                # TypeScript interfaces
├── utils.ts                # Date helpers, time parsing, search
├── components/
│   ├── BlockEditor.tsx     # Time block add/edit modal
│   ├── SettingsSelect.tsx  # Clinical setting fuzzy search
│   ├── TemplateManager.tsx # Save/apply/delete templates
│   ├── ExportModal.tsx     # CSV + clipboard export
│   └── Icons.tsx           # SVG icons
├── services/
│   └── storage.ts          # localStorage wrapper
├── data/
│   └── seeds.ts            # 97 UofU clinical settings
└── index.html              # Entry point
```

---

## Key Data Models

```ts
interface WorkSetting {
  id: string;
  medHubCode: string;      // Exact code from MedHub dropdown
  medHubLabel: string;     // Label as shown in MedHub
  friendlyName: string;    // Human-readable name
  synonyms: string[];      // Search aliases
  tags: string[];          // Categories
  isFavorite?: boolean;
}

interface TimeBlock {
  id: string;
  start: string;           // ISO datetime
  end: string;
  workSettingId: string;
  type: "standard" | "moonlighting" | "home_call" | "remote_work";
}

interface WeekSchedule {
  id: string;
  userId: string;
  weekStartDate: string;   // Monday
  days: DayEntry[];        // 7 days
  source: "template" | "manual" | "imported";
}
```

---

## Next Steps

### Phase 0: MedHub API Access (IN PROGRESS)

**Status:** Email drafted to UofU GME office requesting API access.

**Contacts:**
- GME Office: gme@hsc.utah.edu
- Data requests: samantha.borresch@hsc.utah.edu

**Questions to answer:**
1. Is resident-led API integration allowed?
2. What auth model? (API key vs OAuth)
3. What endpoints are available for duty hours?

### Phase 1B: Polish (READY TO BUILD)

- [ ] Overlap validation (block save if times conflict)
- [ ] Grouped settings dropdown (by location)
- [ ] Apply template to multiple weeks
- [ ] Better friendly names for ambiguous settings

### Phase 2: MedHub API Integration (BLOCKED)

Requires API credentials from GME. Will need:
- `services/medhubApi.ts` - HTTP client
- Environment config for API keys
- Submit workflow in UI
- Possibly a backend proxy for secure key handling

---

## MedHub API Reference

- Docs: https://api-docs.medhub.com/
- Auth: AWS-style signature (institution-controlled)
- Access: Must go through GME office

Known third-party integrations exist (e.g., ResQ Medical), proving API integration is possible.

---

## Running Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Clinical Settings

97 settings loaded from `data/seeds.ts`, organized by location:
- **HMHI** - Huntsman Mental Health Institute (18 settings)
- **VA** - VA Medical Center (15 settings)
- **UH** - University Hospital (16 settings)
- **MHI** - Utah State Hospital (12 settings)
- **Intermountain/Community** - Various sites (22 settings)
- **Other** - DBT, PCH, specialty clinics (14 settings)

Each setting includes MedHub codes, friendly names, and synonyms for fuzzy search.
