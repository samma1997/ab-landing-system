'use client'

import {
  LayoutDashboard,
  FileText,
  ExternalLink,
  Zap,
  Globe,
  Clock,
  Calendar,
} from 'lucide-react'
import registryData from '@/content/pages/registry.json'
import {
  CATEGORY_CONFIG,
  STATUS_CONFIG,
  formatDate,
  formatDateRelative,
  type PageRegistryEntry,
} from '@/lib/page-registry'

const BASE_PATH = '/ab-landing-system'

// ============================================================
// ADMIN DASHBOARD
// ============================================================

export default function AdminDashboardPage() {
  const pages = registryData.pages as PageRegistryEntry[]

  return (
    <div className="flex min-h-screen bg-[#0d0f14]">
      {/* ══════════════════════════════════════════════════════════════
          SIDEBAR
          ══════════════════════════════════════════════════════════════ */}
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
          <NavItem icon={FileText} label="Pagine" badge={String(pages.length)} />
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 px-5 py-4">
          <p className="text-[11px] text-white/30">
            v{registryData.version} &mdash; Aggiornato {formatDateRelative(registryData.lastUpdated)}
          </p>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════════════
          MAIN CONTENT
          ══════════════════════════════════════════════════════════════ */}
      <main className="ml-[260px] flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Landing Page Factory</h1>
          <p className="mt-1 text-sm text-white/40">
            Alfio Bardolla Training Group &mdash; Sistema di gestione landing page
          </p>
        </div>

        {/* ── STATS ────────────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<Globe className="h-5 w-5 text-emerald-400" />}
            label="Pagine Live"
            value={String(pages.filter((p) => p.status === 'live').length)}
            bg="bg-emerald-400/10"
          />
          <StatCard
            icon={<FileText className="h-5 w-5 text-blue-400" />}
            label="Pagine Totali"
            value={String(pages.length)}
            bg="bg-blue-400/10"
          />
          <StatCard
            icon={<Calendar className="h-5 w-5 text-orange-400" />}
            label="Ultimo Deploy"
            value={formatDateRelative(registryData.lastUpdated)}
            bg="bg-orange-400/10"
          />
        </div>

        {/* ── PAGES TABLE ──────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#12141a]">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Tutte le pagine</h2>
            <p className="mt-0.5 text-xs text-white/30">
              {pages.length} pagin{pages.length === 1 ? 'a' : 'e'} nel registro
            </p>
          </div>

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
                <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 md:table-cell">
                  Data
                </th>
                <th className="hidden px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30 lg:table-cell">
                  Route
                </th>
                <th className="px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider text-white/30">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page, idx) => (
                <PageRow key={page.id} page={page} isLast={idx === pages.length - 1} />
              ))}
            </tbody>
          </table>

          {pages.length === 0 && (
            <div className="px-5 py-16 text-center">
              <FileText className="mx-auto mb-3 h-8 w-8 text-white/10" />
              <p className="text-sm text-white/30">Nessuna pagina nel registro</p>
            </div>
          )}
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
  bg,
}: {
  icon: React.ReactNode
  label: string
  value: string
  bg: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#12141a] p-5">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs text-white/40">{label}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
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
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{page.name}</p>
          {page.notes && (
            <p className="mt-0.5 truncate text-[11px] text-white/25">{page.notes}</p>
          )}
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

      {/* Date */}
      <td className="hidden px-4 py-4 md:table-cell">
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDate(page.updatedAt)}</span>
        </div>
      </td>

      {/* Route */}
      <td className="hidden px-4 py-4 lg:table-cell">
        <p className="truncate font-mono text-xs text-white/30">{page.route}</p>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-right">
        {page.status === 'live' && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Vedi Live
          </a>
        )}
      </td>
    </tr>
  )
}
