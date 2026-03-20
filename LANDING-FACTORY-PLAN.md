# ABTG Landing Page Factory — Piano Architetturale Completo

**Versione:** 1.0
**Data:** 2026-03-20
**Progetto:** ab-landing-system
**Contesto:** Next.js 16 + Tailwind CSS v4 + GSAP, deployed su Vercel, block system già funzionante con 13 tipi di blocco e 6 template.

---

## Stato Attuale — Cosa Abbiamo Già

Prima di decidere cosa costruire, è fondamentale capire che il codebase esistente è già notevolmente avanzato. Non partiamo da zero.

**Già funzionante:**
- Sistema a blocchi tipizzato TypeScript (`PageConfig` + `LandingBlock` union type)
- 13 tipi di blocco: Hero, SocialProof, Benefits, Testimonials, Speaker, EventDetails, Pricing, FAQ, Countdown, HubSpotForm, StripeCheckout, ThankYou, Footer
- 6 template preconfigurati: event, course-sales, webinar, lead-magnet, thank-you, workshop (Missione Immobiliare)
- Route dinamica `/[slug]` che legge dalla `templateRegistry`
- Tracking Facebook Pixel, HubSpot, Stripe già nei tipi
- GSAP animations, Lenis smooth scroll, Framer Motion
- Countdown floating/banner/inline già implementato

**Gap da colmare:**
- `getPageConfig()` legge solo dalla `templateRegistry` in memoria — non da database/file
- Nessun admin panel
- Nessuna pipeline di deploy verso Plesk
- Nessuna gestione immagini strutturata
- `templateRegistry` è un file TypeScript da editare manualmente

---

## 1. Architettura Raccomandata

### Decisione: Option B + static export selettivo (Vercel primary, Plesk secondary)

**Setup:**
```
GitHub (source of truth)
    ↓ push to main
GitHub Actions
    ↓ build Next.js
    ├── Vercel deployment (automatico, preview + production)
    └── SFTP export statico → Plesk (per domini specifici)
```

**Perché questa scelta:**

| Criterio | Option A (solo Plesk) | Option B (Vercel) | Option C (self-hosted) | Option D (ibrida) |
|---|---|---|---|---|
| Velocità setup | Media | Alta | Bassa | Alta |
| Edge network / CDN | No | Sì (globale) | No | Sì |
| Preview URLs | Manuale | Automatico | No | Automatico |
| Costo | Server esistente | ~$20/mese Pro | Server esistente | ~$20/mese |
| Manutenzione server | Alta | Zero | Alta | Bassa |
| Custom domains | Richiede DNS | Vercel domains | Nativo Plesk | Flessibile |
| Cold start | N/A | Zero (static) | Dipende | Zero |

**Dettaglio tecnica ibrida adottata:**
- Vercel è la destinazione primaria. Ogni landing page vive su `alfiobardolla.vercel.app/[slug]` o su domini custom puntati a Vercel via CNAME.
- Per domini già su Plesk che non si vogliono migrare: GitHub Actions esegue `next build && next export` e carica la cartella `out/[slug]/` via SFTP sul Plesk.
- I due percorsi non si escludono — si possono usare entrambi contemporaneamente per domini diversi.

**Vantaggi concreti:**
- Zero DevOps per il caso principale (Vercel)
- Deploy in 2-3 minuti da un push git
- Preview URL automatica per ogni PR (utile per review del marketing)
- Static export per Plesk non richiede Node.js sul server — serve solo Apache/Nginx
- ISR (Incremental Static Regeneration) disponibile su Vercel per pagine che cambiano spesso

---

## 2. Content Management — Decisione

### Decisione: JSON files per page + admin panel interno leggero

**Rifiuto del headless CMS esterno (Strapi/Contentful/Sanity) — Perché:**
- Aggiunge una dipendenza esterna a pagamento
- Il team non usa un CMS, usa Claude Code
- La struttura dati è già perfettamente tipizzata in TypeScript
- Latenza extra in build/runtime
- Costo: Contentful parte da $300/mese per uso serio, Sanity da $99/mese

**Approccio adottato:**
```
src/
  content/
    pages/
      missione-immobiliare.json   ← PageConfig serializzato
      wake-up-call-aprile.json
      webinar-trading-marzo.json
    _schema/
      page-config.schema.json     ← JSON Schema per validazione
```

