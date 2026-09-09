'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { requireAdmin } from '@/lib/utils/requireAdmin'

const ROW_ID = 'capital'

export async function updateCapitalCampaign({ goalAmount, raisedAmount }: { goalAmount: number; raisedAmount: number }) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, data: null, error: auth.error }

  if (!Number.isFinite(goalAmount) || goalAmount < 0 || !Number.isFinite(raisedAmount) || raisedAmount < 0) {
    return { success: false, data: null, error: 'Amounts must be zero or more.' }
  }

  try {
    const row = await prisma.capitalCampaign.upsert({
      where: { id: ROW_ID },
      create: { id: ROW_ID, goalAmount, raisedAmount },
      update: { goalAmount, raisedAmount }
    })

    await createLog('info', 'Capital campaign figures updated', {
      userId: auth.user!.id,
      goalAmount,
      raisedAmount
    })

    // The thermometer on the homepage reads these
    revalidatePath('/')

    return {
      success: true,
      data: { goalAmount: Number(row.goalAmount), raisedAmount: Number(row.raisedAmount) },
      error: null
    }
  } catch (error) {
    await createLog('error', 'Failed to update capital campaign', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Could not save those amounts' }
  }
}
