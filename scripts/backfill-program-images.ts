import 'dotenv/config'
import prisma from '@/prisma/client'

/**
 * Copies each program's legacy `image` and `imageTwo` into ProgramImage rows.
 * `image` becomes the primary; if only `imageTwo` exists, it becomes the
 * primary and is written back to `image` so the home card still shows it.
 *
 * Safe to run more than once: programs that already have any ProgramImage
 * rows are skipped, so nothing added in the new editor gets duplicated.
 *
 *   npx tsx scripts/backfill-program-images.ts --dry-run
 *   npx tsx scripts/backfill-program-images.ts
 */

const dryRun = process.argv.includes('--dry-run')

async function main() {
  const programs = await prisma.program.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      imageTwo: true,
      _count: { select: { images: true } }
    },
    orderBy: { order: 'asc' }
  })

  let programsUpdated = 0
  let imagesCreated = 0

  for (const program of programs) {
    if (program._count.images > 0) {
      console.log(`skip   ${program.name} (already has ${program._count.images} images)`)
      continue
    }

    const urls = [program.image, program.imageTwo].map((url) => url?.trim()).filter((url): url is string => Boolean(url))
    const unique = [...new Set(urls)]

    if (unique.length === 0) {
      console.log(`skip   ${program.name} (no images)`)
      continue
    }

    const rows = unique.map((url, order) => ({
      url,
      order,
      isPrimary: order === 0,
      programId: program.id
    }))

    const primaryChanged = program.image?.trim() !== unique[0]

    console.log(
      `${dryRun ? 'would' : 'add   '} ${program.name}: ${rows.length} image${rows.length === 1 ? '' : 's'}${
        primaryChanged ? ' (imageTwo becomes primary)' : ''
      }`
    )

    if (!dryRun) {
      await prisma.$transaction([
        prisma.programImage.createMany({ data: rows }),
        ...(primaryChanged ? [prisma.program.update({ where: { id: program.id }, data: { image: unique[0] } })] : [])
      ])
    }

    programsUpdated++
    imagesCreated += rows.length
  }

  console.log(
    `\n${dryRun ? 'dry run: would add' : 'added'} ${imagesCreated} images across ${programsUpdated} of ${programs.length} programs`
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
