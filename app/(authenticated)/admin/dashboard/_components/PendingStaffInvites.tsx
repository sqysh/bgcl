'use client'

import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import { formatDate } from '@/lib/utils/date-utils'
import { revokeStaffInvite } from '@/lib/actions/user/staff-access/revokeStaffInvite'

type Invite = {
  id: string
  email: string
  role: string
  createdAt: string | Date
}

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'admin',
  PROGRAM: 'program'
}

export function PendingStaffInvites({ invites, onRevoked }: { invites: Invite[]; onRevoked: () => void }) {
  const [revoking, setRevoking] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (invites.length === 0) return null

  const revoke = async (email: string) => {
    setRevoking(email)
    setError(null)

    const result = await revokeStaffInvite({ email })

    setRevoking(null)

    if (!result.success) {
      setError(result.error ?? 'Could not revoke that invite')
      return
    }

    onRevoked()
  }

  return (
    <section className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <h2 className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
        Waiting to sign in · {invites.length}
      </h2>

      <ul role="list" className="list-none p-0 m-0 divide-y divide-neutral-100 dark:divide-neutral-900">
        {invites.map((invite) => (
          <li key={invite.id} className="py-3 flex items-baseline justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-neutral-900 dark:text-white truncate">{invite.email}</p>
              <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-600">
                Becomes {ROLE_LABEL[invite.role] ?? invite.role.toLowerCase()} on first sign-in · invited{' '}
                {formatDate(new Date(invite.createdAt))}
              </p>
            </div>

            <button
              type="button"
              onClick={() => revoke(invite.email)}
              disabled={revoking !== null}
              aria-label={`Revoke invite for ${invite.email}`}
              className="shrink-0 p-1.5 rounded text-neutral-400 dark:text-neutral-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {revoking === invite.email ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {error && (
        <p role="alert" className="mt-3 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </section>
  )
}
