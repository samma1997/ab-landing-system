import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Missione Immobiliare — Workshop Gratuito | ABTG',
  description:
    'Scopri come centinaia di persone comuni stanno realizzando le loro prime operazioni immobiliari sopra i 30.000 euro di profitto nel 2026.',
  openGraph: {
    title: 'Missione Immobiliare — Workshop Gratuito',
    description:
      'Scopri come centinaia di persone comuni stanno realizzando le loro prime operazioni immobiliari sopra i 30.000 euro di profitto nel 2026.',
    type: 'website',
  },
}

export default function MissioneImmobiliareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
