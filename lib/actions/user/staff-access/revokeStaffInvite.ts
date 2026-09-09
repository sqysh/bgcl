'use server'

import prisma from '@/prisma/client'
import { createLog } from '../../log/createLog'
import { requireAdmin } from '@/lib/utils/requireAdmin'

export async function revokeStaffInvite({ email }: { email: string }) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, error: auth.error }

  const normalizedEmail = email.toLowerCase().trim()

  try {
    // deleteMany rather than delete, so revoking an invite that has already
    // been used is not an error
    const { count } = await prisma.pendingStaffInvite.deleteMany({ where: { email: normalizedEmail } })

    await createLog('info', 'Staff invite revoked', {
      email: normalizedEmail,
      revokedBy: auth.user!.id,
      count
    })

    return { success: true, error: null }
  } catch (error) {
    await createLog('error', 'Failed to revoke staff invite', {
      email: normalizedEmail,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, error: 'Could not revoke that invite' }
  }
}
