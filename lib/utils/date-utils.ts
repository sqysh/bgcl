import { EVENT_TIME_ZONE, toEventInput } from '@/lib/utils/eventTime'

/**
 * Convert a UTC date from the database back to separate date and time for a form
 * @param utcDate - UTC Date from the database
 * @returns Object with dateString (MM-DD-YYYY) and timeString (h:mm AM/PM)
 */
export function splitUTCToDateTime(utcDate: Date | string): { dateString: string; timeString: string } {
  const dateObj = typeof utcDate === 'string' ? new Date(utcDate) : utcDate
  const [year, month, day] = toEventInput(dateObj).slice(0, 10).split('-')

  const timeString = dateObj.toLocaleTimeString('en-US', {
    timeZone: EVENT_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return {
    dateString: `${month}-${day}-${year}`,
    timeString
  }
}

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: EVENT_TIME_ZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  })
}
