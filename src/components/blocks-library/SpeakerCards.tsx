'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BASE_PATH = '/ab-landing-system'

// ── Types ──────────────────────────────────────────────

export interface Speaker {
  name: string
  role: string
  photo: string
  credentials: string[]
  bio?: string
}

export interface SpeakerCardsProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  speakers: Speaker[]
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function SpeakerCards({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  speakers,
  bgColor = 'white',
  id,
}: SpeakerCardsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Heading
      const heading = sectionRef.current.querySelector('.sp-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Speaker cards
      const cards = sectionRef.current.querySelectorAll('.sp-card')
      if (cards.length) {
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          })

          // Photo clip reveal
          const photo = card.querySelector('.sp-photo')
          if (photo) {
            gsap.from(photo, {
              clipPath: 'inset(100% 0 0 0)',
              duration: 1,
              ease: 'power4.inOut',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            })
          }
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

  const colsClass =
    speakers.length === 1
      ? 'max-w-2xl mx-auto'
      : speakers.length === 2
        ? 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'

  return (
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="sp-heading text-center mb-14">
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

        {/* Speaker cards */}
        <div className={colsClass}>
          {speakers.map((speaker, i) => (
            <div
              key={i}
              className={`sp-card rounded-2xl overflow-hidden ${
                isDark
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-gray-100 shadow-md'
              }`}
            >
              {/* Photo */}
              <div className="sp-photo relative aspect-[4/3] overflow-hidden">
                <img
                  src={`${BASE_PATH}${speaker.photo}`}
                  alt={speaker.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay at bottom */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${
                    isDark ? 'from-[#1e293b]' : 'from-white'
                  } to-transparent`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1e293b]'}`}
                >
                  {speaker.name}
                </h3>
                <p className="text-[#EF7B11] font-semibold text-sm mb-4">{speaker.role}</p>

                {speaker.bio && (
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-white/60' : 'text-[#67768e]'}`}>
                    {speaker.bio}
                  </p>
                )}

                {/* Credentials */}
                {speaker.credentials.length > 0 && (
                  <ul className="space-y-2">
                    {speaker.credentials.map((cred, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#EF7B11]/15 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-[#EF7B11]" />
                        </span>
                        <span
                          className={`text-sm ${isDark ? 'text-white/70' : 'text-[#1e293b]/70'}`}
                        >
                          {cred}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
