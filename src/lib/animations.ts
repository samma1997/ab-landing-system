import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────

type AnimOpts = gsap.TweenVars
type CleanupFn = () => void

// ────────────────────────────────────────────────────────
// Entrance Animations
// ────────────────────────────────────────────────────────

/** Fade element up from below */
export function fadeUp(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    ...opts,
  })
  return () => tween.kill()
}

/** Simple fade in */
export function fadeIn(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    ...opts,
  })
  return () => tween.kill()
}

/** Slide in from the left */
export function slideInLeft(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    ...opts,
  })
  return () => tween.kill()
}

/** Slide in from the right */
export function slideInRight(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    ...opts,
  })
  return () => tween.kill()
}

/** Scale up from smaller size */
export function scaleUp(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    scale: 0.85,
    opacity: 0,
    duration: 0.7,
    ease: 'back.out(1.4)',
    ...opts,
  })
  return () => tween.kill()
}

/** Clip-path reveal from a direction */
export function clipReveal(
  el: gsap.TweenTarget,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  opts?: AnimOpts
): CleanupFn {
  const clipMap: Record<string, string> = {
    up: 'inset(100% 0 0 0)',
    down: 'inset(0 0 100% 0)',
    left: 'inset(0 100% 0 0)',
    right: 'inset(0 0 0 100%)',
  }
  gsap.set(el, { clipPath: clipMap[direction] })
  const tween = gsap.to(el, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 1,
    ease: 'power4.inOut',
    ...opts,
  })
  return () => tween.kill()
}

// ────────────────────────────────────────────────────────
// Scroll-Triggered Animations
// ────────────────────────────────────────────────────────

/** Fade up on scroll into view */
export function scrollFadeUp(el: gsap.TweenTarget, opts?: AnimOpts): CleanupFn {
  const tween = gsap.from(el, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el as gsap.DOMTarget,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...opts,
  })
  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

/** Stagger children on scroll */
export function scrollStagger(
  parent: gsap.DOMTarget,
  childSelector: string,
  opts?: AnimOpts
): CleanupFn {
  const children = (parent as Element).querySelectorAll(childSelector)
  if (!children.length) return () => {}
  gsap.set(children, { opacity: 0, y: 30 })
  const tween = gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: parent,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    ...opts,
  })
  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

/** Animate a number counting up on scroll */
export function scrollCounter(
  el: HTMLElement,
  target: number,
  opts?: { duration?: number; prefix?: string; suffix?: string; decimals?: number }
): CleanupFn {
  const obj = { val: 0 }
  const prefix = opts?.prefix ?? ''
  const suffix = opts?.suffix ?? ''
  const decimals = opts?.decimals ?? 0

  const tween = gsap.to(obj, {
    val: target,
    duration: opts?.duration ?? 2,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate() {
      el.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`
    },
  })
  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

// ────────────────────────────────────────────────────────
// Micro-Interactions
// ────────────────────────────────────────────────────────

/** Magnetic hover effect — element follows cursor within bounds */
export function magneticHover(el: HTMLElement, strength: number = 0.3): CleanupFn {
  const handleMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' })
  }
  const handleLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.3)' })
  }
  el.addEventListener('mousemove', handleMove)
  el.addEventListener('mouseleave', handleLeave)
  return () => {
    el.removeEventListener('mousemove', handleMove)
    el.removeEventListener('mouseleave', handleLeave)
  }
}

/** CTA button hover fill animation */
export function buttonHoverFill(el: HTMLElement): CleanupFn {
  const fill = document.createElement('span')
  fill.style.cssText =
    'position:absolute;inset:0;border-radius:inherit;background:rgba(255,255,255,0.15);transform:scaleX(0);transform-origin:left;pointer-events:none;'
  el.style.position = 'relative'
  el.style.overflow = 'hidden'
  el.appendChild(fill)

  const handleEnter = () => gsap.to(fill, { scaleX: 1, duration: 0.4, ease: 'power2.out' })
  const handleLeave = () => gsap.to(fill, { scaleX: 0, duration: 0.3, ease: 'power2.in' })

  el.addEventListener('mouseenter', handleEnter)
  el.addEventListener('mouseleave', handleLeave)
  return () => {
    el.removeEventListener('mouseenter', handleEnter)
    el.removeEventListener('mouseleave', handleLeave)
    fill.remove()
  }
}

// ────────────────────────────────────────────────────────
// Text Animations
// ────────────────────────────────────────────────────────

/** Reveal text by lines with overflow clip */
export function textRevealLines(el: HTMLElement, opts?: AnimOpts): CleanupFn {
  const text = el.textContent || ''
  const words = text.split(' ')
  const linesPerGroup = Math.ceil(words.length / 3)
  el.innerHTML = ''
  const spans: HTMLElement[] = []

  for (let i = 0; i < words.length; i += linesPerGroup) {
    const wrapper = document.createElement('span')
    wrapper.style.display = 'block'
    wrapper.style.overflow = 'hidden'
    const inner = document.createElement('span')
    inner.style.display = 'block'
    inner.textContent = words.slice(i, i + linesPerGroup).join(' ')
    wrapper.appendChild(inner)
    el.appendChild(wrapper)
    spans.push(inner)
  }

  gsap.set(spans, { yPercent: 110 })
  const tween = gsap.to(spans, {
    yPercent: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...opts,
  })

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
  }
}

/** Typewriter effect */
export function typewriter(
  el: HTMLElement,
  text: string,
  opts?: { speed?: number; delay?: number }
): CleanupFn {
  const speed = opts?.speed ?? 0.04
  const delay = opts?.delay ?? 0
  el.textContent = ''
  const chars = text.split('')
  let killed = false

  const tl = gsap.timeline({ delay })
  chars.forEach((char, i) => {
    tl.call(
      () => {
        if (!killed) el.textContent += char
      },
      [],
      i * speed
    )
  })

  return () => {
    killed = true
    tl.kill()
  }
}

// ────────────────────────────────────────────────────────
// Utility / Layout Animations
// ────────────────────────────────────────────────────────

/** Infinite horizontal marquee scroll for a track element */
export function scrollMarquee(
  track: HTMLElement,
  opts?: { speed?: number; direction?: 'left' | 'right'; pauseOnHover?: boolean }
): CleanupFn {
  const speed = opts?.speed ?? 40 // seconds for one full cycle
  const direction = opts?.direction ?? 'left'

  // Clone content for seamless loop
  const clone = track.innerHTML
  track.innerHTML = clone + clone

  const xPercent = direction === 'left' ? -50 : 50
  const fromPercent = direction === 'left' ? 0 : -50

  gsap.set(track, { xPercent: fromPercent })

  const tween = gsap.to(track, {
    xPercent,
    duration: speed,
    ease: 'none',
    repeat: -1,
  })

  if (opts?.pauseOnHover) {
    const parent = track.parentElement
    if (parent) {
      const pause = () => gsap.to(tween, { timeScale: 0, duration: 0.5 })
      const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.5 })
      parent.addEventListener('mouseenter', pause)
      parent.addEventListener('mouseleave', resume)
      return () => {
        parent.removeEventListener('mouseenter', pause)
        parent.removeEventListener('mouseleave', resume)
        tween.kill()
      }
    }
  }

  return () => tween.kill()
}

/** Create a GSAP context for React component cleanup */
export function createAnimContext(
  scope: React.RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context) => void
): CleanupFn {
  const ctx = gsap.context(() => {
    if (scope.current) setup(ctx as unknown as gsap.Context)
  }, scope)
  return () => ctx.revert()
}
