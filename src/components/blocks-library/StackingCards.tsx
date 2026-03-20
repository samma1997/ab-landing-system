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
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const isDark = bgColor === 'dark'

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return

      // Heading
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

      // ── Desktop: sticky container with fan/spread stacking ──
      mm.add('(min-width: 768px)', () => {
        const container = containerRef.current!
        const totalCards = cardEls.length
        const scrollPerCard = 300
        const totalScroll = scrollPerCard * totalCards

        // Set section height to create scroll space
        sectionRef.current!.style.minHeight = `${totalScroll + window.innerHeight}px`

        // Compute fan positions: spread from center with rotation
        const getFanPosition = (index: number) => {
          const center = (totalCards - 1) / 2
          const offset = index - center
          const xOffset = offset * 18 // percentage offset from center
          const rotation = offset * 5  // degrees rotation per step from center

          return { xPercent: xOffset, rotation }
        }

        // Set initial state: all cards stacked below viewport
        cardEls.forEach((card) => {
          gsap.set(card, {
            y: '120vh',
            opacity: 0,
            scale: 0.9,
            xPercent: 0,
            rotation: 0,
          })
        })

        // Create timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        })

        // Animate each card into its fan position
        cardEls.forEach((card, i) => {
          const { xPercent, rotation } = getFanPosition(i)
          const position = i * (1 / totalCards)

          tl.to(
            card,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              xPercent,
              rotation,
              duration: 1 / totalCards,
              ease: 'power2.out',
            },
            position
          )
        })

        return () => {
          sectionRef.current!.style.minHeight = ''
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      })

      // ── Mobile: simple staggered fadeUp ──
      mm.add('(max-width: 767px)', () => {
        cardEls.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
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
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="sc-heading text-center mb-14">
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

        {/* Stacking cards container */}
        <div
          ref={containerRef}
          className="sc-container relative flex items-center justify-center"
          style={{ minHeight: '70vh' }}
        >
          {/* Mobile: vertical stack / Desktop: absolute positioned for fan */}
          <div className="flex flex-col gap-6 md:contents">
            {cards.map((card, i) => {
              const num = card.number ?? i + 1
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className={`sc-card w-full md:absolute md:w-[300px] sm:md:w-[340px] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? 'bg-white/5 border border-white/10 hover:border-[#EF7B11]/30'
                      : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#EF7B11]/20'
                  }`}
                  style={{ zIndex: i + 1 }}
                >
                  {/* Number badge */}
                  <div className="w-12 h-12 rounded-xl bg-[#EF7B11] flex items-center justify-center mb-5">
                    <span className="text-white font-black text-lg">{num}</span>
                  </div>

                  {/* Icon */}
                  {card.icon && (
                    <div className="mb-4">
                      {typeof card.icon === 'string' ? (
                        <span className="text-2xl">{card.icon}</span>
                      ) : (
                        card.icon
                      )}
                    </div>
                  )}

                  <h3
                    className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}
                  >
                    {card.title}
                  </h3>
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
