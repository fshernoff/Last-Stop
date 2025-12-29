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
1. First reset + investigate room → `noticed_loop_start` → Chapter 2
2. Observe office at 10PM → `observed_earl_anomaly`
3. Talk to Earl (trust 1) → `earl_knows_you_know` → Chapter 3
4. Talk to Earl again → `earl_revealed`, `master_key`
5. Back room + Earl → `seen_device`
6. Investigate back room twice → `thomas_journal`
7. Earl trust 2 → `earl_read_journal` → Chapter 4
8. Vincent patterns → `vincent_shared_patterns`
9. Vincent opens door → `vincent_opened_door`
10. Vincent reveal (trust 2) → `ready_for_ending` → Chapter 5
11. Talk to Earl → **Ending A**

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
2. **Chapter gating** - Verify chapter transitions feel natural and not blocked
3. **Observation timing** - Players need to know to observe office at night (10PM)
4. **Item persistence** - Verify `thomas_journal` persists across resets correctly

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
- Chapter must be in range (`requirements.chapter`)
- `oncePer` checked against seen lists (`'loop'` = once per day reset)

### Investigation System (`src/data/investigations.ts`)
- Each location has multiple investigation entries
- Requirements filter by flags (required/forbidden)
- `oncePer: 'ever'` for discoveries, `'loop'` for atmosphere text
- Effects can set flags, give items, modify trust

### Observation System (`src/data/observations.ts`)
- Special events at specific times/locations
- `setsFlag` property triggers flag discovery
- NPC movement tracking via schedule simulation
