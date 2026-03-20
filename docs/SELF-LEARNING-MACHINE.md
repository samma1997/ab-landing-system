# Self-Learning Landing Page Machine
**Alfio Bardolla Training Group — Architecture Document**
Version: 1.0 — March 2026

---

## Overview

This document describes the complete architecture for a self-improving landing page production system where Claude Code acts as the primary engine. The user provides content (PDF + images). Claude Code does the rest.

The system has four interlocking parts:

1. **Image Bank** — structured storage of all visual assets, indexed for automatic retrieval
2. **Knowledge Base** — institutional memory that makes every new page better than the last
3. **Auto-Assembly Pipeline** — the step-by-step workflow for building a page from scratch
4. **Template Evolution** — how the system learns and improves over time

Claude Code is not a passive code generator in this system. It is the CMS, the designer, the content strategist, and the deploy engineer. The user's only job is to provide raw content and feedback.

---

## Part 1 — Image Bank

### 1.1 Structure

```
public/images/bank/
├── speakers/
│   ├── speaker-alfio-bardolla-600x600.webp
│   ├── speaker-alfio-bardolla-400x400.webp
│   └── speaker-alfio-bardolla-800x1000.webp
├── events/
│   ├── event-missione-immobiliare-audience-1200x630.webp
│   ├── event-wake-up-call-stage-1920x1080.webp
│   └── event-sala-plenaria-800x600.webp
├── immobiliare/
│   ├── immobiliare-appartamento-milano-1200x800.webp
│   └── immobiliare-calcolo-rendita-800x600.webp
├── trading/
│   ├── trading-monitor-setup-1200x800.webp
│   └── trading-grafico-candlestick-800x600.webp
├── backgrounds/
│   ├── bg-dark-abstract-1920x1080.webp
│   ├── bg-hero-city-night-2560x1440.webp
│   └── bg-pattern-subtle-1440x900.webp
├── icons/
│   ├── icon-checkmark-green-64x64.svg
│   ├── icon-arrow-orange-64x64.svg
│   └── icon-star-yellow-64x64.svg
├── logos/
│   ├── logo-abtg-white.svg
│   ├── logo-abtg-orange.svg
│   ├── logo-sole24ore.svg
│   ├── logo-corriere-della-sera.svg
│   ├── logo-la7.svg
│   └── logo-borsa-italiana.svg
└── testimonials/
    ├── testimonial-marco-ferretti-200x200.webp
    └── testimonial-giulia-romano-200x200.webp
```

### 1.2 Naming Convention

```
{category}-{description-slug}-{widthxheight}.{ext}
```

Rules:
- All lowercase, hyphens only (no spaces, no underscores)
- Width x height always at the end before extension
- Description slug: 2-4 words max, descriptive
- Extension: prefer `.webp` for photos, `.svg` for logos and icons

Examples:
```
speaker-alfio-bardolla-600x600.webp      ✓
events-sala-plenaria-1920x1080.webp      ✓
bg_hero_dark.jpg                          ✗ (underscores)
AlfioSpeaker.PNG                          ✗ (wrong format, no dimensions)
```

### 1.3 Registry File

All images are indexed in `/src/content/images/bank-registry.json`.

**Schema for each image entry:**
```json
{
  "id": "speaker-alfio-bardolla-600x600",
  "path": "/images/bank/speakers/speaker-alfio-bardolla-600x600.webp",
  "category": "speakers",
  "tags": ["alfio", "bardolla", "speaker", "formatore", "ceo"],
  "altText": "Alfio Bardolla — formatore e investitore",
  "width": 600,
  "height": 600,
  "format": "webp",
  "fileSizeKb": 85,
  "addedDate": "2026-03-20",
  "usedInPages": ["missione-immobiliare-v2"],
  "notes": "Foto ufficiale 2026, sfondo neutro, giacca scura"
}
```

**Full registry structure:**
```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-03-20T00:00:00Z",
  "totalImages": 0,
  "categories": { ... },
  "images": [ ... ],
  "usageLog": [
    {
      "date": "2026-03-20",
      "imageId": "speaker-alfio-bardolla-600x600",
      "usedInPage": "missione-immobiliare-v2",
      "blockType": "speaker"
    }
  ]
}
```

