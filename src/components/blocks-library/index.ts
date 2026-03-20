// ────────────────────────────────────────────────────────
// Block Library — ABTG Landing Page Factory
// ────────────────────────────────────────────────────────

export { HeroSplit } from './HeroSplit'
export { HeroCenter } from './HeroCenter'
export { LogoTicker } from './LogoTicker'
export { ChecklistSection } from './ChecklistSection'
export { ComparisonTable } from './ComparisonTable'
export { NumberedPhases } from './NumberedPhases'
export { PillarCards } from './PillarCards'
export { SpeakerCards } from './SpeakerCards'
export { UrgencySection } from './UrgencySection'
export { FormSection } from './FormSection'
export { CTADivider } from './CTADivider'
export { FooterABTG } from './FooterABTG'

// Re-export types
export type { HeroSplitProps, HeroSplitFormField } from './HeroSplit'
export type { HeroCenterProps } from './HeroCenter'
export type { LogoTickerProps } from './LogoTicker'
export type { ChecklistSectionProps, ChecklistItem } from './ChecklistSection'
export type { ComparisonTableProps, ComparisonRow } from './ComparisonTable'
export type { NumberedPhasesProps, Phase } from './NumberedPhases'
export type { PillarCardsProps, PillarCard } from './PillarCards'
export type { SpeakerCardsProps, Speaker } from './SpeakerCards'
export type { UrgencySectionProps } from './UrgencySection'
export type { FormSectionProps, FormField, EventDetail } from './FormSection'
export type { CTADividerProps } from './CTADivider'
export type { FooterABTGProps, FooterLink } from './FooterABTG'

// ────────────────────────────────────────────────────────
// Block Catalog — used by page builder / factory system
// ────────────────────────────────────────────────────────

import { HeroSplit } from './HeroSplit'
import { HeroCenter } from './HeroCenter'
import { LogoTicker } from './LogoTicker'
import { ChecklistSection } from './ChecklistSection'
import { ComparisonTable } from './ComparisonTable'
import { NumberedPhases } from './NumberedPhases'
import { PillarCards } from './PillarCards'
import { SpeakerCards } from './SpeakerCards'
import { UrgencySection } from './UrgencySection'
import { FormSection } from './FormSection'
import { CTADivider } from './CTADivider'
import { FooterABTG } from './FooterABTG'

export type BlockCategory = 'hero' | 'social-proof' | 'content' | 'conversion' | 'layout'

export interface BlockCatalogEntry {
  id: string
  name: string
  category: BlockCategory
  component: React.ComponentType<Record<string, unknown>>
  description: string
  previewProps?: Record<string, unknown>
}

export const BLOCK_CATALOG: BlockCatalogEntry[] = [
  {
    id: 'hero-split',
    name: 'Hero Split',
    category: 'hero',
    component: HeroSplit as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Hero a due colonne: testo e value proposition a sinistra, form di registrazione a destra. Background scuro con immagine opzionale.',
  },
  {
    id: 'hero-center',
    name: 'Hero Centrato',
    category: 'hero',
    component: HeroCenter as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Hero centrato full-width con titolo grande, sottotitolo e CTA primaria. Ideale per landing con immagine di sfondo forte.',
  },
  {
    id: 'logo-ticker',
    name: 'Logo Ticker',
    category: 'social-proof',
    component: LogoTicker as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Barra con scorrimento infinito di loghi media/partner. Aggiunge social proof immediata sotto l\'hero.',
  },
  {
    id: 'checklist-section',
    name: 'Checklist',
    category: 'content',
    component: ChecklistSection as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Griglia di elementi con checkmark (1-4 colonne). Perfetta per elencare benefici, feature o cosa si impara.',
  },
  {
    id: 'comparison-table',
    name: 'Tabella Confronto',
    category: 'content',
    component: ComparisonTable as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Tabella Prima/Dopo con styling rosso/verde. Evidenzia la trasformazione del partecipante.',
  },
  {
    id: 'numbered-phases',
    name: 'Fasi Numerate',
    category: 'content',
    component: NumberedPhases as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Card numerate (1, 2, 3...) con connettore tra le fasi. Ideale per programma evento, step di un percorso.',
  },
  {
    id: 'pillar-cards',
    name: 'Card Pilastri',
    category: 'content',
    component: PillarCards as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Griglia di card con icona, titolo e descrizione. Per feature principali, pilastri del corso, argomenti trattati.',
  },
  {
    id: 'speaker-cards',
    name: 'Card Speaker',
    category: 'content',
    component: SpeakerCards as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Card speaker/coach con foto, nome, ruolo e bullet credenziali. Layout adattivo per 1-3 speaker.',
  },
  {
    id: 'urgency-section',
    name: 'Sezione Urgenza',
    category: 'conversion',
    component: UrgencySection as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Sezione urgenza con sfondo scuro o arancione. Testo forte con icona, bullet e CTA per spingere all\'azione.',
  },
  {
    id: 'form-section',
    name: 'Sezione Form',
    category: 'conversion',
    component: FormSection as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Sezione con dettagli evento a sinistra e form di registrazione a destra. Include box requisiti e bonus badge.',
  },
  {
    id: 'cta-divider',
    name: 'CTA Divider',
    category: 'layout',
    component: CTADivider as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Divisore con CTA singolo tra sezioni. Disponibile in variante arancione, verde o scuro.',
  },
  {
    id: 'footer-abtg',
    name: 'Footer ABTG',
    category: 'layout',
    component: FooterABTG as unknown as React.ComponentType<Record<string, unknown>>,
    description:
      'Footer standard ABTG con logo, link legali, disclaimer e copyright. Sfondo scuro.',
  },
]

/** Lookup a block component by its catalog ID */
export function getBlockById(id: string): BlockCatalogEntry | undefined {
  return BLOCK_CATALOG.find((b) => b.id === id)
}

/** Get all blocks in a specific category */
export function getBlocksByCategory(category: BlockCategory): BlockCatalogEntry[] {
  return BLOCK_CATALOG.filter((b) => b.category === category)
}
