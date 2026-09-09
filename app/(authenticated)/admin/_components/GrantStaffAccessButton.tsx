'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'
import type { Role } from '@prisma/client'
import { GrantStaffAccessModal } from './GrantStaffAccessModal'

type UserRow = {
  id: string
  firstName?: string | null
  lastName?: string | null
  email: string
  role: Role
}

export function GrantStaffAccessButton({ users }: { users: UserRow[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded text-[13px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        <UserPlus className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="truncate">Grant access</span>
      </button>

      <GrantStaffAccessModal open={open} users={users} onClose={() => setOpen(false)} onGranted={() => router.refresh()} />
    </>
  )
}