### 1.4 How Claude Code Uses the Image Bank

When building a new page, Claude Code follows this decision tree for every image slot:

```
1. IDENTIFY what type of image is needed (speaker photo, hero background, testimonial, etc.)
2. SEARCH bank-registry.json for matching images:
   - Filter by category
   - Search tags for relevant keywords from the page content
   - Check dimensions match block requirements
3. MATCH found?
   YES → Use the bank image path in the page JSON
         → Add page to image's `usedInPages` array in registry
   NO  → Use placeholder path (see placeholder convention below)
        → Add a comment in the page JSON: "// TODO: add {category} image to bank"
        → Note in page-history.md: "Image needed: {description}"
4. REPORT to user: which images were found in bank, which used placeholders
```

**Placeholder convention:**
```json
"imageSrc": "/images/bank/speakers/speaker-alfio-bardolla-600x600.webp",
// If not found:
"imageSrc": "/images/placeholder-speaker-600x600.jpg",
```

The system should always note what image it substituted and where the real image should go.

### 1.5 Adding Images to the Bank

When a user provides new images:

1. Rename to convention: `{category}-{description}-{WxH}.{ext}`
2. Place in correct category subfolder
3. Add entry to `bank-registry.json`
4. If a previously built page used a placeholder for this image type, update that page's JSON

### 1.6 Dashboard Integration (Image Bank Tab)

The admin panel `/admin` should include a "Banca Immagini" tab with:
- Grid view of all images by category
- Upload button (drops file in correct folder, prompts for metadata)
- Search by tag or category
- "Used in pages" link from each image
- Orphaned images warning (images not used in any page)
- Missing images list (pages with placeholder images)

Implementation: API route reads `bank-registry.json` + scans filesystem for any images not in registry.

---

## Part 2 — Knowledge Base

### 2.1 File Structure

```
docs/knowledge/
├── brand-guidelines.md       — colors, fonts, tone of voice, legal requirements
├── content-patterns.md       — ABTG copy formulas, section patterns, FAQ sets
├── page-history.md           — log of every page built, decisions, results
├── competitor-insights.md    — what competitors do well, design patterns to adopt
└── conversion-learnings.md   — A/B tests, analytics findings, hypotheses
```

### 2.2 How Claude Code Uses the Knowledge Base

Before starting any new page, Claude Code reads these files in this order:

```
1. brand-guidelines.md       → loads color tokens, font rules, legal disclaimers
2. content-patterns.md       → loads copy formulas relevant to the page type
3. page-history.md           → finds similar past pages to use as structural reference
4. conversion-learnings.md   → checks confirmed learnings to apply immediately
5. competitor-insights.md    → checks if any competitor pattern is relevant to page type
```

This is the "context load" step before any page is assembled.

**Practical example — building a new webinar page:**
- From `brand-guidelines.md`: load dark theme, orange CTA rules, legal disclaimer text
- From `content-patterns.md`: load webinar-specific headline formulas, standard FAQ set, meta title formula
- From `page-history.md`: find previous webinar pages, use their block order as starting point
- From `conversion-learnings.md`: apply any confirmed learnings (e.g., "FAQ before form converts better")
- From `competitor-insights.md`: check if there's a specific competitor webinar pattern to consider

### 2.3 Knowledge Base Update Protocol

After each page is built:
1. Claude Code adds an entry to `page-history.md`
2. If new copy patterns emerged that weren't in `content-patterns.md`, add them
3. If user provides feedback ("this headline didn't work"), log in `conversion-learnings.md`
4. If brand decisions were made (new color usage, new disclaimer), update `brand-guidelines.md`

After each analytics review (monthly):
1. Update `conversion-learnings.md` with confirmed data
2. Promote active hypotheses to "confirmed" or "rejected"
3. Add new hypotheses based on data patterns

### 2.4 Knowledge Base Versioning

The knowledge base files are versioned in git alongside the code. Every update is committed with a message that explains what was learned and why the file changed. This creates an audit trail of how the system's "thinking" evolved.

---

## Part 3 — Auto-Assembly Pipeline

### 3.1 Overview

The pipeline takes user-provided content (PDF + optional images) and produces a deployed landing page. Claude Code is the engine at every step.

