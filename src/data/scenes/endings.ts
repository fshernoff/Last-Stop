import type { Scene } from '../../types'

export const endingScenes: Scene[] = [
  // ============================================================================
  // ENDING A: The Good Ending - Earl lets go
  // ============================================================================
  {
    id: 'ending_a_release',
    character: 'earl',
    requirements: {
      flags: ['ready_for_ending', 'earl_read_journal'],
    },
    priority: 1000,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: "You find Earl in the back room. He's holding the journal. The device hums softly behind him.",
      },
      {
        speaker: 'npc',
        text: '"I\'ve been reading this all night. Every reset. Every word."',
        choices: [
          { text: '"What does it say?"', next: 'continue' },
          { text: '"Are you ready?"', next: 'continue' },
        ],
      },
      {
        id: 'continue',
        speaker: 'npc',
        text: '"Thomas. My boy. He knew I\'d find this someday. He knew I\'d be tempted."',
      },
      {
        speaker: 'narration',
        text: 'He turns to face the device.',
      },
      {
        speaker: 'npc',
        text: '"He asked me to let go. Forty years ago, in a letter I never read."',
      },
      {
        speaker: 'player',
        text: '"Earl..."',
      },
      {
        speaker: 'npc',
        text: '"I\'m tired. I\'m so tired of living the same day. Of watching people come and go and forget."',
      },
      {
        speaker: 'narration',
        text: 'He reaches toward the device.',
      },
      {
        speaker: 'npc',
        text: '"Thomas is gone. He\'s been gone for forty years."',
      },
      {
        speaker: 'narration',
        text: 'His hand trembles.',
      },
      {
        speaker: 'npc',
        text: '"And it\'s time I let him stay gone."',
      },
      {
        speaker: 'narration',
        text: 'Earl turns off the device.',
      },
      {
        speaker: 'narration',
        text: 'The hum stops.',
      },
      {
        speaker: 'narration',
        text: 'The air changes.',
      },
      {
        speaker: 'narration',
        text: 'For the first time in six months, time moves forward.',
      },
      {
        speaker: 'narration',
        text: 'Morning comes. A new morning. Different light through the windows.',
      },
      {
        speaker: 'narration',
        text: 'The guests wake confused but free. Cars start. People drive away.',
      },
      {
        speaker: 'narration',
        text: 'Marge finds Earl sitting on a chair outside the office, watching the highway.',
      },
      {
        speaker: 'npc',
        text: '"Earl? You okay?"',
      },
      {
        speaker: 'npc',
        text: '"I think I will be."',
      },
      {
        speaker: 'narration',
        text: 'The camera pulls back. The motel sits in the desert, no longer a trap. Just a place.',
      },
      {
        speaker: 'narration',
        text: 'Just a last stop.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },
    ],
    effects: {
      setFlags: ['ending_complete', 'ending_a'],
    },
  },

  // ============================================================================
  // ENDING D: The Reset Ending - Player chooses to stay
  // ============================================================================
  {
    id: 'ending_d_stay',
    character: 'earl',
    requirements: {
      flags: ['ready_for_ending'],
      chapter: { min: 5 },
    },
    priority: 900,
    oncePer: 'ever',
    lines: [
      {
        speaker: 'narration',
        text: 'Earl looks at you across the desk. The device hums in the back room.',
      },
      {
        speaker: 'npc',
        text: '"You\'ve been here a long time. Longer than most."',
        choices: [
          { text: '"I know how to end this."', next: 'know_how' },
          { text: '"I\'m not ready to leave."', next: 'not_ready' },
        ],
        convergeTo: 'ending_d_pattern',
      },
      {
        id: 'know_how',
        speaker: 'npc',
        text: '"But?"',
      },
      {
        speaker: 'player',
        text: '"But I\'m not sure I want to."',
      },
      {
        speaker: 'narration',
        text: 'You both stand in silence.',
      },
      {
        id: 'not_ready',
        speaker: 'npc',
        text: '"Neither am I. Even now."',
      },
      {
        speaker: 'narration',
        text: 'You both stand in silence.',
      },
      {
        id: 'ending_d_pattern',
        speaker: 'npc',
        text: '"There\'s something about knowing everyone. Every conversation. Every pattern."',
      },
      {
        speaker: 'player',
        text: '"It feels like home. In a way."',
      },
      {
        speaker: 'npc',
        text: '"That\'s what I told myself. For a long time."',
        choices: [
          { text: '"Maybe we stay."', next: 'ending' },
          { text: '"Maybe that\'s okay."', next: 'ending' },
        ],
      },
      {
        id: 'ending',
        speaker: 'narration',
        text: 'The day ends. It resets.',
      },
      {
        speaker: 'narration',
        text: 'You wake at 6AM.',
      },
      {
        speaker: 'narration',
        text: 'The same sun. The same desert. The same coffee.',
      },
      {
        speaker: 'narration',
        text: 'Marge smiles at you from behind the counter.',
      },
      {
        speaker: 'npc',
        text: '"You look like you\'ve been here before, hun."',
      },
      {
        speaker: 'narration',
        text: 'You smile back.',
      },
      {
        speaker: 'narration',
        text: 'You have.',
      },
      {
        speaker: 'narration',
        text: '[THE END]',
      },
    ],
    effects: {
      setFlags: ['ending_complete', 'ending_d'],
    },
  },
]
