import type { PageConfig } from "@/types/blocks";

// ============================================================
// TEMPLATE PRESETS
// Each template defines a recommended block ordering.
// Content is filled in via the JSON page config.
// ============================================================

/**
 * Event registration page
 * Hero -> Social Proof -> Speaker -> Event Details -> Benefits -> Testimonials -> FAQ -> Countdown -> HubSpot Form -> Footer
 */
export const eventRegistrationTemplate: PageConfig = {
  slug: "evento-live",
  template: "event",
  seo: {
    title: "Evento Live - Alfio Bardolla Training Group",
    description:
      "Partecipa all'evento live con Alfio Bardolla. Scopri le strategie per raggiungere la liberta' finanziaria.",
  },
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      layout: "split",
      headline: "Liberta' Finanziaria Live",
      headlineHtml:
        '<span class="text-primary">Liberta\' Finanziaria</span> Live',
      subheadline:
        "L'evento dal vivo che ha gia' trasformato la vita di oltre 500.000 persone. Impara le strategie dei milionari.",
      badge: "EVENTO DAL VIVO",
      cta: { text: "Riserva il Tuo Posto", href: "#form" },
      secondaryCta: { text: "Scopri il Programma", href: "#programma" },
      heroImage: {
        src: "/images/hero-event.jpg",
        alt: "Alfio Bardolla sul palco",
      },
      trustIndicators: [
        "+500.000 partecipanti",
        "15 anni di esperienza",
        "Soddisfatti o rimborsati",
      ],
    },
    {
      id: "social-proof-1",
      type: "social-proof",
      layout: "combined",
      stats: [
        { value: "500K+", label: "Studenti formati" },
        { value: "15", label: "Anni di esperienza", suffix: "+" },
        { value: "4.8", label: "Valutazione media", suffix: "/5" },
        { value: "50", label: "Paesi raggiunti", suffix: "+" },
      ],
      mediaLogos: [
        { src: "/images/logos/rai.svg", alt: "Rai" },
        { src: "/images/logos/corriere.svg", alt: "Corriere della Sera" },
        { src: "/images/logos/sole24ore.svg", alt: "Il Sole 24 Ore" },
        { src: "/images/logos/forbes.svg", alt: "Forbes" },
      ],
    },
    {
      id: "speaker-1",
      type: "speaker",
      name: "Alfio Bardolla",
      title: "Imprenditore, Autore Best-Seller, Financial Coach",
      bio: "Alfio Bardolla e' il fondatore e master trainer della Alfio Bardolla Training Group S.p.A., societa' quotata in Borsa leader in Italia nella formazione finanziaria personale.",
      photo: { src: "/images/alfio-bardolla.jpg", alt: "Alfio Bardolla" },
      credentials: [
        "Fondatore di ABTG S.p.A. — Quotata in Borsa Italiana",
        "Autore di 9 best-seller sulla finanza personale",
        "Ha formato oltre 500.000 persone in 15 anni",
        "Imprenditore seriale con investimenti in 4 continenti",
      ],
      books: [
        {
          title: "I soldi fanno la felicita'",
          coverImage: { src: "/images/books/soldi-felicita.jpg", alt: "I soldi fanno la felicita'" },
        },
      ],
    },
    {
      id: "event-details-1",
      type: "event-details",
      eventName: "Wake Up Call",
      date: "15-16 Aprile 2026",
      dateISO: "2026-04-15T09:00:00+02:00",
      endDate: "16 Aprile 2026",
      location: "MiCo — Milano Congressi",
      locationDetails: "Piazzale Carlo Magno 1, 20149 Milano",
      isOnline: false,
      agenda: [
        { time: "09:00", title: "Registrazione e Welcome Coffee" },
        { time: "10:00", title: "Apertura — La Mentalita' del Milionario", speaker: "Alfio Bardolla" },
        { time: "12:30", title: "Pausa Pranzo" },
        { time: "14:00", title: "Immobili: Come Creare Rendite Passive", speaker: "Team ABTG" },
        { time: "16:00", title: "Trading e Mercati Finanziari", speaker: "Team ABTG" },
        { time: "18:00", title: "Q&A e Networking" },
      ],
      cta: { text: "Registrati Ora", href: "#form" },
    },
    {
      id: "benefits-1",
      type: "benefits",
      layout: "grid-3",
      sectionTitle: "Cosa Imparerai",
      sectionSubtitle: "Strategie concrete e applicabili dal giorno dopo l'evento",
      benefits: [
        {
          icon: "dollar-sign",
          title: "Gestione del Denaro",
          description: "Impara a gestire le tue finanze come fanno i milionari self-made.",
        },
        {
          icon: "trending-up",
          title: "Investimenti Immobiliari",
          description: "Scopri come generare rendite passive con gli immobili.",
        },
        {
          icon: "bar-chart",
          title: "Trading Online",
          description: "Le basi del trading per far lavorare il tuo denaro per te.",
        },
        {
          icon: "target",
          title: "Mentalita' Vincente",
          description: "Sviluppa il mindset che distingue chi raggiunge la liberta' finanziaria.",
        },
        {
          icon: "users",
          title: "Network Esclusivo",
          description: "Entra in contatto con una community di persone ambiziose.",
        },
        {
          icon: "shield",
          title: "Piano d'Azione",
          description: "Torna a casa con un piano concreto da mettere subito in pratica.",
        },
      ],
    },
    {
      id: "testimonials-1",
      type: "testimonials",
      layout: "carousel",
      sectionTitle: "Cosa Dicono i Nostri Studenti",
      testimonials: [
        {
          name: "Marco R.",
          role: "Imprenditore, Milano",
          quote:
            "Dopo l'evento ho completamente rivoluzionato il mio approccio alle finanze. In 12 mesi ho creato 3 fonti di reddito passive.",
          rating: 5,
        },
        {
          name: "Giulia S.",
          role: "Libera Professionista, Roma",
          quote:
            "Ero scettica, ma le strategie che ho imparato mi hanno permesso di acquistare il mio primo immobile a reddito.",
          rating: 5,
        },
        {
          name: "Alessandro P.",
          role: "Dipendente, Torino",
          quote:
            "Il valore che ho ricevuto e' stato incredibile. Ora ho un portafoglio diversificato e dormo sereno.",
          rating: 5,
        },
      ],
    },
    {
      id: "faq-1",
      type: "faq",
      sectionTitle: "Domande Frequenti",
      items: [
        {
          question: "L'evento e' adatto anche ai principianti?",
          answer:
            "Assolutamente si'. I contenuti sono strutturati per essere comprensibili e applicabili da tutti, indipendentemente dal livello di partenza.",
        },
        {
          question: "C'e' una garanzia di rimborso?",
          answer:
            "Si', offriamo la garanzia soddisfatti o rimborsati. Se entro la pausa pranzo del primo giorno non sei soddisfatto, ti restituiamo l'intero importo.",
        },
        {
          question: "Posso partecipare online?",
          answer:
            "Questo evento specifico e' dal vivo a Milano. Tuttavia, abbiamo anche versioni online dei nostri corsi. Contattaci per maggiori informazioni.",
        },
        {
          question: "Cosa devo portare?",
          answer:
            "Porta un blocco appunti e tanta voglia di imparare! Forniremo noi tutto il materiale didattico.",
        },
      ],
    },
    {
      id: "countdown-1",
      type: "countdown",
      targetDate: "2026-04-15T09:00:00+02:00",
      headline: "L'evento inizia tra",
      subheadline: "I posti sono limitati. Non perdere questa opportunita'.",
      cta: { text: "Riserva il Tuo Posto Ora", href: "#form" },
      style: "inline",
    },
    {
      id: "form-1",
      type: "hubspot-form",
      portalId: "YOUR_PORTAL_ID",
      formId: "YOUR_FORM_ID",
      sectionTitle: "Registrati all'Evento",
      sectionSubtitle: "Compila il form per riservare il tuo posto",
      sideContent: {
        type: "benefits",
        benefits: [
          "2 giorni di formazione intensiva",
          "Materiale didattico incluso",
          "Accesso alla community privata",
          "Certificato di partecipazione",
          "Garanzia soddisfatti o rimborsati",
        ],
      },
    },
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      companyInfo:
        "Societa' quotata su AIM Italia — Borsa Italiana. Sede legale: Via Marconi 1, 20121 Milano. P.IVA 05763550960",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
        { text: "Termini e Condizioni", href: "/termini" },
        { text: "Contatti", href: "/contatti" },
      ],
      disclaimers: [
        "Questo sito non fa parte del sito Facebook o Facebook Inc. Inoltre, questo sito NON e' approvato da Facebook in alcun modo.",
        "I risultati possono variare e dipendono da molti fattori. Non garantiamo che otterrai gli stessi risultati dei nostri testimonial.",
        "ABTG S.p.A. — Tutti i diritti riservati. Societa' quotata su Euronext Growth Milan.",
      ],
    },
  ],
};

