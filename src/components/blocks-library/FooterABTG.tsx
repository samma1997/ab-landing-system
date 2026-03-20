'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const BASE_PATH = '/ab-landing-system'

// ── Types ──────────────────────────────────────────────

export interface FooterLink {
  label: string
  href: string
}

export interface FooterABTGProps {
  companyName?: string
  companyAddress?: string
  companyVat?: string
  logo?: string
  links?: FooterLink[]
  socialLinks?: { label: string; href: string; icon?: React.ReactNode }[]
  disclaimers?: string[]
  copyrightYear?: number
  id?: string
}

// ── Component ──────────────────────────────────────────

export function FooterABTG({
  companyName = 'Alfio Bardolla Training Group S.p.A.',
  companyAddress = 'Via Boscovich 16, 20124 Milano',
  companyVat = 'P.IVA 04aborisci29190965',
  logo,
  links = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookie' },
    { label: 'Termini e Condizioni', href: '/termini' },
  ],
  socialLinks,
  disclaimers = [
    'I risultati individuali possono variare. Le testimonianze e gli esempi utilizzati sono risultati eccezionali e non si applicano a qualsiasi individuo.',
    'Questo sito non fa parte del sito Facebook o Facebook Inc. Inoltre, questo sito NON è approvato da Facebook in alcun modo. FACEBOOK è un marchio registrato di FACEBOOK, Inc.',
  ],
  copyrightYear,
  id,
}: FooterABTGProps) {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!footerRef.current) return

      const els = footerRef.current.querySelectorAll('.ft-fade')
      gsap.set(els, { opacity: 0, y: 15 })
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      })
    },
    { scope: footerRef }
  )

  const year = copyrightYear ?? new Date().getFullYear()

  return (
    <footer
      ref={footerRef}
      id={id}
      className="bg-[#0f172a] text-white/60 pt-12 pb-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="ft-fade flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8 pb-8 border-b border-white/10">
          {/* Logo / Company */}
          <div className="text-center sm:text-left">
            {logo ? (
              <img
                src={`${BASE_PATH}${logo}`}
                alt={companyName}
                className="h-8 mb-3 brightness-0 invert opacity-70"
              />
            ) : (
              <p className="text-white font-bold text-lg mb-1">{companyName}</p>
            )}
            <p className="text-xs text-white/40">{companyAddress}</p>
            {companyVat && <p className="text-xs text-white/40">{companyVat}</p>}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="ft-fade flex justify-center gap-4 mb-8">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#EF7B11]/20 flex items-center justify-center text-white/60 hover:text-[#EF7B11] transition-all"
              >
                {social.icon || (
                  <span className="text-xs font-bold">{social.label.charAt(0)}</span>
                )}
              </a>
            ))}
          </div>
        )}

        {/* Disclaimers */}
        {disclaimers.length > 0 && (
          <div className="ft-fade space-y-3 mb-8">
            {disclaimers.map((text, i) => (
              <p key={i} className="text-[10px] leading-relaxed text-white/30 text-center max-w-3xl mx-auto">
                {text}
              </p>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="ft-fade text-center">
          <p className="text-xs text-white/30">
            &copy; {year} {companyName} — Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
