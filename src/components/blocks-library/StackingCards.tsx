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
  const [mobileIndex, setMobileIndex] = useState(0)

  const isDark = bgColor === 'dark'

  // Fan layout: spread cards from center with slight rotation + offset
  const total = cards.length
  const getFan = (i: number) => {
    const center = (total - 1) / 2
    const offset = i - center
    return {
      x: offset * 180, // px from center
      rotation: offset * 4,
      y: Math.abs(offset) * 15,
    }
  }

  useGSAP(
    () => {
      if (!sectionRef.current || !stickyRef.current) return

      const cardEls = cardsRef.current.filter(Boolean)
      if (!cardEls.length) return

      const mm = gsap.matchMedia()

      // ── Desktop: pinned, cards rise from bottom into fan ──
      mm.add('(min-width: 1024px)', () => {
        // Heading fade
        const heading = sectionRef.current!.querySelector('.sc-heading')
        if (heading) {
          gsap.from(heading, {
            y: 30, opacity: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: heading, start: 'top 85%' },
          })
        }

        // Cards start below
        cardEls.forEach((card) => {
          gsap.set(card, { y: 600, opacity: 0, scale: 0.9, rotation: 0 })
        })

        // Timeline with scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: stickyRef.current,
            pinSpacing: false,
            scrub: 0.6,
          },
        })

        // Each card rises into its fan position
        cardEls.forEach((card, i) => {
          const fan = getFan(i)
          tl.to(card, {
            y: fan.y,
            x: fan.x,
            rotation: fan.rotation,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
          }, i * 0.6)
        })

        // Hold at end
        tl.to({}, { duration: 0.8 })
      })

      // ── Mobile: no GSAP needed, using CSS carousel ──

      return () => mm.revert()
    },
    { scope: sectionRef }
  )

  // Mobile swipe
  const touchStart = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && mobileIndex < cards.length - 1) setMobileIndex(mobileIndex + 1)
      else if (diff < 0 && mobileIndex > 0) setMobileIndex(mobileIndex - 1)
    }
  }

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
    >
      {/* ═══ DESKTOP: scroll spacer + sticky ═══ */}
      <div className="hidden lg:block" style={{ height: `${(total + 1) * 70}vh` }}>
      <div
        ref={stickyRef}
        className="h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {/* Heading */}
        <div className="sc-heading text-center mb-10 px-4 relative z-10">
          {preTitle && (
            <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
              {preTitle}
            </p>
          )}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 ${
              isDark ? 'text-white' : 'text-[#1e293b]'
            }`}
          >
            {title}
            {titleHighlight && <span className="text-[#EF7B11]"> {titleHighlight}</span>}
          </h2>
          {subtitle && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards container — centered, cards positioned relative to center */}
        <div className="relative" style={{ width: '100%', height: '360px' }}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {cards.map((card, i) => {
              const num = card.number ?? i + 1
              return (
                <div
                  key={i}
                  ref={(el) => { if (el) cardsRef.current[i] = el }}
                  className="absolute"
                  style={{
                    left: '-150px',
                    top: '-160px',
                    width: '300px',
                    zIndex: i + 1,
                  }}
                >
                  {/* ── ABTG Card Style (matches PillarCards/NumberedPhases) ── */}
                  <div
                    className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 ${
                      isDark
                        ? 'bg-[#1e293b] border border-white/10 hover:border-[#EF7B11]/30 shadow-lg'
                        : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#EF7B11]/20'
                    }`}
                  >
                    {/* Number badge — ABTG style */}
                    <div className="w-12 h-12 rounded-xl bg-[#EF7B11] flex items-center justify-center mb-5">
                      <span className="text-white font-black text-lg">{num}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        isDark ? 'text-white' : 'text-[#1e293b]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-white/60' : 'text-[#67768e]'
                    }`}>
                      {card.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </div>

      {/* ═══ MOBILE: Carousel ═══ */}
      <div className="lg:hidden" style={{ height: 'auto' }}>
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

          {/* Swipeable */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${mobileIndex * 85}%)` }}
            >
              {cards.map((card, i) => {
                const num = card.number ?? i + 1
                return (
                  <div key={i} className="flex-shrink-0 pr-4" style={{ width: '85%' }}>
                    {/* ── ABTG Card ── */}
                    <div
                      className={`rounded-2xl p-6 ${
                        isDark
                          ? 'bg-white/5 border border-white/10'
                          : 'bg-white border border-gray-100 shadow-sm'
                      }`}
                    >
                      {/* Number badge */}
                      <div className="w-12 h-12 rounded-xl bg-[#EF7B11] flex items-center justify-center mb-5">
                        <span className="text-white font-black text-lg">{num}</span>
                      </div>

                      {/* Title */}
                      <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Dots */}
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
