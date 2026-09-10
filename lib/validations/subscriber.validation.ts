import { z } from 'zod'
import { EMPTY_SPAM_GUARD, spamGuardFields } from './spam-guard.validation'

export const SUBSCRIBER_TYPES = ['member', 'donor', 'non-member'] as const
export type SubscriberType = (typeof SUBSCRIBER_TYPES)[number]

export const subscriberSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  type: z.enum(SUBSCRIBER_TYPES, { error: 'Please choose an option' }),
  ...spamGuardFields
})

export type SubscriberFormInput = z.input<typeof subscriberSchema>
export type SubscriberFormValues = z.output<typeof subscriberSchema>

export const EMPTY_SUBSCRIBER: SubscriberFormInput = { email: '', type: 'member', ...EMPTY_SPAM_GUARD }

export const SUBSCRIBER_NULLABLE_FIELDS = [] as const
