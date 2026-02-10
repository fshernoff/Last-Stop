import type { Scene } from '../../types'

export const karenScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'karen_tier0_intro',
    character: 'karen',
    requirements: {
      trust: 0,
      notFlags: ['met_karen'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "The woman looks up from her book. She's trying to appear relaxed, but there's tension in her shoulders.",
      },
      {
        speaker: 'npc',
        text: '"Hi. Sorry, do I know you?"',
        choices: [
          { text: '"We\'re both staying here. Room 7."', next: 'room' },
          { text: '"Just being friendly."', next: 'friendly' },
          { text: '"You look like you\'ve got something on your mind."', next: 'mind' },
        ],
        convergeTo: 'karen_intro_close',
      },
      {
        id: 'room',
        speaker: 'npc',
        text: '"Right. The motel. Small world."',
      },
      {
        speaker: 'narration',
        text: "She offers a polite smile that doesn't reach her eyes.",
      },
      {
        id: 'friendly',
        speaker: 'npc',
        text: "\"Friendly's good. I could use friendly.\"",
      },
      {
        speaker: 'narration',
        text: 'She glances toward Room 2.',
      },
      {
        id: 'mind',
        speaker: 'npc',
        text: '"Is it that obvious?"',
      },
      {
        speaker: 'narration',
        text: 'She laughs without humor.',
      },
      {
        id: 'karen_intro_close',
        speaker: 'npc',
        text: "\"I'm Karen. This is... well, this is supposed to be my honeymoon road trip. Not exactly the Ritz.\"",
      },
    ],
    effects: {
      setFlags: ['met_karen', 'knows_karen_unhappy'],
      addRapport: { character: 'karen', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'karen_tier0_smalltalk',
    character: 'karen',
    requirements: {
      trust: 0,
      flags: ['met_karen'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"I thought the desert would feel big. It just feels... close."',
      },
      {
        speaker: 'narration',
        text: 'She folds her hands, then unfolds them again.',
      },
      {
        speaker: 'npc',
        text: '"Sorry. Bad mood. It\'s been a long trip."',
      },
    ],
    effects: {
      addRapport: { character: 'karen', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: The light in the desert
  // ============================================================================
  {
    id: 'karen_tier1_light',
    character: 'karen',
    requirements: {
      trust: 1,
      flags: ['met_karen'],
    },
    priority: 60,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: "\"Can I tell you something? Something that's going to sound crazy?\"",
        choices: [
          { text: '"Sure."', next: 'continue' },
          { text: '"Crazy how?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: "\"Last night. I couldn't sleep. I was looking out the window, at the desert, and I saw... a light.\"",
        choices: [
          { text: '"What kind of light?"', next: 'kind' },
          { text: '"Where?"', next: 'where' },
          { text: '"What did David think?"', next: 'david' },
        ],
        convergeTo: 'karen_light_after',
      },
      {
        id: 'kind',
        speaker: 'npc',
        text: "\"Not headlights. Not a plane. Something else. It was... wrong. Like it was there and not there at the same time.\"",
      },
      {
        id: 'where',
        speaker: 'npc',
        text: "\"Out past the highway. Maybe a mile? Two? I couldn't tell.\"",
      },
      {
        id: 'david',
        speaker: 'npc',
        text: "\"David thinks I imagined it. Or that I'm stressed. Or that the desert is playing tricks on me.\"",
      },
      {
        speaker: 'narration',
        text: 'She sets her jaw.',
      },
      {
        speaker: 'npc',
        text: "\"I didn't imagine it.\"",
      },
      {
        id: 'karen_light_after',
        speaker: 'npc',
        text: '"I marked the direction. This afternoon I\'m going to walk toward it."',
        choices: [
          { text: '"I believe you."', next: 'believe' },
          { text: '"Do you know what it was?"', next: 'find' },
          { text: '"Can you show me where?"', next: 'find' },
        ],
      },
      {
        id: 'believe',
        speaker: 'npc',
        text: "\"Thank you. You don't know how much that means.\"",
      },
      {
        id: 'find',
        speaker: 'npc',
        text: "\"I don't know what it was. But I'm not letting it go. Not until I know.\"",
      },
      {
        speaker: 'narration',
        text: 'She looks at the desert.',
      },
      {
        speaker: 'npc',
        text: "\"Today I'm going to find it.\"",
      },
    ],
    effects: {
      setFlags: ['karen_mentioned_light', 'knows_karen_saw_something', 'knows_karen_desert'],
      addRapport: { character: 'karen', amount: 1 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 1: Marriage strain
  // ============================================================================
  {
    id: 'karen_tier1_marriage',
    character: 'karen',
    requirements: {
      trust: 1,
      flags: ['karen_mentioned_light'],
    },
    priority: 55,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Can I be honest? The light isn\'t the only thing bothering me."',
        choices: [
          { text: '"What is, then?"', next: 'continue' },
          { text: '"You don\'t have to say."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"This trip was supposed to fix things. David promised he\'d unplug. He hasn\'t."',
      },
      {
        speaker: 'npc',
        text: '"He keeps stepping outside to check his phone. It makes me feel like I\'m on this trip alone."',
      },
    ],
    effects: {
      addRapport: { character: 'karen', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 2: Found the location
  // ============================================================================
  {
    id: 'karen_tier2_location',
    character: 'karen',
    requirements: {
      trust: 2,
      flags: ['karen_mentioned_light'],
    },
    priority: 80,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"I found where the light was coming from."',
        choices: [
          { text: '"Where?"', next: 'where' },
          { text: '"What was it?"', next: 'where' },
        ],
      },
      {
        id: 'where',
        speaker: 'npc',
        text: "\"There's something out there. In the desert. About two miles past the mile marker 7 sign.\"",
      },
      {
        speaker: 'narration',
        text: 'She pulls out her phone, shows you a photo.',
      },
      {
        speaker: 'npc',
        text: "\"It looks like an old building. Half-buried in sand. I couldn't get close - something felt wrong. Like the air was heavy.\"",
        choices: [
          { text: '"That sounds like the facility."', next: 'facility' },
          { text: '"You should stay away from there."', next: 'stay_away' },
          { text: '"Thank you for telling me."', next: 'thank' },
        ],
      },
      {
        id: 'facility',
        speaker: 'npc',
        text: '"Facility? What facility?"',
      },
      {
        speaker: 'narration',
        text: "You realize you've said too much. Or maybe just enough.",
      },
      {
        id: 'stay_away',
        speaker: 'npc',
        text: "\"Believe me, I don't want to go back. But I needed to know I wasn't crazy.\"",
      },
      {
        id: 'thank',
        speaker: 'npc',
        text: "\"You believe me. That's worth more than thanks.\"",
      },
    ],
    effects: {
      setFlags: ['karen_told_location', 'knows_facility_location', 'knows_karen_desert'],
      addRapport: { character: 'karen', amount: 2 },
      advanceTime: 15,
    },
  },
]
