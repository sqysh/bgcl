'use client'

import Picture from '@/components/_shared/Picture'
import { useEffect, useState } from 'react'
import { Check, Copy } from 'lucide-react'

const CONTACT_EMAIL = 'info@bgcl.org'

export function ReserveHeader() {
  return (
    <header className="shrink-0 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-lg mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex h-8 shrink-0" aria-label="Boys &amp; Girls Club of Lynn">
          <Picture
            src="/images/horizontal-logo-light.png"
            alt="Boys &amp; Girls Club of Lynn"
            className="dark:hidden block h-full w-auto object-contain hover:opacity-80 transition-opacity"
            priority
          />
          <Picture
            src="/images/horizontal-logo-dark.png"
            decorative
            className="dark:block hidden h-full w-auto object-contain hover:opacity-80 transition-opacity"
            priority
          />
        </div>
      </div>
    </header>
  )
}

export function ReserveFooter() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
    } catch {
      // Clipboard access can be refused, so leave the address on screen to read
    }
  }

  return (
    <footer className="shrink-0 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="max-w-lg mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          Questions?{' '}
          <button
            type="button"
            onClick={copy}
            aria-label={`Copy ${CONTACT_EMAIL} to clipboard`}
            className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
          >
            {CONTACT_EMAIL}
            {copied ? (
              <Check className="w-3 h-3 shrink-0" aria-hidden="true" />
            ) : (
              <Copy className="w-3 h-3 shrink-0" aria-hidden="true" />
            )}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? 'Email address copied' : ''}
          </span>
        </p>

        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          Secured by Stripe · Powered by{' '}
          <a href="https://sqysh.com" target="_blank" rel="noopener noreferrer" className="sqysh-gradient hover:underline">
            sqysh
          </a>
        </p>
      </div>
    </footer>
  )
}
