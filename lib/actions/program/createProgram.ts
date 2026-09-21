'use server'

import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { revalidatePath } from 'next/cache'
import { programSchema, PROGRAM_NULLABLE_FIELDS } from '@/lib/validations/program.validation'
import { emptyToNull } from '@/lib/utils/emptyToNull'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { syncProgramImages } from './syncProgramImages'

export async function createProgram(input: unknown) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, data: null, error: auth.error }

  const parsed = programSchema.safeParse(input)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]

    return {
      success: false,
      data: null,
      error: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Invalid program data'
    }
  }

  const { images, ...programData } = parsed.data

  try {
    const program = await prisma.$transaction(async (tx) => {
      const lastProgram = await tx.program.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true }
      })

      const created = await tx.program.create({
        data: {
          ...emptyToNull(programData, PROGRAM_NULLABLE_FIELDS),
          order: (lastProgram?.order ?? -1) + 1
        }
      })

      const primaryUrl = await syncProgramImages(tx, created.id, images)

      // Kept in step with the starred image so the home card and side panel
      // can read it without joining images
      return tx.program.update({
        where: { id: created.id },
        data: { image: primaryUrl }
      })
    })

    revalidatePath('/', 'layout')

    await createLog('info', 'Program created successfully', {
      programId: program.id,
      name: program.name,
      imageCount: images.length
    })

    return { success: true, data: program, error: null }
  } catch (error) {
    await createLog('error', 'Failed to create program', {
      programName: programData.name,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Failed to create program. Please try again.' }
  }
}