```
INPUT                    PIPELINE                        OUTPUT
─────────────────────────────────────────────────────────────────
PDF with content    →    1. Read knowledge base          →
(+ images folder)        2. Parse PDF content
                         3. Identify page type
                         4. Map content to blocks
                         5. Select images from bank      →   page JSON
                         6. Generate metadata
                         7. Validate JSON schema         →   deployed page
                         8. Write files
                         9. Deploy                       →   live URL
```

### 3.2 Step-by-Step Pipeline

#### Step 1 — Context Load

Read the knowledge base before touching the PDF.

```
Read docs/knowledge/brand-guidelines.md
Read docs/knowledge/content-patterns.md
Read docs/knowledge/page-history.md (last 5 entries)
Read docs/knowledge/conversion-learnings.md (confirmed section only)
```

This loads the "mental model" for building an ABTG page.

#### Step 2 — Parse PDF Content

Extract all content from the PDF and map it to ABTG content types:

```
Identify:
- Page type: event | webinar | course-sales | lead-magnet | thank-you
- Event/product name → page title and slug
- Dates and times → CountdownTimer end date, EventDetails content
- Venue / format (online/in-person) → EventDetails
- Program / agenda → Benefits or NumberedPhases blocks
- Speaker info → SpeakerSection content
- Testimonials → TestimonialSection content
- Price info → PricingSection (if paid) or null (if free)
- FAQ questions and answers → FAQSection content
- Legal text → FooterSection

Note what's MISSING and will need placeholders or user input:
- HubSpot form ID
- Facebook Pixel ID
- Real images (check bank)
- Any content not in PDF
```

#### Step 3 — Block Selection and Ordering

Using the page type identified in Step 2, apply the block ordering rules from `docs/CONVERSION-PLAYBOOK.md`:

**Free Event (workshop/webinar):**
```
1. hero (with countdown if < 14 days to event)
2. social-proof (logos + student count)
3. benefits (program outline, what they'll learn)
4. speaker (Alfio bio + credentials)
5. event-details (date, time, location, format)
6. testimonials (3-5 student results)
7. faq (6-8 questions, objection-handling)
8. countdown + hubspot-form (urgency + conversion)
9. footer
```

**Paid Course (sales page):**
```
1. hero
2. social-proof
3. transformation (before/after or checklist)
4. benefits (what's included)
5. speaker
6. testimonials (video preferred)
7. pricing
8. faq
9. guarantee (if applicable)
10. cta-divider
11. footer
```

**Lead Magnet (ebook/guide):**
```
1. hero (with form above fold)
2. what-you-get (inside the guide)
3. social-proof (brief)
4. speaker (brief)
5. footer
```

#### Step 4 — Image Selection

For each block that requires an image:

```
For block type: speaker
  → Search bank-registry.json: category=speakers, tags include speaker name
  → Found "speaker-alfio-bardolla-600x600.webp"? Use it.
  → Not found? Use placeholder, note in report.

For block type: hero (background)
  → Search bank-registry.json: category=backgrounds
  → Filter by tags matching page topic (immobiliare, trading, event)
  → Found match? Use it.
  → Not found? Use generic dark background or leave null for CSS-only hero.

For block type: testimonials
  → Check if PDF includes testimonial photos
  → If yes, note they need to be added to bank/testimonials/
  → If no, skip photo field (text + name + city is acceptable)
```

#### Step 5 — Content Assembly

Write the complete `PageConfig` JSON for the page. This is the page's source of truth.

Follow these rules during assembly:
- Copy from PDF verbatim where the copy is already good
- Apply content-patterns.md formulas where PDF copy is weak
- Apply brand-guidelines.md color tokens (never hardcode colors)
- Apply legal disclaimers exactly as specified in brand-guidelines.md
- Generate meta title and description using content-patterns.md formulas

Output: `src/content/pages/{slug}.json`

#### Step 6 — Create Route (if needed)

If the page uses the dynamic `[slug]` route, no new files are needed.
If a dedicated route is needed (for layout customization), create:
```
src/app/{slug}/
  page.tsx
  layout.tsx (optional)
```

#### Step 7 — Validate

