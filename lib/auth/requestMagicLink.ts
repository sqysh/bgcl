'use server'

import { signIn } from '@/lib/auth/auth'
import { isValidEmail } from '../utils/regex'
import { createLog } from '../actions/log/createLog'
import { verifyTurnstile } from '../utils/verifyTurnstile'
import { getIp } from '../utils/getIp'

/**
 * Sign-in requests go through here rather than calling signIn from the browser,
 * so the Turnstile token is checked before NextAuth creates a verification
 * token or sends anything.
 */
export async function requestMagicLink({ email, token }: { email: string; token?: string }) {
  const normalizedEmail = email.toLowerCase().trim()

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, error: 'Enter a valid email address' }
  }

  const ip = await getIp()

  const verified = await verifyTurnstile({ token, action: 'signin', ip })

  if (!verified) {
    await createLog('warn', 'Sign-in request failed verification', {
      location: ['requestMagicLink.ts'],
      email: normalizedEmail,
      ip
    })

    return { success: false, error: 'We could not verify that request. Please refresh and try again.' }
  }

  try {
    await signIn('email', { email: normalizedEmail, redirect: false })

    return { success: true, error: null }
  } catch (error) {
    await createLog('error', 'Failed to request magic link', {
      location: ['requestMagicLink.ts'],
      email: normalizedEmail,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, error: 'Something went wrong sending your link. Please try again.' }
  }
}
