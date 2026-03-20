'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AlertTriangle, Clock, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface UrgencySectionProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  bulletPoints?: string[]
  ctaText?: string
  ctaHref?: string
  icon?: 'alert' | 'clock' | 'users'
  bgColor?: 'dark' | 'orange'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function UrgencySection({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  bulletPoints,
  ctaText,
  ctaHref = '#form',
  icon = 'alert',
  bgColor = 'dark',
  id,
}: UrgencySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Icon pulse
      const iconEl = sectionRef.current.querySelector('.urg-icon')
      if (iconEl) {
        gsap.set(iconEl, { scale: 0, rotation: -15 })
        tl.to(iconEl, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' }, 0)
      }

      // Text
      const textEls = sectionRef.current.querySelectorAll('.urg-text')
      gsap.set(textEls, { opacity: 0, y: 25 })
      tl.to(textEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 0.2)

      // Bullets
      const bullets = sectionRef.current.querySelectorAll('.urg-bullet')
      if (bullets.length) {
        gsap.set(bullets, { opacity: 0, x: -15 })
        tl.to(bullets, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, 0.5)
      }

      // CTA
      const cta = sectionRef.current.querySelector('.urg-cta')
      if (cta) {
        gsap.set(cta, { opacity: 0, y: 20 })
        tl.to(cta, { opacity: 1, y: 0, duration: 0.5 }, 0.7)
      }
    },
    { scope: sectionRef }
  )

  const IconComp = icon === 'clock' ? Clock : icon === 'users' ? Users : AlertTriangle

  const isDark = bgColor === 'dark'
  const bgClass = isDark
    ? 'bg-gradient-to-br from-[#1e293b] via-[#1e293b] to-[#0f172a]'
    : 'bg-gradient-to-br from-[#EF7B11] to-[#E57712]'

  return (
    <section ref={sectionRef} id={id} className={`${bgClass} py-16 sm:py-20 relative overflow-hidden`}>
      {/* Decorative elements */}
      {isDark && (
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#EF7B11]/5 rounded-full blur-[120px]" />
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="urg-icon mb-6 inline-flex">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-[#EF7B11]/15' : 'bg-white/20'
            }`}
          >
            <IconComp className={`w-8 h-8 ${isDark ? 'text-[#EF7B11]' : 'text-white'}`} />
          </div>
        </div>

        {preTitle && (
          <p
            className={`urg-text font-semibold text-sm uppercase tracking-wider mb-3 ${
              isDark ? 'text-[#EF7B11]' : 'text-white/80'
            }`}
          >
            {preTitle}
          </p>
        )}

        <h2 className="urg-text text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
          {title}
          {titleHighlight && (
            <span className={isDark ? 'text-[#EF7B11]' : 'text-[#1e293b]'}>
              {' '}{titleHighlight}
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="urg-text text-lg text-white/70 max-w-2xl mx-auto mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Bullet points */}
        {bulletPoints && bulletPoints.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {bulletPoints.map((point, i) => (
              <span
                key={i}
                className={`urg-bullet inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  isDark
                    ? 'bg-white/10 text-white/90 border border-white/10'
                    : 'bg-white/20 text-white border border-white/20'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                {point}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaText && (
          <a
            href={ctaHref}
            className={`urg-cta inline-flex items-center gap-2 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg ${
              isDark
                ? 'bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-[#22c55e]/25'
                : 'bg-white hover:bg-gray-100 text-[#EF7B11] shadow-black/10'
            }`}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}
