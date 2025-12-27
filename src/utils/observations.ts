import type { LocationId, Observation, ObservationEntry } from '../types'
import { simulateObservation } from '../data/observations'

/**
 * Real-time to game-time ratio
 * 1 real hour = 3 game hours
 * 1 real minute = 3 game minutes
 */
export const REAL_TO_GAME_TIME_RATIO = 3

/**
 * Convert real elapsed time (ms) to game minutes
 */
export function realTimeToGameMinutes(realMs: number): number {
  const realMinutes = realMs / (1000 * 60)
  return Math.floor(realMinutes * REAL_TO_GAME_TIME_RATIO)
}

/**
 * Convert game minutes to real time display
 */
export function gameMinutesToRealTime(gameMinutes: number): string {
  const realMinutes = gameMinutes / REAL_TO_GAME_TIME_RATIO
  if (realMinutes < 60) {
    return `${Math.round(realMinutes)} min`
  }
  const hours = Math.floor(realMinutes / 60)
  const mins = Math.round(realMinutes % 60)
  if (mins === 0) {
    return `${hours}h`
  }
  return `${hours}h ${mins}m`
}

/**
 * Calculate how much game time remains until midnight from a given start time
 */
export function getTimeUntilMidnight(currentGameTime: number): number {
  return Math.max(0, 1080 - currentGameTime)
}

/**
 * Process all active observations for the elapsed real time.
 * Returns observation entries and the new game time.
 */
export function processObservations(
  observations: Observation[],
  currentGameTime: number,
  elapsedRealMs: number,
  loopNumber: number
): {
  entries: ObservationEntry[]
  newGameTime: number
  reachedMidnight: boolean
} {
  const elapsedGameMinutes = realTimeToGameMinutes(elapsedRealMs)
  const newGameTime = Math.min(currentGameTime + elapsedGameMinutes, 1080)
  const reachedMidnight = newGameTime >= 1080

  const allEntries: ObservationEntry[] = []

  for (const observation of observations) {
    // Calculate the effective observation window
    const effectiveStart = Math.max(observation.startTime, currentGameTime)
    const effectiveEnd = Math.min(observation.endTime, newGameTime)

    if (effectiveStart < effectiveEnd) {
      const entries = simulateObservation(
        observation.location,
        effectiveStart,
        effectiveEnd,
        loopNumber
      )
      allEntries.push(...entries)
    }
  }

  // Sort all entries by time
  allEntries.sort((a, b) => a.time - b.time)

  return {
    entries: allEntries,
    newGameTime,
    reachedMidnight,
  }
}

/**
 * Create an observation for a location starting now until midnight
 */
export function createObservation(
  location: LocationId,
  currentGameTime: number
): Observation {
  return {
    location,
    startTime: currentGameTime,
    endTime: 1080, // Until midnight
  }
}

/**
 * Get a description of what an observation will capture
 */
export function getObservationDescription(
  _location: LocationId,
  currentGameTime: number
): string {
  const remainingMinutes = getTimeUntilMidnight(currentGameTime)
  const realTime = gameMinutesToRealTime(remainingMinutes)

  return `Watch this location until midnight. Close the game and return to see what happened. (${realTime} real time for full observation)`
}

/**
 * Minimum real time (ms) to consider processing observations
 * To avoid processing on quick tab switches
 */
export const MIN_IDLE_TIME_MS = 30 * 1000 // 30 seconds

/**
 * Check if enough time has passed to process observations
 */
export function shouldProcessIdleTime(lastPlayedAt: number | null): {
  shouldProcess: boolean
  elapsedMs: number
} {
  if (!lastPlayedAt) {
    return { shouldProcess: false, elapsedMs: 0 }
  }

  const now = Date.now()
  const elapsedMs = now - lastPlayedAt

  return {
    shouldProcess: elapsedMs >= MIN_IDLE_TIME_MS,
    elapsedMs,
  }
}
