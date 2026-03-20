// ============================================================
// PAGE REGISTRY — TypeScript types and helpers
// ============================================================

export type PageStatus = 'draft' | 'live' | 'archived'

export type PageCategory =
  | 'immobiliare'
  | 'trading'
  | 'wake-up-call'
  | 'webinar'
  | 'corso'
  | 'lead-magnet'
  | 'thank-you'
  | 'evento'

export interface PageMetrics {
  views?: number
  conversions?: number
  conversionRate?: number
}

export interface PageRegistryEntry {
  id: string
  slug: string
  name: string
  status: PageStatus
  category: PageCategory
  template: string
  createdAt: string
  updatedAt: string
  deployedAt?: string
  route: string
  routeType: 'hardcoded' | 'dynamic'
  blocks: number
  hasForm: boolean
  hasPricing: boolean
  metrics?: PageMetrics
  thumbnail?: string
  notes?: string
}

export interface PageRegistry {
  version: string
  lastUpdated: string
  pages: PageRegistryEntry[]
}

// ---- Category display config ----

export const CATEGORY_CONFIG: Record<PageCategory, { label: string; color: string; bgColor: string }> = {
  immobiliare: { label: 'Immobiliare', color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
  trading: { label: 'Trading', color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  'wake-up-call': { label: 'Wake Up Call', color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  webinar: { label: 'Webinar', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  corso: { label: 'Corso', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
  'lead-magnet': { label: 'Lead Magnet', color: 'text-pink-400', bgColor: 'bg-pink-400/10' },
  'thank-you': { label: 'Thank You', color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
  evento: { label: 'Evento', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
}

export const STATUS_CONFIG: Record<PageStatus, { label: string; color: string; bgColor: string; dotColor: string }> = {
  draft: { label: 'Bozza', color: 'text-gray-400', bgColor: 'bg-gray-400/10', dotColor: 'bg-gray-400' },
  live: { label: 'Live', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', dotColor: 'bg-emerald-400' },
  archived: { label: 'Archiviata', color: 'text-red-400', bgColor: 'bg-red-400/10', dotColor: 'bg-red-400' },
}

// ---- Utility functions ----

export function getPagesByStatus(pages: PageRegistryEntry[], status: PageStatus): PageRegistryEntry[] {
  return pages.filter(p => p.status === status)
}

export function getPagesByCategory(pages: PageRegistryEntry[], category: PageCategory): PageRegistryEntry[] {
  return pages.filter(p => p.category === category)
}

export function searchPages(pages: PageRegistryEntry[], query: string): PageRegistryEntry[] {
  const q = query.toLowerCase()
  return pages.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.slug.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.template.toLowerCase().includes(q) ||
    (p.notes?.toLowerCase().includes(q) ?? false)
  )
}

export function sortPages(
  pages: PageRegistryEntry[],
  sortBy: 'name' | 'date' | 'status' | 'category',
  direction: 'asc' | 'desc' = 'desc'
): PageRegistryEntry[] {
  const sorted = [...pages].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'date':
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      case 'status':
        return a.status.localeCompare(b.status)
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return 0
    }
  })
  return direction === 'desc' ? sorted.reverse() : sorted
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateRelative(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Oggi'
  if (diffDays === 1) return 'Ieri'
  if (diffDays < 7) return `${diffDays} giorni fa`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`
  return formatDate(dateStr)
}
