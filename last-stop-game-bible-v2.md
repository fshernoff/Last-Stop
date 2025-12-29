# LAST STOP
## A Time Loop Idle Mystery

**Version:** 2.0  
**Last Updated:** December 2024  
**Platform:** Web (PWA)  
**Target Distribution:** r/incremental_games, itch.io, web game portals  
**Development Approach:** Claude Code autonomous implementation with human creative direction

---

## TABLE OF CONTENTS

1. [Vision & Concept](#1-vision--concept)
2. [The Story](#2-the-story)
3. [Characters](#3-characters)
4. [Location & Setting](#4-location--setting)
5. [Core Gameplay Loop](#5-core-gameplay-loop)
6. [Idle Mechanics](#6-idle-mechanics)
7. [Progression Systems](#7-progression-systems)
8. [Dialogue Architecture](#8-dialogue-architecture) ← CRITICAL FOR IMPLEMENTATION
9. [The Mystery Structure](#9-the-mystery-structure)
10. [Endings](#10-endings)
11. [UI Specifications](#11-ui-specifications)
12. [Technical Architecture](#12-technical-architecture)
13. [Data Structures](#13-data-structures)
14. [Content: Full NPC Schedules](#14-content-full-npc-schedules)
15. [Content: Complete Scene Scripts](#15-content-complete-scene-scripts) ← ALL DIALOGUE HERE
16. [Writing Style Guide](#16-writing-style-guide)
17. [Implementation Phases](#17-implementation-phases)
18. [File Structure](#18-file-structure)

---

## 1. VISION & CONCEPT

### 1.1 The Elevator Pitch

You wake up in a roadside motel. You go about your day. At midnight, you wake up again. Same day. Same people. Same conversations. But you remember everything.

**Last Stop** is an idle mystery game where time is your only resource. Explore, observe, interrogate, and piece together why you're trapped in this cycle - and how to escape. When you're not playing, set up surveillance. When you return, review what happened while you were away.

### 1.2 Genre Definition

**Idle Mystery / Incremental Narrative**

This is NOT a clicker. There are no numbers going up infinitely. Instead:

- **Idle:** Things happen when you're away. You set up observations, close the game, return to logs of events you missed.
- **Mystery:** The core engagement is uncovering truth. Who are these people? Why are you here? How do you escape?
- **Incremental:** Each chapter you're more efficient. Knowledge persists. Trust builds. You unlock shortcuts.

**Closest comparisons:**
- The narrative depth of a point-and-click adventure
- The "things happened while you were away" of Farmville/idle games
- The time loop structure of Groundhog Day / 12 Minutes
- The contained mystery of Return of the Obra Dinn

### 1.3 Target Experience

**Early game (Chapters 1-2):**
Player feels isolated, confused. Everyone treats them like a stranger. Small discoveries feel significant. "Wait, she does the same thing every day at 3pm..."

**Mid game (Chapters 3-4):**
Player feels like a detective. Patterns emerge. The first major reveal (Earl remembers) recontextualizes everything. New areas and conversations unlock.

**Late game (Chapter 5+):**
Player is racing toward answers. The second major reveal (Vincent) provides the final pieces. Multiple ending paths become clear. Emotional weight builds.

**Final chapter:**
Player makes a choice. The cycle ends (or doesn't). Catharsis.

### 1.4 Core Emotions

- **Isolation:** You're alone in knowing the truth (at first)
- **Curiosity:** What are these people hiding? Why am I here?
- **Melancholy:** The weight of grief, of being stuck, of time
- **Dark humor:** The absurdity of the same conversations forever
- **Connection:** Slowly understanding people who don't remember you
- **Release:** The ending, whatever it is

---

## 2. THE STORY

### 2.1 The Setup

You're driving. Somewhere. You don't remember where anymore - the loops have worn that away. Your car breaks down outside a roadside motel in the desert Southwest. You check in. You sleep.

You wake up at 6AM. It's the same day. Your car is still broken. The clerk doesn't recognize you. The day plays out. At midnight, everything resets.

You remember. No one else does.

### 2.2 The History (What Actually Happened)

**40 years ago:**

Earl's son, Thomas, died in a car accident on the highway just outside the motel. He was 23. Earl was devastated. His wife left him within a year - she couldn't bear to stay near where it happened. Earl did the opposite. He bought the motel to be close to the place where Thomas took his last breath.

He's been running it ever since. 40 years of the same highway, the same rooms, the same desert.

**6 months ago:**

While cleaning out a storage area behind the motel, Earl found a box of Thomas's belongings he'd never opened. Inside: journals, photos, and a small device. Military-looking. Old but pristine. Thomas had worked at a research facility in the area before he died - Earl never knew exactly what he did there.

Earl turned the device on. He wasn't thinking. He just wanted... something. A connection. A sign. 

The device hummed. The air felt strange. Earl went to bed.

He woke up at 6AM. The same morning. The same guests checking out. The same coffee brewing.

The loop had begun.

### 2.3 The Present Situation

**Earl (loops for 6 months, remembers everything):**

He's tried everything. Destroyed the device - it reforms by midnight. Buried it in the desert - it's back in his room by morning. Left the motel's radius - he collapses and wakes up in bed. Told guests what's happening - they think he's crazy, and it doesn't matter because they forget.

He's exhausted. He's stopped trying. Now he just watches. Waits. Hopes someone new will figure out what he can't.

When you arrive - and immediately remember after the first reset - he notices. He's seen guests develop déjà vu over weeks. He's never seen anyone remember instantly. You're different.

He watches you. Tests you. Waits to see if you're the answer.

**Vincent (loops for 3 months, remembers everything):**

Checked in three months ago. Took about two weeks to start remembering. Took another week to fully understand. He tried to help Earl for a while. They worked together. Nothing worked.

Vincent gave up. He stays in Room 6 now. Doesn't come out. Earl brings him food. He's waiting for it to end, one way or another.

He knows everything Earl knows. Maybe more - he had fresh eyes when he started investigating. But he won't share it easily. He's bitter. Broken. Getting through to him is the game's emotional climax.

**Everyone else:**

They don't remember. They wake up fresh every day. They repeat their patterns. They are who they are, frozen in this single day forever.

But they're not NPCs. They have inner lives, histories, secrets. The loop caught them mid-story. Karen was about to discover something in the desert. Diane was about to crack a case. Mo was about to realize something was wrong. The Drifter was about to run.

Learning who they were becoming - and will never get to become - is part of the tragedy.

### 2.4 The Truth About the Device

The device responds to grief. To longing. To the desperate wish for more time.

Earl's 40 years of mourning, concentrated in that moment when he held his son's last possessions and turned on that device - it gave him what he wanted. Infinite time. A world that never moves forward. A place where he never has to face a future without Thomas.

It's not punishment. It's a gift he didn't know how to ask for. And now he can't give it back.

### 2.5 How the Loop Ends

The device won't turn off until Earl lets go. Not performs a ritual. Not says magic words. Actually, truly accepts that Thomas is gone and chooses to move forward.

He can't do it alone. He's had 6 months and he can't.

Your job is to help him get there. Through what you learn about Thomas from the other guests (Diane has files on the old facility; the Drifter knows more than he admits). Through what you learn about Earl from Marge. Through showing Earl that this frozen moment isn't life - it's a tomb.

The final choice is his. But you can lead him to it.

---

## 3. CHARACTERS

### 3.1 The Player

**Name:** Player-chosen  
**Background:** Deliberately vague. You were driving somewhere. The loops have eroded your memory of life before. This is intentional - it focuses attention on the present and raises questions about your connection to this place.

**Why you remember instantly:** Left ambiguous. Possible explanations (never confirmed):
- Random chance
- Something about your own grief/mental state
- A connection to the original facility
- Earl's subconscious wish for help somehow affecting the device

### 3.2 Earl - The Clerk

**Age:** 68  
**Appearance:** Weathered, thin, gray. Flannel shirts. Reading glasses he's always losing. Moves slowly but notices everything.

**Surface:** Polite, distant, professional. Been running this motel forever. Knows everyone's business but shares nothing.

**Underneath:** Devastated. Exhausted. 40 years of grief followed by 6 months of purgatory. He's still going through the motions because that's all he knows how to do.

**Key traits:**
- Observant - watches guests carefully, remembers details
- Patient - 6 months has worn away any urgency
- Guilty - knows this is his fault, even if he didn't mean it
- Protective - of Marge, of the routine, of the guests who don't know

**Schedule:**
- 6AM: Opens office, makes coffee
- 6AM-10PM: At front desk (with breaks for meals in back room)
- 10PM-midnight: Back room
- Midnight-6AM: Unknown (this is significant)

### 3.3 Marge - The Cook

**Age:** 62  
**Appearance:** Sturdy, warm, practical. Apron always on. Hair pinned back.

**Surface:** The heart of the motel. Friendly, talkative, makes everyone feel welcome. Knows all the gossip.

**Underneath:** She knows something's wrong with Earl. Has known for months. He won't tell her what. She doesn't know about the loop, but she knows her brother is suffering.

**Relationship to Earl:** His sister. Moved here 20 years ago after her own divorce. They take care of each other.

**Key traits:**
- Warm - genuinely cares about guests
- Observant - in a gossipy way, not a suspicious way
- Loyal - to Earl above all
- Worried - she can tell something's wrong but can't name it

**Schedule:**
- 5:30AM: Arrives at diner, starts prep
- 6AM-10PM: Running diner
- 10PM: Closes up, talks to Earl in back room
- 10:30PM: Goes home (small house behind motel)

### 3.4 Karen Chen - Room 2

**Age:** 29  
**Appearance:** Put-together even when stressed. Business casual that's become road-trip casual.

**Surface:** Newlywed on a road trip with husband David. Tense. They argue behind closed doors but perform happiness in public.

**Underneath:** She saw something in the desert last night. A light. A shape. She can't explain it. David doesn't believe her. She's not crazy. She knows what she saw.

**What she knows:** The location of where she saw the light - which is where the old facility was, which is where the device's signal originates.

**Key traits:**
- Determined - won't let David dismiss her
- Curious - wants answers more than comfort
- Perceptive - notices things others miss
- Guarded - doesn't trust easily

**Schedule:**
- 7AM: Wake, argue with David (quiet)
- 8AM: Breakfast in diner (together, silent)
- 10AM-2PM: By the pool or in room, reading
- 2PM: David goes for a drive
- 3PM: Karen walks toward desert (how far varies by loop)
- 6PM: Dinner in diner (with David)
- 9PM: Room, argument, sleep

### 3.5 David Chen - Room 2

**Age:** 31  
**Appearance:** Handsome, athletic. The kind of guy who's used to being right.

**Surface:** Loving husband worried about his wife's mental state. Trying to hold it together.

**Underneath:** He's not a villain. He genuinely loves Karen. But he's scared - of what she claims to have seen, of what it might mean, of losing her to something he can't understand.

**What he knows:** Nothing directly useful. But his relationship with Karen is a thread - helping them communicate is part of unlocking her full knowledge.

**Key traits:**
- Protective - to a fault
- Rational - dismisses what he can't explain
- Loving - genuinely, under the tension
- Avoidant - drives away rather than face hard conversations

**Schedule:**
- 7AM: Wake, argue with Karen
- 8AM: Breakfast in diner
- 9AM-2PM: In room, on phone, pretending to work
- 2PM-5PM: Goes for a drive
- 6PM: Dinner in diner
- 9PM: Room, argument, sleep

### 3.6 Diane Mercer - Room 4

**Age:** 44  
**Appearance:** Professional. Blazer even in the desert heat. Laptop bag never leaves her side.

**Surface:** Saleswoman passing through. Keeps to herself. Always working.

**Underneath:** Insurance investigator. Multiple people have gone missing on this stretch of highway over the past 15 years. She's found a pattern. She's close to something.

**What she knows:** Files on the missing persons. A connection to the old research facility. A name: Thomas. She doesn't know he's Earl's son yet.

**Key traits:**
- Sharp - misses nothing
- Professional - keeps emotions out
- Tenacious - won't let go of a thread
- Lonely - this job has cost her a personal life

**Schedule:**
- 6AM: Wake, work on laptop
- 7AM: Coffee in diner (observes, notes)
- 8AM-3PM: "Out for meetings" (actually researching in town 30 miles away)
- 3PM: Returns, more laptop work
- 7PM: Dinner in diner
- 11PM: Sleep (light on late)

### 3.7 Big Mo - Room 9

**Age:** 52  
**Appearance:** Large, friendly. Trucker cap. Faded band t-shirts. Genuine smile.

**Surface:** Trucker passing through. Friendly, talkative, seemingly the most normal person here.

**Underneath:** He's been through here before. Twice. He has déjà vu he can't explain. On some level, his subconscious remembers previous loops even if his conscious mind doesn't.

**What he knows:** He can be made to remember more if you push the right buttons. He has a CB radio in his truck that can reach outside the loop's radius - potential lifeline.

**Key traits:**
- Friendly - genuinely warm
- Observant - in a casual way
- Superstitious - believes in omens, gut feelings
- Loyal - if you become his friend, he's got your back

**Schedule:**
- 5AM: Wake (earliest riser)
- 5:30AM: Breakfast in diner (Marge's first customer)
- 6AM-7PM: On the road (route passes by motel twice)
- 7PM: Returns, dinner
- 8PM-10PM: Beers in diner, talks to whoever's around
- 10PM: Sleep

### 3.8 The Drifter - Room 11

**Name:** Won't say. Calls himself "just passing through."  
**Age:** 35  
**Appearance:** Thin, unshaven, nervous. Looks like he hasn't slept in weeks (because, in a way, he hasn't).

**Surface:** Sketchy guy. Fidgety. Checks his phone constantly but never seems to have signal. Avoids eye contact.

**Underneath:** His father worked at the facility. Died there. The Drifter has been investigating for years, following leads. He knows more about the device than anyone except maybe Earl. He's terrified because he knows what he's close to finding.

**What he knows:** The facility's location. What they were working on (temporal field manipulation). That something went wrong. That someone took equipment when it shut down. He doesn't know Earl is connected - that's a discovery.

**Key traits:**
- Paranoid - for good reason
- Guilty - his father died for this research
- Knowledgeable - about the science, sort of
- Fragile - could break down or become ally

**Schedule:**
- Erratic. Never the same twice.
- Sometimes in diner at odd hours
- Sometimes pacing parking lot
- Sometimes gone (watching from desert)
- Always back by midnight

### 3.9 Vincent - Room 6

**Age:** 45  
**Appearance:** Once professional. Now disheveled. Beard grown out. Eyes hollow.

**Surface:** The man who never leaves his room. Do Not Disturb sign always up. Earl brings him food.

**Underneath:** A former high school teacher on sabbatical. Checked in 3 months ago. Took 2 weeks to start remembering. Another week to fully understand. Tried to help Earl. Failed. Gave up. Now he just waits.

**What he knows:** Everything Earl knows, plus his own observations from when he was actively investigating. He's mapped out NPC schedules. He's found documents. He knows about the device, about Thomas, about all of it. But he's lost hope.

**Unlocking him:** You need high trust with Earl first (Earl has to tell you about Vincent). Then you need to get into Room 6 (Earl's master key, or earn Vincent's trust through the door). Then you need to draw him out through conversation over multiple loops.

**Key traits:**
- Broken - but not beyond repair
- Intelligent - sees patterns clearly
- Bitter - feels abandoned by a universe that trapped him
- Compassionate - deep down, he still cares

**Schedule:**
- None. Never leaves room.
- Earl brings food at 7AM, 12PM, 6PM
- Paces at night (you can hear through walls)
- At 3:33AM, every loop, he screams

---

## 4. LOCATION & SETTING

### 4.1 The Motel Layout

```
                    [HIGHWAY - Route 66/unnamed desert highway]
                              |
                              |
                    ═══════════════════════
                    |    PARKING LOT      |
                    |    (8 spaces)       |
                    ═══════════════════════
                              |
    ┌─────┬─────┬─────┬─────┬─────┬─────┐
    │  1  │  2  │  3  │  4  │  5  │  6  │   NORTH WING
    │     │CHEN │     │DIANE│     │VINC │   (Rooms 1-6)
    └──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┘
       │     │     │     │     │     │
    ═══╪═════╪═════╪═════╪═════╪═════╪════
       │         COURTYARD              │
       │      (pool, chairs, ice)       │
    ═══╪═════╪═════╪═════╪═════╪═════╪════
       │     │     │     │     │     │
    ┌──┴──┬──┴──┬──┴──┬──┴──┬──┴──┬──┴──┐
    │  7  │  8  │  9  │ 10  │ 11  │ 12  │   SOUTH WING
    │YOU  │     │ MO  │     │DRIFT│     │   (Rooms 7-12)
    └─────┴─────┴─────┴─────┴─────┴─────┘
                    |
          ┌────────┴────────┐
          │                 │
     [OFFICE/LOBBY]    [DINER]
          │                 │
     (Earl's domain)   (Marge's domain)
          │
     [BACK ROOM]
     (Earl's private space - locked)
          |
    ═══════════════════════
    |     BACK AREA       |
    | (dumpsters, storage)|
    ═══════════════════════
          |
          |
    [DESERT - extends forever]
```

### 4.2 Location Descriptions

**The Office/Lobby:**
Small, cluttered, frozen in the 1970s. Wood paneling. A rack of tourist brochures for places that probably don't exist anymore. The smell of old paper and older coffee. Earl's domain - a desk, a ledger (not computerized), a wall of keys on hooks. A door to the back room that's always closed.

**The Diner:**
Attached to the office. Red vinyl booths. Formica counter with spinning stools. The smell of bacon grease that never fully fades. Marge's domain. A jukebox that works but nobody uses. Windows looking out at the parking lot and the highway beyond.

**The Courtyard:**
The center of the motel. A small pool (functional but uninviting). Faded lounge chairs. An ice machine that hums too loud. This is where you can observe both wings of rooms, see who comes and goes.

**The Rooms (generic):**
All the same. Two beds or one, depending. Faded floral bedspreads. A TV bolted to the dresser. A Bible in the drawer. A window unit AC that rattles. The smell of industrial cleaner that never quite masks the mustiness.

**Room 6 (Vincent's):**
Different. Darker. The curtains are taped shut. Papers are scattered everywhere - notes, diagrams, timelines. The walls have writing on them. A man has been solving an unsolvable puzzle here for three months.

**The Back Room:**
Earl's private space. You can't access it until mid-game. Inside: a cot (he sleeps here sometimes), boxes of Thomas's belongings, photos on the walls, and the device - a small metal cylinder, softly humming, sitting on a workbench like it's waiting.

**The Desert:**
In every direction, nothing. Red rock and scrub brush and endless sky. Beautiful in a harsh way. If you walk into it, you feel tired, then exhausted, then you collapse. You wake up in your room at 6AM. The desert is a wall you can't climb.

### 4.3 Atmosphere & Tone

**Visual touchstones:**
- No Country for Old Men (desert, isolation)
- Bagdad Cafe (roadside motel aesthetic)
- Twin Peaks (something wrong under the surface)
- Barton Fink (hotel as purgatory)

**Audio touchstones:**
- Silence, mostly. Wind. The hum of the ice machine.
- Distant highway sounds - cars that never stop
- The jukebox, when it plays, feels too loud

**Weather:**
Always the same. Sunny. Hot. Cloudless. The same day means the same weather. The monotony is part of the trap.

---

## 5. CORE GAMEPLAY LOOP

### 5.1 The Day Cycle

Each day runs from 6AM to midnight (18 hours of game time).

```
6AM  ████████████████████████████████████████  MIDNIGHT
     |        |        |        |        |
    6AM     10AM      2PM      6PM     10PM
     
     [MORNING] [MIDDAY] [AFTERNOON] [EVENING] [NIGHT]
```

**Time advances when:**
- You take an action (move, talk, investigate)
- You choose to wait
- You're in idle observation mode (real-time to game-time conversion)

**At midnight:**
- Screen fades to black
- "6:00 AM" appears
- You wake up in your room
- Everything has reset except your knowledge
- **Implementation note:** The narrative progresses by **chapters**, not by counting resets. Chapters only advance when key story beats fire.

### 5.2 Actions & Time Costs

| Action | Time Cost | Notes |
|--------|-----------|-------|
| Move between locations | 15 min | Adjacent locations |
| Talk to NPC | 15-30 min | Depending on conversation depth |
| Investigate object | 15 min | Search, examine, read |
| Use item | 5-15 min | Varies by item |
| Wait/Observe | Player choice | Watch time pass |
| Eat/Drink | 15 min | Can trigger NPC conversations |

### 5.3 Core Player Actions

**Move:**
Navigate between locations. The map shows current NPC locations (if known).

**Talk:**
Initiate conversation with present NPCs. Engine selects appropriate scene based on flags.

**Investigate:**
Examine objects in the environment. Some investigations require prerequisites (keys, knowledge, flags).

**Inventory:**
View and use items. Give items to NPCs.

**Wait:**
Let time pass. Useful for getting to specific times when events happen.

**Observe (Idle):**
Set up observation tasks and let time pass automatically. This is the idle mechanic core.

### 5.4 A Sample Play Session

**Active play (15 minutes):**
1. Wake up at 6AM in room
2. Check knowledge log - remember Karen walks to desert at 3PM
3. Go to diner (15 min)
4. Talk to Marge - engine loads `marge_tier1_greeting`
5. Learn that Diane asked about "old maps" yesterday
6. Go to Diane's room, knock - she's not there
7. Check time: 7:15AM. Diane comes back at 3PM.
8. Set up idle observation: "Watch Diane's room, 3PM-6PM"
9. Close game

**Idle phase (player is away 2 hours):**
Game simulates 3PM-6PM
- 3:05PM: Diane returns, enters room
- 3:30PM: Karen walks past toward desert
- 4:00PM: Diane leaves room, goes to office, talks to Earl
- 4:15PM: Diane returns to room
- 5:30PM: Drifter seen pacing parking lot

**Return to active play:**
1. Review observation log
2. New knowledge flag set: `observed_diane_earl_talk`
3. New question: What did they discuss?
4. Plan next reset: Be at office at 4PM to overhear

---

## 6. IDLE MECHANICS

### 6.1 Observation System

The core idle mechanic: you can't be everywhere at once. Set up observation tasks to gather information while you're away.

**Setting up observations:**

```
┌─────────────────────────────────────────────────────────┐
│ SET UP OBSERVATIONS                    Current: 2:30 PM │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  You can monitor up to 3 locations while you're away.   │
│                                                         │
│  TASK 1: ▼ [Select Location]     From: ____ To: ____   │
│          ┌─────────────────┐                            │
│          │ Parking Lot     │                            │
│          │ Diner           │                            │
│          │ Courtyard       │                            │
│          │ Room 6 Door     │                            │
│          │ Office          │                            │
│          └─────────────────┘                            │
│                                                         │
│  TASK 2: ▼ [Select Location]     From: ____ To: ____   │
│                                                         │
│  TASK 3: ▼ [Select Location]     From: ____ To: ____   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           [BEGIN OBSERVATIONS]                   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**What you can observe:**
- Parking lot (who arrives/leaves)
- Diner (who eats, conversations overheard)
- Courtyard/pool (who passes through)
- Specific room doors (when they open/close)
- Office (who talks to Earl)
- Back area (rarely useful, but...)

**What you can't observe:**
- Inside rooms (unless you've unlocked special access)
- The desert beyond the motel
- Events that require your presence to trigger

### 6.2 Observation Logs

When you return, you get a timestamped log:

```
┌─────────────────────────────────────────────────────────┐
│ OBSERVATION LOG - Chapter 2                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ While you were away, you observed:                     │
│                                                         │
│ PARKING LOT (3:00 PM - 8:00 PM):                       │
│                                                         │
│ 3:22 PM - Diane's rental car returns                   │
│ 3:45 PM - Unknown vehicle arrives (white sedan)        │
│ 3:46 PM - Driver stays in car, watching motel          │
│ 4:30 PM - Unknown vehicle departs                      │
│ 5:15 PM - Mo's truck returns                           │
│ 7:00 PM - David's car returns from his drive           │
│                                                         │
│ ───────────────────────────────────────────────────── │
│                                                         │
│ DINER (6:00 PM - 9:00 PM):                             │
│                                                         │
│ 6:05 PM - Karen and David arrive, sit separately       │
│ 6:30 PM - Mo arrives, sits at counter                  │
│ 6:45 PM - Mo asks Marge about "old research places"    │
│ 7:15 PM - Drifter enters, orders coffee, leaves        │
│           immediately when he sees you're observing    │
│ 8:00 PM - Karen leaves alone. David stays.             │
│                                                         │
│  [FLAGS SET]:                                           │
│  • observed_white_sedan                                 │
│  • observed_mo_asks_about_facility                      │
│                                                         │
│                          [CONTINUE]                     │
└─────────────────────────────────────────────────────────┘
```

### 6.3 Idle Time Conversion

When the player is away, real time converts to game time:

**Default rate:** 1 real hour = 3 game hours

So if you're away for 4 real hours, 12 game hours pass (half a day).

**Cap:** One full day maximum. If you're away for 6+ real hours, the day ends at midnight and you wake up at 6AM of the NEXT loop with a summary of what happened.

### 6.4 Insight System

While you're idle (or when you choose to "rest" in game), you accumulate Insight Points based on:

- Unresolved flags (questions without answers)
- Time since last breakthrough

**Insight can be spent on:**

- **Hints:** Points to next useful action
- **Connections:** Reveals link between two flags
- **Shortcuts:** Unlocks skip options

---

## 7. PROGRESSION SYSTEMS

### 7.1 Flag-Based Progression

**CRITICAL ARCHITECTURE DECISION:**

All progression is tracked via **boolean flags**, not complex state combinations.

```
FLAGS (examples):
├── met_marge
├── met_earl  
├── met_karen
├── karen_mentioned_light
├── karen_told_location
├── diane_cover_blown
├── diane_showed_files
├── earl_revealed
├── vincent_contacted
├── vincent_opened_door
├── vincent_told_everything
├── has_master_key
├── seen_device
├── seen_thomas_photo
└── ... etc
```

The engine checks flags. Content is selected based on flags. **The LLM never decides which content to show - the engine does.**

### 7.2 Trust as Tiers (Not Numbers)

Trust is simplified to **three tiers** per character:

| Tier | Name | How to Reach |
|------|------|--------------|
| 0 | Stranger | Default |
| 1 | Familiar | Talk 2-3 times, no bad choices |
| 2 | Trusted | Give useful item OR share key info |

**Trust decay:** After each loop, Tier 2 drops to Tier 1. Tier 1 stays. Tier 0 stays.

**Why only 3 tiers?** Because each tier is a complete, standalone set of scenes. No blending. No "trust 2.7 means slightly warmer than 2.3."

### 7.3 Scene Selection Logic

When player talks to NPC, engine runs this logic:

```
function getScene(npc, flags, trust):
  scenes = getAllScenesFor(npc)
  available = scenes.filter(s => meetsRequirements(s, flags, trust))
  prioritized = sortByPriority(available)
  return prioritized[0]
```

Each scene has:
- `requirements`: flags and trust tier needed
- `priority`: higher priority scenes play first
- `oncePer`: "ever" | "loop" | "none" (can repeat?)

**The engine picks the scene. The scene plays exactly as written. No variation.**

### 7.4 Knowledge Display

Player sees their progress as a simple list:

```
WHAT YOU KNOW:
├── The Reset
│   ├── ✓ The day resets at midnight
│   ├── ✓ You remember everything
│   ├── ✓ Earl remembers too
│   └── ? How to end it
├── Earl
│   ├── ✓ Runs motel 40 years
│   ├── ✓ His son Thomas died
│   └── ✓ The device is his
└── ... etc
```

Each line corresponds to a flag. No complex trees. Just "have it or don't."

---

## 8. DIALOGUE ARCHITECTURE

### 8.1 THE CRITICAL RULE

**LLMs fail when asked to juggle complex interlocking conditions.**

Therefore:

1. **The engine handles ALL condition checking**
2. **Each scene is COMPLETE and STANDALONE**
3. **No scene references state dynamically**
4. **All dialogue is PREWRITTEN, never generated**

### 8.2 Scene Structure

```typescript
interface Scene {
  id: string;                    // Unique identifier
  character: CharacterId;        // Who you're talking to
  
  // REQUIREMENTS (engine checks these)
  requirements: {
    trust?: 0 | 1 | 2;           // Minimum trust tier
    flags?: string[];            // All must be true
    notFlags?: string[];         // All must be false
    chapter?: { min?: number; max?: number };
  };
  
  // PRIORITY (higher = chosen first when multiple available)
  priority: number;              // 0-100
  
  // REPETITION
  oncePer: 'ever' | 'loop' | 'none';
  
  // CONTENT (prewritten, never changes)
  lines: DialogueLine[];
  
  // EFFECTS (engine applies these after scene ends)
  effects: {
    setFlags?: string[];         // Flags to set true
    setTrust?: { character: CharacterId; tier: 0 | 1 | 2 };
    giveItem?: string;
    unlockLocation?: string;
  };
}

interface DialogueLine {
  speaker: 'npc' | 'player' | 'narration';
  text: string;
  
  // Optional: player choices (max 3)
  choices?: {
    text: string;
    next: string;  // ID of next line in THIS scene
    effects?: Scene['effects'];
  }[];
}
```

### 8.3 Example Scene

```typescript
const scene_marge_tier0_intro: Scene = {
  id: 'marge_tier0_intro',
  character: 'marge',
  
  requirements: {
    trust: 0,
    notFlags: ['met_marge']
  },
  priority: 100,  // High priority - first meeting
  oncePer: 'ever',
  
  lines: [
    {
      speaker: 'npc',
      text: "Well, look who's up! Coffee's fresh. You look like you could use about three cups."
    },
    {
      speaker: 'player',
      text: '',  // Player chooses
      choices: [
        {
          text: "Thanks, I'd love some.",
          next: 'response_nice',
        },
        {
          text: "How long have you worked here?",
          next: 'response_history',
        },
        {
          text: "Something feels off about this place.",
          next: 'response_off',
        }
      ]
    },
    {
      id: 'response_nice',
      speaker: 'npc',
      text: "Coming right up. I'm Marge. Earl's sister. Been pouring coffee here for twenty years and I still can't make a decent cup, but nobody complains."
    },
    {
      id: 'response_history',
      speaker: 'npc', 
      text: "Twenty years, give or take. Came out here after my divorce. Earl needed help, I needed a change. Worked out for both of us."
    },
    {
      id: 'response_off',
      speaker: 'npc',
      text: "Off? Honey, the strangest thing here is Earl's taste in music. It's just a motel. Desert does funny things to people's heads, that's all."
    },
    {
      speaker: 'narration',
      text: "She pours you a cup of coffee. It's burnt but strong."
    }
  ],
  
  effects: {
    setFlags: ['met_marge']
  }
};
```

### 8.4 Scene Selection Example

Player clicks "Talk to Marge" in diner.

Engine runs:
```
Current state:
- trust['marge'] = 1
- flags = ['met_marge', 'karen_mentioned_light']

Available scenes for Marge:
1. marge_tier0_intro - SKIP (requires notFlags: met_marge)
2. marge_tier1_gossip - AVAILABLE (trust >= 1, met_marge)
3. marge_tier1_about_earl - AVAILABLE (trust >= 1, met_marge)
4. marge_tier2_worried - SKIP (requires trust >= 2)

Both 2 and 3 available. Check priority:
- marge_tier1_gossip: priority 50
- marge_tier1_about_earl: priority 40

Winner: marge_tier1_gossip (higher priority)
Check oncePer: 'loop' - have we seen it this reset? No.
PLAY marge_tier1_gossip
```

### 8.5 Scene Inventory Per Character

Each character has a fixed number of scenes:

| Character | Tier 0 | Tier 1 | Tier 2 | Special | Total |
|-----------|--------|--------|--------|---------|-------|
| Marge | 1 | 4 | 2 | 0 | 7 |
| Earl | 1 | 3 | 2 | 3 (reveal) | 9 |
| Karen | 1 | 3 | 2 | 1 (location) | 7 |
| David | 1 | 2 | 1 | 1 (reconcile) | 5 |
| Diane | 1 | 3 | 2 | 1 (files) | 7 |
| Mo | 1 | 3 | 2 | 1 (radio) | 7 |
| Drifter | 1 | 3 | 2 | 1 (facility) | 7 |
| Vincent | 1 | 2 | 2 | 3 (reveal) | 8 |
| **TOTAL** | **8** | **23** | **15** | **11** | **57** |

**57 scenes total.** Each one is complete. Each one is ~10-30 lines. No overlap. No dynamic variation.

### 8.6 What This Prevents

**OLD APPROACH (Room 6 failure mode):**
- 2000+ lines of dialogue
- Complex branching based on combinations
- LLM had to track "if A and B but not C..."
- Drift happened because state space was too large

**NEW APPROACH:**
- 57 discrete scenes
- Each ~100-200 lines
- ~8000 total lines BUT each scene is isolated
- Engine handles all conditions
- LLM only implements one scene at a time
- No drift possible because no dynamic generation

---

## 9. THE MYSTERY STRUCTURE

### 9.1 Flag-Based Mystery Progression

The mystery unfolds via flags, not complex state:

**ACT 1 FLAGS (Chapters 1-2):**
```
met_marge
met_earl
met_karen
met_david
met_diane
met_mo
noticed_drifter
noticed_room6_closed
karen_mentioned_light
observed_earl_anomaly
```

**ACT 2 FLAGS (Chapters 3-4):**
```
earl_revealed           <- MAJOR REVEAL 1
has_master_key
entered_back_room
seen_device
seen_thomas_photo
diane_showed_files
learned_facility_name
drifter_told_facility_location
karen_told_light_location
mo_felt_deja_vu
```

**ACT 3 FLAGS (Chapter 5+):**
```
vincent_contacted
vincent_opened_door
vincent_told_history    <- MAJOR REVEAL 2
vincent_told_solution
ready_for_ending
```

### 9.2 Critical Path

Required flags to reach any ending:

```
earl_revealed → entered_back_room → seen_device → vincent_contacted → vincent_told_solution → ready_for_ending
```

Everything else is optional depth.

### 9.3 Scene Dependencies

Each scene lists its requirements explicitly:

```
Scene: earl_reveal
Requirements:
  - flags: [observed_earl_anomaly]
  - trust: 1
  - chapter: { min: 3 }
Effects:
  - setFlags: [earl_revealed]
  - unlockLocation: back_room
```

No guessing. No "Claude figures it out." It's all explicit.

---

## 10. ENDINGS

### 10.1 Ending Structure

Each ending is a **special scene** triggered by specific flags.

### 10.2 Ending A: Release (Main Ending)

**Requirements:**
```
flags: [ready_for_ending, has_thomas_journal]
```

**Trigger:** Talk to Earl with these flags set.

**Scene:** `ending_a_release` - Earl turns off the device. The cycle ends. Bittersweet.

### 10.3 Ending B: Replace (Dark Ending)

**Requirements:**
```
flags: [ready_for_ending, vincent_offered_trade]
```

**Trigger:** Talk to Vincent with these flags, choose to accept.

**Scene:** `ending_b_replace` - You or Vincent become the new anchor. Dark.

### 10.4 Ending C: Destroy (Chaotic Ending)

**Requirements:**
```
flags: [ready_for_ending, drifter_told_overload, all_guests_evacuated]
```

**Trigger:** Use "overload device" action in back room.

**Scene:** `ending_c_destroy` - Device destroyed. Motel destroyed. Pyrrhic.

### 10.5 Ending D: Stay (Ambiguous Ending)

**Requirements:**
```
flags: [ready_for_ending]
chapter: { min: 5 }
```

**Trigger:** Talk to Earl, choose "I'm not ready."

**Scene:** `ending_d_stay` - You choose the reset. Cyclical.

### 10.6 Ending E: Dawn (Secret Ending)

**Requirements:**
```
flags: [ready_for_ending, found_player_name_in_files]
```

**Trigger:** Walk into desert at 3:33 AM.

**Scene:** `ending_e_dawn` - You remember everything. Transcendent.

---

## 11. UI SPECIFICATIONS

### 11.1 Main Screen Layout

```
┌─────────────────────────────────────────────────────────┐
│ LAST STOP                     Chapter 3 │ 2:30 PM │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │              LOCATION PANEL                     │   │
│  │                                                 │   │
│  │  ┌───────────────────────────────────────────┐ │   │
│  │  │  THE DINER                                │ │   │
│  │  │                                           │ │   │
│  │  │  Red vinyl booths line the windows. The   │ │   │
│  │  │  smell of coffee and bacon grease hangs   │ │   │
│  │  │  in the air. A jukebox hums in the        │ │   │
│  │  │  corner, waiting for a quarter.           │ │   │
│  │  │                                           │ │   │
│  │  │  PEOPLE HERE:                             │ │   │
│  │  │  • Marge (behind counter)                 │ │   │
│  │  │  • Karen Chen (booth by window)           │ │   │
│  │  │                                           │ │   │
│  │  └───────────────────────────────────────────┘ │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ACTIONS                                         │   │
│  │                                                 │   │
│  │  [Talk to Marge]                  30 min       │   │
│  │  [Talk to Karen]                  30 min       │   │
│  │  [Order coffee]                   15 min       │   │
│  │  [Examine jukebox]                15 min       │   │
│  │  [Wait...]                        ? min        │   │
│  │  [Set up observations...]                      │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ [📍 Map] [📦 Items] [📋 Known] [👁 Observe] [☰ Menu]   │
└─────────────────────────────────────────────────────────┘
```

### 11.2 Map Screen

```
┌─────────────────────────────────────────────────────────┐
│ MAP                                            2:30 PM  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    [HIGHWAY]                            │
│                        │                                │
│                  [PARKING LOT]                          │
│                    2 cars                               │
│                        │                                │
│     ┌────┬────┬────┬────┬────┬────┐                    │
│     │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │                    │
│     │    │ ●K │    │ ●D │    │ ■V │                    │
│     └────┴────┴────┴────┴────┴────┘                    │
│                        │                                │
│           [OFFICE]────[DINER] ← YOU                    │
│              ●E          ●M ●K                          │
│                                                         │
│     ┌────┬────┬────┬────┬────┬────┐                    │
│     │ 7  │ 8  │ 9  │ 10 │ 11 │ 12 │                    │
│     │    │    │ ●Mo│    │ ?  │    │                    │
│     └────┴────┴────┴────┴────┴────┘                    │
│                        │                                │
│                  [BACK AREA]                            │
│                    🔒 Locked                            │
│                        │                                │
│                   [DESERT]                              │
│                                                         │
│  LEGEND: ● Known │ ? Suspected │ ■ Mysterious          │
│                                                         │
│  Tap a location to travel (15 min)                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 11.3 Dialogue Screen

```
┌─────────────────────────────────────────────────────────┐
│ MARGE                                      Trust: ●●○   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  "You look like you've been here before,       │   │
│  │   hun. Something familiar about you."          │   │
│  │                                                 │   │
│  │   She tops off your coffee without asking.     │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │  > "Just one of those faces, I guess."         │   │
│  │                                                 │   │
│  │  > "Tell me about the other guests."           │   │
│  │                                                 │   │
│  │  > "What's the deal with Room 6?"              │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│                              [End conversation]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 11.4 Knowledge Screen

```
┌─────────────────────────────────────────────────────────┐
│ WHAT YOU KNOW                             Chapter 3    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  THE RESET                                              │
│  ├── ✓ The day resets at midnight                      │
│  ├── ✓ You remember everything                         │
│  ├── ✓ Earl remembers too                              │
│  └── ? How to end it                                   │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  PEOPLE                                                 │
│  ├── Marge (Trust: ●●○)                                │
│  │   ├── ✓ Earl's sister                               │
│  │   └── ✓ Knows something's wrong with him           │
│  ├── Earl (Trust: ●●○)                                 │
│  │   ├── ✓ His son Thomas died 40 years ago           │
│  │   └── ✓ The device is in his back room             │
│  ├── Karen (Trust: ●○○)                                │
│  │   ├── ✓ Saw something in the desert                │
│  │   └── ? Where exactly                               │
│  └── ...                                               │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│                                    [Insights: 3 💡]     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 12. TECHNICAL ARCHITECTURE

### 12.1 Tech Stack

```
FRONTEND:
├── Framework: React 18+ with TypeScript
├── State Management: Zustand
├── Styling: Tailwind CSS
├── Build Tool: Vite
└── Storage: localStorage

NO BACKEND FOR MVP
```

### 12.2 Core State Shape

```typescript
interface GameState {
  // Meta
  currentLoop: number; // Chapter index (story progression)
  totalPlayTime: number;
  
  // Time
  currentTime: number; // Minutes since 6AM (0-1080)
  
  // Player
  player: {
    name: string;
    currentLocation: LocationId;
  };
  
  // FLAGS (the core progression system)
  flags: Set<string>;
  
  // TRUST (per character, 0-2)
  trust: Record<CharacterId, 0 | 1 | 2>;
  
  // SCENES SEEN
  scenesSeenEver: Set<string>;
  scenesSeenThisLoop: Set<string>; // Seen since last day reset
  
  // Items
  inventory: string[];
  
  // Observations
  activeObservations: Observation[];
  observationLog: ObservationEntry[];
  
  // Insights
  insightPoints: number;
}
```

### 12.3 Scene Selection Function

```typescript
function selectScene(
  character: CharacterId,
  state: GameState,
  allScenes: Scene[]
): Scene | null {
  const characterScenes = allScenes.filter(s => s.character === character);
  
  const available = characterScenes.filter(scene => {
    // Check trust requirement
    if (scene.requirements.trust !== undefined) {
      if (state.trust[character] < scene.requirements.trust) return false;
    }
    
    // Check required flags
    if (scene.requirements.flags) {
      for (const flag of scene.requirements.flags) {
        if (!state.flags.has(flag)) return false;
      }
    }
    
    // Check forbidden flags
    if (scene.requirements.notFlags) {
      for (const flag of scene.requirements.notFlags) {
        if (state.flags.has(flag)) return false;
      }
    }
    
    // Check chapter requirement
    if (scene.requirements.chapter?.min !== undefined) {
      if (state.currentLoop < scene.requirements.chapter.min) return false;
    }
    
    // Check oncePer
    if (scene.oncePer === 'ever' && state.scenesSeenEver.has(scene.id)) {
      return false;
    }
    if (scene.oncePer === 'loop' && state.scenesSeenThisLoop.has(scene.id)) {
      return false;
    }
    
    return true;
  });
  
  if (available.length === 0) return null;
  
  // Sort by priority (highest first)
  available.sort((a, b) => b.priority - a.priority);
  
  return available[0];
}
```

### 12.4 Day Reset & Chapter Advance

```typescript
function resetDay(state: GameState): GameState {
  return {
    ...state,
    
    // Reset time
    currentTime: 0,
    
    // Reset location
    player: {
      ...state.player,
      currentLocation: 'room_player'
    },
    
    // KEEP flags (they persist)
    flags: state.flags,
    
    // Decay trust (tier 2 -> tier 1)
    trust: Object.fromEntries(
      Object.entries(state.trust).map(([char, tier]) => [
        char,
        tier === 2 ? 1 : tier
      ])
    ) as Record<CharacterId, 0 | 1 | 2>,
    
    // Keep scenesSeenEver, reset scenesSeenThisLoop
    scenesSeenEver: state.scenesSeenEver,
    scenesSeenThisLoop: new Set(),
    
    // Reset transient inventory (keep persistent items)
    inventory: state.inventory.filter(item => 
      PERSISTENT_ITEMS.includes(item)
    ),
    
    // Clear observations
    activeObservations: [],
    observationLog: []
  };
}

function advanceChapter(state: GameState, nextChapter?: number): GameState {
  return {
    ...resetDay(state),
    currentLoop: Math.max(state.currentLoop, nextChapter ?? state.currentLoop + 1)
  };
}
```

---

## 13. DATA STRUCTURES

### 13.1 Locations

```typescript
type LocationId = 
  | 'room_player'
  | 'room_2' | 'room_4' | 'room_6' | 'room_9' | 'room_11'
  | 'parking_lot'
  | 'courtyard'
  | 'office'
  | 'diner'
  | 'back_room'
  | 'back_area'
  | 'desert';

interface Location {
  id: LocationId;
  name: string;
  description: string;
  adjacentTo: LocationId[];
  requiresFlag?: string;  // e.g., back_room requires 'has_master_key'
}
```

### 13.2 Characters

```typescript
type CharacterId = 
  | 'earl' | 'marge' 
  | 'karen' | 'david' 
  | 'diane' | 'mo' | 'drifter' 
  | 'vincent';

interface Character {
  id: CharacterId;
  name: string;
  room: LocationId | null;
  schedule: ScheduleEntry[];
}

interface ScheduleEntry {
  startTime: number;
  endTime: number;
  location: LocationId;
}
```

### 13.3 Scenes

```typescript
interface Scene {
  id: string;
  character: CharacterId;
  
  requirements: {
    trust?: 0 | 1 | 2;
    flags?: string[];
    notFlags?: string[];
    chapter?: { min?: number; max?: number };
  };
  
  priority: number;
  oncePer: 'ever' | 'loop' | 'none';
  
  lines: DialogueLine[];
  
  effects: {
    setFlags?: string[];
    clearFlags?: string[];
    setTrust?: { character: CharacterId; tier: 0 | 1 | 2 };
    giveItem?: string;
    unlockLocation?: LocationId;
    advanceTime?: number;
    advanceChapter?: number;
  };
}

interface DialogueLine {
  id?: string;  // For jump targets
  speaker: 'npc' | 'player' | 'narration';
  text: string;
  choices?: DialogueChoice[];
}

interface DialogueChoice {
  text: string;
  next: string;  // ID of line to jump to
  effects?: Scene['effects'];
}
```

### 13.4 Observations

```typescript
interface Observation {
  location: LocationId;
  startTime: number;
  endTime: number;
}

interface ObservationEntry {
  time: number;
  location: LocationId;
  text: string;
  setsFlag?: string;
}
```

---

## 14. CONTENT: FULL NPC SCHEDULES

### 14.1 Schedule Data

```typescript
const SCHEDULES: Record<CharacterId, ScheduleEntry[]> = {
  earl: [
    { startTime: 0, endTime: 960, location: 'office' },      // 6AM-10PM
    { startTime: 960, endTime: 1080, location: 'back_room' } // 10PM-12AM
  ],
  
  marge: [
    { startTime: 0, endTime: 960, location: 'diner' },       // 6AM-10PM
    { startTime: 960, endTime: 1080, location: 'gone' }      // Goes home
  ],
  
  karen: [
    { startTime: 60, endTime: 120, location: 'room_2' },     // 7-8AM
    { startTime: 120, endTime: 180, location: 'diner' },     // 8-9AM
    { startTime: 180, endTime: 540, location: 'courtyard' }, // 9AM-3PM
    { startTime: 540, endTime: 660, location: 'desert' },    // 3-5PM (walks)
    { startTime: 660, endTime: 720, location: 'diner' },     // 5-6PM
    { startTime: 720, endTime: 1080, location: 'room_2' }    // 6PM-12AM
  ],
  
  david: [
    { startTime: 60, endTime: 120, location: 'room_2' },     // 7-8AM
    { startTime: 120, endTime: 180, location: 'diner' },     // 8-9AM
    { startTime: 180, endTime: 480, location: 'room_2' },    // 9AM-2PM
    { startTime: 480, endTime: 660, location: 'gone' },      // 2-5PM (drives)
    { startTime: 660, endTime: 720, location: 'diner' },     // 5-6PM
    { startTime: 720, endTime: 1080, location: 'room_2' }    // 6PM-12AM
  ],
  
  diane: [
    { startTime: 0, endTime: 60, location: 'room_4' },       // 6-7AM
    { startTime: 60, endTime: 120, location: 'diner' },      // 7-8AM
    { startTime: 120, endTime: 540, location: 'gone' },      // 8AM-3PM (town)
    { startTime: 540, endTime: 780, location: 'room_4' },    // 3-7PM
    { startTime: 780, endTime: 900, location: 'diner' },     // 7-9PM
    { startTime: 900, endTime: 1080, location: 'room_4' }    // 9PM-12AM
  ],
  
  mo: [
    { startTime: 0, endTime: 30, location: 'diner' },        // 6-6:30AM
    { startTime: 30, endTime: 780, location: 'gone' },       // 6:30AM-7PM (route)
    { startTime: 780, endTime: 960, location: 'diner' },     // 7-10PM
    { startTime: 960, endTime: 1080, location: 'room_9' }    // 10PM-12AM
  ],
  
  drifter: [
    // Erratic - use random selection from these options each loop
    { startTime: 0, endTime: 1080, location: 'erratic' }     // Special handling
  ],
  
  vincent: [
    { startTime: 0, endTime: 1080, location: 'room_6' }      // Never leaves
  ]
};
```

### 14.2 Observable Events

```typescript
const OBSERVATION_EVENTS: ObservationEntry[] = [
  // Parking lot
  { time: 30, location: 'parking_lot', text: "Mo's truck starts up and pulls onto the highway." },
  { time: 120, location: 'parking_lot', text: "Diane's rental car pulls out, heading toward town." },
  { time: 480, location: 'parking_lot', text: "David's car pulls out. He drives fast, like he's angry." },
  { time: 540, location: 'parking_lot', text: "Diane's rental returns." },
  { time: 585, location: 'parking_lot', text: "An unfamiliar white sedan pulls in. The driver doesn't get out.", setsFlag: 'observed_white_sedan' },
  { time: 630, location: 'parking_lot', text: "The white sedan leaves." },
  { time: 660, location: 'parking_lot', text: "David's car returns." },
  { time: 780, location: 'parking_lot', text: "Mo's truck returns." },
  
  // Diner
  { time: 30, location: 'diner', text: "Mo orders eggs and coffee. He's the only customer." },
  { time: 60, location: 'diner', text: "Diane gets coffee. She watches everyone but talks to no one." },
  { time: 120, location: 'diner', text: "Karen and David sit in a booth. They don't speak to each other." },
  { time: 780, location: 'diner', text: "Mo asks Marge about 'old research places' in the area.", setsFlag: 'observed_mo_asks_facility' },
  { time: 800, location: 'diner', text: "The Drifter enters, orders coffee, sees you watching, leaves immediately." },
  
  // Room 6 door
  { time: 60, location: 'room_6', text: "Earl knocks twice on Room 6. Leaves a tray. No one answers." },
  { time: 360, location: 'room_6', text: "Earl brings another tray. Still no answer." },
  { time: 720, location: 'room_6', text: "Earl brings dinner. You hear movement inside, but the door stays closed." },
  { time: 900, location: 'room_6', text: "Pacing sounds from inside. Back and forth. Back and forth." },
  
  // Courtyard
  { time: 360, location: 'courtyard', text: "Karen sits by the pool, staring at the desert." },
  { time: 540, location: 'courtyard', text: "Karen gets up and walks toward the desert.", setsFlag: 'observed_karen_walks_desert' }
];
```

---

## 15. CONTENT: COMPLETE SCENE SCRIPTS

**CRITICAL: These scenes are the actual game content. They are complete, standalone, and never dynamically modified.**

**Implementation note:** Loop-based thresholds in this document are legacy. The shipped game gates progression by **chapter** (`requirements.chapter`). Refer to the scene files in `src/data/scenes` for authoritative requirements and wording.

### 15.1 MARGE SCENES

---

#### SCENE: marge_tier0_intro

**Requirements:** trust 0, not met_marge  
**Priority:** 100  
**Once per:** ever

```
MARGE:
"Well, look who's up! Coffee's fresh. You look like you could use about three cups."

PLAYER CHOICE:
> "Thanks, I'd love some."
> "How long have you worked here?"
> "Something feels off about this place."

[If "Thanks, I'd love some."]
MARGE:
"Coming right up. I'm Marge. Earl's sister. Been pouring coffee here twenty years and I still can't make a decent cup, but nobody complains."

[If "How long have you worked here?"]
MARGE:
"Twenty years, give or take. Came out here after my divorce. Earl needed help, I needed a change. Worked out for both of us."

[If "Something feels off about this place."]
MARGE:
"Off? Honey, the strangest thing here is Earl's taste in music. It's just a motel. Desert does funny things to people's heads, that's all."

NARRATION:
She pours you a cup of coffee. It's burnt but strong.
```

**Effects:** setFlags: [met_marge]

---

#### SCENE: marge_tier0_repeat

**Requirements:** trust 0, met_marge  
**Priority:** 10  
**Once per:** loop

```
MARGE:
"Back again? Coffee's still fresh. Well, fresh-ish."

NARRATION:
She refills your cup without asking.

PLAYER CHOICE:
> "Thanks."
> [Say nothing]

MARGE:
"You let me know if you need anything."
```

**Effects:** none

---

#### SCENE: marge_tier1_gossip

**Requirements:** trust 1, met_marge  
**Priority:** 50  
**Once per:** loop

```
MARGE:
"You settling in okay? This place grows on you. Or it doesn't. One or the other."

PLAYER CHOICE:
> "Tell me about the other guests."
> "I'm just passing through."

[If "Tell me about the other guests."]
MARGE:
"Well, let's see. That young couple in Room 2 - the Chens - they're newlyweds, supposedly, but they fight like they've been married thirty years."

MARGE:
"The businesswoman in 4, Diane something. She says she's in sales but I've never seen anyone work that hard at selling nothing."

MARGE:
"Big Mo in 9, he's a trucker. Sweetest man you'll ever meet. Tips too much."

MARGE:
"And there's a nervous fella in 11. Don't know his name. He gives me the creeps, if I'm honest."

PLAYER CHOICE:
> "What about Room 6?"
> "Thanks for the rundown."

[If "What about Room 6?"]
MARGE:
"Room 6 is Earl's business. I don't ask."

She pauses, wiping the same spot on the counter.

MARGE:
"Whoever's in there, they've been in there a long time."

[If "Thanks for the rundown."]
MARGE:
"Happy to help. I like knowing who's under my roof. Even if it's Earl's roof, technically."

NARRATION:
She winks and moves on to another customer.
```

**Effects:** setFlags: [marge_mentioned_room6]

---

#### SCENE: marge_tier1_about_earl

**Requirements:** trust 1, met_marge, not asked_marge_about_earl  
**Priority:** 40  
**Once per:** ever

```
PLAYER:
"Tell me about Earl."

MARGE:
"Earl? He's my brother. Older by six years. Been running this motel since... lord, since before I got here."

MARGE:
"He bought it after his boy died. Thomas. Car accident, out on the highway. Earl never really got over it."

NARRATION:
Her voice softens.

MARGE:
"Nobody does, I suppose. Get over something like that. You just learn to carry it."

PLAYER CHOICE:
> "When did Thomas die?"
> "I'm sorry."
> [Say nothing]

[If "When did Thomas die?"]
MARGE:
"Forty years ago, almost. Earl was different before. Lighter. Now he just... keeps going. One day at a time."

[If "I'm sorry."]
MARGE:
"Thank you. It's old grief now. But grief doesn't really get old, does it? Just familiar."

[If say nothing]
MARGE:
"Anyway. That's Earl. He's a good man. Just a sad one."
```

**Effects:** setFlags: [asked_marge_about_earl, knows_thomas_died]

---

#### SCENE: marge_tier1_worried

**Requirements:** trust 1, met_marge, loop min 5  
**Priority:** 45  
**Once per:** ever

```
MARGE:
"Can I ask you something? You seem... observant."

PLAYER CHOICE:
> "Sure."
> "What is it?"

MARGE:
"Is it just me, or is something wrong with Earl lately? The last few months, he's been... different."

MARGE:
"He doesn't sleep. I can tell. And he looks at the guests different now. Like he's waiting for something."

PLAYER CHOICE:
> "I've noticed he seems tired."
> "Maybe he's just getting older."
> "Something is wrong. I don't know what."

[If "I've noticed he seems tired."]
MARGE:
"Tired doesn't cover it. He looks haunted."

She shakes her head.

MARGE:
"Maybe I'm imagining things. Thanks for listening."

[If "Maybe he's just getting older."]
MARGE:
"Could be. Could be. We're all getting older."

She doesn't look convinced.

MARGE:
"Thanks anyway. Forget I said anything."

[If "Something is wrong. I don't know what."]
MARGE:
"So it's not just me."

She looks at you carefully.

MARGE:
"If you figure out what it is, you'll tell me? He won't talk to me anymore. Not really."

NARRATION:
You nod. She seems relieved just to have said it out loud.
```

**Effects:** setFlags: [marge_worried_about_earl]

---

#### SCENE: marge_tier2_confession

**Requirements:** trust 2, marge_worried_about_earl, earl_revealed  
**Priority:** 80  
**Once per:** ever

```
MARGE:
"You know something. About Earl. About what's happening here."

NARRATION:
It's not a question.

PLAYER CHOICE:
> "Yes."
> "What makes you say that?"

MARGE:
"I've watched you two. The way you talk now. Like you're sharing a secret."

MARGE:
"I don't need to know what it is. I just need to know - is he going to be okay?"

PLAYER CHOICE:
> "I'm trying to help him."
> "I don't know yet."
> "He's been through something I can't explain."

[If "I'm trying to help him."]
MARGE:
"Then that's enough. That's enough."

She wipes her eyes quickly.

MARGE:
"You help him. I'll keep the coffee hot. It's all I know how to do."

[If "I don't know yet."]
MARGE:
"Well. At least someone's trying."

She pats your hand.

MARGE:
"That's more than he's done for himself in a long time."

[If "He's been through something I can't explain."]
MARGE:
"Then don't explain it. Just fix it."

She looks at you hard.

MARGE:
"Can you fix it?"

PLAYER CHOICE:
> "I'm going to try."
> "I don't know."

MARGE:
"That'll have to be good enough."
```

**Effects:** setFlags: [marge_knows_you_know], setTrust: { character: 'marge', tier: 2 }

---

### 15.2 EARL SCENES

---

#### SCENE: earl_tier0_intro

**Requirements:** trust 0, not met_earl  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The man behind the desk looks up from a ledger that might be older than you. He's thin, weathered, with eyes that have seen too much highway.

EARL:
"Help you?"

PLAYER CHOICE:
> "Just looking around."
> "I'm staying here. Room 7."
> "Quiet place."

[If "Just looking around."]
EARL:
"Not much to look at. Twelve rooms, a diner, and a whole lot of desert."

[If "I'm staying here. Room 7."]
EARL:
"I know. I checked you in last night."

He pauses, studying you.

EARL:
"You look like you've been here longer."

[If "Quiet place."]
EARL:
"That's what people come here for. Quiet. Some find it peaceful. Others find it..."

He trails off.

EARL:
"You need anything, I'm here till ten."
```

**Effects:** setFlags: [met_earl]

---

#### SCENE: earl_tier0_repeat

**Requirements:** trust 0, met_earl  
**Priority:** 10  
**Once per:** loop

```
EARL:
"Something I can help you with?"

PLAYER CHOICE:
> "Just passing through."
> [Say nothing]

EARL:
"Right."

NARRATION:
He returns to his ledger. The conversation is over.
```

**Effects:** none

---

#### SCENE: earl_tier1_probing

**Requirements:** trust 1, met_earl, loop min 3  
**Priority:** 50  
**Once per:** loop

```
EARL:
"You're still here."

PLAYER CHOICE:
> "Car trouble."
> "Something about this place."
> "Aren't you always here too?"

[If "Car trouble."]
EARL:
"Mmhm. Mechanic's thirty miles east. If you can get there."

His eyes flicker with something. Amusement? Sadness?

EARL:
"Most folks can't."

[If "Something about this place."]
EARL:
"Is there?"

He sets down his pen.

EARL:
"Most people can't wait to leave. You're different."

[If "Aren't you always here too?"]
EARL:
"Forty years. Give or take."

He looks at the wall of keys.

EARL:
"Someone has to keep the lights on."
```

**Effects:** none

---

#### SCENE: earl_tier1_anomaly_noticed

**Requirements:** trust 1, observed_earl_anomaly  
**Priority:** 70  
**Once per:** ever

```
PLAYER:
"I saw you last night. After the office closed. You went to the back room."

NARRATION:
Earl goes very still.

EARL:
"You were watching me."

PLAYER CHOICE:
> "I watch everyone."
> "I couldn't sleep."
> "Something's happening here. I'm trying to understand."

[If "I watch everyone."]
EARL:
"Smart. In a place like this, it pays to watch."

He considers you.

EARL:
"What else have you seen?"

[If "I couldn't sleep."]
EARL:
"Neither can I. Not anymore."

[If "Something's happening here. I'm trying to understand."]
EARL:
"Are you now."

He leans forward.

EARL:
"And how many days have you been trying?"

NARRATION:
The question hangs in the air. He knows. He knows you know something.

PLAYER CHOICE:
> "Days?"
> "More than I can count."
> "You know about the loop."

[If "Days?" - LEADS TO NEXT SCENE]
EARL:
"Come back when you're ready to stop pretending."

[If "More than I can count." or "You know about the loop." - TRIGGERS REVEAL]
EARL:
"Sit down. We need to talk."
```

**Effects:** setFlags: [earl_knows_you_know]

---

#### SCENE: earl_reveal

**Requirements:** trust 1, earl_knows_you_know, loop min 10  
**Priority:** 100  
**Once per:** ever

```
EARL:
"How many loops?"

PLAYER CHOICE:
> "Twelve. Maybe more."
> "I stopped counting."

EARL:
"Took you about average. Most folks take two, three weeks to start remembering. Some never do."

NARRATION:
He looks at you with something like respect.

EARL:
"But you remembered right away, didn't you? First reset, you knew."

PLAYER CHOICE:
> "Yes."
> "How did you know?"

EARL:
"I've been watching you since you got here. The way you move. The way you look at people. Like you've met them before."

He pulls out a chair.

EARL:
"I've been in this loop for six months. Give or take. Hard to keep track after the first thousand."

PLAYER CHOICE:
> "A thousand loops?"
> "How is this possible?"
> "How do we stop it?"

[If "A thousand loops?"]
EARL:
"More. I stopped counting around day hundred. Didn't see the point."

[If "How is this possible?"]
EARL:
"You want the short version or the long one?"

[If "How do we stop it?"]
EARL:
"If I knew that, do you think we'd still be here?"

He sighs.

EARL:
"But I'll tell you what I know."

NARRATION:
Earl tells you about Thomas. About the device. About six months of trying everything.

EARL:
"It's in the back room. I can show you."

PLAYER CHOICE:
> "Show me."
> "Why are you telling me this?"

[If "Show me."]
EARL:
"Come on."

[If "Why are you telling me this?"]
EARL:
"Because I'm tired. Because I can't do this alone anymore. Because you remembered, and that means something."

He stands.

EARL:
"Now come on. You need to see it."
```

**Effects:** setFlags: [earl_revealed], unlockLocation: back_room

---

#### SCENE: earl_post_reveal_device

**Requirements:** trust 1, earl_revealed, not seen_device  
**Priority:** 90  
**Once per:** ever

```
NARRATION:
The back room is cramped. A cot in the corner. Boxes stacked against walls. Photos of a young man you don't recognize.

And on the workbench: a cylinder, the size of a coffee thermos, humming softly.

EARL:
"That's it. Thomas's. From the facility where he worked."

PLAYER CHOICE:
> "What does it do?"
> "Can I touch it?"
> "Have you tried destroying it?"

[If "What does it do?"]
EARL:
"Near as I can figure? It responds to wanting. To grief. I turned it on thinking of Thomas, wishing for... I don't know. More time."

He laughs bitterly.

EARL:
"Well. I got more time."

[If "Can I touch it?"]
EARL:
"Go ahead. Won't hurt you. Won't do anything. It only listens to me."

[If "Have you tried destroying it?"]
EARL:
"Smashed it. Buried it. Threw it in the desert. Every morning, it's back. Right here. Humming."

NARRATION:
The device continues its soft hum. It sounds almost like breathing.
```

**Effects:** setFlags: [seen_device]

---

#### SCENE: earl_tier2_thomas

**Requirements:** trust 2, seen_device, has_thomas_journal  
**Priority:** 85  
**Once per:** ever

```
PLAYER:
"I found Thomas's journal. In the storage area."

NARRATION:
Earl's face changes. Something cracks behind his eyes.

EARL:
"You... where?"

PLAYER:
"Behind some boxes. I don't think you ever looked there."

NARRATION:
You hand him the journal. His hands shake as he takes it.

EARL:
"I couldn't. After he died, I couldn't look at his things. Just boxed it all up and..."

He trails off, opening the journal.

NARRATION:
For a long moment, he just reads. You see tears forming, falling, ignored.

EARL:
"He knew. About the device. What it could do."

Earl looks up.

EARL:
"He wrote that he hoped I'd never find it. That I'd never be tempted to use it."

PLAYER CHOICE:
> "He loved you."
> "He wanted you to move on."
> [Say nothing]

[If "He loved you."]
EARL:
"I know. I always knew."

[If "He wanted you to move on."]
EARL:
"He did. He wrote it right here. 'Move on, Dad. Please.'"

[If say nothing]
NARRATION:
Earl reads silently. His shoulders shake.

EARL:
"Forty years. He's been waiting forty years for me to let go."

He closes the journal.

EARL:
"I don't know if I can."
```

**Effects:** setFlags: [earl_read_journal]

---

### 15.3 KAREN SCENES

---

#### SCENE: karen_tier0_intro

**Requirements:** trust 0, not met_karen  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The woman looks up from her book. She's trying to appear relaxed, but there's tension in her shoulders.

KAREN:
"Hi. Sorry, do I know you?"

PLAYER CHOICE:
> "We're both staying here. Room 7."
> "Just being friendly."
> "You look like you've got something on your mind."

[If "We're both staying here. Room 7."]
KAREN:
"Right. The motel. Small world."

She offers a polite smile that doesn't reach her eyes.

KAREN:
"I'm Karen. This is... well, this is supposed to be my honeymoon road trip. Not exactly the Ritz."

[If "Just being friendly."]
KAREN:
"Friendly's good. I could use friendly."

She glances toward Room 2.

KAREN:
"I'm Karen."

[If "You look like you've got something on your mind."]
KAREN:
"Is it that obvious?"

She laughs without humor.

KAREN:
"I'm Karen. And yes. I do."
```

**Effects:** setFlags: [met_karen]

---

#### SCENE: karen_tier1_light

**Requirements:** trust 1, met_karen  
**Priority:** 60  
**Once per:** ever

```
KAREN:
"Can I tell you something? Something that's going to sound crazy?"

PLAYER CHOICE:
> "Sure."
> "Crazy how?"

KAREN:
"Last night. I couldn't sleep. I was looking out the window, at the desert, and I saw... a light."

PLAYER CHOICE:
> "What kind of light?"
> "Where?"
> "What did David think?"

[If "What kind of light?"]
KAREN:
"Not headlights. Not a plane. Something else. It was... wrong. Like it was there and not there at the same time."

[If "Where?"]
KAREN:
"Out past the highway. Maybe a mile? Two? I couldn't tell. But I marked the direction."

[If "What did David think?"]
KAREN:
"David thinks I imagined it. Or that I'm stressed. Or that the desert is playing tricks on me."

She sets her jaw.

KAREN:
"I didn't imagine it."

PLAYER CHOICE:
> "I believe you."
> "Do you know what it was?"
> "Can you show me where?"

[If "I believe you."]
KAREN:
"Thank you. You don't know how much that means."

[If "Do you know what it was?" or "Can you show me where?"]
KAREN:
"I don't know what it was. But I've been walking toward it. Every afternoon. Each day I go a little further."

She looks at the desert.

KAREN:
"Today I'm going to find it."
```

**Effects:** setFlags: [karen_mentioned_light]

---

#### SCENE: karen_tier2_location

**Requirements:** trust 2, karen_mentioned_light  
**Priority:** 80  
**Once per:** ever

```
KAREN:
"I found where the light was coming from."

PLAYER CHOICE:
> "Where?"
> "What was it?"

KAREN:
"There's something out there. In the desert. About two miles past the mile marker 7 sign."

She pulls out her phone, shows you a photo.

KAREN:
"It looks like an old building. Half-buried in sand. I couldn't get close - something felt wrong. Like the air was heavy."

PLAYER CHOICE:
> "That sounds like the facility."
> "You should stay away from there."
> "Thank you for telling me."

[If "That sounds like the facility."]
KAREN:
"Facility? What facility?"

NARRATION:
You realize you've said too much. Or maybe just enough.

[If "You should stay away from there."]
KAREN:
"Believe me, I don't want to go back. But I needed to know I wasn't crazy."

[If "Thank you for telling me."]
KAREN:
"You believe me. That's worth more than thanks."
```

**Effects:** setFlags: [karen_told_location, knows_facility_location]

---

### 15.4 VINCENT SCENES

---

#### SCENE: vincent_tier0_door_closed

**Requirements:** not vincent_contacted, knows_room6_occupied  
**Priority:** 100  
**Once per:** loop

```
NARRATION:
You knock on the door of Room 6. The "Do Not Disturb" sign sways slightly.

Silence.

PLAYER CHOICE:
> [Knock again]
> [Say something through the door]
> [Leave]

[If knock again]
NARRATION:
Still nothing. But you sense movement inside. Someone's there.

[If say something]
PLAYER:
"I know someone's in there."

NARRATION:
A long pause. Then, muffled through the door:

VINCENT:
"Go away."

PLAYER CHOICE:
> "Earl sent me."
> "I need to talk to you."
> [Leave]

[If "Earl sent me."]
VINCENT:
"Earl sends lots of people. They all give up."

VINCENT:
"You will too."

[If "I need to talk to you."]
VINCENT:
"No. You don't."

[If leave]
NARRATION:
You walk away. The door stays closed.
```

**Effects:** setFlags: [tried_vincent_door]

---

#### SCENE: vincent_tier0_earl_intro

**Requirements:** trust 0, earl_revealed, not vincent_contacted, tried_vincent_door  
**Priority:** 90  
**Once per:** ever

```
EARL:
"You've been knocking on Room 6."

PLAYER CHOICE:
> "Who's in there?"
> "He told me to go away."

EARL:
"His name's Vincent. He checked in three months ago. Figured out the loop about two weeks in."

Earl pauses.

EARL:
"He tried to help me for a while. We worked together. Ran experiments. Nothing worked."

PLAYER CHOICE:
> "What happened?"
> "Why doesn't he come out?"

EARL:
"He gave up. One day he just... stopped. Went into his room and didn't come out."

EARL:
"I bring him food. He's still alive in there. But he's not really living."

PLAYER CHOICE:
> "I need to talk to him."
> "He might know something you don't."

EARL:
"Maybe. He was sharper than me about some things. Saw patterns I missed."

He pulls out a key.

EARL:
"This opens his door. But I wouldn't recommend barging in. Try talking through it first. He might listen."
```

**Effects:** setFlags: [earl_told_about_vincent], giveItem: room6_key

---

#### SCENE: vincent_tier1_through_door

**Requirements:** trust 0, earl_told_about_vincent, not vincent_opened_door  
**Priority:** 85  
**Once per:** loop

```
NARRATION:
You stand outside Room 6.

PLAYER:
"Vincent. Earl told me about you."

NARRATION:
Silence. Then:

VINCENT:
"Earl talks too much."

PLAYER CHOICE:
> "He says you gave up."
> "He says you were close to figuring it out."
> "I'm stuck too."

[If "He says you gave up."]
VINCENT:
"Gave up implies there was something to give up on. There isn't. There's no way out."

PLAYER CHOICE:
> "How do you know?"
> "Maybe you missed something."

VINCENT:
"How do I know? Because I tried everything. EVERYTHING. For weeks."

His voice cracks.

VINCENT:
"Go away. I can't watch another person fail."

[If "He says you were close to figuring it out."]
VINCENT:
"Close. Yes. I was always close. Never there."

[If "I'm stuck too."]
VINCENT:
"Then you understand. The best thing you can do is find a room and wait. It's easier than hoping."
```

**Effects:** none

---

#### SCENE: vincent_tier1_door_opens

**Requirements:** trust 1, earl_told_about_vincent, loop min 20  
**Priority:** 95  
**Once per:** ever

```
NARRATION:
You've been talking through the door for... how many loops now? You've lost count.

PLAYER:
"Vincent. I'm not giving up."

VINCENT:
"I know. I've been listening. Every loop, you come back. Every loop, you're still trying."

A pause.

VINCENT:
"Why?"

PLAYER CHOICE:
> "Because someone has to."
> "Because I can't accept this."
> "Because Earl needs help."

[If "Because someone has to."]
VINCENT:
"That's what I said too. Once."

[If "Because I can't accept this."]
VINCENT:
"Neither could I. But acceptance came anyway."

[If "Because Earl needs help."]
VINCENT:
"Earl. Yes. He's carrying more than anyone should."

NARRATION:
You hear movement. A shuffle. A click.

The door opens.

Vincent looks exactly like a man who's been alone in a dark room for three months. Hollow eyes. Unkempt beard. But there's something still alive in there.

VINCENT:
"Come in. Let me show you what I found."
```

**Effects:** setFlags: [vincent_opened_door, vincent_contacted], unlockLocation: room_6_interior

---

#### SCENE: vincent_tier2_full_reveal

**Requirements:** trust 2, vincent_opened_door  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The walls of Room 6 are covered in writing. Schedules. Timelines. Maps. The obsessive work of a man trying to solve an unsolvable puzzle.

VINCENT:
"This is everything I learned. Every pattern. Every anomaly."

He points to a timeline.

VINCENT:
"The loop started six months ago. Earl activated the device. But the device was built for something else. Something that happened here forty years ago."

PLAYER CHOICE:
> "Thomas."
> "The facility."

VINCENT:
"Both. Thomas worked at that facility. They were experimenting with temporal fields. Ways to freeze moments in time."

VINCENT:
"Thomas died in a car accident. But the research didn't. Someone took the device when the facility shut down."

PLAYER CHOICE:
> "Earl found it."
> "How do we turn it off?"

VINCENT:
"Earl found it. And when he touched it, all that grief, all that wanting... it activated."

He sits heavily on the bed.

VINCENT:
"The device responds to emotion. It gave Earl what he wanted - a world that never moves forward. Never changes. Never leaves him behind."

PLAYER:
"How do we turn it off?"

VINCENT:
"That's the thing. I figured it out. Months ago."

He looks at you with tired eyes.

VINCENT:
"Earl has to let go. Really let go. The device won't release him until he releases Thomas."

PLAYER CHOICE:
> "That's it?"
> "He can't do that."
> "Then we help him."

[If "That's it?"]
VINCENT:
"That's it. Simple, right? Just let go of your dead son. Just accept that he's gone forever. Just move on after forty years of grief."

He laughs bitterly.

VINCENT:
"Simple."

[If "He can't do that."]
VINCENT:
"I know. I told him. We tried everything else first. But there is nothing else."

[If "Then we help him."]
VINCENT:
"How? How do you help someone grieve?"

He looks at you.

VINCENT:
"You're welcome to try. I couldn't reach him."
```

**Effects:** setFlags: [vincent_told_everything, knows_how_to_end_loop]

---

### 15.5 DIANE SCENES

---

#### SCENE: diane_tier0_intro

**Requirements:** trust 0, not met_diane  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The woman at the booth glances up from her laptop. Professional. Guarded. Her eyes assess you in a second.

DIANE:
"Can I help you?"

PLAYER CHOICE:
> "Just introducing myself. I'm staying here too."
> "What are you working on?"
> "You don't look like a tourist."

[If "Just introducing myself."]
DIANE:
"Diane. Sales. Just passing through."

Her smile is polished and meaningless.

[If "What are you working on?"]
DIANE:
"Reports. Boring stuff."

She angles the laptop slightly away from you.

[If "You don't look like a tourist."]
DIANE:
"Neither do you."

She studies you.

DIANE:
"Diane. I'm in sales. What's your excuse for being here?"
```

**Effects:** setFlags: [met_diane]

---

#### SCENE: diane_tier1_cover_blown

**Requirements:** trust 1, met_diane, observed_diane_earl_talk  
**Priority:** 70  
**Once per:** ever

```
PLAYER:
"I saw you talking to Earl yesterday. You were asking him about people who've gone missing."

NARRATION:
Diane goes very still. Her professional mask slips for just a moment.

DIANE:
"You were watching me."

PLAYER CHOICE:
> "I watch everyone."
> "What are you really doing here?"

DIANE:
"Fine. Cards on the table."

She closes her laptop.

DIANE:
"I'm an investigator. Insurance fraud, missing persons, that kind of thing. And this stretch of highway has too many missing persons for coincidence."

PLAYER CHOICE:
> "How many?"
> "What have you found?"

DIANE:
"Fifteen in the last forty years. All vanished within a few miles of this motel. No bodies. No evidence. Just gone."

She looks at you hard.

DIANE:
"What do you know?"
```

**Effects:** setFlags: [diane_cover_blown]

---

#### SCENE: diane_tier2_files

**Requirements:** trust 2, diane_cover_blown  
**Priority:** 85  
**Once per:** ever

```
DIANE:
"I'm going to show you something. Don't make me regret it."

She opens a folder on her laptop. Missing persons reports. Photos. A timeline.

DIANE:
"Fifteen people. Forty years. All within a ten-mile radius of this motel."

She points to a name.

DIANE:
"This one stands out. Thomas Earl. Died in a car accident forty-one years ago. Except..."

PLAYER CHOICE:
> "Except what?"
> "That's Earl's son."

DIANE:
"Except the accident report is sealed. And his employer was a government research facility that doesn't exist in any records."

She looks at you.

DIANE:
"You know something. I can tell."

PLAYER CHOICE:
> [Tell her about the loop]
> [Tell her about Earl]
> [Say nothing]

[If tell about loop]
NARRATION:
You tell her. Everything. She listens without interrupting.

DIANE:
"A time loop. That's... that's insane."

But she's not dismissing it. She's thinking.

DIANE:
"It would explain the missing persons. If they got too close to something and got... stuck."

[If tell about Earl]
DIANE:
"Earl? The clerk? He's connected to this?"

[If say nothing]
DIANE:
"Fine. Keep your secrets. But if you find anything that helps me close these cases, I want to know."
```

**Effects:** setFlags: [diane_showed_files, knows_missing_persons_pattern]

---

### 15.6 MO SCENES

---

#### SCENE: mo_tier0_intro

**Requirements:** trust 0, not met_mo  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The big man takes up most of the booth. He looks up with a friendly smile.

MO:
"Hey there! Pull up a seat if you want. Gets lonely on the road."

PLAYER CHOICE:
> "Thanks. I'm staying here at the motel."
> "You're a trucker?"
> "Sure."

MO:
"Mo. Short for Morris, but nobody calls me that except my mama."

He gestures at the highway through the window.

MO:
"I'm on this route twice a month. This place is my halfway point. Marge makes the best eggs between here and El Paso."

NARRATION:
He seems genuinely glad for the company.
```

**Effects:** setFlags: [met_mo]

---

#### SCENE: mo_tier1_deja_vu

**Requirements:** trust 1, met_mo, loop min 5  
**Priority:** 60  
**Once per:** ever

```
MO:
"Can I ask you something weird?"

PLAYER CHOICE:
> "Sure."
> "How weird?"

MO:
"You ever get the feeling you've done something before? Like, exactly before?"

PLAYER CHOICE:
> "Déjà vu?"
> "All the time."
> "What did you experience?"

MO:
"I've been through this motel... I don't know how many times now. But lately it feels different. Like I've had the same conversation with Marge a hundred times."

He shakes his head.

MO:
"I know it sounds crazy. But this morning, I knew what she was going to say before she said it. Word for word."

PLAYER CHOICE:
> "That's not crazy."
> "Trust that feeling."
> "What else do you remember?"

[If "That's not crazy."]
MO:
"No?"

He looks relieved.

MO:
"I was starting to think I was losing it."

[If "Trust that feeling."]
MO:
"Why? Do you know something?"

[If "What else do you remember?"]
MO:
"Bits and pieces. Like dreams you can't quite hold onto."
```

**Effects:** setFlags: [mo_felt_deja_vu]

---

#### SCENE: mo_tier2_remember

**Requirements:** trust 2, mo_felt_deja_vu  
**Priority:** 80  
**Once per:** ever

```
PLAYER:
"Mo. I need you to concentrate. What do you remember?"

MO:
"Remember about what?"

PLAYER:
"About being here before. Not just this trip. Before that."

NARRATION:
Mo closes his eyes. His brow furrows.

MO:
"I... there's something. Like a dream. We're in the diner, but it's the same day. Over and over."

His eyes snap open.

MO:
"How many times have I been here?"

PLAYER CHOICE:
> "I don't know. Dozens? Hundreds?"
> "It's a loop. The day keeps repeating."

MO:
"A loop. That's..."

He trails off. Then:

MO:
"That's why I can't leave. Every time I drive past mile marker 20, I wake up back here."

PLAYER:
"You've tried to leave?"

MO:
"Yeah. I think. I remember trying. I remember failing."

He looks at you with new understanding.

MO:
"We're stuck here. All of us."
```

**Effects:** setFlags: [mo_remembers]

---

### 15.7 DRIFTER SCENES

---

#### SCENE: drifter_tier0_intro

**Requirements:** trust 0, not met_drifter  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The man flinches when you approach. He's thin, unshaven, with eyes that dart to every exit.

DRIFTER:
"I don't know you."

PLAYER CHOICE:
> "I'm just staying at the motel."
> "You seem nervous."
> "What's your name?"

[If "I'm just staying at the motel."]
DRIFTER:
"So am I. Doesn't make us friends."

[If "You seem nervous."]
DRIFTER:
"Everyone seems nervous when you look at them the way you're looking at me."

[If "What's your name?"]
DRIFTER:
"Just passing through. That's all you need to know."

NARRATION:
He looks past you, checking the door.

DRIFTER:
"Look, I don't want trouble. Leave me alone and I'll leave you alone."
```

**Effects:** setFlags: [met_drifter]

---

#### SCENE: drifter_tier1_father

**Requirements:** trust 1, met_drifter  
**Priority:** 60  
**Once per:** ever

```
DRIFTER:
"Why do you keep talking to me?"

PLAYER CHOICE:
> "You know something about this place."
> "I'm trying to understand what's happening here."
> "You're scared. I want to know why."

DRIFTER:
"You want to know why I'm here? Fine."

He looks around, then leans closer.

DRIFTER:
"My father worked at a facility near here. Forty years ago. He died there."

PLAYER CHOICE:
> "What kind of facility?"
> "How did he die?"

DRIFTER:
"Government research. Classified stuff. They said it was an accident. Equipment malfunction."

His hands shake.

DRIFTER:
"But I found his notes. He was working on something. Something about time."

PLAYER CHOICE:
> "Temporal fields."
> "Keep talking."

DRIFTER:
"How do you know that term?"

PLAYER CHOICE:
> "I've learned things."
> "Does it matter?"

DRIFTER:
"It matters because nobody's supposed to know that. Nobody."

He stares at you.

DRIFTER:
"Who are you?"
```

**Effects:** setFlags: [drifter_told_father]

---

#### SCENE: drifter_tier2_facility_location

**Requirements:** trust 2, drifter_told_father  
**Priority:** 80  
**Once per:** ever

```
DRIFTER:
"I'm going to tell you something. And then I'm going to leave. And if you're smart, you'll do the same."

PLAYER CHOICE:
> "Tell me."
> "I can't leave."

DRIFTER:
"The facility. It's two miles into the desert. Past mile marker 7. Half-buried now, but it's there."

He pulls out a worn piece of paper. A map.

DRIFTER:
"My father drew this. He wanted someone to find it if something went wrong."

PLAYER CHOICE:
> "What went wrong?"
> "What's out there now?"

DRIFTER:
"They were trying to freeze time. Create bubbles where nothing changed. Preserve moments forever."

He laughs bitterly.

DRIFTER:
"Looks like they succeeded."

PLAYER:
"You know about the loop."

DRIFTER:
"I've been here before. I've had this conversation before. I remember pieces."

He presses the map into your hands.

DRIFTER:
"I've been trying to leave for weeks. Every time I get too far, I wake up back here. But maybe you can do something I can't."
```

**Effects:** setFlags: [drifter_told_facility_location, has_facility_map]

---

### 15.8 DAVID SCENES

---

#### SCENE: david_tier0_intro

**Requirements:** trust 0, not met_david  
**Priority:** 100  
**Once per:** ever

```
NARRATION:
The man sits alone in a booth, staring at his phone. He looks up as you approach, and his expression says "please don't."

DAVID:
"Hey."

PLAYER CHOICE:
> "You're staying here with Karen?"
> "You okay?"
> [Nod and move on]

[If "You're staying here with Karen?"]
DAVID:
"Yeah. My wife. We're on a road trip."

He doesn't sound thrilled.

DAVID:
"Supposed to be a honeymoon thing. Hasn't gone exactly as planned."

[If "You okay?"]
DAVID:
"Peachy."

His tone suggests otherwise.

[If nod and move on]
NARRATION:
He seems relieved you're leaving.
```

**Effects:** setFlags: [met_david]

---

#### SCENE: david_tier1_karen_concerns

**Requirements:** trust 1, met_david, karen_mentioned_light  
**Priority:** 50  
**Once per:** ever

```
DAVID:
"Has Karen been talking to you? About what she saw?"

PLAYER CHOICE:
> "The light in the desert?"
> "She mentioned something."

DAVID:
"Look, I love her. But she's not... she hasn't been sleeping well. And now she's got this fixation."

PLAYER CHOICE:
> "What if she really saw something?"
> "You don't believe her."

[If "What if she really saw something?"]
DAVID:
"Then I'd want to know what. But there's nothing out there. It's desert. Just desert."

[If "You don't believe her."]
DAVID:
"I believe she thinks she saw something. There's a difference."

He sighs.

DAVID:
"I don't know what to do. She keeps walking out there every afternoon, looking for something that isn't real."
```

**Effects:** setFlags: [david_expressed_concern]

---

#### SCENE: david_tier2_reconcile

**Requirements:** trust 2, karen_told_location, david_expressed_concern  
**Priority:** 85  
**Once per:** ever

```
PLAYER:
"David. Karen wasn't imagining things. There's something out there."

DAVID:
"What?"

PLAYER:
"An old research facility. I've seen the records. What Karen saw was real."

NARRATION:
David's face changes. Something between relief and fear.

DAVID:
"She was right?"

PLAYER CHOICE:
> "Yes."
> "You should talk to her."

DAVID:
"God. I've been such an ass."

He stands.

DAVID:
"I need to apologize. I need to tell her I believe her."

He pauses at the door.

DAVID:
"Thank you. For telling me."

NARRATION:
He leaves to find Karen.
```

**Effects:** setFlags: [david_believes_karen]

---

### 15.9 ENDING SCENES

---

#### SCENE: ending_a_release

**Requirements:** ready_for_ending, earl_read_journal  
**Priority:** 1000  
**Once per:** ever

```
NARRATION:
You find Earl in the back room. He's holding the journal. The device hums softly behind him.

EARL:
"I've been reading this all night. Every loop. Every word."

PLAYER CHOICE:
> "What does it say?"
> "Are you ready?"

EARL:
"Thomas. My boy. He knew I'd find this someday. He knew I'd be tempted."

He turns to face the device.

EARL:
"He asked me to let go. Forty years ago, in a letter I never read."

PLAYER:
"Earl..."

EARL:
"I'm tired. I'm so tired of living the same day. Of watching people come and go and forget."

He reaches toward the device.

EARL:
"Thomas is gone. He's been gone for forty years."

His hand trembles.

EARL:
"And it's time I let him stay gone."

NARRATION:
Earl turns off the device.

The hum stops.

The air changes.

For the first time in six months, time moves forward.

NARRATION:
Morning comes. A new morning. Different light through the windows.

The guests wake confused but free. Cars start. People drive away.

Marge finds Earl sitting on a chair outside the office, watching the highway.

MARGE:
"Earl? You okay?"

EARL:
"I think I will be."

NARRATION:
The camera pulls back. The motel sits in the desert, no longer a trap. Just a place.

Just a last stop.

[END]
```

**Effects:** setFlags: [ending_complete, ending_a]

---

#### SCENE: ending_d_stay

**Requirements:** ready_for_ending, loop min 100  
**Priority:** 900  
**Once per:** ever

```
NARRATION:
Earl looks at you across the desk. The device hums in the back room.

EARL:
"You've been here a long time. Longer than most."

PLAYER CHOICE:
> "I know how to end this."
> "I'm not ready to leave."

[If "I know how to end this."]
EARL:
"But?"

PLAYER:
"But I'm not sure I want to."

[If "I'm not ready to leave."]
EARL:
"Neither am I. Even now."

NARRATION:
You both stand in silence.

EARL:
"There's something about knowing everyone. Every conversation. Every pattern."

PLAYER:
"It feels like home. In a way."

EARL:
"That's what I told myself. For a long time."

PLAYER CHOICE:
> "Maybe we stay."
> "Maybe that's okay."

NARRATION:
The day ends. The loop resets.

You wake at 6AM.

The same sun. The same desert. The same coffee.

Marge smiles at you from behind the counter.

MARGE:
"You look like you've been here before, hun."

NARRATION:
You smile back.

You have.

[END]
```

**Effects:** setFlags: [ending_complete, ending_d]

---

## 16. WRITING STYLE GUIDE

### 16.1 Voice & Tone

**Overall tone:** Dark with dry humor. Melancholy, not depressing. Moments of warmth between moments of dread.

**Narrative voice:** Second person present. Observational. Sparse.

> You walk into the diner. Marge looks up from a coffee pot she's been polishing for the past hour. Same spot. Same circular motion. She smiles like she means it, and maybe she does.

### 16.2 Character Voices

**Earl:** Clipped. Says less than he knows. Periods, not commas.
> "Help you?"
> "Forty years. Give or take."

**Marge:** Warm. Chatty. Run-on sentences. Terms of endearment.
> "Well, look who's up! Coffee's fresh, and don't tell me you're not hungry."

**Karen:** Direct. Clipped when stressed.
> "I saw something. Don't tell me I didn't."

**David:** Measured. Trying to sound calmer than he is.
> "She's just tired. Long drive. We'll be out of here tomorrow."

**Diane:** Professional. Reveals nothing.
> "I'm in insurance. Boring stuff."

**Mo:** Rambling. Friendly. Stories.
> "Fourth time I've driven this stretch this month. Or is it fifth? Hell, they all blur together."

**Drifter:** Fast. Nervous. Fragments.
> "I'm not crazy. I know how I look. I know what you're thinking."

**Vincent:** Flat. Defeated. Dry humor emerges.
> "Go away."
> "Points for persistence. Minus points for common sense."

### 16.3 Dialogue Rules

1. Each line is complete - no dependencies on complex state
2. Player choices max 3 options
3. No "if you said X earlier" callbacks within a scene
4. Effects are explicit and simple

---

## 17. IMPLEMENTATION PHASES

### Phase 1: Core Engine (Days 1-3)

**Goal:** Movement, time, basic state

- [ ] Project setup (React + TS + Vite + Zustand + Tailwind)
- [ ] Flag-based state system
- [ ] Location system
- [ ] Time system (advance with actions)
- [ ] Day reset at midnight
- [ ] Save/load to localStorage

**Milestone:** Can walk around, have time pass, day resets.

### Phase 2: Scene System (Days 4-5)

**Goal:** Dialogue plays from data

- [ ] Scene data structure
- [ ] Scene selection function
- [ ] Scene player component
- [ ] Effects application
- [ ] 2 NPCs (Marge, Earl) with 3 scenes each

**Milestone:** Can have conversations that set flags.

### Phase 3: All Characters (Days 6-9)

**Goal:** Full cast implemented

- [ ] All 8 character schedules
- [ ] All Tier 0 and Tier 1 scenes (32 scenes)
- [ ] NPC location tracking by time
- [ ] Trust system (3 tiers)

**Milestone:** Can meet everyone, have basic conversations.

### Phase 4: Idle System (Days 10-12)

**Goal:** Observations work

- [ ] Observation setup UI
- [ ] Idle time calculation
- [ ] Event generation from schedule data
- [ ] Observation log display

**Milestone:** Can observe while away, see what happened.

### Phase 5: Mystery Content (Days 13-16)

**Goal:** Main plot works

- [ ] All Tier 2 scenes (15 scenes)
- [ ] All Special scenes (11 scenes)
- [ ] Earl reveal sequence
- [ ] Vincent reveal sequence
- [ ] Knowledge display

**Milestone:** Mystery is solvable.

### Phase 6: Endings (Days 17-19)

**Goal:** Multiple endings

- [ ] Ending A: Release
- [ ] Ending D: Stay
- [ ] (Optional: B, C, E)
- [ ] End screens

**Milestone:** Game can be finished.

### Phase 7: Polish (Days 20-21)

**Goal:** Ship it

- [ ] Tutorial hints
- [ ] Insight system
- [ ] PWA manifest
- [ ] Play testing
- [ ] Bug fixes

**Milestone:** Ready for r/incremental_games.

---

## 18. FILE STRUCTURE

```
last-stop/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   │
│   ├── store/
│   │   ├── gameStore.ts       # Main Zustand store
│   │   ├── selectors.ts       # Derived state
│   │   └── actions.ts         # State mutations
│   │
│   ├── engine/
│   │   ├── sceneSelector.ts   # Pick scene based on flags
│   │   ├── timeSystem.ts      # Advance time, reset loop
│   │   ├── observationSystem.ts
│   │   └── saveLoad.ts
│   │
│   ├── data/
│   │   ├── locations.ts
│   │   ├── characters.ts
│   │   ├── schedules.ts
│   │   ├── observations.ts
│   │   └── scenes/
│   │       ├── marge.ts       # All Marge scenes
│   │       ├── earl.ts        
│   │       ├── karen.ts
│   │       ├── david.ts
│   │       ├── diane.ts
│   │       ├── mo.ts
│   │       ├── drifter.ts
│   │       ├── vincent.ts
│   │       └── endings.ts
│   │
│   ├── components/
│   │   ├── LocationView.tsx
│   │   ├── ActionPanel.tsx
│   │   ├── DialogueView.tsx
│   │   ├── MapView.tsx
│   │   ├── KnowledgeView.tsx
│   │   ├── ObservationSetup.tsx
│   │   ├── ObservationLog.tsx
│   │   └── ui/
│   │
│   ├── screens/
│   │   ├── GameScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── KnowledgeScreen.tsx
│   │   └── EndingScreen.tsx
│   │
│   └── types/
│       └── index.ts           # All TypeScript interfaces
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## APPENDIX: SCENE REQUIREMENTS QUICK REFERENCE

| Scene ID | Character | Trust | Required Flags | Not Flags | Priority |
|----------|-----------|-------|----------------|-----------|----------|
| marge_tier0_intro | marge | 0 | - | met_marge | 100 |
| marge_tier0_repeat | marge | 0 | met_marge | - | 10 |
| marge_tier1_gossip | marge | 1 | met_marge | - | 50 |
| marge_tier1_about_earl | marge | 1 | met_marge | asked_marge_about_earl | 40 |
| marge_tier1_worried | marge | 1 | met_marge | - | 45 |
| marge_tier2_confession | marge | 2 | marge_worried_about_earl, earl_revealed | - | 80 |
| earl_tier0_intro | earl | 0 | - | met_earl | 100 |
| earl_tier0_repeat | earl | 0 | met_earl | - | 10 |
| earl_tier1_probing | earl | 1 | met_earl | - | 50 |
| earl_tier1_anomaly_noticed | earl | 1 | observed_earl_anomaly | - | 70 |
| earl_reveal | earl | 1 | earl_knows_you_know | - | 100 |
| earl_post_reveal_device | earl | 1 | earl_revealed | seen_device | 90 |
| earl_tier2_thomas | earl | 2 | seen_device, has_thomas_journal | - | 85 |
| karen_tier0_intro | karen | 0 | - | met_karen | 100 |
| karen_tier1_light | karen | 1 | met_karen | - | 60 |
| karen_tier2_location | karen | 2 | karen_mentioned_light | - | 80 |
| vincent_tier0_door_closed | vincent | 0 | knows_room6_occupied | vincent_contacted | 100 |
| vincent_tier0_earl_intro | vincent | 0 | earl_revealed, tried_vincent_door | vincent_contacted | 90 |
| vincent_tier1_through_door | vincent | 0 | earl_told_about_vincent | vincent_opened_door | 85 |
| vincent_tier1_door_opens | vincent | 1 | earl_told_about_vincent | - | 95 |
| vincent_tier2_full_reveal | vincent | 2 | vincent_opened_door | - | 100 |
| diane_tier0_intro | diane | 0 | - | met_diane | 100 |
| diane_tier1_cover_blown | diane | 1 | met_diane, observed_diane_earl_talk | - | 70 |
| diane_tier2_files | diane | 2 | diane_cover_blown | - | 85 |
| mo_tier0_intro | mo | 0 | - | met_mo | 100 |
| mo_tier1_deja_vu | mo | 1 | met_mo | - | 60 |
| mo_tier2_remember | mo | 2 | mo_felt_deja_vu | - | 80 |
| drifter_tier0_intro | drifter | 0 | - | met_drifter | 100 |
| drifter_tier1_father | drifter | 1 | met_drifter | - | 60 |
| drifter_tier2_facility_location | drifter | 2 | drifter_told_father | - | 80 |
| david_tier0_intro | david | 0 | - | met_david | 100 |
| david_tier1_karen_concerns | david | 1 | met_david, karen_mentioned_light | - | 50 |
| david_tier2_reconcile | david | 2 | karen_told_location, david_expressed_concern | - | 85 |
| ending_a_release | - | - | ready_for_ending, earl_read_journal | - | 1000 |
| ending_d_stay | - | - | ready_for_ending | - | 900 |

---

## APPENDIX: FLAG REFERENCE

**Core progression:**
- `met_[character]` - First meeting complete
- `earl_revealed` - Earl admits he remembers
- `vincent_contacted` - First real contact with Vincent
- `vincent_told_everything` - Vincent's full exposition
- `ready_for_ending` - Can trigger endings

**Knowledge flags:**
- `knows_thomas_died` - Learned about Thomas
- `knows_facility_location` - Learned where facility is
- `knows_how_to_end_loop` - Learned solution
- `seen_device` - Saw the device

**Observation flags:**
- `observed_earl_anomaly` - Saw Earl do something suspicious
- `observed_diane_earl_talk` - Saw Diane talk to Earl
- `observed_karen_walks_desert` - Saw Karen walk to desert

**Items:**
- `has_master_key` - Can open any room
- `has_thomas_journal` - Found the journal
- `has_facility_map` - Got map from Drifter

---

*End of Game Design Bible v2.0*
*Flat Scene Architecture - Prevents LLM Drift*
*Ready for Implementation*
