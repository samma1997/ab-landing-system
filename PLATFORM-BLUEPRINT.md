# Landing Page Factory — Blueprint Completo per Replicare la Piattaforma

> Documento di esportazione completa. Tutto quello che serve per replicare questa piattaforma su un altro brand/sito.

---

## 1. TECH STACK (cosa installare)

```bash
npx create-next-app@latest nome-progetto --typescript --tailwind --app --src-dir
cd nome-progetto
npm install gsap @gsap/react framer-motion lenis lucide-react clsx
```

| Pacchetto | Versione | Scopo |
|-----------|----------|-------|
| Next.js | 16+ | Framework (App Router, static export) |
| React | 19+ | UI |
| Tailwind CSS | v4 | Stili utility-first |
| GSAP | 3.14+ | Animazioni professionali |
| @gsap/react | 2.1+ | Hook React per GSAP (useGSAP) |
| Framer Motion | 12+ | Animazioni alternative/spring |
| Lenis | 1.3+ | Smooth scroll |
| Lucide React | 0.577+ | Icone SVG |
| clsx | 2.1+ | Merge className |

### next.config.ts
```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",           // Static HTML — deploy ovunque
  basePath: "/nome-progetto", // Cambia per GitHub Pages
  images: { unoptimized: true },
};
export default nextConfig;
```

---

## 2. DESIGN SYSTEM — Come personalizzare per un nuovo brand

### 2.1 Colori (globals.css)

Sostituisci questi valori con la palette del nuovo brand:

```css
@import "tailwindcss";

@theme inline {
  /* ═══ BRAND COLORS — SOSTITUIRE CON I TUOI ═══ */
  --color-primary: #060097;        /* Colore principale */
  --color-primary-light: #2d2abf;
  --color-primary-dark: #04006b;
  --color-secondary: #1e293b;      /* Testo scuro */
  --color-accent: #ffcd57;         /* Accento */
  --color-orange: #EF7B11;         /* CTA / badge */
  --color-surface: #F2F5F7;        /* Sfondo sezioni alternate */
  --color-success: #10B981;        /* Verde conferme */
  --color-danger: #EF4444;         /* Rosso urgenza */
  --color-background: #ffffff;
  --color-foreground: #1e293b;
  --color-muted: #67768e;          /* Testo secondario */

  /* ═══ FONT — SOSTITUIRE CON I TUOI ═══ */
  --font-heading: var(--font-plus-jakarta);
  --font-body: var(--font-inter);
}
```

### 2.2 Font (layout.tsx)

```typescript
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
})

// Nel body:
<body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
```

### 2.3 Regole di stile (DA RISPETTARE SEMPRE)

| Elemento | Classe Tailwind | Note |
|----------|----------------|------|
| Sfondo sezione light | `bg-[#F5F5F7]` | Mai altri grigi |
| Sfondo sezione dark | `bg-[#1e293b]` | Mai nero puro |
| Card | `bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8` | Sempre questo pattern |
| Card hover | `hover:shadow-xl hover:border-[#EF7B11]/20 hover:-translate-y-1` | Transizione 300ms |
| Card dark mode | `bg-[#1e293b] border border-white/10` | Solido, mai trasparente |
| Badge numero | `w-12 h-12 rounded-xl bg-[#EF7B11] text-white font-black` | Accento arancione |
| Pre-title | `text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3` | Sopra ogni H2 |
| H2 sezione | `text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e293b]` | Ereditano Plus Jakarta |
| Highlight nel titolo | `<span className="text-[#EF7B11]">parola</span>` | Parola chiave arancione |
| Subtitle | `text-lg max-w-2xl mx-auto text-[#67768e]` | Sotto H2 |
| Body text | `text-sm leading-relaxed text-[#67768e]` | Mai nero, sempre muted |
| CTA button | `bg-[#22c55e] text-white rounded-full py-4 px-10 font-bold uppercase` | Verde ABTG |
| Sezione padding | `py-16 sm:py-20 lg:py-24` | Consistente |
| Container | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` | 1152px |

---

## 3. ARCHITETTURA A BLOCCHI

### 3.1 Come funziona

Ogni landing page e' un array di blocchi. Ogni blocco ha un `type` e delle `props`:

```typescript
interface PageConfig {
  slug: string
  template: string
  seo: { title, description, ogImage? }
  tracking?: { facebookPixelId?, googleAnalyticsId? }
  blocks: LandingBlock[]  // Array di blocchi
}
```

### 3.2 Blocchi disponibili (14)

| # | ID | Nome | Categoria | Uso |
|---|-----|------|-----------|-----|
| 1 | hero-split | Hero Split | hero | Testo sx + form dx |
| 2 | hero-center | Hero Centrato | hero | Full-width centrato |
| 3 | logo-ticker | Logo Ticker | social-proof | Scorrimento loghi media |
| 4 | checklist-section | Checklist | content | Griglia con checkmark |
| 5 | comparison-table | Tabella Confronto | content | Prima/Dopo |
| 6 | numbered-phases | Fasi Numerate | content | Step 1, 2, 3... |
| 7 | pillar-cards | Card Pilastri | content | Feature/benefici con icona |
| 8 | speaker-cards | Card Speaker | content | Bio speaker con foto |
| 9 | urgency-section | Sezione Urgenza | conversion | Scarsita + CTA |
| 10 | form-section | Sezione Form | conversion | Dettagli evento + form |
| 11 | cta-divider | CTA Divider | layout | Separatore con CTA |
| 12 | footer-abtg | Footer | layout | Footer standard |
| 13 | horizontal-scroll-cards | Horizontal Scroll | animation | Card con scroll orizzontale GSAP |
| 14 | stacking-cards | Stacking Cards | animation | Card che salgono a ventaglio |

### 3.3 Struttura di un blocco

Ogni blocco segue questo pattern:

```typescript
'use client'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger)

