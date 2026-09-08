// app/(public)/reserve/_components/ReserveCountdown.tsx
'use client'

import { useEffect, useState } from 'react'

const parts = (ms: number) => ({
  days: Math.floor(ms / 86_400_000),
  hours: Math.floor((ms / 3_600_000) % 24),
  minutes: Math.floor((ms / 60_000) % 60),
  seconds: Math.floor((ms / 1000) % 60)
})

export function ReserveCountdown({ opensAt }: { opensAt: string }) {
  const target = new Date(opensAt).getTime()

  // Starts at null so the server and the first client render agree
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, target - Date.now()))

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  const opensLabel = new Date(opensAt).toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York'
  })

  const { days, hours, minutes, seconds } = parts(remaining ?? 0)

  return (
    <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Reservations open
      </p>

      <p className="mt-1 text-sm text-neutral-900 dark:text-white">{opensLabel}</p>

      {remaining !== null && (
        <div className="mt-4 flex items-baseline gap-4 tabular-nums" role="timer" aria-live="off">
          {[
            { value: days, label: 'days' },
            { value: hours, label: 'hrs' },
            { value: minutes, label: 'min' },
            { value: seconds, label: 'sec' }
          ].map(({ value, label }) => (
            <span key={label} className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold text-neutral-900 dark:text-white">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs text-neutral-400 dark:text-neutral-600">{label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
