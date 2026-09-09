'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2, Pencil, X } from 'lucide-react'
import { updateUserEmail } from '@/lib/actions/user/updateUserEmail'

export function EditableEmail({ userId, email }: { userId: string; email: string }) {
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState(email)
  const [saved, setSaved] = useState(email)

  const cancel = () => {
    setValue(saved)
    setError(null)
    setIsEditing(false)
  }

  const save = async () => {
    setIsSaving(true)
    setError(null)

    const result = await updateUserEmail({ userId, email: value })

    setIsSaving(false)

    if (!result.success || !result.data) {
      setError(result.error ?? 'Could not save')
      return
    }

    setSaved(result.data.email)
    setValue(result.data.email)
    setIsEditing(false)
    router.refresh()
  }

  if (!isEditing) {
    return (
      <div className="mt-0.5 flex items-baseline gap-2">
        <span className="text-sm text-neutral-900 dark:text-white break-all">{saved}</span>

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Change email address"
          className="shrink-0 text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded"
        >
          <Pencil className="w-3 h-3" aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <div className="mt-0.5">
      <input
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        aria-label="Email address"
        className="w-full px-2 py-1 text-sm bg-transparent border border-neutral-200 dark:border-neutral-800 rounded text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
      />

      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-600">
        This is how they sign in. Sign-in links will go to the new address.
      </p>

      {error && (
        <p role="alert" className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="mt-2 flex items-center gap-1">
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
          disabled={isSaving || !value.trim()}
          aria-label="Save email address"
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
