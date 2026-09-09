import AdminLayoutClient from '@/app/(authenticated)/admin/AdminLayoutClient'
import { getCapitalCampaign } from '@/lib/actions/capital-campaign/getCapitalCampaign'
import { getModalToggleState } from '@/lib/actions/page/getModalToggleState'
import { getUsers } from '@/lib/actions/user/getUsers'
import { auth } from '@/lib/auth/auth'

export default async function AdminLayoutPage({ children }: { children: React.ReactNode }) {
  const [session, modalToggleResult, capitalCampaignResult, usersResult] = await Promise.all([
    auth(),
    getModalToggleState(),
    getCapitalCampaign(),
    getUsers()
  ])
  return (
    <AdminLayoutClient
      user={session.user}
      isModalEnabled={modalToggleResult.data}
      campaign={capitalCampaignResult}
      users={usersResult.data}
    >
      {children}
    </AdminLayoutClient>
  )
}
