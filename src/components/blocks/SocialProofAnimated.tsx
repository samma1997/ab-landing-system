'use client'

import { useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { SocialProofBlock } from '@/types/blocks'

gsap.registerPlugin(ScrollTrigger)

function parseNumericValue(value: string): { num: number; isFloat: boolean } | null {
  const cleaned = value.replace(/[^0-9.]/g, '')
  const num = parseFloat(cleaned)
  if (isNaN(num)) return null
  return { num, isFloat: cleaned.includes('.') }
}

function CounterStat({
  value,
  label,
  prefix,
  suffix,
}: {
  value: string
  label: string
  prefix?: string
  suffix?: string
}) {
  const counterRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current || !counterRef.current) return
    hasAnimated.current = true

    const parsed = parseNumericValue(value)
    if (!parsed) {
      // Not a number, just show as-is
      if (counterRef.current) counterRef.current.textContent = `${prefix || ''}${value}${suffix || ''}`
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: parsed.num,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (!counterRef.current) return
        const displayVal = parsed.isFloat
          ? obj.val.toFixed(1)
          : Math.round(obj.val).toLocaleString('it-IT')
        counterRef.current.textContent = `${prefix || ''}${displayVal}${suffix || ''}`
      },
    })
  }, [value, prefix, suffix])

  useGSAP(() => {
    if (!counterRef.current) return

    ScrollTrigger.create({
      trigger: counterRef.current,
      start: 'top 85%',
      once: true,
      onEnter: animate,
    })
  }, [animate])

  return (
    <div className="text-center">
      <div
        ref={counterRef}
        className="text-3xl md:text-4xl font-black text-primary counter-value"
      >
        {prefix}0{suffix}
      </div>
      <div className="text-sm text-gray-600 mt-1 font-medium">{label}</div>
    </div>
  )
}

export function SocialProofAnimated({ data }: { data: SocialProofBlock }) {
  const { stats, logos, mediaLogos, description, bgOverride } = data
  const containerRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Stagger stat cards entrance
      const statCards = containerRef.current.querySelectorAll('.stat-card')
      if (statCards.length > 0) {
        gsap.set(statCards, { opacity: 0, y: 30, scale: 0.95 })
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(statCards, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            })
          },
        })
      }

      // Logo row stagger
      if (logosRef.current) {
        const logoItems = logosRef.current.querySelectorAll('.logo-item')
        if (logoItems.length > 0) {
          gsap.set(logoItems, { opacity: 0, y: 15 })
          ScrollTrigger.create({
            trigger: logosRef.current,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(logoItems, {
                opacity: 0.6,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
              })
            },
          })
        }
      }
    },
    { scope: containerRef }
  )

  return (
    <SectionWrapper bgOverride={bgOverride || 'bg-surface'} className="!py-10 md:!py-14">
      <div ref={containerRef}>
        {/* Stats row */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <CounterStat
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
            ))}
          </div>
        )}

        {description && (
          <p className="text-center text-gray-500 text-sm mb-6">{description}</p>
        )}

        {/* Logos row */}
        {logos && logos.length > 0 && (
          <div
            ref={logosRef}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          >
            {logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="logo-item h-8 md:h-10 w-auto grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        )}

        {/* Media mention logos */}
        {mediaLogos && mediaLogos.length > 0 && (
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-4">
              Visto su
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {mediaLogos.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-6 w-auto opacity-40 hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
