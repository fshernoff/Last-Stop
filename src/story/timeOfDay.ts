import type { TimeOfDay } from './schema'

export const TIME_OF_DAY_LABELS: Record<TimeOfDay, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
}

export const timeOfDayToMinutes = (timeOfDay: TimeOfDay): number => {
  switch (timeOfDay) {
    case 'morning':
      return 120 // 8:00 AM
    case 'afternoon':
      return 540 // 3:00 PM
    case 'evening':
      return 780 // 7:00 PM
    case 'night':
      return 960 // 10:00 PM
  }
}
