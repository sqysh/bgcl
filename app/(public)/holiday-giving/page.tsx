import { getPageBySlug } from '@/lib/actions/page/getPageBySlug'
import PublicHolidayGivingClient from './HolidayGivingClient'
import { getPrograms } from '@/lib/actions/program/getPrograms'

export default async function HolidayGivingPage() {
  const [pageData, programsResult] = await Promise.all([getPageBySlug('holiday-giving'), getPrograms()])

  return <PublicHolidayGivingClient pageData={pageData} programs={programsResult.data ?? null} />
}
