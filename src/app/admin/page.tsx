'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
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
  Layers,
  Sparkles,
  Eye,
  Play,
  RotateCcw,
  Monitor,
  Smartphone,
  Code2,
  ChevronRight,
} from 'lucide-react'
import registryData from '@/content/pages/registry.json'
import {
  CATEGORY_CONFIG,
  STATUS_CONFIG,
  formatDate,
  formatDateRelative,
  type PageRegistryEntry,
} from '@/lib/page-registry'
import { BLOCK_CATALOG, type BlockCategory } from '@/components/blocks-library'
import {
  fadeUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  scaleUp,
  clipReveal,
  typewriter,
} from '@/lib/animations'
import { gsap } from 'gsap'

const BASE_PATH = '/ab-landing-system'

type TabId = 'dashboard' | 'pagine' | 'blocchi' | 'animazioni' | 'immagini' | 'preview'

const GITHUB_REPO = 'samma1997/ab-landing-system'
const GITHUB_BANK_PATH = 'public/images/bank'

const IMAGE_CATEGORIES = [
  { id: 'speakers', name: 'Speaker', icon: '🎤', desc: 'Foto speaker e coach (es. Alfio Bardolla, Rodriguez...)', naming: 'speaker-nome-cognome-WxH.jpg' },
  { id: 'events', name: 'Eventi', icon: '🎪', desc: 'Foto eventi, palchi, sale, platee', naming: 'event-nome-evento-WxH.jpg' },
  { id: 'immobiliare', name: 'Immobiliare', icon: '🏠', desc: 'Foto immobili, cantieri, ristrutturazioni, rendering', naming: 'immobiliare-descrizione-WxH.jpg' },
  { id: 'trading', name: 'Trading', icon: '📈', desc: 'Schermate trading, grafici, piattaforme', naming: 'trading-descrizione-WxH.jpg' },
  { id: 'backgrounds', name: 'Sfondi', icon: '🖼️', desc: 'Immagini di sfondo per hero sections', naming: 'bg-descrizione-WxH.jpg' },
  { id: 'logos', name: 'Loghi', icon: '✦', desc: 'Loghi ABTG, partner, media (Rai, Corriere...)', naming: 'logo-nome-WxH.png' },
  { id: 'testimonials', name: 'Testimonianze', icon: '💬', desc: 'Foto studenti, screenshot risultati', naming: 'testimonial-nome-WxH.jpg' },
  { id: 'icons', name: 'Icone', icon: '◆', desc: 'Icone e illustrazioni personalizzate', naming: 'icon-descrizione-WxH.svg' },
]

// ────────────────────────────────────────────────────────
// Block metadata for the gallery
// ────────────────────────────────────────────────────────

