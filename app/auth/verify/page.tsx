// app/auth/verify/page.tsx
import Link from 'next/link'
import Picture from '@/components/_shared/Picture'
import { ConfirmSignInButton } from './_components/ConfirmSignInButton'

const isCallbackUrl = (value?: string) => {
  if (!value) return false

  try {
    return new URL(value).pathname.startsWith('/api/auth/callback/')
  } catch {
    return false
  }
}

/**
 * Fetching this page does nothing. The token is only spent when the button is
 * pressed, which a scanner will not do.
 */
export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ callback?: string }> }) {
  const { callback } = await searchParams

  const isValid = isCallbackUrl(callback)

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <div className="flex-1 w-full max-w-sm mx-auto px-6 py-20">
        <Link href="/" className="inline-flex h-10 mb-8" aria-label="Boys &amp; Girls Club of Lynn">
          <Picture
            src="/images/horizontal-logo-light.png"
            alt="Boys &amp; Girls Club of Lynn"
            className="dark:hidden block h-full w-auto object-contain"
            priority
          />
          <Picture
            src="/images/horizontal-logo-dark.png"
            decorative
            className="dark:block hidden h-full w-auto object-contain"
            priority
          />
        </Link>

        {isValid && callback ? (
          <>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Confirm your sign-in</h1>

            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Press the button below to finish signing in. This link works once, so open it on the device you want to use.
            </p>

            <ConfirmSignInButton href={callback} />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">This link has expired</h1>

            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
              Sign-in links can only be used once. Request a new one and it will arrive in a moment.
            </p>

            <Link
              href="/auth/login"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-4 rounded-lg text-[15px] font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Get a new link
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
