'use client'

import { useFormContext } from 'react-hook-form'
import { Settings } from 'lucide-react'
import type { EventStatus } from '@prisma/client'

import { SectionHeader } from './SectionHeader'
import { formatDate } from '@/lib/utils/date-utils'
import { sectionCls } from '@/lib/constants/form.constants'
import { STATUS_CONFIG } from '../_constants/event-details.constants'

const day = (value: string) => formatDate(new Date(value), { month: 'long', day: 'numeric' })

/** What each switch in the Options panel actually does. */
const OPTION_NOTES: { label: string; description: string }[] = [
  {
    label: 'Public',
    description: 'Shows on the events page and gives the event its own page that anyone can open.'
  },
  {
    label: 'Listed',
    description:
      'Keeps the event off the events page while still allowing sales from a page you link to directly, such as the table reservation page.'
  },
  {
    label: 'Raffle',
    description: 'Assigns a numbered raffle ticket to each purchase and shows the drawing details to buyers.'
  },
  {
    label: 'Attending',
    description: 'Adds a question at checkout asking whether the buyer plans to come. It does not change the seat count.'
  }
]

/** What the scheduler will do next, in the admin's terms. */
function nextChange(status: EventStatus, date?: string | null, endsAt?: string | null) {
  switch (status) {
    case 'UPCOMING':
      return date ? `Moves to Ongoing when the event starts on ${day(date)}.` : 'Moves to Ongoing when the event starts.'
    case 'ONGOING':
      return endsAt ? `Moves to Completed when the event ends on ${day(endsAt)}.` : 'Moves to Completed when the event ends.'
    case 'COMPLETED':
      return 'This event has finished. You can archive it from the events list whenever you are ready.'
    case 'ARCHIVED':
      return 'Archived events stay in your records but are hidden from the public site.'
    case 'CANCELLED':
      return 'This event was cancelled and will not change on its own.'
    default:
      return null
  }
}

export function StatusPanel() {
  const { watch } = useFormContext<{ status: EventStatus; date?: string; endsAt?: string }>()

  const status = watch('status')
  const cfg = STATUS_CONFIG[status]

  return (
    <div className={sectionCls}>
      <SectionHeader icon={Settings} title="Status" />

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${cfg?.dot ?? 'bg-neutral-400'}`} aria-hidden="true" />
          <p className="text-base font-semibold text-neutral-900 dark:text-white">{cfg?.label ?? status}</p>
        </div>

        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {nextChange(status, watch('date'), watch('endsAt'))}
        </p>

        <p className="text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
          Status follows the event dates automatically. To change it, edit the date and time.
        </p>
      </div>

      <div className="px-4 pb-4 pt-1 border-t border-neutral-200 dark:border-neutral-800">
        <p className="mt-3 mb-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          What the options do
        </p>

        <dl className="space-y-2">
          {OPTION_NOTES.map((option) => (
            <div key={option.label}>
              <dt className="text-xs font-medium text-neutral-900 dark:text-white">{option.label}</dt>
              <dd className="text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">{option.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