Before committing:
```bash
# Validate JSON against schema
npx ajv validate -s src/lib/page-config-schema.json -d src/content/pages/{slug}.json

# TypeScript compile check
npx tsc --noEmit

# Build check
npm run build
```

If validation fails, fix the issues before proceeding.

#### Step 8 — Update Knowledge Base

After the page is assembled and validated:
1. Add entry to `docs/knowledge/page-history.md`
2. Update `src/content/pages/registry.json` with new page entry
3. Update `bank-registry.json` with `usedInPages` for any images used

#### Step 9 — Deploy

Commit all files and push to main (triggers Vercel auto-deploy):

```bash
git add src/content/pages/{slug}.json
git add src/app/{slug}/ (if created)
git add docs/knowledge/page-history.md
git add src/content/images/bank-registry.json
git commit -m "feat: add {page name} landing page"
git push origin main
```

Vercel deploys automatically. Share the live URL.

#### Step 10 — Report to User

After deployment, report:
```
Page built: {page name}
Live URL: https://[project].vercel.app/{slug}
Blocks used: [list]
Images from bank: [list] (or "none found, all placeholders")
Images needed: [list with descriptions]
Missing data to add later: [HubSpot form ID, Pixel ID, etc.]
```

---

## Part 4 — Template Evolution

### 4.1 How the System Gets Better Over Time

The system improves through four feedback loops:

**Loop 1 — Page History Accumulation**

Every page built adds a case study to `page-history.md`. When building the 10th page, Claude Code has 9 reference cases. This makes block selection, copy decisions, and structure choices more informed and faster.

Practically: "The last 3 webinar pages all used this FAQ order and it worked — use the same order."

**Loop 2 — Feedback Integration**

When the user says anything like:
- "This section looks bad" → log in page-history.md as "what to change"
- "This converted well" → log in conversion-learnings.md as confirmed learning
- "Use this as a reference" → add to competitor-insights.md or create a design reference entry

The key: every piece of feedback must be written down somewhere, not just acted on once. Written feedback compounds. Verbal-only feedback evaporates.

**Loop 3 — Analytics Integration**

When analytics are set up (HubSpot submissions, Google Analytics, Facebook Pixel):
1. Monthly: check conversion rates by page
2. Identify top performers and bottom performers
3. Extract structural/copy differences between them
4. Log findings in conversion-learnings.md
5. Update default block order in templates.ts if a new order consistently outperforms

**Loop 4 — Block Library Expansion**

When a page requires something the existing blocks can't express:
1. Build the new block
2. Document it in docs/DESIGN-SYSTEM.md
3. Add it to the image bank schema if it needs specific image types
4. Add its copy patterns to content-patterns.md

Each new block expands the vocabulary of the system.

### 4.2 Template Versioning

When a template's default block order changes based on learnings:

```typescript
// src/lib/templates.ts
export const templateRegistry = {
  'workshop': {
    // v1 (March 2026): benefits before social-proof
    // v2 (May 2026): moved social-proof before benefits based on data
    defaultBlocks: ['hero', 'social-proof', 'benefits', ...]
  }
}
```

Always preserve the version history in a comment. Never silently change defaults.

### 4.3 Design Reference System

When a competitor page or design reference is identified as strong:

1. Create an entry in `reference/` directory with a screenshot and notes
2. Add insights to `competitor-insights.md`
3. If an animation pattern is worth building, add to `docs/DESIGN-SYSTEM.md` animation library

The `reference/` folder already exists in the project — use it systematically.

### 4.4 Feedback Collection Protocol

When the user provides any feedback on a built page, use this structured format to store it:

```markdown
### [Date] Feedback — [Page Name]
Source: user visual review | marketing team | analytics
Type: positive | negative | request
Block/Section: [which part of the page]
Feedback: "[exact words if possible]"
Action taken: [what was changed or logged]
Future implication: [what to do differently on next similar page]
```

This transforms casual "this is ugly" feedback into structured design knowledge.

---

## Part 5 — Dashboard Integration

### 5.1 Knowledge Base Tab in Admin

Add a "Knowledge Base" section to the `/admin` dashboard with:

