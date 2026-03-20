'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface StackingCard {
  number?: number
  title: string
  description: string
  icon?: string | React.ReactNode
}

export interface StackingCardsProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  cards: StackingCard[]
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// ── Fixed left positions for each card (px from left edge) ──
// Mimics dontboardme.com: cards spread across viewport with overlap
const CARD_POSITIONS = [
  { left: '1.5rem', rotation: -2 },
  { left: 'calc(15% + 2rem)', rotation: -1 },
  { left: 'calc(30% + 3rem)', rotation: 0 },
  { left: 'calc(45% + 4rem)', rotation: 1 },
  { left: 'calc(60% + 5rem)', rotation: 2 },
  { left: 'calc(72% + 3rem)', rotation: 3 },
]

// ── Component ──────────────────────────────────────────

export function StackingCards({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  cards,
  bgColor = 'light',
  id,
}: StackingCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const isDark = bgColor === 'dark'

  useGSAP(
    () => {
      if (!sectionRef.current || !stickyRef.current) return

      const cardEls = cardsRef.current.filter(Boolean)
      if (!cardEls.length) return

      const mm = gsap.matchMedia()

      // ── Desktop: pinned, cards rise from bottom one by one ──
      mm.add('(min-width: 768px)', () => {
        // Each card starts at top: 100% (below the viewport)
        cardEls.forEach((card) => {
          gsap.set(card, { yPercent: 120, opacity: 0 })
        })

        // One ScrollTrigger per card, each triggered by its own scroll zone
        // The section height creates the scroll zones
        const total = cardEls.length

        cardEls.forEach((card, i) => {
          const pos = CARD_POSITIONS[i] || CARD_POSITIONS[CARD_POSITIONS.length - 1]

          gsap.to(card, {
            yPercent: 0,
            opacity: 1,
            rotation: pos.rotation,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * (100 / total)}% top`,
              end: () => `top+=${(i + 0.8) * (100 / total)}% top`,
              scrub: 0.5,
            },
          })
        })

        // Pin the sticky container
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          pinSpacing: false,
        })
      })

      // ── Mobile: simple stagger ──
      mm.add('(max-width: 767px)', () => {
        cardEls.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          })
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${bgClasses[bgColor]} relative`}
      // Section height = viewport per card (creates scroll distance)
      style={{ height: `${(cards.length + 1) * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="h-screen w-full overflow-hidden relative"
      >
        {/* Heading — centered at top */}
        {(preTitle || title) && (
          <div className="absolute top-8 left-0 right-0 z-30 text-center px-4 hidden md:block">
            {preTitle && (
              <p className="text-[#EF7B11] font-semibold text-xs uppercase tracking-[0.2em] mb-2">
                {preTitle}
              </p>
            )}
          </div>
        )}

        {/* Subtitle — bottom center */}
        {subtitle && (
          <div className="absolute bottom-8 left-0 right-0 z-30 text-center px-4 hidden md:block">
            <p className={`text-sm font-semibold uppercase tracking-wider ${
              isDark ? 'text-white/60' : 'text-[#67768e]'
            }`}>
              {subtitle}
            </p>
          </div>
        )}

        {/* ── Desktop cards — absolute positioned, full height ── */}
        <div className="hidden md:block h-full w-full relative">
          {cards.map((card, i) => {
            const num = card.number ?? i + 1
            const pos = CARD_POSITIONS[i] || CARD_POSITIONS[CARD_POSITIONS.length - 1]

            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el
                }}
                className="absolute top-[2%]"
                style={{
                  left: pos.left,
                  width: '28rem',    // ~450px like original
                  height: '90%',     // almost full viewport
                  zIndex: i + 1,
                }}
              >
                <div
                  className={`h-full w-full rounded-[4px] flex flex-col justify-between overflow-hidden ${
                    isDark
                      ? 'bg-[#1e293b] border border-white/10 shadow-2xl'
                      : 'bg-[#F5F5F0] shadow-2xl'
                  }`}
                  style={{
                    boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Top section: big title */}
                  <div className="px-8 pt-8 pb-4 flex-shrink-0">
                    <h3
                      className={`text-4xl lg:text-5xl font-black uppercase leading-[0.95] ${
                        isDark ? 'text-white' : 'text-[#1e293b]'
                      }`}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Number badge — floating circle */}
                  <div
                    className="absolute top-[-12px] right-[-12px] w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                    style={{
                      background: i === 0 ? '#f5c6c6' : i === 1 ? '#c6f5c6' : i === 2 ? '#f5f5c6' : '#c6c6f5',
                      color: isDark ? '#1e293b' : '#1e293b',
                      zIndex: 10,
                    }}
                  >
                    {num}
                  </div>

                  {/* Middle section: large number + description */}
                  <div className="px-8 flex-shrink-0">
                    <p
                      className={`text-8xl lg:text-9xl font-black leading-none mb-3 ${
                        isDark ? 'text-white/80' : 'text-[#1e293b]/80'
                      }`}
                    >
                      {String(num).padStart(2, '0')}.
                    </p>
                    <p
                      className={`text-xs uppercase tracking-wider font-semibold leading-relaxed max-w-[380px] ${
                        isDark ? 'text-white/60' : 'text-[#67768e]'
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom section: colored area for illustration/icon */}
                  <div
                    className="mt-auto h-[38%] flex items-center justify-center rounded-t-sm overflow-hidden"
                    style={{
                      background: isDark
                        ? 'rgba(239,123,17,0.08)'
                        : i % 2 === 0 ? '#e8e4f0' : '#d4e8f0',
                    }}
                  >
                    {card.icon ? (
                      typeof card.icon === 'string' ? (
                        <span className="text-7xl">{card.icon}</span>
                      ) : (
                        card.icon
                      )
                    ) : (
                      <span
                        className="text-8xl font-black opacity-20"
                        style={{ color: isDark ? '#EF7B11' : '#1e293b' }}
                      >
                        {String(num).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile: vertical stack ── */}
        <div className="md:hidden py-16 px-4 h-full overflow-y-auto">
          <div className="text-center mb-10">
            {preTitle && (
              <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
                {preTitle}
              </p>
            )}
            <h2 className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
              {title}
              {titleHighlight && <span className="text-[#EF7B11]"> {titleHighlight}</span>}
            </h2>
            {subtitle && (
              <p className={`text-base ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {cards.map((card, i) => {
              const num = card.number ?? i + 1
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[cards.length + i] = el
                  }}
                  className={`rounded-2xl p-6 ${
                    isDark
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-white border border-gray-100 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#EF7B11] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-sm">
                        {String(num).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
                      {card.title}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                    {card.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
