/**
 * Event times are entered and displayed in the club's own timezone, never the
 * timezone of the machine doing the parsing. The server runs in UTC, so
 * `new Date('2026-10-06T21:00')` there means 9pm UTC, not 9pm in Lynn.
 */

export const EVENT_TIME_ZONE = 'America/New_York'

const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TIME_ZONE,
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
})

const partsOf = (date: Date) => {
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]))

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    // en-US with hour12 false renders midnight as 24
    hour: Number(parts.hour) % 24,
    minute: Number(parts.minute),
    second: Number(parts.second)
  }
}

/** How far the zone sits from UTC, in ms, at a given instant. */
const offsetAt = (utcMs: number) => {
  const { year, month, day, hour, minute, second } = partsOf(new Date(utcMs))
  return Date.UTC(year, month - 1, day, hour, minute, second) - utcMs
}

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * "2026-10-06T21:00" as entered in the club's timezone, to the real instant.
 * Checked twice so times near a daylight saving change land on the right side.
 */
export const fromEventInput = (value: string | null | undefined): Date | null => {
  if (!value) return null

  const [datePart, timePart = '00:00'] = value.split('T')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hour, minute, second = 0] = timePart.split(':').map(Number)

  if (!year || !month || !day) return null

  const naive = Date.UTC(year, month - 1, day, hour, minute, second)
  const offset = offsetAt(naive - offsetAt(naive))

  return new Date(naive - offset)
}

/** The reverse: an instant to the "2026-10-06T21:00" a datetime-local wants. */
export const toEventInput = (date: Date | string | null | undefined): string => {
  if (!date) return ''

  const parsed = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsed.getTime())) return ''

  const { year, month, day, hour, minute } = partsOf(parsed)
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`
}
