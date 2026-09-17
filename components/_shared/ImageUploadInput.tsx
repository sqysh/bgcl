'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import uploadFileToFirebase from '@/lib/utils/uploadFileToFirebase'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
  disabled?: boolean
  /** Only used to keep ids unique when several sit on one page */
  id?: string
}

/**
 * The upload itself, with no opinion about where the value lives. ImageUpload
 * wraps this for react-hook-form; the page editor uses it directly.
 */
export function ImageUploadInput({ value, onChange, label, disabled = false, id }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [localPreview, setLocalPreview] = useState('')
  const [error, setError] = useState<string | null>(null)

  const previewImage = localPreview || value || ''
  const isDisabled = disabled || isUploading

  const inputId = `image-upload-${id ?? label ?? 'field'}`

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError('Please upload a PNG, JPG, WEBP, GIF, or SVG')
      return
    }

    if (file.size > MAX_SIZE) {
      setError('Image must be less than 10MB')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const reader = new FileReader()
      reader.onload = (fileEvent) => setLocalPreview(fileEvent.target?.result as string)
      reader.readAsDataURL(file)

      const downloadURL = await uploadFileToFirebase(file, (progress) => setUploadProgress(progress), 'image')

      onChange(downloadURL as string)
      setLocalPreview('')
    } catch {
      setLocalPreview('')
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = () => {
    onChange('')
    setLocalPreview('')
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => !isDisabled && fileInputRef.current?.click()}
          disabled={isDisabled}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`relative w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
            isDisabled
              ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-800/50 cursor-not-allowed'
              : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-sky-500 hover:bg-sky-50 dark:hover:border-sky-500 dark:hover:bg-sky-950/20 cursor-pointer'
          } ${error ? 'border-red-500' : ''}`}
        >
          {isUploading ? (
            <div className="text-center space-y-2 w-full" aria-live="polite">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-sky-500/20">
                <div className="h-6 w-6 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
              </div>
              <p className="text-sm text-sky-600 dark:text-sky-400 font-medium">Uploading…</p>
              <div
                role="progressbar"
                aria-valuenow={Math.round(uploadProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden"
              >
                <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">{Math.round(uploadProgress)}%</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="h-8 w-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm text-neutral-700 dark:text-neutral-300">Click to upload image</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </button>

        <input
          id={inputId}
          ref={fileInputRef}
          type="file"
          accept="image/*,.gif"
          onChange={handleImageChange}
          disabled={isDisabled}
          className="sr-only"
        />

        {previewImage && (
          <div className="relative inline-block">
            <img
              src={previewImage}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-lg border border-neutral-200 dark:border-neutral-700"
            />
            {!isUploading && (
              <button
                type="button"
                onClick={handleRemoveImage}
                aria-label="Remove image"
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
