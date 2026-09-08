'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCartStore } from '@/stores/useCartStore'
import { formatCurrency } from '@/lib/utils/currency.utils'
import { ReserveFooter, ReserveHeader } from './_components/ReserveChrome'
import { ReserveCountdown } from './_components/ReserveCountdown'

const MAX_PER_PERSON = 2

export function ReserveClient({
  ticket,
  isOpen,
  remaining,
  opensAt
}: {
  ticket: any
  isOpen: boolean
  remaining: number
  opensAt
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [hasClicked, setHasClicked] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const clearCart = useCartStore((s) => s.clearCart)
  const addToCart = useCartStore((s) => s.addToCart)

  const maxSelectable = Math.min(MAX_PER_PERSON, remaining)
  const soldOut = remaining === 0
  const isNavigating = hasClicked || isPending
  const now = new Date().getTime()
  const notYetOpen = Boolean(opensAt && opensAt.getTime() > now)

  const reserve = () => {
    setHasClicked(true)

    // A cart holds one event at a time, and anything left from the gala would
    // block checkout, so this starts clean
    clearCart()

    addToCart(
      {
        ...ticket,
        eventTitle: ticket.event.title,
        ticketSalesStartDate: ticket.event.ticketSalesStartDate,
        ticketSalesEndDate: ticket.event.ticketSalesEndDate
      },
      quantity
    )

    startTransition(() => router.push('/checkout'))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <ReserveHeader />

      <div className="flex-1 w-full max-w-lg mx-auto px-6 py-12 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Boys &amp; Girls Club of Lynn
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">Reserve your table</h1>

          {notYetOpen && opensAt ? (
            <>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Table reservations for {ticket.event.title} have not opened yet. Come back when the countdown ends.
              </p>

              <ReserveCountdown opensAt={opensAt} />
            </>
          ) : soldOut ? (
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              All tables have been reserved. To join the waiting list, email{' '}
              <a href="mailto:info@bgcl.org" className="text-sky-600 dark:text-sky-400 hover:underline">
                info@bgcl.org
              </a>
              .
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Put down a deposit to hold a table for {ticket.event.title}. The deposit is credited toward the balance, which we
                will invoice closer to the event. Deposits are non-refundable.
              </p>

              <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Deposit per table
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-white tabular-nums">
                    {formatCurrency(ticket.price)}
                  </p>
                </div>

                <p className="text-sm text-neutral-500 dark:text-neutral-400 tabular-nums">
                  {remaining} {remaining === 1 ? 'table' : 'tables'} left
                </p>
              </div>

              <fieldset className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 border-0 p-0 m-0">
                <legend className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                  How many tables
                </legend>

                <div className="flex gap-3">
                  {Array.from({ length: maxSelectable }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQuantity(n)}
                      aria-pressed={quantity === n}
                      className={`flex-1 h-13 rounded-lg border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        quantity === n
                          ? 'border-sky-600 text-neutral-900 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      {n} {n === 1 ? 'table' : 'tables'}
                    </button>
                  ))}
                </div>

                {maxSelectable < MAX_PER_PERSON && (
                  <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-600">
                    Only {remaining} left, so one per person for now.
                  </p>
                )}
              </fieldset>

              <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between gap-4">
                <p className="text-sm font-medium text-neutral-900 dark:text-white">Total</p>
                <p className="text-xl font-semibold text-neutral-900 dark:text-white tabular-nums">
                  {formatCurrency(ticket.price * quantity)}
                </p>
              </div>

              <button
                type="button"
                onClick={reserve}
                disabled={isNavigating}
                aria-busy={isNavigating}
                className="mt-6 w-full px-5 py-4 rounded-lg text-[15px] font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {isNavigating ? 'Loading checkout' : 'Continue to checkout'}
              </button>

              <p className="mt-5 text-xs text-neutral-400 dark:text-neutral-600">
                Maximum {MAX_PER_PERSON} tables per person. Payments are secured by Stripe.
              </p>
            </>
          )}
        </motion.div>
      </div>

      <ReserveFooter />
    </div>
  )
}
