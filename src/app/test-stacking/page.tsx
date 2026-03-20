'use client'

import { StackingCards } from '@/components/blocks-library/StackingCards'

const demoCards = [
  {
    title: 'Analisi del Mercato',
    description:
      'Impari a leggere i numeri del mercato immobiliare, identificare le zone ad alto potenziale e valutare ogni opportunita con dati concreti.',
  },
  {
    title: 'Struttura dell\'Operazione',
    description:
      'Dal finanziamento alla negoziazione: costruisci operazioni solide con il metodo step-by-step ABTG, replicabile su ogni deal.',
  },
  {
    title: 'Acquisizione Immobile',
    description:
      'Strategie avanzate per acquistare sotto mercato: aste, saldo e stralcio, trattativa diretta con proprietari motivati.',
  },
  {
    title: 'Ristrutturazione Smart',
    description:
      'Massimizza il valore con interventi mirati. Budget ottimizzato, fornitori selezionati, timeline sotto controllo.',
  },
  {
    title: 'Exit & Profitto',
    description:
      'Vendita rapida o messa a reddito: scegli la strategia di uscita piu redditizia per ogni operazione completata.',
  },
]

export default function TestStackingPage() {
  return (
    <main>
      {/* Intro */}
      <section className="bg-[#1e293b] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-4">
            Test Page
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Stacking Cards
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Scorri verso il basso — le card salgono una alla volta con effetto ventaglio.
          </p>
          <div className="animate-bounce text-[#EF7B11]/60 text-3xl">&#8595;</div>
        </div>
      </section>

      {/* Stacking Cards — Light */}
      <StackingCards
        preTitle="Il Percorso"
        title="5 Step verso la"
        titleHighlight="Liberta Finanziaria"
        subtitle="Un metodo collaudato che ha gia trasformato la vita di migliaia di studenti."
        cards={demoCards}
        bgColor="light"
        id="percorso"
      />

      {/* Spacer */}
      <section className="bg-[#F5F5F7] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e293b] mb-6">
            Sezione Successiva
          </h2>
          <p className="text-lg text-[#67768e] mb-8">
            Se sei arrivato qui, l&apos;animazione stacking funziona correttamente.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#EF7B11]/10 text-[#EF7B11] px-6 py-3 rounded-full font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Stacking Cards OK
          </div>
        </div>
      </section>

      {/* Dark variant */}
      <StackingCards
        preTitle="Come Funziona"
        title="Il Metodo"
        titleHighlight="ABTG"
        cards={demoCards.slice(0, 3)}
        bgColor="dark"
      />

      {/* Final */}
      <section className="bg-white min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-[#67768e] text-lg">Fine test.</p>
      </section>
    </main>
  )
}
