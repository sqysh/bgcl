import { Prisma } from '@prisma/client'

export function serialize<T>(value: T, isoDates = false): any {
  if (value == null) return value
  if (value instanceof Prisma.Decimal) return Number(value)
  if (value instanceof Date) return isoDates ? value.toISOString() : value
  if (Array.isArray(value)) return value.map((item) => serialize(item, isoDates))

  if (typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, serialize(v, isoDates)]))
  }

  return value
}
