# Last Stop - MVP Complete

**Status:** MVP feature-complete. Ready for playtesting and polish.

## What's Done

### All 8 Phases Complete
- **35 scenes** across 8 characters + 2 endings
- Full investigation system with location-based discoveries
- Observation system with flag-setting events
- Critical path from start to Ending A verified working

### Key Files
| File | Purpose |
|------|---------|
| `src/data/scenes/*.ts` | All dialogue scenes by character |
| `src/data/investigations.ts` | Location investigation results |
| `src/data/observations.ts` | Observable events with flag triggers |
| `src/store/gameStore.ts` | Zustand state management |
| `src/components/ActionsTab.tsx` | Main gameplay (talk, investigate, move) |

### Critical Path (Working)
1. Observe office at 10PM → `observed_earl_anomaly`
2. Talk to Earl (trust 1) → `earl_knows_you_know`
3. Talk to Earl (loop 10+) → `earl_revealed`, `master_key`
4. Back room + Earl → `seen_device`
5. Investigate back room twice → `thomas_journal`
6. Earl trust 2 → `earl_read_journal`
7. Vincent (loop 20+, trust 2) → `ready_for_ending`
8. Talk to Earl → **Ending A**

### Observation Flags
| Flag | Location | Time | Trigger |
|------|----------|------|---------|
| `observed_earl_anomaly` | office | 10PM | Earl carries device |
| `observed_diane_earl_talk` | office | 4PM | Diane talks to Earl |
| `observed_karen_walks_desert` | courtyard | 3PM | Karen walks to desert |
| `observed_mo_asks_facility` | diner | 7PM | Mo asks about facility |

## What's Not Done (Post-MVP)

### Optional Endings
- **Ending B (Replace):** Vincent trades places - needs `vincent_offered_trade` scene
- **Ending C (Destroy):** Overload device - needs `drifter_told_overload` scene + evacuation mechanic

### Deferred Features
- Insight system (game bible Section 7)
- Sound/music
- Multiple save slots
- Achievements

## Known Issues / Testing Needed

1. **Trust progression** - Need to verify players can reach trust tier 2 with Earl and Vincent naturally
2. **Loop counter** - Verify loop 10 and loop 20 requirements aren't too grindy
3. **Observation timing** - Players need to know to observe office at night (10PM)
4. **Item persistence** - Verify `thomas_journal` persists across loops correctly

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run typecheck # TypeScript check
npm run lint      # ESLint
```

## Architecture Notes

### Scene Selection (`src/utils/scenes.ts`)
Scenes are selected by priority with requirement filtering:
- Trust tier must match or exceed requirement
- All required flags must be set
- No forbidden flags can be set
- Loop count must be in range
- `oncePer` checked against seen lists

### Investigation System (`src/data/investigations.ts`)
- Each location has multiple investigation entries
- Requirements filter by flags (required/forbidden)
- `oncePer: 'ever'` for discoveries, `'loop'` for atmosphere text
- Effects can set flags, give items, modify trust

### Observation System (`src/data/observations.ts`)
- Special events at specific times/locations
- `setsFlag` property triggers flag discovery
- NPC movement tracking via schedule simulation
