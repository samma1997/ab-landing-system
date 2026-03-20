'use client'

import { useRef, useEffect } from 'react'
import { scrollMarquee } from '@/lib/animations'

const BASE_PATH = '/ab-landing-system'

// ── Types ──────────────────────────────────────────────

export interface LogoTickerProps {
  label?: string
  logos: { src: string; alt: string; width?: number }[]
  speed?: number
  bgColor?: 'white' | 'light' | 'dark'
}

// ── Component ──────────────────────────────────────────

export function LogoTicker({
  label = 'Come visto su',
  logos,
  speed = 30,
  bgColor = 'white',
}: LogoTickerProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return
    const cleanup = scrollMarquee(trackRef.current, {
      speed,
      direction: 'left',
      pauseOnHover: true,
    })
    return cleanup
  }, [speed])

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
  }

  const textClass = bgColor === 'dark' ? 'text-white/50' : 'text-[#67768e]'
  const logoFilter = bgColor === 'dark' ? 'brightness-0 invert opacity-50' : 'grayscale opacity-40'

  return (
    <section className={`${bgClasses[bgColor]} py-6 sm:py-8 overflow-hidden`}>
      {label && (
        <p className={`text-center text-xs font-medium uppercase tracking-widest ${textClass} mb-4`}>
          {label}
        </p>
      )}

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-${bgColor === 'dark' ? '[#1e293b]' : bgColor === 'light' ? '[#F5F5F7]' : 'white'} to-transparent pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-${bgColor === 'dark' ? '[#1e293b]' : bgColor === 'light' ? '[#F5F5F7]' : 'white'} to-transparent pointer-events-none`} />

        <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap w-max">
          {logos.map((logo, i) => (
            <img
              key={i}
              src={`${BASE_PATH}${logo.src}`}
              alt={logo.alt}
              width={logo.width || 120}
              className={`h-8 sm:h-10 w-auto object-contain ${logoFilter} hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
              style={{ filter: bgColor === 'dark' ? 'brightness(0) invert(1)' : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
