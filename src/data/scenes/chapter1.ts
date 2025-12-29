import type { Scene } from '../../types'

export const chapter1Scenes: Scene[] = [
  {
    id: 'ch1_earl_intro',
    character: 'earl',
    requirements: {
      beat: 'ch1_b1_wake',
      notFlags: ['met_earl'],
    },
    priority: 100,
    oncePer: 'beat',
    lines: [
      { speaker: 'npc', text: 'Morning. You’re in 7, right?' },
      { speaker: 'player', text: 'Yeah.' },
      { speaker: 'npc', text: 'Coffee is in the diner. Name is Earl.' },
      { speaker: 'narration', text: 'His voice is flat, practiced. He watches you longer than he should.' },
    ],
    effects: {
      setFlags: ['met_earl'],
      advanceBeat: 'ch1_b2_meet_staff',
    },
  },
  {
    id: 'ch1_marge_intro',
    character: 'marge',
    requirements: {
      beat: 'ch1_b2_meet_staff',
      notFlags: ['met_marge'],
    },
    priority: 100,
    oncePer: 'beat',
    lines: [
      { speaker: 'npc', text: 'Coffee?' },
      { speaker: 'player', text: 'Please.' },
      { speaker: 'npc', text: "I'm Marge. Earl's sister. Don't mind him—he's been tense lately." },
      { speaker: 'narration', text: 'Her eyes flick toward the office, then away.' },
      {
        id: 'marge_topics',
        speaker: 'player',
        text: 'Anything else I should know?',
        choiceMode: 'topics',
        endChoiceText: "That's all.",
        choices: [
          { text: 'Is Earl okay?', next: 'earl_topic', effects: { setFlags: ['marge_hint_back_room'] } },
          { text: 'This place seems quiet.', next: 'quiet_topic' },
        ],
        convergeTo: 'wrap',
      },
      {
        id: 'earl_topic',
        speaker: 'npc',
        text: "He locks up late. Goes in the back room more than he should. If you hear the latch, that's him.",
      },
      {
        id: 'quiet_topic',
        speaker: 'npc',
        text: 'Most folks pass through. The quiet is just what happens when the road dries up.',
      },
      {
        id: 'wrap',
        speaker: 'npc',
        text: 'You need anything, I’ll be here.',
      },
      {
        speaker: 'narration',
        text: "She talks like time is stuck here, but everything outside the diner feels ordinary—at least so far.",
      },
    ],
    effects: {
      setFlags: ['met_marge', 'marge_hint_back_room'],
      advanceBeat: 'ch1_b3_stakeout',
    },
  },
  {
    id: 'ch1_earl_confront',
    character: 'earl',
    requirements: {
      beat: 'ch1_b4_confront',
      flags: ['observed_earl_anomaly'],
    },
    priority: 100,
    oncePer: 'beat',
    lines: [
      { speaker: 'player', text: 'I saw you go into the back room last night.' },
      { speaker: 'npc', text: 'You shouldn’t be watching my office.' },
      { speaker: 'player', text: 'Something’s wrong here.' },
      { speaker: 'npc', text: 'If you’re going to dig, do it quietly. I lock up soon.' },
    ],
    effects: {
      setFlags: ['noticed_loop_start'],
      advanceBeat: 'ch2_b1_aftermath',
    },
  },
]
