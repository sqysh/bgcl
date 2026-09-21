'use client'

import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'

export type LightboxImage = { url: string; alt: string }

type LightboxProps = {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
}

const SWIPE_DISTANCE = 80
const SWIPE_VELOCITY = 500

/**
 * Full-screen image viewer. Controlled: pass the open index (null when closed).
 * Arrow keys, swipe, and the side buttons move between images and wrap at the
 * ends. Escape, the X, or a click on the backdrop closes it.
 */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const [direction, setDirection] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pressedBackdrop = useRef(false)
  const reduceMotion = useReducedMotion()

  const count = images.length
  const isOpen = index !== null && count > 0
  const hasMany = count > 1
  const current = isOpen ? images[index] : null

  useEffect(() => setMounted(true), [])

  const go = useCallback(
    (step: number) => {
      if (index === null) return
      setDirection(step)
      onIndexChange((index + step + count) % count)
    },
    [index, count, onIndexChange]
  )

  // keyboard: escape, arrows, and keeping tab focus inside the dialog
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowRight' && hasMany) {
        go(1)
      } else if (event.key === 'ArrowLeft' && hasMany) {
        go(-1)
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, hasMany, go, onClose])

  // lock page scroll while open, return focus to the thumbnail on close
  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [isOpen])

  // warm the neighbours so next and previous open instantly
  useEffect(() => {
    if (index === null || !hasMany) return

    for (const step of [1, -1]) {
      const preload = new Image()
      preload.src = images[(index + step + count) % count].url
    }
  }, [index, hasMany, count, images])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
  }

  // only close when the press started and ended on the backdrop itself,
  // so releasing a swipe outside the image doesn't close the viewer
  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pressedBackdrop.current = event.target === event.currentTarget
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (pressedBackdrop.current && event.target === event.currentTarget) onClose()
    pressedBackdrop.current = false
  }

  const offset = reduceMotion ? 0 : 60
  const slide = {
    enter: (dir: number) => ({ opacity: 0, x: dir * offset }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -offset })
  }

  const navButton =
    'absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white'

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          ref={dialogRef}
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0 }}
          onPointerDown={handleBackdropPointerDown}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute top-4 right-4 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {hasMany && (
            <p aria-live="polite" className="absolute top-6 left-1/2 -translate-x-1/2 text-sm text-white/80 tabular-nums">
              {index + 1} of {count}
            </p>
          )}

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={index}
              src={current.url}
              alt={current.alt}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
              drag={hasMany ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={handleDragEnd}
              draggable={false}
              className={`max-h-[85vh] max-w-[92vw] sm:max-w-[80vw] w-auto h-auto object-contain rounded-lg select-none touch-pan-y ${
                hasMany ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            />
          </AnimatePresence>

          {hasMany && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${navButton} left-3 sm:left-6`}>
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${navButton} right-3 sm:right-6`}>
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
