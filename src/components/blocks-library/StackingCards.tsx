'use client'

import { useRef, useState } from 'react'
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

// ── Accent colors for bottom area and badge per card ──
const CARD_ACCENTS = ['#e8e0f0', '#d0e8f0', '#f0e8d0', '#d0f0e0', '#f0d0d8', '#e0e0f0']
const BADGE_COLORS = ['#f5c6c6', '#c6e8c6', '#f5f0c6', '#c6d8f5', '#f5d0e0', '#d0f0f0']

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
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const [mobileIndex, setMobileIndex] = useState(0)

  const isDark = bgColor === 'dark'

  useGSAP(
    () => {
      if (!sectionRef.current || !stickyRef.current) return

      const cardEls = cardsRef.current.filter(Boolean)
      if (!cardEls.length) return

      const mm = gsap.matchMedia()

      // ── Desktop: pinned, cards rise from bottom one by one ──
      mm.add('(min-width: 1024px)', () => {
        const total = cardEls.length

        // Each card starts below viewport
        cardEls.forEach((card) => {
          gsap.set(card, { yPercent: 130, opacity: 0 })
        })

        // Individual ScrollTrigger per card
        cardEls.forEach((card, i) => {
          gsap.to(card, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * (100 / total)}% top`,
              end: () => `top+=${(i + 0.7) * (100 / total)}% top`,
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

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  // ── Mobile swipe handlers ──
  const touchStart = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && mobileIndex < cards.length - 1) {
        setMobileIndex(mobileIndex + 1)
      } else if (diff < 0 && mobileIndex > 0) {
        setMobileIndex(mobileIndex - 1)
      }
    }
  }

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
  }

  // Calculate card width and positions based on count
  // Cards overlap like dontboardme: each offset ~15-18% of viewport
  const total = cards.length
  const cardWidthRem = total <= 3 ? 28 : total <= 4 ? 24 : 20
  const stepPercent = Math.min(18, 75 / Math.max(total - 1, 1))
  const startPercent = Math.max(2, 50 - (stepPercent * (total - 1)) / 2 - cardWidthRem * 0.5)

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${bgClasses[bgColor]} relative`}
      style={{ height: `${(total + 1) * 100}vh` }}
    >
      {/* ═══ DESKTOP: Sticky pinned viewport ═══ */}
      <div
        ref={stickyRef}
        className="h-screen w-full overflow-hidden relative hidden lg:block"
      >
        {/* Pre-title — top center */}
        {preTitle && (
          <div className="absolute top-6 left-0 right-0 z-30 text-center">
            <p className="text-[#EF7B11] font-semibold text-xs uppercase tracking-[0.2em]">
              {preTitle}
            </p>
          </div>
        )}

        {/* Subtitle — bottom center */}
        {subtitle && (
          <div className="absolute bottom-6 left-0 right-0 z-30 text-center px-4">
            <p className={`text-sm font-semibold uppercase tracking-wider ${
              isDark ? 'text-white/50' : 'text-[#67768e]'
            }`}>
              {subtitle}
            </p>
          </div>
        )}

        {/* Cards */}
        {cards.map((card, i) => {
          const num = card.number ?? i + 1
          const leftPos = `${startPercent + i * stepPercent}%`

          return (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className="absolute"
              style={{
                left: leftPos,
                top: '3%',
                width: `${cardWidthRem}rem`,
                height: '88%',
                zIndex: i + 1,
              }}
            >
              <div
                className={`h-full w-full rounded-[3px] flex flex-col overflow-hidden relative ${
                  isDark
                    ? 'bg-[#1a2332] shadow-2xl'
                    : 'bg-[#F5F5F0] shadow-2xl'
                }`}
                style={{
                  boxShadow: isDark
                    ? '0 20px 60px rgba(0,0,0,0.4)'
                    : '0 20px 60px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                {/* Number badge — floating top-right */}
                <div
                  className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10"
                  style={{
                    background: isDark ? CARD_ACCENTS[i % CARD_ACCENTS.length] : BADGE_COLORS[i % BADGE_COLORS.length],
                    color: '#1e293b',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  {num}
                </div>

                {/* Title — big uppercase */}
                <div className="px-6 pt-6 flex-shrink-0">
                  <h3
                    className={`text-2xl xl:text-3xl font-black uppercase leading-[0.95] ${
                      isDark ? 'text-white' : 'text-[#1e293b]'
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Number + description */}
                <div className="px-6 pt-6 flex-1 flex flex-col">
                  <p
                    className={`text-7xl xl:text-8xl font-black leading-none mb-3 ${
                      isDark ? 'text-white/70' : 'text-[#1e293b]/70'
                    }`}
                  >
                    {String(num).padStart(2, '0')}.
                  </p>
                  <p
                    className={`text-[10px] xl:text-xs uppercase tracking-wider font-semibold leading-relaxed ${
                      isDark ? 'text-white/50' : 'text-[#67768e]'
                    }`}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Bottom colored area */}
                <div
                  className="h-[36%] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isDark
                      ? 'rgba(239,123,17,0.06)'
                      : CARD_ACCENTS[i % CARD_ACCENTS.length],
                  }}
                >
                  {card.icon ? (
                    typeof card.icon === 'string' ? (
                      <span className="text-6xl">{card.icon}</span>
                    ) : (
                      card.icon
                    )
                  ) : (
                    <span
                      className="text-7xl xl:text-8xl font-black"
                      style={{
                        color: isDark ? 'rgba(239,123,17,0.15)' : 'rgba(30,41,59,0.08)',
                      }}
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

      {/* ═══ MOBILE: Horizontal carousel (like dontboardme.com) ═══ */}
      <div className="lg:hidden relative" style={{ height: 'auto', position: 'relative' }}>
        <div className={`${bgClasses[bgColor]} py-12 px-4`}>
          {/* Heading */}
          <div className="text-center mb-8">
            {preTitle && (
              <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
                {preTitle}
              </p>
            )}
            <h2 className={`text-3xl font-black mb-3 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
              {title}
              {titleHighlight && <span className="text-[#EF7B11]"> {titleHighlight}</span>}
            </h2>
            {subtitle && (
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Swipeable carousel */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={mobileTrackRef}
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${mobileIndex * 85}%)`,
              }}
            >
              {cards.map((card, i) => {
                const num = card.number ?? i + 1
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 pr-4"
                    style={{ width: '85%' }}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden h-[28rem] flex flex-col ${
                        isDark
                          ? 'bg-[#1a2332] border border-white/10'
                          : 'bg-[#F5F5F0] shadow-lg'
                      }`}
                    >
                      {/* Title */}
                      <div className="px-5 pt-5 flex-shrink-0">
                        <h3
                          className={`text-xl font-black uppercase leading-tight ${
                            isDark ? 'text-white' : 'text-[#1e293b]'
                          }`}
                        >
                          {card.title}
                        </h3>
                      </div>

                      {/* Number + description */}
                      <div className="px-5 pt-4 flex-1">
                        <p
                          className={`text-5xl font-black leading-none mb-2 ${
                            isDark ? 'text-white/70' : 'text-[#1e293b]/70'
                          }`}
                        >
                          {String(num).padStart(2, '0')}.
                        </p>
                        <p
                          className={`text-xs uppercase tracking-wider font-medium leading-relaxed ${
                            isDark ? 'text-white/50' : 'text-[#67768e]'
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom area */}
                      <div
                        className="h-[35%] flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isDark
                            ? 'rgba(239,123,17,0.06)'
                            : CARD_ACCENTS[i % CARD_ACCENTS.length],
                        }}
                      >
                        {card.icon ? (
                          typeof card.icon === 'string' ? (
                            <span className="text-5xl">{card.icon}</span>
                          ) : (
                            card.icon
                          )
                        ) : (
                          <span
                            className="text-6xl font-black"
                            style={{
                              color: isDark ? 'rgba(239,123,17,0.15)' : 'rgba(30,41,59,0.08)',
                            }}
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
          </div>

          {/* Dots indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === mobileIndex
                    ? 'w-6 bg-[#EF7B11]'
                    : `w-2 ${isDark ? 'bg-white/20' : 'bg-[#1e293b]/15'}`
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
