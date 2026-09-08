import { getReservationTicket } from '@/lib/actions/ticket/getReservationTicket'
import { ReserveClient } from './ReserveClient'

export default async function ReservePage() {
  const result = await getReservationTicket()
  const ticket = result.data
  const event = ticket?.event

  const now = Date.now()

  const opensAt = event?.ticketSalesStartDate ? new Date(event.ticketSalesStartDate) : null
  const closesAt = event?.ticketSalesEndDate ? new Date(event.ticketSalesEndDate) : null

  const withinWindow = (!opensAt || opensAt.getTime() <= now) && (!closesAt || closesAt.getTime() > now)

  // isListed is the manual switch, the sales window is the schedule. Both have
  // to agree before anyone can put a deposit down.
  const isOpen = Boolean(ticket) && Boolean(event?.isListed) && withinWindow

  const remaining = ticket ? Math.max(0, ticket.totalQuantity - ticket.quantitySold) : 0

  return <ReserveClient ticket={ticket} isOpen={isOpen} remaining={remaining} opensAt={opensAt} />
}
