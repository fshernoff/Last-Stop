import { useMemo, useState, useEffect } from 'react'
import { useGameStore } from '../store/gameStore'
import { LOCATIONS } from '../data/locations'
import { OBSERVABLE_LOCATIONS } from '../data/observations'
import { formatTime, getMinutesUntilMidnight } from '../utils/time'
import { gameMinutesToRealTime } from '../utils/observations'
import type { LocationId } from '../types'

export function ObserveScreen() {
  const {
    activeObservations,
    observationLog,
    currentTime,
    startObservation,
    stopObservation,
    clearObservationLog,
    setFlag,
  } = useGameStore()

  const minutesUntilMidnight = getMinutesUntilMidnight(currentTime)
  const realTimeRemaining = gameMinutesToRealTime(minutesUntilMidnight)
  const isObserving = activeObservations.length > 0
  const isAtCapacity = activeObservations.length >= 3

  const [selectedLocation, setSelectedLocation] = useState<LocationId | ''>('')
  const [selectedStart, setSelectedStart] = useState<number>(currentTime)
  const [selectedEnd, setSelectedEnd] = useState<number>(Math.min(currentTime + 120, 1080))
  const [scheduleError, setScheduleError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedStart < currentTime) {
      setSelectedStart(currentTime)
    }
    const minimumEnd = Math.min(selectedStart + 30, 1080)
    if (selectedEnd <= selectedStart) {
      setSelectedEnd(minimumEnd)
    } else if (selectedEnd <= currentTime) {
      setSelectedEnd(Math.min(currentTime + 120, 1080))
    }
  }, [currentTime, selectedStart, selectedEnd])

  // Get locations that can be observed but aren't currently
  const availableLocations = OBSERVABLE_LOCATIONS.filter(
    (locId) => !activeObservations.some((obs) => obs.location === locId)
  )

  const timeOptions = useMemo(() => {
    const options: number[] = []
    for (let time = currentTime; time < 1080; time += 30) {
      options.push(time)
    }
    return options
  }, [currentTime])

  const endOptions = useMemo(() => {
    const options: number[] = []
    for (let time = selectedStart + 30; time <= 1080; time += 30) {
      options.push(time)
    }
    return options
  }, [selectedStart])

  const handleScheduleObservation = () => {
    if (!selectedLocation) {
      setScheduleError('Choose a location to observe.')
      return
    }
    if (selectedStart >= selectedEnd) {
      setScheduleError('End time must be after start time.')
      return
    }
    if (selectedStart < currentTime) {
      setScheduleError('Start time must be in the future.')
      return
    }
    if (isAtCapacity) {
      setScheduleError('You can only observe up to 3 locations at once.')
      return
    }

    startObservation(selectedLocation, selectedStart, selectedEnd)
    setScheduleError(null)
    setSelectedLocation('')
  }

  const handleStopObservation = (location: LocationId) => {
    stopObservation(location)
  }

  const handleDismissLog = () => {
    // Apply any flags from observed events before clearing
    for (const entry of observationLog) {
      if (entry.setsFlag) {
        setFlag(entry.setsFlag)
      }
    }
    clearObservationLog()
  }

  // If there's an observation log, show it first
  if (observationLog.length > 0) {
    return (
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg border border-amber-600 p-4">
          <h2 className="text-lg font-semibold mb-4 text-amber-400">
            OBSERVATION LOG
          </h2>

          <p className="text-sm text-slate-400 mb-4">
            While you were away, you observed the following:
          </p>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {observationLog.map((entry, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded p-3 border border-slate-600"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xs text-amber-400 font-mono whitespace-nowrap">
                    {formatTime(entry.time)}
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 uppercase">
                      {LOCATIONS[entry.location].name}
                    </span>
                    <p className="text-sm text-slate-200 mt-1">{entry.text}</p>
                  </div>
                </div>
                {entry.setsFlag && (
                  <div className="mt-2 text-xs text-amber-400">
                    * New discovery
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleDismissLog}
            className="mt-4 w-full py-2 px-4 bg-amber-600 hover:bg-amber-500 text-slate-900 font-semibold rounded transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Active observations */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h2 className="text-lg font-semibold mb-4 text-amber-400">OBSERVE</h2>

        {minutesUntilMidnight <= 0 ? (
          <div className="text-slate-500 text-sm italic">
            It's midnight. The day is ending...
          </div>
        ) : (
          <>
            <div className="text-sm text-slate-400 mb-4">
              <p>
                Set up observations to watch locations while you're away from
                the game.
              </p>
              <p className="mt-2 text-slate-500">
                Time until midnight:{' '}
                <span className="text-amber-400">
                  {formatTime(currentTime)} - 12:00 AM
                </span>{' '}
                ({realTimeRemaining} real time)
              </p>
            </div>

            {/* Active observations */}
            {isObserving && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">
                  Active Observations ({activeObservations.length}/3)
                </h3>
                <div className="space-y-2">
                  {activeObservations.map((obs) => (
                    <div
                      key={obs.location}
                      className="flex items-center justify-between bg-amber-900/20 border border-amber-700/50 rounded p-3"
                    >
                      <div>
                        <span className="text-slate-200">
                          {LOCATIONS[obs.location].name}
                        </span>
                        <span className="text-xs text-slate-500 ml-2">
                          {formatTime(obs.startTime)} → {formatTime(obs.endTime)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleStopObservation(obs.location)}
                        className="text-sm px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                      >
                        Stop
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available locations to observe */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-slate-300 uppercase tracking-wide">
                {isObserving ? 'Schedule Another Observation' : 'Schedule an Observation'}
              </h3>

              {availableLocations.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  You are already observing every available location.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={selectedLocation}
                      onChange={(event) => setSelectedLocation(event.target.value as LocationId)}
                      className="w-full bg-slate-700 border border-slate-600 rounded px-2 py-2 text-sm text-slate-200"
                    >
                      <option value="">Choose location</option>
                      {availableLocations.map((locId) => (
                        <option key={locId} value={locId}>
                          {LOCATIONS[locId].name}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-slate-500 flex items-center justify-end">
                      {isAtCapacity ? 'Observation limit reached' : 'Up to 3 active'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs text-slate-400">
                      Start
                      <select
                        value={selectedStart}
                        onChange={(event) => setSelectedStart(Number(event.target.value))}
                        className="mt-1 w-full bg-slate-700 border border-slate-600 rounded px-2 py-2 text-sm text-slate-200"
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {formatTime(time)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs text-slate-400">
                      End
                      <select
                        value={selectedEnd}
                        onChange={(event) => setSelectedEnd(Number(event.target.value))}
                        className="mt-1 w-full bg-slate-700 border border-slate-600 rounded px-2 py-2 text-sm text-slate-200"
                      >
                        {endOptions.map((time) => (
                          <option key={time} value={time}>
                            {formatTime(time)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  {endOptions.length === 0 && (
                    <p className="text-xs text-slate-500 italic">
                      Not enough time left in the day to schedule this.
                    </p>
                  )}

                  <button
                    onClick={handleScheduleObservation}
                    disabled={isAtCapacity}
                    className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold rounded transition-colors"
                  >
                    Schedule Observation
                  </button>

                  {scheduleError && (
                    <p className="text-xs text-red-400">{scheduleError}</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* How it works */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-sm font-semibold mb-3 text-slate-400 uppercase tracking-wide">
          How Observation Works
        </h3>
        <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
          <li>Select locations you want to observe</li>
          <li>Close the game and time will pass while you're away</li>
          <li>
            Real time converts to game time (1 real hour = 3 game hours)
          </li>
          <li>When you return, you'll see a log of what happened</li>
          <li>Discover NPC movements and special events</li>
          <li>Some observations unlock new knowledge</li>
        </ul>
      </div>

      {/* Status when actively observing */}
      {isObserving && (
        <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">
              Observation active - you can close the game
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Your observations will be processed when you return. The game will
            record events until midnight or until you come back.
          </p>
        </div>
      )}
    </div>
  )
}
