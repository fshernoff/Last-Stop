# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Last Stop is a time loop idle mystery web game (PWA) built with React, TypeScript, Zustand, Tailwind CSS, and Vite. The player is trapped in a repeating day at a roadside motel and must uncover why through observation, conversation, and investigation.

## Tech Stack

- **Framework:** React 19.2+ with TypeScript 5.9+
- **State Management:** Zustand 5.x
- **Styling:** Tailwind CSS 4.x (CSS-first configuration, no tailwind.config.js)
- **Build Tool:** Vite 7.x with vite-plugin-pwa 1.x
- **Storage:** localStorage with Zustand persist middleware (no backend for MVP)
- **Node:** Requires Node 20.19+ (Vite 7 dropped Node 18 support)

```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "tailwindcss": "^4.1.0",
    "vite": "^7.2.0",
    "vite-plugin-pwa": "^1.2.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

## Key Architecture Concepts

### Flag-Based Progression
All game progression is tracked via boolean flags, not complex state combinations. The engine checks flags and selects content based on them. Never dynamically generate dialogue.

### Scene Selection System
When the player talks to an NPC, the engine selects scenes based on:
1. Required trust tier (0=Stranger, 1=Familiar, 2=Trusted)
2. Required flags (all must be true)
3. Forbidden flags (all must be false)
4. Loop requirements (min/max)
5. Priority (higher priority scenes chosen first)
6. Once-per constraint ('ever', 'loop', or 'none')

### Trust System
Three tiers per character (0, 1, 2). Trust tier 2 decays to tier 1 after each loop reset. Tier 0 and 1 persist.

### Time System
Each day runs 6AM to midnight (1080 minutes). Actions cost time (move=15min, talk=15-30min, investigate=15min). At midnight, the loop resets.

### Idle Observation System
Players can set up observations at locations while away. Real time converts to game time at 1:3 ratio (1 real hour = 3 game hours). Observations log NPC movements and events.

## Core Data Types

```typescript
// Locations
type LocationId = 'room_player' | 'room_2' | 'room_4' | 'room_6' | 'room_9' | 'room_11'
  | 'parking_lot' | 'courtyard' | 'office' | 'diner' | 'back_room' | 'back_area' | 'desert';

// Characters
type CharacterId = 'earl' | 'marge' | 'karen' | 'david' | 'diane' | 'mo' | 'drifter' | 'vincent';
```

## Content Guidelines

All dialogue is prewritten in complete standalone scenes (see Section 15 of the game bible). The engine handles all condition checking - LLMs never decide which content to show. Each scene has ~10-30 lines with explicit requirements and effects.

## Design Reference

The file `last-stop-game-bible-v2.md` is the comprehensive design document containing:
- Story and character details (Sections 2-3)
- Gameplay mechanics (Sections 5-7)
- Dialogue architecture and scene structure (Section 8)
- UI specifications (Section 11)
- Technical architecture and data structures (Sections 12-13)
- NPC schedules and observable events (Section 14)
- Complete scene scripts (Section 15)

## Implementation Phases

### Phase 1: Project Scaffolding ✅
- Vite + React + TypeScript project setup
- Tailwind CSS 4 configuration
- Zustand store with persist middleware
- PWA configuration
- Core type definitions (LocationId, CharacterId, GameState, Scene, etc.)
- Basic app shell

### Phase 2: Core Game Engine ✅
- Time system (current time, time advancement, midnight reset)
- Loop management (loop counter, reset logic, trust decay)
- Flag system (set/check/clear flags)
- Location system with adjacency
- Character schedules and positioning

### Phase 3: Scene System ✅
- Scene data structure and content loading
- Scene selection algorithm (requirements, priority, oncePer)
- Dialogue renderer with choices
- Scene effects application (setFlags, setTrust, giveItem, etc.)
- Marge's 6 scenes implemented as reference

### Phase 4: UI - All Screens ✅
- Main game screen with location panel, actions, movement
- Tab navigation (Actions, Map, Items, Known, Observe, Menu)
- Map screen with visual layout and NPC positions
- Items screen with inventory and descriptions
- Known screen with discovered facts by category
- Menu screen with reset, about, tips

### Phase 5: Idle/Observation System ✅
- Observation task setup UI (select locations, start/stop)
- Real-time to game-time conversion (1:3 ratio)
- Event simulation while away (NPC movements + special events)
- Observation log display on return with flag discovery

### Phase 6: Content - Earl Scenes ✅
- All 7 Earl scenes from Section 15.2 implemented
- Trust progression from tier 0 → tier 2
- Master key granted via `earl_reveal` scene (sets `has_master_key` flag)
- Back room access enabled via flag

### Phase 7: Content - Guest Scenes ✅
- Karen scenes (3) ✅ - Section 15.3
- David scenes (3) ✅ - Section 15.8
- Vincent scenes (5) ✅ - Section 15.4
- Diane scenes (3) ✅ - Section 15.5
- Mo scenes (3) ✅ - Section 15.6
- Drifter scenes (3) ✅ - Section 15.7

### Phase 8: Endings & Polish ✅
- 2 ending scenes (ending_a_release, ending_d_stay) ✅
- Investigation system (`src/data/investigations.ts`) ✅
- Observation events for critical flags ✅
- Critical path verified and working ✅
- Insight system (deferred - optional for MVP)

### Post-MVP Enhancements (Not Started)
- Ending B (Replace) and Ending C (Destroy) - 2 additional endings
- Insight system implementation
- Sound effects and music
- Save slot management
- Achievements system

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run typecheck # Run TypeScript check
```
