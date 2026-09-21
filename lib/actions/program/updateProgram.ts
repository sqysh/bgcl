'use server'

import prisma from '@/prisma/client'
import { createLog } from '../log/createLog'
import { revalidatePath } from 'next/cache'
import { PROGRAM_NULLABLE_FIELDS, programSchema } from '@/lib/validations/program.validation'
import { emptyToNull } from '@/lib/utils/emptyToNull'
import { requireAdmin } from '@/lib/utils/requireAdmin'
import { syncProgramImages } from './syncProgramImages'

export async function updateProgram(id: string, input: unknown) {
  const auth = await requireAdmin()
  if (!auth.ok) return { success: false, data: null, error: auth.error }

  if (!id) return { success: false, data: null, error: 'Program ID is required.' }

  const parsed = programSchema.safeParse(input)

  if (!parsed.success) {
    const issue = parsed.error.issues[0]

    return {
      success: false,
      data: null,
      error: issue ? `${issue.path.join('.')}: ${issue.message}` : 'Invalid program data'
    }
  }

  // Images are a relation, so they are saved separately rather than spread
  // into the program update
  const { images, ...programData } = parsed.data

  try {
    const existingProgram = await prisma.program.findUnique({
      where: { id },
      select: { id: true }
    })

    if (!existingProgram) return { success: false, data: null, error: 'Program not found', status: 404 }

    // The program and its images save together or not at all
    const program = await prisma.$transaction(async (tx) => {
      const primaryUrl = await syncProgramImages(tx, id, images)

      return tx.program.update({
        where: { id },
        data: {
          ...emptyToNull(programData, PROGRAM_NULLABLE_FIELDS),
          // Kept in step with the starred image so the home card and side
          // panel can read it without joining images
          image: primaryUrl
        }
      })
    })

    revalidatePath('/', 'layout')

    await createLog('info', 'Program updated successfully', {
      programId: program.id,
      programName: program.name,
      imageCount: images.length
    })

    return { success: true, data: program, error: null }
  } catch (error) {
    await createLog('error', 'Failed to update program', {
      programId: id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return { success: false, data: null, error: 'Failed to update program. Please try again.' }
  }
}