Ogni file JSON è un `PageConfig` completo. Il `getPageConfig()` attuale va modificato per leggere da filesystem invece che dalla `templateRegistry` hardcodata.

**Workflow concreto per il marketing:**
1. Si vuole una nuova landing → si duplica il JSON di un template simile
2. Si modificano testi, date, form IDs, immagini
3. Push su GitHub → deploy automatico
4. Con l'admin panel (Fase 2): si fa tutto via UI senza toccare JSON

**Compatibilità con l'approccio "Claude Code as CMS":**
Questo approccio è perfettamente compatibile. Claude legge e scrive i JSON direttamente. Il file JSON è la fonte di verità, non un database opaco. Claude può creare una nuova pagina in secondi dando in input testi + immagini.

---

## 3. Pipeline di Deploy

### 3a. Deploy su Vercel (percorso principale)

```yaml
# .github/workflows/deploy-vercel.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

In realtà per Vercel basta connettere il repo GitHub dall'interfaccia Vercel — il deploy avviene automaticamente senza GitHub Actions. GitHub Actions serve solo per step aggiuntivi (test, validazione schema, ecc).

### 3b. Deploy su Plesk via SFTP (percorso secondario)

```yaml
# .github/workflows/deploy-plesk.yml
name: Deploy Static to Plesk
on:
  workflow_dispatch:           # trigger manuale
    inputs:
      slug:
        description: 'Page slug to deploy'
        required: true
      domain:
        description: 'Target domain on Plesk'
        required: true
  push:
    branches: [main]
    paths:
      - 'src/content/pages/**'  # solo se cambiano contenuti

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Build static export
        run: |
          npm run build
          # next.config.ts deve avere output: 'export'
      - name: Deploy via SFTP
        uses: wlixcc/SFTP-Deploy-Action@v1.2.4
        with:
          username: ${{ secrets.PLESK_USER }}
          server: ${{ secrets.PLESK_HOST }}
          password: ${{ secrets.PLESK_PASSWORD }}
          local_path: './out/${{ github.event.inputs.slug }}/*'
          remote_path: '/var/www/vhosts/${{ github.event.inputs.domain }}/httpdocs/'
          delete_remote_files: true
```

**Configurazione `next.config.ts` per export statico:**
```typescript
const nextConfig: NextConfig = {
  output: 'export',           // genera cartella /out
  trailingSlash: true,        // compatibilità Apache
  images: {
    unoptimized: true,        // necessario per export statico
  },
};
```

Attenzione: `output: 'export'` disabilita le API routes di Next.js e l'ISR. Per il caso Plesk è accettabile (le pagine sono statiche). Per Vercel si usa il build standard senza questo flag.

### 3c. Strategia DNS per domini Plesk

**Opzione 1 — CNAME a Vercel (consigliata per nuovi domini):**
```
mi.alfiobardolla.com  CNAME  cname.vercel-dns.com
```
Vercel gestisce tutto, Plesk non è coinvolto.

**Opzione 2 — A record su Plesk (per domini già su Plesk):**
```
landing.alfiobardolla.com  A  [IP Plesk]
```
Deploy via SFTP come descritto sopra.

**Opzione 3 — Sottopath su dominio esistente:**
```
alfiobardolla.com/missione-immobiliare
```
Richiede configurazione reverse proxy su Plesk verso Vercel, oppure deploy statico in sottocartella.

---

## 4. Modifiche al Codebase Esistente

### 4a. Rendere `getPageConfig()` dinamico

**File da modificare:** `src/app/[slug]/page.tsx`

```typescript
// src/lib/page-loader.ts (file nuovo)
import path from 'path';
import fs from 'fs/promises';
import type { PageConfig } from '@/types/blocks';
import { templateRegistry } from './templates';

export async function getPageConfig(slug: string): Promise<PageConfig | null> {
  // 1. Prima cerca in /content/pages/ (priorità)
  try {
    const filePath = path.join(process.cwd(), 'src/content/pages', `${slug}.json`);
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as PageConfig;
  } catch {
    // file non trovato, continua
  }

  // 2. Fallback alla templateRegistry (retrocompatibilità)
  for (const config of Object.values(templateRegistry)) {
    if (config.slug === slug) return config;
  }

  return null;
}

