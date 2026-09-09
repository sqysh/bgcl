// app/(authenticated)/admin/users/_components/GrantStaffAccessModal.tsx
'use client'

import { useState, useMemo } from 'react'
import { Search, X, Check, Loader2 } from 'lucide-react'
import type { Role } from '@prisma/client'
import { grantStaffAccess } from '@/lib/actions/user/staff-access/grantStaffAccess'
import { isValidEmail } from '@/lib/utils/regex'

type UserRow = {
  id: string
  firstName?: string | null
  lastName?: string | null
  email: string
  role: Role
}

type Props = {
  open: boolean
  onClose: () => void
  users: UserRow[]
  onGranted: () => void
}

const ROLES: { value: Role; label: string; description: string }[] = [
  { value: 'ADMIN', label: 'Admin', description: 'Full access to everything in the admin' },
  { value: 'PROGRAM', label: 'Program', description: 'Job and CIT applications only' }
]

const fieldCls =
  'w-full pl-8 pr-3 py-1.5 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded text-[13px] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all'

export function GrantStaffAccessModal({ open, onClose, users, onGranted }: Props) {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<Role>('ADMIN')
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const matches = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return []

    return users
      .filter(
        (user) =>
          user.role !== 'SUPERUSER' &&
          user.role !== role &&
          [user.firstName, user.lastName, user.email].some((value) => value?.toLowerCase().includes(q))
      )
      .slice(0, 5)
  }, [users, query, role])

  const trimmed = query.trim()
  const isValid = isValidEmail(trimmed)
  const showInviteOption = matches.length === 0 && isValid

  const reset = () => {
    setQuery('')
    setSelectedUser(null)
    setResult(null)
    setRole('ADMIN')
  }

  const close = () => {
    onClose()
    reset()
  }

  const roleLabel = ROLES.find((r) => r.value === role)?.label ?? role

  const handleGrant = async (email: string) => {
    setLoading(true)
    setResult(null)

    const res = await grantStaffAccess({ email, role })

    setLoading(false)

    if (!res.success) {
      setResult({ success: false, message: res.error ?? 'Something went wrong' })
      return
    }

    setResult({
      success: true,
      message: res.data?.isPending
        ? `${roleLabel} access applies the first time ${res.data.email} signs in.`
        : `${res.data?.email} now has ${roleLabel.toLowerCase()} access.`
    })

    onGranted()
    setTimeout(close, 1800)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-neutral-950/40">
      <div className="w-full max-w-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="h-11 flex items-center justify-between gap-4 px-5 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Grant access</h2>

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="shrink-0 p-1.5 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {!selectedUser ? (
            <>
              <fieldset className="border-0 p-0 m-0">
                <legend className="text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                  Role
                </legend>

                <div className="flex gap-2">
                  {ROLES.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRole(option.value)}
                      aria-pressed={role === option.value}
                      className={`flex-1 py-2 rounded border text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                        role === option.value
                          ? 'border-sky-600 text-neutral-900 dark:text-white'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-600">
                  {ROLES.find((r) => r.value === role)?.description}
                </p>
              </fieldset>

              <div className="relative">
                <Search
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or email"
                  aria-label="Search users by name or email"
                  autoFocus
                  className={fieldCls}
                />
              </div>

              {matches.length > 0 && (
                <ul role="list" className="list-none p-0 m-0 divide-y divide-neutral-100 dark:divide-neutral-900">
                  {matches.map((user) => (
                    <li key={user.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(user)}
                        className="w-full text-left py-2.5 px-2 rounded hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        <p className="text-[13px] text-neutral-900 dark:text-white truncate">
                          {[user.firstName, user.lastName].filter(Boolean).join(' ') || user.email}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-600 truncate">{user.email}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {showInviteOption && (
                <button
                  type="button"
                  onClick={() => handleGrant(trimmed)}
                  disabled={loading}
                  className="w-full text-left px-3 py-3 rounded border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors disabled:opacity-50"
                >
                  <p className="text-[13px] text-neutral-900 dark:text-white truncate">No account yet for {trimmed}</p>
                  <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-600">
                    Grant {roleLabel.toLowerCase()} access now and it applies the first time they sign in.
                  </p>
                </button>
              )}

              {trimmed && matches.length === 0 && !isValidEmail && (
                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                  No matching users. Enter a full email address to invite someone.
                </p>
              )}
            </>
          ) : (
            <div>
              <p className="text-sm text-neutral-900 dark:text-white">
                Give {[selectedUser.firstName, selectedUser.lastName].filter(Boolean).join(' ') || selectedUser.email}{' '}
                {roleLabel.toLowerCase()} access?
              </p>
              <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-600 break-all">{selectedUser.email}</p>

              <div className="mt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  disabled={loading}
                  className="px-3 py-2 rounded text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors disabled:opacity-50"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => handleGrant(selectedUser.email)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" aria-hidden="true" />}
                  Confirm
                </button>
              </div>
            </div>
          )}

          {result && (
            <p
              role="status"
              aria-live="polite"
              className={`flex items-start gap-1.5 text-xs ${
                result.success ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {result.success && <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />}
              {result.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
