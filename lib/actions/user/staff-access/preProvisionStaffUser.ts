import prisma from '@/prisma/client'
import type { Role } from '@prisma/client'
import { createLog } from '../../log/createLog'

/**
 * The person has never signed in, so there is no user row to promote. The
 * invite waits until they do, and the sign-in event applies the role.
 */
export async function preProvisionStaffUser(email: string, role: Role, invitedBy: string) {
  const invite = await prisma.pendingStaffInvite.upsert({
    where: { email },
    create: { email, role, invitedBy },
    update: { role, invitedBy }
  })

  await createLog('info', 'Staff invite created', { email, role, invitedBy })

  return invite
}
