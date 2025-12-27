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
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: Déjà vu (after 5 loops)
  // ============================================================================
  {
    id: 'mo_tier1_deja_vu',
    character: 'mo',
    requirements: {
      trust: 1,
      flags: ['met_mo'],
      loop: { min: 5 },
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
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 2: Remembers the loop
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
          { text: '"It\'s a loop. The day keeps repeating."', next: 'loop' },
        ],
      },
      {
        id: 'loop',
        speaker: 'npc',
        text: "\"A loop. That's...\"",
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
      advanceTime: 20,
    },
  },
]
