'use client'

import { useState } from 'react'
import { Check, Loader2, Pencil, TrendingUp, X } from 'lucide-react'
import { updateCapitalCampaign } from '@/lib/actions/capital-campaign/updateCapitalCampaign'
import { formatCurrencyWhole } from '@/lib/utils/currency.utils'

const inputCls =
  'w-full px-2 py-1 text-[13px] bg-transparent border border-neutral-200 dark:border-neutral-800 rounded text-neutral-900 dark:text-white tabular-nums focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent'

export function CapitalCampaignEditor({ goalAmount, raisedAmount }: { goalAmount: number; raisedAmount: number }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [goal, setGoal] = useState(String(goalAmount))
  const [raised, setRaised] = useState(String(raisedAmount))

  const [saved, setSaved] = useState({ goalAmount, raisedAmount })

  const percent = saved.goalAmount > 0 ? Math.min(100, Math.round((saved.raisedAmount / saved.goalAmount) * 100)) : 0

  const cancel = () => {
    setGoal(String(saved.goalAmount))
    setRaised(String(saved.raisedAmount))
    setError(null)
    setIsEditing(false)
  }

  const save = async () => {
    setIsSaving(true)
    setError(null)

    const result = await updateCapitalCampaign({
      goalAmount: Number(goal.replace(/[^\d.]/g, '')),
      raisedAmount: Number(raised.replace(/[^\d.]/g, ''))
    })

    setIsSaving(false)

    if (!result.success || !result.data) {
      setError(result.error ?? 'Could not save')
      return
    }

    setSaved(result.data)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="group w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <TrendingUp className="w-4 h-4 shrink-0" aria-hidden="true" />

        <span className="flex-1 min-w-0 text-left truncate tabular-nums">
          {formatCurrencyWhole(saved.raisedAmount)} of {formatCurrencyWhole(saved.goalAmount)}
        </span>

        <span className="shrink-0 text-[11px] text-neutral-400 dark:text-neutral-600 tabular-nums group-hover:hidden">
          {percent}%
        </span>

        <Pencil className="w-3 h-3 shrink-0 hidden group-hover:block" aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className="px-2 py-2 space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-600">
        Capital campaign
      </p>

      <label className="block">
        <span className="text-[11px] text-neutral-400 dark:text-neutral-600">Raised</span>
        <input
          type="text"
          inputMode="decimal"
          value={raised}
          onChange={(e) => setRaised(e.target.value)}
          className={inputCls}
          aria-label="Amount raised"
        />
      </label>

      <label className="block">
        <span className="text-[11px] text-neutral-400 dark:text-neutral-600">Goal</span>
        <input
          type="text"
          inputMode="decimal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className={inputCls}
          aria-label="Goal amount"
        />
      </label>

      {error && (
        <p role="alert" className="text-[11px] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={cancel}
          disabled={isSaving}
          aria-label="Cancel"
          className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={save}
          disabled={isSaving}
          aria-label="Save amounts"
          className="p-1.5 rounded text-sky-600 dark:text-sky-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}
