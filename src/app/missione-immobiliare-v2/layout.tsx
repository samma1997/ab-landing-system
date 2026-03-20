import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Missione Immobiliare 2026 — Evento Online Gratuito | ABTG',
  description:
    'Scopri il Metodo Prevendi: 4 serate online gratuite dal 27 al 30 Aprile 2026 con Alfio Bardolla. Impara a investire in immobili riducendo il rischio e massimizzando i profitti.',
  openGraph: {
    title: 'Missione Immobiliare 2026 — Evento Online Gratuito',
    description:
      'Il Metodo Prevendi: vendi prima di comprare. 4 serate online gratuite con Alfio Bardolla e i migliori coach immobiliari italiani.',
    type: 'website',
    locale: 'it_IT',
  },
  robots: { index: true, follow: true },
}

export default function MissioneImmobiliareV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
