# ABTG Brand Guidelines
**Alfio Bardolla Training Group**
Version: 1.0 — March 2026

---

## 1. Brand Identity

### Company Overview

Alfio Bardolla Training Group (ABTG) is Italy's leading financial education company.
- Founded by Alfio Bardolla, bestselling author and investor
- Publicly listed on Borsa Italiana (AIM segment)
- Audience: Italian adults seeking financial independence, primarily 30-55 years old
- Core products: immobiliare investing courses, trading education, mindset & entrepreneurship

### Brand Pillars

1. **Credibility** — listed company, real results, real students
2. **Transformation** — from financial struggle to financial freedom
3. **Practicality** — actionable, proven methods, not theory
4. **Community** — thousands of students, not a solo guru

### Tone of Voice

| Attribute | Description | Example |
|---|---|---|
| Direct | No filler, no hedging | "Guadagna dal mercato immobiliare" not "Potresti potenzialmente guadagnare" |
| Authoritative | Backed by proof, not bluster | Always pair claims with numbers or social proof |
| Warm | Human, not corporate | "I nostri studenti" not "I clienti" |
| Urgent | FOMO is real, use it ethically | "Solo 50 posti" when true |
| Italian | Natural spoken Italian, no anglicisms unless universal | "Iscriviti" not "Sign up" |

### What ABTG Never Says

- "Diventa ricco velocemente" (get rich quick) — legally and reputationally dangerous
- "Garantiamo rendimenti" — illegal for financial products in Italy
- "I risultati possono variare" without the actual disclaimer
- Anything that implies speculation without risk disclosure

---

## 2. Visual Identity

### Primary Color Palette

```
--color-primary:       #D76E11   /* ABTG Orange — main brand color */
--color-primary-dark:  #B85E0E   /* Darker orange for hover states */
--color-primary-light: #F0892A   /* Lighter orange for gradients */

--color-secondary:     #1A1A2E   /* Deep navy — secondary brand */
--color-surface:       #0F0F1A   /* Page background (dark mode first) */
--color-surface-card:  #16162A   /* Card background */
--color-surface-raised:#1E1E35   /* Elevated elements */

--color-text:          #F0F0F0   /* Primary text */
--color-text-muted:    #9999AA   /* Secondary text, captions */
--color-text-inverse:  #0F0F1A   /* Text on light backgrounds */

--color-border:        rgba(255,255,255,0.08)   /* Subtle borders */
--color-border-active: rgba(215,110,17,0.4)     /* Orange-tinted borders */

--color-success:       #22C55E   /* Green for checkmarks, benefits */
--color-warning:       #EAB308   /* Yellow for urgency */
--color-danger:        #EF4444   /* Red for scarcity, deadlines */
```

### Gradient Formulas

```css
/* Hero dark overlay */
background: linear-gradient(to bottom, rgba(15,15,26,0.3) 0%, rgba(15,15,26,0.95) 100%);

/* Orange glow accent */
background: radial-gradient(ellipse at center, rgba(215,110,17,0.2) 0%, transparent 70%);

/* Orange-to-transparent text background */
background: linear-gradient(135deg, #D76E11 0%, #B85E0E 100%);

/* Card with orange border glow */
box-shadow: 0 0 40px rgba(215,110,17,0.15);
```

### Typography

**Primary Heading Font:** Syne (Google Fonts)
- Used for all H1, H2, display text
- Weights: 700 (headlines), 800 (hero titles)
- Character: geometric, bold, Italian feel

**Body Font:** Inter (Google Fonts)
- Used for all body copy, labels, UI text
- Weights: 400 (body), 500 (emphasis), 600 (subheads)

**Font Size Scale (Tailwind/clamp):**
```css
--text-hero:    clamp(2.5rem, 6vw, 5rem);     /* Main hero H1 */
--text-h2:      clamp(2rem, 4vw, 3.5rem);     /* Section titles */
--text-h3:      clamp(1.5rem, 2.5vw, 2rem);   /* Card titles */
--text-body-lg: 1.125rem;                      /* Lead paragraph */
--text-body:    1rem;                          /* Standard copy */
--text-small:   0.875rem;                      /* Captions, labels */
```

### Spacing System

```
Section vertical padding: clamp(4rem, 8vw, 8rem)
Container max-width: 1200px
Card padding: 2rem (desktop), 1.5rem (mobile)
Grid gap: 1.5rem — 2rem
```

### Border Radius

```
Cards: 16px
Buttons: 8px
Badges/Tags: 999px (pill)
Images: 12px
```

---

## 3. Component Style Rules

### Buttons

**Primary CTA (always orange):**
```css
background: linear-gradient(135deg, #D76E11, #B85E0E);
color: white;
padding: 1rem 2.5rem;
border-radius: 8px;
font-weight: 700;
font-size: 1rem;
text-transform: uppercase;
letter-spacing: 0.05em;
box-shadow: 0 0 30px rgba(215,110,17,0.4);
```

