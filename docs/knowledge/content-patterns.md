# ABTG Content Patterns
**How Alfio Bardolla Training Group structures copy and content**
Version: 1.0 — March 2026

---

## 1. PDF Content Structure (What ABTG sends)

When ABTG provides a PDF for a new landing page, it typically contains these sections in roughly this order:

### Standard PDF Sections

| Section Name in PDF | Maps To | Notes |
|---|---|---|
| Titolo evento / nome corso | Hero `headline` | Often already punchy, use verbatim |
| Sottotitolo / promessa | Hero `subheadline` | Sometimes needs tightening |
| Date e luogo | EventDetails block | Watch for timezone info |
| Di cosa si tratta | Benefits block | Usually 3-6 bullets |
| Cosa imparerai / programma | NumberedPhases or ChecklistSection | Often in list format |
| Chi è Alfio Bardolla | SpeakerSection | Bio text already written |
| Testimonianze | TestimonialSection | Names + cities always included |
| Domande frequenti | FAQSection | 4-8 questions, answers sometimes brief |
| Prezzo / offerta | PricingSection | Sometimes only for paid events |
| Come iscriversi | HubSpotForm or StripeCheckout | Form ID provided separately |
| Note legali | FooterSection | Always present |

### What Is Never in the PDF (Claude Must Generate or Ask)

- HubSpot form ID and portal ID (ask user)
- Facebook Pixel ID (ask user or check registry.json)
- Countdown end date formatted as ISO string
- Image paths (check bank first, use placeholder if not found)
- Page slug (derive from event name)
- Meta title and description (generate from headline + date)

---

## 2. Headline Patterns

ABTG headlines follow recognizable formulas. Use these when the PDF headline is weak or missing.

### Formula 1 — Transformation Promise
```
[Benefit] [anche se/senza] [common objection]
```
Examples:
- "Investi nel mattone anche se non hai capitali enormi"
- "Fai trading redditizio senza stare incollato ai grafici tutto il giorno"
- "Raggiungi l'indipendenza finanziaria anche partendo da zero"

### Formula 2 — Event-Specific Urgency
```
[Workshop/Evento] GRATUITO: [specific promise] — [scarcity]
```
Examples:
- "Workshop GRATUITO: Scopri come guadagnare con il mercato immobiliare — Solo 50 posti"
- "Webinar GRATUITO: I 3 errori che bloccano i nuovi trader — Mercoledì 30 Aprile"

### Formula 3 — Authority + Result
```
Il metodo [di/usato da] [authority figure] per [result]
```
Examples:
- "Il metodo usato da Alfio Bardolla per acquisire 47 immobili"
- "La stessa strategia che ha trasformato 100.000 italiani in investitori"

### Formula 4 — Intrigue/Curiosity
```
[Number] [things] che il tuo [bank/advisor/etc] non ti dirà mai su [topic]
```
Examples:
- "Le 3 cose che la tua banca non ti dirà mai sull'immobiliare"
- "I 5 errori che bloccano il 90% degli italiani dal costruire ricchezza"

---

## 3. Subheadline Patterns

Subheadlines expand on the promise and address the primary objection before it forms.

