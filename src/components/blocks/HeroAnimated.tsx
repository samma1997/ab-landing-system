'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { clsx } from 'clsx'
import { Button } from '@/components/ui/Button'
import type { HeroBlock } from '@/types/blocks'

gsap.registerPlugin(ScrollTrigger)

export function HeroAnimated({ data }: { data: HeroBlock }) {
  const {
    layout,
    headline,
    headlineHtml,
    subheadline,
    cta,
    secondaryCta,
    heroImage,
    heroVideo,
    badge,
    trustIndicators,
    bgOverride,
  } = data

  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const bgParallaxRef = useRef<HTMLDivElement>(null)

  const isSplit = layout === 'split'
  const isVideoBg = layout === 'video-bg'

  useGSAP(
    () => {
      if (!sectionRef.current) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Badge scale in
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, scale: 0.5 })
        tl.to(badgeRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, 0.2)
      }

      // Split text headline animation
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.hero-line')
        if (lines.length > 0) {
          gsap.set(lines, { yPercent: 110 })
          tl.to(lines, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
          }, 0.3)
        } else {
          // Fallback: animate the heading itself
          gsap.set(headlineRef.current, { opacity: 0, y: 60 })
          tl.to(headlineRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.9,
          }, 0.3)
        }
      }

      // Subheadline fade up
      if (subheadlineRef.current) {
        gsap.set(subheadlineRef.current, { opacity: 0, y: 30 })
        tl.to(subheadlineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
        }, 0.7)
      }

      // CTA buttons slide up
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 30 })
        tl.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
        }, 0.9)
      }

      // Trust indicators stagger
      if (trustRef.current) {
        const items = trustRef.current.querySelectorAll('.trust-item')
        gsap.set(items, { opacity: 0, y: 20 })
        tl.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
        }, 1.1)
      }

      // Hero image clip-path reveal
      if (imageWrapRef.current) {
        gsap.set(imageWrapRef.current, { clipPath: 'inset(100% 0 0 0)' })
        tl.to(imageWrapRef.current, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.inOut',
        }, 0.4)
      }

      // Parallax on scroll for background
      if (bgParallaxRef.current) {
        gsap.to(bgParallaxRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: sectionRef }
  )

  // Wrap headline text in lines for split-text animation
  const wrapHeadlineInLines = (text: string) => {
    const words = text.split(' ')
    // Split into roughly 2-3 lines
    const wordsPerLine = Math.ceil(words.length / 2)
    const lines: string[] = []
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '))
    }
    return lines.map((line, i) => (
      <span key={i} className="split-text-line block">
        <span className="hero-line block">{line}</span>
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'relative min-h-[90vh] flex items-center overflow-hidden',
        bgOverride || 'bg-gradient-to-br from-secondary to-secondary-light'
      )}
    >
      {/* Parallax background layer */}
      <div ref={bgParallaxRef} className="absolute inset-0 -top-[10%] -bottom-[10%] z-0">
        {/* Orange accent glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pulse-glow" />
      </div>

      {/* Video background */}
      {isVideoBg && heroVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroVideo.posterImage}
            className="w-full h-full object-cover"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-secondary/80" />
        </div>
      )}

      <div
        className={clsx(
          'relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20',
          isSplit ? 'grid md:grid-cols-2 gap-12 items-center' : 'text-center'
        )}
      >
        {/* Text content */}
        <div className={isSplit ? '' : 'max-w-4xl mx-auto'}>
          {badge && (
            <span
              ref={badgeRef}
              className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full px-4 py-1 text-sm font-semibold mb-6"
            >
              {badge}
            </span>
          )}

          {headlineHtml ? (
            <h1
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: headlineHtml }}
            />
          ) : (
            <h1
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6"
            >
              {wrapHeadlineInLines(headline)}
            </h1>
          )}

          {subheadline && (
            <p
              ref={subheadlineRef}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              style={!isSplit ? { margin: '0 auto 2rem' } : undefined}
            >
              {subheadline}
            </p>
          )}

          <div
            ref={ctaRef}
            className={clsx('flex gap-4 flex-wrap', !isSplit && 'justify-center')}
          >
            <div className="pulse-glow rounded-lg">
              <Button {...cta} size="lg" />
            </div>
            {secondaryCta && <Button {...secondaryCta} variant="outline" size="lg" />}
          </div>

          {trustIndicators && trustIndicators.length > 0 && (
            <div
              ref={trustRef}
              className={clsx(
                'mt-8 flex gap-6 text-sm text-gray-400',
                !isSplit && 'justify-center'
              )}
            >
              {trustIndicators.map((t, i) => (
                <span key={i} className="trust-item flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hero image (split layout) with clip-path reveal */}
        {isSplit && heroImage && (
          <div ref={imageWrapRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width || 600}
                height={heroImage.height || 500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full text-white fill-current">
          <path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
        </svg>
      </div>
    </section>
  )
}
