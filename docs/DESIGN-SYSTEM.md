# ABTG Landing System -- Design System & Conversion Playbook

**Version:** 1.0
**Updated:** March 2026
**Stack:** Next.js 16 + React 19 + Tailwind CSS v4 + GSAP 3 + Framer Motion

---

## Table of Contents

1. [Component Catalog](#1-component-catalog)
2. [Animation Patterns Library](#2-animation-patterns-library)
3. [Design Token Presets](#3-design-token-presets)
4. [Copywriting Frameworks](#4-copywriting-frameworks)
5. [Conversion Optimization Checklist](#5-conversion-optimization-checklist)
6. [Section Ordering Best Practices](#6-section-ordering-best-practices)

---

## 1. Component Catalog

### 1A. Existing Block Components

These are already implemented in `src/components/blocks/`:

| Block Type | Component | File |
|---|---|---|
| `hero` | `HeroAnimated` | `HeroAnimated.tsx` |
| `social-proof` | `SocialProofAnimated` | `SocialProofAnimated.tsx` |
| `benefits` | `BenefitsAnimated` | `BenefitsAnimated.tsx` |
| `testimonials` | `TestimonialSection` | `TestimonialSection.tsx` |
| `speaker` | `SpeakerSection` | `SpeakerSection.tsx` |
| `event-details` | `EventDetailsSection` | `EventDetailsSection.tsx` |
| `pricing` | `PricingSection` | `PricingSection.tsx` |
| `faq` | `FAQSection` | `FAQSection.tsx` |
| `countdown` | `CountdownTimer` | `CountdownTimer.tsx` |
| `hubspot-form` | `HubSpotFormSection` | `HubSpotFormSection.tsx` |
| `stripe-checkout` | `StripeCheckoutSection` | `StripeCheckoutSection.tsx` |
| `thank-you` | `ThankYouSection` | `ThankYouSection.tsx` |
| `footer` | `FooterSection` | `FooterSection.tsx` |

### 1B. New Conversion Components

Located in `src/components/conversion/`. These are standalone components that layer on top of the block system.

---

#### StickyCtaBar

**File:** `src/components/conversion/StickyCtaBar.tsx`
**Purpose:** Fixed CTA bar that appears after scrolling past the hero, creating persistent conversion opportunity.

```typescript
interface StickyCtaBarProps {
  cta: CTAButton;                    // Primary CTA button config
  urgencyText?: string;              // "L'offerta scade tra 2 ore"
  position?: "top" | "bottom";      // Default: "bottom"
  triggerSelector?: string;          // CSS selector; default: first <section>
  footerSelector?: string;           // Hides when footer visible; default: "footer"
  bgClassName?: string;              // Background override
  pulseGlow?: boolean;               // Pulsing glow on CTA; default: true
  spotsLeft?: number;                // Shows "Solo X posti rimasti" with ping dot
}
```

**Usage:**
```tsx
<StickyCtaBar
  cta={{ text: "ISCRIVITI ORA", href: "#pricing" }}
  urgencyText="Prezzo Early Bird solo fino a venerdi"
  spotsLeft={12}
/>
```

**Behavior:**
- Uses GSAP ScrollTrigger to detect hero scroll-past
- Hides when footer enters viewport (no double-CTA)
- Animated slide-in from bottom/top
- Red pulsing dot for scarcity indicator
- Fully responsive: stacks vertically on mobile

---

#### CountdownBanner

**File:** `src/components/conversion/CountdownBanner.tsx`
**Purpose:** Premium urgency countdown with flip-clock style digit animations. More versatile than the existing `CountdownTimer` block.

```typescript
interface CountdownBannerProps {
  targetDate: string;                 // ISO date string
  headline?: string;                  // "L'offerta scade tra:"
  subtext?: string;                   // Additional context
  cta?: CTAButton;                    // Optional CTA button
  expiredMessage?: string;            // "L'offerta e' scaduta."
  variant?: "inline" | "fixed-top" | "fixed-bottom";
  theme?: "brand" | "dark" | "urgent" | "gradient";
  dismissible?: boolean;              // User can close (fixed variants)
  offerLabel?: string;                // Badge like "SCONTO 40%"
}
```

**Usage:**
```tsx
// Fixed banner at top with urgency theme
<CountdownBanner
  targetDate="2026-04-15T23:59:59"
  headline="Early Bird scade tra:"
  offerLabel="RISPARMIA 500EUR"
  theme="urgent"
  variant="fixed-top"
  cta={{ text: "BLOCCA IL PREZZO", href: "#pricing" }}
/>

// Inline countdown section
<CountdownBanner
  targetDate="2026-04-15T23:59:59"
  headline="Il corso inizia tra:"
  variant="inline"
  theme="gradient"
/>
```

**Themes:**
- `brand` -- Primary blue gradient
- `dark` -- Secondary dark with blur
- `urgent` -- Red gradient, pulsing, high tension
- `gradient` -- Primary to purple sweep

---

#### SocialProofTicker

**File:** `src/components/conversion/SocialProofTicker.tsx`
**Purpose:** "Marco da Milano si e' appena iscritto" style toast notifications that cycle through social proof entries.

```typescript
interface SocialProofNotification {
  name: string;           // "Marco R."
  location: string;       // "Milano"
  action: string;         // "si e' iscritto al corso"
  timeAgo?: string;       // "2 minuti fa"
  avatarUrl?: string;     // Optional; shows initials if missing
}

interface SocialProofTickerProps {
  notifications: SocialProofNotification[];
  displayDuration?: number;           // ms per notification; default: 4000
  initialDelay?: number;              // ms before first; default: 5000
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  maxShown?: number;                  // 0 = infinite loop
  dismissible?: boolean;              // User can close; default: true
  randomize?: boolean;                // Shuffle order; default: true
  theme?: "light" | "dark" | "brand";
}
```

**Usage:**
```tsx
<SocialProofTicker
  notifications={[
    { name: "Marco R.", location: "Milano", action: "si e' iscritto al corso", timeAgo: "2 minuti fa" },
    { name: "Giulia P.", location: "Roma", action: "ha acquistato il pacchetto Premium", timeAgo: "5 minuti fa" },
    { name: "Andrea B.", location: "Torino", action: "ha completato l'iscrizione", timeAgo: "8 minuti fa" },
  ]}
  position="bottom-left"
  theme="light"
  maxShown={5}
/>
```

**Behavior:**
- Randomized order prevents pattern recognition
- GSAP slide-in from edge with spring ease
- "Verificato" badge adds credibility
- Initials avatar fallback when no photo
- Auto-cycles with random delay between (2-5s feels natural)
- Pauses cycling when dismissed

---

#### FAQAccordion

**File:** `src/components/conversion/FAQAccordion.tsx`
**Purpose:** Premium FAQ section with GSAP animations, schema.org SEO markup, category filtering. Drop-in replacement for the simpler `FAQSection` block.

```typescript
interface FAQItemData {
  question: string;
  answer: string;
  answerHtml?: string;     // Rich HTML answer
  category?: string;       // For category filtering
}

interface FAQAccordionProps {
  title?: string;                    // Default: "Domande Frequenti"
  subtitle?: string;
  items: FAQItemData[];
  allowMultiple?: boolean;           // Multiple items open; default: false
  defaultOpen?: number;              // First open item index; default: 0
  theme?: "light" | "dark" | "bordered";
  bgOverride?: string;
  showCategories?: boolean;          // Show category filter tabs
  withSchema?: boolean;              // Inject FAQ schema.org; default: true
  ctaText?: string;                  // "Contattaci"
  ctaHref?: string;                  // "mailto:info@abtg.com"
}
```

**Usage:**
```tsx
<FAQAccordion
  title="Hai delle domande?"
  subtitle="Ecco le risposte alle domande piu' frequenti"
  theme="bordered"
  showCategories
  items={[
    { question: "Cosa include il biglietto?", answer: "...", category: "Evento" },
    { question: "Posso pagare a rate?", answer: "...", category: "Pagamento" },
    { question: "C'e' una garanzia?", answer: "...", category: "Garanzia" },
  ]}
  ctaText="Hai altre domande? Contattaci"
  ctaHref="mailto:info@alfiobardolla.com"
  withSchema
/>
```

**Features:**
- Staggered entrance animation (GSAP ScrollTrigger)
- GSAP-powered height animation (smoother than CSS transitions)
- Plus icon rotates to X when open
- Numbered items (increases scannability)
- Category filter tabs (auto-extracted from items)
- Schema.org FAQPage structured data (SEO boost)
- "Not found?" CTA below last item

---

### 1C. Components To Build Next (Priority Order)

These are documented here for future implementation:

#### ExitIntentPopup

```typescript
interface ExitIntentPopupProps {
  headline: string;                  // "Aspetta! Non andare via..."
  subheadline?: string;              // "Abbiamo un'offerta speciale per te"
  cta: CTAButton;
  /** Offer details */
  offer?: {
    discount: string;               // "20%"
    code?: string;                  // "ULTIMO20"
    expiresIn?: number;             // minutes
  };
  /** Show only once per session */
  oncePerSession?: boolean;          // default: true
  /** Delay before enabling (prevents instant trigger) */
  enableDelay?: number;              // ms; default: 10000
  /** Background image or gradient */
  bgImage?: string;
}
```

#### ROICalculator

```typescript
interface ROICalculatorProps {
  title?: string;
  investmentRange: { min: number; max: number; step: number; default: number };
  /** Return multiplier — determines "potential return" */
  returnMultiplier: number;          // e.g. 3.5 for "3.5x your investment"
  /** Timeline in months */
  timeline: number;
  /** Testimonial to show alongside */
  testimonial?: { name: string; result: string; quote: string };
  cta: CTAButton;
  disclaimer: string;               // Required for financial products
}
```

#### GuaranteeBadge

```typescript
interface GuaranteeBadgeProps {
  type: "money-back" | "results" | "satisfaction";
  days: number;                      // 30, 60, 90
  headline?: string;                 // "Garanzia Soddisfatti o Rimborsati"
  description: string;
  /** Badge style */
  variant?: "shield" | "seal" | "minimal";
}
```

#### VideoTestimonialGrid

```typescript
interface VideoTestimonialGridProps {
  title?: string;
  testimonials: {
    name: string;
    role?: string;
    thumbnailUrl: string;
    videoUrl: string;                // YouTube/Vimeo
    quote?: string;                  // Short pull-quote overlay
    result?: string;                 // "Da 0 a 3 immobili in 6 mesi"
  }[];
  layout?: "grid-3" | "grid-2" | "masonry";
}
```

#### PriceAnchor

```typescript
interface PriceAnchorProps {
  originalPrice: string;             // "2.997"
  currentPrice: string;              // "997"
  currency?: string;                 // Default: "EUR"
  savingsLabel?: string;             // "Risparmi 2.000 EUR"
  deadline?: string;                 // ISO date for price increase
  perUnit?: string;                  // "/mese" or "/persona"
  installments?: {
    count: number;
    amount: string;
  };
  cta: CTAButton;
}
```

#### TrustBadgesRow

```typescript
interface TrustBadgesRowProps {
  badges: {
    icon: "ssl" | "guarantee" | "payment" | "students" | "rating" | "custom";
    label: string;
    sublabel?: string;
    customIcon?: string;             // SVG path or image URL
  }[];
  layout?: "horizontal" | "grid";
}
```

#### BeforeAfterSlider

```typescript
interface BeforeAfterSliderProps {
  title?: string;
  pairs: {
    before: { src: string; label?: string };
    after: { src: string; label?: string };
    caption?: string;
  }[];
  layout?: "single" | "grid-2";
}
```

#### ProgramAgenda

```typescript
interface ProgramAgendaProps {
  title?: string;
  days: {
    dayNumber: number;
    title: string;
    date?: string;
    sessions: {
      time: string;
      title: string;
      description?: string;
      speaker?: string;
      icon?: string;
    }[];
  }[];
  theme?: "timeline" | "cards" | "minimal";
}
```

---

## 2. Animation Patterns Library

All animations use GSAP 3. Import pattern:

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

### 2A. Entrance Animations

#### Fade Up (most common, versatile)

```typescript
// Single element
gsap.fromTo(element,
  { y: 40, opacity: 0 },
  {
    y: 0, opacity: 1,
    duration: 0.7,
    ease: "power2.out",
    scrollTrigger: { trigger: element, start: "top 85%" }
  }
);

// Staggered children
gsap.fromTo(
  ".card",
  { y: 30, opacity: 0 },
  {
    y: 0, opacity: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    scrollTrigger: { trigger: container, start: "top 80%" }
  }
);
```

#### Slide In From Side

```typescript
// From left
gsap.fromTo(element,
  { x: -80, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
);

// From right
gsap.fromTo(element,
  { x: 80, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
);
```

#### Scale Up (for cards, images)

```typescript
gsap.fromTo(element,
  { scale: 0.85, opacity: 0 },
  {
    scale: 1, opacity: 1,
    duration: 0.6,
    ease: "back.out(1.4)",  // Slight overshoot
    scrollTrigger: { trigger: element, start: "top 85%" }
  }
);
```

#### Clip-Path Reveal (premium, editorial)

```typescript
// Reveal from bottom
gsap.fromTo(element,
  { clipPath: "inset(100% 0 0 0)" },
  {
    clipPath: "inset(0% 0 0 0)",
    duration: 1,
    ease: "power3.inOut",
    scrollTrigger: { trigger: element, start: "top 80%" }
  }
);

// Reveal from left
gsap.fromTo(element,
  { clipPath: "inset(0 100% 0 0)" },
  { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }
);

// Circle reveal (for images)
gsap.fromTo(element,
  { clipPath: "circle(0% at 50% 50%)" },
  { clipPath: "circle(100% at 50% 50%)", duration: 1.2, ease: "power2.out" }
);
```

### 2B. Scroll-Driven Animations

#### Parallax Background

```typescript
gsap.to(".parallax-bg", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".parallax-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});
```

#### Pin Section During Scroll

```typescript
ScrollTrigger.create({
  trigger: ".pinned-section",
  start: "top top",
  end: "+=300%",
  pin: true,
  scrub: 1,
  onUpdate: (self) => {
    // self.progress goes 0 to 1
    const step = Math.floor(self.progress * 3); // 0, 1, 2
    // Reveal content steps
  },
});
```

#### Horizontal Scroll Gallery

```typescript
const sections = gsap.utils.toArray(".gallery-item");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".gallery-container",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".gallery-container").offsetWidth,
  },
});
```

#### Progress-Based Opacity (for text reveals)

```typescript
const words = gsap.utils.toArray(".reveal-word");
gsap.fromTo(words,
  { opacity: 0.15 },
  {
    opacity: 1,
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".text-reveal-section",
      start: "top 60%",
      end: "bottom 40%",
      scrub: 1,
    },
  }
);
```

### 2C. Micro-Interactions

#### Button Hover (magnetic effect)

```typescript
// Attach to button element
const button = document.querySelector(".magnetic-btn");
button.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: "power2.out",
  });
});
button.addEventListener("mouseleave", () => {
  gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
});
```

#### Card Hover (3D tilt)

```typescript
const card = document.querySelector(".tilt-card");
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const xPct = (e.clientX - rect.left) / rect.width - 0.5;
  const yPct = (e.clientY - rect.top) / rect.height - 0.5;
  gsap.to(card, {
    rotateY: xPct * 10,
    rotateX: yPct * -10,
    transformPerspective: 800,
    duration: 0.4,
    ease: "power2.out",
  });
});
card.addEventListener("mouseleave", () => {
  gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power2.out" });
});
```

#### Link Underline Reveal

```css
.link-hover {
  position: relative;
  display: inline-block;
}
.link-hover::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--color-primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s ease;
}
.link-hover:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### 2D. Text Animations

#### Counter / Number Animate

```typescript
gsap.fromTo(element,
  { innerText: 0 },
  {
    innerText: targetValue,
    duration: 2,
    ease: "power1.out",
    snap: { innerText: 1 },
    scrollTrigger: { trigger: element, start: "top 80%" },
    onUpdate: function() {
      element.textContent = Math.round(this.targets()[0].innerText).toLocaleString("it-IT");
    },
  }
);
```

#### Split Text Reveal (line by line)

```typescript
// Requires splitting text into <span> wrapped lines
const lines = gsap.utils.toArray(".split-line");
gsap.fromTo(lines,
  { y: "100%", opacity: 0 },
  {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out",
    scrollTrigger: { trigger: container, start: "top 75%" },
  }
);
```

#### Typewriter Effect

```typescript
function typewriter(element: HTMLElement, text: string, speed = 50) {
  element.textContent = "";
  const chars = text.split("");
  const tl = gsap.timeline();
  chars.forEach((char, i) => {
    tl.to(element, {
      duration: speed / 1000,
      onComplete: () => { element.textContent += char; },
    }, i * (speed / 1000));
  });
  return tl;
}
```

### 2E. Page Transitions

#### Section Fade Through

```typescript
// Between route transitions (use with Next.js layout)
gsap.fromTo("main",
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
);
```

#### Loading Overlay Wipe

```typescript
const tl = gsap.timeline();
tl.to(".loader", {
  clipPath: "inset(0 0 100% 0)",
  duration: 0.8,
  ease: "power3.inOut",
  delay: 0.2,
});
tl.fromTo(".page-content",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
  "-=0.3"
);
```

---

## 3. Design Token Presets

Three visual presets applicable to any landing page via CSS custom properties override.

### Preset: Corporate (Default ABTG)

The current production style. Professional, trustworthy, European corporate identity.

```css
:root {
  /* Backgrounds */
  --color-primary: #060097;
  --color-primary-light: #2d2abf;
  --color-primary-dark: #04006b;
  --color-secondary: #1e293b;
  --color-secondary-light: #334155;
  --color-accent: #ffcd57;
  --color-accent-dark: #e6b84d;
  --color-surface: #F2F5F7;
  --color-background: #ffffff;
  --color-foreground: #1e293b;

  /* Typography */
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);

  /* CTA style */
  --cta-radius: 9999px;
  --cta-transform-hover: translateY(-2px);
}
```

**When to use:** B2B courses, investment programs, financial education, corporate events.

### Preset: Bold

Dark, high-contrast, dramatic. Conveys authority and exclusivity.

```css
[data-theme="bold"] {
  --color-primary: #C9A84C;
  --color-primary-light: #E8C96B;
  --color-primary-dark: #8B6914;
  --color-secondary: #0A0A0F;
  --color-secondary-light: #111118;
  --color-accent: #C9A84C;
  --color-accent-dark: #A88A3D;
  --color-surface: #1A1A24;
  --color-background: #0A0A0F;
  --color-foreground: #F5F5F0;
  --color-muted: #5C5C58;

  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 4px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(201,168,76,0.15);
}
```

**When to use:** Mastermind programs, high-ticket coaching, premium real estate investing, inner circle access.

### Preset: Fresh

Modern, energetic, gradient-rich. Appeals to younger or first-time audience.

```css
[data-theme="fresh"] {
  --color-primary: #4A4AFF;
  --color-primary-light: #7C7CFF;
  --color-primary-dark: #3333CC;
  --color-secondary: #1A1A2E;
  --color-secondary-light: #2D2D4A;
  --color-accent: #FF6B35;
  --color-accent-dark: #E55A2B;
  --color-surface: #F8F8FC;
  --color-background: #FFFFFF;
  --color-foreground: #1A1A2E;
  --color-muted: #9090A8;

  --font-heading: 'DM Sans', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 2px 8px rgba(74,74,255,0.06);
  --shadow-md: 0 4px 20px rgba(74,74,255,0.1);
  --shadow-lg: 0 8px 40px rgba(74,74,255,0.15);
}
```

**When to use:** Webinars, lead magnets, free courses, introductory events, mindset programs.

---

## 4. Copywriting Frameworks

### 4A. Hero Formula

Structure: **Pain -> Solution -> Proof -> CTA**

```
[BADGE: "Evento dal vivo | 15-16 Aprile 2026"]

[HEADLINE - Pain + Promise]
"Smetti di [PAIN POINT] e Inizia a [DESIRED OUTCOME]"

[SUBHEADLINE - Method + Proof]
"Il metodo collaudato da [NUMBER]+ [PEOPLE TYPE] per [SPECIFIC RESULT] in [TIMEFRAME]"

[CTA Primary: Action verb + Benefit]
"PRENOTA IL TUO POSTO"  /  "ACCEDI ORA"  /  "INIZIA IL PERCORSO"

[CTA Secondary: Lower commitment]
"Scopri il programma"  /  "Guarda il video"

[TRUST INDICATORS: 3-4 micro-proofs]
"4.8/5 Trustpilot" | "50.000+ studenti" | "Garanzia 30gg" | "Visto su Il Sole 24 Ore"
```

**Hero headline patterns that convert:**

| Pattern | Example |
|---|---|
| How to [result] without [pain] | "Come Investire nel Mercato Immobiliare Senza Rischiare i Tuoi Risparmi" |
| The [number]-step system to [result] | "Il Sistema in 5 Step per Creare Rendite Passive con gli Affitti" |
| [Number] [people] have already [result] | "3.000 Persone Hanno Gia' Cambiato la Loro Vita Finanziaria" |
| Stop [pain]. Start [gain]. | "Smetti di Lavorare per i Soldi. Fai Lavorare i Soldi per Te." |
| What if you could [dream] | "E Se Potessi Generare 3.000EUR/Mese di Rendita Passiva?" |
| In [time], you'll [result] | "Tra 90 Giorni Avrai il Tuo Primo Investimento Immobiliare" |

### 4B. Social Proof Placement Strategy

**Rule: Never more than 2 sections apart from a proof element.**

| After Section | Social Proof Type |
|---|---|
| Hero | Stats bar (numbers, logos) |
| Benefits | Mini testimonial quote |
| Pricing | Trust badges + guarantee |
| Form | Counter ("1.234 persone iscritte") |
| Throughout | SocialProofTicker notifications |

**Proof hierarchy (strongest first):**
1. Video testimonials with specific results ("Ho guadagnato 45.000EUR in 6 mesi")
2. Named testimonials with photos and roles
3. Aggregate numbers ("50.000+ studenti formati")
4. Media mentions (logos of publications)
5. Certifications and awards
6. Social media follower counts

### 4C. CTA Button Copy Variations

**Primary CTA (high commitment):**

| Category | Options |
|---|---|
| Events | "PRENOTA IL TUO POSTO" / "RISERVA IL TUO BIGLIETTO" / "ISCRIVITI ALL'EVENTO" |
| Courses | "INIZIA ORA" / "ACCEDI AL CORSO" / "ISCRIVITI SUBITO" |
| Webinars | "REGISTRATI GRATIS" / "RISERVA IL TUO POSTO" / "GUARDA ORA" |
| High-ticket | "CANDIDATI ORA" / "RICHIEDI INFORMAZIONI" / "PRENOTA UNA CALL" |

**Secondary CTA (low commitment):**
- "Scopri di piu'" / "Guarda il programma" / "Leggi le testimonianze"

**CTA power words (Italian):**
- GRATIS, ORA, SUBITO, OGGI, ULTIMO, ESCLUSIVO, GARANTITO, RISERVATO, LIMITATO

**CTA button rules:**
1. Always use first person where possible ("Prenota il MIO posto" > "Prenota")
2. Add micro-copy below: "Nessun pagamento richiesto" / "Posti limitati"
3. Primary CTA should be the accent color (#ffcd57) on dark backgrounds
4. Never use "Invia" or "Submit" -- always benefit-oriented

### 4D. Urgency & Scarcity Patterns

**Legitimate urgency (always prefer real deadlines):**

| Type | Example | Component |
|---|---|---|
| Event date | "L'evento inizia il 15 Aprile" | CountdownBanner |
| Early bird | "Prezzo speciale fino al 1 Aprile" | CountdownBanner + StickyCtaBar |
| Limited seats | "Solo 47 posti disponibili (23 rimanenti)" | StickyCtaBar `spotsLeft` |
| Price increase | "Il prezzo aumenta tra 3 giorni" | CountdownBanner `theme="urgent"` |
| Bonus expiry | "I bonus valgono solo per le prossime 48 ore" | CountdownBanner |

**Scarcity copy templates:**
- "Solo [N] posti rimasti su [TOTAL]"
- "Ultimi [N] biglietti a questo prezzo"
- "Il prezzo aumentera' a [PRICE] tra [TIME]"
- "[N] persone stanno guardando questa pagina" (use sparingly)
- "Iscrizioni chiudono il [DATE]"

**Warning: Never fake urgency.** Evergreen countdown timers that reset destroy trust. Use real dates or real inventory limits.

---

## 5. Conversion Optimization Checklist

### Pre-Launch Checklist

#### Visual & UX
- [ ] Hero loads above the fold in under 2 seconds (LCP < 2.5s)
- [ ] CTA button visible without scrolling on mobile
- [ ] All images have alt text and are optimized (WebP, responsive srcset)
- [ ] Font loading is optimized (preload critical fonts, display: swap)
- [ ] No layout shift on any element (CLS < 0.1)
- [ ] Mobile tap targets are at least 44x44px
- [ ] Color contrast passes WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Page works without JavaScript (SSR fallbacks)

#### Content & Copy
- [ ] Headline passes the "5-second test" (visitor understands the offer)
- [ ] Subheadline answers "what's in it for me?"
- [ ] Benefits section uses outcomes, not features
- [ ] Social proof appears within first 2 scroll-lengths
- [ ] Price anchoring shows original vs discounted price
- [ ] Guarantee is prominently displayed near pricing
- [ ] FAQ addresses top 5 objections
- [ ] Urgency elements use real deadlines (not fake timers)

#### Conversion Elements
- [ ] StickyCtaBar activated after hero scroll
- [ ] CountdownBanner using real event/offer deadline
- [ ] SocialProofTicker with at least 5 notifications
- [ ] FAQAccordion has schema.org markup
- [ ] Exit intent popup configured (if using)
- [ ] Multiple CTA placements (hero, mid-page, pricing, above footer)
- [ ] Form has minimal fields (name + email for lead magnets)

#### Technical
- [ ] Facebook Pixel firing on page load + CTA clicks
- [ ] Google Analytics 4 tracking configured
- [ ] Thank-you page redirect after form submission
- [ ] HubSpot form connected to correct workflow
- [ ] Open Graph meta tags (title, description, image)
- [ ] Canonical URL set
- [ ] Mobile responsive at 320px, 375px, 768px, 1024px, 1440px

#### Legal (Italy-specific)
- [ ] Cookie banner (GDPR compliant)
- [ ] Privacy policy link in footer
- [ ] Terms and conditions link
- [ ] P.IVA displayed in footer
- [ ] Financial disclaimer if discussing investments
- [ ] "Risultati non garantiti" disclaimer near testimonials

---

## 6. Section Ordering Best Practices

### Event Landing Page

```
1. CountdownBanner (fixed-top, urgent)
2. Hero (centered, badge with date/location)
3. SocialProof (stats: students, events, rating)
4. Benefits (grid-3: what you'll learn)
5. Speaker (Alfio bio + credentials)
6. ProgramAgenda (day-by-day breakdown)
7. VideoTestimonialGrid (3 videos, results-focused)
8. Pricing (tiers with early bird pricing)
9. GuaranteeBadge (money-back 30 days)
10. FAQAccordion (with categories)
11. CountdownBanner (inline, recap urgency)
12. Footer
-- Overlays --
StickyCtaBar (after hero)
SocialProofTicker (bottom-left)
```

### Course Sales Page

```
1. Hero (split layout, video on right)
2. SocialProof (logos: media mentions)
3. Benefits (alternating layout: problem-solution pairs)
4. VideoTestimonialGrid (6 videos grid)
5. Speaker (course instructor bio)
6. ProgramAgenda (module breakdown)
7. ROICalculator (interactive widget)
8. Pricing (single tier or 2 tiers)
9. PriceAnchor (savings visualization)
10. GuaranteeBadge (30-day money-back)
11. TrustBadgesRow (payment, SSL, guarantee)
12. FAQAccordion (objection-handling focus)
13. Final CTA section (recap benefits + button)
14. Footer
-- Overlays --
StickyCtaBar (after hero)
SocialProofTicker (bottom-left)
ExitIntentPopup (discount offer)
```

### Webinar Registration Page

```
1. Hero (centered, "Webinar Gratuito" badge, countdown to live date)
2. SocialProof (stats: past attendees, rating)
3. Benefits (grid-3: 3 things you'll learn)
4. Speaker (brief bio)
5. HubSpotForm (name + email, side content: "Cosa imparerai" list)
6. TestimonialSection (2-3 text quotes)
7. FAQAccordion (minimal, 4-5 questions)
8. Footer (minimal)
-- Overlays --
CountdownBanner (fixed-top, webinar date)
SocialProofTicker (bottom-left)
```

### Lead Magnet Page

```
1. Hero (split: left = copy, right = ebook/guide mockup image)
2. Benefits (grid-3: what's inside the guide)
3. HubSpotForm (name + email only, prominent)
4. SocialProof (counter: "12.345 persone hanno gia' scaricato")
5. Footer (minimal)
-- Overlays --
SocialProofTicker (bottom-right)
```

### Thank You Page

```
1. ThankYou (confirmation + next steps)
2. SocialProof (reinforce decision: "Ti unisci a 50.000+ persone")
3. Upsell/Cross-sell section (optional)
4. Footer (minimal)
```

---

## Appendix: File Structure

```
src/
  components/
    ui/                         # Primitive UI components
      Button.tsx
      SectionHeading.tsx
      SectionWrapper.tsx
    blocks/                     # Page block components (data-driven)
      HeroAnimated.tsx
      SocialProofAnimated.tsx
      BenefitsAnimated.tsx
      TestimonialSection.tsx
      SpeakerSection.tsx
      EventDetailsSection.tsx
      PricingSection.tsx
      FAQSection.tsx
      CountdownTimer.tsx
      HubSpotFormSection.tsx
      StripeCheckoutSection.tsx
      ThankYouSection.tsx
      FooterSection.tsx
      index.ts
    conversion/                 # Conversion-boost overlay/widget components
      StickyCtaBar.tsx
      CountdownBanner.tsx
      SocialProofTicker.tsx
      FAQAccordion.tsx
      [future] ExitIntentPopup.tsx
      [future] ROICalculator.tsx
      [future] GuaranteeBadge.tsx
      [future] VideoTestimonialGrid.tsx
      [future] PriceAnchor.tsx
      [future] TrustBadgesRow.tsx
      [future] BeforeAfterSlider.tsx
      [future] ProgramAgenda.tsx
  types/
    blocks.ts                   # All TypeScript interfaces
  lib/
    BlockRenderer.tsx           # Maps block type -> component
    templates.ts                # Template registry
```
