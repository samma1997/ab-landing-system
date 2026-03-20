'use client'

import { useState, useMemo } from 'react'
import {
  LayoutDashboard,
  FileText,
  Search,
  Filter,
  ExternalLink,
  Code2,
  Copy,
  Archive,
  Eye,
  Layers,
  FormInput,
  CreditCard,
  ChevronDown,
  ArrowUpDown,
  Zap,
  BarChart3,
  Globe,
  Clock,
  Plus,
  Settings,
  Palette,
  BookOpen,
  TrendingUp,
  Users,
  MousePointerClick,
} from 'lucide-react'
import registryData from '@/content/pages/registry.json'
import {
  CATEGORY_CONFIG,
  STATUS_CONFIG,
  formatDate,
  formatDateRelative,
  type PageRegistryEntry,
  type PageStatus,
  type PageCategory,
} from '@/lib/page-registry'

const BASE_PATH = '/ab-landing-system'

// ============================================================
// ADMIN DASHBOARD
// ============================================================

export default function AdminDashboardPage() {
  const pages = registryData.pages as PageRegistryEntry[]

  // ---- State ----
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<PageCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  // ---- Computed ----
  const filteredPages = useMemo(() => {
    let result = [...pages]

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.template.toLowerCase().includes(q) ||
          (p.notes?.toLowerCase().includes(q) ?? false)
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((p) => p.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter)
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'date':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      }
    })

    return result
  }, [pages, searchQuery, statusFilter, categoryFilter, sortBy])

  // ---- Stats ----
  const stats = useMemo(() => {
    const livePages = pages.filter((p) => p.status === 'live')
    const totalViews = pages.reduce((sum, p) => sum + (p.metrics?.views ?? 0), 0)
    const totalConversions = pages.reduce((sum, p) => sum + (p.metrics?.conversions ?? 0), 0)
    const avgConversionRate = totalViews > 0 ? ((totalConversions / totalViews) * 100).toFixed(1) : '0'

    return {
      total: pages.length,
      live: livePages.length,
      drafts: pages.filter((p) => p.status === 'draft').length,
      archived: pages.filter((p) => p.status === 'archived').length,
      totalViews,
      totalConversions,
      avgConversionRate,
      withForms: pages.filter((p) => p.hasForm).length,
    }
  }, [pages])

  // ---- Categories in use ----
  const categoriesInUse = useMemo(() => {
    const cats = new Set(pages.map((p) => p.category))
    return Array.from(cats) as PageCategory[]
  }, [pages])

  return (
    <div className="flex min-h-screen">
      {/* ════════════════════════════════════════════════════════════════════
          SIDEBAR
          ════════════════════════════════════════════════════════════════════ */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/5 bg-[#0a0c10]">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EF7B11]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">ABTG Landing</p>
            <p className="text-[11px] text-white/40">Factory Dashboard</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            Gestione
          </p>
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={FileText} label="Pagine" badge={String(stats.total)} />
          <NavItem icon={Palette} label="Design Library" />
          <NavItem icon={BookOpen} label="Templates" badge={String(Object.keys(CATEGORY_CONFIG).length)} />

          <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            Strumenti
          </p>
          <NavItem icon={Plus} label="Quick Create" />
          <NavItem icon={BarChart3} label="Analytics" />
          <NavItem icon={Settings} label="Impostazioni" />
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 px-5 py-4">
          <p className="text-[11px] text-white/30">
            v{registryData.version} &mdash; Aggiornato {formatDateRelative(registryData.lastUpdated)}
          </p>
        </div>
      </aside>

      {/* ════════════════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════════════════ */}
      <main className="ml-[260px] flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Landing Page Factory</h1>
            <p className="mt-1 text-sm text-white/40">
              Alfio Bardolla Training Group &mdash; Sistema di gestione landing page
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-[#EF7B11] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d96a0e]">
            <Plus className="h-4 w-4" />
            Nuova Pagina
          </button>
        </div>

        {/* ── STATS BAR ──────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Globe className="h-5 w-5 text-emerald-400" />}
            label="Pagine Live"
            value={String(stats.live)}
            subtext={`${stats.total} totali`}
            accent="emerald"
          />
          <StatCard
            icon={<Eye className="h-5 w-5 text-blue-400" />}
            label="Visualizzazioni"
            value={stats.totalViews.toLocaleString('it-IT')}
            subtext="Tutte le pagine"
            accent="blue"
          />
          <StatCard
            icon={<MousePointerClick className="h-5 w-5 text-orange-400" />}
            label="Conversioni"
            value={String(stats.totalConversions)}
            subtext={`${stats.avgConversionRate}% tasso medio`}
            accent="orange"
          />
          <StatCard
            icon={<FileText className="h-5 w-5 text-purple-400" />}
            label="Bozze"
            value={String(stats.drafts)}
            subtext={`${stats.withForms} con form`}
            accent="purple"
          />
        </div>

        {/* ── FILTERS BAR ────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca per nome, slug, categoria..."
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#EF7B11]/50 focus:bg-white/[0.07]"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as PageStatus | 'all')}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 py-2.5 pl-3 pr-9 text-sm text-white outline-none transition-colors focus:border-[#EF7B11]/50 cursor-pointer"
            >
              <option value="all" className="bg-[#1a1c24]">Tutti gli stati</option>
              <option value="live" className="bg-[#1a1c24]">Live</option>
              <option value="draft" className="bg-[#1a1c24]">Bozza</option>
              <option value="archived" className="bg-[#1a1c24]">Archiviata</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as PageCategory | 'all')}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 py-2.5 pl-3 pr-9 text-sm text-white outline-none transition-colors focus:border-[#EF7B11]/50 cursor-pointer"
            >
              <option value="all" className="bg-[#1a1c24]">Tutte le categorie</option>
              {categoriesInUse.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1a1c24]">
                  {CATEGORY_CONFIG[cat].label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'status')}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 py-2.5 pl-3 pr-9 text-sm text-white outline-none transition-colors focus:border-[#EF7B11]/50 cursor-pointer"
            >
              <option value="date" className="bg-[#1a1c24]">Ordina: Data</option>
              <option value="name" className="bg-[#1a1c24]">Ordina: Nome</option>
              <option value="status" className="bg-[#1a1c24]">Ordina: Stato</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          </div>

          {/* View toggle */}
          <div className="flex rounded-lg border border-white/10 overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2.5 text-sm transition-colors ${
                viewMode === 'table'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <Layers className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2.5 text-sm transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── RESULTS COUNT ──────────────────────────────────────────────── */}
        <p className="mb-4 text-xs text-white/30">
          {filteredPages.length} pagin{filteredPages.length === 1 ? 'a' : 'e'} trovate
        </p>

        {/* ── TABLE VIEW ─────────────────────────────────────────────────── */}
        {viewMode === 'table' ? (
          <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#12141a]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                    Pagina
                  </th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">
                    Stato
                  </th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 md:table-cell">
                    Categoria
                  </th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 lg:table-cell">
                    Sezioni
                  </th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 lg:table-cell">
                    Metriche
                  </th>
                  <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 md:table-cell">
                    Aggiornata
                  </th>
                  <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-white/30">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page, idx) => (
                  <PageRow key={page.id} page={page} isLast={idx === filteredPages.length - 1} />
                ))}
              </tbody>
            </table>

            {filteredPages.length === 0 && (
              <div className="px-5 py-16 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-white/10" />
                <p className="text-sm text-white/30">Nessuna pagina trovata</p>
                <p className="mt-1 text-xs text-white/20">
                  Prova a cambiare i filtri o il termine di ricerca
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ── GRID VIEW ──────────────────────────────────────────────────── */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredPages.map((page) => (
              <PageCard key={page.id} page={page} />
            ))}

            {filteredPages.length === 0 && (
              <div className="col-span-full px-5 py-16 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-white/10" />
                <p className="text-sm text-white/30">Nessuna pagina trovata</p>
              </div>
            )}
          </div>
        )}

        {/* ── CATEGORIES BREAKDOWN ───────────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categoriesInUse.map((cat) => {
            const config = CATEGORY_CONFIG[cat]
            const count = pages.filter((p) => p.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  categoryFilter === cat
                    ? 'border-[#EF7B11]/30 bg-[#EF7B11]/5'
                    : 'border-white/[0.06] bg-[#12141a] hover:border-white/10'
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>
                  {config.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-white">{count}</p>
                <p className="mt-0.5 text-[11px] text-white/30">
                  pagin{count === 1 ? 'a' : 'e'}
                </p>
              </button>
            )
          })}
        </div>
      </main>
    </div>
  )
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function NavItem({
  icon: Icon,
  label,
  badge,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  badge?: string
  active?: boolean
}) {
  return (
    <button
      className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
        active
          ? 'bg-white/[0.07] font-semibold text-white'
          : 'text-white/50 hover:bg-white/[0.04] hover:text-white/70'
      }`}
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/50">
          {badge}
        </span>
      )}
    </button>
  )
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  subtext: string
  accent: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#12141a] p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${accent}-400/10`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-white/40">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-white/30">{subtext}</p>
    </div>
  )
}

function PageRow({ page, isLast }: { page: PageRegistryEntry; isLast: boolean }) {
  const statusConf = STATUS_CONFIG[page.status]
  const catConf = CATEGORY_CONFIG[page.category]
  const liveUrl = `${BASE_PATH}${page.route}`

  return (
    <tr
      className={`group transition-colors hover:bg-white/[0.02] ${
        !isLast ? 'border-b border-white/[0.04]' : ''
      }`}
    >
      {/* Page info */}
      <td className="px-5 py-4">
        <div className="flex items-start gap-3">
          {/* Thumbnail placeholder */}
          <div className="hidden h-12 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/[0.06] bg-white/[0.03] sm:flex">
            <FileText className="h-5 w-5 text-white/10" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{page.name}</p>
            <p className="mt-0.5 truncate text-xs text-white/30 font-mono">
              /{page.slug}
            </p>
            {page.notes && (
              <p className="mt-1 truncate text-[11px] text-white/20">{page.notes}</p>
            )}
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConf.bgColor} ${statusConf.color}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusConf.dotColor}`} />
          {statusConf.label}
        </span>
      </td>

      {/* Category */}
      <td className="hidden px-4 py-4 md:table-cell">
        <span
          className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold ${catConf.bgColor} ${catConf.color}`}
        >
          {catConf.label}
        </span>
      </td>

      {/* Blocks/features */}
      <td className="hidden px-4 py-4 lg:table-cell">
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">{page.blocks}</span>
          <span className="text-[11px] text-white/25">blocchi</span>
          {page.hasForm && (
            <span title="Ha un form HubSpot">
              <FormInput className="h-3.5 w-3.5 text-cyan-400/60" />
            </span>
          )}
          {page.hasPricing && (
            <span title="Ha sezione pricing">
              <CreditCard className="h-3.5 w-3.5 text-emerald-400/60" />
            </span>
          )}
        </div>
      </td>

      {/* Metrics */}
      <td className="hidden px-4 py-4 lg:table-cell">
        {page.metrics?.views != null ? (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Eye className="h-3 w-3 text-white/20" />
              <span className="text-xs text-white/50">{page.metrics.views.toLocaleString('it-IT')}</span>
            </div>
            {page.metrics.conversions != null && (
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-white/20" />
                <span className="text-xs text-white/50">
                  {page.metrics.conversions} ({page.metrics.conversionRate}%)
                </span>
              </div>
            )}
          </div>
        ) : (
          <span className="text-[11px] text-white/15">&mdash;</span>
        )}
      </td>

      {/* Updated */}
      <td className="hidden px-4 py-4 md:table-cell">
        <div>
          <p className="text-xs text-white/50">{formatDateRelative(page.updatedAt)}</p>
          <p className="mt-0.5 text-[10px] text-white/20">{formatDate(page.updatedAt)}</p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {page.status === 'live' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Apri pagina live"
              className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <button
            title="Visualizza preview"
            className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            title="Apri sorgente"
            className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Code2 className="h-4 w-4" />
          </button>
          <button
            title="Copia slug"
            onClick={() => navigator.clipboard?.writeText(page.slug)}
            className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function PageCard({ page }: { page: PageRegistryEntry }) {
  const statusConf = STATUS_CONFIG[page.status]
  const catConf = CATEGORY_CONFIG[page.category]
  const liveUrl = `${BASE_PATH}${page.route}`

  return (
    <div className="group overflow-hidden rounded-xl border border-white/[0.06] bg-[#12141a] transition-all hover:border-white/10">
      {/* Thumbnail area */}
      <div className="relative flex h-36 items-center justify-center border-b border-white/[0.04] bg-gradient-to-br from-white/[0.02] to-transparent">
        <FileText className="h-10 w-10 text-white/[0.06]" />

        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConf.bgColor} ${statusConf.color}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${statusConf.dotColor}`} />
            {statusConf.label}
          </span>
        </div>

        {/* Category */}
        <div className="absolute right-3 top-3">
          <span
            className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold ${catConf.bgColor} ${catConf.color}`}
          >
            {catConf.label}
          </span>
        </div>

        {/* Hover actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          {page.status === 'live' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
          <button className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
            <Code2 className="h-3.5 w-3.5" />
            Codice
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-white">{page.name}</h3>
        <p className="mt-0.5 truncate text-xs font-mono text-white/30">/{page.slug}</p>

        {/* Meta row */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-white/30">
          <span className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            {page.blocks} blocchi
          </span>
          {page.hasForm && (
            <span className="flex items-center gap-1 text-cyan-400/60">
              <FormInput className="h-3 w-3" />
              Form
            </span>
          )}
          {page.hasPricing && (
            <span className="flex items-center gap-1 text-emerald-400/60">
              <CreditCard className="h-3 w-3" />
              Pricing
            </span>
          )}
        </div>

        {/* Metrics */}
        {page.metrics?.views != null && (
          <div className="mt-3 flex items-center gap-4 border-t border-white/[0.04] pt-3 text-[11px] text-white/30">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {page.metrics.views.toLocaleString('it-IT')} views
            </span>
            {page.metrics.conversions != null && (
              <span className="flex items-center gap-1">
                <MousePointerClick className="h-3 w-3" />
                {page.metrics.conversions} conv. ({page.metrics.conversionRate}%)
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.04] pt-3">
          <span className="text-[10px] text-white/20">
            <Clock className="mr-1 inline h-3 w-3" />
            {formatDateRelative(page.updatedAt)}
          </span>
          <span className="text-[10px] text-white/15">
            {page.routeType === 'hardcoded' ? 'Hardcoded' : 'Dynamic'}
          </span>
        </div>
      </div>
    </div>
  )
}