// Types
export interface MioBloccoProps {
  preTitle?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  items: Item[]
  bgColor?: 'white' | 'light' | 'dark'
  id?: string
}

// Component
export function MioBlocco({ preTitle, title, ... }: MioBloccoProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Animazioni GSAP qui
    gsap.from('.my-card', {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.my-grid', start: 'top 80%' },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-[#F5F5F7] py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-title */}
        <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-3">
          {preTitle}
        </p>
        {/* H2 */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1e293b] mb-4">
          {title} <span className="text-[#EF7B11]">{titleHighlight}</span>
        </h2>
        {/* Cards */}
        <div className="my-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="my-card bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-xl hover:border-[#EF7B11]/20 transition-all duration-300">
              ...
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 4. ANIMAZIONI GSAP

### 4.1 Pattern standard (entrance)

```typescript
// Fade up — il piu usato
gsap.from(element, {
  y: 40, opacity: 0, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: element, start: 'top 85%' },
})

// Stagger children
gsap.from('.card', {
  y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
  scrollTrigger: { trigger: '.grid', start: 'top 80%' },
})

// Scale up (per badge/icone)
gsap.from(element, {
  scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)',
  scrollTrigger: { trigger: element, start: 'top 85%' },
})
```

### 4.2 Pattern avanzati (scroll-driven)

```typescript
// Pin + scrub (horizontal scroll, stacking cards)
gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: '+=300%',
    pin: true,
    scrub: 0.6,
  },
})

// Parallax
gsap.to('.bg-image', {
  y: -100, ease: 'none',
  scrollTrigger: {
    trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: 1,
  },
})
```

### 4.3 Regole animazioni

- **Solo transform + opacity** — mai animare width/height/margin
- **Duration max**: 0.8s entrance, 0.3s hover
- **Easing**: `power2.out` (standard), `back.out` (badge), `power3.out` (hero)
- **ScrollTrigger start**: `top 85%` heading, `top 80%` cards
- **Stagger**: `0.1` (standard), `0.15` (piu lento)
- **Sempre cleanup**: `useGSAP` gestisce automaticamente

---

## 5. STRUTTURA FILE

```
src/
  app/
    layout.tsx              ← Font + metadata + SmoothScrollProvider
    globals.css             ← Design tokens Tailwind v4
    page.tsx                ← Homepage
    [slug]/page.tsx          ← Route dinamica per landing
    admin/page.tsx           ← Dashboard admin
  components/
    blocks/                  ← 13 blocchi data-driven (dal PageConfig)
    blocks-library/          ← 14 blocchi standalone riutilizzabili
      index.ts              ← Catalogo + export
    conversion/              ← Widget overlay (sticky bar, countdown, ecc.)
    ui/                      ← Primitivi (Button, SectionHeading, SectionWrapper)
    SmoothScrollProvider.tsx ← Lenis + GSAP ScrollTrigger sync
  lib/
    animations.ts            ← 12+ funzioni GSAP con cleanup
    BlockRenderer.tsx        ← Mappa type → componente
    templates.ts             ← 6 template PageConfig preconfigurati
    page-registry.ts         ← Helper TypeScript per gestione pagine
  types/
    blocks.ts                ← Union type completo per tutti i blocchi
  content/
    pages/registry.json      ← Indice pagine
docs/
  CONVERSION-PLAYBOOK.md     ← Scienza della conversione
  DESIGN-SYSTEM.md           ← Design token + pattern
  knowledge/
    brand-guidelines.md      ← Linee guida brand
    content-patterns.md      ← Pattern di copywriting
```

---

## 6. ADMIN DASHBOARD

### Funzionalita

| Tab | Cosa fa |
|-----|---------|
| Dashboard | Statistiche pagine (live/draft/archived) |
| Pagine | Lista pagine con filtri, ricerca, status |
| Blocchi | Catalogo visuale dei 14 blocchi con filtro per categoria |
| Animazioni | Reference delle animazioni GSAP con demo live play/reset |
| Banca Immagini | Categorie immagini con link upload GitHub |
| Preview | Iframe preview desktop/mobile delle pagine |

### Come aggiungere un blocco al catalogo

1. Crea il componente in `src/components/blocks-library/NuovoBlocco.tsx`
2. Aggiungi export in `index.ts`
3. Aggiungi entry in `BLOCK_CATALOG` con id, name, category, description
4. Aggiungi props map in `BLOCK_PROPS_MAP` nell'admin
5. Aggiungi mini preview in `BlockMiniPreview` nell'admin
6. (Opzionale) Aggiungi demo link in `BLOCK_DEMO_LINKS`

---

## 7. DEPLOY

### GitHub Pages (attuale)

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Vercel (alternativa)

Push su main → deploy automatico. Zero config.

---

## 8. VISIONE FUTURA — La piattaforma che si auto-alimenta

### Knowledge Base
- Archivio testi: headline, benefit, CTA, testimonial, FAQ per tipo
- Ogni landing completata arricchisce la libreria
- Fonte tracciata (PDF, libro, evento, generato)
- Performance tracking (proven/untested)

### Banca Immagini interattiva
- Galleria con preview, filtri, ricerca
- Script di build genera manifest JSON da `public/images/bank/`
- Categorie: speaker, eventi, immobiliare, trading, sfondi, loghi, testimonial

### Self-Learning Machine
- Ogni nuovo evento aggiunge contenuti alla knowledge base
- Ogni immagine caricata arricchisce la banca
- Ogni landing diventa un template riutilizzabile
- Piu contenuti = landing future migliori e piu veloci

### Scraping Animazioni
- Workflow: trovare animazione bella → scrapare codice → adattare allo stile del brand → registrare nel catalogo blocchi
- Fonti: Magic UI, Aceternity UI, React Bits, Motion Primitives, Animate UI
- Regola: SEMPRE adattare allo stile del brand (colori, font, card style)

---

## 9. COME REPLICARE PER UN NUOVO BRAND

### Step 1: Clona la struttura
```bash
git clone https://github.com/samma1997/ab-landing-system.git nuovo-brand
cd nuovo-brand
rm -rf .git && git init
```

### Step 2: Personalizza il brand
1. `globals.css` → cambia colori
2. `layout.tsx` → cambia font
3. `next.config.ts` → cambia `basePath`
4. Componenti `blocks-library/` → aggiorna colori hardcoded

### Step 3: Crea la knowledge del brand
1. `docs/knowledge/brand-guidelines.md` → scrivi le linee guida
2. `docs/knowledge/content-patterns.md` → pattern di copywriting
3. `docs/DESIGN-SYSTEM.md` → documenta i token visivi

### Step 4: Costruisci le landing
1. Usa i blocchi esistenti come base
2. Aggiungi blocchi custom seguendo il pattern
3. Registra tutto nel catalogo

### Step 5: Deploya
1. Configura GitHub Pages o Vercel
2. Push su main = deploy automatico

---

> **Regola d'oro**: piu contenuti metti nella piattaforma (testi, immagini, animazioni, template), piu diventa potente e veloce creare nuove landing. E' un volano.
