'use client'

import { useState, useTransition } from 'react'
import { Archive, ArchiveRestore, Edit2, ExternalLink, GripVertical, Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { deleteCampaign } from '@/lib/actions/campaign/deleteCampaign'
import { deleteClosing } from '@/lib/actions/closing/deleteClosing'
import { deleteNewsletter } from '@/lib/actions/newsletter/deleteNewsletter'
import { deleteResource } from '@/lib/actions/resource/deleteResource'
import { deleteProgram } from '@/lib/actions/program/deleteProgram'
import { deleteNews } from '@/lib/actions/news/deleteNews'
import { deletePartner } from '@/lib/actions/partner/deletePartner'
import { archiveEvent } from '@/lib/actions/event/archiveEvent'
import { unarchiveEvent } from '@/lib/actions/event/unarchiveEvent'

import {
  useCampaignDrawer,
  useClosingDrawer,
  useNewsDrawer,
  useNewsletterDrawer,
  useResourceDrawer,
  useProgramDrawer,
  usePartnerDrawer,
  useEventDrawer
} from '@/stores/drawers'

type ItemType = 'program' | 'news' | 'newsletter' | 'resource' | 'campaign' | 'closing' | 'event' | 'partner'

const dateTime = (value: Date) =>
  value.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/New_York'
  })

/** Spelled out, because getting a sales window wrong is expensive */
function getSaleNote(item: any): { label: string; tone: string } {
  const opens = item.ticketSalesStartDate ? new Date(item.ticketSalesStartDate) : null
  const closes = item.ticketSalesEndDate ? new Date(item.ticketSalesEndDate) : null
  const now = Date.now()

  if (!opens && !closes) return { label: 'No sales window set', tone: 'text-amber-600 dark:text-amber-500' }

  if (opens && now < opens.getTime()) {
    return { label: `Sales open ${dateTime(opens)}`, tone: 'text-neutral-400 dark:text-neutral-600' }
  }

  if (closes && now > closes.getTime()) {
    return { label: `Sales closed ${dateTime(closes)}`, tone: 'text-neutral-400 dark:text-neutral-600' }
  }

  return {
    label: closes ? `On sale until ${dateTime(closes)}` : 'On sale, no close date',
    tone: 'text-emerald-600 dark:text-emerald-500'
  }
}

/**
 * One entry per entity: how to delete it, how to open its edit drawer, and
 * (optionally) where its public page lives. Adding an entity means adding a
 * row here rather than editing three switch statements.
 */
const ITEM_CONFIG: Record<
  ItemType,
  {
    delete: (id: string) => Promise<unknown>
    openDrawer: (item: any) => void
    publicPath?: (id: string, isListed?: boolean) => string
  }
> = {
  program: {
    delete: deleteProgram,
    openDrawer: (item) => useProgramDrawer.getState().open(item),
    publicPath: (id) => `/programs/${id}`
  },
  news: {
    delete: deleteNews,
    openDrawer: (item) => useNewsDrawer.getState().open(item)
  },
  newsletter: {
    delete: deleteNewsletter,
    openDrawer: (item) => useNewsletterDrawer.getState().open(item)
  },
  resource: {
    delete: deleteResource,
    openDrawer: (item) => useResourceDrawer.getState().open(item)
  },
  campaign: {
    delete: deleteCampaign,
    openDrawer: (item) => useCampaignDrawer.getState().open(item)
  },
  closing: {
    delete: deleteClosing,
    openDrawer: (item) => useClosingDrawer.getState().open(item)
  },
  partner: {
    delete: deletePartner,
    openDrawer: (item) => usePartnerDrawer.getState().open(item)
  },
  event: {
    delete: async () => {}, // events archive rather than delete
    openDrawer: (item) => useEventDrawer.getState().open(item),
    publicPath: (id, isListed) => (isListed ? '/reserve' : `/events/${id}`)
  }
}

const EVENT_STATUS_DOT: Record<string, string> = {
  UPCOMING: 'bg-sky-500',
  ONGOING: 'bg-emerald-500',
  COMPLETED: 'bg-neutral-300 dark:bg-neutral-700',
  CANCELLED: 'bg-red-500',
  POSTPONED: 'bg-amber-500',
  ARCHIVED: 'bg-neutral-300 dark:bg-neutral-700'
}

const actionCls =
  'p-1.5 rounded text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'

/** First non-empty descriptive field, whatever the entity happens to call it. */
function getSubtitle(item: any): string {
  return (
    item?.descriptions?.[0] ||
    item.paragraph1 ||
    item.year ||
    item.url ||
    (item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null) ||
    item.description ||
    item.tier ||
    'No description'
  )
}

interface AdminListItemProps {
  item: any
  index: number
  itemType: ItemType
  draggedOver: string | null
  dragPosition: 'top' | 'bottom' | null
  handleDragStart: (e: React.DragEvent, id: string) => void
  handleDragOver: (e: React.DragEvent, id: string) => void
  handleDragLeave: () => void
  handleDropWithFeedback: (e: React.DragEvent, id: string) => void
  handleDragEnd: () => void
  onError?: (message: string) => void
}

