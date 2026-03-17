'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════════════
   TYPOGRAPHY SCALE
   ═══════════════════════════════════════════════════════════════════════════ */

const TYPO = {
  hero: 'max(52px, min(2.5rem + 8vw, 8rem))',
  sectionTitle: 'max(28px, min(1.25rem + 3.5vw, 3.5rem))',
  cardTitle: 'max(18px, min(1rem + 0.5vw, 1.35rem))',
  body: 'max(15px, min(0.875rem + 0.2vw, 1.0625rem))',
  small: 'max(12px, min(0.7rem + 0.15vw, 0.875rem))',
  label: 'max(11px, min(0.625rem + 0.15vw, 0.8rem))',
} as const

/* ═══════════════════════════════════════════════════════════════════════════
   DATA CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

const BENEFITS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#D06A11" strokeWidth="1.5" />
        <path d="M10 16l4 4 8-8" stroke="#D06A11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Analisi di Mercato',
    desc: "Impara a leggere il mercato e trovare opportunita' invisibili al 95% delle persone.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4v24M4 16h24" stroke="#D06A11" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="8" stroke="#D06A11" strokeWidth="1.5" />
      </svg>
    ),
    title: "Trovare l'Affare",
    desc: 'Il metodo per immobili sotto mercato: aste, saldo e stralcio, trattative private.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="12" width="22" height="14" rx="2" stroke="#D06A11" strokeWidth="1.5" />
        <path d="M10 12V9a6 6 0 0112 0v3" stroke="#D06A11" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Finanziamento Creativo',
    desc: 'Operazioni anche senza capitale: leva bancaria, cessione del compromesso.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26V10l6-6h14v22" stroke="#D06A11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4v6H6" stroke="#D06A11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 16h10M11 20h7" stroke="#D06A11" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'I Numeri che Contano',
    desc: 'Calcola il ROI prima di investire un euro. Fai i conti come un professionista.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 6h7l-5.5 4.5 2 7L16 17l-6.5 4.5 2-7L6 10h7l3-6z" stroke="#D06A11" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Protezione Legale',
    desc: "Fiscalita', aspetti legali, protezione del patrimonio. Opera in sicurezza.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="18" rx="2" stroke="#D06A11" strokeWidth="1.5" />
        <path d="M4 12h24" stroke="#D06A11" strokeWidth="1.5" />
        <circle cx="16" cy="19" r="3" stroke="#D06A11" strokeWidth="1.5" />
      </svg>
    ),
    title: 'La Tua Prima Operazione',
    desc: 'Workshop pratico: individua e analizza la tua prima operazione reale.',
  },
]

const AGENDA = [
  { day: 1, title: 'Le Fondamenta', desc: "Mindset dell'investitore + Come leggere il mercato immobiliare italiano." },
  { day: 2, title: "Trovare l'Affare", desc: 'Aste, saldo e stralcio, analisi dei numeri. Dove trovare le migliori occasioni.' },
  { day: 3, title: "Strutturare l'Operazione", desc: "Finanziamento, aspetti legali, fiscalita'. Tutto cio' che serve per operare in sicurezza." },
  { day: 4, title: 'La Tua Prima Operazione', desc: "Workshop pratico + piano d'azione personalizzato. Esci con un'operazione reale." },
]

const TESTIMONIALS = [
  { name: 'Marco R.', role: 'Imprenditore, Milano', quote: 'Partito da zero, prima operazione in 3 mesi. ROI del 22%. Il metodo funziona, punto.' },
  { name: 'Giulia S.', role: 'Impiegata, Roma', quote: "Pensavo servissero centinaia di migliaia. Con il finanziamento creativo, prima operazione con meno di 10.000\u20AC." },
  { name: 'Alessandro P.', role: 'Libero Professionista, Torino', quote: 'Il team ti segue davvero. 3 operazioni nel primo anno, cash flow mensile stabile.' },
  { name: 'Francesca M.', role: 'Ex Manager, Napoli', quote: 'Ho lasciato il lavoro dopo 18 mesi. Le rendite hanno superato lo stipendio. Non magia, metodo.' },
]

const FAQ_DATA = [
  { q: "Il workshop e' davvero gratuito?", a: "Si', 100% gratuito. Nessun costo nascosto per i 4 giorni di workshop intensivo." },
  { q: "Perche' serve una chiamata di profilazione?", a: 'Per assicurarci che i 500 posti vadano a persone realmente motivate e pronte ad agire.' },
  { q: 'Serve esperienza immobiliare?', a: 'No, il 70% dei partecipanti parte da zero. Il percorso parte dalle basi e arriva alla pratica.' },
  { q: 'Servono soldi da investire subito?', a: 'No. Imparerai tecniche di finanziamento creativo che richiedono capitale minimo o nullo.' },
  { q: 'Come funziona online?', a: '4 giorni in live streaming interattivo con sessioni Q&A e esercizi pratici in tempo reale.' },
  { q: "Cos'e' Real Estate Evolution?", a: "Il percorso completo post-workshop: 70+ video lezioni, software Real Estate Pro, 4h di coaching 1:1." },
]

const MEDIA_PILLS = ['RAI', 'CORRIERE', 'SOLE 24 ORE', 'FORBES']

const TARGET_DATE = new Date('2026-04-21T09:30:00+02:00').getTime()

const MARQUEE_TEXT = 'WORKSHOP GRATUITO \u2014 4 GIORNI \u2014 500 POSTI \u2014 ALFIO BARDOLLA'

/* ═══════════════════════════════════════════════════════════════════════════
   KEYFRAME ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */

