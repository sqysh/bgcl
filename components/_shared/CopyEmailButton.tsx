'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Mail } from 'lucide-react'

type Props = {
  email: string
  className?: string
}

/**
 * Shows the address so there is never a question about what was copied. The
 * icon confirms the action rather than the label, so the button does not
 * change width when pressed.
 */
export function CopyEmailButton({ email, className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Clipboard access can be refused on insecure origins and in some in-app
      // browsers, so fall back to opening the mail client
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <>
      <button type="button" onClick={copy} aria-label={`Copy ${email} to clipboard`} className={`group ${className}`}>
        <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />

        {email}

        {copied ? (
          <Check className="w-4 h-4 shrink-0 text-emerald-500" aria-hidden="true" />
        ) : (
          <Copy className="w-4 h-4 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
        )}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied' : ''}
      </span>
    </>
  )
}