/**
 * Paid course sales page
 * Hero -> Social Proof -> Benefits -> Speaker -> Video Testimonials -> Pricing -> FAQ -> Countdown (floating) -> Footer
 */
export const courseSalesTemplate: PageConfig = {
  slug: "corso-online",
  template: "course-sales",
  seo: {
    title: "Corso Online - Alfio Bardolla Training Group",
    description:
      "Accedi al corso online di Alfio Bardolla per raggiungere la liberta' finanziaria.",
  },
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      layout: "centered",
      headline: "Masterclass Liberta' Finanziaria",
      headlineHtml:
        'Masterclass<br/><span class="text-primary">Liberta\' Finanziaria</span>',
      subheadline:
        "Il percorso completo in 12 moduli per costruire la tua indipendenza economica partendo da zero.",
      badge: "CORSO ONLINE",
      cta: { text: "Accedi al Corso", href: "#pricing" },
      trustIndicators: ["12 moduli video", "Accesso a vita", "Community privata"],
    },
    {
      id: "social-proof-1",
      type: "social-proof",
      layout: "stats",
      stats: [
        { value: "12", label: "Moduli video" },
        { value: "40+", label: "Ore di contenuto" },
        { value: "10K+", label: "Studenti iscritti" },
        { value: "4.9", label: "Rating medio", suffix: "/5" },
      ],
    },
    {
      id: "benefits-1",
      type: "benefits",
      layout: "grid-3",
      sectionTitle: "Cosa Include il Corso",
      benefits: [
        { icon: "book-open", title: "12 Moduli Video", description: "Oltre 40 ore di contenuto video in HD." },
        { icon: "users", title: "Community Privata", description: "Gruppo esclusivo con altri studenti e mentor." },
        { icon: "award", title: "Certificato", description: "Certificato di completamento riconosciuto." },
        { icon: "zap", title: "Esercizi Pratici", description: "Workbook con esercizi per ogni modulo." },
        { icon: "clock", title: "Accesso a Vita", description: "Studia al tuo ritmo, quando e dove vuoi." },
        { icon: "target", title: "Aggiornamenti", description: "Tutti gli aggiornamenti futuri inclusi." },
      ],
    },
    {
      id: "speaker-1",
      type: "speaker",
      name: "Alfio Bardolla",
      title: "Il tuo Trainer",
      bio: "Con oltre 15 anni di esperienza e 500.000+ studenti formati, Alfio ti guidera' passo dopo passo verso la liberta' finanziaria.",
      photo: { src: "/images/alfio-bardolla.jpg", alt: "Alfio Bardolla" },
      credentials: [
        "Fondatore di ABTG S.p.A.",
        "9 libri best-seller",
        "500.000+ studenti",
      ],
    },
    {
      id: "testimonials-1",
      type: "testimonials",
      layout: "grid",
      sectionTitle: "Storie di Successo",
      testimonials: [
        { name: "Luca M.", role: "Studente", quote: "Il miglior investimento che abbia mai fatto su me stesso.", rating: 5 },
        { name: "Sara T.", role: "Studentessa", quote: "Contenuti chiari e applicabili. Ho iniziato a investire in 30 giorni.", rating: 5 },
        { name: "Roberto C.", role: "Studente", quote: "La community vale da sola il prezzo del corso.", rating: 5 },
      ],
    },
    {
      id: "pricing-1",
      type: "pricing",
      sectionTitle: "Scegli il Tuo Percorso",
      tiers: [
        {
          name: "Base",
          price: "497",
          originalPrice: "997",
          features: [
            { text: "12 moduli video", included: true },
            { text: "Workbook PDF", included: true },
            { text: "Accesso a vita", included: true },
            { text: "Community privata", included: false },
            { text: "Sessioni Q&A live", included: false },
            { text: "Coaching 1:1", included: false },
          ],
          cta: { text: "Inizia Ora", href: "#checkout" },
        },
        {
          name: "Premium",
          badge: "PIU' VENDUTO",
          price: "997",
          originalPrice: "1.997",
          features: [
            { text: "12 moduli video", included: true },
            { text: "Workbook PDF", included: true },
            { text: "Accesso a vita", included: true },
            { text: "Community privata", included: true },
            { text: "Sessioni Q&A live mensili", included: true },
            { text: "Coaching 1:1", included: false },
          ],
          cta: { text: "Scegli Premium", href: "#checkout" },
          highlighted: true,
        },
        {
          name: "VIP",
          price: "2.997",
          originalPrice: "4.997",
          features: [
            { text: "12 moduli video", included: true },
            { text: "Workbook PDF", included: true },
            { text: "Accesso a vita", included: true },
            { text: "Community privata", included: true },
            { text: "Sessioni Q&A live settimanali", included: true },
            { text: "3 sessioni coaching 1:1", included: true },
          ],
          cta: { text: "Diventa VIP", href: "#checkout" },
        },
      ],
      guarantee: "Garanzia soddisfatti o rimborsati entro 30 giorni",
    },
    {
      id: "faq-1",
      type: "faq",
      sectionTitle: "Domande Frequenti",
      items: [
        { question: "Per quanto tempo ho accesso al corso?", answer: "L'accesso e' a vita. Una volta acquistato, potrai accedere quando vorrai." },
        { question: "Posso pagare a rate?", answer: "Si', offriamo la possibilita' di pagare in 3 rate senza interessi." },
        { question: "Il corso e' adatto ai principianti?", answer: "Assolutamente si'. Partiamo dalle basi e ti guidiamo passo dopo passo." },
      ],
    },
    {
      id: "countdown-float",
      type: "countdown",
      targetDate: "2026-04-01T23:59:59+02:00",
      headline: "Offerta valida per:",
      cta: { text: "Approfitta Ora", href: "#pricing" },
      style: "floating",
    },
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
        { text: "Termini e Condizioni", href: "/termini" },
      ],
      disclaimers: [
        "I risultati possono variare e dipendono da molti fattori.",
      ],
    },
  ],
};

