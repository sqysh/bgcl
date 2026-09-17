'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, FileText, Gift, HandHeart, Heart, HelpingHand, PartyPopper, ShoppingBasket, Sparkles } from 'lucide-react'
import Picture from '@/components/_shared/Picture'
import type { PageField } from '@/types/common.types'
import { CopyEmailButton } from '@/components/_shared/CopyEmailButton'
import { useVolunteerDrawer } from '@/stores/drawers'
import VolunteerDrawer from '@/components/drawers/VolunteerDrawer'
import { ProgramRecord } from '@/types/program.types'

export default function PublicHolidayGivingClient({
  pageData,
  programs
}: {
  pageData: { content?: PageField[] } | null
  programs: ProgramRecord[]
}) {
  const t = Object.fromEntries((pageData?.content ?? []).map((field) => [field.id, field.value])) as Record<string, string>
  const email = t.closing_cta_email || 'info@bgcl.org'
  const open = useVolunteerDrawer((s) => s.open)

  const waysToGive = [
    { icon: ShoppingBasket, title: t.way_1_title, description: t.way_1_description },
    { icon: Gift, title: t.way_2_title, description: t.way_2_description },
    { icon: PartyPopper, title: t.way_3_title, description: t.way_3_description },
    { icon: Heart, title: t.way_4_title, description: t.way_4_description },
    { icon: HandHeart, title: t.way_5_title, description: t.way_5_description },
    { icon: Sparkles, title: t.way_6_title, description: t.way_6_description }
  ].filter((way) => way.title)

  // Uploaded through the page editor, so any slot can be empty
  const gallery = [
    { src: t.photo_1, caption: t.photo_1_caption },
    { src: t.photo_2, caption: t.photo_2_caption },
    { src: t.photo_3, caption: t.photo_3_caption }
  ].filter((photo) => photo.src)

  const flyers = [
    { label: t.flyer_1_label, url: t.flyer_1_url },
    { label: t.flyer_2_label, url: t.flyer_2_url },
    { label: t.flyer_3_label, url: t.flyer_3_url }
  ].filter((flyer) => flyer.url)

  return (
    <>
      <VolunteerDrawer programs={programs} />
      <div className="min-h-screen dark:bg-neutral-950 bg-white">
        {/* Hero */}
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-334 mx-auto">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <p className="text-xs font-semibold dark:text-neutral-500 text-neutral-600 uppercase tracking-widest">
                  {t.hero_eyebrow}
                </p>
                <h1 className="text-5xl md:text-6xl font-black dark:text-white text-neutral-900 leading-tight">
                  {t.hero_heading}
                </h1>
                <p className="text-lg dark:text-neutral-400 text-neutral-600 max-w-2xl">{t.hero_paragraph}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/campaigns"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-colors"
                >
                  See our campaigns
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>

                <CopyEmailButton
                  email={email}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:text-white text-neutral-900 font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ways to give */}
        {waysToGive.length > 0 && (
          <section className="py-24 px-6 dark:bg-neutral-900 bg-neutral-50">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-black dark:text-white text-neutral-900">{t.ways_heading}</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {waysToGive.map((way, index) => (
                  <motion.div
                    key={way.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 rounded-2xl dark:bg-neutral-800 bg-white border dark:border-neutral-700 border-neutral-200"
                  >
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mb-4">
                      <way.icon className="w-6 h-6 text-sky-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold dark:text-white text-neutral-900 mb-2">{way.title}</h3>
                    <p className="text-sm dark:text-neutral-400 text-neutral-600 leading-relaxed">{way.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Photos */}
        {gallery.length > 0 && (
          <section className="py-24 px-6 dark:bg-neutral-950 bg-white">
            <div className="max-w-334 mx-auto">
              <div className={`grid gap-6 ${gallery.length === 1 ? '' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {gallery.map((photo, index) => (
                  <motion.figure
                    key={photo.src}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="m-0"
                  >
                    <div className="aspect-4/3 rounded-2xl overflow-hidden">
                      <Picture
                        src={photo.src}
                        alt={photo.caption || 'Holiday giving at the Boys & Girls Club of Lynn'}
                        className="w-full h-full object-cover"
                        priority={index === 0}
                      />
                    </div>
                    {photo.caption && (
                      <figcaption className="mt-3 text-sm dark:text-neutral-500 text-neutral-600">{photo.caption}</figcaption>
                    )}
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Flyers */}
        {flyers.length > 0 && (
          <section className="py-24 px-6 dark:bg-neutral-900 bg-neutral-50">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-4xl md:text-5xl font-black dark:text-white text-neutral-900 mb-12">Downloads</h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {flyers.map((flyer, index) => (
                    <a
                      key={flyer.url}
                      href={flyer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-3 px-8 py-4 font-bold rounded-xl transition-colors ${
                        index === 0
                          ? 'bg-sky-600 hover:bg-sky-700 text-white'
                          : 'dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white dark:border-neutral-700 bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-200'
                      }`}
                    >
                      <FileText className="w-5 h-5 shrink-0" aria-hidden="true" />
                      {flyer.label || 'Download'}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Closing */}
        <section className="py-24 px-6 dark:bg-neutral-950 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black dark:text-white text-neutral-900 mb-6">{t.closing_heading}</h2>

              <p className="text-lg dark:text-neutral-300 text-neutral-700 leading-relaxed max-w-3xl mx-auto mb-12">
                {t.closing_paragraph}
              </p>

              <p className="font-semibold dark:text-white text-neutral-900 mb-6">{t.closing_cta_heading}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-colors"
                >
                  <HelpingHand className="w-5 h-5" aria-hidden="true" />
                  Donate
                </Link>

                <div
                  onClick={() => open()}
                  className="inline-flex items-center gap-2 px-8 py-4 dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-100 hover:bg-neutral-200 dark:text-white text-neutral-900 font-semibold rounded-xl transition-colors"
                >
                  Volunteer
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
