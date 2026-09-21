import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'

export const getThemes = async () => {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: { order: 'desc' }
    })

    return { success: true, data: themes }
  } catch (error) {
    await createLog('error', 'Failed to fetch themes', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Could not load themes' }
  }
}
