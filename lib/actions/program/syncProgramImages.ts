import type { Prisma } from '@prisma/client'
import type { ProgramImage as ProgramImageInput } from '@/lib/validations/program.validation'

/**
 * Brings a program's images in line with what the form submitted. Runs inside
 * the caller's transaction so the program and its images save together.
 *
 * Returns the primary url, which the caller writes to Program.image so the
 * home card and the side panel keep working without joining images.
 */
export async function syncProgramImages(
  tx: Prisma.TransactionClient,
  programId: string,
  images: ProgramImageInput[]
): Promise<string | null> {
  const keptIds = images.map((image) => image.id).filter((id): id is string => Boolean(id))

  // Rows the admin removed
  await tx.programImage.deleteMany({
    where: { programId, id: { notIn: keptIds } }
  })

  // Exactly one primary: trust the first flagged, fall back to the first image
  const primaryIndex = Math.max(
    images.findIndex((image) => image.isPrimary),
    0
  )

  for (const [index, image] of images.entries()) {
    const data = {
      url: image.url,
      order: index,
      isPrimary: index === primaryIndex,
      alt: image.alt ?? null
    }

    if (image.id) {
      await tx.programImage.update({ where: { id: image.id }, data })
    } else {
      await tx.programImage.create({ data: { ...data, programId } })
    }
  }

  return images[primaryIndex]?.url ?? null
}
