// app/(authenticated)/admin/page-editor/_components/PageEditorClient.tsx
'use client'

import { useState } from 'react'
import { PageContentEditor } from './PageContentEditor'
import { createPage } from '@/lib/actions/page/createPage'
import { updatePageBySlug } from '@/lib/actions/page/updatePageBySlug'
import { InlineMessageState } from '@/components/_shared/InlineMessage'
import extractErrorMessage from '@/lib/utils/extractErrorMessage'

type Props = {
  /** The page's slug, e.g. "home" or "holiday-giving" */
  slug: string
  data: { id?: string; content?: unknown } | null
  /** Used when the page has never been created, so there is nothing to load */
  fallbackContent?: unknown
}

export function PageEditorClient({ slug, data, fallbackContent }: Props) {
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<InlineMessageState | null>(null)

  const handleSave = async (content: any): Promise<void> => {
    setIsSaving(true)
    setMessage(null)

    const isUpdate = Boolean(data?.id)

    try {
      const res = isUpdate ? await updatePageBySlug(slug, content) : await createPage(slug, content)

      if (res && res.success === false) {
        setMessage({
          type: 'error',
          message: isUpdate ? 'Could not save changes' : 'Could not create page',
          description: extractErrorMessage(res)
        })
        return
      }

      setMessage({
        type: 'success',
        message: isUpdate ? 'Changes saved successfully' : 'Page created successfully',
        description: isUpdate
          ? 'Visitors will see the updated content immediately'
          : `Your page is now accessible to all visitors`
      })
    } catch (error: unknown) {
      setMessage({
        type: 'error',
        message: isUpdate ? 'Could not save changes' : 'Could not create page',
        description: extractErrorMessage(error)
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageContentEditor
      fields={(data?.content ?? fallbackContent) as never}
      onSave={handleSave}
      isLoading={isSaving}
      message={message}
      onDismissMessage={() => setMessage(null)}
    />
  )
}
