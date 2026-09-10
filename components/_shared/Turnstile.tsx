'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      remove: (id: string) => void
      reset: (id: string) => void
    }
  }
}

/**
 * Renders the Cloudflare Turnstile widget and hands the token back. Most people
 * see a tick and nothing else; a suspicious request gets a challenge.
 *
 * `action` names the surface being protected and is checked server-side, so a
 * token minted on one form cannot be replayed against another.
 */
export function Turnstile({
  action,
  onToken,
  resetSignal = 0
}: {
  action: string
  onToken: (token: string | null) => void
  resetSignal?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    if (!siteKey) return

    let cancelled = false

    const render = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId.current) return

      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        action,
        theme: 'auto',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(null),
        'error-callback': () => onToken(null)
      })
    }

    if (window.turnstile) {
      render()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = render
    document.head.appendChild(script)

    return () => {
      cancelled = true

      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [action, onToken])

  // Tokens are single use, so a page that stays put after a failed submit needs
  // a fresh one before the person can try again
  useEffect(() => {
    if (resetSignal === 0 || !widgetId.current || !window.turnstile) return

    window.turnstile.reset(widgetId.current)
    onToken(null)
  }, [resetSignal, onToken])

  return <div ref={ref} />
}
