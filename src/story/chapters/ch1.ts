import type { StoryBeatDef } from '../schema'

export const CH1_BEATS: StoryBeatDef[] = [
  {
    id: 'ch1_b1_wake',
    chapterId: 'ch1',
    title: 'Wake Up',
    nextBeatId: 'ch1_b2_meet_staff',
    timeOfDay: 'morning',
  },
  {
    id: 'ch1_b2_meet_staff',
    chapterId: 'ch1',
    title: 'Meet the Staff',
    nextBeatId: 'ch1_b3_stakeout',
    timeOfDay: 'morning',
  },
  {
    id: 'ch1_b3_stakeout',
    chapterId: 'ch1',
    title: 'Stake Out the Office',
    nextBeatId: 'ch1_b4_confront',
    timeOfDay: 'evening',
  },
  {
    id: 'ch1_b4_confront',
    chapterId: 'ch1',
    title: 'Confront Earl',
    nextBeatId: 'ch2_b1_aftermath',
    timeOfDay: 'night',
  },
]
