# ABTG Conversion Learnings
**A/B test results, analytics findings, and what converts**
Version: 1.0 — March 2026

---

## How This File Works

Every time a page gets measurable results — A/B test, analytics observation, user feedback, marketing team note — it gets logged here. Over time this becomes the single source of truth for conversion decisions.

**Log format:**
```
### [YYYY-MM-DD] [page-id] — [finding title]
Type: A/B test | Analytics | Feedback | Hypothesis
Confidence: confirmed | likely | hypothesis
Impact: high | medium | low
Finding: [what was discovered]
Action: [what to do based on this]
```

---

## Confirmed Learnings

*(Empty at launch — this file fills up as pages get traffic and feedback)*

---

## Active Hypotheses (To Test)

### H001 — Form position above FAQ vs below FAQ
**Source:** Conversion Playbook blueprint + competitor observation
**Hypothesis:** Moving the form to appear after the FAQ section (not before) will increase completion rate because the most common objections are handled immediately before the user sees the form.
**How to test:** Two versions of the same page (A: form then FAQ, B: FAQ then form), split traffic 50/50.
**Success metric:** Form submission rate (leads/unique visitors).
**Status:** Not yet tested.

### H002 — Countdown timer in hero vs only at bottom
**Source:** Urgency psychology principles
**Hypothesis:** Showing the countdown timer in or immediately below the hero section will create urgency earlier in the funnel, increasing scroll depth and conversion.
**How to test:** A/B test two hero variants.
**Success metric:** Scroll depth past hero (>50%) + form submissions.
**Status:** Not yet tested.

### H003 — Speaker section before vs after benefits
**Source:** ABTG content structure analysis
**Hypothesis:** Leading with benefits (what you get) before speaker (who delivers it) performs better for cold traffic, because new visitors care more about their outcome than the speaker's credentials.
**How to test:** Swap block order in a page with substantial traffic.
**Success metric:** Time on page + form submissions.
**Status:** Current pages use benefits-first (based on Conversion Playbook). Track if this holds.

### H004 — Social proof numbers: total students vs specific results
**Source:** Competitor analysis
**Hypothesis:** Showing specific student results ("Marco guadagna €850/mese") converts better than aggregate numbers ("100,000 studenti formati") for the testimonials section, because specificity creates identification.
**How to test:** Two testimonial block variants.
**Success metric:** Engagement with testimonials section (scroll + dwell time).
**Status:** Not yet tested.

### H005 — CTA copy: "ISCRIVITI GRATIS" vs "GARANTISCI IL TUO POSTO"
**Source:** Scarcity psychology
**Hypothesis:** "GARANTISCI IL TUO POSTO" (possession + scarcity) performs better than "ISCRIVITI GRATIS" (transactional) for events with real seat limits.
**How to test:** Same button, two copy variants.
**Success metric:** Click-through rate on primary CTA.
**Status:** Not yet tested.

---

## Pending Analytics Setup

Before conversion data can be collected, these integrations need to be active:

| Integration | Status | Owner | Priority |
|---|---|---|---|
| Facebook Pixel (event-level) | Not configured | Marketing | High |
| Google Analytics 4 | Not configured | Marketing | High |
| HubSpot form tracking | Form IDs not set | Marketing | High |
| Hotjar / heatmap | Not installed | Engineering | Medium |
| Google Tag Manager | Not installed | Engineering | Medium |

Until these are in place, this file remains mostly hypotheses. First priority is getting real tracking on the Missione Immobiliare v2 page.

---

## Page Performance Benchmarks (Targets)

Based on financial education industry standards for Italy:

| Metric | Below Average | Average | Good | Excellent |
|---|---|---|---|---|
| Landing Page CVR (free event) | < 10% | 10-20% | 20-35% | > 35% |
| Landing Page CVR (paid course) | < 1% | 1-3% | 3-8% | > 8% |
| Bounce rate | > 80% | 60-80% | 40-60% | < 40% |
| Average session duration | < 1 min | 1-2 min | 2-4 min | > 4 min |
| Mobile vs desktop | — | 70/30 | 75/25 | depends on traffic source |

**Note:** "CVR" here means form submissions / unique page visits. Different from ad click-through rate.

---

## Section-Level Conversion Notes

*(To be populated as heatmap and scroll data becomes available)*

### What typically kills conversions mid-page

1. **Slow load** — if hero image takes > 3s, 40% of mobile users leave
2. **Form with too many fields** — each additional field beyond email reduces completion ~10%
3. **No urgency before form** — users who don't see urgency have 3x lower conversion
4. **Credibility gap** — pages without social proof near the top have higher bounce rates
5. **CTA buried** — if first CTA is below fold on mobile, conversion drops significantly

### What typically helps mid-funnel

1. **Sticky CTA bar** — always visible CTA during scroll → estimated +15-25% on leads
2. **Social proof ticker** — moving logos/numbers in peripheral vision → trust building
3. **Video testimonials** — 2x conversion vs text testimonials (when video quality is good)
4. **Benefit icons** — visual scanability → users stay longer in benefits section

---

## A/B Test Queue (Prioritized)

| # | Test | Page | Metric | Status |
|---|---|---|---|---|
| 1 | CTA copy variant (H005) | Missione Immobiliare | CTA CTR | Waiting for traffic |
| 2 | Form position (H001) | Next webinar page | Form CR | Not started |
| 3 | Countdown timer in hero (H002) | Next event page | Scroll depth | Not started |
| 4 | Speaker first vs benefits first (H003) | Next course page | Time on page | Not started |

---

## Key Dates for Review

- **First review:** 30 days after first page goes live with tracking (April-May 2026)
- **Quarterly review:** Every 3 months, update benchmarks and promote hypotheses to confirmed/rejected
- **Annual review:** Full playbook update based on all learnings
