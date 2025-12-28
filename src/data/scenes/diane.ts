import type { Scene } from '../../types'

export const dianeScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'diane_tier0_intro',
    character: 'diane',
    requirements: {
      trust: 0,
      notFlags: ['met_diane'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The woman at the booth glances up from her laptop. Professional. Guarded. Her eyes assess you in a second.',
      },
      {
        speaker: 'npc',
        text: '"Can I help you?"',
        choices: [
          { text: '"Just introducing myself. I\'m staying here too."', next: 'intro' },
          { text: '"What are you working on?"', next: 'working' },
          { text: '"You don\'t look like a tourist."', next: 'tourist' },
        ],
        choiceMode: 'topics',
        endChoiceText: '[End conversation]',
        convergeTo: 'diane_intro_close',
      },
      {
        id: 'intro',
        speaker: 'npc',
        text: '"Diane. Sales. Just passing through."',
      },
      {
        speaker: 'narration',
        text: 'Her smile is polished and meaningless.',
      },
      {
        id: 'working',
        speaker: 'npc',
        text: '"Reports. Boring stuff."',
      },
      {
        speaker: 'narration',
        text: 'She angles the laptop slightly away from you.',
      },
      {
        id: 'tourist',
        speaker: 'npc',
        text: '"Neither do you."',
      },
      {
        speaker: 'narration',
        text: 'She studies you.',
      },
      {
        id: 'diane_intro_close',
        speaker: 'npc',
        text: "\"Diane. I'm in sales. What's your excuse for being here?\"",
      },
    ],
    effects: {
      setFlags: ['met_diane'],
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'diane_tier0_smalltalk',
    character: 'diane',
    requirements: {
      trust: 0,
      flags: ['met_diane'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"If you see a white sedan hanging around, tell me. I\'m collecting patterns."',
      },
      {
        speaker: 'narration',
        text: 'She doesn\'t look up from her notes.',
      },
    ],
    effects: {
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: White sedan contact
  // ============================================================================
  {
    id: 'diane_tier1_sedan',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'observed_white_sedan'],
      notFlags: ['diane_cover_blown'],
    },
    priority: 60,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You were outside when the white sedan pulled in."',
        choices: [
          { text: '"I saw it."', next: 'continue' },
          { text: '"Just a random car."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"It was a delivery. Case files. Sealed stuff."',
      },
      {
        speaker: 'npc',
        text: '"If anyone asks, you didn\'t see it."',
      },
    ],
    effects: {
      setFlags: ['knows_diane_files'],
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Cover blown (requires observing her talk to Earl)
  // ============================================================================
  {
    id: 'diane_tier1_cover_blown',
    character: 'diane',
    requirements: {
      trust: 1,
      flags: ['met_diane', 'observed_diane_earl_talk'],
    },
    priority: 70,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"I saw you talking to Earl yesterday. You were asking him about people who\'ve gone missing."',
      },
      {
        speaker: 'narration',
        text: 'Diane goes very still. Her professional mask slips for just a moment.',
      },
      {
        speaker: 'npc',
        text: '"You were watching me."',
        choices: [
          { text: '"I watch everyone."', next: 'cards' },
          { text: '"What are you really doing here?"', next: 'cards' },
        ],
      },
      {
        id: 'cards',
        speaker: 'npc',
        text: '"Fine. Cards on the table."',
      },
      {
        speaker: 'narration',
        text: 'She closes her laptop.',
      },
      {
        speaker: 'npc',
        text: "\"I'm an investigator. Insurance fraud, missing persons, that kind of thing. And this stretch of highway has too many missing persons for coincidence.\"",
        choices: [
          { text: '"How many?"', next: 'how_many' },
          { text: '"What have you found?"', next: 'how_many' },
        ],
      },
      {
        id: 'how_many',
        speaker: 'npc',
        text: '"Fifteen in the last forty years. All vanished within a few miles of this motel. The first was in 1984. No bodies. No evidence. Just gone."',
      },
      {
        speaker: 'narration',
        text: 'She looks at you hard.',
      },
      {
        speaker: 'npc',
        text: '"What do you know?"',
      },
    ],
    effects: {
      setFlags: ['diane_cover_blown', 'knows_diane_investigating', 'knows_1984_incident'],
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 2: Shows her files
  // ============================================================================
  {
    id: 'diane_tier2_files',
    character: 'diane',
    requirements: {
      trust: 2,
      flags: ['diane_cover_blown'],
    },
    priority: 85,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: "\"I'm going to show you something. Don't make me regret it.\"",
      },
      {
        speaker: 'narration',
        text: 'She opens a folder on her laptop. Missing persons reports. Photos. A timeline.',
      },
      {
        speaker: 'npc',
        text: '"Fifteen people. Forty years. All within a ten-mile radius of this motel."',
      },
      {
        speaker: 'narration',
        text: 'She points to a name.',
      },
      {
        speaker: 'npc',
        text: '"This one stands out. Thomas Earl. Died in a car accident in 1984. Except..."',
        choices: [
          { text: '"Except what?"', next: 'except' },
          { text: '"That\'s Earl\'s son."', next: 'except' },
        ],
      },
      {
        id: 'except',
        speaker: 'npc',
        text: "\"Except the accident report is sealed. And his employer was a government research facility that doesn't exist in any records. The file mentions temporal field research.\"",
      },
      {
        speaker: 'narration',
        text: 'She taps a folder thick with redactions.',
      },
      {
        speaker: 'narration',
        text: 'She looks at you.',
      },
      {
        speaker: 'npc',
        text: '"You know something. I can tell."',
        choices: [
          { text: '[Tell her about the loop]', next: 'tell_loop' },
          { text: '[Tell her about Earl]', next: 'tell_earl' },
          { text: '[Say nothing]', next: 'nothing' },
        ],
      },
      {
        id: 'tell_loop',
        speaker: 'narration',
        text: "You tell her. Everything. She listens without interrupting.",
      },
      {
        speaker: 'npc',
        text: "\"A time loop. That's... that's insane.\"",
      },
      {
        speaker: 'narration',
        text: "But she's not dismissing it. She's thinking.",
      },
      {
        speaker: 'npc',
        text: '"It would explain the missing persons. If they got too close to something and got... stuck."',
      },
      {
        id: 'tell_earl',
        speaker: 'npc',
        text: "\"Earl? The clerk? He's connected to this?\"",
      },
      {
        id: 'nothing',
        speaker: 'npc',
        text: '"Fine. Keep your secrets. But if you find anything that helps me close these cases, I want to know."',
      },
    ],
    effects: {
      setFlags: [
        'diane_showed_files',
        'knows_missing_persons_pattern',
        'knows_diane_files',
        'knows_government_involved',
        'knows_thomas_role',
      ],
      advanceTime: 20,
    },
  },
]
