export type ChapterId = 'ch1' | 'ch2' | 'ch3' | 'ch4' | 'ch5'
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'
export type StoryBeatId = `${ChapterId}_b${number}_${string}`

export interface StoryBeatDef {
  id: StoryBeatId
  chapterId: ChapterId
  title: string
  nextBeatId?: StoryBeatId
  timeOfDay?: TimeOfDay
}

export const getChapterNumber = (chapterId: ChapterId): number => {
  const match = chapterId.match(/^ch(\d+)$/)
  return match ? Number(match[1]) : 0
}
