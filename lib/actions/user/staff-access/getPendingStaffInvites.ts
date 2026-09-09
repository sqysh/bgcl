import prisma from '@/prisma/client'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { serialize } from '@/lib/utils/serializers.utils'

export async function getPendingStaffInvites() {
  const auth = await requireAdmin()
  if (!auth.ok) return []

  const invites = await prisma.pendingStaffInvite.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, role: true, createdAt: true }
  })

  return serialize(invites)
}