/**
 * Free webinar registration
 * Hero (video-bg) -> Social Proof -> Benefits -> Speaker -> Countdown -> HubSpot Form -> Footer
 */
export const webinarTemplate: PageConfig = {
  slug: "webinar-gratuito",
  template: "webinar",
  seo: {
    title: "Webinar Gratuito - Alfio Bardolla",
    description:
      "Registrati al webinar gratuito e scopri le 3 strategie per la liberta' finanziaria.",
  },
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      layout: "centered",
      headline: "Webinar Gratuito",
      headlineHtml:
        'Webinar <span class="text-primary">Gratuito</span><br/>Le 3 Strategie per la Liberta\' Finanziaria',
      subheadline:
        "Scopri in 60 minuti le strategie che Alfio Bardolla usa per generare reddito passivo.",
      badge: "GRATUITO — POSTI LIMITATI",
      cta: { text: "Registrati Gratis", href: "#form" },
      trustIndicators: ["Gratuito", "60 minuti", "Replay disponibile"],
    },
    {
      id: "social-proof-1",
      type: "social-proof",
      layout: "stats",
      stats: [
        { value: "50K+", label: "Partecipanti ai webinar" },
        { value: "4.9", label: "Valutazione", suffix: "/5" },
        { value: "60", label: "Minuti di contenuto", suffix: "min" },
      ],
    },
    {
      id: "benefits-1",
      type: "benefits",
      layout: "grid-3",
      sectionTitle: "Cosa Imparerai nel Webinar",
      benefits: [
        { icon: "dollar-sign", title: "Strategia #1", description: "Come creare la tua prima fonte di reddito passivo." },
        { icon: "trending-up", title: "Strategia #2", description: "Il metodo per investire in immobili senza capitale iniziale." },
        { icon: "bar-chart", title: "Strategia #3", description: "Come far lavorare il denaro per te con il trading." },
      ],
    },
    {
      id: "speaker-1",
      type: "speaker",
      name: "Alfio Bardolla",
      title: "Il tuo Host",
      bio: "Imprenditore, autore best-seller e fondatore di ABTG S.p.A.",
      photo: { src: "/images/alfio-bardolla.jpg", alt: "Alfio Bardolla" },
      credentials: ["500.000+ studenti formati", "9 libri best-seller", "Societa' quotata in Borsa"],
    },
    {
      id: "countdown-1",
      type: "countdown",
      targetDate: "2026-03-25T20:00:00+01:00",
      headline: "Il webinar inizia tra",
      cta: { text: "Registrati Gratis", href: "#form" },
      style: "inline",
    },
    {
      id: "form-1",
      type: "hubspot-form",
      portalId: "YOUR_PORTAL_ID",
      formId: "YOUR_FORM_ID",
      sectionTitle: "Registrati Ora — E' Gratuito",
      sectionSubtitle: "Inserisci i tuoi dati per ricevere il link di accesso",
      sideContent: {
        type: "benefits",
        benefits: [
          "Accesso gratuito al webinar live",
          "Replay disponibile per 48 ore",
          "PDF con le slide del webinar",
          "Bonus: checklist liberta' finanziaria",
        ],
      },
    },
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
      ],
      disclaimers: [],
    },
  ],
};