**Sub-tabs:**
- Brand Guidelines (render `brand-guidelines.md` as formatted HTML)
- Content Patterns (render `content-patterns.md` — Claude's copy reference)
- Page History (render `page-history.md` — timeline view)
- Conversion Learnings (render `conversion-learnings.md` — hypothesis tracker)

**Implementation:** API route reads the markdown files and returns them. Frontend renders with a markdown parser (react-markdown). Read-only in the dashboard — edits are made directly to the files by Claude Code.

### 5.2 Image Bank Tab in Admin

A dedicated tab at `/admin/images`:

- **Grid view** by category (speaker, events, backgrounds, etc.)
- **Upload zone** — drag and drop, auto-detects category from filename prefix
- **Metadata form** — tags, alt text, notes appear after upload
- **Usage info** — each image shows which pages use it
- **Missing images** — list of all `placeholder-*.jpg` references across all page JSONs
- **Orphaned images** — images in filesystem not in registry

### 5.3 Pipeline Status in Admin

A "Build Log" section that shows:
- Last 10 pages built with timestamp and builder (always "Claude Code")
- Status of each page: live, draft, needs images, needs form ID
- Quick links to page JSON, live URL, and edit view

---

## Part 6 — Complete File and Folder Structure

```
ab-landing-system/
│
├── docs/
│   ├── knowledge/                          ← KNOWLEDGE BASE (new)
│   │   ├── brand-guidelines.md
│   │   ├── content-patterns.md
│   │   ├── page-history.md
│   │   ├── competitor-insights.md
│   │   └── conversion-learnings.md
│   ├── SELF-LEARNING-MACHINE.md            ← this document
│   ├── LANDING-FACTORY-PLAN.md             ← existing architecture
│   ├── DESIGN-SYSTEM.md                    ← existing component catalog
│   ├── CONVERSION-PLAYBOOK.md              ← existing CRO playbook
│   └── DASHBOARD-ARCHITECTURE.md          ← existing admin spec
│
├── public/
│   └── images/
│       ├── bank/                           ← IMAGE BANK (new)
│       │   ├── .gitkeep
│       │   ├── speakers/
│       │   ├── events/
│       │   ├── immobiliare/
│       │   ├── trading/
│       │   ├── backgrounds/
│       │   ├── icons/
│       │   ├── logos/
│       │   └── testimonials/
│       ├── missione-immobiliare/           ← existing page images
│       └── placeholder-*.jpg              ← generic placeholders
│
├── src/
│   ├── app/
│   │   ├── [slug]/page.tsx                ← dynamic route
│   │   ├── admin/                         ← admin panel
│   │   ├── missione-immobiliare-v2/       ← hardcoded page
│   │   └── ...
│   ├── components/
│   │   ├── blocks/                        ← 13+ block components
│   │   ├── blocks-library/                ← extended library blocks
│   │   ├── conversion/                    ← overlay components
│   │   └── ui/                            ← primitives
│   ├── content/
│   │   ├── pages/                         ← JSON per every landing
│   │   │   ├── registry.json              ← page index
│   │   │   └── {slug}.json               ← individual pages
│   │   └── images/
│   │       └── bank-registry.json        ← IMAGE INDEX (new)
│   ├── lib/
│   │   ├── BlockRenderer.tsx
│   │   ├── animations.ts
│   │   ├── page-config-schema.json
│   │   ├── page-registry.ts
│   │   └── templates.ts
│   └── types/
│       └── blocks.ts
│
├── reference/                             ← design references (existing)
│   └── scraped-sites/
│
└── scripts/                               ← build/deploy scripts
    └── ...
```

---

## Part 7 — Implementation Plan

Priority is ordered by impact-to-effort ratio.

### Phase 0 — Foundation (Done at document creation)

- [x] Create `/docs/knowledge/` directory with all 5 knowledge files
- [x] Create `/public/images/bank/` with category subdirectories
- [x] Create `/src/content/images/bank-registry.json` with schema
- [x] Write initial content for all knowledge base files based on existing project knowledge
- [x] Log Missione Immobiliare v2 in `page-history.md`

**Output of Phase 0:** The knowledge base is populated and Claude Code can reference it on the next page build.

### Phase 1 — First Real Use (Next Page Build)

When the next page is requested:

- [ ] Follow the Auto-Assembly Pipeline (Part 3) for the first time
- [ ] Test the "context load" step — does reading the knowledge base actually improve output?
- [ ] Update `page-history.md` with the new page entry
- [ ] Identify any gaps in `content-patterns.md` and fill them
- [ ] Note any images that should have been in the bank

**Output of Phase 1:** Validated pipeline. First iteration of the feedback loop.

### Phase 2 — Image Bank Population

When real images become available:

- [ ] Rename all provided images to naming convention
- [ ] Place in correct bank category folders
- [ ] Add entries to `bank-registry.json` (batch operation — Claude Code does this)
- [ ] Update any existing pages that used placeholders for these images
- [ ] Build the admin Image Bank tab (read `bank-registry.json` + filesystem)

**Output of Phase 2:** Zero placeholder images in pages with known assets.

### Phase 3 — Analytics Integration

When tracking is configured:

- [ ] Set Facebook Pixel IDs in all live page JSONs
- [ ] Set HubSpot form IDs in all live page JSONs
- [ ] Configure Google Analytics or GA4
- [ ] Set up Google Tag Manager (one script, all tags via GTM)
- [ ] After 30 days of data: first analytics review
- [ ] Update `conversion-learnings.md` with first real data

**Output of Phase 3:** Conversion data flowing. Hypotheses can be tested.

### Phase 4 — A/B Testing Framework

When Phase 3 has at least 30 days of data:

- [ ] Identify the highest-traffic page for first A/B test
- [ ] Build two versions (A and B variants in JSON)
- [ ] Implement traffic splitting (Vercel Edge Config or simple cookie-based split)
- [ ] Run test for statistical significance (minimum 200 conversions per variant)
- [ ] Log result in `conversion-learnings.md`
- [ ] Apply winning variant as new default

**Output of Phase 4:** First confirmed design learning from real data.

### Phase 5 — Admin Image Bank Tab

Build `/admin/images` tab:

- [ ] API route: `GET /api/admin/images` (reads bank-registry.json + filesystem scan)
- [ ] API route: `POST /api/admin/images/upload` (handles file upload, updates registry)
- [ ] Frontend: grid view with category filter
- [ ] Frontend: upload zone with metadata form
- [ ] Frontend: "missing images" list (scan all page JSONs for placeholders)
- [ ] Frontend: "pages using this image" quick links

**Output of Phase 5:** User can manage the image bank without touching files manually.

### Phase 6 — Knowledge Base Dashboard Tab

Build `/admin/knowledge` tab:

- [ ] API route: `GET /api/admin/knowledge/[file]` (returns markdown as string)
- [ ] Frontend: tab per knowledge file, rendered as formatted HTML
- [ ] Add "last updated" timestamp to each file header
- [ ] Consider: inline editing via CodeMirror (low priority)

**Output of Phase 6:** User can review the knowledge base from the admin panel.

---

## Working Principles for Claude Code

These are the operating rules when using this system:

**1. Read before writing.**
Always read the relevant knowledge base files before starting a new page. The 2 minutes spent reading will save 20 minutes of back-and-forth.

**2. Write decisions down.**
Every non-obvious choice made during a page build gets logged. "I moved the FAQ before the form because the Conversion Playbook recommends it" is worth writing in page-history.md.

**3. Placeholders are debt, not solutions.**
Every placeholder image or empty form ID is a noted debt item. Create a TODO comment in the JSON and note it in the build report to the user.

**4. The knowledge base is the memory.**
The user should not have to repeat themselves. If they said "always use this legal disclaimer", it goes in brand-guidelines.md and never needs to be said again.

**5. New patterns become permanent.**
If a new headline formula, block combination, or copy approach is invented for a specific page and it looks strong, add it to content-patterns.md immediately. Don't wait for data — initial quality judgment is valuable.

**6. Ask only for what cannot be inferred.**
From a PDF, Claude Code can derive: slug, meta tags, block structure, copy, image needs, legal disclaimers. Claude Code cannot know: HubSpot form IDs, Pixel IDs, real images not in the bank. Ask only for these.

**7. The system is only as good as its inputs.**
If the PDF is incomplete, note what's missing and build the best possible page with what's available. Do not stall waiting for perfect inputs.
