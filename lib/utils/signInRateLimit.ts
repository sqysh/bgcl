import prisma from '@/prisma/client'

const WINDOW_MS = 60 * 60 * 1000 // one hour

// A person signing in a few times an hour is normal. A list being sprayed is not.
const MAX_PER_EMAIL = 5
const MAX_PER_IP = 10

export type SignInRateLimitResult = { allowed: true } | { allowed: false; reason: string }

export async function checkSignInRateLimit({ email, ip }: { email: string; ip?: string | null }): Promise<SignInRateLimitResult> {
  const since = new Date(Date.now() - WINDOW_MS)

  const identifiers = [`email:${email.toLowerCase().trim()}`]
  if (ip) identifiers.push(`ip:${ip}`)

  const attempts = await prisma.signInAttempt.groupBy({
    by: ['identifier'],
    where: { identifier: { in: identifiers }, createdAt: { gte: since } },
    _count: { identifier: true }
  })

  const countFor = (identifier: string) => attempts.find((row) => row.identifier === identifier)?._count.identifier ?? 0

  if (countFor(identifiers[0]) >= MAX_PER_EMAIL) {
    return { allowed: false, reason: 'email' }
  }

  if (ip && countFor(`ip:${ip}`) >= MAX_PER_IP) {
    return { allowed: false, reason: 'ip' }
  }

  await prisma.signInAttempt.createMany({
    data: identifiers.map((identifier) => ({ identifier }))
  })

  // Roughly one request in fifty cleans up, which is often enough for a table
  // nothing reads after an hour
  if (Math.random() < 0.02) {
    void pruneSignInAttempts()
  }

  return { allowed: true }
}

/** Housekeeping, called occasionally rather than on every request */
export async function pruneSignInAttempts() {
  await prisma.signInAttempt.deleteMany({
    where: { createdAt: { lt: new Date(Date.now() - WINDOW_MS) } }
  })
}
