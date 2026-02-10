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
      addRapport: { character: 'drifter', amount: 1 },
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
      addRapport: { character: 'drifter', amount: 1 },
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
      addRapport: { character: 'drifter', amount: 1 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Facility location — Drifter lies first, then tells truth
  // ============================================================================
  {
    id: 'drifter_tier2_facility_location',
    character: 'drifter',
    requirements: {
      trust: 2,
      flags: ['drifter_told_father'],
      notFlags: ['knows_facility_location'],
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
        text: '"The facility. It\'s east of here. Past the old water tower. Maybe ten miles."',
      },
      {
        speaker: 'narration',
        text: 'He pulls out a worn piece of paper. A map.',
      },
      {
        speaker: 'npc',
        text: '"My father drew this."',
      },
      {
        speaker: 'narration',
        text: 'He presses the map into your hands.',
      },
      {
        speaker: 'npc',
        text: '"Don\'t go looking for trouble."',
      },
    ],
    effects: {
      setFlags: [
        'drifter_told_facility_location',
        'drifter_gave_wrong_direction',
        'has_facility_map',
      ],
      addRapport: { character: 'drifter', amount: 2 },
      giveItem: 'facility_map',
      advanceTime: 20,
    },
  },

  // ============================================================================
  // TIER 2: Drifter tells truth if player already knows the real location
  // ============================================================================
  {
    id: 'drifter_tier2_honest_location',
    character: 'drifter',
    requirements: {
      trust: 2,
      flags: ['drifter_told_father', 'knows_facility_location'],
      notFlags: ['drifter_told_facility_location'],
    },
    priority: 81,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: "\"I'm going to tell you something. And then I'm going to leave. And if you're smart, you'll do the same.\"",
        choices: [
          { text: '"Tell me."', next: 'tell' },
          { text: '"I already know where the facility is."', next: 'already_know' },
        ],
      },
      {
        id: 'tell',
        speaker: 'npc',
        text: '"The facility. It\'s east of here. Past the old water tower. Maybe ten miles."',
      },
      {
        speaker: 'player',
        text: '"That\'s not right. It\'s two miles into the desert, past mile marker 7. I\'ve been there."',
      },
      {
        speaker: 'narration',
        text: 'The Drifter goes very still.',
      },
      {
        id: 'already_know',
        speaker: 'npc',
        text: '"You\'ve been there."',
      },
      {
        speaker: 'narration',
        text: 'It\'s not a question. He studies you differently now.',
      },
      {
        speaker: 'npc',
        text: '"Fine. I lied about the direction. I\'ve been lying to everyone who asks."',
        choices: [
          { text: '"Why?"', next: 'why_lie' },
          { text: '"What are you protecting?"', next: 'why_lie' },
        ],
      },
      {
        id: 'why_lie',
        speaker: 'npc',
        text: '"Because my father died in that place. And everyone who gets close to it gets trapped."',
      },
      {
        speaker: 'npc',
        text: '"I\'ve been sending people the wrong way for months. Trying to keep them safe."',
      },
      {
        speaker: 'narration',
        text: 'His hands are shaking.',
      },
      {
        speaker: 'npc',
        text: '"But you already found it. So there\'s no point lying anymore."',
      },
      {
        speaker: 'narration',
        text: 'He pulls out his father\'s map — the real one this time.',
      },
      {
        speaker: 'npc',
        text: '"Here. The real map. Every entrance, every corridor my father documented. You\'ll need it if you\'re going back."',
      },
    ],
    effects: {
      setFlags: [
        'drifter_told_facility_location',
        'drifter_caught_lying',
        'has_facility_map',
        'knows_drifter_identity',
        'knows_drifter_truth',
        'knows_drifter_protects_facility',
      ],
      addRapport: { character: 'drifter', amount: 2 },
      giveItem: 'facility_map',
      advanceTime: 20,
    },
  },

  // ============================================================================
  // CATCH THE LIE: Confront Drifter after discovering the real location
  // ============================================================================
  {
    id: 'drifter_caught_lying',
    character: 'drifter',
    requirements: {
      flags: ['drifter_gave_wrong_direction', 'knows_facility_location'],
      notFlags: ['drifter_confronted_about_lie'],
    },
    priority: 85,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: '"You lied to me. The facility isn\'t east. It\'s past mile marker 7, two miles into the desert."',
      },
      {
        speaker: 'narration',
        text: 'The Drifter flinches. Then his shoulders drop.',
      },
      {
        speaker: 'npc',
        text: '"Yeah. I lied."',
        choices: [
          { text: '"Why?"', next: 'why' },
          { text: '"How many people have you sent the wrong way?"', next: 'how_many' },
        ],
        convergeTo: 'drifter_lie_after',
      },
      {
        id: 'why',
        speaker: 'npc',
        text: '"Because my father died in that building. And I\'ve watched three people walk toward it and never come back."',
      },
      {
        id: 'how_many',
        speaker: 'npc',
        text: '"Enough. I stopped counting."',
      },
      {
        speaker: 'narration',
        text: 'He looks genuinely ashamed.',
      },
      {
        id: 'drifter_lie_after',
        speaker: 'npc',
        text: '"I thought I was protecting people. Sending them the wrong way so they wouldn\'t find the facility. Wouldn\'t get trapped like the rest of us."',
      },
      {
        speaker: 'npc',
        text: '"But you found it anyway. And you came back."',
      },
      {
        speaker: 'narration',
        text: 'He reaches into his coat and pulls out a folded paper.',
      },
      {
        speaker: 'npc',
        text: '"The real map. My father\'s actual notes. I owe you this much."',
      },
    ],
    effects: {
      setFlags: [
        'drifter_confronted_about_lie',
        'knows_drifter_identity',
        'knows_drifter_truth',
        'knows_drifter_protects_facility',
      ],
      addRapport: { character: 'drifter', amount: 2 },
      advanceTime: 20,
    },
  },

  // ============================================================================
  // PUZZLE: Show Vasquez badge to Drifter — reveals his father's identity
  // ============================================================================
  {
    id: 'drifter_shown_vasquez_badge',
    character: 'drifter',
    requirements: {
      flags: ['met_drifter', 'found_vasquez_badge'],
      notFlags: ['drifter_saw_badge'],
    },
    priority: 88,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'You hold up the government ID badge.',
      },
      {
        speaker: 'npc',
        text: '"Where did you get that?"',
      },
      {
        speaker: 'narration',
        text: 'His voice is different. Not defensive. Stricken.',
      },
      {
        speaker: 'npc',
        text: '"That\'s... that\'s my father\'s badge."',
      },
      {
        speaker: 'narration',
        text: 'He takes it with trembling hands. Traces the name with his thumb. R. Vasquez.',
      },
      {
        speaker: 'npc',
        text: '"Roberto Vasquez. Clearance Level 3. Project Stillwater."',
      },
      {
        speaker: 'npc',
        text: '"I never had a photo of him at work. They took everything when the facility shut down."',
        choices: [
          { text: '"I\'m sorry."', next: 'sorry' },
          { text: '"He was one of the three researchers."', next: 'three' },
        ],
        convergeTo: 'drifter_badge_after',
      },
      {
        id: 'sorry',
        speaker: 'npc',
        text: '"Don\'t be. You gave me something I\'ve been looking for my whole life."',
      },
      {
        id: 'three',
        speaker: 'npc',
        text: '"Thomas Hoskins. Vincent Harlow. And my father. The three who built the device."',
      },
      {
        speaker: 'narration',
        text: 'He looks at you differently now. The wariness is gone.',
      },
      {
        id: 'drifter_badge_after',
        speaker: 'npc',
        text: '"My father left notes about what they were building. He knew it was dangerous. He tried to stop it."',
      },
      {
        speaker: 'npc',
        text: '"That\'s why I\'m here. I\'ve been trying to finish what he started. To shut it down."',
      },
      {
        speaker: 'npc',
        text: '"But I can\'t do it alone. Not from inside the loop."',
      },
    ],
    effects: {
      setFlags: ['drifter_saw_badge', 'knows_drifter_is_vasquez_son', 'drifter_told_father', 'knows_1984_incident'],
      addRapport: { character: 'drifter', amount: 3 },
      advanceTime: 20,
    },
  },
]
