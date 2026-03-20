'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const BASE_PATH = '/ab-landing-system'

// ── Helpers ──────────────────────────────────────────────
function img(src: string) {
  return `${BASE_PATH}${src}`
}

// ── Types ────────────────────────────────────────────────

export interface HorizontalScrollCard {
  title: string
  description: string
  stat?: string
  statLabel?: string
  quote?: string
  author?: string
  authorRole?: string
  authorImage?: string
  bgColor?: string
}

export interface HorizontalScrollCardsProps {
  title?: string
  titleHighlight?: string
  subtitle?: string
  cards: HorizontalScrollCard[]
  bgColor?: 'dark' | 'light'
  cardWidth?: string
  gap?: number
  id?: string
}

// ── Component ────────────────────────────────────────────

export function HorizontalScrollCards({
  title,
  titleHighlight,
  subtitle,
  cards,
  bgColor = 'dark',
  cardWidth = '500px',
  gap = 32,
  id,
}: HorizontalScrollCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const isDark = bgColor === 'dark'

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current || !trackRef.current) return

      const container = containerRef.current
      const track = trackRef.current

      // ── Heading animation ──
      const heading = sectionRef.current.querySelector('.hs-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // ── Desktop: horizontal scroll with pin ──
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        // Recalculate on refresh
        const getScrollDistance = () => track.scrollWidth - container.offsetWidth

        const cardEls = track.querySelectorAll('.hs-card')

        // Only pin + horizontal scroll if cards overflow the container
        const scrollDist = getScrollDistance()
        if (scrollDist > 0) {
          track.style.minHeight = '100vh'

          const tween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 1,
              start: 'top top',
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
            },
          })

          // Stagger card entrance while scrolling
          cardEls.forEach((card, i) => {
            gsap.from(card, {
              opacity: 0,
              scale: 0.92,
              duration: 0.5,
              delay: i * 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            })
          })

          return () => {
            track.style.minHeight = ''
            tween.scrollTrigger?.kill()
            tween.kill()
          }
        } else {
          // Cards fit — just fade them in without pinning
          cardEls.forEach((card, i) => {
            gsap.from(card, {
              opacity: 0,
              y: 30,
              duration: 0.6,
              delay: i * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            })
          })
        }
      })

      // ── Mobile: vertical stack with fade-up ──
      mm.add('(max-width: 767px)', () => {
        const cardEls = track.querySelectorAll('.hs-card')
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

  // Unique class for scoped card width styling
  const cardWidthClass = `hs-card-w-${cardWidth.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <section
      ref={sectionRef}
      id={id}
      className={isDark ? 'bg-[#0f1923]' : 'bg-white'}
    >
      {/* Scoped card width for desktop */}
      <style>{`
        @media (min-width: 768px) {
          .${cardWidthClass} { width: ${cardWidth}; min-width: ${cardWidth}; max-width: ${cardWidth}; }
        }
      `}</style>
      {/* Section heading — always in normal flow */}
      {(title || subtitle) && (
        <div className="hs-heading pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {title && (
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-4 font-[var(--font-plus-jakarta)] ${
                isDark ? 'text-white' : 'text-[#1e293b]'
              }`}
            >
              {title}
              {titleHighlight && (
                <span className="text-[#EF7B11]"> {titleHighlight}</span>
              )}
            </h2>
          )}
          {subtitle && (
            <p
              className={`text-lg max-w-2xl mx-auto ${
                isDark ? 'text-white/60' : 'text-[#67768e]'
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Pinnable container — this is what gets pinned */}
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Track — moves horizontally on desktop, stacks on mobile */}
        <div
          ref={trackRef}
          className="
            flex flex-col gap-6 px-4 pb-16
            md:flex-row md:flex-nowrap md:items-center md:pb-0
          "
          style={{
            willChange: 'transform',
            gap: `${gap}px`,
            // On desktop, add padding to left and right for breathing room
          }}
        >
          {/* Left spacer on desktop — pushes first card to comfortable position */}
          <div
            className="hidden md:block flex-shrink-0"
            style={{ width: 'max(40px, calc((100vw - 1200px) / 2))' }}
            aria-hidden="true"
          />

          {cards.map((card, i) => (
            <div
              key={i}
              className={`
                hs-card ${cardWidthClass} flex-shrink-0 rounded-2xl p-8 sm:p-10
                flex flex-col justify-between
                transition-shadow duration-300
                ${isDark
                  ? 'bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                  : 'bg-[#F5F5F7] border border-gray-200 hover:shadow-lg hover:border-gray-300'
                }
              `}
              style={{
                minHeight: '350px',
              }}
            >

              <div>
                {/* Stat variant */}
                {card.stat && (
                  <div className="mb-6">
                    <p
                      className="text-5xl sm:text-6xl font-black mb-2"
                      style={{ color: card.bgColor || '#EF7B11' }}
                    >
                      {card.stat}
                    </p>
                    {card.statLabel && (
                      <p
                        className={`text-sm font-semibold uppercase tracking-wider ${
                          isDark ? 'text-white/50' : 'text-[#67768e]'
                        }`}
                      >
                        {card.statLabel}
                      </p>
                    )}
                  </div>
                )}

                {/* Quote variant */}
                {card.quote && (
                  <div className="mb-6">
                    <svg
                      className={`w-8 h-8 mb-4 ${isDark ? 'text-[#EF7B11]/40' : 'text-[#EF7B11]/30'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.986z" />
                    </svg>
                    <p
                      className={`text-xl sm:text-2xl font-medium leading-relaxed italic ${
                        isDark ? 'text-white/90' : 'text-[#1e293b]'
                      }`}
                    >
                      &ldquo;{card.quote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? 'text-white' : 'text-[#1e293b]'
                  }`}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-[#67768e]'
                  }`}
                >
                  {card.description}
                </p>
              </div>

              {/* Author footer — for quote cards */}
              {card.author && (
                <div className={`flex items-center gap-3 mt-6 pt-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  {card.authorImage && (
                    <img
                      src={img(card.authorImage)}
                      alt={card.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#EF7B11]/30"
                    />
                  )}
                  <div>
                    <p
                      className={`font-semibold text-sm ${
                        isDark ? 'text-white' : 'text-[#1e293b]'
                      }`}
                    >
                      {card.author}
                    </p>
                    {card.authorRole && (
                      <p
                        className={`text-xs ${
                          isDark ? 'text-white/40' : 'text-[#67768e]'
                        }`}
                      >
                        {card.authorRole}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Right spacer on desktop */}
          <div
            className="hidden md:block flex-shrink-0"
            style={{ width: 'max(40px, calc((100vw - 1200px) / 2))' }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
