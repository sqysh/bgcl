'use server'

import prisma from '@/prisma/client'
import type { Role } from '@prisma/client'
import { createLog } from '../../log/createLog'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { promoteUserToStaff } from './promoteUserToStaff'
import { preProvisionStaffUser } from './preProvisionStaffUser'
import { isValidEmail } from '@/lib/utils/regex'

const GRANTABLE_ROLES: Role[] = ['ADMIN', 'PROGRAM']

const ROLE_LABEL: Record<string, string> = {
  ADMIN: 'an admin',
  PROGRAM: 'a program user'
}

export async function grantStaffAccess({ email, role }: { email: string; role: Role }) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, data: null, error: auth.error }

  const grantedBy = auth.user!.id

  if (!GRANTABLE_ROLES.includes(role)) {
    return { success: false, data: null, error: 'That role cannot be granted here.' }
  }

  const normalizedEmail = email.toLowerCase().trim()

  if (!isValidEmail(normalizedEmail)) {
    return { success: false, data: null, error: 'Please enter a valid email address' }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, role: true }
    })

    if (existingUser) {
      // Superusers outrank both grantable roles, so this would be a demotion
      if (existingUser.role === 'SUPERUSER') {
        return { success: false, data: null, error: 'That user is a superuser already.' }
      }

      if (existingUser.role === role) {
        return { success: false, data: null, error: `That user is already ${ROLE_LABEL[role]}.` }
      }

      const updated = await promoteUserToStaff(existingUser.id, role, grantedBy)

      return { success: true, data: { ...updated, isPending: false }, error: null }
    }

    const invite = await preProvisionStaffUser(normalizedEmail, role, grantedBy)

    return {
      success: true,
      data: { id: invite.id, email: invite.email, role: invite.role, isPending: true },
      error: null
    }
  } catch (error) {
    await createLog('error', 'Failed to grant staff access', {
      email: normalizedEmail,
      role,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Could not set up access. Please try again.' }
  }
}