const BLOCK_PROPS_MAP: Record<string, string[]> = {
  'hero-split': ['title', 'titleHighlight', 'subtitle', 'ctaText', 'formFields', 'bgImage', 'badges', 'formTitle', 'formAction', 'trustpilotRating', 'preTitle', 'disclaimer', 'bonusText', 'ctaSubtext'],
  'hero-center': ['title', 'titleHighlight', 'subtitle', 'ctaText', 'ctaHref', 'bgImage', 'badge', 'preTitle', 'ctaSubtext', 'overlayOpacity', 'secondaryCtaText', 'secondaryCtaHref'],
  'logo-ticker': ['logos', 'label', 'speed', 'bgColor'],
  'checklist-section': ['title', 'items', 'columns', 'bgColor', 'checkColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'comparison-table': ['title', 'rows', 'beforeLabel', 'afterLabel', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'numbered-phases': ['title', 'phases', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'pillar-cards': ['title', 'cards', 'columns', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'speaker-cards': ['title', 'speakers', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'urgency-section': ['title', 'bulletPoints', 'ctaText', 'ctaHref', 'icon', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'id'],
  'form-section': ['title', 'formFields', 'eventDetails', 'ctaText', 'formAction', 'bgColor', 'preTitle', 'titleHighlight', 'subtitle', 'requisitoTitle', 'requisitoText', 'ctaSubtext', 'privacyText', 'bonusBadge', 'id'],
  'cta-divider': ['ctaText', 'text', 'ctaHref', 'variant', 'size', 'id'],
  'footer-abtg': ['companyName', 'companyAddress', 'companyVat', 'logo', 'links', 'socialLinks', 'disclaimers', 'copyrightYear', 'id'],
  'horizontal-scroll-cards': ['title', 'titleHighlight', 'subtitle', 'cards', 'bgColor', 'cardWidth', 'gap', 'id'],
  'stacking-cards': ['preTitle', 'title', 'titleHighlight', 'subtitle', 'cards', 'bgColor', 'id'],
}

const BLOCK_DEMO_LINKS: Record<string, string> = {
  'horizontal-scroll-cards': `${BASE_PATH}/test-horizontal`,
  'stacking-cards': `${BASE_PATH}/test-stacking`,
}

const CATEGORY_DISPLAY: Record<BlockCategory, { label: string; color: string; bg: string }> = {
  hero: { label: 'Hero', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  'social-proof': { label: 'Social Proof', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  content: { label: 'Contenuto', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  conversion: { label: 'Conversione', color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-100 dark:bg-orange-500/20' },
  layout: { label: 'Layout', color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-200 dark:bg-gray-500/20' },
  animation: { label: 'Animazione', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-100 dark:bg-cyan-500/20' },
}

// ────────────────────────────────────────────────────────
// Animation metadata for the showcase
// ────────────────────────────────────────────────────────

type AnimCategory = 'ingresso' | 'scroll' | 'micro' | 'testo' | 'utilita'

interface AnimEntry {
  id: string
  name: string
  description: string
  category: AnimCategory
  signature: string
  usage: string
}

const ANIM_CATEGORIES: Record<AnimCategory, { label: string; color: string; bg: string }> = {
  ingresso: { label: 'Ingresso', color: 'text-blue-700', bg: 'bg-blue-100' },
  scroll: { label: 'Scroll', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  micro: { label: 'Micro-interazione', color: 'text-purple-700', bg: 'bg-purple-100' },
  testo: { label: 'Testo', color: 'text-orange-700', bg: 'bg-orange-100' },
  utilita: { label: 'Utilita', color: 'text-gray-700', bg: 'bg-gray-200' },
}

const ANIMATIONS: AnimEntry[] = [
  { id: 'fadeUp', name: 'fadeUp', description: 'Elemento sale dal basso con dissolvenza', category: 'ingresso', signature: 'fadeUp(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = fadeUp(elementRef.current)\nreturn () => cleanup()` },
  { id: 'fadeIn', name: 'fadeIn', description: 'Dissolvenza semplice', category: 'ingresso', signature: 'fadeIn(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = fadeIn(elementRef.current)\nreturn () => cleanup()` },
  { id: 'slideInLeft', name: 'slideInLeft', description: 'Scorre da sinistra', category: 'ingresso', signature: 'slideInLeft(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = slideInLeft(elementRef.current)\nreturn () => cleanup()` },
  { id: 'slideInRight', name: 'slideInRight', description: 'Scorre da destra', category: 'ingresso', signature: 'slideInRight(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = slideInRight(elementRef.current)\nreturn () => cleanup()` },
  { id: 'scaleUp', name: 'scaleUp', description: 'Scala dal piccolo al grande', category: 'ingresso', signature: 'scaleUp(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = scaleUp(elementRef.current)\nreturn () => cleanup()` },
  { id: 'clipReveal', name: 'clipReveal', description: 'Rivelazione con clip-path (curtain effect)', category: 'ingresso', signature: "clipReveal(el: TweenTarget, direction?: 'up'|'down'|'left'|'right', opts?: AnimOpts): CleanupFn", usage: `const cleanup = clipReveal(elementRef.current, 'up')\nreturn () => cleanup()` },
  { id: 'scrollFadeUp', name: 'scrollFadeUp', description: 'fadeUp attivato dallo scroll', category: 'scroll', signature: 'scrollFadeUp(el: TweenTarget, opts?: AnimOpts): CleanupFn', usage: `const cleanup = scrollFadeUp(elementRef.current)\nreturn () => cleanup()` },
  { id: 'scrollStagger', name: 'scrollStagger', description: 'Figli che appaiono uno dopo l\'altro', category: 'scroll', signature: 'scrollStagger(parent: DOMTarget, childSelector: string, opts?: AnimOpts): CleanupFn', usage: `const cleanup = scrollStagger(parentRef.current, '.child')\nreturn () => cleanup()` },
  { id: 'scrollCounter', name: 'scrollCounter', description: 'Contatore numerico animato', category: 'scroll', signature: 'scrollCounter(el: HTMLElement, target: number, opts?): CleanupFn', usage: `const cleanup = scrollCounter(elRef.current, 1500, { suffix: '+' })\nreturn () => cleanup()` },
  { id: 'magneticHover', name: 'magneticHover', description: 'Elemento segue il mouse', category: 'micro', signature: 'magneticHover(el: HTMLElement, strength?: number): CleanupFn', usage: `const cleanup = magneticHover(buttonRef.current, 0.3)\nreturn () => cleanup()` },
  { id: 'buttonHoverFill', name: 'buttonHoverFill', description: 'Riempimento colore al hover', category: 'micro', signature: 'buttonHoverFill(el: HTMLElement): CleanupFn', usage: `const cleanup = buttonHoverFill(buttonRef.current)\nreturn () => cleanup()` },
  { id: 'textRevealLines', name: 'textRevealLines', description: 'Testo che appare riga per riga', category: 'testo', signature: 'textRevealLines(el: HTMLElement, opts?: AnimOpts): CleanupFn', usage: `const cleanup = textRevealLines(headingRef.current)\nreturn () => cleanup()` },
  { id: 'typewriter', name: 'typewriter', description: 'Effetto macchina da scrivere', category: 'testo', signature: "typewriter(el: HTMLElement, text: string, opts?: { speed?: number; delay?: number }): CleanupFn", usage: `const cleanup = typewriter(elRef.current, 'Ciao mondo!')\nreturn () => cleanup()` },
  { id: 'scrollMarquee', name: 'scrollMarquee', description: 'Scorrimento infinito orizzontale', category: 'utilita', signature: "scrollMarquee(track: HTMLElement, opts?: { speed?: number; direction?: 'left'|'right'; pauseOnHover?: boolean }): CleanupFn", usage: `const cleanup = scrollMarquee(trackRef.current, { speed: 40 })\nreturn () => cleanup()` },
]

// ────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const pages = registryData.pages as PageRegistryEntry[]
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  // Blocchi state
  const [blockFilter, setBlockFilter] = useState<BlockCategory | 'all'>('all')

  // Preview state
  const [previewPage, setPreviewPage] = useState<string>(pages[0]?.route ?? '')
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

  // Theme classes
  const bg = dark ? 'bg-[#0d0f14]' : 'bg-gray-50'
  const sidebarBg = dark ? 'bg-[#0a0c10] border-white/5' : 'bg-white border-gray-200'
  const cardBg = dark ? 'bg-[#12141a] border-white/[0.06]' : 'bg-white border-gray-200'
  const textPrimary = dark ? 'text-white' : 'text-gray-900'
  const textSecondary = dark ? 'text-white/40' : 'text-gray-500'
  const textMuted = dark ? 'text-white/30' : 'text-gray-400'
  const hoverRow = dark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'
  const borderColor = dark ? 'border-white/[0.06]' : 'border-gray-100'

  const tabTitles: Record<TabId, string> = {
    dashboard: 'Landing Page Factory',
    pagine: 'Pagine',
    blocchi: 'Libreria Blocchi',
    animazioni: 'Animazioni GSAP',
    immagini: 'Banca Immagini',
    preview: 'Preview Pagine',
  }

  const tabSubtitles: Record<TabId, string> = {
    dashboard: 'Alfio Bardolla Training Group \u2014 Gestione landing page',
    pagine: `${pages.length} pagin${pages.length === 1 ? 'a' : 'e'} nel registro`,
    blocchi: `${BLOCK_CATALOG.length} blocchi riutilizzabili nel design system`,
    animazioni: `${ANIMATIONS.length} animazioni GSAP disponibili`,
    immagini: `${IMAGE_CATEGORIES.length} categorie \u2014 Carica le immagini su GitHub per renderle disponibili`,
    preview: 'Anteprima delle pagine registrate',
  }

  const filteredBlocks = blockFilter === 'all'
    ? BLOCK_CATALOG
    : BLOCK_CATALOG.filter(b => b.category === blockFilter)

  return (
    <div className={`flex min-h-screen ${bg} transition-colors duration-300`}>
      {/* Mobile overlay */}
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

          <p className={`mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] ${textMuted}`}>
            Design System
          </p>
          <NavItem icon={Layers} label="Blocchi" badge={String(BLOCK_CATALOG.length)} active={activeTab === 'blocchi'} dark={dark} onClick={() => { setActiveTab('blocchi'); setSidebarOpen(false) }} />
          <NavItem icon={Sparkles} label="Animazioni" badge={String(ANIMATIONS.length)} active={activeTab === 'animazioni'} dark={dark} onClick={() => { setActiveTab('animazioni'); setSidebarOpen(false) }} />

          <p className={`mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] ${textMuted}`}>
            Strumenti
          </p>
          <NavItem icon={Eye} label="Preview" active={activeTab === 'preview'} dark={dark} onClick={() => { setActiveTab('preview'); setSidebarOpen(false) }} />

          <p className={`mb-2 mt-5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] ${textMuted}`}>
            Risorse
          </p>
          <NavItem icon={Globe} label="Banca Immagini" badge={String(IMAGE_CATEGORIES.length)} active={activeTab === 'immagini'} dark={dark} onClick={() => { setActiveTab('immagini'); setSidebarOpen(false) }} />
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
              {tabTitles[activeTab]}
            </h1>
            <p className={`mt-1 text-sm ${textSecondary}`}>
              {tabSubtitles[activeTab]}
            </p>
          </div>

          {/* ── TAB: DASHBOARD ────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <>
              <div className="mb-6 sm:mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <StatCard icon={Globe} label="Pagine Live" value={String(pages.filter((p) => p.status === 'live').length)} color="emerald" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary} />
                <StatCard icon={FileText} label="Pagine Totali" value={String(pages.length)} color="blue" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary} />
                <StatCard icon={Calendar} label="Ultimo Deploy" value={formatDateRelative(registryData.lastUpdated)} color="orange" dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary} />
              </div>
              <PageTable pages={pages} dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary} textMuted={textMuted} borderColor={borderColor} hoverRow={hoverRow} />
            </>
          )}

          {/* ── TAB: PAGINE ───────────────────────────────────── */}
          {activeTab === 'pagine' && (
            <PageTable pages={pages} dark={dark} cardBg={cardBg} textPrimary={textPrimary} textSecondary={textSecondary} textMuted={textMuted} borderColor={borderColor} hoverRow={hoverRow} />
          )}

          {/* ── TAB: BLOCCHI ──────────────────────────────────── */}
          {activeTab === 'blocchi' && (
            <>
              {/* Category filter pills */}
              <div className="mb-6 flex flex-wrap gap-2">
                <FilterPill label="Tutti" active={blockFilter === 'all'} onClick={() => setBlockFilter('all')} dark={dark} />
                {(Object.keys(CATEGORY_DISPLAY) as BlockCategory[]).map(cat => (
                  <FilterPill
                    key={cat}
                    label={CATEGORY_DISPLAY[cat].label}
                    active={blockFilter === cat}
                    onClick={() => setBlockFilter(cat)}
                    dark={dark}
                  />
                ))}
              </div>

              {/* Block cards grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredBlocks.map(block => (
                  <BlockCard
                    key={block.id}
                    block={block}
                    props={BLOCK_PROPS_MAP[block.id] ?? []}
                    dark={dark}
                    cardBg={cardBg}
                    textPrimary={textPrimary}
                    textSecondary={textSecondary}
                    textMuted={textMuted}
                    borderColor={borderColor}
                  />
                ))}
              </div>
            </>
          )}

          {/* ── TAB: ANIMAZIONI ───────────────────────────────── */}
          {activeTab === 'animazioni' && (
            <div className="space-y-4">
              {ANIMATIONS.map(anim => (
                <AnimationCard
                  key={anim.id}
                  anim={anim}
                  dark={dark}
                  cardBg={cardBg}
                  textPrimary={textPrimary}
                  textSecondary={textSecondary}
                  textMuted={textMuted}
                  borderColor={borderColor}
                />
              ))}
            </div>
          )}

          {/* ── TAB: IMMAGINI ──────────────────────────────────── */}
          {activeTab === 'immagini' && (
            <>
              {/* How-to banner */}
              <div className={`mb-6 rounded-xl border p-5 ${dark ? 'border-[#EF7B11]/20 bg-[#EF7B11]/5' : 'border-orange-200 bg-orange-50'}`}>
                <h3 className={`text-sm font-bold ${textPrimary}`}>Come caricare le immagini</h3>
                <ol className={`mt-2 space-y-1 text-xs ${textSecondary}`}>
                  <li>1. Clicca su <strong>&ldquo;Carica su GitHub&rdquo;</strong> nella categoria desiderata</li>
                  <li>2. Su GitHub, clicca <strong>&ldquo;Add file &rarr; Upload files&rdquo;</strong></li>
                  <li>3. Trascina le immagini e fai commit</li>
                  <li>4. Le immagini saranno disponibili per le landing page</li>
                </ol>
                <p className={`mt-3 text-[11px] ${textMuted}`}>
                  <strong>Formato nome:</strong> categoria-descrizione-LARGHEZZAxALTEZZA.jpg (es. speaker-alfio-bardolla-600x600.jpg)
                </p>
              </div>

              {/* Category cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {IMAGE_CATEGORIES.map(cat => (
                  <div key={cat.id} className={`rounded-xl border p-5 transition-shadow hover:shadow-md ${cardBg}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h3 className={`text-sm font-bold ${textPrimary}`}>{cat.name}</h3>
                      </div>
                    </div>
                    <p className={`text-xs mb-3 ${textSecondary}`}>{cat.desc}</p>
                    <p className={`text-[10px] font-mono mb-4 ${textMuted}`}>{cat.naming}</p>
                    <a
                      href={`https://github.com/${GITHUB_REPO}/tree/main/${GITHUB_BANK_PATH}/${cat.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        dark ? 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Carica su GitHub
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── TAB: PREVIEW ──────────────────────────────────── */}
          {activeTab === 'preview' && (
            <>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <label className={`text-sm font-medium ${textPrimary}`}>Pagina:</label>
                  <select
                    value={previewPage}
                    onChange={e => setPreviewPage(e.target.value)}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      dark ? 'border-white/10 bg-white/5 text-white' : 'border-gray-300 bg-white text-gray-900'
                    }`}
                  >
                    {pages.map(p => (
                      <option key={p.id} value={p.route}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className={`flex items-center gap-1 rounded-lg border p-1 ${dark ? 'border-white/10' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      previewMode === 'desktop'
                        ? 'bg-[#EF7B11] text-white'
                        : dark ? 'text-white/50 hover:text-white/70' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Desktop
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      previewMode === 'mobile'
                        ? 'bg-[#EF7B11] text-white'
                        : dark ? 'text-white/50 hover:text-white/70' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    Mobile
                  </button>
                </div>
              </div>

              <div className={`overflow-hidden rounded-xl border ${cardBg}`}>
                <div className={`border-b px-4 py-3 ${borderColor} flex items-center gap-2`}>
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className={`ml-2 flex-1 truncate font-mono text-xs ${textMuted}`}>
                    {BASE_PATH}{previewPage}
                  </span>
                  <a href={`${BASE_PATH}${previewPage}`} target="_blank" rel="noopener noreferrer" className={`${textSecondary} hover:${textPrimary}`}>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className={`flex justify-center ${dark ? 'bg-[#1a1c22]' : 'bg-gray-100'} p-4`}>
                  <iframe
                    src={`${BASE_PATH}${previewPage}`}
                    className="rounded-lg border bg-white transition-all duration-300"
                    style={{
                      width: previewMode === 'desktop' ? '100%' : '375px',
                      height: '700px',
                      border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e5e7eb',
                    }}
                    title="Page Preview"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// ────────────────────────────────────────────────────────
// Sub-Components
// ────────────────────────────────────────────────────────

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

function StatCard({ icon: Icon, label, value, color, dark, cardBg, textPrimary, textSecondary }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: string; color: string; dark: boolean; cardBg: string; textPrimary: string; textSecondary: string
}) {
  const iconColors: Record<string, { bg: string; text: string }> = {
    emerald: { bg: dark ? 'bg-emerald-400/10' : 'bg-emerald-50', text: dark ? 'text-emerald-400' : 'text-emerald-600' },
    blue: { bg: dark ? 'bg-blue-400/10' : 'bg-blue-50', text: dark ? 'text-blue-400' : 'text-blue-600' },
    orange: { bg: dark ? 'bg-orange-400/10' : 'bg-orange-50', text: dark ? 'text-orange-400' : 'text-orange-600' },
  }
  const c = iconColors[color] ?? iconColors.blue
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${cardBg}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon className={`h-5 w-5 ${c.text}`} />
        </div>
        <div>
          <p className={`text-xs ${textSecondary}`}>{label}</p>
          <p className={`text-xl font-bold ${textPrimary}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function FilterPill({ label, active, onClick, dark }: { label: string; active: boolean; onClick: () => void; dark: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'bg-[#EF7B11] text-white'
          : dark ? 'bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white/70' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
    >
      {label}
    </button>
  )
}

// ── Block Card with mini preview ─────────────────────────

function BlockCard({ block, props, dark, cardBg, textPrimary, textSecondary, textMuted, borderColor }: {
  block: (typeof BLOCK_CATALOG)[number]; props: string[]; dark: boolean; cardBg: string; textPrimary: string; textSecondary: string; textMuted: string; borderColor: string
}) {
  const [showProps, setShowProps] = useState(false)
  const cat = CATEGORY_DISPLAY[block.category]

  return (
    <div className={`group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg ${cardBg}`}>
      {/* Mini preview */}
      <div className={`relative h-40 overflow-hidden ${dark ? 'bg-[#1a1c22]' : 'bg-gray-50'}`}>
        <BlockMiniPreview blockId={block.id} dark={dark} />
        <div className="absolute right-2 top-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${cat.bg} ${cat.color}`}>
            {cat.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`text-sm font-bold ${textPrimary}`}>{block.name}</h3>
        <p className={`mt-1 text-xs leading-relaxed ${textSecondary}`}>{block.description}</p>

        {/* Actions row */}
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => setShowProps(!showProps)}
            className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              dark ? 'text-[#EF7B11]/80 hover:text-[#EF7B11]' : 'text-[#EF7B11] hover:text-[#d96a0e]'
            }`}
          >
            <ChevronRight className={`h-3 w-3 transition-transform ${showProps ? 'rotate-90' : ''}`} />
            {props.length} props
          </button>
          {BLOCK_DEMO_LINKS[block.id] && (
            <a
              href={BLOCK_DEMO_LINKS[block.id]}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${
                dark ? 'text-cyan-400/80 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'
              }`}
            >
              <Eye className="h-3 w-3" />
              Demo live
            </a>
          )}
        </div>

        {showProps && (
          <div className={`mt-2 rounded-lg border p-3 ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex flex-wrap gap-1.5">
              {props.map(prop => (
                <span key={prop} className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] ${
                  dark ? 'bg-white/5 text-white/50' : 'bg-white text-gray-600 shadow-sm'
                }`}>
                  {prop}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── CSS mini-preview for each block ──────────────────────

function BlockMiniPreview({ blockId, dark }: { blockId: string; dark: boolean }) {
  const base = dark ? 'text-white/20' : 'text-gray-300'
  const accent = '#EF7B11'

  const previews: Record<string, React.ReactNode> = {
    'hero-split': (
      <div className="flex h-full items-center gap-3 p-4">
        <div className="flex-1 space-y-2">
          <div className={`h-2 w-16 rounded ${dark ? 'bg-orange-400/30' : 'bg-orange-200'}`} />
          <div className={`h-3 w-full rounded ${dark ? 'bg-white/15' : 'bg-gray-200'}`} />
          <div className={`h-3 w-3/4 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-2 w-2/3 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className={`mt-2 h-6 w-24 rounded-md`} style={{ background: accent }} />
        </div>
        <div className={`h-24 w-28 rounded-lg border-2 border-dashed ${dark ? 'border-white/10' : 'border-gray-200'} flex items-center justify-center`}>
          <span className={`text-[9px] font-bold ${base}`}>FORM</span>
        </div>
      </div>
    ),
    'hero-center': (
      <div className={`flex h-full flex-col items-center justify-center gap-2 p-4 ${dark ? 'bg-[#15171d]' : 'bg-gray-100'}`}>
        <div className={`h-2 w-20 rounded ${dark ? 'bg-orange-400/30' : 'bg-orange-200'}`} />
        <div className={`h-4 w-3/4 rounded ${dark ? 'bg-white/15' : 'bg-gray-300'}`} />
        <div className={`h-2 w-1/2 rounded ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
        <div className="mt-1 h-7 w-28 rounded-md" style={{ background: accent }} />
      </div>
    ),
    'logo-ticker': (
      <div className="flex h-full flex-col justify-center gap-3 p-4">
        <div className={`text-center text-[9px] font-bold uppercase tracking-widest ${base}`}>Come visto su</div>
        <div className="flex items-center justify-center gap-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`h-6 w-14 rounded ${dark ? 'bg-white/5' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>
    ),
    'checklist-section': (
      <div className="flex h-full flex-col gap-2 p-4">
        <div className={`h-3 w-32 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className="mt-1 grid grid-cols-2 gap-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full" style={{ background: accent, opacity: 0.7 }} />
              <div className={`h-2 flex-1 rounded ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>
      </div>
    ),
    'comparison-table': (
      <div className="flex h-full flex-col gap-2 p-4">
        <div className={`h-3 w-32 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
        <div className="mt-1 space-y-1.5">
          <div className="flex gap-2">
            <div className="h-4 flex-1 rounded bg-red-400/20" />
            <div className="h-4 flex-1 rounded bg-emerald-400/20" />
          </div>
          <div className="flex gap-2">
            <div className="h-4 flex-1 rounded bg-red-400/15" />
            <div className="h-4 flex-1 rounded bg-emerald-400/15" />
          </div>
          <div className="flex gap-2">
            <div className="h-4 flex-1 rounded bg-red-400/10" />
            <div className="h-4 flex-1 rounded bg-emerald-400/10" />
          </div>
        </div>
      </div>
    ),
    'numbered-phases': (
      <div className="flex h-full items-center justify-center gap-3 p-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: accent }}>
              {i}
            </div>
            <div className={`h-2 w-12 rounded ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
            <div className={`h-1.5 w-10 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          </div>
        ))}
      </div>
    ),
    'pillar-cards': (
      <div className="flex h-full items-center justify-center gap-3 p-4">
        {[1,2,3].map(i => (
          <div key={i} className={`flex h-24 w-20 flex-col items-center gap-1.5 rounded-lg border p-2 ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-white'}`}>
            <div className="h-5 w-5 rounded" style={{ background: accent, opacity: 0.3 }} />
            <div className={`h-2 w-full rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-1.5 w-3/4 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          </div>
        ))}
      </div>
    ),
    'speaker-cards': (
      <div className="flex h-full items-center justify-center gap-4 p-4">
        {[1,2].map(i => (
          <div key={i} className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-white'}`}>
            <div className={`h-10 w-10 rounded-full ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-2 w-14 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-1.5 w-10 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          </div>
        ))}
      </div>
    ),
    'urgency-section': (
      <div className={`flex h-full flex-col items-center justify-center gap-2 p-4 ${dark ? 'bg-[#15171d]' : 'bg-gray-800'}`}>
        <div className="h-5 w-5 rounded-full bg-orange-400/40" />
        <div className="h-3 w-3/4 rounded bg-white/20" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="mt-1 h-6 w-24 rounded-md" style={{ background: accent }} />
      </div>
    ),
    'form-section': (
      <div className="flex h-full items-center gap-3 p-4">
        <div className="flex-1 space-y-1.5">
          <div className={`h-2 w-16 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-2 w-full rounded ${dark ? 'bg-white/8' : 'bg-gray-200'}`} />
          <div className={`h-2 w-2/3 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
        </div>
        <div className={`flex h-28 w-28 flex-col gap-1.5 rounded-lg border p-2 ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-white'}`}>
          <div className={`h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className={`h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className={`h-3 w-full rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          <div className="mt-auto h-5 w-full rounded" style={{ background: accent }} />
        </div>
      </div>
    ),
    'cta-divider': (
      <div className="flex h-full items-center justify-center p-4">
        <div className="flex w-full items-center justify-between rounded-lg px-5 py-4" style={{ background: accent }}>
          <div className="space-y-1">
            <div className="h-2.5 w-32 rounded bg-white/30" />
          </div>
          <div className="h-7 w-20 rounded-md bg-white/20" />
        </div>
      </div>
    ),
    'horizontal-scroll-cards': (
      <div className="flex h-full items-center gap-2 overflow-hidden p-4">
        {/* Arrow left hint */}
        <div className={`text-[10px] ${base}`}>&#8592;</div>
        {[1,2,3,4].map(i => (
          <div key={i} className={`flex h-24 w-20 flex-shrink-0 flex-col gap-1.5 rounded-lg border p-2 ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-gray-200 bg-white'}`}>
            <div className="h-4 w-10 rounded text-[10px] font-black" style={{ color: accent }}>{['87%','1.2K','30K','120'][i-1]}</div>
            <div className={`h-1.5 w-full rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
            <div className={`h-1.5 w-3/4 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
          </div>
        ))}
        <div className={`text-[10px] ${base}`}>&#8594;</div>
      </div>
    ),
    'stacking-cards': (
      <div className={`relative flex h-full items-end justify-center gap-1 overflow-hidden p-4 pb-6 ${dark ? 'bg-[#15171d]' : 'bg-gray-100'}`}>
        {[-8, -4, 0, 4, 8].map((rot, i) => (
          <div
            key={i}
            className={`h-20 w-14 rounded-lg border ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-gray-200 bg-white shadow-sm'}`}
            style={{ transform: `rotate(${rot}deg) translateY(${Math.abs(rot) * 1.5}px)` }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-1 p-1">
              <div className="flex h-5 w-5 items-center justify-center rounded text-[7px] font-bold text-white" style={{ background: accent }}>{i + 1}</div>
              <div className={`h-1 w-8 rounded ${dark ? 'bg-white/10' : 'bg-gray-200'}`} />
              <div className={`h-1 w-6 rounded ${dark ? 'bg-white/5' : 'bg-gray-100'}`} />
            </div>
          </div>
        ))}
      </div>
    ),
    'footer-abtg': (
      <div className={`flex h-full flex-col justify-end p-4 ${dark ? 'bg-[#15171d]' : 'bg-gray-800'}`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-orange-400/40" />
            <div className="h-2 w-20 rounded bg-white/15" />
          </div>
          <div className="flex gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-1.5 w-14 rounded bg-white/10" />
            ))}
          </div>
          <div className="h-1 w-full rounded bg-white/5" />
          <div className="h-1.5 w-32 rounded bg-white/8" />
        </div>
      </div>
    ),
  }

  return previews[blockId] ?? (
    <div className={`flex h-full items-center justify-center ${base}`}>
      <Layers className="h-8 w-8" />
    </div>
  )
}

// ── Animation Demo Card ──────────────────────────────────

function AnimationCard({ anim, dark, cardBg, textPrimary, textSecondary, textMuted, borderColor }: {
  anim: AnimEntry; dark: boolean; cardBg: string; textPrimary: string; textSecondary: string; textMuted: string; borderColor: string
}) {
  const demoRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const cleanupRef = useRef<(() => void) | null>(null)
  const cat = ANIM_CATEGORIES[anim.category]

  const resetElement = useCallback(() => {
    if (!demoRef.current) return
    gsap.set(demoRef.current, { clearProps: 'all' })
    demoRef.current.textContent = ''
    demoRef.current.style.cssText = ''
  }, [])

  const playAnimation = useCallback(() => {
    if (!demoRef.current) return

    // Cleanup previous
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    resetElement()

    const el = demoRef.current

    // Set default visual style for demo box
    el.style.width = '80px'
    el.style.height = '80px'
    el.style.borderRadius = '12px'
    el.style.background = '#EF7B11'
    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'
    el.style.color = 'white'
    el.style.fontWeight = '700'
    el.style.fontSize = '11px'

    setPlaying(true)

    switch (anim.id) {
      case 'fadeUp':
        el.textContent = 'fadeUp'
        cleanupRef.current = fadeUp(el)
        break
      case 'fadeIn':
        el.textContent = 'fadeIn'
        cleanupRef.current = fadeIn(el)
        break
      case 'slideInLeft':
        el.textContent = 'Left'
        cleanupRef.current = slideInLeft(el)
        break
      case 'slideInRight':
        el.textContent = 'Right'
        cleanupRef.current = slideInRight(el)
        break
      case 'scaleUp':
        el.textContent = 'Scale'
        cleanupRef.current = scaleUp(el)
        break
      case 'clipReveal':
        el.textContent = 'Clip'
        cleanupRef.current = clipReveal(el, 'up')
        break
      case 'scrollFadeUp':
        el.textContent = 'Scroll'
        // For demo, just run fadeUp since scroll trigger needs scroll context
        cleanupRef.current = fadeUp(el, { duration: 1 })
        break
      case 'scrollStagger': {
        el.style.width = '100%'
        el.style.maxWidth = '300px'
        el.style.height = 'auto'
        el.style.background = 'transparent'
        el.style.display = 'flex'
        el.style.gap = '8px'
        el.innerHTML = ''
        for (let i = 0; i < 4; i++) {
          const child = document.createElement('div')
          child.className = 'stagger-child'
          child.style.cssText = `width:50px;height:50px;border-radius:10px;background:#EF7B11;opacity:0;`
          el.appendChild(child)
        }
        gsap.set(el.querySelectorAll('.stagger-child'), { opacity: 0, y: 20 })
        const tween = gsap.to(el.querySelectorAll('.stagger-child'), {
          opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out',
        })
        cleanupRef.current = () => tween.kill()
        break
      }
      case 'scrollCounter': {
        el.style.width = '120px'
        el.style.fontSize = '24px'
        el.style.fontWeight = '800'
        el.textContent = '0'
        const obj = { val: 0 }
        const tw = gsap.to(obj, {
          val: 1500, duration: 2, ease: 'power1.out',
          onUpdate() { el.textContent = Math.round(obj.val).toLocaleString() + '+' },
        })
        cleanupRef.current = () => tw.kill()
        break
      }
      case 'magneticHover':
        el.textContent = 'Hover me'
        el.style.cursor = 'pointer'
        el.style.fontSize = '10px'
        // Simple demo: animate a wiggle
        const tw1 = gsap.to(el, { x: 15, y: -10, duration: 0.3, yoyo: true, repeat: 5, ease: 'power2.inOut' })
        cleanupRef.current = () => tw1.kill()
        break
      case 'buttonHoverFill':
        el.style.width = '140px'
        el.style.height = '44px'
        el.style.borderRadius = '8px'
        el.style.fontSize = '12px'
        el.textContent = 'Hover Fill'
        el.style.overflow = 'hidden'
        el.style.position = 'relative'
        const fill = document.createElement('span')
        fill.style.cssText = 'position:absolute;inset:0;border-radius:inherit;background:rgba(255,255,255,0.25);transform:scaleX(0);transform-origin:left;pointer-events:none;'
        el.appendChild(fill)
        const tw2 = gsap.to(fill, { scaleX: 1, duration: 0.6, ease: 'power2.out', yoyo: true, repeat: 1 })
        cleanupRef.current = () => { tw2.kill(); fill.remove() }
        break
      case 'textRevealLines': {
        el.style.width = '200px'
        el.style.height = 'auto'
        el.style.minHeight = '80px'
        el.style.background = 'transparent'
        el.style.color = dark ? 'white' : '#111'
        el.style.fontSize = '14px'
        el.style.fontWeight = '700'
        el.style.lineHeight = '1.4'
        el.innerHTML = ''
        const lines = ['Il testo appare', 'riga per riga', 'con overflow clip']
        const spans: HTMLElement[] = []
        lines.forEach(line => {
          const wrapper = document.createElement('span')
          wrapper.style.display = 'block'
          wrapper.style.overflow = 'hidden'
          const inner = document.createElement('span')
          inner.style.display = 'block'
          inner.textContent = line
          wrapper.appendChild(inner)
          el.appendChild(wrapper)
          spans.push(inner)
        })
        gsap.set(spans, { yPercent: 110 })
        const tw3 = gsap.to(spans, { yPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
        cleanupRef.current = () => tw3.kill()
        break
      }
      case 'typewriter': {
        el.style.width = '220px'
        el.style.height = 'auto'
        el.style.minHeight = '40px'
        el.style.background = 'transparent'
        el.style.color = dark ? 'white' : '#111'
        el.style.fontSize = '16px'
        el.style.fontWeight = '600'
        el.style.fontFamily = 'monospace'
        el.textContent = ''
        cleanupRef.current = typewriter(el, 'Effetto typewriter!')
        break
      }
      case 'scrollMarquee': {
        el.style.width = '100%'
        el.style.maxWidth = '300px'
        el.style.height = '40px'
        el.style.overflow = 'hidden'
        el.style.background = dark ? 'rgba(255,255,255,0.03)' : '#f3f4f6'
        el.style.borderRadius = '8px'
        el.innerHTML = ''
        const track = document.createElement('div')
        track.style.cssText = 'display:flex;gap:24px;align-items:center;height:100%;white-space:nowrap;width:max-content;'
        const items = ['ABTG', 'Landing', 'Factory', 'Design']
        items.forEach(t => {
          const span = document.createElement('span')
          span.style.cssText = `padding:4px 12px;background:#EF7B11;color:white;border-radius:4px;font-size:11px;font-weight:700;`
          span.textContent = t
          track.appendChild(span)
        })
        const clone = track.innerHTML
        track.innerHTML = clone + clone
        el.appendChild(track)
        gsap.set(track, { xPercent: 0 })
        const tw4 = gsap.to(track, { xPercent: -50, duration: 8, ease: 'none', repeat: -1 })
        cleanupRef.current = () => tw4.kill()
        break
      }
      default:
        el.textContent = anim.name
        break
    }

    // Auto-reset after animation (except continuous ones)
    if (!['scrollMarquee', 'magneticHover', 'scrollCounter'].includes(anim.id)) {
      setTimeout(() => setPlaying(false), 2000)
    }
  }, [anim, dark, resetElement])

  const handleReset = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
    resetElement()
    setPlaying(false)
  }, [resetElement])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) cleanupRef.current()
    }
  }, [])

  return (
    <div className={`overflow-hidden rounded-xl border ${cardBg}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Info */}
        <div className={`flex-1 border-b p-5 lg:border-b-0 lg:border-r ${borderColor}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-mono text-sm font-bold ${textPrimary}`}>{anim.name}</h3>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${cat.bg} ${cat.color}`}>
                  {cat.label}
                </span>
              </div>
              <p className={`mt-1 text-xs ${textSecondary}`}>{anim.description}</p>
            </div>
          </div>

          {/* Signature */}
          <div className={`mt-3 rounded-lg border p-2.5 font-mono text-[11px] leading-relaxed ${
            dark ? 'border-white/5 bg-white/[0.02] text-emerald-400/70' : 'border-gray-100 bg-gray-50 text-emerald-700'
          }`}>
            {anim.signature}
          </div>

          {/* Code toggle */}
          <button
            onClick={() => setShowCode(!showCode)}
            className={`mt-2 flex items-center gap-1 text-[11px] font-semibold transition-colors ${
              dark ? 'text-[#EF7B11]/80 hover:text-[#EF7B11]' : 'text-[#EF7B11] hover:text-[#d96a0e]'
            }`}
          >
            <Code2 className="h-3 w-3" />
            {showCode ? 'Nascondi codice' : 'Mostra esempio'}
          </button>

          {showCode && (
            <pre className={`mt-2 overflow-x-auto rounded-lg border p-3 font-mono text-[11px] leading-relaxed ${
              dark ? 'border-white/5 bg-white/[0.02] text-white/60' : 'border-gray-100 bg-gray-50 text-gray-600'
            }`}>
              {anim.usage}
            </pre>
          )}
        </div>

        {/* Demo area */}
        <div className={`flex w-full flex-col items-center justify-center gap-4 p-6 lg:w-[320px] ${dark ? 'bg-[#0f1115]' : 'bg-gray-50/50'}`}>
          <div className="flex h-28 w-full items-center justify-center">
            <div ref={demoRef} />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={playAnimation}
              className="flex items-center gap-1.5 rounded-lg bg-[#EF7B11] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#d96a0e]"
            >
              <Play className="h-3.5 w-3.5" />
              Play
            </button>
            <button
              onClick={handleReset}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                dark ? 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white/70' : 'border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page Table (reused by dashboard & pagine) ────────────

function PageTable({ pages, dark, cardBg, textPrimary, textSecondary, textMuted, borderColor, hoverRow }: {
  pages: PageRegistryEntry[]; dark: boolean; cardBg: string; textPrimary: string; textSecondary: string; textMuted: string; borderColor: string; hoverRow: string
}) {
  return (
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
  )
}
