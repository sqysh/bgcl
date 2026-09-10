import 'server-only'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const MAX_TOKEN_LENGTH = 2048

type SiteVerifyResponse = {
  success?: boolean
  action?: string
  hostname?: string
  'error-codes'?: string[]
}

const allowedHostnames = () =>
  (process.env.TURNSTILE_HOSTNAMES ?? '')
    .split(',')
    .map((hostname) => hostname.trim())
    .filter(Boolean)

/**
 * Checks a Turnstile token with Cloudflare. Beyond `success`, this confirms the
 * token was minted for the surface being protected and on a hostname we expect,
 * so a token from the dev site or from another form cannot be replayed here.
 */
export async function verifyTurnstile({
  token,
  action,
  ip
}: {
  token?: string
  action: string
  ip?: string | null
}): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // Nothing to check without a key: let local development through, but never
  // silently disable the check in production
  if (!secret) return process.env.NODE_ENV !== 'production'

  if (typeof token !== 'string' || token.length === 0 || token.length > MAX_TOKEN_LENGTH) return false

  const hostnames = allowedHostnames()
  if (hostnames.length === 0) return false

  try {
    const body = new URLSearchParams({ secret, response: token, action })
    if (ip) body.set('remoteip', ip)

    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body
    })

    if (!response.ok) return false

    const result = (await response.json()) as SiteVerifyResponse

    if (result.success !== true) return false
    if (result.action !== action) return false
    if (!result.hostname || !hostnames.includes(result.hostname)) return false

    return true
  } catch {
    // Fail closed. An unreachable Cloudflare is rare; an open door is not worth
    // the convenience.
    return false
  }
}
