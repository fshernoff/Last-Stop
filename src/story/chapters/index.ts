import type { StoryBeatDef, StoryBeatId } from '../schema'
import { CH1_BEATS } from './ch1'
import { CH2_BEATS } from './ch2'
import { CH3_BEATS } from './ch3'
import { CH4_BEATS } from './ch4'
import { CH5_BEATS } from './ch5'

const ALL_BEATS: StoryBeatDef[] = [
  ...CH1_BEATS,
  ...CH2_BEATS,
  ...CH3_BEATS,
  ...CH4_BEATS,
  ...CH5_BEATS,
]

const BEATS_BY_ID = new Map<StoryBeatId, StoryBeatDef>(
  ALL_BEATS.map((beat) => [beat.id, beat])
)

export const getBeatDefinition = (beatId: StoryBeatId): StoryBeatDef => {
  const beat = BEATS_BY_ID.get(beatId)
  if (!beat) {
    throw new Error(`Unknown beat "${beatId}"`)
  }
  return beat
}

export const getAllBeats = (): StoryBeatDef[] => ALL_BEATS

export const getChapterEntryBeat = (chapterNumber: number): StoryBeatId => {
  switch (chapterNumber) {
    case 1:
      return 'ch1_b1_wake'
    case 2:
      return 'ch2_b1_aftermath'
    case 3:
      return 'ch3_b1_reveal'
    case 4:
      return 'ch4_b1_journal'
    case 5:
      return 'ch5_b1_endgame'
    default:
      return 'ch1_b1_wake'
  }
}
