import { getHero } from '../hero/getHero'
import { getPageBySlugClient } from '../page/getPageBySlugClient'
import { getDonationNotificationOrders } from '../order/getDonationNotificationOrders'
import { getCapitalCampaign } from '../capital-campaign/getCapitalCampaign'

export async function getPublicLayoutData() {
  const [donationOrders, capitalPage, hero, capitalCampaign] = await Promise.all([
    getDonationNotificationOrders().catch(() => null),
    getPageBySlugClient('capital').catch(() => null),
    getHero().catch(() => null),
    getCapitalCampaign()
  ])

  return { donationOrders, capitalPage, hero, capitalCampaign }
}
