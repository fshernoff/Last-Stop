import type { Scene } from '../../types'

export const davidScenes: Scene[] = [
  // ============================================================================
  // TIER 0: First meeting
  // ============================================================================
  {
    id: 'david_tier0_intro',
    character: 'david',
    requirements: {
      trust: 0,
      notFlags: ['met_david'],
    },
    priority: 100,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'The man sits alone in a booth, staring at his phone. He looks up as you approach, and his expression says "please don\'t."',
      },
      {
        speaker: 'npc',
        text: '"Hey."',
        choices: [
          { text: '"You\'re staying here with Karen?"', next: 'karen' },
          { text: '"You okay?"', next: 'okay' },
          { text: '[Nod and move on]', next: 'nod' },
        ],
      },
      {
        id: 'karen',
        speaker: 'npc',
        text: "\"Yeah. My wife. We're on a road trip.\"",
      },
      {
        speaker: 'narration',
        text: "He doesn't sound thrilled.",
      },
      {
        speaker: 'npc',
        text: "\"Supposed to be a honeymoon thing. Hasn't gone exactly as planned.\"",
      },
      {
        id: 'okay',
        speaker: 'npc',
        text: '"Peachy."',
      },
      {
        speaker: 'narration',
        text: 'His tone suggests otherwise.',
      },
      {
        id: 'nod',
        speaker: 'narration',
        text: "He seems relieved you're leaving.",
      },
    ],
    effects: {
      setFlags: ['met_david'],
      addRapport: { character: 'david', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 0: Ambient small talk
  // ============================================================================
  {
    id: 'david_tier0_smalltalk',
    character: 'david',
    requirements: {
      trust: 0,
      flags: ['met_david'],
    },
    priority: 1,
    oncePer: 'none',
    lines: [
      {
        speaker: 'npc',
        text: '"Signal out here is a joke. I can hear my voicemail taunting me."',
      },
      {
        speaker: 'narration',
        text: 'He taps his phone screen a few more times just to be sure.',
      },
    ],
    effects: {
      addRapport: { character: 'david', amount: 1 },
      advanceTime: 10,
    },
  },

  // ============================================================================
  // TIER 1: Concerns about Karen
  // ============================================================================
  {
    id: 'david_tier1_karen_concerns',
    character: 'david',
    requirements: {
      trust: 1,
      flags: ['met_david', 'karen_mentioned_light'],
    },
    priority: 50,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"Has Karen been talking to you? About what she saw?"',
        choices: [
          { text: '"The light in the desert?"', next: 'continue' },
          { text: '"She mentioned something."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: "\"Look, I love her. But she's not... she hasn't been sleeping well. And now she's got this fixation.\"",
        choices: [
          { text: '"What if she really saw something?"', next: 'really_saw' },
          { text: '"You don\'t believe her."', next: 'dont_believe' },
        ],
        convergeTo: 'david_concerns_after',
      },
      {
        id: 'really_saw',
        speaker: 'npc',
        text: "\"Then I'd want to know what. But there's nothing out there. It's desert. Just desert.\"",
      },
      {
        id: 'dont_believe',
        speaker: 'npc',
        text: "\"I believe she thinks she saw something. There's a difference.\"",
      },
      {
        id: 'david_concerns_after',
        speaker: 'narration',
        text: 'He sighs.',
      },
      {
        speaker: 'npc',
        text: "\"I don't know what to do. She keeps talking about heading out there this afternoon, looking for something that isn't real.\"",
      },
    ],
    effects: {
      setFlags: ['david_expressed_concern'],
      addRapport: { character: 'david', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 1: Work secret
  // ============================================================================
  {
    id: 'david_tier1_work_secret',
    character: 'david',
    requirements: {
      trust: 1,
      flags: ['met_david', 'david_expressed_concern'],
    },
    priority: 55,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'npc',
        text: '"You seem like you can keep a secret."',
        choices: [
          { text: '"Try me."', next: 'continue' },
          { text: '"Depends."', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"I told Karen I was unplugging on this trip. I wasn\'t honest."',
      },
      {
        speaker: 'npc',
        text: '"My boss put me on a final warning. If I don\'t answer, I lose my job."',
      },
      {
        speaker: 'npc',
        text: '"So I keep checking my phone. She thinks I\'m just shutting her out."',
      },
    ],
    effects: {
      setFlags: ['knows_david_secret'],
      addRapport: { character: 'david', amount: 1 },
      advanceTime: 15,
    },
  },

  // ============================================================================
  // TIER 2: Reconciliation
  // ============================================================================
  {
    id: 'david_tier2_reconcile',
    character: 'david',
    requirements: {
      trust: 2,
      flags: ['karen_told_location', 'david_expressed_concern'],
    },
    priority: 85,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'player',
        text: "\"David. Karen wasn't imagining things. There's something out there.\"",
      },
      {
        speaker: 'npc',
        text: '"What?"',
      },
      {
        speaker: 'player',
        text: "\"An old research facility. I've seen enough to know it's real. What Karen saw was real.\"",
      },
      {
        speaker: 'narration',
        text: 'David\'s face changes. Something between relief and fear.',
      },
      {
        speaker: 'npc',
        text: '"She was right?"',
        choices: [
          { text: '"Yes."', next: 'response' },
          { text: '"You should talk to her."', next: 'response' },
        ],
      },
      {
        id: 'response',
        speaker: 'npc',
        text: "\"God. I've been such an ass.\"",
      },
      {
        speaker: 'narration',
        text: 'He stands.',
      },
      {
        speaker: 'npc',
        text: '"I need to apologize. I need to tell her I believe her."',
      },
      {
        speaker: 'narration',
        text: 'He pauses at the door.',
      },
      {
        speaker: 'npc',
        text: '"Thank you. For telling me."',
      },
      {
        speaker: 'narration',
        text: 'He leaves to find Karen.',
      },
    ],
    effects: {
      setFlags: ['david_believes_karen'],
      addRapport: { character: 'david', amount: 2 },
      advanceTime: 15,
    },
  },
]
