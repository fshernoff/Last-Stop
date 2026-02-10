import type { Scene } from '../../types'

export const moScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'mo_tier0_intro',
    character: 'mo',
    requirements: {
      trust: 0,
      notFlags: ['met_mo'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The big man takes up most of the booth. He looks up with a friendly smile.',
      },
      {
        speaker: 'npc',
        text: '"Hey there! Pull up a seat if you want. Gets lonely on the road."',
        choices: [
          { text: '"Thanks. I\'m staying here at the motel."', next: 'continue' },
          { text: '"You\'re a trucker?"', next: 'continue' },
          { text: '"Sure."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"Mo. Short for Morris, but nobody calls me that except my mama."',
      },
      {
        speaker: 'narration',
        text: 'He gestures at the highway through the window.',
      },
      {
        speaker: 'npc',
        text: "\"I'm on this route twice a month. This place is my halfway point. Marge makes the best eggs between here and El Paso.\"",
      },
      {
        speaker: 'narration',
        text: 'He seems genuinely glad for the company.',
      },
    ],
    effects: {
      setFlags: ['met_mo', 'knows_mo_route'],
      addRapport: { character: 'mo', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIMED: Catch Mo at dawn (6:00-6:30AM)
  // ============================================================================
  {
    id: 'mo_timed_morning_clarity',
    character: 'mo',
    requirements: {
      flags: ['met_mo', 'knows_loop_exists'],
      notFlags: ['mo_dawn_clarity'],
      location: 'diner',
      timeWindow: { min: 0, max: 60 },
    },
    priority: 90,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "The diner is empty except for Mo. He's sitting perfectly still, staring at his coffee. Something is different about him this morning.",
      },
      {
        speaker: 'npc',
        text: '"Sit down."',
      },
      {
        speaker: 'narration',
        text: "His voice is quiet. Clear. Not the jovial trucker you've met before.",
      },
      {
        speaker: 'npc',
        text: '"The route feels wrong today. Like I\'ve driven it before. Like the road remembers me."',
        choices: [
          { text: '"What do you mean?"', next: 'explain' },
          { text: '"You have driven it before."', next: 'explain' },
        ],
      },
      {
        id: 'explain',
        speaker: 'npc',
        text: '"The mile markers. I\'ve driven 47 miles to get here. I counted. But the markers only count 12."',
      },
      {
        speaker: 'narration',
        text: 'He taps the table.',
      },
      {
        speaker: 'npc',
        text: '"Thirty-five miles just... gone. Folded up. Like the road is shorter than it should be."',
      },
      {
        speaker: 'narration',
        text: "His clarity is startling. In a few hours he'll be back to his usual self, the fog rolling in again. But right now, at dawn, Mo sees it all.",
      },
      {
        speaker: 'npc',
        text: '"Something\'s wrong with this place. I can feel it in the road."',
      },
    ],
    effects: {
      setFlags: ['mo_dawn_clarity', 'knows_mo_mile_discrepancy'],
      addRapport: { character: 'mo', amount: 2 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'mo_tier0_smalltalk',
    character: 'mo',
    requirements: {
      trust: 0,
      flags: ['met_mo'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"You ever notice how the coffee tastes different every time? Same pot, different day."',
      },
      {
        speaker: 'narration',
        text: 'He laughs, then squints at his cup like it owes him money.',
      },
    ],
    effects: {
      addRapport: { character: 'mo', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // ITEM: Show newspaper clipping to Mo
  // ============================================================================
  {
    id: 'mo_shown_clipping',
    character: 'mo',
    requirements: {
      trust: 1,
      flags: ['met_mo', 'mo_dawn_clarity'],
      notFlags: ['mo_seen_clipping'],
    },
    priority: 75,
    oncePer: 'loop',
    lines: [
      {
        speaker: 'narration',
        text: 'Mo is nursing his coffee, staring out the window at the highway.',
      },
      {
        speaker: 'npc',
        text: '"Pull up a seat."',
        choices: [
          {
            text: '"Have you seen this article?"',
            next: 'show_clipping',
            requiresItems: ['newspaper_clipping'],
            effects: { setFlags: ['mo_seen_clipping', 'mo_remembers_roadblock'] },
          },
          {
            text: '"Long day?"',
            next: 'small_talk',
          },
        ],
        convergeTo: 'mo_clipping_end',
      },
      {
        id: 'show_clipping',
        speaker: 'narration',
        text: 'Mo squints at the newspaper clipping, holding it close.',
      },
      {
        speaker: 'npc',
        text: '"1984? I was driving this route in \'84."',
      },
      {
        speaker: 'narration',
        text: 'He taps the article.',
      },
      {
        speaker: 'npc',
        text: '"I remember a roadblock. Right here, on this stretch. Men in suits. Government plates."',
      },
      {
        speaker: 'npc',
        text: '"They told us to take the long way around. I always wondered what they were hiding."',
      },
      {
        speaker: 'narration',
        text: 'He hands the clipping back.',
      },
      {
        speaker: 'npc',
        text: '"Guess now I know."',
      },
      {
        id: 'small_talk',
        speaker: 'npc',
        text: '"Every day\'s a long day on the road. But some are longer than others."',
      },
      {
        speaker: 'narration',
        text: 'He sips his coffee.',
      },
      {
        id: 'mo_clipping_end',
        speaker: 'narration',
        text: 'Mo goes back to watching the highway.',
      },
    ],
    effects: {
      addRapport: { character: 'mo', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Déjà vu (chapter 3+)
  // ============================================================================
  {
    id: 'mo_tier1_deja_vu',
    character: 'mo',
    requirements: {
      trust: 1,
      flags: ['met_mo'],
      chapter: { min: 3 },
    },
    priority: 60,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Can I ask you something weird?"',
        choices: [
          { text: '"Sure."', next: 'continue' },
          { text: '"How weird?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"You ever get the feeling you\'ve done something before? Like, exactly before?"',
        choices: [
          { text: '"Déjà vu?"', next: 'deja_vu' },
          { text: '"All the time."', next: 'deja_vu' },
          { text: '"What did you experience?"', next: 'deja_vu' },
        ],
      },
      {
        id: 'deja_vu',
        speaker: 'npc',
        text: "\"I've been through this motel... I don't know how many times now. But lately it feels different. Like I've had the same conversation with Marge a hundred times.\"",
      },
      {
        speaker: 'narration',
        text: 'He shakes his head.',
      },
      {
        speaker: 'npc',
        text: '"I know it sounds crazy. But this morning, I knew what she was going to say before she said it. Word for word."',
        choices: [
          { text: '"That\'s not crazy."', next: 'not_crazy' },
          { text: '"Trust that feeling."', next: 'trust' },
          { text: '"What else do you remember?"', next: 'remember' },
        ],
      },
      {
        id: 'not_crazy',
        speaker: 'npc',
        text: '"No?"',
      },
      {
        speaker: 'narration',
        text: 'He looks relieved.',
      },
      {
        speaker: 'npc',
        text: '"I was starting to think I was losing it."',
      },
      {
        id: 'trust',
        speaker: 'npc',
        text: '"Why? Do you know something?"',
      },
      {
        id: 'remember',
        speaker: 'npc',
        text: "\"Bits and pieces. Like dreams you can't quite hold onto.\"",
      },
    ],
    effects: {
      setFlags: ['mo_felt_deja_vu', 'knows_mo_deja_vu'],
      addRapport: { character: 'mo', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Asking about the facility
  // ============================================================================
  {
    id: 'mo_tier1_facility',
    character: 'mo',
    requirements: {
      trust: 1,
      flags: ['met_mo', 'observed_mo_asks_facility'],
    },
    priority: 55,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"I asked Marge about old research places in the area. You ever hear anything?"',
        choices: [
          { text: '"Just rumors."', next: 'continue' },
          { text: '"Why ask?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"There\'s a dead spot on the highway. Mile marker 20. Everything goes fuzzy for a second."',
      },
      {
        speaker: 'npc',
        text: '"Felt like the road folded back on itself. I can\'t shake that feeling."',
      },
    ],
    effects: {
      addRapport: { character: 'mo', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 2: Remembers the reset
  // ============================================================================
  {
    id: 'mo_tier2_remember',
    character: 'mo',
    requirements: {
      trust: 2,
      flags: ['mo_felt_deja_vu'],
    },
    priority: 80,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"Mo. I need you to concentrate. What do you remember?"',
      },
      {
        speaker: 'npc',
        text: '"Remember about what?"',
      },
      {
        speaker: 'player',
        text: '"About being here before. Not just this trip. Before that."',
      },
      {
        speaker: 'narration',
        text: 'Mo closes his eyes. His brow furrows.',
      },
      {
        speaker: 'npc',
        text: "\"I... there's something. Like a dream. We're in the diner, but it's the same day. Over and over.\"",
      },
      {
        speaker: 'narration',
        text: 'His eyes snap open.',
      },
      {
        speaker: 'npc',
        text: '"How many times have I been here?"',
        choices: [
          { text: '"I don\'t know. Dozens? Hundreds?"', next: 'loop' },
          { text: '"It\'s a reset. The day keeps rewinding."', next: 'loop' },
        ],
      },
      {
        id: 'loop',
        speaker: 'npc',
        text: "\"A reset. That's...\"",
      },
      {
        speaker: 'narration',
        text: 'He trails off. Then:',
      },
      {
        speaker: 'npc',
        text: "\"That's why I can't leave. Every time I drive past mile marker 20, I wake up back here.\"",
      },
      {
        speaker: 'player',
        text: '"You\'ve tried to leave?"',
      },
      {
        speaker: 'npc',
        text: '"Yeah. I think. I remember trying. I remember failing."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you with new understanding.',
      },
      {
        speaker: 'npc',
        text: '"We\'re stuck here. All of us."',
      },
    ],
    effects: {
      setFlags: ['mo_remembers'],
      addRapport: { character: 'mo', amount: 2 },
      advanceTime: 20,
    },
  },
]
