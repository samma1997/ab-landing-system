'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  TrendingUp,
  PiggyBank,
  BarChart3,
  Building2,
  Wallet,
  Target,
  type LucideIcon,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  'trending-up': TrendingUp,
  'piggy-bank': PiggyBank,
  'bar-chart': BarChart3,
  building: Building2,
  wallet: Wallet,
  target: Target,
}

export interface PillarCard {
  icon?: string | React.ReactNode
  title: string
  description: string
  highlight?: string
}

export interface PillarCardsProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  cards: PillarCard[]
  columns?: 2 | 3 | 4
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function PillarCards({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  cards,
  columns = 3,
  bgColor = 'white',
  id,
}: PillarCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Heading
      const heading = sectionRef.current.querySelector('.pc-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Cards stagger
      const cardEls = sectionRef.current.querySelectorAll('.pc-card')
      if (cardEls.length) {
        gsap.set(cardEls, { opacity: 0, y: 40 })
        gsap.to(cardEls, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.pc-grid'),
            start: 'top 80%',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  const bgClasses: Record<string, string> = {
    white: 'bg-white',
    light: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
  }
  const isDark = bgColor === 'dark'

  const colsClass: Record<number, string> = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  const renderIcon = (icon: string | React.ReactNode | undefined) => {
    if (!icon) return <Target className="w-6 h-6" />
    if (typeof icon === 'string') {
      const IconComp = ICON_MAP[icon]
      return IconComp ? <IconComp className="w-6 h-6" /> : <Target className="w-6 h-6" />
    }
    return icon
  }

  return (
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="pc-heading text-center mb-14">
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

        {/* Cards */}
        <div className={`pc-grid grid ${colsClass[columns]} gap-6`}>
          {cards.map((card, i) => (
            <div
              key={i}
              className={`pc-card group rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:border-[#EF7B11]/30'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#EF7B11]/20'
              }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#EF7B11]/10 text-[#EF7B11] flex items-center justify-center mb-5 group-hover:bg-[#EF7B11] group-hover:text-white transition-colors duration-300">
                {renderIcon(card.icon)}
              </div>

              <h3
                className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}
              >
                {card.title}
              </h3>

              {card.highlight && (
                <p className="text-[#EF7B11] font-semibold text-sm mb-2">{card.highlight}</p>
              )}

              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
