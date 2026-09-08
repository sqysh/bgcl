import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { serialize } from '@/lib/utils/serializers.utils'

/**
 * The table deposit. One reservation ticket exists at a time, so this finds it
 * by type rather than by id. The sales window lives on its event.
 */
export async function getReservationTicket() {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: { ticketType: 'DEPOSIT' },
      include: {
        event: {
          select: {
            id: true,
            isListed: true,
            title: true,
            ticketSalesStartDate: true,
            ticketSalesEndDate: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (!ticket) return { success: false, data: null, error: 'No reservation is open right now' }

    return { success: true, data: serialize(ticket), error: null }
  } catch (error) {
    await createLog('error', 'Failed to fetch reservation ticket', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Could not load the reservation' }
  }
}
