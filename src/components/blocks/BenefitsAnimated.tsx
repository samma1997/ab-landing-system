'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  BookOpen,
  Users,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
} from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { BenefitsBlock } from '@/types/blocks'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'trending-up': TrendingUp,
  shield: Shield,
  zap: Zap,
  target: Target,
  award: Award,
  'book-open': BookOpen,
  users: Users,
  'bar-chart': BarChart3,
  'dollar-sign': DollarSign,
  clock: Clock,
  'check-circle': CheckCircle,
  star: Star,
}

export function BenefitsAnimated({ data }: { data: BenefitsBlock }) {
  const { sectionTitle, sectionSubtitle, benefits, layout, bgOverride } = data
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const gridCols =
    layout === 'grid-3'
      ? 'md:grid-cols-3'
      : layout === 'grid-2'
        ? 'md:grid-cols-2'
        : 'md:grid-cols-1'

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Section title slides in from left
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, x: -60 })
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
        })
      }

      // Cards stagger from bottom with scale
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.benefit-card')
        if (cards.length > 0) {
          gsap.set(cards, { opacity: 0, y: 50, scale: 0.96 })
          ScrollTrigger.create({
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reset',
            onEnter: () => {
              gsap.to(cards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power3.out',
              })
            },
            onLeaveBack: () => {
              gsap.set(cards, { opacity: 0, y: 50, scale: 0.96 })
            },
          })
        }

        // Hover effects via event delegation
        cards.forEach((card) => {
          const el = card as HTMLElement
          el.addEventListener('mouseenter', () => {
            gsap.to(el, {
              y: -8,
              scale: 1.02,
              boxShadow: '0 20px 40px rgba(215, 110, 17, 0.15)',
              duration: 0.3,
              ease: 'power2.out',
            })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(el, {
              y: 0,
              scale: 1,
              boxShadow: '0 0px 0px rgba(0,0,0,0)',
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <SectionWrapper bgOverride={bgOverride}>
      <div ref={sectionRef}>
        {sectionTitle && (
          <div ref={titleRef}>
            <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />
          </div>
        )}

        {layout === 'alternating' ? (
          <div ref={cardsRef} className="space-y-16">
            {benefits.map((benefit, i) => {
              const Icon = iconMap[benefit.icon] || CheckCircle
              const isReversed = i % 2 === 1
              return (
                <div
                  key={i}
                  className={`benefit-card flex flex-col md:flex-row items-center gap-8 ${
                    isReversed ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div ref={cardsRef} className={`grid ${gridCols} gap-8`}>
            {benefits.map((benefit, i) => {
              const Icon = iconMap[benefit.icon] || CheckCircle
              return (
                <div
                  key={i}
                  className="benefit-card group bg-white border border-gray-100 rounded-2xl p-8 transition-colors duration-300 hover:border-primary/20 cursor-default"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
