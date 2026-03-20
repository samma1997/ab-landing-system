'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  CheckCircle,
  Play,
  Search,
  TrendingUp,
  Handshake,
  ShieldCheck,
  Clock,
  Building2,
  Users,
  ChevronRight,
  X,
  Check,
  Calendar,
  Star,
  Award,
  Target,
  BarChart3,
  Briefcase,
} from 'lucide-react'
import clsx from 'clsx'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS — extracted from ABTG scraped pages
   ═══════════════════════════════════════════════════════════════════════════ */

const COLORS = {
  orange: '#EF7B11',        // top bar, badge backgrounds
  orangeAccent: '#E57713',  // accent text, icon backgrounds
  orangeIcon: '#E57712',    // SVG icon fills
  green: '#31B15C',         // CTA buttons
  greenHover: '#28A052',    // CTA hover
  dark: '#1e293b',          // headings, dark text
  gray: '#67768e',          // body text
  lightBg: '#F5F5F7',      // light section backgrounds
  white: '#FFFFFF',
  deepBlue: '#060097',      // used minimally
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BUTTON — GREEN like the real ABTG pages
   ═══════════════════════════════════════════════════════════════════════════ */

function CTAButton({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <a
      href="#hs-form-missione"
      className={clsx(
        'inline-block rounded-[50px] bg-[#31B15C] px-8 py-[18px] text-center text-lg font-semibold leading-tight text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[#28A052] hover:shadow-xl md:px-10 md:text-xl',
        className
      )}
    >
      {children ?? (
        <>
          SI! VOGLIO ISCRIVERMI AL WORKSHOP
          <br className="hidden sm:block" />
          &ldquo;MISSIONE IMMOBILIARE&rdquo;
        </>
      )}
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════════════════════════════════ */

function Section({
  children,
  bg = 'white',
  className,
  id,
}: {
  children: React.ReactNode
  bg?: 'white' | 'surface' | 'dark' | 'orange'
  className?: string
  id?: string
}) {
  const bgMap = {
    white: 'bg-white',
    surface: 'bg-[#F5F5F7]',
    dark: 'bg-[#1e293b]',
    orange: 'bg-[#EF7B11]',
  }
  return (
    <section
      id={id}
      className={clsx(bgMap[bg], 'py-16 md:py-24', className)}
    >
      <div className="mx-auto max-w-[1250px] px-5 md:px-10">{children}</div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MEDIA LOGOS — "Visto Su" bar
   ═══════════════════════════════════════════════════════════════════════════ */

const mediaLogos = [
  { src: '/images/missione-immobiliare/imgi_12_Rai1.webp', alt: 'Rai 1' },
  { src: '/images/missione-immobiliare/imgi_35_Corriere-della-sera.webp', alt: 'Corriere della Sera' },
  { src: '/images/missione-immobiliare/imgi_15_Sole-24-ore.webp', alt: 'Il Sole 24 Ore' },
  { src: '/images/missione-immobiliare/imgi_37_Huffpost.webp', alt: 'HuffPost' },
  { src: '/images/missione-immobiliare/imgi_17_La7.webp', alt: 'La7' },
  { src: '/images/missione-immobiliare/imgi_19_Gazzetta-dello-sport.webp', alt: 'Gazzetta dello Sport' },
  { src: '/images/missione-immobiliare/imgi_16_GQ.webp', alt: 'GQ' },
  { src: '/images/missione-immobiliare/imgi_13_Messaggero.webp', alt: 'Il Messaggero' },
  { src: '/images/missione-immobiliare/imgi_20_Il-Giornale.webp', alt: 'Il Giornale' },
  { src: '/images/missione-immobiliare/imgi_21_Il-secolo-XIX.webp', alt: 'Il Secolo XIX' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   COMPARISON DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const comparisonRows = [
  {
    before:
      'Cerchi gli immobili giusti a intuizione, sperando di trovare un affare nascosto',
    after:
      'Sai esattamente dove guardare, con criteri precisi di selezione basati su dati reali e zona',
  },
  {
    before: 'Compri e poi speri di vendere',
    after:
      'Vendi prima di comprare grazie al Metodo Prevendi, riducendo quasi a zero il rischio di invenduto',
  },
  {
    before:
      'Il rischio di invenduto ti blocca e ti impedisce di fare il primo passo',
    after:
      'Il Metodo Prevendi riduce al minimo il rischio e ti permette di agire con sicurezza',
  },
  {
    before:
      'Aspetti mesi per trovare un acquirente, con il capitale bloccato e ansia crescente',
    after:
      'Esci dal mercato in tempi medi di 120 giorni, con acquirente già individuato',
  },
  {
    before:
      'Il tuo capitale resta bloccato a lungo, senza generare ritorni prevedibili',
    after:
      'Hai cashflow positivo prima del rogito, con margini calcolati in anticipo',
  },
  {
    before:
      "Fai un'operazione ogni tanto, senza un sistema che generi risultati costanti",
    after:
      'Hai un metodo replicabile che ti permette di creare un flusso continuo di operazioni',
  },
  {
    before:
      "Non sai se stai facendo un affare o stai comprando un problema mascherato",
    after:
      'Calcoli il margine prima di comprare, con analisi di fattibilità dettagliata',
  },
  {
    before:
      'Lavori con agenzie e fornitori ogni volta da zero, perdendo tempo e trattando da sconosciuto',
    after:
      'Costruisci relazioni continuative con una rete di professionisti fidati',
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   PILLARS DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const pillars = [
  {
    icon: Search,
    title: 'Ricerca Strategica',
    desc: "Non cerchi immobili a caso. Impari a identificare le zone con la domanda più alta e l'offerta più bassa, a leggere i segnali del mercato locale e a selezionare solo gli immobili con un margine reale. L'80% del risultato si decide prima dell'acquisto.",
  },
  {
    icon: BarChart3,
    title: 'Pricing Intelligente',
    desc: "Stabilisci il prezzo giusto usando dati comparativi reali, non stime a sensazione. Sai quanto puoi offrire, quanto puoi rivendere e quale margine puoi aspettarti, prima di firmare qualsiasi proposta d'acquisto.",
  },
  {
    icon: Handshake,
    title: 'Negoziazione Privilegiata',
    desc: "Accedi a condizioni che il mercato aperto non offre: sospensive, acconti minimi, tempi tecnici favorevoli. Impari a strutturare proposte che tutelano te e lasciano spazio al profitto, senza forzare il venditore.",
  },
  {
    icon: ShieldCheck,
    title: 'Prevendi',
    desc: "Il cuore del metodo. Prima di acquistare, verifichi che esista già un acquirente disposto a comprare a un prezzo che ti garantisce il margine. È la differenza tra investire con un piano e scommettere alla cieca. È ciò che ha permesso a centinaia di studenti di completare operazioni sopra i 30.000€ di profitto.",
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   SPEAKERS DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const speakers = [
  {
    name: 'Alfio Bardolla',
    role: 'Fondatore di ABTG',
    credentials: [
      'Autore best-seller di finanza personale in Italia',
      'Fondatore di ABTG, unica scuola di educazione finanziaria quotata in Borsa',
      "Oltre 25 anni di esperienza nell'immobiliare e negli investimenti",
    ],
  },
  {
    name: 'Saverio Rodriguez',
    role: 'Imprenditore, fondatore di Vivi Salute',
    credentials: [
      'Imprenditore seriale con oltre 15 anni di esperienza',
      'Fondatore di Vivi Salute e altre aziende di successo',
      'Investitore immobiliare con portafoglio multi-milionario',
    ],
  },
  {
    name: 'Alberto Colombo',
    role: 'Coach ABTG — Stralci e Aste',
    credentials: [
      'Specialista in stralci immobiliari e aste giudiziarie',
      'Coach ABTG con centinaia di studenti formati',
      'Oltre 200 operazioni immobiliari completate',
    ],
  },
  {
    name: 'Avv. Fracassi Stefano',
    role: 'Avvocato immobiliarista',
    credentials: [
      'Avvocato specializzato in diritto immobiliare',
      'Consulente legale per centinaia di operazioni',
      'Esperto in contrattualistica e tutela degli investitori',
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   PHASES DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const phases = [
  {
    num: 1,
    title: 'Non hai ancora iniziato',
    text: "Hai letto libri, seguito corsi, forse anche guardato annunci. Ma non hai ancora fatto la tua prima operazione. Ti manca un metodo chiaro, step-by-step, che ti dica esattamente cosa fare, in quale ordine e con quale livello di rischio. Non è paura: è che nessuno ti ha mai dato un percorso operativo concreto.",
  },
  {
    num: 2,
    title: "Hai fatto qualche operazione, ma non riesci a renderla un'attività",
    text: "Hai comprato e rivenduto qualcosa. Forse ci hai guadagnato, forse no. Ma non hai un sistema. Ogni operazione sembra ripartire da zero. Non hai un flusso prevedibile di deal, non hai una rete di contatti consolidata e il tempo che investi non è proporzionato ai risultati.",
  },
  {
    num: 3,
    title: 'Stai ottenendo risultati, ma vuoi scalare',
    text: "Sai come funziona il mercato, hai fatto operazioni con profitto. Ma senti che stai lasciando soldi sul tavolo. Vuoi capire come aumentare il volume, come delegare alcune fasi, come usare leva finanziaria e strumenti avanzati per moltiplicare i risultati senza moltiplicare il tempo.",
  },
]

/* ═══════════════════════════════════════════════════════════════════════════
   ORANGE ICON SVG COMPONENT (matches ABTG icon style)
   ═══════════════════════════════════════════════════════════════════════════ */

function OrangeIconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[5px] bg-[#E57712]">
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function MissioneImmobiliarePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  /* ── GSAP animations ────────────────────────────────────────────────── */
  useGSAP(
    () => {
      // Fade-up for all sections
      gsap.utils.toArray<HTMLElement>('.gs-fade-up').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Stagger for cards
      gsap.utils.toArray<HTMLElement>('.gs-stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.gs-stagger-child')
        if (!children.length) return
        gsap.from(children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Comparison table rows
      const tableRows = gsap.utils.toArray<HTMLElement>('.gs-table-row')
      if (tableRows.length) {
        gsap.from(tableRows, {
          x: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tableRows[0],
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      }

      // Counter animation
      gsap.utils.toArray<HTMLElement>('.gs-counter').forEach((el) => {
        const target = parseInt(el.dataset.target || '0', 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString('it-IT')
          },
        })
      })
    },
    { scope: containerRef }
  )

  /* ═══════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════ */

  return (
    <div ref={containerRef} className="font-['Inter',sans-serif]">
      {/* ── 1. TOP BAR — ORANGE like ABTG pages ──────────────────────────── */}
      <div className="bg-[#EF7B11] py-2.5 text-center text-sm font-bold uppercase tracking-wide text-white md:text-base">
        <div className="mx-auto max-w-[1250px] px-5 md:px-10">
          <span className="hidden sm:inline">
            Evento online <strong>GRATUITO</strong> di 4 serate LIVE per chi
            intende investire almeno 20.000&nbsp;&euro; nell&apos;immobiliare
            &mdash;{' '}
          </span>
          <strong>27-30 Aprile ore 21</strong>
        </div>
      </div>

      {/* ── 2. LOGO BAR — light gray like ABTG ───────────────────────────── */}
      <div className="bg-[#F5F5F7] py-4 text-center">
        <Image
          src="/images/missione-immobiliare/logo-abtg-color.webp"
          alt="Alfio Bardolla Training Group"
          width={280}
          height={50}
          className="mx-auto h-auto w-[200px] md:w-[280px]"
          priority
        />
      </div>

      {/* ── 3. HERO SECTION — dark bg with overlay like ABTG pages ─────── */}
      <section className="relative overflow-hidden bg-[#1e293b]">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/missione-immobiliare/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b]/80 via-[#1e293b]/60 to-[#1e293b]/90" />
        </div>

        <div className="relative mx-auto max-w-[1250px] px-5 py-16 md:px-10 md:py-24">
          {/* Trustpilot-style rating */}
          <div className="gs-fade-up mb-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold text-white">Eccezionale</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex h-[25px] w-[25px] items-center justify-center bg-[#00B67A]">
                  <Star className="h-3.5 w-3.5 fill-white text-white" />
                </div>
              ))}
            </div>
            <span className="text-xs text-white/70">
              Valutata 4.8 su 5 sulla base di 1400 recensioni su Trustpilot
            </span>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <p className="gs-fade-up text-base leading-relaxed text-white/80 md:text-lg">
              Scopri come centinaia di persone comuni stanno realizzando le loro
              prime operazioni immobiliari sopra i{' '}
              <strong className="text-white">
                30.000&nbsp;&euro; di profitto
              </strong>{' '}
              nel 2026 &mdash; anche se non l&apos;hai mai fatto o non &egrave;
              andata bene in passato:
            </p>

            {/* Title with orange badge */}
            <h1 className="gs-fade-up mt-8">
              <span className="inline-block rounded-md bg-[#EF7B11] px-3 py-1.5 font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                MISSIONE IMMOBILIARE
              </span>
            </h1>

            <p className="gs-fade-up mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
              Il metodo operativo che ti permette di fare operazioni
              immobiliari con profitto &mdash; anche partendo da zero &mdash;
              grazie al sistema &ldquo;Prevendi&rdquo; che riduce al minimo
              il rischio di invenduto
            </p>

            {/* Checkmarks */}
            <div className="gs-stagger-parent mt-10 space-y-4 text-left md:mx-auto md:max-w-2xl">
              {[
                'Dal 2017 unica scuola di educazione finanziaria quotata in Borsa in Italia',
                'Oltre 1.200 operazioni immobiliari documentate da studenti e clienti',
                "Metodo proprietario 'Prevendi' per ridurre al minimo il rischio di immobili invenduti",
                'Durata media delle operazioni: 120 giorni',
              ].map((text) => (
                <div
                  key={text}
                  className="gs-stagger-child flex items-start gap-3"
                >
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-[#31B15C]" />
                  <span className="text-base text-white/90 md:text-lg">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="gs-fade-up mt-10">
              <CTAButton />
              <p className="mt-4 text-sm text-white/60">
                (Partecipa da casa dal 27 al 30 Aprile)
              </p>
            </div>

            {/* Disclaimer */}
            <p className="gs-fade-up mt-6 text-xs italic text-white/50">
              I risultati degli studenti dipendono da molteplici fattori
              individuali e non sono garantiti. I casi presentati sono
              documentati, ma non rappresentano una promessa di guadagno.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. MEDIA LOGOS BAR — "Visto Su" carousel ──────────────────────── */}
      <div className="bg-white py-6 md:py-8">
        <div className="mx-auto max-w-[1250px] overflow-hidden px-5 md:px-10">
          <div className="flex items-center justify-center gap-8 overflow-x-auto md:gap-12">
            {mediaLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-[30px] w-auto shrink-0 object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:h-[40px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. RESULTS / TESTIMONIALS ─────────────────────────────────────── */}
      <Section bg="surface">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="gs-fade-up font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            I risultati nell&apos;immobiliare degli studenti di{' '}
            <span className="text-[#E57713]">Alfio Bardolla Training Group</span>
          </h2>

          <p className="gs-fade-up mt-4 text-lg text-[#67768e]">
            Operazioni reali, risultati documentati. Guarda le testimonianze di
            chi ha applicato il metodo.
          </p>

          {/* Stats */}
          <div className="gs-stagger-parent mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: 1200, suffix: '+', label: 'Operazioni documentate' },
              { value: 30000, suffix: '€+', label: 'Profitto medio per operazione' },
              { value: 120, suffix: ' gg', label: 'Durata media operazione' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="gs-stagger-child rounded-2xl bg-white p-8 shadow-sm"
              >
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-extrabold text-[#E57713]">
                  <span
                    className="gs-counter counter-value"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm font-medium text-[#67768e]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Video testimonials grid */}
          <div className="gs-stagger-parent mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { img: '/images/missione-immobiliare/coach-1.jpg', label: 'Testimonianza studente #1' },
              { img: '/images/missione-immobiliare/coach-2.jpg', label: 'Testimonianza studente #2' },
              { img: '/images/missione-immobiliare/coach-3.png', label: 'Testimonianza studente #3' },
            ].map((item, i) => (
              <div
                key={i}
                className="gs-stagger-child group relative aspect-video overflow-hidden rounded-2xl bg-[#1e293b]/10"
              >
                <Image
                  src={item.img}
                  alt={item.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EF7B11] text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="ml-1 h-7 w-7" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-semibold text-white">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="gs-fade-up mt-12">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 6. "PER CHI E'" — icon list like ABTG ─────────────────────────── */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            <span className="text-[#E57713]">Per chi &egrave;</span> Missione Immobiliare
          </h2>

          <p className="gs-fade-up mt-4 text-center text-lg text-[#67768e]">
            Questo evento &egrave; pensato per te se:
          </p>

          <div className="gs-stagger-parent mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                icon: <Search className="h-5 w-5 text-white" />,
                text: 'Vuoi iniziare a investire nell\'immobiliare ma non sai da dove partire, e hai bisogno di un metodo chiaro',
              },
              {
                icon: <TrendingUp className="h-5 w-5 text-white" />,
                text: 'Hai già fatto qualche operazione ma senza un sistema replicabile e vuoi risultati costanti',
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-white" />,
                text: 'Vuoi ridurre il rischio di invenduto e avere la sicurezza di un metodo collaudato prima di comprare',
              },
              {
                icon: <Building2 className="h-5 w-5 text-white" />,
                text: 'Cerchi un modo per costruire un\'attività immobiliare che generi cashflow prevedibile',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="gs-stagger-child flex items-start gap-4 rounded-xl border border-[#e5e7eb] bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <OrangeIconBox>{item.icon}</OrangeIconBox>
                <span className="text-base leading-relaxed text-[#1e293b]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 7. COMPARISON TABLE ───────────────────────────────────────────── */}
      <Section bg="surface">
        <div className="mx-auto max-w-5xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            <span className="text-[#E57713]">Prima vs Dopo</span> Missione Immobiliare
          </h2>

          <p className="gs-fade-up mt-4 text-center text-lg text-[#67768e]">
            Ecco cosa cambia quando hai un metodo collaudato
          </p>

          {/* Table header */}
          <div className="gs-fade-up mt-12 hidden grid-cols-2 gap-4 md:grid">
            <div className="rounded-t-xl bg-[#fef2f2] px-6 py-3 text-center font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#dc2626]">
              Prima di Missione Immobiliare
            </div>
            <div className="rounded-t-xl bg-[#f0fdf4] px-6 py-3 text-center font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#31B15C]">
              Dopo Missione Immobiliare
            </div>
          </div>

          {/* Table rows */}
          <div className="mt-4 space-y-3 md:mt-0 md:space-y-0">
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className="gs-table-row grid grid-cols-1 gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4 md:grid-cols-2 md:gap-4 md:rounded-none md:border-x md:border-b md:border-t-0 md:p-0"
              >
                {/* Before */}
                <div className="flex items-start gap-3 rounded-lg bg-[#fef2f2] p-4 md:rounded-none md:px-6 md:py-5">
                  <X className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
                  <span className="text-sm text-[#1e293b] md:text-base">
                    {row.before}
                  </span>
                </div>
                {/* After */}
                <div className="flex items-start gap-3 rounded-lg bg-[#f0fdf4] p-4 md:rounded-none md:px-6 md:py-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#31B15C]" />
                  <span className="text-sm text-[#1e293b] md:text-base">
                    {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 8. "IN QUALE FASE TI TROVI?" ──────────────────────────────────── */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            In quale di queste <span className="text-[#E57713]">3 fasi</span> del tuo percorso immobiliare ti trovi?
          </h2>

          <div className="gs-stagger-parent mt-12 space-y-8">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E57712]">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-white">
                      {phase.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-[#67768e]">
                      {phase.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="gs-fade-up mt-12 rounded-2xl border-l-4 border-[#EF7B11] bg-[#F5F5F7] p-6 md:p-8">
            <p className="text-lg leading-relaxed text-[#1e293b]">
              <strong>Il problema non &egrave;</strong> la tua fase di
              partenza. Il problema &egrave; non avere un metodo che ti guidi
              dalla fase in cui sei fino alla prossima operazione con profitto.
              La maggior parte dei corsi ti d&agrave; teoria. Noi ti diamo{' '}
              <strong>un sistema operativo</strong>.
            </p>
            <p className="mt-4 text-lg font-semibold text-[#E57713]">
              Missione Immobiliare &egrave; stato costruito per colmare
              esattamente questo vuoto.
            </p>
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 9. 4 PILLARS — METODO PREVENDI ────────────────────────────────── */}
      <Section bg="surface">
        <div className="mx-auto max-w-5xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            <span className="text-[#E57713]">Cosa ti pu&ograve; offrire</span> Missione Immobiliare
          </h2>

          <p className="gs-fade-up mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-[#67768e]">
            La maggior parte delle persone segue la sequenza sbagliata:
            compra un immobile, lo ristruttura, lo mette in vendita e{' '}
            <em>spera</em> che qualcuno lo compri. Il Metodo Prevendi ribalta
            questa logica. Ecco i 4 pilastri:
          </p>

          <div className="gs-stagger-parent mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
                >
                  <OrangeIconBox>
                    <Icon className="h-5 w-5 text-white" />
                  </OrangeIconBox>
                  <h3 className="mt-4 font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[#67768e]">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 10. SPEAKERS ──────────────────────────────────────────────────── */}
      <Section bg="white">
        <div className="mx-auto max-w-5xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            I <span className="text-[#E57713]">Coach</span> che ti guideranno durante Missione Immobiliare
          </h2>

          <div className="gs-stagger-parent mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {speakers.map((speaker, i) => (
              <div
                key={i}
                className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex items-center gap-4">
                  {/* Photo placeholder */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E57712]/10">
                    <Users className="h-8 w-8 text-[#E57712]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                      {speaker.name}
                    </h3>
                    <p className="text-sm font-medium text-[#E57713]">
                      {speaker.role}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {speaker.credentials.map((cred, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#31B15C]" />
                      <span className="text-sm text-[#67768e]">{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 11. "FINESTRA 2026" ───────────────────────────────────────────── */}
      <Section bg="surface">
        <div className="mx-auto max-w-4xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            Perch&eacute; il <span className="text-[#E57713]">2026</span> &egrave; una finestra che si apre raramente,
            e si chiude in fretta
          </h2>

          <div className="gs-fade-up mt-8 space-y-6 text-lg leading-relaxed text-[#67768e]">
            <p>
              I cicli immobiliari durano in media 7-10 anni. Chi entra nella
              fase giusta moltiplica i risultati. Chi aspetta troppo si ritrova
              a comprare caro e vendere a sconto.
            </p>
            <p>
              Nel 2026 si stanno allineando diversi fattori:{' '}
              <strong className="text-[#1e293b]">
                i tassi di interesse stanno scendendo
              </strong>
              , la domanda di immobili residenziali &egrave; in crescita, e
              molti proprietari hanno bisogno di liquidit&agrave;. Questo crea
              un ambiente ideale per chi sa individuare le opportunit&agrave;
              giuste.
            </p>
            <p>
              Ma questa finestra non rester&agrave; aperta per sempre. Man
              mano che i prezzi salgono e la competizione aumenta, i margini si
              riducono. Chi agisce adesso ha un vantaggio concreto rispetto a
              chi aspetter&agrave; ancora.
            </p>
          </div>

          <div className="gs-stagger-parent mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: TrendingUp,
                label: 'Tassi in discesa',
                sub: 'Mutui pi\u00f9 accessibili',
              },
              {
                icon: Building2,
                label: 'Domanda in crescita',
                sub: 'Mercato residenziale attivo',
              },
              {
                icon: Clock,
                label: 'Finestra limitata',
                sub: 'I margini si riducono nel tempo',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 text-center shadow-sm"
                >
                  <OrangeIconBox>
                    <Icon className="h-5 w-5 text-white" />
                  </OrangeIconBox>
                  <p className="mt-3 font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#1e293b]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-[#67768e]">{item.sub}</p>
                </div>
              )
            })}
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 12. BONUS SECTION ─────────────────────────────────────────────── */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl">
          <h2 className="gs-fade-up text-center font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            Ecco i <span className="text-[#E57713]">BONUS</span> che ricevi partecipando:
          </h2>

          <div className="gs-stagger-parent mt-10 space-y-6">
            <div className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                <span className="text-[#E57713]">BONUS #1</span>: Videoguida &ldquo;La tua prima operazione da 30k&rdquo;
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#67768e]">
                Una videoguida pratica che ti mostra passo dopo passo come
                impostare la tua prima operazione immobiliare con il Metodo
                Prevendi. Dalla ricerca dell&apos;immobile alla vendita.
              </p>
            </div>

            <div className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                <span className="text-[#E57713]">BONUS #2</span>: Accesso alla community esclusiva
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#67768e]">
                Entra nel gruppo riservato ai partecipanti di Missione Immobiliare.
                Confrontati con altri investitori, condividi esperienze e ricevi
                supporto durante il tuo percorso.
              </p>
            </div>

            <div className="gs-stagger-child rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#1e293b]">
                <span className="text-[#E57713]">BONUS #3</span>: Checklist operativa completa
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#67768e]">
                La checklist che i nostri coach usano per ogni operazione:
                dalla due diligence alla chiusura del rogito. Uno strumento
                pratico che puoi usare subito.
              </p>
            </div>
          </div>

          <div className="gs-fade-up mt-12 text-center">
            <CTAButton />
          </div>
        </div>
      </Section>

      {/* ── 13. CONSULENZA PERSONALIZZATA ──────────────────────────────────── */}
      <Section bg="surface">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="gs-fade-up font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#1e293b] md:text-4xl">
            Vuoi scoprire se questo percorso fa per te, e ottenere una
            valutazione personalizzata{' '}
            <span className="text-[#E57713]">basata sulla tua situazione attuale</span>?
          </h2>

          <p className="gs-fade-up mt-6 text-lg leading-relaxed text-[#67768e]">
            Compila il form qui sotto per iscriverti gratuitamente a Missione
            Immobiliare. Dopo l&apos;iscrizione, un nostro consulente ti
            contatter&agrave; per capire la tua situazione e consigliarti il
            percorso migliore.
          </p>

          <div className="gs-fade-up mt-8">
            <CTAButton>
              RICHIEDI MAGGIORI INFORMAZIONI
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* ── 14. COME FUNZIONA + FORM ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#1e293b] py-16 md:py-24" id="hs-form-missione">
        <div className="absolute inset-0">
          <Image
            src="/images/missione-immobiliare/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 text-center text-white md:px-10">
          <h2 className="gs-fade-up font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold md:text-4xl">
            Come funziona e come accedere a Missione Immobiliare
          </h2>

          <p className="gs-fade-up mt-6 text-lg leading-relaxed text-white/80">
            Missione Immobiliare &egrave; un evento online gratuito di{' '}
            <strong className="text-white">4 serate LIVE</strong>, dove ti
            mostriamo passo dopo passo come funziona il Metodo Prevendi e come
            puoi applicarlo alla tua prossima operazione immobiliare.
          </p>

          <p className="gs-fade-up mt-4 text-lg leading-relaxed text-white/80">
            Ogni serata dura circa 90 minuti, con contenuti pratici,
            casi studio reali e sessioni di Q&amp;A con gli esperti.
          </p>

          {/* Event details */}
          <div className="gs-fade-up mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3">
              <Calendar className="h-5 w-5 text-[#EF7B11]" />
              <span className="text-base font-semibold">
                27, 28, 29 e 30 Aprile
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-3">
              <Clock className="h-5 w-5 text-[#EF7B11]" />
              <span className="text-base font-semibold">Ore 21:00</span>
            </div>
          </div>

          {/* Requisito */}
          <div className="gs-fade-up mt-8 rounded-2xl border border-[#EF7B11]/30 bg-white/10 p-6 text-left backdrop-blur-sm">
            <p className="text-base leading-relaxed text-white/90">
              <strong className="text-[#EF7B11]">REQUISITO:</strong> Missione
              Immobiliare &egrave; pensato per chi intende investire almeno{' '}
              <strong>20.000&nbsp;&euro;</strong> nell&apos;immobiliare nei
              prossimi 12 mesi. Se stai cercando un modo per iniziare o
              migliorare le tue operazioni immobiliari con un metodo
              collaudato, questo workshop &egrave; per te.
            </p>
          </div>

          {/* HubSpot Form Placeholder */}
          <div className="gs-fade-up mt-12 rounded-2xl bg-white p-6 shadow-2xl md:p-10">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#1e293b]">
              Iscriviti gratuitamente
            </h3>
            <p className="mt-2 text-sm text-[#67768e]">
              Compila il form per riservare il tuo posto
            </p>

            {/* Mock form fields */}
            <div className="mt-6 space-y-4 text-left">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e293b]">
                  Nome *
                </label>
                <input
                  type="text"
                  placeholder="Il tuo nome"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base text-[#1e293b] outline-none transition-colors focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e293b]">
                  Cognome *
                </label>
                <input
                  type="text"
                  placeholder="Il tuo cognome"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base text-[#1e293b] outline-none transition-colors focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e293b]">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="La tua email"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base text-[#1e293b] outline-none transition-colors focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e293b]">
                  Telefono *
                </label>
                <input
                  type="tel"
                  placeholder="Il tuo numero di telefono"
                  className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-base text-[#1e293b] outline-none transition-colors focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20"
                />
              </div>
              <CTAButton className="!mt-6 w-full">
                ISCRIVIMI A MISSIONE IMMOBILIARE
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── 15. FOOTER ────────────────────────────────────────────────────── */}
      <footer className="bg-[#1e293b] py-12 text-white/70">
        <div className="mx-auto max-w-[1250px] px-5 md:px-10">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/images/missione-immobiliare/logo-abtg-color.webp"
              alt="Alfio Bardolla Training Group"
              width={200}
              height={36}
              className="mx-auto h-auto w-[180px] brightness-0 invert"
            />
          </div>

          <div className="mt-8 text-center text-sm leading-relaxed">
            <p className="font-semibold text-white">
              Alfio Bardolla Training Group S.p.A.
            </p>
            <p className="mt-1">
              Via Giovanni Giolitti 1, 20123 Milano (MI) &mdash; P.IVA
              09565880969
            </p>
            <p className="mt-1">
              Societ&agrave; quotata su Euronext Growth Milan (ticker: ABTG)
            </p>
          </div>

          <hr className="my-8 border-white/10" />

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs md:gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Cookie Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Termini e Condizioni
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Contatti
            </a>
          </div>

          <hr className="my-8 border-white/10" />

          {/* Disclaimers */}
          <div className="space-y-4 text-center text-xs leading-relaxed text-white/50">
            <p>
              <strong>Disclaimer Facebook:</strong> Questo sito non fa parte di
              Facebook o Facebook Inc. Inoltre, questo sito NON &egrave;
              approvato da Facebook in alcun modo. FACEBOOK &egrave; un marchio
              registrato di FACEBOOK Inc.
            </p>
            <p>
              <strong>Disclaimer sui risultati:</strong> I risultati
              individuali possono variare. I casi studio e le testimonianze
              presentate in questa pagina non rappresentano una garanzia di
              risultati futuri. Ogni investimento immobiliare comporta dei
              rischi. Ti consigliamo di consultare un consulente finanziario
              prima di prendere qualsiasi decisione di investimento.
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} Alfio Bardolla Training Group
            S.p.A. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </div>
  )
}
