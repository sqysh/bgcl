'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { Loader2, Star, Upload, X } from 'lucide-react'
import uploadFileToFirebase from '@/lib/utils/uploadFileToFirebase'
import type { ProgramImage as ProgramImageInput } from '@/lib/validations/program.validation'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

type Props = {
  images: ProgramImageInput[]
  onChange: (images: ProgramImageInput[]) => void
  label?: string
}

// Keeps order contiguous and guarantees exactly one primary whenever any exist
const normalise = (images: ProgramImageInput[]): ProgramImageInput[] => {
  const hasPrimary = images.some((image) => image.isPrimary)

  return images.map((image, index) => ({
    ...image,
    order: index,
    isPrimary: hasPrimary ? image.isPrimary : index === 0
  }))
}

export function MultiImageUpload({ images, onChange, label = 'Images' }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingCount, setUploadingCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const isUploading = uploadingCount > 0

  const handleFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length === 0) return

    const rejected = files.filter((file) => !ALLOWED_IMAGE_TYPES.includes(file.type) || file.size > MAX_SIZE)
    const accepted = files.filter((file) => !rejected.includes(file))

    setError(rejected.length > 0 ? `${rejected.length} skipped: images must be PNG, JPG, WEBP, GIF or SVG under 10MB` : null)

    if (accepted.length === 0) return

    setUploadingCount(accepted.length)

    const results = await Promise.allSettled(accepted.map((file) => uploadFileToFirebase(file, () => {}, 'image')))

    const uploaded: ProgramImageInput[] = results
      .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
      .map((result) => ({ url: result.value, isPrimary: false, order: 0, alt: null }))

    if (uploaded.length < accepted.length) {
      setError('Some images failed to upload. Please try those again.')
    }

    onChange(normalise([...images, ...uploaded]))

    setUploadingCount(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const remove = (url: string) => onChange(normalise(images.filter((image) => image.url !== url)))

  const makePrimary = (url: string) => onChange(images.map((image) => ({ ...image, isPrimary: image.url === url })))

  return (
    <div>
      <p className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">{label}</p>

      {images.length > 0 && (
        <ul role="list" className="list-none p-0 m-0 mb-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((image) => (
            <li key={image.url} className="relative">
              <img
                src={image.url}
                alt=""
                className={`aspect-square w-full object-cover rounded-lg border ${
                  image.isPrimary ? 'border-sky-500 ring-2 ring-sky-500' : 'border-neutral-200 dark:border-neutral-700'
                }`}
              />

              <button
                type="button"
                onClick={() => makePrimary(image.url)}
                aria-label={image.isPrimary ? 'Primary image' : 'Set as primary image'}
                aria-pressed={image.isPrimary}
                className={`absolute top-1.5 left-1.5 p-1 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  image.isPrimary ? 'bg-sky-600 text-white' : 'bg-black/50 text-white/80 hover:bg-black/70'
                }`}
              >
                <Star className="w-3.5 h-3.5" fill={image.isPrimary ? 'currentColor' : 'none'} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => remove(image.url)}
                aria-label="Remove image"
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white/80 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              {image.isPrimary && (
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-sky-600 text-white">
                  Primary
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => !isUploading && fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full flex items-center justify-center gap-2 px-6 py-6 border-2 border-dashed rounded-lg border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/30 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/20 transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-sky-500" aria-hidden="true" />
            <span className="text-sm text-sky-600 dark:text-sky-400">
              Uploading {uploadingCount} {uploadingCount === 1 ? 'image' : 'images'}
            </span>
          </>
        ) : (
          <>
            <Upload className="w-5 h-5 text-neutral-400" aria-hidden="true" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {images.length > 0 ? 'Add more images' : 'Upload images'}
            </span>
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="sr-only"
        aria-label="Choose images to upload"
      />

      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        Star the image to use on the program card. The rest appear on the program page.
      </p>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