export async function getAllSlugs(): Promise<string[]> {
  const slugs = new Set<string>();

  // Da file JSON
  try {
    const dir = path.join(process.cwd(), 'src/content/pages');
    const files = await fs.readdir(dir);
    files
      .filter(f => f.endsWith('.json'))
      .forEach(f => slugs.add(f.replace('.json', '')));
  } catch {}

  // Da templateRegistry
  Object.values(templateRegistry).forEach(c => slugs.add(c.slug));

  return Array.from(slugs);
}
```

### 4b. Validazione JSON Schema in CI

Aggiungere uno step di validazione prima del deploy:

```json
// package.json scripts
"validate:pages": "ajv validate -s src/content/_schema/page-config.schema.json -d 'src/content/pages/*.json'"
```

Il file `src/lib/page-config-schema.json` esiste già — va spostato in `src/content/_schema/`.

---

## 5. Admin Panel

### Decisione: Route `/admin` nel progetto esistente, protetta da middleware

Non serve un'app separata. Un'app Next.js può ospitare sia le landing pages che l'admin nella stessa codebase. Separarle aggiunge complessità senza benefici a questo stadio.

### 5a. Struttura Route

```
/admin                    → Dashboard (lista tutte le pagine)
/admin/pages              → Lista pagine con filtri
/admin/pages/new          → Crea nuova pagina (selezione template)
/admin/pages/[slug]       → Editor visuale / JSON editor
/admin/pages/[slug]/preview  → Preview iframe
/admin/deploy             → Status deploy, trigger manuale
/admin/templates          → Libreria template
/admin/analytics          → Iframe Vercel Analytics o Google Analytics
```

### 5b. Protezione con Next.js Middleware

```typescript
// middleware.ts (root del progetto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value;
    const validToken = process.env.ADMIN_TOKEN;

    if (!token || token !== validToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

**Autenticazione semplice:** un token statico in env var. Non serve OAuth/NextAuth per un team piccolo che usa lo stesso account. Se serve multi-utente in futuro, si aggiunge NextAuth in un'ora.

### 5c. Features Admin Panel — Priorità

**MUST HAVE (Fase 1):**
- Lista tutte le pagine con: nome, slug, template, stato (live/draft), ultima modifica, link preview, link produzione
- Bottone "Duplica" per clonare una pagina esistente
- Editor JSON con syntax highlighting e validazione schema in tempo reale
- Preview iframe con refresh live
- Status deploy (Vercel webhook o polling API)

**SHOULD HAVE (Fase 2):**
- Editor visuale a blocchi (drag & drop ordine blocchi, form per ogni blocco)
- Upload immagini (Vercel Blob o R2 Cloudflare)
- Cronologia versioni (git log per file)
- Filtri per template type, data creazione, campagna

**NICE TO HAVE (Fase 3):**
- A/B test tra due versioni della stessa pagina
- Heatmap integration (Hotjar embed)
- Conversions dashboard aggregata

### 5d. Wireframe Admin Dashboard

```
+----------------------------------------------------------+
|  ABTG Landing Factory                    [+ Nuova Pagina]|
+----------------------------------------------------------+
| Filtri: [Tutti] [Events] [Webinar] [Corsi] [Lead Magnet] |
+----------------------------------------------------------+
| PAGINA               | TEMPLATE | STATO  | DEPLOY  | #   |
|----------------------|----------|--------|---------|-----|
| Missione Immobiliare | workshop | LIVE   | Vercel  | [>] |
| Wake Up Call Apr '26 | event    | LIVE   | Plesk   | [>] |
| Webinar Trading      | webinar  | DRAFT  | —       | [>] |
| eBook 7 Regole       | lead-mag | LIVE   | Vercel  | [>] |
+----------------------------------------------------------+
| [>] = Apre: Preview | Editor | Duplica | Analytics | Deploy |
+----------------------------------------------------------+
```

```
EDITOR PAGINA — Missione Immobiliare
+--------------------+----------------------------+
| BLOCCHI (ordine)   | PREVIEW (iframe live)      |
|                    |                            |
| [≡] Hero           | +-----------------------+  |
| [≡] Social Proof   | |                       |  |
| [≡] Benefits       | |  [iframe /missione-   |  |
| [≡] Speaker        | |   immobiliare?preview]|  |
| [≡] Event Details  | |                       |  |
| [≡] Testimonials   | +-----------------------+  |
| [≡] FAQ            |                            |
| [≡] Countdown      | [Refresh] [Apri in tab]    |
| [≡] HubSpot Form   |                            |
| [≡] Footer         | METADATA                   |
|                    | Slug: missione-immobiliare |
| [+ Aggiungi blocco]| Template: workshop         |
|                    | Dominio: mi.abtg.it        |
+--------------------+ [Salva Bozza] [Deploy]    +
```

---

## 6. Design System

### 6a. Struttura Attuale (da mantenere e estendere)

```
src/components/
  blocks/                  ← 13 tipi di blocco (già ottimi)
    HeroSection.tsx
    HeroAnimated.tsx       ← variante animata
    BenefitsSection.tsx
    BenefitsAnimated.tsx
    ...
  ui/                      ← primitivi
    Button.tsx
    SectionHeading.tsx
    SectionWrapper.tsx
```

### 6b. Cosa Aggiungere

```
src/
  design-tokens/
    tokens.css             ← CSS custom properties (colori, spacing, font)
    brand.ts               ← costanti brand TypeScript
  components/
    blocks/
      VideoSection.tsx     ← nuovo: sezione video YouTube/Vimeo
      ComparisonTable.tsx  ← nuovo: tabella prima/dopo
      GuaranteeSection.tsx ← nuovo: sezione garanzia
      TimelineSection.tsx  ← nuovo: percorso step-by-step
    layouts/
      TwoColumn.tsx        ← wrapper layout reusable
      FullWidth.tsx
    animations/
      CountUp.tsx          ← numero animato
      RevealOnScroll.tsx   ← wrapper fade-in
  content/
    pages/                 ← JSON delle pagine
    assets/
      images/              ← immagini ottimizzate
      logos/               ← loghi media press
```

### 6c. Design Tokens — Brand ABTG

```css
/* src/design-tokens/tokens.css */
:root {
  /* Colori brand */
  --color-primary: #D76E11;       /* arancione ABTG */
  --color-primary-dark: #B85E0E;
  --color-secondary: #1A1A2E;     /* blu notte */
  --color-surface: #0F0F1A;       /* sfondo pagina */
  --color-text: #F0F0F0;
  --color-text-muted: #9999AA;
  --color-border: rgba(255,255,255,0.08);

  /* Spaziatura */
  --section-padding: clamp(4rem, 8vw, 8rem);
  --container-max: 1200px;

  /* Font */
  --font-heading: 'Syne', sans-serif;    /* per headline impattanti */
  --font-body: 'Inter', sans-serif;

  /* Border radius */
  --radius-card: 16px;
  --radius-btn: 8px;
}
```

### 6d. Regole di Consistenza (enforcement automatico)

1. **Ogni blocco usa `SectionWrapper`** per padding/max-width consistente
2. **Ogni headline usa `SectionHeading`** per gerarchia tipografica
3. **Ogni CTA usa il componente `Button`** con varianti brand
4. **I colori sono SOLO da CSS custom properties**, mai hardcodati
5. **Le immagini sono SOLO da `next/image`** per ottimizzazione automatica

Questi non sono suggerimenti — sono enforced da un ESLint rule custom se necessario.

---

## 7. Integrazione HubSpot, Analytics, Facebook Pixel

### 7a. HubSpot Forms

Il blocco `hubspot-form` è già tipizzato. Implementazione corrente via script embed. Miglioramento consigliato:

```typescript
// src/components/blocks/HubSpotFormSection.tsx
// Usare l'API HubSpot Forms embed ufficiale
// portalId + formId vengono dal PageConfig JSON
// onFormSubmit callback → fbq('track', 'Lead') + gtag event
```

**Importante:** il `formId` e `portalId` vanno nel JSON della pagina, non hardcodati nel componente. Ogni campagna ha il proprio form HubSpot.

### 7b. Facebook Pixel

Già implementato nella route `[slug]/page.tsx` — legge `config.tracking.facebookPixelId`. Basta compilare il campo nel JSON della pagina.

**Aggiunta consigliata:** evento `Lead` al submit del form HubSpot:
```typescript
// dentro HubSpotFormSection dopo submit
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead');
}
```

### 7c. Google Analytics / GA4

Aggiungere al `TrackingConfig` già esistente:
```typescript
// src/types/blocks.ts — aggiunta al TrackingConfig
googleAnalyticsId?: string;  // già c'è, implementare in layout.tsx
```

```typescript
// src/app/layout.tsx — aggiungere GoogleAnalytics component
// Usare @next/third-parties/google (ufficiale Next.js)
import { GoogleAnalytics } from '@next/third-parties/google';
```

### 7d. Google Tag Manager (consigliato su GA4 diretto)

GTM è preferibile per ABTG perché:
- Il team marketing può aggiungere pixel/eventi senza deploy
- Un solo script nel layout, tutti gli altri tag gestiti da GTM
- Supporta FB Pixel, GA4, LinkedIn Insight, HubSpot tracking simultaneamente

```typescript
// src/app/layout.tsx
// gtmId nel PageConfig.tracking
```

---

## 8. Gestione Immagini

### Problema attuale

Le immagini sono in `/public/images/` e referenziate nei JSON con path relativi. Non c'è un sistema per uploadarle senza toccare il repo.

### Soluzione Fase 1: Vercel Blob

```
npm install @vercel/blob
```

- Upload dal admin panel → URL stabile `https://xxx.public.blob.vercel-storage.com/...`
- URL viene salvato nel JSON della pagina
- `next/image` ottimizza automaticamente le immagini remote
- Costo: $0.023/GB/mese — irrilevante per volumi ABTG

### Soluzione Fase 2: Cloudflare Images (se volumetria cresce)

- $5/mese flat fino a 100.000 immagini
- Trasformazioni URL (resize, crop, format)
- CDN globale Cloudflare

### Configurazione `next.config.ts` per domini immagini

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',  // Cloudflare Images
      },
    ],
  },
};
```

---

## 9. Roadmap di Implementazione

### Fase 0 — Completamento blocchi mancanti (1-2 giorni)
**Obiettivo:** rendere il sistema deployabile per il prossimo evento.

- [ ] Implementare `BlockRenderer.tsx` completo (tutti i 13 tipi di blocco mappati)
- [ ] Spostare `missione-immobiliare` da templateRegistry a `src/content/pages/missione-immobiliare.json`
- [ ] Implementare `page-loader.ts` con lettura da filesystem
- [ ] Test build completo
- [ ] Deploy su Vercel e verifica pagina live

**Output:** sistema funzionante con Missione Immobiliare live su Vercel.

---

### Fase 1 — Pipeline Deploy Plesk (2-3 giorni)
**Obiettivo:** capacità di deployare su qualsiasi dominio Plesk in un click.

- [ ] Configurare `output: 'export'` condizionale (env var `EXPORT_STATIC=true`)
- [ ] Script `scripts/deploy-plesk.sh` per SFTP upload
- [ ] GitHub Actions workflow `.github/workflows/deploy-plesk.yml`
- [ ] Secrets GitHub: `PLESK_HOST`, `PLESK_USER`, `PLESK_PASSWORD`
- [ ] Test su dominio di staging Plesk
- [ ] Documentare la procedura DNS (CNAME vs A record)

**Output:** deploy su Plesk in < 5 minuti con un comando.

---

### Fase 2 — Admin Panel MVP (5-7 giorni)
**Obiettivo:** il team marketing può gestire pagine senza toccare codice.

- [ ] Route `/admin` con middleware autenticazione (token in env)
- [ ] Pagina login `/admin/login`
- [ ] Dashboard con lista pagine (leggere da `src/content/pages/`)
- [ ] Pagina dettaglio con: JSON editor (Monaco Editor), preview iframe, bottone deploy
- [ ] Bottone "Duplica pagina" → crea nuovo JSON da template
- [ ] API routes: `GET /api/admin/pages`, `PUT /api/admin/pages/[slug]`, `POST /api/admin/deploy`
- [ ] Trigger deploy Vercel via `VERCEL_DEPLOY_HOOK` (URL webhook)
- [ ] Trigger deploy Plesk via GitHub Actions API

**Stack admin UI:**
- `@monaco-editor/react` per JSON editing con schema validation
- `shadcn/ui` per componenti admin (separati dallo stile delle landing)
- Tailwind CSS (stesso tool, configurazione separata per admin theme)

**Output:** admin panel accessibile su `/admin`, protetto, funzionante.

---

### Fase 3 — Editor Visuale (10-15 giorni)
**Obiettivo:** creare/modificare pagine senza scrivere JSON.

- [ ] Form per ogni tipo di blocco (13 form da costruire)
- [ ] Preview live reattiva (iframe che si aggiorna al cambio)
- [ ] Drag & drop ordine blocchi (`@dnd-kit/core`)
- [ ] Upload immagini integrato (Vercel Blob)
- [ ] Selezione template al momento della creazione
- [ ] Validazione campi obbligatori per tipo blocco
- [ ] History undo/redo (gestione stato con Zustand)

**Output:** creazione landing page completa in < 30 minuti senza codice.

---

### Fase 4 — Intelligence e Automation (ongoing)
**Obiettivo:** il sistema impara e accelera la produzione.

- [ ] "Clone da sito" — data una URL di riferimento, scraping e proposta struttura blocchi (il `scrape-site.mjs` è già presente)
- [ ] Suggerimento testi via AI (Claude API) per headline e copy
- [ ] Analytics consolidata (conversions per pagina, heatmap)
- [ ] A/B test framework
- [ ] Template library pubblico (condivisione templates tra campagne simili)

---

## 10. Analisi Costi

### Costi fissi mensili

| Servizio | Piano | Costo/mese | Note |
|---|---|---|---|
| Vercel | Pro | $20 | Necessario per team (preview URLs, analytics) |
| Vercel Blob | Usage | ~$2-5 | Storage immagini, < 5GB previsto |
| GitHub | Free/Team | $0-4 | Actions incluse |
| Plesk | Esistente | $0 | Già pagato da ABTG |
| HubSpot | Esistente | $0 | Marketing Hub già attivo |
| **Totale** | | **~$25-29/mese** | |

### Costi variabili

| Voce | Costo | Trigger |
|---|---|---|
| Vercel Bandwidth | $0.15/GB | Dopo 100GB/mese inclusi |
| Vercel Function calls | $0.60/1M | Per SSR, non static |
| Cloudflare Images | $5/mese | Se si supera Vercel Blob |

### Confronto con stato attuale

- WordPress/Elementor hosting: ~$50-100/mese (stimato)
- Tempo per costruire landing Elementor: 1-2 giorni
- Tempo per costruire landing con questo sistema: 2-4 ore
- **ROI stimato:** 10x velocità produzione, costi simili o inferiori

---

## 11. Performance e SEO

### Targets Core Web Vitals

| Metrica | Target | Come raggiungerlo |
|---|---|---|
| LCP | < 2.5s | Hero image preload, next/image priority, Vercel CDN |
| FID/INP | < 100ms | Nessun JS bloccante nel critical path |
| CLS | < 0.1 | Dimensioni immagini esplicite, font preload |
| TTFB | < 800ms | Static generation (ISR o full static) |

### Strategia render

- **Landing pages:** `generateStaticParams` + static generation → HTML pre-renderizzato, zero server compute
- **Admin panel:** SSR normale, non impatta le landing
- **Immagini:** `next/image` con `priority` su hero, `lazy` su tutto il resto, formato WebP/AVIF automatico

### SEO tecnico

Il sistema è già configurato per:
- `generateMetadata()` per ogni pagina (title, description, OG)
- `noIndex` per thank-you pages
- `canonicalUrl` per evitare duplicati tra Vercel e Plesk

Da aggiungere:
- Sitemap automatica con `next-sitemap`
- Schema markup (Event, Course, FAQ) via JSON-LD per rich snippets Google

---

## 12. Sicurezza

### Admin Panel
- Token auth con `ADMIN_TOKEN` env var (rotazione trimestrale)
- CSRF protection via Next.js middleware
- Rate limiting su `/api/admin/*` (max 100 req/min)
- Tutte le env var in Vercel dashboard, mai nel repo

### Plesk SFTP
- Credenziali in GitHub Secrets (non nel repo)
- Utente SFTP dedicato con accesso solo alla cartella httpdocs
- Chiave SSH preferita rispetto a password

### Contenuti
- JSON sanitization prima di render (nessun `dangerouslySetInnerHTML` da input utente)
- L'unico `dangerouslySetInnerHTML` è per i tracking scripts (Facebook Pixel) — contenuto fisso nei JSON

---

## 13. Struttura File Raccomandata (stato finale)

```
ab-landing-system/
├── .github/
│   └── workflows/
│       ├── ci.yml                    ← lint + validate JSON
│       └── deploy-plesk.yml          ← SFTP deploy
├── src/
│   ├── app/
│   │   ├── [slug]/
│   │   │   └── page.tsx              ← usa page-loader.ts
│   │   ├── admin/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              ← dashboard
│   │   │   ├── login/page.tsx
│   │   │   └── pages/
│   │   │       ├── page.tsx          ← lista pagine
│   │   │       ├── new/page.tsx
│   │   │       └── [slug]/
│   │   │           ├── page.tsx      ← editor
│   │   │           └── preview/page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── pages/route.ts    ← CRUD pagine
│   │   │   │   └── deploy/route.ts   ← trigger deploy
│   │   │   └── revalidate/route.ts   ← ISR revalidation webhook
│   │   └── globals.css
│   ├── components/
│   │   ├── blocks/                   ← 13+ blocchi (già esistenti)
│   │   └── ui/                       ← primitivi (già esistenti)
│   ├── content/
│   │   ├── pages/                    ← JSON per ogni landing
│   │   │   ├── missione-immobiliare.json
│   │   │   └── ...
│   │   └── _schema/
│   │       └── page-config.schema.json
│   ├── design-tokens/
│   │   ├── tokens.css
│   │   └── brand.ts
│   ├── lib/
│   │   ├── page-loader.ts            ← legge JSON da filesystem
│   │   ├── templates.ts              ← templateRegistry (retrocompat)
│   │   └── BlockRenderer.tsx
│   └── types/
│       └── blocks.ts                 ← già ottimo, nessuna modifica
├── scripts/
│   ├── scrape-site.mjs               ← già esistente
│   └── deploy-plesk.sh              ← nuovo
├── middleware.ts                     ← protezione /admin
├── next.config.ts
└── package.json
```

---

## 14. Prossimi 3 Passi Concreti

**Domani (Fase 0 — priorità assoluta):**

1. Verificare che `BlockRenderer.tsx` mappi tutti i 13 tipi di blocco correttamente
2. Creare `src/content/pages/missione-immobiliare.json` con il contenuto dal templateRegistry
3. Modificare `getPageConfig()` in `[slug]/page.tsx` per leggere da file JSON

**Questa settimana (Fase 1):**

4. Configurare Vercel deploy hook URL e salvarlo come GitHub Secret
5. Creare `.github/workflows/ci.yml` con validazione JSON schema
6. Testare build completo e pagina live su Vercel

**Settimana successiva (Fase 2 - MVP admin):**

7. Implementare middleware autenticazione per `/admin`
8. Dashboard admin con lista pagine e JSON editor (Monaco)
9. Bottone deploy che chiama Vercel webhook

---

## Note Finali

Questo sistema è già al 60% di ciò che serve. Il blocco di contenuto (tipi, template, block system) è solido e non richiede refactoring. L'investimento mancante è nell'infrastruttura di delivery (pipeline deploy, file-based content) e nell'admin panel.

La sequenza di priorità è:
1. **Render corretto** (Fase 0) — niente vale se la pagina non si mostra bene
2. **Deploy automatico** (Fase 1) — velocità di pubblicazione è il KPI principale
3. **Admin panel** (Fase 2) — autonomia del team marketing
4. **Editor visuale** (Fase 3) — solo se l'admin JSON è un collo di bottiglia

Non costruire l'editor visuale prima che il team abbia usato il JSON editor per qualche settimana. Potresti scoprire che il JSON editor con Monaco è già abbastanza veloce per il loro workflow.