export default function AdminListItem({
  item,
  index,
  itemType,
  draggedOver,
  dragPosition,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDropWithFeedback,
  handleDragEnd,
  onError
}: AdminListItemProps) {
  const router = useRouter()
  const [pending, setPending] = useState<'delete' | 'archive' | null>(null)
  const [isNavigating, startTransition] = useTransition()

  // Any running action disables the others, but only the one that is running
  // shows a spinner
  const isBusy = pending !== null || isNavigating

  const config = ITEM_CONFIG[itemType]
  const isEvent = itemType === 'event'
  const isArchived = item.status === 'ARCHIVED'

  const handleDelete = async () => {
    setPending('delete')

    try {
      await config.delete(item.id)
      router.refresh()
    } catch {
      onError?.(`Failed to delete ${itemType}`)
    } finally {
      setPending(null)
    }
  }

  const handleEdit = () => {
    if (isEvent) {
      startTransition(() => router.push(`/admin/events/events/${item.id}`))
      return
    }

    config.openDrawer(item)
  }

  const handleArchive = async () => {
    setPending('archive')

    try {
      await (isArchived ? unarchiveEvent(item.id) : archiveEvent(item.id))
      router.refresh()
    } catch {
      onError?.(`Failed to ${isArchived ? 'unarchive' : 'archive'} event`)
    } finally {
      setPending(null)
    }
  }

  // The drop indicator is the only place a row gets a heavy border
  const dropClasses =
    draggedOver === item.id
      ? dragPosition === 'top'
        ? 'border-t-2 border-t-sky-500'
        : 'border-b-2 border-b-sky-500'
      : 'border-b border-neutral-100 dark:border-neutral-900'

  const ticketCount = item.tickets?.length ?? 0
  const visibility = item.isPublic ? 'Public' : item.isListed ? 'Live, not on events' : 'Private'

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, item.id)}
      onDragOver={(e) => handleDragOver(e, item.id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDropWithFeedback(e, item.id)}
      onDragEnd={handleDragEnd}
      className={`group relative flex items-center gap-3 px-2 py-3 cursor-move transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50 ${dropClasses} ${
        isArchived ? 'opacity-50' : ''
      }`}
    >
      <GripVertical
        className="h-4 w-4 shrink-0 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors"
        aria-hidden="true"
      />

      <span className="shrink-0 w-6 text-xs text-neutral-400 dark:text-neutral-600 tabular-nums">{index + 1}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm text-neutral-900 dark:text-white truncate">
            {item.name || item.title || item.month || 'Unnamed'}
          </h3>
          {isArchived && <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-600">Archived</span>}
        </div>
        <p className="mt-0.5 text-xs text-neutral-400 dark:text-neutral-600 truncate">{getSubtitle(item)}</p>
      </div>

      {isEvent && (
        <div className="shrink-0 hidden sm:block text-right space-y-0.5">
          <div className="flex items-center justify-end gap-2">
            {item.status && (
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${EVENT_STATUS_DOT[item.status] ?? 'bg-neutral-300 dark:bg-neutral-700'}`}
                  aria-hidden="true"
                />
                {item.status.toLowerCase().replace(/_/g, ' ')}
              </span>
            )}

            <span
              className={`text-xs whitespace-nowrap ${
                item.isPublic && item.isListed ? 'text-neutral-400 dark:text-neutral-600' : 'text-amber-600 dark:text-amber-500'
              }`}
            >
              {visibility}
            </span>
            <span className="text-xs text-neutral-400 dark:text-neutral-600 whitespace-nowrap tabular-nums">
              {ticketCount} {ticketCount === 1 ? 'ticket type' : 'ticket types'}
            </span>
          </div>

          <p className={`text-[11px] whitespace-nowrap ${getSaleNote(item).tone}`}>{getSaleNote(item).label}</p>
        </div>
      )}

      {/* Actions, revealed on hover but always reachable by keyboard */}
      <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {config.publicPath && (
          <a
            href={config.publicPath(item.id, item.isListed)}
            target="_blank"
            rel="noopener noreferrer"
            className={actionCls}
            aria-label={`View ${itemType}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}

        <button
          type="button"
          onClick={handleEdit}
          disabled={isBusy}
          aria-busy={isNavigating}
          className={actionCls}
          aria-label={`Edit ${itemType}`}
        >
          {isNavigating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Edit2 className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>

        {isEvent ? (
          <button
            type="button"
            onClick={handleArchive}
            disabled={isBusy}
            aria-busy={pending === 'archive'}
            className={actionCls}
            aria-label={isArchived ? 'Unarchive event' : 'Archive event'}
          >
            {pending === 'archive' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : isArchived ? (
              <ArchiveRestore className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Archive className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isBusy}
            aria-busy={pending === 'delete'}
            className={`${actionCls} hover:text-red-600 dark:hover:text-red-400`}
            aria-label={`Delete ${itemType}`}
          >
            {pending === 'delete' ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
