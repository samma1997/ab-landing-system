'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Calendar, MapPin, Clock, ShieldCheck, Users, Gift } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Types ──────────────────────────────────────────────

export interface EventDetail {
  icon?: 'calendar' | 'location' | 'clock'
  label: string
  value: string
}

export interface FormField {
  label: string
  placeholder: string
  type: string
  name: string
  required?: boolean
}

export interface FormSectionProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  eventDetails?: EventDetail[]
  requisitoTitle?: string
  requisitoText?: string
  formFields?: FormField[]
  ctaText?: string
  ctaSubtext?: string
  privacyText?: string
  formAction?: string
  bonusBadge?: string
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// ── Component ──────────────────────────────────────────

export function FormSection({
  preTitle,
  title,
  titleHighlight,
  subtitle,
  eventDetails,
  requisitoTitle = 'Requisito di partecipazione',
  requisitoText,
  formFields = [
    { label: 'Nome', placeholder: 'Il tuo nome', type: 'text', name: 'first_name', required: true },
    { label: 'Cognome', placeholder: 'Il tuo cognome', type: 'text', name: 'last_name', required: true },
    { label: 'Email', placeholder: 'La tua email', type: 'email', name: 'email', required: true },
    { label: 'Telefono', placeholder: '+39 ...', type: 'tel', name: 'phone', required: true },
  ],
  ctaText = 'RISERVA IL TUO POSTO GRATIS',
  ctaSubtext,
  privacyText = 'Inviando il modulo accetti la nostra Privacy Policy. Nessuno spam, mai.',
  formAction,
  bonusBadge,
  bgColor = 'light',
  id = 'form',
}: FormSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Heading
      const heading = sectionRef.current.querySelector('.fs-heading')
      if (heading) {
        gsap.from(heading, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }

      // Left column
      const left = sectionRef.current.querySelector('.fs-left')
      if (left) {
        gsap.from(left, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: left, start: 'top 85%' },
        })
      }

      // Form card
      const formCard = sectionRef.current.querySelector('.fs-form')
      if (formCard) {
        gsap.from(formCard, {
          x: 40,
          opacity: 0,
          scale: 0.97,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: formCard, start: 'top 85%' },
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

  const iconMap = {
    calendar: Calendar,
    location: MapPin,
    clock: Clock,
  }

  return (
    <section ref={sectionRef} id={id} className={`${bgClasses[bgColor]} py-16 sm:py-20 lg:py-24`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="fs-heading text-center mb-12">
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

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left — Event Details */}
          <div className="fs-left">
            {/* Event details */}
            {eventDetails && eventDetails.length > 0 && (
              <div className="space-y-4 mb-8">
                {eventDetails.map((detail, i) => {
                  const Icon = detail.icon ? iconMap[detail.icon] : Calendar
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        isDark ? 'bg-white/5' : 'bg-white shadow-sm border border-gray-100'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#EF7B11]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#EF7B11]" />
                      </div>
                      <div>
                        <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-white/50' : 'text-[#67768e]'}`}>
                          {detail.label}
                        </p>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-[#1e293b]'}`}>
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Requisito box */}
            {requisitoText && (
              <div
                className={`rounded-xl p-5 border-l-4 border-[#EF7B11] ${
                  isDark ? 'bg-[#EF7B11]/10' : 'bg-[#EF7B11]/5'
                }`}
              >
                <p className={`font-bold text-sm mb-1 ${isDark ? 'text-[#EF7B11]' : 'text-[#EF7B11]'}`}>
                  {requisitoTitle}
                </p>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-[#1e293b]/70'}`}>
                  {requisitoText}
                </p>
              </div>
            )}

            {/* Bonus badge */}
            {bonusBadge && (
              <div
                className={`mt-6 flex items-center gap-3 p-4 rounded-xl ${
                  isDark ? 'bg-[#22c55e]/10 border border-[#22c55e]/20' : 'bg-[#22c55e]/5 border border-[#22c55e]/15'
                }`}
              >
                <Gift className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                <p className="text-sm font-semibold text-[#22c55e]">{bonusBadge}</p>
              </div>
            )}
          </div>

          {/* Right — Form */}
          <div
            className={`fs-form rounded-2xl p-6 sm:p-8 ${
              isDark ? 'bg-white/10 backdrop-blur border border-white/10' : 'bg-white shadow-xl border border-gray-100'
            }`}
          >
            <form action={formAction} method="POST" className="space-y-4">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label
                    className={`block text-sm font-medium mb-1 ${isDark ? 'text-white/80' : 'text-[#1e293b]'}`}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    className={`w-full px-4 py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#EF7B11]/40 ${
                      isDark
                        ? 'bg-white/10 border border-white/20 text-white placeholder:text-white/40'
                        : 'bg-[#F5F5F7] border border-gray-200 text-[#1e293b] placeholder:text-gray-400'
                    }`}
                  />
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22c55e]/30 mt-2"
              >
                {ctaText}
              </button>

              {ctaSubtext && (
                <p className="text-center text-xs text-[#67768e] mt-1">{ctaSubtext}</p>
              )}
            </form>

            {/* Trust indicators */}
            <div className={`flex items-center justify-center gap-4 mt-5 text-xs ${isDark ? 'text-white/40' : 'text-[#67768e]'}`}>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Gratis
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Posti Limitati
              </span>
            </div>

            {privacyText && (
              <p className={`text-center text-[10px] mt-3 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
                {privacyText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