const KEYFRAMES = `
  @keyframes mi-marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes mi-glow-pulse {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  @keyframes mi-float-1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(15px, -20px) rotate(1deg); }
    66% { transform: translate(-10px, -10px) rotate(-0.5deg); }
  }

  @keyframes mi-float-2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-20px, -25px); }
  }

  @keyframes mi-shine {
    0% { left: -100%; }
    100% { left: 200%; }
  }

  @keyframes mi-pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(208,106,17,0.4); }
    70% { box-shadow: 0 0 0 12px rgba(208,106,17,0); }
  }

  @keyframes mi-gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* ─── Page ──────────────────────────────────────────────────────────── */
  .mi-page {
    font-family: 'Inter', system-ui, sans-serif;
    color: #1A1A2E;
    background: #F3F4F6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    scroll-behavior: smooth;
  }

  /* ─── Marquee ───────────────────────────────────────────────────────── */
  .mi-marquee-bar {
    background: linear-gradient(90deg, #D06A11, #e8852a, #D06A11);
    background-size: 200% 100%;
    animation: mi-gradient-shift 4s ease infinite;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px 0;
  }
  .mi-marquee-track {
    display: inline-flex;
    animation: mi-marquee 20s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* ─── Floating orbs ─────────────────────────────────────────────────── */
  .mi-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    z-index: 0;
  }
  .mi-orb-1 {
    width: clamp(300px, 40vw, 700px);
    height: clamp(300px, 40vw, 700px);
    background: rgba(208, 106, 17, 0.06);
    top: 10%;
    left: -10%;
    animation: mi-float-1 15s ease-in-out infinite;
  }
  .mi-orb-2 {
    width: clamp(200px, 30vw, 500px);
    height: clamp(200px, 30vw, 500px);
    background: rgba(50, 177, 92, 0.04);
    bottom: 5%;
    right: -5%;
    animation: mi-float-2 18s ease-in-out infinite;
  }
  .mi-orb-3 {
    width: clamp(250px, 35vw, 600px);
    height: clamp(250px, 35vw, 600px);
    background: rgba(208, 106, 17, 0.05);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: mi-glow-pulse 6s ease-in-out infinite;
  }

  /* ─── Noise texture overlay ─────────────────────────────────────────── */
  .mi-noise {
    position: absolute;
    inset: 0;
    opacity: 0.015;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
    pointer-events: none;
    z-index: 1;
  }

  /* ─── Grid lines overlay ────────────────────────────────────────────── */
  .mi-grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(208,106,17,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(208,106,17,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 1;
    mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%);
  }

  /* ─── Glass card ────────────────────────────────────────────────────── */
  .mi-glass {
    background: #FFFFFF;
    border: 1px solid rgba(208, 106, 17, 0.12);
    border-radius: 1.25rem;
    padding: clamp(1.5rem, 3vw, 2.5rem);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s, box-shadow 0.3s;
    will-change: transform, opacity;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  }
  .mi-glass:hover {
    border-color: rgba(208, 106, 17, 0.35);
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(208, 106, 17, 0.08), 0 4px 12px rgba(0,0,0,0.04);
  }

  /* ─── CTA Button ────────────────────────────────────────────────────── */
  .mi-cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: clamp(1rem, 1.5vw, 1.25rem) clamp(2rem, 4vw, 3rem);
    background: linear-gradient(135deg, #32B15C 0%, #28a04f 100%);
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.3s;
    box-shadow: 0 4px 30px rgba(50, 177, 92, 0.3), inset 0 1px 0 rgba(255,255,255,0.15);
    font-family: inherit;
  }
  .mi-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    animation: mi-shine 3s ease-in-out infinite;
  }
  .mi-cta:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 40px rgba(50, 177, 92, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
  }

  /* ─── FAQ ────────────────────────────────────────────────────────────── */
  .mi-faq-q {
    width: 100%;
    background: none;
    border: none;
    padding: clamp(1.25rem, 2vw, 1.75rem) 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    color: #1A1A2E;
    text-align: left;
    transition: color 0.2s;
  }
  .mi-faq-q:hover { color: #D06A11; }
  .mi-faq-answer {
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.3s;
    max-height: 0;
    opacity: 0;
  }
  .mi-faq-answer[data-open="true"] { max-height: 12rem; opacity: 1; }

  /* ─── Testimonial cards ─────────────────────────────────────────────── */
  .mi-testimonial-card {
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.3s;
  }
  .mi-testimonial-card:nth-child(odd):hover {
    transform: translateY(-6px) rotate(-0.5deg);
    border-color: rgba(208, 106, 17, 0.35);
    box-shadow: 0 20px 60px rgba(208, 106, 17, 0.08);
  }
  .mi-testimonial-card:nth-child(even):hover {
    transform: translateY(-6px) rotate(0.5deg);
    border-color: rgba(208, 106, 17, 0.35);
    box-shadow: 0 20px 60px rgba(208, 106, 17, 0.08);
  }

  /* ─── Input ─────────────────────────────────────────────────────────── */
  .mi-input {
    width: 100%;
    padding: clamp(0.9rem, 1.2vw, 1.1rem) clamp(1rem, 1.5vw, 1.25rem);
    background: #FFFFFF;
    border: 1.5px solid rgba(26,26,46,0.12);
    border-radius: 0.75rem;
    color: #1A1A2E;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(4px);
  }
  .mi-input::placeholder { color: rgba(26,26,46,0.35); }
  .mi-input:focus { border-color: rgba(208,106,17,0.5); box-shadow: 0 0 0 3px rgba(208,106,17,0.08); }

  /* ─── Responsive grids ──────────────────────────────────────────────── */
  .mi-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: clamp(1rem,2vw,1.5rem); }
  .mi-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: clamp(1rem,2vw,1.5rem); }
  @media (max-width:960px) {
    .mi-grid-3 { grid-template-columns: repeat(2,1fr); }
    .mi-speaker-grid { grid-template-columns: 1fr !important; }
    .mi-form-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width:560px) {
    .mi-grid-3, .mi-grid-2 { grid-template-columns: 1fr; }
    .mi-stats-row { flex-wrap: wrap !important; }
    .mi-stat-cell { min-width: 50% !important; border-right: none !important; }
    .mi-stat-cell:nth-child(odd) { border-right: 1px solid rgba(208,106,17,0.1) !important; }
    .mi-stat-cell:nth-child(1), .mi-stat-cell:nth-child(2) { border-bottom: 1px solid rgba(208,106,17,0.1) !important; }
  }
  @media (max-width:480px) {
    .mi-floating-text { display: none !important; }
  }

  /* ─── Mobile-specific refinements ──────────────────────────────────── */
  @media (max-width:640px) {
    .mi-page { line-height: 1.6; }

    /* Hero: tighter vertical padding on mobile */
    .mi-hero-section {
      min-height: auto !important;
      padding-top: clamp(5rem, 12vh, 7rem) !important;
      padding-bottom: clamp(3rem, 8vh, 5rem) !important;
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
    }

    /* Countdown boxes: compact 2×2 grid on mobile */
    .mi-countdown-row {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 0.75rem !important;
    }
    .mi-countdown-cell {
      min-width: unset !important;
      padding: 1.25rem 0.75rem !important;
    }

    /* Speaker grid: photo smaller on mobile */
    .mi-speaker-photo {
      aspect-ratio: 1/1 !important;
      max-width: 280px !important;
      margin: 0 auto !important;
    }

    /* Glass cards: tighter padding on mobile */
    .mi-glass {
      padding: 1.25rem !important;
      border-radius: 1rem !important;
    }

    /* Section paddings: less vertical space on mobile */
    .mi-section-inner {
      padding-top: clamp(3rem, 8vw, 5rem) !important;
      padding-bottom: clamp(3rem, 8vw, 5rem) !important;
      padding-left: 1.25rem !important;
      padding-right: 1.25rem !important;
    }

    /* Floating CTA bar: full-width button */
    .mi-floating-bar {
      padding: 0.75rem 1rem !important;
    }
    .mi-floating-bar .mi-cta {
      width: 100% !important;
      padding: 0.85rem 1.5rem !important;
      font-size: max(13px, min(0.75rem + 0.2vw, 0.875rem)) !important;
    }

    /* Form section: stack vertically */
    .mi-form-grid {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }

    /* Agenda items: tighter */
    .mi-agenda-item {
      gap: 1rem !important;
    }
    .mi-agenda-circle {
      width: 3rem !important;
      height: 3rem !important;
    }

    /* Stats section: compact padding */
    .mi-stat-cell {
      padding: 1.25rem 0.75rem !important;
    }

    /* SVG waves: shorter on mobile */
    .mi-wave-svg {
      height: 30px !important;
    }

    /* Marquee bar: thinner */
    .mi-marquee-bar {
      padding: 7px 0 !important;
    }

    /* Trust indicators: stack vertically */
    .mi-trust-row {
      flex-direction: column !important;
      gap: 0.75rem !important;
    }

    /* Section headings: more bottom margin on mobile */
    .mi-section-header {
      margin-bottom: 2rem !important;
    }

    /* Hero title: smaller on mobile */
    .mi-hero-title {
      font-size: max(36px, min(2rem + 6vw, 4rem)) !important;
    }

    /* CTA buttons: full-width tap target on mobile */
    .mi-cta-mobile-full {
      width: 100% !important;
      padding: 1rem 1.5rem !important;
      font-size: max(14px, 0.875rem) !important;
    }

    /* Hide decorative floating images on mobile */
    .mi-benefits-deco {
      display: none !important;
    }

    /* Speaker image max-height on mobile */
    .mi-speaker-photo {
      max-height: 320px !important;
    }

    /* Gallery section: horizontal scroll on mobile */
    .mi-gallery-grid {
      display: flex !important;
      overflow-x: auto !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      gap: 0.75rem !important;
      padding-bottom: 0.5rem !important;
    }
    .mi-gallery-item {
      min-width: 260px !important;
      scroll-snap-align: start !important;
    }
  }

  /* ─── Scrollbar ─────────────────────────────────────────────────────── */
  .mi-page::-webkit-scrollbar { width: 8px; }
  .mi-page::-webkit-scrollbar-track { background: #F3F4F6; }
  .mi-page::-webkit-scrollbar-thumb { background: #D06A11; border-radius: 4px; }

  /* ─── Section reveal ────────────────────────────────────────────────── */
  .mi-reveal { will-change: transform, opacity; }
`

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MissioneImmobiliarePage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const socialRef = useRef<HTMLElement>(null)
  const benefitsRef = useRef<HTMLElement>(null)
  const speakerRef = useRef<HTMLElement>(null)
  const agendaRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const countdownRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const floatingBarRef = useRef<HTMLDivElement>(null)

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  /* ── Countdown Timer ─────────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, TARGET_DATE - now)
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* ── GSAP Master Timeline & Scroll Animations ────────────────────────── */
  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const ctx = gsap.context(() => {

      /* ─── HERO TIMELINE ──────────────────────────────────────────── */
      const heroTl = gsap.timeline({ delay: 0.5 })
      heroTl
        .fromTo('[data-mi-badge]',
          { scale: 0.8, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.7)' }
        )
        .fromTo('[data-mi-headline]',
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.15 },
          '-=0.3'
        )
        .fromTo('[data-mi-sub]',
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo('[data-mi-cta]',
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('[data-mi-trust]',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
          '-=0.2'
        )

      /* ─── FLOATING BAR ──────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom top',
        onEnter: () => gsap.to(floatingBarRef.current, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out' }),
        onLeaveBack: () => gsap.to(floatingBarRef.current, { y: 60, autoAlpha: 0, duration: 0.3, ease: 'power2.in' }),
      })

      /* ─── SECTION REVEALS ───────────────────────────────────────── */
      page.querySelectorAll('[data-mi-reveal]').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })
      })

      /* ─── COUNTERS ──────────────────────────────────────────────── */
      page.querySelectorAll<HTMLElement>('[data-mi-counter]').forEach(el => {
        const target = parseFloat(el.dataset.miTarget || '0')
        const suffix = el.dataset.miSuffix || ''
        const isDecimal = el.dataset.miDecimal === 'true'
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: socialRef.current, start: 'top 80%', toggleActions: 'play none none reset' },
          onUpdate: () => {
            el.textContent = isDecimal ? obj.val.toFixed(1) + suffix : Math.round(obj.val).toLocaleString('it-IT') + suffix
          },
        })
      })

      /* ─── BENEFITS STAGGER ──────────────────────────────────────── */
      gsap.fromTo('[data-mi-benefit]',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out',
          stagger: { each: 0.1, from: 'start' },
          scrollTrigger: { trigger: benefitsRef.current, start: 'top 75%', toggleActions: 'play none none reset' },
        }
      )

      /* ─── SPEAKER ───────────────────────────────────────────────── */
      gsap.fromTo('[data-mi-speaker-img]',
        { x: -80, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: speakerRef.current, start: 'top 70%' } }
      )
      gsap.fromTo('[data-mi-speaker-text]',
        { x: 80, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: speakerRef.current, start: 'top 70%' } }
      )

      /* ─── AGENDA STAGGER ────────────────────────────────────────── */
      gsap.fromTo('[data-mi-agenda]',
        { x: -60, autoAlpha: 0 },
        {
          x: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: agendaRef.current, start: 'top 75%' },
        }
      )

      /* ─── TESTIMONIALS STAGGER ──────────────────────────────────── */
      gsap.fromTo('[data-mi-testimonial]',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: { each: 0.12 },
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 75%' },
        }
      )

      /* ─── COUNTDOWN ─────────────────────────────────────────────── */
      gsap.fromTo('[data-mi-cd]',
        { scale: 0.8, autoAlpha: 0 },
        {
          scale: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.1,
          scrollTrigger: { trigger: countdownRef.current, start: 'top 80%' },
        }
      )

      /* ─── FORM ──────────────────────────────────────────────────── */
      gsap.fromTo('[data-mi-form]',
        { y: 50, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        }
      )

      /* ─── PARALLAX on orbs ──────────────────────────────────────── */
      gsap.to('.mi-orb-1', { yPercent: -20, ease: 'none', scrollTrigger: { trigger: page, start: 'top top', end: 'bottom bottom', scrub: true } })
      gsap.to('.mi-orb-3', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: page, start: 'top top', end: 'bottom bottom', scrub: true } })

    }, page)

    return () => ctx.revert()
  }, [])

  /* ── FAQ toggle ──────────────────────────────────────────────────────── */
  const toggleFaq = useCallback((i: number) => setOpenFaq((prev) => (prev === i ? null : i)), [])

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div ref={pageRef} className="mi-page">
      <style>{KEYFRAMES}</style>

      {/* ════════════════════════════════════════════════════════════════════
          MARQUEE TICKER BAR
          ════════════════════════════════════════════════════════════════════ */}
      <div className="mi-marquee-bar" style={{ position: 'relative', zIndex: 110 }}>
        <div className="mi-marquee-track">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} style={{
              color: '#fff',
              fontWeight: 800,
              fontSize: TYPO.label,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              paddingRight: '3rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              {MARQUEE_TEXT}
              <span style={{
                display: 'inline-block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.5)',
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="mi-hero-section" style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(6rem, 14vh, 10rem) clamp(1.25rem, 5vw, 4rem)',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse 80% 60% at 50% 100%, rgba(208,106,17,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 20% 20%, rgba(50,177,92,0.03) 0%, transparent 50%),
          linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)
        `,
      }}>
        {/* Hero background image - glass skyscrapers */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.07,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Hero animated mesh background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(at 20% 80%, rgba(208,106,17,0.06) 0%, transparent 50%),
            radial-gradient(at 80% 20%, rgba(50,177,92,0.03) 0%, transparent 50%),
            radial-gradient(at 50% 50%, rgba(208,106,17,0.04) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Noise texture */}
        <div className="mi-noise" />

        {/* Grid lines overlay */}
        <div className="mi-grid-overlay" />

        {/* Floating orbs */}
        <div className="mi-orb mi-orb-1" />
        <div className="mi-orb mi-orb-2" />
        <div className="mi-orb mi-orb-3" />

        {/* Hero content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '65rem' }}>

          {/* Badge */}
          <div data-mi-badge style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.5rem',
            border: '1px solid rgba(208,106,17,0.4)',
            borderRadius: '100px',
            background: 'rgba(208,106,17,0.08)',
            fontSize: TYPO.label,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#D06A11',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            backdropFilter: 'blur(8px)',
            opacity: 0,
            visibility: 'hidden' as const,
          }}>
            <span style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#D06A11',
              boxShadow: '0 0 12px rgba(208,106,17,0.6)',
            }} />
            WORKSHOP GRATUITO &mdash; 4 GIORNI
          </div>

          {/* Headline: MISSIONE */}
          <div className="mi-headline-wrap" style={{ overflow: 'hidden', lineHeight: 1 }}>
            <div data-mi-headline className="mi-hero-title" style={{
              fontSize: TYPO.hero,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#1A1A2E',
              opacity: 0,
              visibility: 'hidden' as const,
              willChange: 'transform',
            }}>
              MISSIONE
            </div>
          </div>

          {/* Headline: IMMOBILIARE */}
          <div className="mi-headline-wrap" style={{ overflow: 'hidden', lineHeight: 1 }}>
            <div data-mi-headline className="mi-hero-title" style={{
              fontSize: TYPO.hero,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#D06A11',
              opacity: 0,
              visibility: 'hidden' as const,
              willChange: 'transform',
            }}>
              IMMOBILIARE
            </div>
          </div>

          {/* Subheadline */}
          <p data-mi-sub style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontSize: TYPO.body,
            lineHeight: 1.75,
            color: 'rgba(26, 26, 46, 0.65)',
            maxWidth: '42rem',
            opacity: 0,
            visibility: 'hidden' as const,
          }}>
            4 giorni di workshop intensivo con Alfio Bardolla e il suo team per mettere in piedi
            la tua prima operazione immobiliare &mdash; anche se parti da zero.
          </p>

          {/* CTA */}
          <div style={{
            marginTop: 'clamp(2rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <a data-mi-cta href="#candidati" className="mi-cta mi-cta-mobile-full" style={{
              fontSize: TYPO.body,
              opacity: 0,
              visibility: 'hidden' as const,
            }}>
              CANDIDATI ORA &mdash; POSTI LIMITATI
            </a>

            <a href="#programma" data-mi-cta style={{
              color: 'rgba(26, 26, 46, 0.5)',
              textDecoration: 'none',
              fontSize: TYPO.body,
              fontWeight: 500,
              letterSpacing: '0.02em',
              opacity: 0,
              visibility: 'hidden' as const,
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: '0.5rem 1rem',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#D06A11' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26, 26, 46, 0.5)' }}
            >
              Scopri il Programma &darr;
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mi-trust-row" style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}>
            {['GRATUITO', '500 POSTI MAX', '4 GIORNI INTENSIVI'].map((text, i) => (
              <span key={i} data-mi-trust style={{
                fontSize: TYPO.label,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(26, 26, 46, 0.4)',
                opacity: 0,
                visibility: 'hidden' as const,
              }}>
                &#10003; {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SVG WAVE SEPARATOR (hero → stats)
          ════════════════════════════════════════════════════════════════════ */}
      <svg className="mi-wave-svg" style={{ display: 'block', width: '100%', height: 'auto', marginTop: -1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,40 C360,10 720,60 1080,25 C1260,12 1380,30 1440,20 L1440,60 L0,60Z" fill="#FFFFFF" />
      </svg>

      {/* ════════════════════════════════════════════════════════════════════
          2. SOCIAL PROOF BAR
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={socialRef} style={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(208,106,17,0.1)',
        borderBottom: '1px solid rgba(208,106,17,0.1)',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.25rem, 5vw, 4rem)',
      }}>
        <div className="mi-stats-row" data-mi-reveal style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 0,
          maxWidth: '70rem',
          margin: '0 auto',
        }}>
          {[
            { target: '500000', suffix: '+', label: 'Persone Formate' },
            { target: '15', suffix: '+', label: 'Anni di Esperienza' },
            { target: '4.8', suffix: '/5', label: 'Trustpilot', decimal: true },
            { target: '1200', suffix: '+', label: 'Operazioni Immobiliari' },
          ].map((stat, i) => (
            <div key={i} className="mi-stat-cell" style={{
              flex: '1 1 0',
              minWidth: 140,
              textAlign: 'center',
              padding: 'clamp(2rem, 4vw, 3rem) clamp(1rem, 2vw, 2rem)',
              borderRight: i < 3 ? '1px solid rgba(208,106,17,0.1)' : 'none',
            }}>
              <div
                data-mi-counter
                data-mi-target={stat.target}
                data-mi-suffix={stat.suffix}
                {...(stat.decimal ? { 'data-mi-decimal': 'true' } : {})}
                style={{
                  fontSize: TYPO.sectionTitle,
                  fontWeight: 900,
                  color: '#D06A11',
                  lineHeight: 1.1,
                  textShadow: '0 0 40px rgba(208,106,17,0.3)',
                }}
              >
                0
              </div>
              <div style={{
                fontSize: TYPO.label,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(26, 26, 46, 0.4)',
                marginTop: '0.5rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Media pills */}
        <div data-mi-reveal style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'clamp(0.75rem, 1.5vw, 1.5rem)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) 1rem 0',
          maxWidth: '60rem',
          margin: '0 auto',
        }}>
          <span style={{
            fontSize: TYPO.label,
            fontWeight: 500,
            color: 'rgba(26, 26, 46, 0.35)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            Visto su:
          </span>
          {MEDIA_PILLS.map((m) => (
            <span key={m} style={{
              padding: '0.35rem 1rem',
              border: '1px solid rgba(208,106,17,0.15)',
              borderRadius: '100px',
              fontSize: TYPO.label,
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'rgba(26, 26, 46, 0.4)',
              textTransform: 'uppercase',
            }}>
              {m}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HR Divider
          ════════════════════════════════════════════════════════════════════ */}
      <hr style={{
        border: 'none',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(208,106,17,0.15), transparent)',
        margin: 0,
      }} />

      {/* ════════════════════════════════════════════════════════════════════
          3. BENEFITS GRID
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={benefitsRef} id="programma" style={{
        background: `
          radial-gradient(ellipse 40% 30% at 80% 20%, rgba(208,106,17,0.05) 0%, transparent 50%),
          #F3F4F6
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative floating real estate images (desktop only) */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
          alt=""
          aria-hidden="true"
          className="mi-benefits-deco"
          style={{
            position: 'absolute',
            top: '8%',
            right: '-3%',
            width: '280px',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '1rem',
            opacity: 0.09,
            transform: 'rotate(4deg)',
            filter: 'blur(1.5px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
          alt=""
          aria-hidden="true"
          className="mi-benefits-deco"
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '-2%',
            width: '240px',
            height: '170px',
            objectFit: 'cover',
            borderRadius: '1rem',
            opacity: 0.08,
            transform: 'rotate(-3deg)',
            filter: 'blur(1.5px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
          alt=""
          aria-hidden="true"
          className="mi-benefits-deco"
          style={{
            position: 'absolute',
            top: '55%',
            right: '5%',
            width: '200px',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '1rem',
            opacity: 0.07,
            transform: 'rotate(-2deg)',
            filter: 'blur(2px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div className="mi-noise" />
        <div className="mi-section-inner" style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-reveal>
            <p style={{
              fontSize: TYPO.label,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D06A11',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}>
              IL PROGRAMMA
            </p>
            <h2 style={{
              fontSize: TYPO.sectionTitle,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1A1A2E',
              marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            }}>
              Cosa Imparerai in 4 Giorni
            </h2>
            <p style={{
              fontSize: TYPO.body,
              lineHeight: 1.7,
              color: 'rgba(26, 26, 46, 0.65)',
              maxWidth: '40rem',
            }}>
              Un percorso pratico, non teoria. Alla fine avrai il tuo piano operativo.
            </p>
          </div>

          <div className="mi-grid-3" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} data-mi-benefit className="mi-glass" style={{ opacity: 0 }}>
                <div style={{
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '3.25rem',
                  height: '3.25rem',
                  borderRadius: '0.75rem',
                  background: 'rgba(208, 106, 17, 0.1)',
                  border: '1px solid rgba(208, 106, 17, 0.15)',
                }}>
                  {b.icon}
                </div>
                <div style={{
                  fontSize: TYPO.cardTitle,
                  fontWeight: 700,
                  color: '#1A1A2E',
                  marginBottom: '0.5rem',
                }}>
                  {b.title}
                </div>
                <div style={{
                  fontSize: TYPO.body,
                  lineHeight: 1.65,
                  color: 'rgba(26, 26, 46, 0.65)',
                }}>
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SVG WAVE SEPARATOR
          ════════════════════════════════════════════════════════════════════ */}
      <svg className="mi-wave-svg" style={{ display: 'block', width: '100%', height: 'auto', marginTop: -1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,20 C180,50 540,5 900,35 C1100,48 1320,15 1440,30 L1440,60 L0,60Z" fill="#FFFFFF" />
      </svg>

      {/* ════════════════════════════════════════════════════════════════════
          4. SPEAKER BIO
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={speakerRef} style={{
        background: `
          radial-gradient(ellipse 50% 40% at 20% 50%, rgba(208,106,17,0.06) 0%, transparent 50%),
          #FFFFFF
        `,
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div className="mi-speaker-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center',
          }}>
            {/* Speaker photo */}
            <div data-mi-speaker-img className="mi-speaker-photo" style={{
              position: 'relative',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, rgba(208,106,17,0.15) 0%, rgba(208,106,17,0.03) 100%)',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              border: '1px solid rgba(208, 106, 17, 0.2)',
              opacity: 0,
              visibility: 'hidden' as const,
            }}>
              <img
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80"
                alt="Speaker on stage - Alfio Bardolla"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Decorative corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '5rem',
                height: '5rem',
                background: 'linear-gradient(135deg, rgba(208,106,17,0.4) 0%, transparent 60%)',
                borderRadius: '0 1.25rem 0 0',
                zIndex: 1,
              }} />
              {/* Bottom glow */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'linear-gradient(to top, rgba(208,106,17,0.25) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 1,
              }} />
            </div>

            {/* Text content */}
            <div data-mi-speaker-text style={{ opacity: 0, visibility: 'hidden' as const }}>
              <p style={{
                fontSize: TYPO.label,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D06A11',
                marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              }}>
                LO SPEAKER
              </p>
              <h2 style={{
                fontSize: TYPO.sectionTitle,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#1A1A2E',
                marginBottom: '0.5rem',
              }}>
                Alfio Bardolla
              </h2>
              <p style={{
                fontSize: TYPO.body,
                color: 'rgba(26, 26, 46, 0.5)',
                fontWeight: 500,
                marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
              }}>
                Imprenditore, investitore, autore best-seller
              </p>
              <p style={{
                fontSize: TYPO.body,
                lineHeight: 1.75,
                color: 'rgba(26, 26, 46, 0.65)',
                marginBottom: 'clamp(1.5rem, 2.5vw, 2rem)',
              }}>
                Fondatore di ABTG S.p.A., unica azienda di formazione finanziaria quotata in Borsa Italiana.
                Ha formato oltre 500.000 persone sui temi dell&apos;investimento immobiliare, della
                gestione patrimoniale e della liberta&apos; finanziaria.
              </p>

              {[
                'Fondatore ABTG S.p.A. \u2014 quotata in Borsa',
                'Autore di 9 best-seller sul denaro e gli investimenti',
                '15+ anni di esperienza nel real estate',
                '1.200+ operazioni immobiliari seguite con il team',
              ].map((cred, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  marginTop: '0.75rem',
                  fontSize: TYPO.body,
                  lineHeight: 1.5,
                  color: 'rgba(26, 26, 46, 0.75)',
                }}>
                  <span style={{
                    flexShrink: 0,
                    color: '#D06A11',
                    fontSize: '1.1rem',
                    lineHeight: 1.5,
                  }}>&#10003;</span>
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HR Divider
          ════════════════════════════════════════════════════════════════════ */}
      <hr style={{
        border: 'none',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(208,106,17,0.15), transparent)',
        margin: 0,
      }} />

      {/* ════════════════════════════════════════════════════════════════════
          5. EVENT AGENDA (Timeline)
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={agendaRef} style={{
        background: '#F3F4F6',
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-reveal>
            <p style={{
              fontSize: TYPO.label,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D06A11',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}>
              L&apos;AGENDA
            </p>
            <h2 style={{
              fontSize: TYPO.sectionTitle,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1A1A2E',
              marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            }}>
              4 Giorni che Cambieranno il Tuo Approccio
            </h2>
          </div>

          <div style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {AGENDA.map((item, i) => (
              <div
                key={i}
                data-mi-agenda
                className="mi-agenda-item"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'clamp(1.25rem, 2.5vw, 2rem)',
                  position: 'relative',
                  opacity: 0,
                  visibility: 'hidden' as const,
                }}
              >
                {/* Vertical connector line */}
                {i < AGENDA.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: 'calc(clamp(3.5rem, 6vw, 4.5rem) / 2 - 1px)',
                    top: 'clamp(3.5rem, 6vw, 4.5rem)',
                    bottom: 'calc(-1 * clamp(1.5rem, 3vw, 2.5rem))',
                    width: 2,
                    background: 'linear-gradient(to bottom, rgba(208, 106, 17, 0.3), rgba(208, 106, 17, 0.05))',
                  }} />
                )}

                {/* Day circle with pulse */}
                <div className="mi-agenda-circle" style={{
                  flexShrink: 0,
                  width: 'clamp(3.5rem, 6vw, 4.5rem)',
                  height: 'clamp(3.5rem, 6vw, 4.5rem)',
                  borderRadius: '50%',
                  background: 'rgba(208, 106, 17, 0.1)',
                  border: '2px solid rgba(208, 106, 17, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: TYPO.cardTitle,
                  fontWeight: 800,
                  color: '#D06A11',
                  animation: 'mi-pulse-dot 3s ease-out infinite',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {item.day}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                  <div style={{
                    fontSize: TYPO.cardTitle,
                    fontWeight: 700,
                    color: '#1A1A2E',
                    marginBottom: '0.35rem',
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: TYPO.body,
                    lineHeight: 1.65,
                    color: 'rgba(26, 26, 46, 0.6)',
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SVG WAVE SEPARATOR (reversed)
          ════════════════════════════════════════════════════════════════════ */}
      <svg className="mi-wave-svg" style={{ display: 'block', width: '100%', height: 'auto', marginTop: -1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C120,48 360,5 720,40 C900,52 1200,10 1440,25 L1440,60 L0,60Z" fill="#FFFFFF" />
      </svg>

      {/* ════════════════════════════════════════════════════════════════════
          6. TESTIMONIALS
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={testimonialsRef} style={{
        background: `
          radial-gradient(ellipse 40% 30% at 60% 80%, rgba(50,177,92,0.03) 0%, transparent 50%),
          #FFFFFF
        `,
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-reveal>
            <p style={{
              fontSize: TYPO.label,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D06A11',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}>
              TESTIMONIANZE
            </p>
            <h2 style={{
              fontSize: TYPO.sectionTitle,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1A1A2E',
              marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            }}>
              Risultati Reali di Persone Reali
            </h2>
          </div>

          <div className="mi-grid-2" style={{ marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} data-mi-testimonial className="mi-glass mi-testimonial-card" style={{
                position: 'relative',
                opacity: 0,
                willChange: 'transform, opacity',
              }}>
                {/* Decorative quote mark */}
                <div className="mi-quote-mark" style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  fontFamily: 'Georgia, serif',
                  color: 'rgba(208, 106, 17, 0.08)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}>
                  &ldquo;
                </div>

                {/* Stars */}
                <div style={{
                  color: '#D06A11',
                  fontSize: '1rem',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem',
                }}>
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: TYPO.body,
                  lineHeight: 1.7,
                  color: 'rgba(26, 26, 46, 0.75)',
                  fontStyle: 'italic',
                  marginBottom: '1.25rem',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  {/* Avatar initials */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#D06A11',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.02em',
                    flexShrink: 0,
                  }}>
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontSize: TYPO.body,
                      fontWeight: 600,
                      color: '#1A1A2E',
                    }}>
                      {t.name}
                    </div>
                    <div style={{
                      fontSize: TYPO.label,
                      color: 'rgba(26, 26, 46, 0.4)',
                      marginTop: '0.15rem',
                    }}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HR Divider
          ════════════════════════════════════════════════════════════════════ */}
      <hr style={{
        border: 'none',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(208,106,17,0.15), transparent)',
        margin: 0,
      }} />

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY MINI-SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#F3F4F6',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="mi-noise" />
        <div className="mi-section-inner" data-mi-reveal style={{
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{
            fontSize: TYPO.label,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(26, 26, 46, 0.4)',
            textAlign: 'center',
            marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)',
          }}>
            Le opportunita&apos; sono ovunque in Italia
          </p>
          <div className="mi-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          }}>
            {[
              { src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', alt: 'Villa moderna con piscina' },
              { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', alt: 'Appartamento moderno luminoso' },
              { src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', alt: 'Casa elegante con giardino' },
              { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', alt: 'Edificio residenziale di lusso' },
            ].map((img, i) => (
              <div key={i} className="mi-gallery-item" style={{
                borderRadius: '1rem',
                overflow: 'hidden',
                aspectRatio: '16/10',
                position: 'relative',
                border: '1px solid rgba(208, 106, 17, 0.1)',
              }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HR Divider (gallery → FAQ)
          ════════════════════════════════════════════════════════════════════ */}
      <hr style={{
        border: 'none',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(208,106,17,0.15), transparent)',
        margin: 0,
      }} />

      {/* ════════════════════════════════════════════════════════════════════
          7. FAQ ACCORDION
          ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#F3F4F6',
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-reveal>
            <p style={{
              fontSize: TYPO.label,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D06A11',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
            }}>
              DOMANDE FREQUENTI
            </p>
            <h2 style={{
              fontSize: TYPO.sectionTitle,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1A1A2E',
              marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
            }}>
              Hai Domande? Abbiamo Risposte.
            </h2>
          </div>

          <div style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            maxWidth: '50rem',
          }}>
            {FAQ_DATA.map((faq, i) => (
              <div key={i} data-mi-reveal style={{
                borderBottom: '1px solid rgba(208,106,17,0.08)',
              }}>
                <button
                  className="mi-faq-q"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                  data-active={openFaq === i ? 'true' : 'false'}
                  style={{
                    fontSize: TYPO.body,
                    color: openFaq === i ? '#D06A11' : '#1A1A2E',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{
                    flexShrink: 0,
                    width: '1.5rem',
                    height: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 300,
                    color: openFaq === i ? '#D06A11' : 'rgba(26, 26, 46, 0.35)',
                    transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), color 0.2s',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </button>
                <div className="mi-faq-answer" data-open={openFaq === i ? 'true' : 'false'}>
                  <div style={{
                    padding: '0 0 clamp(1.25rem, 2vw, 1.75rem) 0',
                    fontSize: TYPO.body,
                    lineHeight: 1.7,
                    color: 'rgba(26, 26, 46, 0.6)',
                  }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HR Divider
          ════════════════════════════════════════════════════════════════════ */}
      <hr style={{
        border: 'none',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(208,106,17,0.15), transparent)',
        margin: 0,
      }} />

      {/* ════════════════════════════════════════════════════════════════════
          8. COUNTDOWN + CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={countdownRef} style={{
        background: `
          radial-gradient(ellipse 60% 50% at 50% 50%, rgba(208,106,17,0.06) 0%, transparent 60%),
          #FFFFFF
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle background real estate image */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.04,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-reveal>
            <p style={{
              fontSize: TYPO.label,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#D06A11',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              textAlign: 'center',
            }}>
              IL TEMPO SCORRE
            </p>
            <h2 style={{
              fontSize: TYPO.sectionTitle,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1A1A2E',
              textAlign: 'center',
            }}>
              Non Rimandare. Agisci Ora.
            </h2>
          </div>

          {/* Countdown boxes */}
          <div className="mi-countdown-row" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1rem, 2.5vw, 2rem)',
            margin: 'clamp(2rem, 4vw, 3rem) 0',
          }}>
            {[
              { value: countdown.days, label: 'GIORNI' },
              { value: countdown.hours, label: 'ORE' },
              { value: countdown.minutes, label: 'MINUTI' },
              { value: countdown.seconds, label: 'SECONDI' },
            ].map((c, i) => (
              <div key={i} data-mi-cd className="mi-countdown-cell" style={{
                textAlign: 'center',
                padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 2.5vw, 2rem)',
                background: 'rgba(208, 106, 17, 0.06)',
                border: '1px solid rgba(208, 106, 17, 0.15)',
                borderRadius: '1rem',
                backdropFilter: 'blur(8px)',
                minWidth: 'clamp(4.5rem, 9vw, 7rem)',
                opacity: 0,
                visibility: 'hidden' as const,
              }}>
                <div style={{
                  fontSize: TYPO.sectionTitle,
                  fontWeight: 900,
                  color: '#D06A11',
                  lineHeight: 1.1,
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: '0 0 40px rgba(208,106,17,0.3)',
                }}>
                  {String(c.value).padStart(2, '0')}
                </div>
                <div style={{
                  fontSize: TYPO.label,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(26, 26, 46, 0.4)',
                  marginTop: '0.35rem',
                }}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: TYPO.body,
            color: 'rgba(26, 26, 46, 0.6)',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            Solo <strong style={{ color: '#D06A11' }}>500 posti</strong> disponibili. La candidatura e&apos; gratuita.
          </p>

          <a href="#candidati" className="mi-cta" style={{ fontSize: TYPO.body }}>
            CANDIDATI ORA &mdash; E&apos; GRATUITO
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SVG WAVE SEPARATOR
          ════════════════════════════════════════════════════════════════════ */}
      <svg className="mi-wave-svg" style={{ display: 'block', width: '100%', height: 'auto', marginTop: -1 }} viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,35 C240,55 480,10 720,30 C960,50 1200,15 1440,40 L1440,60 L0,60Z" fill="#F3F4F6" />
      </svg>

      {/* ════════════════════════════════════════════════════════════════════
          9. REGISTRATION FORM
          ════════════════════════════════════════════════════════════════════ */}
      <section ref={formRef} id="candidati" style={{
        background: `
          radial-gradient(ellipse 40% 40% at 70% 30%, rgba(50,177,92,0.03) 0%, transparent 50%),
          #F3F4F6
        `,
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{
          padding: 'clamp(5rem, 12vw, 10rem) clamp(1.25rem, 5vw, 4rem)',
          maxWidth: '80rem',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div data-mi-form className="mi-form-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'start',
            opacity: 0,
            visibility: 'hidden' as const,
          }}>
            {/* Form side */}
            <div>
              <p style={{
                fontSize: TYPO.label,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D06A11',
                marginBottom: 'clamp(0.75rem, 1.5vw, 1.25rem)',
              }}>
                CANDIDATURA
              </p>
              <h2 style={{
                fontSize: TYPO.sectionTitle,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#1A1A2E',
                marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
              }}>
                Prenota il Tuo Posto
              </h2>

              <form onSubmit={(e) => e.preventDefault()} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(0.75rem, 1.5vw, 1rem)',
              }}>
                <input
                  className="mi-input"
                  type="text"
                  placeholder="Nome e Cognome"
                  style={{ fontSize: TYPO.body }}
                />
                <input
                  className="mi-input"
                  type="email"
                  placeholder="Email"
                  style={{ fontSize: TYPO.body }}
                />
                <input
                  className="mi-input"
                  type="tel"
                  placeholder="Telefono"
                  style={{ fontSize: TYPO.body }}
                />
                <button type="submit" className="mi-cta" style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  fontSize: TYPO.body,
                }}>
                  CANDIDATI ORA &mdash; POSTI LIMITATI
                </button>
                <p style={{
                  fontSize: TYPO.small,
                  color: 'rgba(26, 26, 46, 0.35)',
                  lineHeight: 1.5,
                  marginTop: '0.5rem',
                }}>
                  Inviando il form accetti di essere contattato per la chiamata di profilazione gratuita.
                </p>
              </form>
            </div>

            {/* Benefits side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.5vw, 2rem)' }}>
              <div className="mi-glass" style={{
                background: 'rgba(208, 106, 17, 0.04)',
                border: '1px solid rgba(208, 106, 17, 0.12)',
              }}>
                <h3 style={{
                  fontSize: TYPO.cardTitle,
                  fontWeight: 700,
                  color: '#1A1A2E',
                  marginBottom: '1rem',
                }}>
                  Cosa Ottieni:
                </h3>
                {[
                  '4 giorni di workshop intensivo GRATUITO',
                  'Accesso alla community esclusiva',
                  'Materiale didattico completo',
                  'Piano d\'azione personalizzato',
                  'Sessioni Q&A con Alfio e il team',
                  'Certificato di partecipazione',
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: '0.75rem',
                    fontSize: TYPO.body,
                    color: 'rgba(26, 26, 46, 0.75)',
                  }}>
                    <span style={{ color: '#32B15C', fontSize: '1rem', flexShrink: 0 }}>&#10003;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mi-glass" style={{
                background: 'rgba(50, 177, 92, 0.04)',
                border: '1px solid rgba(50, 177, 92, 0.12)',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: TYPO.label,
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#32B15C',
                  marginBottom: '0.5rem',
                }}>
                  VALORE TOTALE
                </div>
                <div style={{
                  fontSize: TYPO.sectionTitle,
                  fontWeight: 900,
                  color: '#1A1A2E',
                  lineHeight: 1.1,
                }}>
                  <span style={{ textDecoration: 'line-through', color: 'rgba(26, 26, 46, 0.3)', fontSize: TYPO.cardTitle }}>1.497&euro;</span>
                  {' '}
                  GRATIS
                </div>
                <p style={{
                  fontSize: TYPO.small,
                  color: 'rgba(26, 26, 46, 0.4)',
                  marginTop: '0.5rem',
                }}>
                  Solo per i primi 500 candidati selezionati
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. FLOATING BAR
          ════════════════════════════════════════════════════════════════════ */}
      <div ref={floatingBarRef} className="mi-floating-bar" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(1rem, 3vw, 2.5rem)',
        padding: '0.85rem clamp(1.25rem, 3vw, 2rem)',
        paddingBottom: 'calc(0.85rem + env(safe-area-inset-bottom, 0px))',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(208,106,17,0.15)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        transform: 'translateY(60px)',
        opacity: 0,
        visibility: 'hidden' as const,
      }}>
        <span className="mi-floating-text" style={{
          fontSize: TYPO.small,
          fontWeight: 600,
          color: 'rgba(26, 26, 46, 0.7)',
          letterSpacing: '0.05em',
        }}>
          Solo <strong style={{ color: '#D06A11' }}>500 posti</strong> &mdash; Workshop Gratuito
        </span>
        <a href="#candidati" className="mi-cta" style={{
          padding: '0.75rem 2rem',
          fontSize: TYPO.small,
        }}>
          CANDIDATI ORA
        </a>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          11. FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer className="mi-footer" style={{
        background: '#1A1A2E',
        borderTop: '1px solid rgba(208,106,17,0.08)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 5vw, 4rem)',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div className="mi-noise" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontSize: TYPO.cardTitle,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}>
            <span style={{ color: 'rgba(245,245,245,0.9)' }}>MISSIONE </span>
            <span style={{ color: '#D06A11' }}>IMMOBILIARE</span>
          </div>
          <p style={{
            fontSize: TYPO.small,
            color: 'rgba(245,245,245,0.35)',
            marginBottom: '1.5rem',
          }}>
            Un evento di Alfio Bardolla Training Group S.p.A.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            {['Privacy Policy', 'Termini e Condizioni', 'Cookie Policy'].map((link, i) => (
              <a key={i} href="#" style={{
                fontSize: TYPO.small,
                color: 'rgba(245,245,245,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#D06A11' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,245,245,0.4)' }}
              >
                {link}
              </a>
            ))}
          </div>
          <p style={{
            fontSize: TYPO.label,
            color: 'rgba(245,245,245,0.2)',
          }}>
            &copy; {new Date().getFullYear()} ABTG S.p.A. &mdash; Tutti i diritti riservati
          </p>
        </div>
      </footer>
    </div>
  )
}
