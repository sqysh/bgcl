import 'server-only'
import prisma from '@/prisma/client'
import { auth } from '@/lib/auth/auth'

/**
 * Resolves the acting user itself, so every call site records who did it
 * without having to remember. Logging must never break the thing being logged,
 * so a failure here is swallowed.
 */
export async function createLog(level: string, message: string, metadata?: unknown) {
  let userId: string | null = null

  try {
    const session = await auth()
    userId = session?.user?.id ?? null
  } catch {
    // No session in this context, which is normal for webhooks and cron
  }

  try {
    await prisma.log.create({
      data: {
        level,
        message,
        userId,
        metadata: metadata ? JSON.stringify(metadata) : undefined
      }
    })
  } catch {
    // A log write must not take down the action that called it
  }
}
