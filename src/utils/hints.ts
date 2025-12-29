import type { GameState } from '../types'

interface HintRule {
  id: string
  text: string
  when: (state: Pick<GameState, 'storyBeatId' | 'flags' | 'trust'>) => boolean
}

const HINT_RULES: HintRule[] = [
  {
    id: 'beat_wake',
    text: 'Visit the office and meet Earl.',
    when: (state) => state.storyBeatId === 'ch1_b1_wake',
  },
  {
    id: 'beat_meet_staff',
    text: 'Stop by the diner and meet Marge.',
    when: (state) => state.storyBeatId === 'ch1_b2_meet_staff',
  },
  {
    id: 'beat_stakeout',
    text: 'Stake out the office to see what Earl is hiding.',
    when: (state) => state.storyBeatId === 'ch1_b3_stakeout',
  },
  {
    id: 'beat_confront',
    text: 'Confront Earl in the office.',
    when: (state) => state.storyBeatId === 'ch1_b4_confront',
  },
  {
    id: 'after_confront',
    text: 'Go to the diner and test your memory of yesterday.',
    when: (state) =>
      state.storyBeatId === 'ch2_b1_aftermath' &&
      !state.flags.includes('earl_revealed'),
  },
  {
    id: 'back_room',
    text: 'Get access to the back room and see what Earl is hiding.',
    when: (state) =>
      state.flags.includes('earl_revealed') &&
      !state.flags.includes('seen_device'),
  },
  {
    id: 'journal',
    text: "Search the back room for Thomas's journal.",
    when: (state) =>
      state.flags.includes('seen_device') &&
      !state.flags.includes('has_thomas_journal'),
  },
  {
    id: 'show_journal',
    text: "Show Thomas's journal to Earl.",
    when: (state) =>
      state.flags.includes('has_thomas_journal') &&
      !state.flags.includes('earl_read_journal'),
  },
  {
    id: 'vincent',
    text: 'Ask Earl about the guest in Room 6.',
    when: (state) =>
      state.flags.includes('earl_read_journal') &&
      !state.flags.includes('vincent_opened_door'),
  },
  {
    id: 'ending',
    text: 'Return to Earl to decide how this ends.',
    when: (state) => state.flags.includes('ready_for_ending'),
  },
]

export function getNextHint(state: Pick<GameState, 'storyBeatId' | 'flags' | 'trust'>): string {
  for (const rule of HINT_RULES) {
    if (rule.when(state)) {
      return rule.text
    }
  }
  return 'No new leads right now. Try observing or talking to someone again.'
}