/**
 * Lead magnet download page
 * Hero -> Benefits -> HubSpot Form -> Footer
 */
export const leadMagnetTemplate: PageConfig = {
  slug: "ebook-gratuito",
  template: "lead-magnet",
  seo: {
    title: "eBook Gratuito - Alfio Bardolla",
    description: "Scarica l'eBook gratuito sulle strategie per la liberta' finanziaria.",
  },
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      layout: "split",
      headline: "eBook Gratuito",
      headlineHtml:
        'eBook <span class="text-primary">Gratuito</span><br/>Le 7 Regole del Denaro',
      subheadline:
        "Scarica subito l'eBook e scopri le 7 regole che i milionari seguono per gestire il denaro.",
      cta: { text: "Scarica Gratis", href: "#form" },
      heroImage: {
        src: "/images/ebook-cover.jpg",
        alt: "Copertina eBook",
      },
    },
    {
      id: "benefits-1",
      type: "benefits",
      layout: "alternating",
      sectionTitle: "Cosa Troverai nell'eBook",
      benefits: [
        { icon: "book-open", title: "7 Regole Pratiche", description: "Strategie concrete per gestire il tuo denaro." },
        { icon: "target", title: "Casi Studio Reali", description: "Esempi di persone che hanno raggiunto la liberta' finanziaria." },
        { icon: "zap", title: "Piano d'Azione", description: "Un piano step-by-step da applicare subito." },
      ],
    },
    {
      id: "form-1",
      type: "hubspot-form",
      portalId: "YOUR_PORTAL_ID",
      formId: "YOUR_FORM_ID",
      sectionTitle: "Scarica il Tuo eBook Gratuito",
      sideContent: {
        type: "image",
        image: { src: "/images/ebook-mockup.jpg", alt: "eBook mockup" },
      },
    },
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
      ],
      disclaimers: [],
    },
  ],
};

