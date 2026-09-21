import { PublicProgramDetailsClient } from '@/app/(public)/programs/[id]/PublicProgramDetailsClient'
import { getClosings } from '@/lib/actions/closing/getClosings'
import { getProgramById } from '@/lib/actions/program/getProgramById'
import { ProgramFormValues } from '@/lib/validations/program.validation'
import prisma from '@/prisma/client'
import { permanentRedirect } from 'next/navigation'

const GRADIENTS = [
  'from-sky-500 to-cyan-600',
  'from-purple-500 to-indigo-600',
  'from-green-500 to-emerald-600',
  'from-orange-500 to-orange-600'
]

export default async function PublicProgramDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [programResult, closingsResult] = await Promise.all([getProgramById(id), getClosings()])

  // old slug URLs, e.g. /programs/camp-creighton
  if (!programResult.data) {
    const programBySlug = await prisma.program.findFirst({
      where: { name: { contains: id.replace(/-/g, ' '), mode: 'insensitive' } },
      select: { id: true }
    })

    if (programBySlug) permanentRedirect(`/programs/${programBySlug.id}`)
  }
  const normalizedProgram: ProgramFormValues = {
    ...programResult.data,
    ...(programResult.data?.descriptions && {
      descriptions: Array.isArray(programResult.data?.descriptions) ? (programResult.data?.descriptions as string[]) : []
    })
  }

  const gradient = GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]

  return <PublicProgramDetailsClient program={normalizedProgram} closings={closingsResult.data} gradient={gradient} />
}
