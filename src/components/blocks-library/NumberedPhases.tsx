'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface Phase {
  number?: number
  title: string
  description: string
  icon?: React.ReactNode
}

export interface NumberedPhasesProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  phases: Phase[]
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function NumberedPhases({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  phases,
  bgColor = 'light',
  id,
}: NumberedPhasesProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Heading
      const heading = sectionRef.current.querySelector('.np-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Cards
      const cards = sectionRef.current.querySelectorAll('.np-card')
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.np-grid'),
            start: 'top 80%',
          },
        })
      }

      // Number counters
      const nums = sectionRef.current.querySelectorAll('.np-number')
      nums.forEach((num) => {
        gsap.from(num, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: { trigger: num, start: 'top 85%' },
        })
      })
    },
    { scope: sectionRef }
  )

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
  }
  const isDark = bgColor === 'dark'

  return (
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="np-heading text-center mb-14">
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

        {/* Phase Cards */}
        <div className="np-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, i) => {
            const num = phase.number ?? i + 1
            return (
              <div
                key={i}
                className={`np-card relative rounded-2xl p-6 sm:p-8 ${
                  isDark
                    ? 'bg-white/5 border border-white/10'
                    : 'bg-white border border-gray-100 shadow-sm'
                } hover:shadow-lg transition-shadow duration-300`}
              >
                {/* Number badge */}
                <div className="np-number w-12 h-12 rounded-xl bg-[#EF7B11] flex items-center justify-center mb-5">
                  <span className="text-white font-black text-lg">{num}</span>
                </div>

                {/* Connector line (except last) */}
                {i < phases.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 border-t-2 border-dashed border-[#EF7B11]/30 z-10" />
                )}

                <h3
                  className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}
                >
                  {phase.title}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                  {phase.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
