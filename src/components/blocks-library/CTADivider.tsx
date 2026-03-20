'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface CTADividerProps {
  text?: string
  ctaText: string
  ctaHref?: string
  variant?: 'orange' | 'green' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function CTADivider({
  text,
  ctaText,
  ctaHref = '#form',
  variant = 'orange',
  size = 'md',
  id,
}: CTADividerProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const inner = sectionRef.current.querySelector('.cta-inner')
      if (inner) {
        gsap.from(inner, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        })
      }

      // Button scale pulse
      const btn = sectionRef.current.querySelector('.cta-btn')
      if (btn) {
        gsap.from(btn, {
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        })
      }
    },
    { scope: sectionRef }
  )

  const bgClasses: Record<string, string> = {
    orange: 'bg-gradient-to-r from-[#EF7B11] to-[#E57712]',
    green: 'bg-gradient-to-r from-[#22c55e] to-[#16a34a]',
    dark: 'bg-[#1e293b]',
  }

  const btnClasses: Record<string, string> = {
    orange: 'bg-white hover:bg-gray-100 text-[#EF7B11]',
    green: 'bg-white hover:bg-gray-100 text-[#22c55e]',
    dark: 'bg-[#22c55e] hover:bg-[#16a34a] text-white',
  }

  const padClasses: Record<string, string> = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
  }

  return (
    <section ref={sectionRef} id={id} className={`${bgClasses[variant]} ${padClasses[size]}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="cta-inner">
          {text && (
            <p className="text-white font-semibold text-lg sm:text-xl mb-5">{text}</p>
          )}
          <a
            href={ctaHref}
            className={`cta-btn inline-flex items-center gap-2 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg ${btnClasses[variant]}`}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
