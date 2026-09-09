import prisma from '@/prisma/client'
import type { Role } from '@prisma/client'
import { createLog } from '../../log/createLog'

export async function promoteUserToStaff(userId: string, role: Role, grantedBy: string) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, email: true, role: true }
  })

  await createLog('info', 'Staff access granted', { userId, role, grantedBy })

  return updated
}
