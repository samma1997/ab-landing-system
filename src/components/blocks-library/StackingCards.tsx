'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ────────────────────────────────────────────────

export interface StackingCard {
  number?: number
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  bgAccent?: string
}

export interface StackingCardsProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  cards: StackingCard[]
  bgColor?: 'dark' | 'light'
  id?: string
}

// ── Card positions (fan spread) ──────────────────────────

function getCardLayout(index: number, total: number) {
  // Fan spread: each card gets a horizontal offset + slight rotation
  const centerIndex = (total - 1) / 2
  const offset = index - centerIndex

  return {
    // Horizontal spread from center
    xPercent: offset * 28,
    // Slight rotation for fan effect
    rotation: offset * 4,
    // Stagger vertical position slightly
    yOffset: Math.abs(offset) * 15,
    // Cards in center are on top
    zIndex: total - Math.abs(Math.round(offset)),
  }
}

// ── Component ────────────────────────────────────────────

export function StackingCards({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  cards,
  bgColor = 'dark',
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

      const total = cardEls.length
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        // Set initial state: all cards below viewport, no rotation
        cardEls.forEach((card) => {
          gsap.set(card, {
            y: '120vh',
            rotation: 0,
            opacity: 0,
            scale: 0.85,
          })
        })

        // Master timeline pinned to section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${total * 100}vh`,
            pin: stickyRef.current,
            scrub: 0.8,
            anticipatePin: 1,
          },
        })

        // Animate each card into position
        cardEls.forEach((card, i) => {
          const layout = getCardLayout(i, total)

          // Card rises from bottom
          tl.to(
            card,
            {
              y: layout.yOffset,
              xPercent: layout.xPercent,
              rotation: layout.rotation,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
            },
            i * 0.8 // stagger timing
          )
        })

        // Hold at end so all cards visible
        tl.to({}, { duration: 0.5 })
      })

      // Mobile: simple stagger reveal, no sticky
      mm.add('(max-width: 767px)', () => {
        cardEls.forEach((card, i) => {
          gsap.set(card, {
            y: 60,
            opacity: 0,
            rotation: 0,
            xPercent: 0,
            scale: 1,
          })

          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          })
        })
      })
    },
    { scope: sectionRef }
  )

  const bgClass = isDark ? 'bg-[#0A0A0F]' : 'bg-[#F5F5F7]'

  return (
    <section ref={sectionRef} id={id} className={`${bgClass} relative`}>
      {/* Spacer for scroll distance on desktop */}
      <div className="hidden md:block" style={{ height: `${(cards.length + 1) * 100}vh` }}>
        {/* Sticky container */}
        <div
          ref={stickyRef}
          className="h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Heading */}
          <div className="text-center mb-8 px-4 relative z-10">
            {preTitle && (
              <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-[0.15em] mb-3 font-[Montserrat,sans-serif]">
                {preTitle}
              </p>
            )}
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight ${
                isDark ? 'text-[#F5F5F0]' : 'text-[#1e293b]'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {title}
              {titleHighlight && (
                <span className="text-[#C9A84C]"> {titleHighlight}</span>
              )}
            </h2>
            {subtitle && (
              <p
                className={`text-lg max-w-2xl mx-auto ${
                  isDark ? 'text-[#A8A8A0]' : 'text-[#67768e]'
                }`}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Cards container — centered, cards position absolutely */}
          <div className="relative w-full max-w-7xl mx-auto" style={{ height: '420px' }}>
            {cards.map((card, i) => {
              const num = card.number ?? i + 1
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className="absolute left-1/2 -translate-x-1/2 top-0"
                  style={{ zIndex: getCardLayout(i, cards.length).zIndex }}
                >
                  <CardInner
                    card={card}
                    num={num}
                    isDark={isDark}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile layout: simple vertical stack */}
      <div className="md:hidden py-16 px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          {preTitle && (
            <p className="text-[#C9A84C] font-semibold text-sm uppercase tracking-[0.15em] mb-3 font-[Montserrat,sans-serif]">
              {preTitle}
            </p>
          )}
          <h2
            className={`text-3xl font-black mb-4 ${
              isDark ? 'text-[#F5F5F0]' : 'text-[#1e293b]'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {title}
            {titleHighlight && (
              <span className="text-[#C9A84C]"> {titleHighlight}</span>
            )}
          </h2>
          {subtitle && (
            <p className={`text-base ${isDark ? 'text-[#A8A8A0]' : 'text-[#67768e]'}`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6 max-w-sm mx-auto">
          {cards.map((card, i) => {
            const num = card.number ?? i + 1
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[cards.length + i] = el
                }}
              >
                <CardInner card={card} num={num} isDark={isDark} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Card Inner ───────────────────────────────────────────

function CardInner({
  card,
  num,
  isDark,
}: {
  card: StackingCard
  num: number
  isDark: boolean
}) {
  const accentBg = card.bgAccent || (isDark ? '#1A1A24' : '#FFFFFF')

  return (
    <div
      className="w-[320px] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl border"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #111118 0%, #1A1A24 100%)'
          : '#FFFFFF',
        borderColor: isDark ? 'rgba(201,168,76,0.15)' : 'rgba(0,0,0,0.08)',
        boxShadow: isDark
          ? '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.05)'
          : '0 25px 60px rgba(0,0,0,0.12)',
      }}
    >
      {/* Number badge + Title area */}
      <div className="p-6 pb-4">
        {/* Number */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              boxShadow: '0 4px 12px rgba(201,168,76,0.3)',
            }}
          >
            <span
              className="text-[#0A0A0F] font-black text-sm"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {String(num).padStart(2, '0')}
            </span>
          </div>
          <div
            className={`text-xs font-semibold uppercase tracking-[0.12em] ${
              isDark ? 'text-[#5C5C58]' : 'text-gray-400'
            }`}
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Step {num}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-2xl font-black leading-tight mb-2 ${
            isDark ? 'text-[#F5F5F0]' : 'text-[#1e293b]'
          }`}
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed ${
            isDark ? 'text-[#A8A8A0]' : 'text-[#67768e]'
          }`}
        >
          {card.description}
        </p>
      </div>

      {/* Bottom accent area (image or icon) */}
      <div
        className="h-[160px] mx-4 mb-4 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: accentBg }}
      >
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        ) : card.icon ? (
          <div className="text-5xl">{card.icon}</div>
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #C9A84C, #E8C96B)',
              boxShadow: '0 8px 24px rgba(201,168,76,0.25)',
            }}
          >
            <span
              className="text-[#0A0A0F] font-black text-2xl"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {String(num).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
