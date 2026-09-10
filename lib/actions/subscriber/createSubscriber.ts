'use server'

import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { subscriberSchema } from '@/lib/validations/subscriber.validation'
import { looksAutomated } from '@/lib/utils/looksAutomated.utils'

export async function createSubscriber(input: unknown) {
  const parsed = subscriberSchema.safeParse(input)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]

    return { success: false, data: null, error: issue?.message ?? 'Please check the form and try again' }
  }

  const data = parsed.data
  const email = data.email.toLowerCase().trim()

  const automated = looksAutomated(data)

  if (automated) {
    await createLog('info', 'Subscriber discarded as automated', {
      reason: automated,
      email,
      renderedAt: data.renderedAt,
      elapsedMs: data.renderedAt ? Date.now() - data.renderedAt : null
    })

    // Same shape as a real success, so nothing signals that it was rejected
    return { success: true, data: null, error: null }
  }

  try {
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
      select: { id: true }
    })

    if (existingSubscriber) {
      return { success: true, data: null, error: null }
    }

    const subscriber = await prisma.subscriber.create({
      data: { email, type: data.type }
    })

    return { success: true, data: subscriber, error: null }
  } catch (error) {
    await createLog('error', 'Failed to create subscriber', {
      error: error instanceof Error ? error.message : 'Unknown error',
      email
    })

    return { success: false, data: null, error: 'Failed to subscribe. Please try again.' }
  }
}