**Structure:** [What they'll get] + [in what timeframe] + [with what qualification level]

Examples:
- "Un workshop pratico di 4 serate in cui scopri le strategie immobiliari usate da investitori professionisti. Adatto a chi parte da zero."
- "In 2 ore scoprirai come costruire un portafoglio immobiliare passivo, anche senza esperienza nel settore."

**Always answer these 3 questions in the subheadline:**
1. What format is this? (workshop, webinar, corso, ebook)
2. How long / what effort? (4 serate, 2 ore, 7 lezioni)
3. Who is it for? (beginners, intermediates, specific persona)

---

## 4. Benefits Section Patterns

Benefits for ABTG must be outcome-oriented, not feature-oriented.

**Weak (feature):** "6 moduli video di formazione"
**Strong (outcome):** "Costruisci la tua prima strategia di acquisto immobiliare"

**Weak (vague):** "Impara a investire"
**Strong (specific):** "Identifica immobili sottovalutati con i 5 criteri del metodo ABTG"

### Benefits Copy Formula

```
[Action verb] + [specific result] + [optional: timeframe or condition]
```

Examples:
- "Individua le migliori zone di acquisto in 3 passi"
- "Calcola la redditività di un immobile prima ancora di visitarlo"
- "Negozia il prezzo di acquisto con tecniche usate dai professionisti"
- "Proteggi il tuo investimento dagli errori più comuni dei principianti"

### Benefits Icons

Use from `/public/images/bank/icons/`. Preferred set:
- Checkmark (success green) for guarantees/outcomes
- Arrow right (orange) for action items
- Star (yellow) for featured benefits
- Lock (blue) for security/protection

---

## 5. Speaker Section Patterns

### Alfio Bardolla — Standard Bio Block

```
Nome: Alfio Bardolla
Titolo: Investitore, formatore, autore bestseller

Bio breve (80 parole):
Alfio Bardolla è uno dei più conosciuti formatori di finanza personale in Italia.
Ha scritto 7 bestseller sul tema degli investimenti, tra cui "Soldi" e "Trading Online".
Nel 2002 ha fondato Alfio Bardolla Training Group, oggi quotata su Borsa Italiana,
che ha formato oltre 100.000 persone in tutta Italia e Europa.
È ospite regolare di programmi come "Unomattina" e "Quarta Repubblica" e scrive
per il Corriere della Sera e Sole24Ore.

Credenziali da includere:
- Autore di [N] bestseller (aggiornare con numero attuale)
- Fondatore di ABTG, quotata su Borsa Italiana
- Oltre 100.000 studenti formati
- Ospite TV: Unomattina, Quarta Repubblica, La7
- Press: Corriere della Sera, Sole24Ore, Milano Finanza
```

### Other Speaker Rules

When a PDF includes guest speakers/coaches:
- Always include: full name, role, 2-3 credential bullets
- Include photo path or note "FOTO RICHIESTA"
- Never invent credentials — list only what's in the PDF

---

## 6. Testimonial Patterns

### Required Elements Per Testimonial

```
- Nome completo (first + last name, never just first name)
- Città (always — adds authenticity)
- Foto (from bank/testimonials/ or leave placeholder)
- Quote: 30-80 words, first person, specific result
- Optional: star rating (5/5 assumed if not stated)
```

### Strong Testimonial Formula

```
[Skepticism before] + [specific action taken] + [measurable result] + [emotional result]
```

Example:
```
"Ero scettico sull'immobiliare senza soldi in banca. Dopo il workshop di Alfio
ho applicato la tecnica della leva finanziaria e in 6 mesi ho acquisito il mio
primo appartamento a Milano con solo 20.000€ di capitale. Oggi incasso 850€
al mese di affitto netto."
— Marco Ferretti, Milano
```

### Testimonials to Avoid

- Vague: "Ho imparato tantissimo, lo consiglio a tutti"
- No result: "Alfio è molto bravo e simpatico"
- Unverifiable extreme: "Ho guadagnato 500.000€ in 3 mesi"
- Anonymous: "F.R., Roma" — always full name

---

## 7. FAQ Patterns

### Standard ABTG FAQ Set (always include unless overridden)

**Q: Devo avere esperienza previa?**
A: No. Il [corso/workshop] è strutturato per chi parte da zero. I concetti vengono spiegati da principio e costruiti progressivamente.

**Q: Quante ore richiede questo programma?**
A: [Specific hours from PDF]. Le sessioni sono registrate / in diretta — [format specifics].

**Q: È davvero gratuito?**
A: Sì, completamente gratuito / Il costo di iscrizione è [prezzo] e include [specifics].

**Q: Cosa succede dopo la registrazione?**
A: Ricevi immediatamente una email di conferma con tutti i dettagli. [24h before event] riceverai il link/indirizzo.

**Q: Posso partecipare se lavoro full-time?**
A: Sì. [Event details — evenings, weekends, recorded, etc.]

**Q: ABTG è un'azienda seria?**
A: Alfio Bardolla Training Group è quotata su Borsa Italiana dal [anno]. Abbiamo formato oltre 100.000 persone. [Link to company page].

### FAQ Ordering Rule

Order by: most frequently asked → most conversion-blocking → legal/trust.
The "È davvero gratuito?" question must always come first for free events.

---

## 8. Urgency & Scarcity Copy

### Countdown Labels

```
Giorni: "GIORNI"
Ore: "ORE"
Minuti: "MINUTI"
Secondi: "SECONDI"
```

### Scarcity Formulas

**Seat-based:**
- "Solo [N] posti disponibili — [X] già prenotati"
- "Ultimi [N] posti rimasti"
- "Lista d'attesa attiva — iscriviti ora per garantirti il posto"

**Time-based:**
- "Iscrizioni chiuse il [DATE] alle [TIME]"
- "Prezzo Early Bird fino al [DATE]: poi [higher price]"
- "Webinar gratuito: solo per i prossimi [N] iscritti"

**Ethical rule:** only use these when the scarcity is real. ABTG has enough real scarcity (physical venues, live cohorts) to never need to fabricate it.

---

## 9. CTA Button Copy by Page Type

| Page Type | Primary CTA | Secondary CTA |
|---|---|---|
| Free event | "ISCRIVITI GRATIS — Garantisci il tuo posto" | "Scopri il programma" |
| Paid course | "INIZIA ORA — [Price]" | "Guarda cosa include" |
| Webinar | "RISERVA IL TUO POSTO GRATUITO" | "Come funziona" |
| Lead magnet | "SCARICA L'EBOOK GRATIS" | "Cosa troverai dentro" |
| Thank you | "Aggiungi al calendario" | "Segui Alfio su Instagram" |

---

## 10. Page-Level Meta Patterns

### Meta Title Formula
```
[Event Name] con Alfio Bardolla — [Format] Gratuito | [Date/Location]
```
Example: "Missione Immobiliare con Alfio Bardolla — Workshop Gratuito | 27-30 Aprile Milano"

Max 60 characters for Google display. Truncate format if needed.

### Meta Description Formula
```
[1 sentence promise]. [Format + date + location]. [Scarcity hook].
```
Example: "Scopri come investire nel mercato immobiliare partendo da zero. Workshop gratuito di 4 serate a Milano, 27-30 Aprile 2026. Solo 50 posti disponibili."

Max 160 characters.

### OG Image Standard

Use the hero background image or a dedicated social share card:
- Size: 1200x630px
- ABTG logo in corner
- Event name as headline
- Date prominent
- Orange brand color dominant

---

## 11. Footer Content (Always Included)

### Standard Footer Elements

```
Logo: ABTG logo (SVG from bank/logos/)
Tagline: "La tua libertà finanziaria inizia qui"

Links:
- Privacy Policy: [URL from PDF or standard ABTG domain]
- Cookie Policy: [URL]
- Termini di servizio: [URL]
- Contatti: info@alfiobardolla.com

Legal disclaimer (financial):
"I rendimenti passati non sono indicativi di quelli futuri.
L'attività di investimento comporta rischi. Prima di investire,
valuta attentamente i tuoi obiettivi finanziari."

Company info:
"Alfio Bardolla Training Group S.p.A.
Via [address] — P.IVA [number]
Quotata su Borsa Italiana — Mercato AIM"

Copyright: "© [YEAR] Alfio Bardolla Training Group. Tutti i diritti riservati."
```

Note: Always pull URLs and P.IVA from the most recent page JSON already built — do not invent them.
