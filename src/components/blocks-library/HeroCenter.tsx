'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

const BASE_PATH = '/ab-landing-system'

// ── Types ──────────────────────────────────────────────

export interface HeroCenterProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle: string
  ctaText: string
  ctaHref?: string
  ctaSubtext?: string
  bgImage?: string
  overlayOpacity?: number
  badge?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
}

// ── Component ──────────────────────────────────────────

export function HeroCenter({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  ctaText,
  ctaHref = '#form',
  ctaSubtext,
  bgImage,
  overlayOpacity = 0.75,
  badge,
  secondaryCtaText,
  secondaryCtaHref = '#programma',
}: HeroCenterProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Badge
      const badgeEl = sectionRef.current.querySelector('.hero-badge')
      if (badgeEl) {
        gsap.set(badgeEl, { opacity: 0, scale: 0.6 })
        tl.to(badgeEl, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0.1)
      }

      // Headline reveal
      const lines = sectionRef.current.querySelectorAll('.hero-line')
      if (lines.length) {
        gsap.set(lines, { yPercent: 120 })
        tl.to(lines, { yPercent: 0, duration: 0.9, stagger: 0.1 }, 0.25)
      }

      // Subtitle
      const sub = sectionRef.current.querySelector('.hero-sub')
      if (sub) {
        gsap.set(sub, { opacity: 0, y: 25 })
        tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, 0.7)
      }

      // CTA area
      const cta = sectionRef.current.querySelector('.hero-cta-area')
      if (cta) {
        gsap.set(cta, { opacity: 0, y: 25 })
        tl.to(cta, { opacity: 1, y: 0, duration: 0.6 }, 0.9)
      }
    },
    { scope: sectionRef }
  )

  const bg = bgImage ? `${BASE_PATH}${bgImage}` : undefined

  // Split title into lines for animation
  const titleParts = title.split('\n').length > 1 ? title.split('\n') : [title]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1e293b]"
    >
      {/* Background */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `rgba(30,41,59,${overlayOpacity})` }}
          />
        </div>
      )}

      {!bg && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#1e293b] to-[#0f172a] z-0" />
      )}

      {/* Glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#EF7B11]/8 rounded-full blur-[150px] z-0" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 py-20">
        {badge && (
          <span className="hero-badge inline-block bg-[#EF7B11]/15 text-[#EF7B11] border border-[#EF7B11]/30 rounded-full px-5 py-1.5 text-sm font-semibold mb-6">
            {badge}
          </span>
        )}

        {preTitle && (
          <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-4">
            {preTitle}
          </p>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
          {titleParts.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="hero-line block">
                {line}
                {i === titleParts.length - 1 && titleHighlight && (
                  <span className="text-[#EF7B11]"> {titleHighlight}</span>
                )}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-sub text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        <div className="hero-cta-area flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#22c55e]/25"
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-base border border-white/20 hover:border-white/40 px-6 py-3.5 rounded-xl transition-all duration-200"
            >
              {secondaryCtaText}
            </a>
          )}
        </div>

        {ctaSubtext && (
          <p className="text-white/40 text-sm mt-4">{ctaSubtext}</p>
        )}
      </div>
    </section>
  )
}
