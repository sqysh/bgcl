'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

/**
 * A plain anchor rather than a router push, because the callback is a NextAuth
 * endpoint that responds with a redirect. The click state is local, since the
 * browser is leaving the page either way.
 */
export function ConfirmSignInButton({ href }: { href: string }) {
  const [isSigningIn, setIsSigningIn] = useState(false)

  return (
    <a
      href={href}
      rel="nofollow noreferrer"
      onClick={() => setIsSigningIn(true)}
      aria-busy={isSigningIn}
      aria-disabled={isSigningIn}
      className={`mt-8 w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-lg text-[15px] font-semibold text-white bg-sky-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
        isSigningIn ? 'opacity-70 pointer-events-none' : 'hover:bg-sky-500'
      }`}
    >
      {isSigningIn && <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />}
      {isSigningIn ? 'Signing you in' : 'Sign in'}
    </a>
  )
}
