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

// ── Fan layout: each card gets a specific left% and rotation ──

function getFanLayout(index: number, total: number) {
  // Spread cards across the viewport width with overlap
  // Cards go from ~5% to ~65% left, each overlapping the previous
  const step = Math.min(60 / Math.max(total - 1, 1), 18)
  const startLeft = Math.max(5, 50 - (step * (total - 1)) / 2)

  // Rotation: slight tilt, alternating, more towards edges
  const center = (total - 1) / 2
  const offset = index - center
  const rotation = offset * 3

  return {
    left: `${startLeft + index * step}%`,
    rotation,
    zIndex: index + 1,
  }
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

  const isDark = bgColor === 'dark'

  useGSAP(
    () => {
      if (!sectionRef.current || !stickyRef.current) return

      // Heading animation
      const heading = sectionRef.current.querySelector('.sc-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      const cardEls = cardsRef.current.filter(Boolean)
      if (!cardEls.length) return

      const mm = gsap.matchMedia()

      // ── Desktop: pinned section, cards rise one by one ──
      mm.add('(min-width: 768px)', () => {
        const total = cardEls.length

        // Set initial state: all cards below viewport
        cardEls.forEach((card) => {
          gsap.set(card, {
            yPercent: 150,
            opacity: 0,
            scale: 0.92,
          })
        })

        // Master timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${total * 80}vh`,
            pin: stickyRef.current,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })

        // Each card rises into its fan position
        cardEls.forEach((card, i) => {
          const layout = getFanLayout(i, total)

          tl.to(
            card,
            {
              yPercent: 0,
              opacity: 1,
              scale: 1,
              rotation: layout.rotation,
              duration: 1,
              ease: 'power2.out',
            },
            i * 0.7
          )
        })

        // Hold for a beat at end
        tl.to({}, { duration: 0.5 })
      })

      // ── Mobile: simple staggered fadeUp ──
      mm.add('(max-width: 767px)', () => {
        cardEls.forEach((card) => {
          gsap.set(card, { y: 0, opacity: 1, scale: 1, rotation: 0 })

          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
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
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} relative`}>
      {/* ── Desktop: tall scroll zone + pinned viewport ── */}
      <div className="hidden md:block" style={{ height: `${(cards.length + 1) * 80}vh` }}>
        <div
          ref={stickyRef}
          className="h-screen w-full flex flex-col overflow-hidden"
        >
          {/* Heading — top area */}
          <div className="sc-heading text-center pt-16 pb-8 px-4 relative z-20">
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

          {/* Cards area — fills remaining space */}
          <div className="relative flex-1 w-full">
            {cards.map((card, i) => {
              const num = card.number ?? i + 1
              const layout = getFanLayout(i, cards.length)

              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className="absolute top-0"
                  style={{
                    left: layout.left,
                    zIndex: layout.zIndex,
                    transform: `translateX(-50%)`,
                    width: 'clamp(320px, 28vw, 420px)',
                    height: '85%',
                  }}
                >
                  <div
                    className={`h-full rounded-2xl p-8 flex flex-col transition-shadow duration-300 ${
                      isDark
                        ? 'bg-[#1e293b]/95 border border-white/10 backdrop-blur-sm shadow-2xl'
                        : 'bg-white/95 border border-gray-200 backdrop-blur-sm shadow-2xl'
                    }`}
                  >
                    {/* Big title at top */}
                    <h3
                      className={`text-2xl lg:text-3xl font-black leading-tight mb-6 uppercase ${
                        isDark ? 'text-white' : 'text-[#1e293b]'
                      }`}
                    >
                      {card.title}
                    </h3>

                    {/* Number badge — floating */}
                    <div
                      className="w-12 h-12 rounded-full bg-[#EF7B11] flex items-center justify-center mb-4 shadow-lg"
                      style={{ boxShadow: '0 4px 16px rgba(239,123,17,0.35)' }}
                    >
                      <span className="text-white font-black text-lg">
                        {String(num).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Number display — large */}
                    <p
                      className={`text-6xl lg:text-7xl font-black mb-4 ${
                        isDark ? 'text-white/10' : 'text-[#1e293b]/8'
                      }`}
                    >
                      {String(num).padStart(2, '0')}.
                    </p>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed uppercase tracking-wide font-medium ${
                        isDark ? 'text-white/60' : 'text-[#67768e]'
                      }`}
                    >
                      {card.description}
                    </p>

                    {/* Icon/image area at bottom */}
                    <div
                      className={`mt-auto rounded-xl h-[35%] flex items-center justify-center ${
                        isDark ? 'bg-white/5' : 'bg-[#F5F5F7]'
                      }`}
                    >
                      {card.icon ? (
                        typeof card.icon === 'string' ? (
                          <span className="text-5xl">{card.icon}</span>
                        ) : (
                          card.icon
                        )
                      ) : (
                        <span
                          className="text-5xl font-black"
                          style={{ color: isDark ? 'rgba(239,123,17,0.2)' : 'rgba(239,123,17,0.15)' }}
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
      </div>

      {/* ── Mobile: simple vertical stack ── */}
      <div className="md:hidden py-16 px-4">
        <div className="sc-heading text-center mb-10">
          {preTitle && (
            <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
              {preTitle}
            </p>
          )}
          <h2
            className={`text-3xl font-black mb-4 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}
          >
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
                className={`rounded-2xl p-6 transition-all duration-300 ${
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
    </section>
  )
}
