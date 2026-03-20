'use client'

import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  ExternalLink,
  Zap,
  Globe,
  Calendar,
  Clock,
  Menu,
  X,
  Sun,
  Moon,
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

export default function AdminDashboardPage() {
  const pages = registryData.pages as PageRegistryEntry[]
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pagine'>('dashboard')

  const bg = dark ? 'bg-[#0d0f14]' : 'bg-gray-50'
  const sidebarBg = dark ? 'bg-[#0a0c10] border-white/5' : 'bg-white border-gray-200'
  const cardBg = dark ? 'bg-[#12141a] border-white/[0.06]' : 'bg-white border-gray-200'
  const textPrimary = dark ? 'text-white' : 'text-gray-900'
  const textSecondary = dark ? 'text-white/40' : 'text-gray-500'
  const textMuted = dark ? 'text-white/30' : 'text-gray-400'
  const hoverRow = dark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'
  const borderColor = dark ? 'border-white/[0.06]' : 'border-gray-100'

  return (
    <div className={`flex min-h-screen ${bg} transition-colors duration-300`}>
      {/* ══ MOBILE OVERLAY ═══════════════════════════════════════════ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════════════ */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r transition-transform duration-300 ${sidebarBg} ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className={`flex items-center justify-between border-b px-5 py-5 ${borderColor}`}>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EF7B11]">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className={`text-sm font-bold ${textPrimary}`}>ABTG Landing</p>
              <p className={`text-[11px] ${textMuted}`}>Factory Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden ${textSecondary}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <p className={`mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.15em] ${textMuted}`}>
            Gestione
          </p>
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} dark={dark} onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false) }} />
          <NavItem icon={FileText} label="Pagine" badge={String(pages.length)} active={activeTab === 'pagine'} dark={dark} onClick={() => { setActiveTab('pagine'); setSidebarOpen(false) }} />
        </nav>

        {/* Theme toggle + version */}
        <div className={`border-t px-5 py-4 ${borderColor}`}>
          <button
            onClick={() => setDark(!dark)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              dark ? 'text-white/50 hover:bg-white/[0.04] hover:text-white/70' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            <span>{dark ? 'Modalita chiara' : 'Modalita scura'}</span>
          </button>
          <p className={`mt-3 px-3 text-[11px] ${textMuted}`}>
            v{registryData.version} &mdash; {formatDateRelative(registryData.lastUpdated)}
          </p>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════════ */}
      <main className="flex-1 lg:ml-[260px]">
        {/* Mobile header */}
        <div className={`sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 lg:hidden ${
          dark ? 'bg-[#0d0f14] border-white/5' : 'bg-white border-gray-200'
        }`}>
          <button onClick={() => setSidebarOpen(true)} className={textPrimary}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EF7B11]">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className={`text-sm font-bold ${textPrimary}`}>ABTG Landing</span>
          </div>
          <button onClick={() => setDark(!dark)} className={textSecondary}>
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className={`text-xl sm:text-2xl font-bold ${textPrimary}`}>
              {activeTab === 'dashboard' ? 'Landing Page Factory' : 'Pagine'}
            </h1>
            <p className={`mt-1 text-sm ${textSecondary}`}>
              {activeTab === 'dashboard'
                ? 'Alfio Bardolla Training Group \u2014 Gestione landing page'
                : `${pages.length} pagin${pages.length === 1 ? 'a' : 'e'} nel registro`
              }
            </p>
          </div>

          {/* ── STATS (solo in dashboard) ───────────────────────────── */}
          {activeTab === 'dashboard' && <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className={`rounded-xl border p-4 sm:p-5 ${cardBg}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${dark ? 'bg-emerald-400/10' : 'bg-emerald-50'}`}>
                  <Globe className={`h-5 w-5 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${textSecondary}`}>Pagine Live</p>
                  <p className={`text-xl font-bold ${textPrimary}`}>{pages.filter((p) => p.status === 'live').length}</p>
                </div>
              </div>
            </div>
            <div className={`rounded-xl border p-4 sm:p-5 ${cardBg}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${dark ? 'bg-blue-400/10' : 'bg-blue-50'}`}>
                  <FileText className={`h-5 w-5 ${dark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${textSecondary}`}>Pagine Totali</p>
                  <p className={`text-xl font-bold ${textPrimary}`}>{pages.length}</p>
                </div>
              </div>
            </div>
            <div className={`rounded-xl border p-4 sm:p-5 ${cardBg}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${dark ? 'bg-orange-400/10' : 'bg-orange-50'}`}>
                  <Calendar className={`h-5 w-5 ${dark ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${textSecondary}`}>Ultimo Deploy</p>
                  <p className={`text-xl font-bold ${textPrimary}`}>{formatDateRelative(registryData.lastUpdated)}</p>
                </div>
              </div>
            </div>
          </div>}

          {/* ── PAGES ──────────────────────────────────────────────── */}
          <div className={`overflow-hidden rounded-xl border ${cardBg}`}>
            <div className={`border-b px-4 sm:px-5 py-4 ${borderColor}`}>
              <h2 className={`text-sm font-semibold ${textPrimary}`}>Tutte le pagine</h2>
              <p className={`mt-0.5 text-xs ${textMuted}`}>
                {pages.length} pagin{pages.length === 1 ? 'a' : 'e'} nel registro
              </p>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th className={`px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>Pagina</th>
                    <th className={`px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>Stato</th>
                    <th className={`px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider ${textMuted} hidden md:table-cell`}>Categoria</th>
                    <th className={`px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider ${textMuted} hidden md:table-cell`}>Data</th>
                    <th className={`px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider ${textMuted} hidden lg:table-cell`}>Route</th>
                    <th className={`px-4 py-3.5 text-right text-[11px] font-semibold uppercase tracking-wider ${textMuted}`}>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page, idx) => {
                    const statusConf = STATUS_CONFIG[page.status]
                    const catConf = CATEGORY_CONFIG[page.category]
                    const liveUrl = `${BASE_PATH}${page.route}`
                    return (
                      <tr key={page.id} className={`group transition-colors ${hoverRow} ${idx < pages.length - 1 ? `border-b ${borderColor}` : ''}`}>
                        <td className="px-5 py-4">
                          <p className={`text-sm font-semibold ${textPrimary}`}>{page.name}</p>
                          {page.notes && <p className={`mt-0.5 text-[11px] ${textMuted} truncate max-w-xs`}>{page.notes}</p>}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusConf.bgColor} ${statusConf.color}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${statusConf.dotColor}`} />
                            {statusConf.label}
                          </span>
                        </td>
                        <td className="hidden px-4 py-4 md:table-cell">
                          <span className={`inline-block rounded-md px-2.5 py-1 text-[11px] font-semibold ${catConf.bgColor} ${catConf.color}`}>{catConf.label}</span>
                        </td>
                        <td className="hidden px-4 py-4 md:table-cell">
                          <div className={`flex items-center gap-1.5 text-xs ${textSecondary}`}>
                            <Clock className="h-3.5 w-3.5" />
                            <span>{formatDate(page.updatedAt)}</span>
                          </div>
                        </td>
                        <td className={`hidden px-4 py-4 lg:table-cell font-mono text-xs ${textMuted}`}>{page.route}</td>
                        <td className="px-4 py-4 text-right">
                          {page.status === 'live' && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                                dark ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              Vedi Live
                            </a>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-gray-100">
              {pages.map((page) => {
                const statusConf = STATUS_CONFIG[page.status]
                const catConf = CATEGORY_CONFIG[page.category]
                const liveUrl = `${BASE_PATH}${page.route}`
                return (
                  <div key={page.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`text-sm font-semibold ${textPrimary}`}>{page.name}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusConf.bgColor} ${statusConf.color}`}>
                            <span className={`h-1 w-1 rounded-full ${statusConf.dotColor}`} />
                            {statusConf.label}
                          </span>
                          <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${catConf.bgColor} ${catConf.color}`}>
                            {catConf.label}
                          </span>
                        </div>
                      </div>
                      {page.status === 'live' && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                            dark ? 'border-white/10 bg-white/5 text-white/70' : 'border-gray-200 bg-gray-50 text-gray-600'
                          }`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live
                        </a>
                      )}
                    </div>
                    {page.notes && <p className={`text-[11px] ${textMuted}`}>{page.notes}</p>}
                    <div className={`flex items-center gap-1.5 text-[11px] ${textMuted}`}>
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(page.updatedAt)}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {pages.length === 0 && (
              <div className="px-5 py-16 text-center">
                <FileText className={`mx-auto mb-3 h-8 w-8 ${dark ? 'text-white/10' : 'text-gray-200'}`} />
                <p className={`text-sm ${textMuted}`}>Nessuna pagina nel registro</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon: Icon, label, badge, active = false, dark, onClick }: {
  icon: React.ComponentType<{ className?: string }>; label: string; badge?: string; active?: boolean; dark: boolean; onClick?: () => void
}) {
  return (
    <button onClick={onClick} className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
      active
        ? dark ? 'bg-white/[0.07] font-semibold text-white' : 'bg-gray-100 font-semibold text-gray-900'
        : dark ? 'text-white/50 hover:bg-white/[0.04] hover:text-white/70' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
    }`}>
      <Icon className="h-[18px] w-[18px]" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
          dark ? 'bg-white/10 text-white/50' : 'bg-gray-200 text-gray-600'
        }`}>{badge}</span>
      )}
    </button>
  )
}
