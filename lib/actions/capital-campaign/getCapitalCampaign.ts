import { serialize } from '@/lib/utils/serializers.utils'
import prisma from '@/prisma/client'

const ROW_ID = 'capital'

export async function getCapitalCampaign() {
  const row = await prisma.capitalCampaign.upsert({
    where: { id: ROW_ID },
    create: { id: ROW_ID, goalAmount: 0, raisedAmount: 0 },
    update: {}
  })

  return serialize(row)
}
