'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { isValidEmail } from '@/lib/utils/regex'

export async function updateUserEmail({ userId, email }: { userId: string; email: string }) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, data: null, error: auth.error }

  const normalizedEmail = email.toLowerCase().trim()

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, data: null, error: 'Please enter a valid email address' }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true }
    })

    if (!user) return { success: false, data: null, error: 'Could not find that user' }

    if (user.email?.toLowerCase() === normalizedEmail) {
      return { success: false, data: null, error: 'That is already their email address' }
    }

    // Only a superuser can change another superuser's sign-in address
    if (user.role === 'SUPERUSER' && auth.user!.role !== 'SUPERUSER') {
      return { success: false, data: null, error: 'You cannot change a superuser email' }
    }

    const taken = await prisma.user.findUnique({ where: { email: normalizedEmail }, select: { id: true } })

    if (taken) return { success: false, data: null, error: 'Another account already uses that email' }

    // The new address has not been verified by anyone yet, and it is now the
    // address magic links are sent to
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { email: normalizedEmail, emailVerified: null },
      select: { id: true, email: true }
    })

    await createLog('warn', 'User email changed', {
      userId,
      previousEmail: user.email,
      newEmail: normalizedEmail,
      changedBy: auth.user!.id
    })

    revalidatePath(`/admin/users/${userId}`)

    return { success: true, data: updated, error: null }
  } catch (error) {
    await createLog('error', 'Failed to change user email', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Could not change that email' }
  }
}
