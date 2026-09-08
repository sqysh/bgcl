import { redirect } from 'next/navigation'
import prisma from '@/prisma/client'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { AdminEventDetailsClient } from './AdminEventDetailsClient'
import { SerializedEvent } from '@/types/event.types'
import { serialize } from '@/lib/utils/serializers.utils'

interface Props {
  params: Promise<{ id: string }>
}

export default async function AdminEventsDetailsPage({ params }: Props) {
  const auth = await requireAdmin()
  if (!auth.ok) redirect('/auth/login')

  const { id } = await params
  const isNew = id === 'new'

  const event = isNew
    ? null
    : await prisma.event.findUnique({
        where: { id },
        include: { tickets: { orderBy: { sortOrder: 'asc' } } }
      })

  if (!isNew && !event) redirect('/admin/events/overview')

  const serializedEvent = event ? (serialize(event) as unknown as SerializedEvent) : null

  return <AdminEventDetailsClient event={serializedEvent} isNew={isNew} />
}
