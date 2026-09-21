import { getPrograms } from '@/lib/actions/program/getPrograms'
import { PublicProgramsClient } from '@/app/(public)/programs/PublicProgramsClient'
import { getPageBySlugClient } from '@/lib/actions/page/getPageBySlugClient'
import { getResources } from '@/lib/actions/resource/getResources'

export default async function PublicProgramsPage() {
  const [programs, resources, pageData] = await Promise.all([getPrograms(true), getResources(), getPageBySlugClient('program')])

  return <PublicProgramsClient programs={programs.data} resources={resources.data} pageData={pageData} />
}
