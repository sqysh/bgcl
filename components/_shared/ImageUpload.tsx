'use client'

import { useFormContext, type FieldValues, type Path } from 'react-hook-form'
import { ImageUploadInput } from './ImageUploadInput'

interface ImageUploadProps<T extends FieldValues> {
  /** Form field this upload writes to, e.g. "image" */
  fieldName: Path<T>
  label?: string
  disabled?: boolean
}

/** Binds ImageUploadInput to a react-hook-form field. */
export default function ImageUpload<T extends FieldValues = FieldValues>({
  fieldName,
  label,
  disabled = false
}: ImageUploadProps<T>) {
  const {
    watch,
    setValue,
    formState: { isSubmitting }
  } = useFormContext<T>()

  return (
    <div className="mb-8">
      <ImageUploadInput
        id={String(fieldName)}
        label={label ?? String(fieldName)}
        value={(watch(fieldName) as string) ?? ''}
        disabled={disabled || isSubmitting}
        onChange={(url) => setValue(fieldName, url as never, { shouldValidate: true, shouldDirty: true })}
      />
    </div>
  )
}
