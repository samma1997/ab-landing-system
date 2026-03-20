'use client'

import { HorizontalScrollCards } from '@/components/blocks-library/HorizontalScrollCards'

const sampleCards = [
  {
    title: 'Track Record Verificato',
    description:
      'Dal 2017 i nostri studenti hanno completato oltre 1.200 operazioni immobiliari documentate, con risultati misurabili e replicabili grazie al metodo ABTG.',
    stat: '1.200+',
    statLabel: 'Operazioni documentate',
  },
  {
    title: 'Marco R. — Studente ABTG',
    description:
      'Il metodo mi ha permesso di lasciare il mio lavoro in azienda e dedicarmi full-time agli investimenti immobiliari. In 18 mesi ho chiuso 4 operazioni.',
    quote:
      'Prima di ABTG pensavo che investire nel mattone fosse solo per chi aveva milioni. Oggi vivo di rendita immobiliare.',
    author: 'Marco R.',
    authorRole: 'Ex manager, oggi investitore full-time',
  },
  {
    title: 'Rendimento Medio per Operazione',
    description:
      'Per operazione immobiliare completata seguendo il nostro protocollo step-by-step. Il risultato medio dei nostri studenti attivi supera le aspettative del mercato tradizionale.',
    stat: '30.000€+',
    statLabel: 'Profitto medio',
  },
  {
    title: 'Giulia T. — Studentessa ABTG',
    description:
      'Partita da zero, senza esperienza nel settore. Il percorso ABTG mi ha dato gli strumenti e la sicurezza per fare la mia prima operazione.',
    quote:
      'Non avevo mai investito in vita mia. Dopo il corso ho chiuso la mia prima operazione in 90 giorni con un profitto netto di 22.000 euro.',
    author: 'Giulia T.',
    authorRole: 'Imprenditrice digitale e investitrice',
  },
  {
    title: 'Tempo Medio di Chiusura',
    description:
      'Durata media di un\'operazione immobiliare dall\'acquisizione alla vendita. Il nostro metodo accelera ogni fase grazie a template, checklist e supporto dedicato.',
    stat: '120',
    statLabel: 'Giorni',
  },
]

export default function TestHorizontalPage() {
  return (
    <main>
      {/* Content ABOVE — to test scroll into the pinned section */}
      <section className="bg-[#0f1923] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <p className="text-[#EF7B11] font-semibold text-sm uppercase tracking-wider mb-4">
            Test Page
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 font-[var(--font-plus-jakarta)]">
            Horizontal Scroll Cards
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Scorri verso il basso per vedere l&apos;effetto di scroll orizzontale con pin.
            Le card scorrono orizzontalmente mentre la sezione resta fissa.
          </p>
          <div className="animate-bounce text-white/40 text-3xl">
            &#8595;
          </div>
        </div>
      </section>

      {/* The horizontal scroll cards block */}
      <HorizontalScrollCards
        title="I Numeri Parlano"
        titleHighlight="Chiaro."
        subtitle="Risultati concreti dai nostri studenti e dal metodo ABTG applicato sul campo."
        cards={sampleCards}
        bgColor="dark"
        cardWidth="420px"
        gap={36}
        id="risultati"
      />

      {/* Content BELOW — to test unpin and continue scrolling */}
      <section className="bg-[#0f1923] min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 font-[var(--font-plus-jakarta)]">
            Sezione Successiva
          </h2>
          <p className="text-lg text-white/60 mb-8">
            Se sei arrivato qui, il pin/unpin funziona correttamente.
            La sezione sopra si sblocca dopo che tutte le card sono state visualizzate.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 text-[#22c55e] px-6 py-3 rounded-full font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pin/Unpin funzionante
          </div>
        </div>
      </section>

      {/* Light mode test */}
      <HorizontalScrollCards
        title="Anche in Light Mode"
        subtitle="Il componente supporta sia tema scuro che chiaro."
        cards={[
          {
            title: 'Supporto Completo',
            description: 'Ogni studente ha accesso a coaching personalizzato, community dedicata e materiali aggiornati.',
            stat: '24/7',
            statLabel: 'Supporto attivo',
          },
          {
            title: 'Network Esclusivo',
            description: 'Accedi a una rete di investitori, agenti e professionisti del settore immobiliare.',
            stat: '5.000+',
            statLabel: 'Membri della community',
          },
          {
            title: 'Garanzia Risultati',
            description: 'Il nostro metodo e strutturato per portare risultati concreti entro i primi 6 mesi di applicazione.',
            stat: '97%',
            statLabel: 'Tasso di soddisfazione',
          },
        ]}
        bgColor="light"
        cardWidth="400px"
        gap={28}
      />

      {/* Final spacer */}
      <section className="bg-white min-h-[50vh] flex items-center justify-center px-4">
        <p className="text-[#67768e] text-lg">Fine della pagina di test.</p>
      </section>
    </main>
  )
}
