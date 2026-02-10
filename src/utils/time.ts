/**
 * Time utilities for Last Stop
 *
 * Game time runs from 6AM (0) to midnight (1080 minutes = 18 hours)
 */

export const GAME_START_HOUR = 6 // 6 AM
export const MINUTES_IN_DAY = 1080 // 18 hours (6AM to midnight)

/**
 * Format game time (minutes since 6AM) to display string
 */
export const formatTime = (minutes: number): string => {
  const totalHours = Math.floor(minutes / 60) + GAME_START_HOUR
  const mins = minutes % 60
  const period = totalHours >= 12 ? 'PM' : 'AM'
  const displayHours = totalHours > 12 ? totalHours - 12 : totalHours === 0 ? 12 : totalHours
  return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`
}

/**
 * Check if current time is at or past midnight
 */
export const isMidnight = (minutes: number): boolean => {
  return minutes >= MINUTES_IN_DAY
}

/**
 * Get time period description for atmospheric text
 */
export const getTimePeriod = (minutes: number): 'morning' | 'afternoon' | 'evening' | 'night' => {
  const hour = Math.floor(minutes / 60) + GAME_START_HOUR
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  if (hour < 20) return 'evening'
  return 'night'
}

/**
 * Get minutes remaining until midnight
 */
export const getMinutesUntilMidnight = (currentTime: number): number => {
  return Math.max(0, MINUTES_IN_DAY - currentTime)
}
