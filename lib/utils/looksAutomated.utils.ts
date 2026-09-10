const MIN_FILL_MS = 3000

export const looksAutomated = (data: { website?: string | null; renderedAt?: number | null }) => {
  if (data.website && data.website.trim().length > 0) return 'honeypot'
  if (data.renderedAt && Date.now() - data.renderedAt < MIN_FILL_MS) return 'submitted too fast'

  return null
}