/**
 * Thank you / confirmation page
 */
export const thankYouTemplate: PageConfig = {
  slug: "grazie",
  template: "thank-you",
  seo: {
    title: "Grazie! - Alfio Bardolla Training Group",
    description: "La tua registrazione e' stata confermata.",
    noIndex: true,
  },
  blocks: [
    {
      id: "thankyou-1",
      type: "thank-you",
      headline: "Fantastico! Sei dentro!",
      message:
        "La tua registrazione e' stata confermata. Controlla la tua email per i prossimi passi.",
      nextSteps: [
        "Controlla la tua casella email (anche lo spam)",
        "Segna la data sul calendario",
        "Unisciti al gruppo Telegram per ricevere aggiornamenti",
      ],
      cta: { text: "Unisciti al Gruppo Telegram", href: "https://t.me/alfiobardolla" },
      calendarLink: "https://calendar.google.com/calendar/event?action=TEMPLATE",
      socialShare: {
        text: "Mi sono appena registrato all'evento di Alfio Bardolla!",
        url: "https://example.com/evento-live",
      },
    },
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
      ],
      disclaimers: [],
    },
  ],
};

/**
 * Missione Immobiliare — 4-day free workshop
 * Hero -> Social Proof -> Benefits -> Speaker -> Event Details -> Testimonials -> FAQ -> Countdown (banner) -> HubSpot Form -> Countdown (floating) -> Footer
 */
