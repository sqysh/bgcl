import PublicCapitalCampaignClient from '@/app/(public)/capital-campaign/PublicCapitalCampaignClient'
import { getCapitalCampaign } from '@/lib/actions/capital-campaign/getCapitalCampaign'
import { getPageBySlugClient } from '@/lib/actions/page/getPageBySlugClient'

export const dynamic = 'force-dynamic'

export default async function PublicCapitalCampaignPage() {
  const [pageData, capitalCampaign] = await Promise.all([getPageBySlugClient('capital'), getCapitalCampaign()])
  return <PublicCapitalCampaignClient pageData={pageData} capitalCampaign={capitalCampaign} />
}
