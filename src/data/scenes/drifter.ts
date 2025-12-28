import type { Scene } from '../../types'

export const drifterScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'drifter_tier0_intro',
    character: 'drifter',
    requirements: {
      trust: 0,
      notFlags: ['met_drifter'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The man flinches when you approach. He\'s thin, unshaven, with eyes that dart to every exit.',
      },
      {
        speaker: 'npc',
        text: '"I don\'t know you."',
        choices: [
          { text: '"I\'m just staying at the motel."', next: 'motel' },
          { text: '"You seem nervous."', next: 'nervous' },
          { text: '"What\'s your name?"', next: 'name' },
        ],
        choiceMode: 'topics',
        convergeTo: 'drifter_intro_after',
      },
      {
        id: 'motel',
        speaker: 'npc',
        text: '"So am I. Doesn\'t make us friends."',
      },
      {
        id: 'nervous',
        speaker: 'npc',
        text: "\"Everyone seems nervous when you look at them the way you're looking at me.\"",
      },
      {
        id: 'name',
        speaker: 'npc',
        text: "\"Just passing through. That's all you need to know.\"",
      },
      {
        id: 'drifter_intro_after',
        speaker: 'narration',
        text: 'He looks past you, checking the door.',
      },
      {
        speaker: 'npc',
        text: "\"Look, I don't want trouble. Leave me alone and I'll leave you alone.\"",
      },
    ],
    effects: {
      setFlags: ['met_drifter'],
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'drifter_tier0_smalltalk',
    character: 'drifter',
    requirements: {
      trust: 0,
      flags: ['met_drifter'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"People think the desert hides things. It doesn\'t hide them. It bakes them until they disappear."',
      },
      {
        speaker: 'narration',
        text: 'He looks past you, as if checking for someone you can\'t see.',
      },
    ],
    effects: {
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: Father's story
  // ============================================================================
  {
    id: 'drifter_tier1_father',
    character: 'drifter',
    requirements: {
      trust: 1,
      flags: ['met_drifter'],
    },
    priority: 60,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Why do you keep talking to me?"',
        choices: [
          { text: '"You know something about this place."', next: 'continue' },
          { text: '"I\'m trying to understand what\'s happening here."', next: 'continue' },
          { text: '"You\'re scared. I want to know why."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: "\"You want to know why I'm here? Fine.\"",
      },
      {
        speaker: 'narration',
        text: 'He looks around, then leans closer.',
      },
      {
        speaker: 'npc',
        text: '"My father worked at a facility near here. In 1984. He died there."',
        choices: [
          { text: '"What kind of facility?"', next: 'facility' },
          { text: '"How did he die?"', next: 'facility' },
        ],
      },
      {
        id: 'facility',
        speaker: 'npc',
        text: '"Government research. Classified stuff. They said it was an accident. Equipment malfunction."',
      },
      {
        speaker: 'narration',
        text: 'His hands shake.',
      },
      {
        speaker: 'npc',
        text: '"But I found his notes. He was working on something. Something about time."',
        choices: [
          { text: '"Temporal fields."', next: 'temporal' },
          { text: '"Keep talking."', next: 'keep_talking' },
        ],
      },
      {
        id: 'temporal',
        speaker: 'npc',
        text: '"How do you know that term?"',
      },
      {
        id: 'learned',
        speaker: 'npc',
        text: "\"It matters because nobody's supposed to know that. Nobody.\"",
      },
      {
        id: 'keep_talking',
        speaker: 'npc',
        text: '"He called them temporal fields. Government jargon. He wasn\'t supposed to write it down."',
      },
      {
        speaker: 'narration',
        text: 'He stares at you.',
      },
      {
        speaker: 'npc',
        text: '"Who are you?"',
      },
    ],
    effects: {
      setFlags: ['drifter_told_father', 'knows_1984_incident'],
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Facility location and map
  // ============================================================================
  {
    id: 'drifter_tier2_facility_location',
    character: 'drifter',
    requirements: {
      trust: 2,
      flags: ['drifter_told_father'],
    },
    priority: 80,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: "\"I'm going to tell you something. And then I'm going to leave. And if you're smart, you'll do the same.\"",
        choices: [
          { text: '"Tell me."', next: 'tell' },
          { text: '"I can\'t leave."', next: 'tell' },
        ],
      },
      {
        id: 'tell',
        speaker: 'npc',
        text: "\"The facility. It's two miles into the desert. Past mile marker 7. Half-buried now, but it's there.\"",
      },
      {
        speaker: 'narration',
        text: 'He pulls out a worn piece of paper. A map.',
      },
      {
        speaker: 'npc',
        text: '"My father drew this. He wanted someone to find it if something went wrong."',
        choices: [
          { text: '"What went wrong?"', next: 'wrong' },
          { text: '"What\'s out there now?"', next: 'wrong' },
        ],
      },
      {
        id: 'wrong',
        speaker: 'npc',
        text: '"They were trying to freeze time. Create bubbles where nothing changed. Preserve moments forever."',
      },
      {
        speaker: 'narration',
        text: 'He laughs bitterly.',
      },
      {
        speaker: 'npc',
        text: '"Looks like they succeeded."',
      },
      {
        speaker: 'player',
        text: '"You know about the loop."',
      },
      {
        speaker: 'npc',
        text: "\"I've been here before. I've had this conversation before. I remember pieces.\"",
      },
      {
        speaker: 'narration',
        text: 'He presses the map into your hands.',
      },
      {
        speaker: 'npc',
        text: "\"I've been trying to leave for weeks. Every time I get too far, I wake up back here. But maybe you can do something I can't.\"",
      },
    ],
    effects: {
      setFlags: [
        'drifter_told_facility_location',
        'has_facility_map',
        'knows_drifter_identity',
        'knows_drifter_truth',
        'knows_facility_location',
      ],
      giveItem: 'facility_map',
      advanceTime: 20,
    },
  },
]
