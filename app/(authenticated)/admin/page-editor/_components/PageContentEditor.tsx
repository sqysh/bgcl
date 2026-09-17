import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { PageField } from '@/types/common.types'
import { RightPanel } from '@/app/(authenticated)/admin/_components/RightPanel'
import { Section } from './Section'
import { Field } from './Field'
import { InlineMessage, InlineMessageState } from '@/components/_shared/InlineMessage'

type Props = {
  fields: PageField[]
  onSave: (content: PageField[]) => Promise<void> | void
  isLoading: boolean
  message?: InlineMessageState | null
  onDismissMessage?: () => void
}

export function PageContentEditor({ fields, onSave, isLoading, message, onDismissMessage }: Props) {
  const [content, setContent] = useState(fields)
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)

  if (!fields || !Array.isArray(fields)) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center">
          <p className="text-neutral-500 dark:text-neutral-400 mb-2">Invalid page content format</p>
          <pre className="text-xs text-neutral-400 dark:text-neutral-600">{JSON.stringify(fields, null, 2)}</pre>
        </div>
      </div>
    )
  }

  const sections = Array.from(new Set(content.map((f) => f.section)))

  const updateField = (id: string, newValue: string | string[]) => {
    setContent((prev) => prev.map((f) => (f.id === id ? { ...f, value: newValue } : f)))
  }

  return (
    // A fixed height rather than a minimum, so the editor column is exactly the
    // space available and its footer has something to sit against. On mobile
    // the two panels stack and the page scrolls normally.
    <div className="md:h-dvh md:overflow-hidden flex flex-col md:flex-row bg-white dark:bg-neutral-950">
      {/* Editor */}
      <div
        className={`${isPreviewVisible ? 'md:w-1/2' : 'w-full'} flex flex-col md:min-h-0 border-r dark:border-neutral-800 border-neutral-200`}
      >
        {/* Scrollable content */}
        <div className="flex-1 md:overflow-y-auto md:min-h-0 p-6">
          {sections.map((section) => (
            <Section key={section} title={section}>
              {content
                ?.filter((f) => f.section === section)
                ?.map((field) => (
                  <Field key={field.id} field={field} onChange={(v) => updateField(field.id, v)} />
                ))}
            </Section>
          ))}
        </div>

        {/* Footer, pinned to the bottom of the column */}
        <div className="shrink-0 bg-neutral-100 dark:bg-neutral-900 border-t dark:border-neutral-800 border-neutral-200 px-6 py-4">
          <InlineMessage state={message ?? null} onDismiss={onDismissMessage} className="mb-3" />

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-end">
            <button
              type="button"
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors w-full md:w-fit"
            >
              {isPreviewVisible ? <EyeOff size={16} /> : <Eye size={16} />}
              {isPreviewVisible ? 'Hide' : 'Show'} preview
            </button>

            <button
              type="button"
              onClick={() => onSave(content)}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-700 disabled:bg-sky-600/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors w-full md:w-fit"
            >
              {isLoading ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      {isPreviewVisible && <RightPanel fields={content} />}
    </div>
  )
}
