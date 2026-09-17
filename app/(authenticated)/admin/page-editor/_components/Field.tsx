import { ImageUploadInput } from '@/components/_shared/ImageUploadInput'
import { PageField } from '@/types/common.types'
import { X } from 'lucide-react'

const labelCls = 'block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2'

const inputCls =
  'w-full px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors'

export function Field({ field, onChange }: { field: PageField | any; onChange: (value: string | string[]) => void }) {
  // Hide modal_toggleModal field entirely
  if (field.id === 'modal_toggleModal') {
    return null
  }

  if (field.type === 'image') {
    return (
      <div className="mb-4">
        <ImageUploadInput
          id={field.id}
          label={field.label}
          value={typeof field.value === 'string' ? field.value : ''}
          onChange={onChange}
        />
      </div>
    )
  }

  if (field.type === 'array' && Array.isArray(field.value)) {
    return (
      <div className="mb-4">
        <label className={labelCls}>{field.label}</label>

        <div className="space-y-2">
          {field.value.map((item: string, i: number) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) => {
                  const newArray = [...field.value]
                  newArray[i] = e.target.value
                  onChange(newArray)
                }}
                className={`flex-1 ${inputCls}`}
              />
              <button
                type="button"
                onClick={() => onChange(field.value.filter((_: string, idx: number) => idx !== i))}
                aria-label={`Remove item ${i + 1}`}
                className="px-3 rounded-lg text-neutral-400 dark:text-neutral-600 hover:text-red-600 dark:hover:text-red-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onChange([...field.value, ''])}
            className="w-full px-3 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm transition-colors"
          >
            Add item
          </button>
        </div>
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="mb-4">
        <label htmlFor={field.id} className={labelCls}>
          {field.label}
        </label>
        <textarea
          id={field.id}
          rows={4}
          value={field.value as string}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} resize-none`}
        />
      </div>
    )
  }

  return (
    <div className="mb-4">
      <label htmlFor={field.id} className={labelCls}>
        {field.label}
      </label>
      <input
        id={field.id}
        type={field.type === 'url' ? 'url' : 'text'}
        value={field.value as string}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  )
}
