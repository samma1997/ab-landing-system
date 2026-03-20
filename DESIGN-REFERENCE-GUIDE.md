# Landing Page Design Reference Guide
## Italian Financial Education / Business Coaching Vertical

> Documento di riferimento per il sistema di generazione landing page.
> Aggiornato: Marzo 2026

---

## INDICE

1. [Visual Style Presets](#1-visual-style-presets)
2. [Animation Philosophy](#2-animation-philosophy)
3. [Reference Site Analysis Framework](#3-reference-site-analysis-framework)
4. [Landing Page Anatomy](#4-landing-page-anatomy)
5. [Do's and Don'ts](#5-dos-and-donts)

---

## 1. VISUAL STYLE PRESETS

### PRESET A — Bold / Corporate

**Identita:** Autorevolezza istituzionale. Trasmette solidita, fiducia, esclusivita business. Adatto per programmi ad alto ticket, masterclass premium, corsi di investimento.

#### Palette Colori

```
Primary Background:    #0A0A0F   (nero profondo, non puro)
Secondary Background:  #111118   (variante per sezioni alternate)
Surface:               #1A1A24   (card, container)
Accent Primary:        #C9A84C   (oro saturo, non giallo)
Accent Secondary:      #E8C96B   (oro chiaro per hover/glow)
Accent Tertiary:       #8B6914   (oro scuro per bordi/divisori)
Text Primary:          #F5F5F0   (bianco caldo)
Text Secondary:        #A8A8A0   (grigio caldo, per body)
Text Muted:            #5C5C58   (placeholder, note)
Danger/Warning:        #C0392B   (rosso per urgenza)
Success:               #27AE60   (verde per conferme)
```

#### Font Pairing

```
Headline:    Playfair Display (700, 800) — serif, autorevole, editoriale
Subheading:  Montserrat (600, 700) — sans-serif, pulito
Body:        Inter (400, 500) — massima leggibilita
Accent/CTA:  Montserrat (700, uppercase, letter-spacing: 0.08em)
Numbers:     Oswald (600) — per statistiche, countdown, prezzi
```

#### Button Styles

```css
/* Primary CTA */
background: linear-gradient(135deg, #C9A84C, #E8C96B);
color: #0A0A0F;
font-family: Montserrat, sans-serif;
font-weight: 700;
font-size: 1rem;
letter-spacing: 0.08em;
text-transform: uppercase;
padding: 18px 48px;
border-radius: 4px;
border: none;
box-shadow: 0 4px 24px rgba(201, 168, 76, 0.35);
transition: all 0.25s ease;

/* Primary CTA Hover */
box-shadow: 0 8px 32px rgba(201, 168, 76, 0.55);
transform: translateY(-2px);

/* Secondary CTA */
background: transparent;
border: 1.5px solid #C9A84C;
color: #C9A84C;
/* stessi padding/font del primary */

/* Ghost / Tertiary */
background: transparent;
border: 1px solid rgba(245, 245, 240, 0.2);
color: #F5F5F0;
```

#### Section Backgrounds

```
Hero:              #0A0A0F con subtle radial gradient oro in basso a sinistra
Sezioni alternate: #111118 / #0A0A0F (mai stesso colore di fila)
Card:              #1A1A24 con border 1px solid rgba(201,168,76,0.15)
Dividers:          linear-gradient(90deg, transparent, #C9A84C30, transparent)
Noise overlay:     opacity 0.03-0.05, aggiunge texture organica
```

#### Animation Intensity: **BASSA**
Movimenti lenti, deliberati. Fade-in a 60-80% opacita, poi a 100%. Nessun bounce. Nessun effetto "WOW" esplicito.

---

### PRESET B — Clean / Modern

**Identita:** Fiducia professionale, approccio consulenziale, educazione seria. Adatto per corsi B2B, formazione manageriale, percorsi di mindset/leadership.

#### Palette Colori

```
Primary Background:    #FFFFFF
Secondary Background:  #F8F8FC   (off-white leggermente violaceo)
Surface:               #F0F0F8   (card background)
Accent Primary:        #1A1A2E   (navy quasi-nero)
Accent Secondary:      #4A4AFF   (blu elettrico per highlights)
Accent Tertiary:       #7C7CFF   (viola-blu per gradienti)
Text Primary:          #0D0D1A   (quasi nero)
Text Secondary:        #4A4A6A   (grigio-viola)
Text Muted:            #9090A8   (placeholder)
Highlight:             #FFE566   (giallo per sottolineature, sparingly)
Success:               #00C896
```

#### Font Pairing

```
Headline:    Fraunces (700, 900) — serif contemporaneo, caldo ma autorevole
Subheading:  DM Sans (600) — geometrico, moderno
Body:        DM Sans (400) — coerente con subheading
Accent:      DM Mono (500) — per numeri, statistiche, codici promozionali
```

#### Button Styles

```css
/* Primary CTA */
background: #1A1A2E;
color: #FFFFFF;
font-family: DM Sans, sans-serif;
font-weight: 600;
font-size: 1rem;
padding: 16px 44px;
border-radius: 8px;
border: none;
transition: all 0.2s ease;

/* Primary CTA Hover */
background: #4A4AFF;
transform: translateY(-1px);
box-shadow: 0 8px 24px rgba(74, 74, 255, 0.25);

/* Secondary */
background: transparent;
border: 2px solid #1A1A2E;
color: #1A1A2E;
border-radius: 8px;
```

#### Section Backgrounds

```
Hero:              Bianco puro con forma geometrica astratta in background (opacity 0.04)
Sezioni alternate: #F8F8FC / #FFFFFF
Card:              #FFFFFF con shadow: 0 2px 16px rgba(0,0,0,0.06)
Accent sections:   #1A1A2E testo bianco (usare max 1-2 volte nella pagina)
```

#### Animation Intensity: **MEDIA-BASSA**
Slide-up puliti (translateY 20px → 0), fade sincronizzati, stagger sugli elenchi. Zero parallax aggressivo.

---

### PRESET C — Dynamic / Energy

**Identita:** Motivazione, trasformazione rapida, risultati visibili. Adatto per corsi di trading attivo, mindset intensivo, programmi di 90 giorni, eventi live.

#### Palette Colori

```
Primary Background:    #0D0D0D   (nero assoluto)
Secondary Background:  #141414
Surface:               #1E1E1E
Accent Primary:        #FF3B3B   (rosso intenso, non coral)
Accent Secondary:      #FF6B00   (arancio per gradienti)
Accent Tertiary:       #FFD700   (giallo puro per highlight)
Text Primary:          #FFFFFF
Text Secondary:        #CCCCCC
Gradient Hero:         linear-gradient(135deg, #FF3B3B, #FF6B00)
Gradient Accent:       linear-gradient(90deg, #FF6B00, #FFD700)
```

#### Font Pairing

```
Headline:    Anton (400) — condensed, impatto massiccio
Subheading:  Barlow Condensed (700) — pulito ma energico
Body:        Barlow (400, 500) — coerente con subheading
CTA:         Barlow Condensed (700, uppercase)
Numbers:     Anton (400) — per statistiche, countdown
```

#### Button Styles

```css
/* Primary CTA */
background: linear-gradient(135deg, #FF3B3B, #FF6B00);
color: #FFFFFF;
font-family: Barlow Condensed, sans-serif;
font-weight: 700;
font-size: 1.1rem;
letter-spacing: 0.05em;
text-transform: uppercase;
padding: 20px 52px;
border-radius: 4px;
border: none;
box-shadow: 0 4px 32px rgba(255, 59, 59, 0.45);

/* Hover */
box-shadow: 0 8px 48px rgba(255, 59, 59, 0.65);
transform: scale(1.02);

/* Secondary */
background: transparent;
border: 2px solid #FF3B3B;
color: #FF3B3B;
```

#### Section Backgrounds

```
Hero:              Nero con gradient overlay rosso-arancio in un angolo
Stats:             #FF3B3B puro — sezione breve e intensa
Testimonianze:     #141414
Feature:           Nero con linee sottili rosse come griglia di sfondo (opacity 0.08)
```

#### Animation Intensity: **ALTA**
Counter animati per le stats, slide-in laterali veloci, pulsazione sottile sul CTA, scroll velocity effects (non parallax).

---

### PRESET D — Premium / Luxury

**Identita:** Esclusivita assoluta, membership riservata, coaching 1:1 ad alto ticket. Adatto per programmi >5.000 EUR, mastermind privati, inner circle.

#### Palette Colori

```
Primary Background:    #080808   (nero ultra-profondo)
Secondary Background:  #0F0F0F
Surface:               #161616
Accent Primary:        #B8860B   (oro antico, DarkGoldenrod)
Accent Secondary:      #DAA520   (oro classico)
Accent Tertiary:       #F0E68C   (crema dorata per testi highlight)
Silver Accent:         #C0C0C0   (argento per elementi secondari)
Text Primary:          #F8F4E8   (bianco avorio)
Text Secondary:        #8A8070   (grigio-dorato)
Text Muted:            #4A4035
Border:                rgba(184, 134, 11, 0.2)
```

#### Font Pairing

```
Headline:    Cormorant Garamond (700) — serif alto lusso, editoriale
Subheading:  Libre Baskerville (700) — serif complementare
Body:        Cormorant Garamond (400) — coerente, elegante
Small caps:  Montserrat (500, letter-spacing: 0.15em, uppercase) — per label/badge
Numbers:     Cormorant Garamond (600, italic) — per prezzi, statistiche
```

#### Button Styles

```css
/* Primary CTA */
background: transparent;
border: 1px solid #B8860B;
color: #DAA520;
font-family: Montserrat, sans-serif;
font-weight: 500;
font-size: 0.85rem;
letter-spacing: 0.15em;
text-transform: uppercase;
padding: 18px 52px;
border-radius: 0; /* nessun arrotondamento */
transition: all 0.4s ease;
position: relative;

/* Hover: fill gold */
background: #B8860B;
color: #080808;

/* Filled variant (per sezioni scure) */
background: linear-gradient(135deg, #B8860B, #DAA520);
color: #080808;
font-weight: 700;
```

#### Section Backgrounds

```
Hero:              Nero con texture sottilissima (grain/noise 2-3% opacity)
Divider:           Linea orizzontale 1px, gradient oro che sfuma ai lati
Quote sections:    Nero con serif large (opacity 0.04) come watermark decorativo
CTA finale:        Background con pattern geometrico molto sottile in oro
```

#### Animation Intensity: **MINIMA**
Fade lentissimi (0.8-1.2s), zero bounce, zero scale. Solo opacita e lievi traslazioni verticali (8-12px). Cursor personalizzato opzionale.

---

## 2. ANIMATION PHILOSOPHY

### Cosa rende un'animazione premium vs economica

**Premium:**
- Easing cubico personalizzato, mai `ease` di default
- Durate tra 400ms e 900ms per la maggior parte degli elementi
- Un solo tipo di movimento per elemento (solo fade, o solo slide, mai entrambi insieme senza ragione)
- Le animazioni *iniziano* prima che l'utente se ne accorga (viewport trigger anticipato)
- Ogni elemento si muove come se avesse *peso* — accelera e decelera naturalmente
- Stagger tra elementi correlati: 60-100ms di delay tra ogni item di una lista
- Le animazioni *smettono* quando non servono (reduced-motion respected)

**Economico / Pacchiano:**
- `animation: bounce 1s infinite` su qualsiasi CTA
- Parallax esagerato che rompe la lettura
- Elementi che tremano, pulsano, girano senza motivo
- Animazioni che rallentano il rendering (box-shadow animato su scroll)
- Testo che appare lettera per lettera (typewriter) su body copy
- Counter animati su numeri senza senso ("238 clienti soddisfatti" — chi lo conta?)
- Transizioni con durata >1.5s su interazioni utente

---

### Regole di Timing e Easing

#### Curva di easing raccomandata

```css
/* Per elementi che entrano in scena */
--ease-in-view: cubic-bezier(0.16, 1, 0.3, 1);   /* spring morbido */

/* Per hover states */
--ease-hover: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Per elementi che escono */
--ease-out: cubic-bezier(0.7, 0, 1, 0.6);

/* Per modali e overlay */
--ease-overlay: cubic-bezier(0.22, 1, 0.36, 1);
```

#### Durate per tipo di elemento

```
Fade-in testo:          500-650ms
Slide-up card:          600-750ms
Hover button:           180-250ms
Modal/Drawer open:      350-450ms
Modal close:            200-280ms
Counter animate:        1200-2000ms (con easeOut)
Stagger delay offset:   60-120ms per item
Scroll-linked:          Nessuna durata, dipende da scroll velocity
Page transition:        300-400ms max
```

---

### Quando usare movimento vs quando tenerlo statico

**USA IL MOVIMENTO:**
- Primo ingresso in viewport di sezioni hero e CTA principali
- Stagger list items (benefit, features, testimonial card)
- Hover su card interattive
- Progress/risultati numerici (counter)
- Notifiche di urgenza (countdown timer)
- Micro-interazioni su form (focus, validation, success)

**TIENI STATICO:**
- Testo body durante lo scroll — non animare mai il body copy
- Navigation bar (deve essere sempre visibile e stabile)
- Elementi sopra la fold che sono gia visibili al caricamento
- Footer
- Qualsiasi elemento che appare piu di 3 volte nella pagina (ripetizione + animazione = rumore)
- Immagini/video in background

---

### Il Principio "Less is More"

**Regola del 3:** In ogni sezione possono avere animazioni al massimo 3 elementi distinti. Se ne hai di piu, scegli quelli con il maggiore impatto narrativo.

**Regola della gerarchia:** L'animazione piu vistosa va sul CTA principale, non sui titoli o le immagini.

**Regola del silenzio:** Una sezione completamente statica tra due sezioni animate aumenta il peso percepito di quelle animate. Usala consapevolmente.

**Regola della coerenza:** Se scegli slide-up come pattern di ingresso, usalo per tutti gli elementi in ingresso. Non mescolare slide-up con slide-left con fade — crea rumore visivo.

---

## 3. REFERENCE SITE ANALYSIS FRAMEWORK

Quando ricevi un sito di riferimento da analizzare, segui questo framework strutturato:

### Step 1 — Color Palette Extraction

**Processo:**
1. Apri DevTools (F12) → Elements → seleziona body, header, CTA
2. Identifica: colore dominante del background, colore accent primario, colore testo
3. Nota il rapporto cromatico approssimativo: 60% base / 30% secondario / 10% accent
4. Cerca se esiste un gradient e annota start/end color
5. Salva i valori hex esatti (non stime visive)

**Domande da porsi:**
- Il contrasto testo/background supera 4.5:1 (WCAG AA)?
- Il colore accent e usato con parsimonia o ovunque?
- C'e un colore di urgenza/warning separato (spesso rosso o arancio)?
- Il colore dell'hover button e una variazione del primario o un colore diverso?

---

### Step 2 — Animation Patterns Identification

**Checklist di osservazione:**
- [ ] Cosa succede al primo caricamento? (fade, slide, nulla)
- [ ] Come entrano gli elementi in viewport? (Intersection Observer pattern)
- [ ] Quanto dura l'animazione di un card che entra? (misura con DevTools → Performance tab)
- [ ] C'e stagger tra elementi simili o entrano tutti insieme?
- [ ] Le animazioni hover sono immediate o hanno delay?
- [ ] Il CTA ha un effetto speciale (pulsazione, glow, shimmer)?
- [ ] C'e scroll-linked animation (parallax, progress bar, sticky reveals)?
- [ ] Vengono usate CSS animations, GSAP, Framer Motion, o AOS?

**Come identificare la libreria usata:**
- Network tab → cerca gsap.min.js, framer-motion, AOS, anime.js
- Elements tab → cerca classi `aos-animate`, `framer-`, `gsap-`

---

### Step 3 — Layout Structure Analysis

**Mappa da estrarre:**

```
[ HEADER ]
  - Logo position (left/center)
  - Nav items count
  - CTA in header? (text/button)
  - Sticky o no?

[ HERO ]
  - Layout: full-width / centered / split (text + image)
  - Aspect ratio approssimativo
  - Background: color / image / video
  - Headline: quante righe? font size approssimativo?
  - Subheadline: presente? lunghezza?
  - CTA count: 1 o 2?

[ SEZIONE SUCCESSIVA ]
  - Distanza dal hero (padding/spazio bianco)
  - Tipo: social proof / features / video / testimonial
  - Grid: 2 col / 3 col / full-width

[...continua per ogni sezione...]
```

**Misura le proporzioni di spazio:**
- Max-width del contenuto principale
- Padding laterale su desktop e mobile
- Spazio verticale tra sezioni (section padding)
- Aspect ratio dei media

---

### Step 4 — Typography Analysis

**Parametri da rilevare:**

```
Headline H1:
  - Font family (inspect element → font-family)
  - Font weight
  - Font size (px o rem)
  - Line height
  - Letter spacing

Body text:
  - Font family (spesso diverso dall'heading)
  - Font size (solitamente 16-18px)
  - Line height (solitamente 1.6-1.8)
  - Max-width del paragrafo (per leggibilita: 65-75 caratteri)

CTA text:
  - Maiuscolo o misto?
  - Letter spacing (spesso 0.05-0.1em per uppercase)
  - Font weight

Gerarchia:
  - Quanti livelli di heading vengono usati? (H1, H2, H3)
  - Il rapporto di scala tra H1 e H2? (solitamente 1.2-1.5x)
```

---

### Step 5 — Micro-Interactions Catalog

**Lista di check interazioni:**

```
HOVER:
[ ] Button: colore / shadow / transform
[ ] Card: lift (translateY) / border / shadow
[ ] Link: underline / color change / arrow slide
[ ] Image: scale / overlay / blur

FORM:
[ ] Input focus: border color / glow / label float
[ ] Validation error: shake / border red / icon
[ ] Submit success: fade-out form / show message

SCROLL:
[ ] Sticky nav: compare con background / shadow
[ ] Progress indicator: barra o niente
[ ] Back-to-top: quando appare

SPECIAL:
[ ] Cursor personalizzato?
[ ] Magnetic buttons?
[ ] Text scramble / reveal?
[ ] Number counter?
```

---

## 4. LANDING PAGE ANATOMY

### Flusso Ideale — High-Converting Financial Education LP

```
1. ABOVE THE FOLD (Hero)
2. TRUST BAR (Loghi media, certificazioni, numeri)
3. PROBLEM STATEMENT
4. SOLUTION REVEAL
5. SOCIAL PROOF PRIMARIA (Video testimonial o quote impattante)
6. FEATURES / COSA OTTIENI
7. RISULTATI / TRASFORMAZIONE
8. TESTIMONIALS (multiple, con foto reale)
9. CHI E IL FORMATORE (Authority section)
10. PRICING / OFFERTA
11. GARANZIA
12. FAQ
13. FINAL CTA
```

---

### Sezione 1 — HERO (Above the Fold)

**Variante A: Centered Hero**
```
[LOGO o nav minimalista]

[Badge: "Il programma che ha formato 12.000+ imprenditori"]

[H1: Headline trasformativa — 2-3 righe max]
[H2: Subheadline — 1 riga, specifica il meccanismo]

[CTA PRIMARY] [CTA SECONDARY: "Scopri come"]

[Social proof inline: "★★★★★ · 4.9/5 da 2.847 studenti"]
```
Ideale per: Preset A (Bold/Corporate), Preset D (Luxury)

**Variante B: Split Hero (50/50)**
```
[LEFT: Testo + CTA]             [RIGHT: Immagine formatore / video]

[Badge]
[H1]
[Subheadline]
[Benefit bullets: 3 righe max]
[CTA PRIMARY]
                                 [Video con play button o immagine con
                                  recensione overlay in basso]
```
Ideale per: Preset B (Clean/Modern), con foto del formatore

**Variante C: Full-Screen Video/Media Hero**
```
[Background: video muted autoplay O immagine con overlay scuro 60%]

[Centro pagina — testo centrato]
[Badge]
[H1: breve e impattante — 1-2 righe]
[Subheadline]
[CTA]
```
Ideale per: Preset C (Dynamic/Energy), eventi dal vivo

---

### Sezione 2 — TRUST BAR

**Variante A: Loghi Media**
```
[Label: "Come visto su" o "Featured in"]
[Logo 1] [Logo 2] [Logo 3] [Logo 4] [Logo 5]
```
Sfondo: leggermente diverso dall'hero. Altezza: 80-100px max.

**Variante B: Numeri chiave**
```
[12.000+          |  97%              |  8 anni           |  €2.4M]
[Studenti formati |  Tasso soddisfaz. |  di esperienza    |  generati dagli alumni]
```
Con counter animato se presente Preset C.

**Variante C: Ibrido (numeri + badge certificazione)**
```
[Numeri a sinistra] + [Badge certificazioni a destra]
```

---

### Sezione 3 — PROBLEM STATEMENT

**Variante A: Agitazione Empatica**
```
[H2: "Riconosci questa situazione?"]
[Lista di pain points con icona X o bullet rosso:]
  - "Lavori 60 ore a settimana ma non riesci a scalare"
  - "Hai provato corsi online ma non hai visto risultati concreti"
  - "Non sai come gestire il tuo denaro per farlo crescere"
[Transizione: "Non e colpa tua. Il problema e..."]
```

**Variante B: Contrasto Prima/Dopo**
```
[2 colonne]
[PRIMA (grigio, triste)]    [DOPO (colorato, energico)]
Lista negative              Lista positive trasformative
```

**Variante C: Narrativa (Storytelling)**
```
[Paragrafo che racconta la storia del target — scritto in prima persona]
[Citazione del formatore che dice "Anch'io ero in quella situazione"]
[Bridge verso la soluzione]
```

---

### Sezione 4 — SOLUTION REVEAL

**Variante A: Presentazione del Metodo**
```
[H2: "Presentiamo [Nome Metodo/Sistema]"]
[Sottotitolo: cosa fa, come funziona, perche e diverso]
[3 colonne: Pillar 1 | Pillar 2 | Pillar 3]
[ogni pillar: icona + titolo + 2 righe descrizione]
```

**Variante B: Step-by-Step**
```
[H2: "Come funziona in 3 passi"]
[Step 1 → Step 2 → Step 3]
[connessi da linea/freccia, ognuno con numero grande, titolo, descrizione]
```

**Variante C: Video Spiegazione**
```
[H2: "Guarda come funziona"]
[Video embed centrato, 16:9, con thumbnail custom]
[Sotto il video: CTA + nota breve]
```

---

### Sezione 5 — FEATURES / COSA OTTIENI

**Variante A: Grid di Moduli**
```
[H2: "Cosa include il programma"]
[Grid 3x2 o 4x2 di card:]
  [Icona] [Titolo Modulo]
  [2-3 righe descrizione]
  [Badge: "Valore: €497"]
```

**Variante B: Lista con Preview Visiva**
```
[Left: Lista di feature clickable]     [Right: Preview/screenshot che cambia]
- Feature 1 (selezionata, highlighted)  [immagine corrispondente]
- Feature 2
- Feature 3
```
Richiede interattivita JS, alto impatto.

**Variante C: Accordion Feature List**
```
[H2: "Tutto quello che ottieni"]
[Accordion espandibile:]
  [+] Modulo 1: Nome — descrizione lunga nascosta
  [+] Modulo 2: Nome
  ...
```
Utile per programmi con molti contenuti, mantiene la pagina compatta.

---

### Sezione 6 — TESTIMONIALS

**Variante A: Quote Card Grid**
```
[H2: "Cosa dicono i nostri studenti"]
[Grid 3 colonne:]
  [Foto] [Nome, ruolo]
  [★★★★★]
  ["Citazione di 2-3 righe con risultato specifico e misurabile"]
```
Regola: ogni testimonial deve contenere un risultato numerico.

**Variante B: Testimonial Slider/Carousel**
```
[Frecce < >]
[Card grande centrata con foto grande, nome, testo lungo]
[Dot indicators]
```
Usare con moderazione — gli slider riducono la visibilita del contenuto.

**Variante C: Video Testimonial Wall**
```
[Grid di thumbnail video 3x2]
[Al hover: play icon sovrapposta]
[Al click: lightbox con video]
```
Massimo impatto sulla credibilita. Richiede video reali di alta qualita.

---

### Sezione 7 — PRICING / OFFERTA

**Variante A: Single Offer (High-Ticket)**
```
[H2: "Unisciti al programma"]
[Box centrato, 60-70% width:]
  [Nome programma]
  [Lista benefit (what you get)]
  [Prezzo originale barrato: €2.997]
  [Prezzo attuale: €997]
  [Risparmio badge: "Risparmi €2.000"]
  [CTA PRIMARY]
  [Note: "Pagamento sicuro · Garanzia 30 giorni"]
```

**Variante B: Tiered Pricing (2-3 opzioni)**
```
[3 colonne: Base | Professional (highlighted) | Elite]
[Colonna centrale piu grande, con badge "Piu scelto"]
[Prezzo, lista feature, CTA per ognuna]
```

**Variante C: Application-Only (Ultra High-Ticket)**
```
[H2: "Il programma non e per tutti"]
[Testo che pre-qualifica il candidato]
[Lista: "Questo programma e per te se..."]
[CTA: "Fai domanda ora" → porta a form di candidatura]
[Nessun prezzo visibile — call to qualify]
```

---

### Sezione 8 — FAQ

**Variante A: Accordion Standard**
```
[H2: "Hai domande? Abbiamo le risposte"]
[Accordion 6-10 domande]
Ordine consigliato:
  1. Per chi e adatto questo programma?
  2. Quanto tempo richiede alla settimana?
  3. Funziona anche se sono alle prime armi?
  4. Come funziona la garanzia?
  5. Posso pagare a rate?
  6. Quando inizio dopo l'acquisto?
```

**Variante B: 2-colonne FAQ**
```
[Left: 5 FAQ]    [Right: 5 FAQ]
```
Piu compatto visivamente per pagine lunghe.

**Variante C: FAQ + Chat/Support**
```
[Accordion FAQ]
[Sotto: "Non hai trovato la risposta? Scrivici" → link WhatsApp/chat]
```

---

### Sezione 9 — FINAL CTA

**Variante A: Urgency-Based**
```
[H2: "Mancano solo [X] posti disponibili"]
[Countdown timer se c'e una scadenza reale]
[Lista: "Iscrivendoti oggi ottieni anche:"]
  - Bonus 1 + valore
  - Bonus 2 + valore
[CTA PRIMARY grande]
[Payment security badges]
```

**Variante B: Emotional Close**
```
[H2: "Immagina tra 12 mesi..."]
[Paragrafo descrittivo della vita trasformata]
[Citazione motivazionale del formatore]
[CTA PRIMARY]
```

**Variante C: Guarantee-First**
```
[Icona scudo / certificato]
[H2: "Garanzia soddisfatti o rimborsati 30 giorni"]
[Testo garanzia chiaro e semplice]
[CTA PRIMARY]
[Nota: nessun rischio, nessuna domanda]
```

---

## 5. DO'S AND DON'TS

### DO: Regole Fondamentali

**Tipografia**
- Usa massimo 2 font nella stessa pagina (uno serif per titoli, uno sans per body)
- La dimensione minima del body su desktop e 17px, su mobile 16px
- Line-height del body: sempre tra 1.6 e 1.8
- I titoli H1 su desktop non superano mai i 72px (eccezione: hero a piena pagina)
- Usa `font-feature-settings: "kern" 1` per coppie di lettere ottimizzate
- Letter-spacing positivo solo su testo UPPERCASE e SMALL CAPS, mai su body
- Massa testuale: paragrafi max 65-75 caratteri di larghezza (usa `max-width: 65ch`)

**Colori**
- Regola 60/30/10: 60% colore base, 30% secondario, 10% accent
- L'accent viene usato SOLO su: CTA primario, numeri chiave, parole di enfasi
- Non usare mai piu di 3 colori distinti in una singola sezione
- Il contrasto testo/background: minimo 4.5:1 per body (WCAG AA), 7:1 per testi piccoli
- Se hai un gradient come accent, non aggiungerci altri pattern sopra

**Layout e Spazio**
- Ogni sezione ha un unico obiettivo comunicativo — non mescolare messaggi
- Lo spazio bianco e un elemento di design, non uno spreco
- Il max-width del contenuto principale: 1200-1280px su desktop
- Padding verticale tra sezioni: 80-120px desktop, 60px mobile
- Le grid di card usano gap proporzionale: se card = 300px, gap = 24-32px

**CTA**
- Un solo CTA primario per viewport visibile
- Il testo del CTA deve descrivere l'azione e il beneficio: "Accedi al programma" > "Clicca qui"
- Il CTA ripetuto in pagina usa sempre lo stesso testo (coerenza)
- Il CTA secondario (ghost) deve avere chiaro contrasto col primario ma non competere

**Immagini e Media**
- Foto del formatore: sempre alta qualita, luce professionale, sfondo neutro
- Le testimonianze hanno sempre foto reale — mai avatar generici
- I video hanno sempre una thumbnail custom, mai il frame di default
- Le immagini di sfondo hanno sempre un overlay per garantire leggibilita del testo sopra

---

### DON'T: Cosa evitare (alias "come non fare pacchiano")

**Tipografia — errori comuni**
- Non usare Papyrus, Comic Sans, o font display per il body
- Non mescolare 3+ famiglie font nella stessa pagina
- Non usare testo colorato (rosso, giallo, arancio) sul body — solo su highlight brevi
- Non centrare paragrafi lunghi — il testo centrato e leggibile solo su 1-2 righe
- Non usare font size < 14px per qualsiasi testo visibile (incluse note legali)
- Non animare il testo con typewriter effect sul body copy

**Colori — errori comuni**
- Non usare gradient su gradient (es. testo gradient su background gradient)
- Non usare verde e rosso come unici differenziatori — problema per daltonici
- Non usare nero puro (#000000) come background — usa #080808 o #0A0A0F
- Non usare bianco puro (#FFFFFF) su sfondi neri — abbassa il contrasto percepito del testo
- Non avere piu di 5 colori distinti visibili contemporaneamente nella pagina
- Il rosso non e un colore di brand — e un colore di urgenza/warning. Usarlo come primario richiede gestione molto accurata

**Animazioni — errori comuni**
- Non animare MAI il resize del font (font-size transition) — rompe il layout
- Non usare `animation: pulse 2s infinite` su CTA — fa sembrare spam
- Non aggiungere animazione a hover su testo body — confonde
- Non usare parallax su testo — rende illeggibile durante lo scroll
- Non animare piu di 5 elementi contemporaneamente nella stessa sezione
- Non usare bounce easing su elementi business — sembrano giocosi, non professionali
- Non usare animazioni con durata > 1.5s su interazioni utente (click, hover)

**Layout — errori comuni**
- Non avere piu di 2 CTA primari nello stesso viewport
- Non usare card con 5+ varianti di dimensione nella stessa grid
- Non mettere testo su immagine senza overlay — contrasto insufficiente
- Non usare slider/carousel come sezione principale di trust — nasconde contenuto
- Non avere sezioni con altezza < 200px intercalate a sezioni da 800px — ritmo rotto
- Non centrare tutto — la centratura e appropriata per hero e CTA, non per feature list o body

**Credibilita — errori che distruggono la fiducia**
- Non usare stock photo generiche come testimonianze (volti sorridenti senza contesto)
- Non scrivere testimonial in prima persona senza nome e foto reale
- Non inventare urgenza falsa (countdown che si resetta) — gli utenti lo riconoscono
- Non nascondere il prezzo — nella financial education il prezzo e un filtro di qualita
- Non usare "*" con note legali non chiaramente leggibili
- Non usare loghi di media falsi o non verificabili nella trust bar
- Non dichiarare risultati senza disclaimer legale chiaro (obbligatorio nel settore)

---

### Regola Finale: Il Test dello "Schermo a Meta"

Prima di approvare un design, guardalo a meta schermo e chiediti:

1. E chiaro COSA viene offerto?
2. E chiaro A CHI e rivolto?
3. Si vede dove cliccare?
4. Si vede perche dovrei fidarmi?
5. Si vede perche devo agire ADESSO?

Se una di queste risposte non e evidente entro 5 secondi, il design ha un problema di gerarchia, non di estetica.

---

## APPENDICE — Token di Riferimento Rapido

### Spacing Scale

```css
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  24px
--space-6:  32px
--space-7:  48px
--space-8:  64px
--space-9:  80px
--space-10: 96px
--space-11: 120px
--space-12: 160px
```

### Type Scale (Major Third, 1.25 ratio)

```css
--text-xs:   0.64rem  /* 10.24px */
--text-sm:   0.8rem   /* 12.8px */
--text-base: 1rem     /* 16px */
--text-md:   1.25rem  /* 20px */
--text-lg:   1.563rem /* 25px */
--text-xl:   1.953rem /* 31px */
--text-2xl:  2.441rem /* 39px */
--text-3xl:  3.052rem /* 49px */
--text-4xl:  3.815rem /* 61px */
--text-5xl:  4.768rem /* 76px */
```

### Border Radius Scale

```css
/* Corporate/Luxury: */
--radius-sm: 2px
--radius-md: 4px
--radius-lg: 8px

/* Modern/Clean: */
--radius-sm: 6px
--radius-md: 12px
--radius-lg: 20px
--radius-full: 9999px

/* Dynamic/Energy: */
--radius-sm: 2px
--radius-md: 4px  /* quasi piatto */
--radius-full: 9999px  /* per badge/pill */
```

### Shadow Scale

```css
/* Light theme (Preset B) */
--shadow-sm: 0 1px 4px rgba(0,0,0,0.06);
--shadow-md: 0 4px 16px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
--shadow-xl: 0 16px 64px rgba(0,0,0,0.16);

/* Dark theme con glow oro (Preset A/D) */
--glow-sm: 0 2px 12px rgba(201,168,76,0.2);
--glow-md: 0 4px 24px rgba(201,168,76,0.3);
--glow-lg: 0 8px 48px rgba(201,168,76,0.45);
```

---

*Fine documento — Design Reference Guide v1.0*
*Prossimo aggiornamento: dopo analisi di 3+ siti di riferimento reali*