**Button copy rules:**
- Always verb-first: "ISCRIVITI", "SCARICA", "SCOPRI"
- Always specific: "ISCRIVITI AL WORKSHOP" not just "ISCRIVITI"
- Never passive: never "Clicca qui"
- Urgency when applicable: "ISCRIVITI ORA — Solo 50 posti"

**Secondary CTA (ghost/outline):**
```css
background: transparent;
border: 1px solid rgba(215,110,17,0.5);
color: #D76E11;
```

### Cards

```css
background: #16162A;
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
```

On hover:
```css
border-color: rgba(215,110,17,0.3);
box-shadow: 0 0 40px rgba(215,110,17,0.1);
```

### Section Background Variants

1. Dark base: `background: #0F0F1A` — default
2. Slightly elevated: `background: #16162A` — for alternating sections
3. Orange accent: `border-top: 1px solid rgba(215,110,17,0.3)` — for CTA sections

---

## 4. Legal Requirements

### Mandatory Disclaimer (financial content)

Every landing page that discusses investment or financial returns MUST include:

```
I rendimenti passati non sono indicativi di quelli futuri.
L'attività di investimento comporta rischi.
Prima di investire, valuta attentamente i tuoi obiettivi finanziari.
```

Place: in the footer, min font-size 12px, color: `#9999AA`.

### Quotata in Borsa Mention

When used as trust signal:
```
"Alfio Bardolla Training Group — quotata su Borsa Italiana"
```
Do NOT write "quotata in Borsa" without specifying the exchange.

### Privacy / GDPR

Every form must have:
1. Checkbox or explicit consent statement
2. Link to Privacy Policy
3. Link to Cookie Policy (if cookies are set)

Standard consent text:
```
Accetto il trattamento dei miei dati personali per ricevere informazioni
sui corsi ABTG. Privacy Policy | Cookie Policy
```

### Legal Disclaimers on Testimonials

When using student results:
```
"I risultati mostrati sono esempi di studenti che hanno seguito il programma
con costanza. I risultati individuali possono variare."
```

---

## 5. Photography & Image Style

### Image Aesthetic for ABTG

- **Lighting:** dramatic, high-contrast, often with orange/warm tones
- **Color grading:** slightly desaturated backgrounds, warm highlights
- **Atmosphere:** aspirational but credible — no stock photo clichés
- **Speaker photos:** professional, direct eye contact, confident posture

### What Works

- Events with real audience (credibility through scale)
- Alfio on stage with large audiences
- Before/after lifestyle (modest house → nice apartment, not mansion)
- Students learning together (community feeling)
- Charts going up (always labeled, never fabricated)

### What to Avoid

- Stock photos of random businesspeople
- Extreme wealth imagery (Lamborghini, yachts) — triggers skepticism
- Empty rooms or fake events
- Low-resolution or blurry photos
- Watermarked images

### Image Overlay Rule

When placing text over images, always use:
```css
background: linear-gradient(to bottom, rgba(15,15,26,0.2) 0%, rgba(15,15,26,0.9) 100%);
```
Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text.

---

## 6. Animation Principles

### GSAP Animation Library (14 patterns available)

Current animations in the system:
1. Hero text reveal (staggered letters/words)
2. Section fade-up on scroll
3. Counter animation (numbers counting up)
4. Card cascade (staggered card entrance)
5. Horizontal ticker (logo/social proof)
6. Orange particle burst (celebration/CTA)
7. Timeline draw (step-by-step reveal)
8. Testimonial crossfade carousel
9. Sticky progress bar
10. Countdown flip animation
11. Form field focus glow
12. Mobile hamburger morph
13. Smooth scroll (Lenis)
14. Parallax hero background

### Animation Rules

- **Purpose only:** every animation must serve the conversion, not just be decorative
- **Scroll-triggered:** prefer ScrollTrigger over time-based animations
- **Performance:** never animate layout properties (width, height, margin) — only transform and opacity
- **Duration caps:** entrance animations max 0.8s, hover transitions max 0.3s
- **Reduced motion:** always wrap GSAP init in `window.matchMedia('(prefers-reduced-motion: reduce)')` check

---

## 7. Mobile-First Rules

- All sections must work on 375px viewport minimum
- Tap targets minimum 44px height
- Font minimum 16px on mobile (prevents iOS zoom)
- CTAs must be full-width on mobile (not just wide)
- Images must never overflow their container
- No horizontal scroll

---

## 8. Trust Hierarchy

Order of trust signals from most to least impactful for Italian financial education audience:

1. "Quotata su Borsa Italiana" (institutional credibility)
2. Numbers: "Oltre 100.000 studenti formati"
3. Media logos: Sole24Ore, Milano Finanza, Il Corriere della Sera
4. Alfio Bardolla's published books (author credibility)
5. Video testimonials with full name + city
6. Written testimonials with photo + name + city
7. Google/Trustpilot reviews with star rating
8. Social media follower count (weakest — easily gamed)

Always lead with 1-3, support with 4-6.
