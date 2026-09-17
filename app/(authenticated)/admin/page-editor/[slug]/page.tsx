import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/actions/page/getPageBySlug'
import { PageEditorClient } from '../_components/PageEditorClient'
import { PAGE_SEEDS } from '../_constants/page-seeds'

export default async function PageEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (!(slug in PAGE_SEEDS)) notFound()

  const data = await getPageBySlug(slug)

  return <PageEditorClient slug={slug} data={data} fallbackContent={PAGE_SEEDS[slug]} />
}
