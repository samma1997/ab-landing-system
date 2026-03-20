'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Star, ShieldCheck, Users } from 'lucide-react'

const BASE_PATH = '/ab-landing-system'

// ── Types ──────────────────────────────────────────────

export interface HeroSplitFormField {
  label: string
  placeholder: string
  type: string
  name: string
}

export interface HeroSplitProps {
  trustpilotRating?: string
  trustpilotCount?: string
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle: string
  disclaimer?: string
  bonusText?: string
  formFields?: HeroSplitFormField[]
  ctaText: string
  ctaSubtext?: string
  bgImage?: string
  badges?: string[]
  formTitle?: string
  formAction?: string
}

// ── Component ──────────────────────────────────────────

export function HeroSplit({
  trustpilotRating,
  trustpilotCount,
  preTitle,
  title,
  titleHighlight,
  subtitle,
  disclaimer,
  bonusText,
  formFields = [
    { label: 'Nome', placeholder: 'Il tuo nome', type: 'text', name: 'name' },
    { label: 'Email', placeholder: 'La tua email', type: 'email', name: 'email' },
    { label: 'Telefono', placeholder: '+39 ...', type: 'tel', name: 'phone' },
  ],
  ctaText = 'RISERVA IL TUO POSTO GRATIS',
  ctaSubtext,
  bgImage,
  badges,
  formTitle = 'Registrati Ora',
  formAction,
}: HeroSplitProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Left column
      const leftEls = sectionRef.current.querySelectorAll('.hero-left > *')
      gsap.set(leftEls, { opacity: 0, y: 40 })
      tl.to(leftEls, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }, 0.2)

      // Right form card
      const formCard = sectionRef.current.querySelector('.hero-form-card')
      if (formCard) {
        gsap.set(formCard, { opacity: 0, x: 50, scale: 0.96 })
        tl.to(formCard, { opacity: 1, x: 0, scale: 1, duration: 0.8 }, 0.4)
      }

      // Badges
      const badgeEls = sectionRef.current.querySelectorAll('.hero-badge')
      if (badgeEls.length) {
        gsap.set(badgeEls, { opacity: 0, scale: 0.7 })
        tl.to(badgeEls, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, 0.6)
      }
    },
    { scope: sectionRef }
  )

  const bg = bgImage ? `${BASE_PATH}${bgImage}` : undefined

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#1e293b]"
    >
      {/* Background image overlay */}
      {bg && (
        <div className="absolute inset-0 z-0">
          <img src={bg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1e293b]/85" />
        </div>
      )}

      {/* Decorative glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#EF7B11]/10 rounded-full blur-[140px] z-0" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column — Text */}
        <div className="hero-left">
          {/* Trustpilot */}
          {trustpilotRating && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-[#00B67A] text-[#00B67A]" />
                ))}
              </div>
              <span className="text-white/80 text-sm">
                {trustpilotRating} su Trustpilot
                {trustpilotCount && <span className="text-white/50"> ({trustpilotCount} recensioni)</span>}
              </span>
            </div>
          )}

          {preTitle && (
            <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
              {preTitle}
            </p>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-5">
            {title}
            {titleHighlight && (
              <>
                {' '}
                <span className="text-[#EF7B11]">{titleHighlight}</span>
              </>
            )}
          </h1>

          <p className="text-lg text-white/70 leading-relaxed mb-6 max-w-xl">
            {subtitle}
          </p>

          {bonusText && (
            <div className="bg-[#EF7B11]/10 border border-[#EF7B11]/30 rounded-xl px-5 py-3 mb-6 inline-block">
              <p className="text-[#EF7B11] font-semibold text-sm">{bonusText}</p>
            </div>
          )}

          {/* Badges row */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="hero-badge inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                  {b}
                </span>
              ))}
            </div>
          )}

          {disclaimer && (
            <p className="text-white/40 text-xs">{disclaimer}</p>
          )}
        </div>

        {/* Right Column — Form */}
        <div className="hero-form-card bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md lg:max-w-none mx-auto lg:mx-0 w-full">
          <h2 className="text-xl font-bold text-[#1e293b] mb-1 text-center">{formTitle}</h2>
          {ctaSubtext && (
            <p className="text-[#67768e] text-sm mb-5 text-center">{ctaSubtext}</p>
          )}

          <form action={formAction} method="POST" className="space-y-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-[#1e293b] mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-[#1e293b] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EF7B11]/40 focus:border-[#EF7B11] transition"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22c55e]/30"
            >
              {ctaText}
            </button>
          </form>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#67768e]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Gratis
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Posti Limitati
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