export const missioneImmobiliareTemplate: PageConfig = {
  slug: "missione-immobiliare",
  template: "workshop",
  seo: {
    title:
      "Missione Immobiliare — Workshop Gratuito di 4 Giorni | Alfio Bardolla",
    description:
      "Partecipa gratis al workshop di 4 giorni con Alfio Bardolla. Impara a mettere in piedi la tua prima operazione immobiliare. Solo 500 posti.",
  },
  tracking: {
    facebookPixelId: "YOUR_PIXEL_ID",
  },
  theme: {
    primaryColor: "#D76E11",
  },
  blocks: [
    // 1. Hero
    {
      id: "hero-1",
      type: "hero",
      layout: "split",
      badge: "WORKSHOP GRATUITO — 4 GIORNI",
      headline: "Missione Immobiliare",
      headlineHtml:
        'MISSIONE<br/><span class="text-primary">IMMOBILIARE</span>',
      subheadline:
        "4 giorni di workshop intensivo e GRATUITO con Alfio Bardolla e il suo team per mettere in piedi la tua prima operazione immobiliare — anche se parti da zero.",
      cta: { text: "Candidati Ora — Posti Limitati", href: "#form" },
      secondaryCta: { text: "Scopri il Programma", href: "#programma" },
      heroImage: {
        src: "/images/missione-immobiliare-hero.jpg",
        alt: "Missione Immobiliare — Workshop con Alfio Bardolla",
      },
      trustIndicators: ["GRATUITO", "500 posti max", "4 giorni intensivi"],
    },

    // 2. Social Proof
    {
      id: "social-proof-1",
      type: "social-proof",
      layout: "combined",
      stats: [
        { value: "500K+", label: "Persone formate" },
        { value: "15", label: "Anni di esperienza", suffix: "+" },
        { value: "4.8", label: "Valutazione media", suffix: "/5" },
        { value: "1.200+", label: "Operazioni immobiliari seguite" },
      ],
      mediaLogos: [
        { src: "/images/logos/rai.svg", alt: "Rai" },
        { src: "/images/logos/corriere.svg", alt: "Corriere della Sera" },
        { src: "/images/logos/sole24ore.svg", alt: "Il Sole 24 Ore" },
        { src: "/images/logos/forbes.svg", alt: "Forbes" },
      ],
    },

    // 3. Benefits
    {
      id: "programma",
      type: "benefits",
      layout: "grid-3",
      sectionTitle: "Cosa Imparerai in 4 Giorni",
      sectionSubtitle:
        "Un percorso pratico, non teoria. Alla fine dei 4 giorni avrai il tuo piano operativo in mano.",
      benefits: [
        {
          icon: "trending-up",
          title: "Analisi di Mercato",
          description:
            "Impara a leggere il mercato immobiliare italiano e identificare le opportunita' che il 95% delle persone non vede.",
        },
        {
          icon: "target",
          title: "Trovare l'Affare",
          description:
            "Il metodo collaudato per trovare immobili sotto il valore di mercato, aste giudiziarie e trattative private.",
        },
        {
          icon: "dollar-sign",
          title: "Finanziamento Creativo",
          description:
            "Come strutturare operazioni anche senza capitale iniziale: leva bancaria, saldo e stralcio, cessione del compromesso.",
        },
        {
          icon: "bar-chart",
          title: "Numeri che Contano",
          description:
            "Calcola il ROI di ogni operazione prima di investire un euro. Impara a fare i conti come un professionista.",
        },
        {
          icon: "shield",
          title: "Protezione Legale",
          description:
            "Tutti gli aspetti fiscali e legali che devi conoscere per operare in sicurezza e proteggere il tuo patrimonio.",
        },
        {
          icon: "users",
          title: "La Tua Prima Operazione",
          description:
            "Workshop pratico: alla fine dei 4 giorni avrai individuato e analizzato la tua prima operazione reale.",
        },
      ],
    },

    // 4. Speaker
    {
      id: "speaker-1",
      type: "speaker",
      name: "Alfio Bardolla",
      title: "Imprenditore, Autore Best-Seller, Investitore Immobiliare",
      bio: "Alfio Bardolla e' il fondatore della Alfio Bardolla Training Group S.p.A., societa' quotata in Borsa Italiana. Con oltre 15 anni di esperienza e piu' di 500.000 persone formate, e' il punto di riferimento in Italia per la formazione finanziaria e gli investimenti immobiliari. Ha personalmente chiuso centinaia di operazioni immobiliari e formato un team di professionisti che ti guidera' passo dopo passo durante il workshop.",
      photo: { src: "/images/alfio-bardolla.jpg", alt: "Alfio Bardolla" },
      credentials: [
        "Fondatore di ABTG S.p.A. — Quotata in Borsa Italiana",
        "500.000+ persone formate in 15 anni",
        "Autore di 9 libri best-seller sulla finanza personale",
        "Centinaia di operazioni immobiliari chiuse con successo",
        "Team di 20+ immobiliaristi professionisti",
      ],
    },

    // 5. Event Details
    {
      id: "dettagli",
      type: "event-details",
      eventName: "Missione Immobiliare",
      date: "21-24 Aprile 2026",
      dateISO: "2026-04-21T09:30:00+02:00",
      endDate: "24 Aprile 2026",
      location: "Online — Live Streaming",
      isOnline: true,
      agenda: [
        {
          time: "09:30",
          title: "GIORNO 1 — Le Fondamenta",
          description:
            "Mindset dell'investitore immobiliare + Come leggere il mercato",
        },
        {
          time: "09:30",
          title: "GIORNO 2 — Trovare l'Affare",
          description:
            "Aste, saldo e stralcio, trattative private, analisi dei numeri",
        },
        {
          time: "09:30",
          title: "GIORNO 3 — Strutturare l'Operazione",
          description:
            "Finanziamento, aspetti legali, fiscalita', protezione",
        },
        {
          time: "09:30",
          title: "GIORNO 4 — La Tua Prima Operazione",
          description:
            "Workshop pratico: analisi reale + piano d'azione personalizzato",
        },
      ],
      cta: { text: "Candidati per Partecipare", href: "#form" },
    },

    // 6. Testimonials
    {
      id: "testimonials-1",
      type: "testimonials",
      layout: "carousel",
      sectionTitle: "Hanno gia' Fatto la Loro Prima Operazione",
      testimonials: [
        {
          name: "Marco R.",
          role: "Imprenditore, Milano",
          quote:
            "Sono partito da zero e dopo il workshop ho chiuso la mia prima operazione in 3 mesi. ROI del 22% sul primo investimento. Il metodo funziona, punto.",
          rating: 5,
        },
        {
          name: "Giulia S.",
          role: "Impiegata, Roma",
          quote:
            "Pensavo servissero centinaia di migliaia di euro. Con le strategie di finanziamento creativo ho fatto la mia prima operazione con meno di 10.000 euro.",
          rating: 5,
        },
        {
          name: "Alessandro P.",
          role: "Libero Professionista, Torino",
          quote:
            "Il team di Alfio ti segue davvero. Non sei mai solo. Ho fatto 3 operazioni nel primo anno e ora ho un cash flow mensile stabile.",
          rating: 5,
        },
        {
          name: "Francesca M.",
          role: "Ex Manager, Napoli",
          quote:
            "Ho lasciato il mio lavoro da dipendente dopo 18 mesi. Le rendite immobiliari hanno superato il mio stipendio. Non e' magia, e' metodo.",
          rating: 5,
        },
      ],
    },

    // 7. FAQ
    {
      id: "faq-1",
      type: "faq",
      sectionTitle: "Domande Frequenti",
      items: [
        {
          question: "Il workshop e' davvero gratuito?",
          answer:
            "Si', Missione Immobiliare e' 100% gratuito. Lo facciamo perche' vogliamo che tu veda con i tuoi occhi la qualita' del nostro metodo. Non ci sono costi nascosti per partecipare ai 4 giorni.",
        },
        {
          question: "Perche' devo fare una chiamata di profilazione?",
          answer:
            "Vogliamo assicurarci che i 500 posti disponibili vadano a persone realmente motivate. La chiamata serve a capire il tuo livello attuale e personalizzare la tua esperienza durante il workshop.",
        },
        {
          question: "Serve esperienza nel settore immobiliare?",
          answer:
            "No, il workshop parte dalle basi. Che tu sia un principiante assoluto o che tu abbia gia' fatto qualche operazione, troverai valore. Il 70% dei partecipanti inizia da zero.",
        },
        {
          question: "Servono soldi da investire subito?",
          answer:
            "No. Il workshop ti insegna anche strategie di finanziamento creativo dove il capitale iniziale richiesto e' minimo. Imparerai a usare la leva e le strutture giuste.",
        },
        {
          question: "Come funziona il workshop online?",
          answer:
            "4 giorni consecutivi in live streaming. Potrai fare domande in tempo reale, partecipare agli esercizi pratici e interagire con il team. Le registrazioni saranno disponibili per un tempo limitato.",
        },
        {
          question: "Cos'e' Real Estate Evolution?",
          answer:
            "E' il nostro percorso completo per chi vuole fare sul serio: include il corso immobili (70+ video lezioni), il software Real Estate Pro per l'analisi delle operazioni, e 4 ore di coaching 1:1 con un immobiliarista del team. Ne parleremo durante il workshop.",
        },
      ],
    },

    // 8. Countdown (banner)
    {
      id: "countdown-banner",
      type: "countdown",
      targetDate: "2026-04-21T09:30:00+02:00",
      headline: "Il workshop inizia tra",
      subheadline:
        "Solo 500 posti disponibili. Una volta esauriti, non ci saranno eccezioni.",
      cta: { text: "Assicurati il Tuo Posto", href: "#form" },
      style: "banner",
    },

    // 9. HubSpot Form
    {
      id: "form",
      type: "hubspot-form",
      portalId: "YOUR_PORTAL_ID",
      formId: "YOUR_FORM_ID",
      sectionTitle: "Candidati per Missione Immobiliare",
      sectionSubtitle:
        "Compila il form e riceverai una chiamata di profilazione per verificare la tua ammissione. I posti sono limitati a 500.",
      sideContent: {
        type: "benefits",
        benefits: [
          "Workshop di 4 giorni 100% GRATUITO",
          "Alfio Bardolla + Team di Immobiliaristi",
          "Metodo testato su 1.200+ operazioni",
          "Piano d'azione personalizzato",
          "Solo 500 posti — Chiamata di profilazione",
          "Replay disponibile per tempo limitato",
        ],
      },
    },

    // 10. Countdown (floating)
    {
      id: "countdown-float",
      type: "countdown",
      targetDate: "2026-04-21T09:30:00+02:00",
      headline: "Posti rimasti:",
      cta: { text: "Candidati Ora", href: "#form" },
      style: "floating",
    },

    // 11. Footer
    {
      id: "footer-1",
      type: "footer",
      companyName: "Alfio Bardolla Training Group S.p.A.",
      companyInfo:
        "Societa' quotata su Euronext Growth Milan — Borsa Italiana. Sede legale: Via Marconi 1, 20121 Milano. P.IVA 05763550960. REA MI-1851789. Capitale sociale i.v. Euro 1.000.000.",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Cookie Policy", href: "/cookie" },
        { text: "Termini e Condizioni", href: "/termini" },
        { text: "Contatti", href: "/contatti" },
      ],
      disclaimers: [
        "Questo sito non fa parte del sito Facebook o Facebook Inc. Inoltre, questo sito NON e' approvato da Facebook in alcun modo. FACEBOOK e' un marchio registrato di FACEBOOK, Inc.",
        "I risultati possono variare e dipendono da molti fattori tra cui impegno, situazione finanziaria di partenza, condizioni di mercato ed esperienza. Non garantiamo che otterrai gli stessi risultati dei nostri testimonial. Le testimonianze rappresentano esperienze individuali e non costituiscono garanzia di risultati futuri.",
        "© 2026 Alfio Bardolla Training Group S.p.A. — Tutti i diritti riservati. Societa' quotata su Euronext Growth Milan.",
      ],
    },
  ],
};

// Template registry for API lookups
export const templateRegistry: Record<string, PageConfig> = {
  event: eventRegistrationTemplate,
  "course-sales": courseSalesTemplate,
  webinar: webinarTemplate,
  "lead-magnet": leadMagnetTemplate,
  "thank-you": thankYouTemplate,
  "missione-immobiliare": missioneImmobiliareTemplate,
};
