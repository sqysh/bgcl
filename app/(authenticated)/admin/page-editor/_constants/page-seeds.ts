import type { PageField } from '@/types/common.types'
import {
  aboutContent,
  awardWinnersContent,
  campaignsContent,
  capitalContent,
  citContent,
  contactContent,
  eventsContent,
  getInvolvedContent,
  holidayGivingContent,
  homeContent,
  latestNewsContent,
  partnershipsContent,
  programsContent,
  teamContent
} from './page-content'

/**
 * Every editable page, keyed by slug. Doubles as the allowlist for the dynamic
 * route, and provides starting content for a page that has no row yet.
 */
export const PAGE_SEEDS: Record<string, PageField[]> = {
  about: aboutContent,
  'award-winners': awardWinnersContent,
  campaigns: campaignsContent,
  'capital-campaign': capitalContent,
  'cit-application': citContent,
  contact: contactContent,
  events: eventsContent,
  'get-involved': getInvolvedContent,
  'holiday-giving': holidayGivingContent,
  home: homeContent,
  'latest-news': latestNewsContent,
  partnerships: partnershipsContent,
  programs: programsContent,
  team: teamContent
}
