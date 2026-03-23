'use client'

import { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Search,
  BarChart3,
  Handshake,
  ShieldCheck,
  Check,
  X,
  Calendar,
  Mail,
  Phone,
  User,
  Building2,
  Target,
  TrendingUp,
  Clock,
  Users,
  Award,
  Star,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'
import clsx from 'clsx'
import { StackingCards } from '@/components/blocks-library/StackingCards'

gsap.registerPlugin(ScrollTrigger)

const BASE_PATH = '/ab-landing-system'
function img(path: string) { return `${BASE_PATH}${path}` }

/* ═══════════════════════════════════════════════════════════════════════════════
   CONSTANTS — exact from scraped ABTG pages
   ═══════════════════════════════════════════════════════════════════════════════ */

const MEDIA_LOGOS = [
  { src: img('/images/missione-immobiliare/imgi_12_Rai1.webp'), alt: 'Rai 1' },
  { src: img('/images/missione-immobiliare/imgi_35_Corriere-della-sera.webp'), alt: 'Corriere della Sera' },
  { src: img('/images/missione-immobiliare/imgi_15_Sole-24-ore.webp'), alt: 'Il Sole 24 Ore' },
  { src: img('/images/missione-immobiliare/imgi_37_Huffpost.webp'), alt: 'HuffPost' },
  { src: img('/images/missione-immobiliare/imgi_17_La7.webp'), alt: 'La7' },
  { src: img('/images/missione-immobiliare/imgi_16_GQ.webp'), alt: 'GQ' },
  { src: img('/images/missione-immobiliare/imgi_13_Messaggero.webp'), alt: 'Il Messaggero' },
  { src: img('/images/missione-immobiliare/imgi_19_Gazzetta-dello-sport.webp'), alt: 'Gazzetta dello Sport' },
  { src: img('/images/missione-immobiliare/imgi_20_Il-Giornale.webp'), alt: 'Il Giornale' },
  { src: img('/images/missione-immobiliare/imgi_21_Il-secolo-XIX.webp'), alt: 'Il Secolo XIX' },
]

const CHECKMARKS = [
  'Dal 2017 unica scuola di educazione finanziaria quotata in Borsa in Italia',
  'Oltre 12.000 operazioni immobiliari documentate da studenti e clienti',
  'Metodo proprietario per ridurre al minimo il rischio di immobili invenduti',
]

const BEFORE_AFTER = [
  { before: 'Cerchi gli immobili giusti a intuizione, sperando di trovare qualcosa di buono', after: 'Sai esattamente dove guardare — zona, prezzo, tempistica — prima ancora di fare un\'offerta' },
  { before: 'Compri e poi speri di vendere', after: 'Compri ad almeno il 30% di sconto e sei sicuro di aver fatto un affare' },
  { before: 'Il rischio di invenduto ti blocca o ti tiene sveglio la notte', after: 'Il Metodo che vedrai al workshop riduce al minimo il rischio di invenduto sin dalla prima operazione' },
  { before: 'Aspetti mesi per trovare un acquirente al prezzo che vuoi', after: 'Esci dal mercato in tempi medi sotto i 6 mesi perche il prezzo e calcolato per vendere veloce' },
  { before: 'Fai un\'operazione ogni tanto, quando "capita l\'occasione giusta"', after: 'Hai un metodo replicabile: ogni operazione finanzia la prossima' },
  { before: 'Non sai se stai facendo un affare o un errore finche non e troppo tardi', after: 'Calcoli il margine prima di comprare, non dopo aver venduto' },
  { before: 'Lavori con agenzie e fornitori ogni volta da zero, senza potere negoziale', after: 'Costruisci relazioni continuative che valgono centinaia di migliaia di euro di risparmio nel tempo' },
]

const PHASES = [
  {
    num: '01',
    title: 'Fase Esplorativa',
    subtitle: 'Stai valutando se l\'immobiliare fa per te',
    desc: 'Hai almeno 20.000 euro da destinare a investimenti, e l\'idea di lasciarli fermi su un conto che perde potere d\'acquisto ogni anno ti disturba. L\'immobiliare ti ispira, ma non sai da dove cominciare senza rischiare di sbagliare la prima mossa.',
  },
  {
    num: '02',
    title: 'Fase Operativa Iniziale',
    subtitle: 'Hai fatto 1-2 operazioni ma senza un metodo',
    desc: 'Hai gia fatto qualcosa. Hai preso un appartamento, l\'hai ristrutturato, l\'hai messo sul mercato. E alla fine, dopo mesi di lavoro, i conti non tornano. Hai guadagnato meno di quanto ti aspettavi, o hai perso. E non hai capito esattamente dove hai sbagliato.',
  },
  {
    num: '03',
    title: 'Fase di Scaling',
    subtitle: 'Vuoi trasformare l\'immobiliare nel tuo business',
    desc: 'Hai sentito parlare di flipping immobiliare e cessioni di compromesso. Sembrano cose per chi ha gia esperienza, una rete di contatti, capitali importanti. Non per te, non ancora.',
  },
]

const PILLARS = [
  {
    icon: Search,
    title: 'Ricerca Strategica',
    desc: 'Si parte dall\'analisi del territorio, non dall\'immobile. Densita di popolazione, presenza di infrastrutture, previsione di sviluppo futuro: il software ABTG identifica le zone ad alto potenziale prima che diventino competitive. Non si compra dove si vuole vivere. Si compra dove i numeri indicano che conviene.',
  },
  {
    icon: BarChart3,
    title: 'Pricing Intelligente',
    desc: 'Il mercato premia chi vende in fretta, non chi aspetta il prezzo massimo. Uscire a 3.800 \u20AC/mq invece di aspettare chi paga 4.000 significa incassare mesi prima e reinvestire quel capitale in un\'altra operazione. La velocita di rotazione del capitale e il vero indicatore di un\'operazione ben costruita.',
  },
  {
    icon: Handshake,
    title: 'Negoziazione Privilegiata',
    desc: 'Chi negozia bene ottiene le chiavi prima del rogito. Questo ti permette di incassare subito, e costruire relazioni continuative con i fornitori che, nel tempo, valgono riduzioni di costo nell\'ordine delle centinaia di migliaia di euro per singola operazione.',
  },
  {
    icon: ShieldCheck,
    title: 'Prevendi',
    desc: 'Vendere quando l\'immobile e finito e da dilettanti. Vendere quando esiste ancora solo su carta, con rendering, virtual reality e accordi con le agenzie attivati dal giorno zero, significa arrivare al rogito con l\'immobile gia venduto. Sold out prima di aver pagato. Rischio di invenduto ridotto al minimo. Cash flow positivo sin dall\'inizio.',
  },
]

const SPEAKERS = [
  {
    name: 'Alfio Bardolla',
    role: 'Fondatore di Alfio Bardolla Training Group',
    img: '',
    initials: 'AB',
    bio: [
      'Fondatore di ABTG (Alfio Bardolla Training Group), la piu grande scuola di educazione finanziaria in Europa (quotata in Borsa), con decine di migliaia di studenti formati in quasi 20 anni di attivita',
      'Autore di 9 bestseller internazionali tradotti in multiple lingue, tra cui "I Soldi Fanno la Felicita" e "Il Metodo per Raggiungere la Liberta Finanziaria", venduti in centinaia di migliaia di copie',
      'Imprenditore seriale di successo con un patrimonio costruito attraverso investimenti immobiliari, trading e business',
    ],
  },
  {
    name: 'Saverio Rodriguez',
    role: 'Imprenditore, fondatore di Vivi Salute',
    img: '',
    initials: 'SR',
    bio: [
      'Imprenditore socio di ABTG',
      'Fondatore di Vivi Salute, il primo network odontoiatrico italiano: 170 strutture convenzionate, 56 citta, oltre 200.000 pazienti',
      'Oltre X operazioni immobiliari svolte, con un profitto complessivo di Y',
    ],
  },
  {
    name: 'Floriana Pagliano',
    role: 'Responsabile Area Immobili ABTG',
    img: '',
    initials: 'FP',
    bio: [
      'Oltre 500 operazioni immobiliari completate con successo, spaziando da piccoli appartamenti a complessi residenziali milionari, con un track record di profitti costanti in ogni fase di mercato',
      'Formatrice di centinaia di investitori immobiliari attraverso i corsi ABTG, specializzata nel trasformare piccoli operatori in grandi costruttori del loro territorio',
      'Consulente strategica per investitori istituzionali e costruttori che vogliono ottimizzare tempi, costi e margini attraverso il suo sistema di negoziazione asimmetrica e networking fornitori',
    ],
  },
  {
    name: 'Avv. Fracassi Stefano',
    role: 'Avvocato immobiliarista',
    img: '',
    initials: 'FS',
    bio: [
      'Socio fondatore di AFBN Studio Legale: una delle pochissime realta in Italia con specializzazione esclusiva nel diritto immobiliare',
      'Spiega cosa deve contenere un contratto per proteggerti davvero e cosa lo trasforma invece in una trappola',
      'E il profilo che separa chi fa un\'operazione buona da chi fa un\'operazione buona che poi diventa un problema legale',
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   TRUSTPILOT STAR — exact SVG from ABTG site (#00B67A green squares)
   ═══════════════════════════════════════════════════════════════════════════════ */
function TrustpilotStar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <rect width="24.8356" height="24.8356" fill="#00B67A" />
      <g clipPath="url(#clip_tp)">
        <path d="M16.2616 15.8881L17.7316 20.4135L12.7557 16.7969L16.2616 15.8881ZM20.8078 10.9478H14.656L12.7564 5.09399L10.8501 10.9492L4.69824 10.9411L9.68013 14.5637L7.77383 20.4129L12.7557 16.7969L15.832 14.5637L20.8078 10.9478Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip_tp">
          <rect width="16.1096" height="16.1096" fill="white" transform="translate(4.69824 4.69861)" />
        </clipPath>
      </defs>
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ORANGE CHECK ICON — exact from ABTG (orange circle with check)
   ═══════════════════════════════════════════════════════════════════════════════ */
function OrangeCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none" className="shrink-0">
      <rect width="43" height="43" rx="21.5" fill="#EF7B11" fillOpacity="0.95" />
      <path d="M19.858 25.6759L15.7917 21.6087L17.1468 20.2536L19.858 22.9638L25.2783 17.5425L26.6343 18.8985L19.858 25.6759Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11 21.5417C11 15.7198 15.7198 11 21.5417 11C27.3635 11 32.0833 15.7198 32.0833 21.5417C32.0833 27.3635 27.3635 32.0833 21.5417 32.0833C15.7198 32.0833 11 27.3635 11 21.5417ZM21.5417 30.1667C20.409 30.1667 19.2875 29.9436 18.241 29.5101C17.1946 29.0767 16.2438 28.4414 15.4429 27.6405C14.642 26.8396 14.0067 25.8887 13.5732 24.8423C13.1398 23.7959 12.9167 22.6743 12.9167 21.5417C12.9167 20.409 13.1398 19.2875 13.5732 18.241C14.0067 17.1946 14.642 16.2438 15.4429 15.4429C16.2438 14.642 17.1946 14.0067 18.241 13.5732C19.2875 13.1398 20.409 12.9167 21.5417 12.9167C23.8292 12.9167 26.023 13.8254 27.6405 15.4429C29.258 17.0604 30.1667 19.2542 30.1667 21.5417C30.1667 23.8292 29.258 26.023 27.6405 27.6405C26.023 29.258 23.8292 30.1667 21.5417 30.1667Z" fill="white" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CTA BUTTON — exact ABTG green button style
   ═══════════════════════════════════════════════════════════════════════════════ */
function CTAButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#partecipa"
      className={clsx(
        'group inline-block w-full sm:w-auto text-center relative overflow-hidden',
        'bg-[#22c55e] text-white',
        'font-[family-name:var(--font-heading)] font-bold',
        'text-base sm:text-lg md:text-xl',
        'py-4 sm:py-5 px-8 sm:px-12',
        'rounded-full',
        'transition-all duration-500 ease-out',
        'shadow-lg hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)]',
        'hover:scale-[1.03] active:scale-[0.98]',
        'uppercase tracking-wide',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-[#16a34a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function MissioneImmobiliareV2Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  /* GSAP subtle fade-up animations — same as real ABTG pages */
  useGSAP(
    () => {
      const fadeEls = containerRef.current?.querySelectorAll('.gsap-fade-up')
      if (!fadeEls) return
      fadeEls.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    },
    { scope: containerRef },
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1500)
    },
    [],
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ════════════════════════════════════════════════════════════════════════
          TOP BAR — orange bar, exact ABTG style (#EF7B11 bg, white text, uppercase, 16px bold Inter)
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#EF7B11] text-white text-center py-3 px-4">
        <p
          className="text-sm sm:text-base font-bold uppercase tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Evento online GRATUITO di 4 serate LIVE per chi intende investire almeno 20.000 euro nell&apos;immobiliare — 27-30 Aprile ore 21
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LOGO BAR — #F5F5F7 bg, centered logo, 0 padding, exact ABTG
          ════════════════════════════════════════════════════════════════════════ */}
      <div className="bg-[#F5F5F7] flex items-center justify-center py-3 px-4">
        <Image
          src={img("/images/missione-immobiliare/Alfio-Bardolla-Training-Group-Logo-Color-1.webp")}
          alt="Alfio Bardolla Training Group"
          width={250}
          height={44}
          className="h-8 sm:h-10 w-auto"
          priority
        />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          HERO SECTION — split layout: testo sx + form dx (come early-birds)
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={img("/images/missione-immobiliare/ChatGPT-Image-Feb-27-2026-10_48_00-PM-1024x683.webp")}
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/90 via-[#1e293b]/80 to-[#1e293b]/60" />
        </div>

        <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* LEFT — Testo */}
            <div>
              {/* Trustpilot */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-white text-sm font-medium">Eccezionale</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <TrustpilotStar key={i} />
                  ))}
                </div>
                <span className="text-white/70 text-xs">4,8</span>
              </div>

              {/* Title */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="text-[#EF7B11]">Missione Immobiliare</span>
                {' '}dove inizia la tua prima operazione!
              </h1>

              {/* Subtitle */}
              <p className="text-white/90 text-base sm:text-lg mb-6 leading-relaxed">
                Scopri come centinaia di persone stanno realizzando le loro prime operazioni immobiliari sopra i 30.000 euro di profitto nel 2026 - anche se non l&apos;hai mai fatto
              </p>

              {/* Disclaimer */}
              <p className="text-white/70 text-xs italic mb-6">
                &ldquo;I risultati mostrati sono basati su casi reali di studenti di Alfio Bardolla Training Group e non costituiscono garanzia di guadagno. I risultati individuali dipendono da impegno, capitale, contesto di mercato e altri fattori.&rdquo;
              </p>

              {/* Lead magnet */}
              <div className="bg-[#1e293b]/80 backdrop-blur-md border border-white/10 rounded-xl p-5">
                <p className="text-white text-sm sm:text-base leading-relaxed">
                  <span className="text-[#EF7B11] font-bold">BONUS GRATUITO:</span>{' '}
                  Partecipando a &ldquo;Missione Immobiliare&rdquo; riceverai gratis &ldquo;La tua prima operazione da 30k&rdquo;, una videoguida che mostra i principi di Alfio Bardolla Training Group per lanciare un&apos;operazione immobiliare da almeno 30.000 euro di profitto
                </p>
              </div>
            </div>

            {/* RIGHT — Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8" id="partecipa">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Nome *</label>
                    <input
                      type="text"
                      placeholder="Il tuo nome"
                      className="w-full px-4 py-4 border border-gray-200 rounded-lg text-[#1e293b] text-base outline-none focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Cognome *</label>
                    <input
                      type="text"
                      placeholder="Il tuo cognome"
                      className="w-full px-4 py-4 border border-gray-200 rounded-lg text-[#1e293b] text-base outline-none focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Email *</label>
                  <input
                    type="email"
                    placeholder="La tua email"
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg text-[#1e293b] text-base outline-none focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1e293b] mb-1.5">Telefono *</label>
                  <input
                    type="tel"
                    placeholder="Il tuo numero"
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg text-[#1e293b] text-base outline-none focus:border-[#EF7B11] focus:ring-2 focus:ring-[#EF7B11]/20 transition-all"
                  />
                </div>
                <label className="flex items-start gap-2.5 text-xs text-[#67768e] pt-1">
                  <input type="checkbox" className="mt-0.5 shrink-0 w-4 h-4" />
                  <span>Presa visione e accettazione della <a href="https://www.alfiobardolla.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="underline">Privacy Policy</a> inclusa la possibilita di ricevere chiamate esplicative delle risorse gratuite scaricate*</span>
                </label>
                <button
                  type="button"
                  className="w-full py-5 rounded-full text-base sm:text-lg font-bold uppercase tracking-wide bg-[#22c55e] hover:bg-[#16a34a] text-white transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] shadow-lg hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)] mt-2"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  SI! VOGLIO ISCRIVERMI AL WORKSHOP
                </button>
                <p className="text-center text-xs text-[#67768e]">
                  (Partecipa da casa dal 27 al 30 Aprile)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          MEDIA LOGOS BAR — white bg, auto-scrolling carousel, exact ABTG
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-6 overflow-hidden">
        <div className="flex animate-scroll-logos">
          {[...MEDIA_LOGOS, ...MEDIA_LOGOS, ...MEDIA_LOGOS].map((logo, i) => (
            <div key={i} className="flex-shrink-0 px-4 sm:px-6">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll-logos {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-scroll-logos {
            animation: scroll-logos 30s linear infinite;
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CHECKMARKS SECTION — white bg, max-w-[1250px], ABTG style
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {CHECKMARKS.map((item, i) => (
              <div
                key={i}
                className="gsap-fade-up flex items-start gap-4 bg-[#F5F5F7] rounded-xl p-5 sm:p-6 transition-transform hover:-translate-y-0.5"
              >
                <OrangeCheckIcon />
                <p
                  className="text-[#1e293b] text-sm sm:text-base font-medium leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          BEFORE / AFTER TABLE — exact ABTG style comparison
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-10 sm:mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#EF7B11]">Prima</span> vs <span className="text-green-500">Dopo</span> Missione Immobiliare
          </h2>

          <div className="gsap-fade-up space-y-3 sm:space-y-4">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-2 gap-4 px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Prima
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-bold text-sm uppercase tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Dopo
                </span>
              </div>
            </div>

            {BEFORE_AFTER.map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4 sm:p-5">
                  <X className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-[#1e293b] text-sm sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {row.before}
                  </span>
                </div>
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4 sm:p-5">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-[#1e293b] text-sm sm:text-base font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-14 gsap-fade-up">
            <CTAButton>Richiedi il tuo posto gratuito</CTAButton>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          "IN QUALE FASE TI TROVI?" — 3 numbered phases, ABTG card style
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-10 sm:mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <span className="text-[#E57713]">In quale fase</span> ti trovi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PHASES.map((phase, i) => (
              <div
                key={i}
                className="gsap-fade-up bg-[#F5F5F7] rounded-2xl p-6 sm:p-8 transition-transform hover:-translate-y-0.5 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-[#EF7B11] flex items-center justify-center mb-4">
                  <span className="text-white text-lg font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {phase.num}
                  </span>
                </div>
                <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="gsap-fade-up max-w-4xl mx-auto mt-10 sm:mt-14 space-y-4">
            <p className="text-[#1e293b] text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Il problema non &egrave; la tua mancanza di coraggio. Non &egrave; nemmeno il capitale.
            </p>
            <p className="text-[#1e293b] text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Il problema &egrave; che nessuno ti ha mai mostrato un&apos;operazione reale dall&apos;inizio alla fine, con i numeri veri, gli errori veri, i contratti veri. Tutto quello che trovi in giro &egrave; teoria, o &egrave; troppo generico per essere applicato, o viene da qualcuno che ti sta vendendo qualcosa senza averlo mai fatto davvero.
            </p>
            <p className="text-[#EF7B11] text-base sm:text-lg leading-relaxed font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
              Missione Immobiliare &egrave; stato costruito per colmare esattamente questo vuoto.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA DIVIDER
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-[1250px] mx-auto px-4 text-center gsap-fade-up">
          <CTAButton>Richiedi il tuo posto gratuito</CTAButton>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          COSA SCOPRIRAI — 7 bullet points
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F7] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-10 sm:mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cosa scoprirai al workshop <span className="text-[#EF7B11]">&ldquo;Missione Immobiliare&rdquo;</span>
          </h2>

          <div className="gsap-fade-up max-w-4xl mx-auto space-y-5">
            {[
              { emoji: '\u{1F4C9}', text: 'I 5 errori pi\u00f9 costosi che fanno le persone alle prime armi (comprare di pancia, ristrutturare per s\u00e9 invece che per il mercato, aspettare il prezzo massimo invece di vendere veloce. Alfio li smonta uno per uno con esempi reali)' },
              { emoji: '\u{1F50D}', text: 'Perch\u00e9 il 2026 \u00e8 probabilmente il momento migliore degli ultimi vent\'anni per fare la tua prima operazione immobiliare (e cosa hanno in comune tassi bassi, immobili all\'asta post-2020 e la nuova legge sulle donazioni che la maggior parte degli investitori non ha ancora capito)' },
              { emoji: '\u{1F9E0}', text: 'Il cambio di mentalit\u00e0 che separa chi guadagna da chi ci rimette (non \u00e8 motivazione, non \u00e8 coraggio. \u00c8 un modo diverso di leggere il mercato prima ancora di cercare un immobile)' },
              { emoji: '\u{1F5FA}\uFE0F', text: 'Come identificare le zone ad alto potenziale in tutta Italia usando il software ABTG (vedrai una demo live che ti mostrer\u00e0 zone, dimensioni, target, analisi delle agenzie online. Grazie a questo software capisci in tempo reale se un mercato vale il tuo capitale o no)' },
              { emoji: '\u{1F4B6}', text: 'Come trovare venditori motivati per risparmiare decine di migliaia di euro gi\u00e0 nell\'acquisto dell\'immobile' },
              { emoji: '\u{1F4D1}', text: 'Come fare operazioni immobiliari usando anche i soldi degli altri, e come costruire la squadra giusta intorno a te fin dalla prima operazione' },
              { emoji: '\u2696\uFE0F', text: 'I contratti che ti salvano dai problemi pi\u00f9 costosi (un avvocato specializzato ti mostra cosa deve contenere un contratto per proteggerti davvero, cosa \u00e8 cambiato nel 2026 con le nuove normative, e quali clausole trasformano un\'operazione buona in un problema legale)' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <p className="text-[#1e293b] text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          INTRO PILASTRI
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-6"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Perch&eacute; gli investitori ABTG ottengono profitti che la maggior parte degli investitori <span className="text-[#EF7B11]">non riesce a replicare</span>
          </h2>
          <p className="gsap-fade-up text-center text-[#67768e] text-sm sm:text-base italic mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            (lo approfondiremo a Missione Immobiliare)
          </p>
          <div className="gsap-fade-up max-w-4xl mx-auto space-y-4">
            <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              La differenza non &egrave; il capitale di partenza. Non &egrave; la fortuna. Non &egrave; nemmeno la zona geografica.
            </p>
            <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              &Egrave; il metodo, e l&apos;ordine in cui vengono prese le decisioni.
            </p>
            <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              La maggior parte degli investitori segue questa sequenza: trova un immobile, lo compra, lo ristruttura, poi cerca di venderlo. Questo approccio porta a immobili fermi sul mercato per mesi, margini erosi dai costi di gestione e dal tempo, e rischio di invenduto che pesa su ogni operazione.
            </p>
            <p className="text-[#1e293b] text-base leading-relaxed font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
              Il <span className="text-[#EF7B11]">Metodo Prevendi</span> di Alfio Bardolla Training Group inverte questa logica lavorando su quattro pilastri:
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          4 PILLARS (Metodo Prevendi) — StackingCards animation block
          ════════════════════════════════════════════════════════════════════════ */}
      <StackingCards
        preTitle="Il Metodo"
        title="I 4 Pilastri del"
        titleHighlight="Metodo Prevendi"
        subtitle="Un sistema collaudato in oltre 1.200 operazioni immobiliari documentate"
        bgColor="light"
        cards={PILLARS.map((p) => ({
          title: p.title,
          description: p.desc,
        }))}
        id="metodo"
      />

      {/* ════════════════════════════════════════════════════════════════════════
          CTA DIVIDER
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-[1250px] mx-auto px-4 text-center gsap-fade-up">
          <CTAButton>Richiedi il tuo posto gratuito</CTAButton>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          SPEAKERS — exact ABTG style (image + name + bio card)
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-10 sm:mb-14"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            I <span className="text-[#E57713]">Coach</span> che ti guideranno durante Missione Immobiliare
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {SPEAKERS.map((speaker, i) => (
              <div
                key={i}
                className="gsap-fade-up bg-[#F5F5F7] rounded-2xl overflow-hidden border border-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[573/360] overflow-hidden bg-gradient-to-br from-[#1e293b] to-[#0f1923]">
                  {speaker.img ? (
                    <Image
                      src={speaker.img}
                      alt={speaker.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/20" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {speaker.initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <h3
                    className="text-lg font-bold text-[#1e293b] mb-1"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {speaker.name}
                  </h3>
                  <p className="text-[#E57713] text-sm font-semibold mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {speaker.role}
                  </p>
                  <ul className="space-y-2">
                    {(speaker.bio as string[]).map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-[#67768e] text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <Check className="w-4 h-4 text-[#EF7B11] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CTA DIVIDER
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F5F5F7] py-8 sm:py-12">
        <div className="max-w-[1250px] mx-auto px-4 text-center gsap-fade-up">
          <CTAButton>Richiedi il tuo posto gratuito</CTAButton>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          "FINESTRA 2026" URGENCY SECTION — dark bg, ABTG style
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1e293b] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="gsap-fade-up max-w-4xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-white mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Perch&eacute; il <span className="text-[#EF7B11]">2026</span> &egrave; una finestra che si apre raramente, e si chiude in fretta
            </h2>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/10 space-y-5">
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Quello che sta succedendo sul mercato immobiliare italiano in questo momento non &egrave; una crisi. &Egrave; una redistribuzione.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Tutto quello che &egrave; successo negli ultimi anni (l&apos;aumento dei tassi, l&apos;inflazione, i costi dell&apos;energia, le difficolt&agrave; economiche del post-2020) impiega anni a tradursi in immobili che cambiano mano a prezzi scontati.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Una procedura di pignoramento, in media, richiede circa sei anni per arrivare all&apos;asta. Quello che &egrave; successo nel 2020 arriva sul mercato adesso.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Chi &egrave; preparato trova immobili a prezzi che non si vedevano da oltre un decennio. Chi aspetta che &ldquo;il momento sia giusto&rdquo; trova che qualcun altro lo ha gi&agrave; comprato.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                C&apos;&egrave; un secondo motivo per cui questo momento &egrave; diverso dagli altri.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Fuori dalle grandi citt&agrave; come Milano e Roma il mercato immobiliare italiano &egrave; ancora accessibile.
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Ci sono centinaia di zone in tutta Italia con una combinazione precisa di caratteristiche:
              </p>
              <p className="text-white/90 text-base sm:text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                Densit&agrave; abitativa in crescita, infrastrutture in sviluppo, prezzi ancora bassi, domanda in aumento. Zone che chi investe professionalmente identifica mesi prima che diventino ovvie a tutti.
              </p>
              <p className="text-[#EF7B11] text-base sm:text-lg leading-relaxed font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Il Metodo Prevendi &egrave; stato costruito esattamente per trovare queste zone, e per entrare ed uscire prima che il mercato si accorga di loro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FORM SECTION — exact ABTG style (#partecipa anchor)
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="partecipa" className="bg-[#F5F5F7] py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="gsap-fade-up text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-[#1e293b] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Come funziona e come accedere a{' '}
            <span className="text-[#E57713]">Missione Immobiliare</span>
          </h2>

          <div className="gsap-fade-up max-w-2xl mx-auto mt-10 sm:mt-14">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 border border-gray-100">
              <div className="space-y-4 mb-8">
                <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  L&apos;evento &egrave; gratuito e aperto a chi intende investire almeno 20.000 euro nell&apos;immobiliare, che tu abbia gi&agrave; fatto operazioni o stia valutando la prima.
                </p>
                <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Compila i campi richiesti per riservare il tuo posto. Un nostro tutor ti contatter&agrave; per una breve call di selezione, per capire il tuo punto di partenza e assicurarsi che le quattro serate siano il percorso giusto per te in questo momento.
                </p>
                <p className="text-[#1e293b] text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  L&apos;evento si terr&agrave; in diretta per 4 serate consecutive: 27, 28, 29 e 30 Aprile alle ore 21. Troverai dimostrazioni pratiche del Metodo di ABTG su operazioni reali, una demo live del software di mappatura territoriale ABTG, e sessioni di domande e risposte con gli speaker.
                </p>
                <p className="text-[#1e293b] text-base leading-relaxed font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Tutto questo in maniera completamente <span className="text-[#EF7B11]">GRATUITA</span>.
                </p>
              </div>

              {/* Requisito box — exact ABTG styling */}
              <div className="bg-[#FFF7ED] border border-[#EF7B11]/20 rounded-xl p-4 mb-6 sm:mb-8">
                <p className="text-[#1e293b] text-sm font-medium text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <span className="text-[#EF7B11] font-bold">Requisito:</span>{' '}
                  Avere almeno 20.000 euro da destinare a un investimento immobiliare, o essere gi&agrave; operativo e voler migliorare i propri margini.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-[#1e293b] mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Richiesta inviata con successo!
                  </h3>
                  <p className="text-[#67768e] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Ti contatteremo a breve per confermare il tuo posto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#1e293b] text-sm font-medium mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base focus:border-[#EF7B11] focus:ring-1 focus:ring-[#EF7B11] outline-none transition-colors bg-white text-[#1e293b]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1e293b] text-sm font-medium mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Cognome *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cognome}
                        onChange={(e) => setFormData({ ...formData, cognome: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base focus:border-[#EF7B11] focus:ring-1 focus:ring-[#EF7B11] outline-none transition-colors bg-white text-[#1e293b]"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                        placeholder="Il tuo cognome"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#1e293b] text-sm font-medium mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base focus:border-[#EF7B11] focus:ring-1 focus:ring-[#EF7B11] outline-none transition-colors bg-white text-[#1e293b]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="La tua email"
                    />
                  </div>
                  <div>
                    <label className="block text-[#1e293b] text-sm font-medium mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Telefono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-base focus:border-[#EF7B11] focus:ring-1 focus:ring-[#EF7B11] outline-none transition-colors bg-white text-[#1e293b]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="Il tuo numero"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        'w-full py-5 rounded-full text-lg font-bold uppercase tracking-wide transition-all duration-300',
                        'bg-[#22c55e] hover:bg-[#16a34a] text-white',
                        'shadow-lg hover:shadow-[0_8px_30px_rgba(34,197,94,0.4)]',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        'disabled:opacity-70 disabled:cursor-not-allowed',
                      )}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {isSubmitting ? 'Invio in corso...' : 'RICHIEDI IL TUO POSTO GRATUITO'}
                    </button>
                  </div>

                  <p className="text-[#67768e] text-xs text-center mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Compilando il modulo accetti la nostra Privacy Policy. I tuoi dati sono al sicuro e non verranno mai condivisi con terze parti.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FOOTER — exact ABTG style disclaimers
          ════════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1e293b] py-10 sm:py-14">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <Image
              src={img("/images/missione-immobiliare/Alfio-Bardolla-Training-Group-Logo-Color-1.webp")}
              alt="ABTG"
              width={200}
              height={35}
              className="h-8 w-auto brightness-0 invert opacity-80"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            <a href="https://www.alfiobardolla.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="https://www.alfiobardolla.com/cookie-policy/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Cookie Policy</a>
            <a href="https://www.alfiobardolla.com/condizioni-di-vendita/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Condizioni di Vendita</a>
            <a href="https://www.alfiobardolla.com/disclaimer" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-sm transition-colors">Disclaimer</a>
          </div>

          <div className="text-center space-y-3">
            <p className="text-white/40 text-xs leading-relaxed">
              Copyright &copy; 2026 Alfio Bardolla Training Group S.p.A.
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              Via Pietrasanta, 14 &mdash; 20141 Milano (MI)
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              Capitale sociale 2.649.702,50 &euro; &mdash; P. IVA 08009280960
            </p>
          </div>

        </div>
      </footer>
    </div>
  )
}
