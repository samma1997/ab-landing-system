'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface ChecklistItem {
  text: string
  bold?: string
}

export interface ChecklistSectionProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  items: ChecklistItem[]
  columns?: 1 | 2 | 3 | 4
  bgColor?: 'white' | 'light' | 'dark'
  checkColor?: 'orange' | 'green'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function ChecklistSection({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  items,
  columns = 2,
  bgColor = 'white',
  checkColor = 'green',
  id,
}: ChecklistSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Title
      const heading = sectionRef.current.querySelector('.cl-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Items stagger
      const listItems = sectionRef.current.querySelectorAll('.cl-item')
      if (listItems.length) {
        gsap.set(listItems, { opacity: 0, x: -20 })
        gsap.to(listItems, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.cl-grid'),
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
  const textClasses: Record<string, { title: string; text: string; sub: string }> = {
    white: { title: 'text-[#1e293b]', text: 'text-[#1e293b]/80', sub: 'text-[#67768e]' },
    light: { title: 'text-[#1e293b]', text: 'text-[#1e293b]/80', sub: 'text-[#67768e]' },
    dark: { title: 'text-white', text: 'text-white/80', sub: 'text-white/50' },
  }
  const colors = textClasses[bgColor]

  const colsClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  const checkBg = checkColor === 'orange' ? 'bg-[#EF7B11]/15 text-[#EF7B11]' : 'bg-[#22c55e]/15 text-[#22c55e]'

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="cl-heading text-center mb-12">
          {preTitle && (
            <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
              {preTitle}
            </p>
          )}
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${colors.title} mb-4`}>
            {title}
            {titleHighlight && <span className="text-[#EF7B11]"> {titleHighlight}</span>}
          </h2>
          {subtitle && (
            <p className={`text-lg ${colors.sub} max-w-2xl mx-auto`}>{subtitle}</p>
          )}
        </div>

        {/* Grid */}
        <div className={`cl-grid grid ${colsClass[columns]} gap-4`}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`cl-item flex items-start gap-3 p-4 rounded-xl ${
                bgColor === 'dark' ? 'bg-white/5' : 'bg-[#F5F5F7]'
              }`}
            >
              <span className={`flex-shrink-0 w-7 h-7 rounded-full ${checkBg} flex items-center justify-center mt-0.5`}>
                <Check className="w-4 h-4" />
              </span>
              <p className={`${colors.text} text-[15px] leading-relaxed`}>
                {item.bold && <strong className={colors.title}>{item.bold} </strong>}
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
