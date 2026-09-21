'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Picture from '@/components/_shared/Picture'
import { Lightbox } from '@/components/_shared/LightBox'

type GalleryImage = { id?: string; url: string; isPrimary: boolean; alt?: string | null }

const GRID_LIMIT = 8

/**
 * Every image except the primary, which already shows in the side panel. A
 * grid reads well up to eight; past that the photos move into a strip you
 * scroll sideways. Clicking any photo opens it in the lightbox.
 */
export function ProgramGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const gallery = images.map((image, index) => ({ ...image, alt: image.alt || `${name} photo ${index + 1}` }))

  if (gallery.length === 0) return null

  const isGrid = gallery.length <= GRID_LIMIT

  const thumbnail = (image: (typeof gallery)[number], index: number) => (
    <button
      type="button"
      onClick={() => setOpenIndex(index)}
      aria-label={`View photo ${index + 1} of ${gallery.length} larger`}
      className="group block w-full h-full rounded-xl overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
    >
      <Picture
        src={image.url}
        alt={image.alt}
        loading={isGrid && index < 4 ? 'eager' : 'lazy'}
        sizes={isGrid ? '(max-width: 1024px) 50vw, 25vw' : '320px'}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </button>
  )

  return (
    <section aria-labelledby="photos-heading" className="mt-12 sm:mt-16">
      <h2 id="photos-heading" className="text-2xl sm:text-3xl font-black dark:text-white text-neutral-900 mb-6">
        Photos
      </h2>

      {isGrid ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gallery.map((image, index) => (
            <motion.div
              key={image.id ?? image.url}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ delay: index * 0.04 }}
              className="aspect-4/3"
            >
              {thumbnail(image, index)}
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className="-mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]"
          tabIndex={0}
          aria-label={`${gallery.length} photos, scroll sideways to see more`}
        >
          {gallery.map((image, index) => (
            <div key={image.id ?? image.url} className="shrink-0 w-72 sm:w-80 aspect-4/3 snap-start">
              {thumbnail(image, index)}
            </div>
          ))}
        </div>
      )}

      <Lightbox images={gallery} index={openIndex} onClose={() => setOpenIndex(null)} onIndexChange={setOpenIndex} />
    </section>
  )
}
