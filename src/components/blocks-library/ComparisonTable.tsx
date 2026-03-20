'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { X, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface ComparisonRow {
  before: string
  after: string
}

export interface ComparisonTableProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  beforeLabel?: string
  afterLabel?: string
  rows: ComparisonRow[]
  bgColor?: 'white' | 'light'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function ComparisonTable({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  beforeLabel = 'Prima',
  afterLabel = 'Dopo il corso',
  rows,
  bgColor = 'white',
  id,
}: ComparisonTableProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const heading = sectionRef.current.querySelector('.ct-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Table rows stagger
      const tableRows = sectionRef.current.querySelectorAll('.ct-row')
      if (tableRows.length) {
        gsap.set(tableRows, { opacity: 0, y: 20 })
        gsap.to(tableRows, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.ct-table'),
            start: 'top 80%',
          },
        })
      }
    },
    { scope: sectionRef }
  )

  const bgClass = bgColor === 'light' ? 'bg-[#F5F5F7]' : 'bg-white'

  return (
    <section ref={sectionRef} id={id} className={`${bgClass} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="ct-heading text-center mb-12">
          {preTitle && (
            <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
              {preTitle}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e293b] mb-4">
            {title}
            {titleHighlight && <span className="text-[#EF7B11]"> {titleHighlight}</span>}
          </h2>
          {subtitle && (
            <p className="text-lg text-[#67768e] max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Comparison Table */}
        <div className="ct-table rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-2">
            <div className="bg-red-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-500/15 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </span>
                <span className="font-bold text-red-600 text-sm uppercase tracking-wider">
                  {beforeLabel}
                </span>
              </div>
            </div>
            <div className="bg-green-50 px-6 py-4 border-b border-gray-200 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                </span>
                <span className="font-bold text-[#22c55e] text-sm uppercase tracking-wider">
                  {afterLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className={`ct-row grid grid-cols-2 ${
                i < rows.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="px-6 py-4 bg-white">
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-[#1e293b]/70 text-sm leading-relaxed">{row.before}</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-white border-l border-gray-100">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                  <p className="text-[#1e293b] text-sm font-medium leading-relaxed">{row.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
