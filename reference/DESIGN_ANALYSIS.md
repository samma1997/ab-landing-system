# Reference Sites Design & Animation Analysis

Comprehensive extraction of animation patterns, layout techniques, visual design, and GSAP configurations from three reference websites.

---

## 1. OMNICA.AGENCY

**Platform:** WordPress + NextAwards Theme (custom theme, NOT Elementor)
**URL:** https://omnica.agency

### A. Animation Patterns

Omnica uses **minimal custom JS animations** -- the site relies on CSS transitions and WordPress native effects rather than GSAP or scroll-driven JS.

#### CSS Keyframe Animations (from Klaviyo/Tally popup library)
```css
@keyframes _spin_evhv6_1 {
  0% { transform: rotate(0) }
  to { transform: rotate(360deg) }
}

@keyframes _wave_evhv6_1 {
  0% { transform: rotate(0) }
  50% { transform: rotate(20deg) }
  to { transform: rotate(0) }
}

@keyframes _heartBeat_evhv6_1 {
  0% { transform: scale(1) }
  50% { transform: scale(1.08) }
  to { transform: scale(1) }
}

@keyframes _bounce_evhv6_1 {
  0%, 20%, 53%, to { transform: translateZ(0) }
  40%, 43% { transform: translate3d(0, -30px, 0) scaleY(1.1) }
  70% { transform: translate3d(0, -15px, 0) scaleY(1.05) }
  80% { transform: translateZ(0) scaleY(.95) }
  90% { transform: translate3d(0, -4px, 0) scaleY(1.02) }
}

@keyframes _rubberBand_evhv6_1 {
  0% { transform: scaleZ(1) }
  30% { transform: scale3d(1.25, .75, 1) }
  40% { transform: scale3d(.75, 1.25, 1) }
  50% { transform: scale3d(1.15, .85, 1) }
  65% { transform: scale3d(.95, 1.05, 1) }
  75% { transform: scale3d(1.05, .95, 1) }
  to { transform: scaleZ(1) }
}

@keyframes _tada_evhv6_1 {
  0% { transform: scaleZ(1) }
  10%, 20% { transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg) }
  30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg) }
  40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg) }
  to { transform: scaleZ(1) }
}
```

#### WordPress Lightbox Animations
```css
@keyframes lightbox-zoom-in {
  0% {
    transform: translate(
      calc((-100vw + var(--wp--lightbox-scrollbar-width))/2 + var(--wp--lightbox-initial-left-position)),
      calc(-50vh + var(--wp--lightbox-initial-top-position))
    ) scale(var(--wp--lightbox-scale));
  }
  to { transform: translate(-50%, -50%) scale(1) }
}

@keyframes lightbox-zoom-out {
  0% { transform: translate(-50%, -50%) scale(1); visibility: visible }
  99% { visibility: visible }
  to {
    transform: translate(...) scale(var(--wp--lightbox-scale));
    visibility: hidden;
  }
}
```

**Key takeaway:** No GSAP, no ScrollTrigger, no advanced scroll animations. The site is clean and relies on layout/typography quality.

### B. Layout Techniques

- **Content width:** max-width 850px (content), 1500px (wide), using `--wp--style--global--content-size` and `--wp--style--global--wide-size`
- **Block gap:** 24px (`--wp--style--block-gap`)
- **WP Block layout:** CSS Grid and Flexbox via WordPress block system
- **Header:** Rounded pill-style navbar with `border-radius: 100px`, `background: #e3e0ec`, sticky on scroll
- **Footer:** Dark background `#031c4d` with white text

### C. Visual Design

#### Color Palette
| Role | Value | Hex |
|------|-------|-----|
| Site Background | Light lavender-gray | `#eff4fd` |
| Primary CTA / Link | Blue | `#1d82e0` |
| Primary Dark / Hover | Navy | `#031c4d` |
| Header / Card BG | Soft lavender | `#e3e0ec` |
| Text Dark | Near black | `#252525` |
| Text Secondary | Dark gray | `#4e4f50` |
| Accent Green | Lime | `#beed3e` |
| Footer BG | Navy | `#031c4d` |
| White | Pure white | `#ffffff` |
| Border/Subtle | Soft gray | `#DADADA` |

#### Typography
- **Headings:** `Lexend Deca` (weights: 300, 400, 700)
- **Body/Paragraphs:** `Questrial` (weight: 400)
- **Font sizes (fluid clamp):**
  - x-small: `clamp(.825rem, 0.825rem + ((1vw - 0.2rem) * 0.204), .95rem)`
  - small: `clamp(.95rem, 0.95rem + ((1vw - 0.2rem) * 0.163), 1.05rem)`
  - base: `clamp(1rem, 1rem + ((1vw - 0.2rem) * 0.49), 1.3rem)`
  - medium: `clamp(1.065rem, 1.065rem + ((1vw - 0.2rem) * 0.71), 1.5rem)`
  - large: `clamp(1.45rem, 1.45rem + ((1vw - 0.2rem) * 1.224), 2.2rem)`
  - x-large: `clamp(2.125rem, 2.125rem + ((1vw - 0.2rem) * 1.918), 3.3rem)`
  - xx-large: `clamp(3.25rem, 3.25rem + ((1vw - 0.2rem) * 1.858), 4.3875rem)`

#### Spacing System
```
--wp--preset--spacing--20: 0.44rem
--wp--preset--spacing--30: 0.67rem
--wp--preset--spacing--40: 1rem
--wp--preset--spacing--50: 1.5rem
--wp--preset--spacing--60: 2.25rem
--wp--preset--spacing--70: 3.38rem
--wp--preset--spacing--80: 5.06rem
--wp--preset--spacing--small:  clamp(.5rem, 2.5vw, 1rem)
--wp--preset--spacing--medium: clamp(1.5rem, 4vw, 2rem)
--wp--preset--spacing--large:  clamp(2rem, 5vw, 3rem)
--wp--preset--spacing--x-large:  clamp(3rem, 7vw, 5rem)
--wp--preset--spacing--xx-large: clamp(4rem, 9vw, 7rem)
--wp--preset--spacing--xxx-large: clamp(5rem, 12vw, 9rem)
--wp--preset--spacing--xxxx-large: clamp(6rem, 14vw, 13rem)
```

#### Shadow System
```css
/* Small Dark */
box-shadow: 0px 16px 4px 0px rgba(20,17,31,0.00),
            0px 10px 4px 0px rgba(20,17,31,0.01),
            0px 6px 3px 0px rgba(20,17,31,0.05),
            0px 3px 3px 0px rgba(20,17,31,0.09),
            0px 1px 1px 0px rgba(20,17,31,0.10);

/* Medium Dark */
box-shadow: 0px 66px 18px 0px rgba(20,17,31,0.00),
            0px 42px 17px 0px rgba(20,17,31,0.01),
            0px 24px 14px 0px rgba(20,17,31,0.05),
            0px 10px 10px 0px rgba(20,17,31,0.09),
            0px 3px 6px 0px rgba(20,17,31,0.10);

/* Large Dark */
box-shadow: 0px 219px 61px 0px rgba(20,17,31,0.00),
            0px 140px 56px 0px rgba(20,17,31,0.01),
            0px 79px 47px 0px rgba(20,17,31,0.05),
            0px 35px 35px 0px rgba(20,17,31,0.09),
            0px 9px 19px 0px rgba(20,17,31,0.10);
```

#### Button Styles
```css
/* Primary CTA */
background-color: #1d82e0;
border-radius: 9999px;
padding: calc(.667em + 2px) calc(1.333em + 2px);

/* Primary CTA Hover */
background-color: #031c4d;

/* Secondary Button */
background-color: #031c4d;
color: #ffffff;

/* Secondary Hover */
background-color: #1d82e0;
color: #ffffff;

/* Outline Style */
border: 2px solid;
padding: .667em 1.333em;
background-color: transparent;
```

#### Gradient Collection
```css
--gradient--black:  linear-gradient(135deg, rgba(0,0,0,1), rgba(20,17,30,0));
--gradient--blue:   linear-gradient(135deg, rgba(84,73,113,1), rgba(35,26,28,1));
--gradient--green:  linear-gradient(135deg, rgba(101,216,82,1), rgba(27,216,179,1));
--gradient--purple: linear-gradient(135deg, rgba(192,43,230,1), rgba(74,38,173,1));
```

### D. Standout Effects
- **Pill-shaped header** that floats above content with soft lavender background
- **Tally.so embed** for forms (popup-based)
- **Clean, typography-focused** layout without heavy animation -- good contrast reference
- **Image lightbox** with zoom animation using CSS custom properties for position tracking

---

## 2. THEGRIND.NL

**Platform:** Webflow + Slater (external JS) + GSAP 3.13/3.14
**URL:** https://www.thegrind.nl

### A. Animation Patterns

#### GSAP Libraries Loaded
```
gsap.min.js (3.13.0 + 3.14.2)
ScrollTrigger.min.js
SplitText.min.js
Draggable.min.js
```
Plus: **Locomotive Scroll** (locomotive-scroll@beta)

#### GSAP Accordion Animation (exact code)
```javascript
// Initial state
gsap.set('.accordion_content', { height: 0 });
gsap.set('.second_line', { rotation: 90 });

// Close other items
gsap.to(otherContent, { height: 0, duration: 0.8, ease: "expo.inOut" });
gsap.to(otherSecondLine, { rotation: 90, duration: 0.8, ease: "expo.inOut" });

// Close current (toggle off)
gsap.to(content, { height: 0, duration: 0.8, ease: "expo.inOut" });
gsap.to(secondLine, { rotation: 90, duration: 0.5, ease: "expo.inOut" });

// Open (toggle on)
gsap.set(content, { height: 'auto' });
const autoHeight = content.offsetHeight;
gsap.set(content, { height: 0 });
gsap.to(content, { height: autoHeight, duration: 0.8, ease: "expo.out" });
gsap.to(secondLine, { rotation: 0, duration: 0.5, ease: "expo.inOut" });
```

**Key easing values:**
- Accordion expand: `expo.out`, duration 0.8s
- Accordion collapse: `expo.inOut`, duration 0.8s
- Icon rotation: `expo.inOut`, duration 0.5s

#### CSS-Based Reveal Animations (initial states)
```css
/* Elements hidden before animation */
.header_logo_wrapper,
.nav_link_wrapper,
.buttons_wrapper,
.hero_content_wrapper,
.photo_1,
.photo_2,
.video,
.on_mobile,
.svg_animation_wrapper,
.full_width_overlay_top,
.full_width_overlay_bottom,
.full_width_overlay_left {
  opacity: 0;
}

/* Clip-path reveal (bottom-to-top wipe) */
.photo_1,
.photo_2,
.video,
.on_mobile {
  clip-path: inset(100% 0 0 0);  /* fully hidden from bottom */
}

/* Scale entrance */
.svg_animation_wrapper {
  transform: scale(0.8);
}
```

The Webflow IX3 engine handles the actual animation triggers -- elements start with `opacity: 0` and `transform: translate3d(0, 4vh, 0)` and animate to visible on page load/scroll.

#### SVG Path Animation (Logo Draw Effect)
The site has an SVG logo with path drawing animation:
```css
.svg_animation_wrapper svg path {
  fill: none;
  stroke: #fff;
  stroke-width: 1.5;
}
/* Animated via stroke-dasharray and stroke-dashoffset */
/* Example state: stroke-dasharray: 85.2232; stroke-dashoffset: 0; */
```
This is a classic SVG line-drawing effect where `stroke-dashoffset` animates from the path length to 0.

#### Lazy Video Loading (IntersectionObserver)
```javascript
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const source = video.querySelector("source");
      const src = source?.dataset?.src;
      if (src && src !== "undefined") {
        source.src = src;
        video.load();
        video.play().catch(()=>{});
      }
      observer.unobserve(video);
    }
  });
}, { rootMargin: "300px" });
```

#### Webflow Native Interactions (IX3)
Elements with `data-w-id` are animated by Webflow's native IX3 engine. The initial states defined in CSS:
```css
/* Scroll-in entrance: translate up 4vh + fade */
[data-w-id="..."] {
  transform: translate3d(0, 4vh, 0) scale3d(1,1,1) rotateX(0) rotateY(0) rotateZ(0) skew(0,0);
  opacity: 0;
}
```
These animate to `opacity: 1; transform: none` on scroll into view.

### B. Layout Techniques

#### Page Structure
```
<nav class="regular_section navbar">
<section class="regular_section relative _100vh">       <!-- Hero (full viewport) -->
<section class="regular_section relative_section hidden"> <!-- Hidden section -->
<section class="regular_section small_bottom slide_card_hidden"> <!-- Card Grid -->
<section class="marquee_section small_top_bottom">       <!-- Marquee Ticker -->
<section class="regular_section small_top">              <!-- Content -->
<section class="regular_section red">                    <!-- Red CTA -->
<section class="regular_section black">                  <!-- Dark section -->
<section class="regular_section video_section">          <!-- Video -->
<section class="regular_section red _100vh">             <!-- Red full-height -->
<div class="donny_section">                              <!-- Special section -->
<section class="regular_section faq_section">            <!-- FAQ/Accordion -->
<section class="regular_section relative">               <!-- Content -->
<section class="regular_section footer">                 <!-- Footer -->
```

#### Hero Section Structure
```
<section class="regular_section relative _100vh">
  <div class="full_width_overlay_left">      <!-- gradient overlay left -->
  <div class="full_width_overlay_bottom">    <!-- gradient overlay bottom -->
  <div class="full_width_overlay_top">       <!-- gradient overlay top -->
  <div class="full_width_background">
    <div class="regular_container _100vh_100vw _100vh">
      <div class="photo_wrapper">
        <img class="full_width_image photo_1">   <!-- background photo 1 -->
        <img class="full_width_image photo_2">   <!-- background photo 2 -->
        <div class="hero_video_wrapper">
          <video class="hero_video">             <!-- background video -->
        </div>
      </div>
      <img class="grind_logo_svg">               <!-- logo -->
      <div class="svg_animation_wrapper logo_animation">  <!-- animated SVG -->
      <div class="hero_content_wrapper">
        <div class="hero_text_wrapper">
          <h1 class="hero_text uppercase">       <!-- hero headline -->
        </div>
        <div class="bottom_items_wrapper">       <!-- CTA area -->
```

#### Hero Video Container
```css
.hero_video_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero_video_wrapper video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  background: #000;
}
```

#### Card Grid Section
```
<div class="w-layout-grid card_wrapper">   <!-- CSS Grid -->
  <div class="card_1">
    <h3 class="heading_card uppercase">
    <div class="small_dot absolute">       <!-- decorative dot -->
    <video class="u-img-cover lazy-video"> <!-- lazy-loaded video -->
  </div>
  <div class="card_1 m_top_6">            <!-- offset with margin-top -->
  <div class="card_1 m_top_8">            <!-- more offset -->
</div>
```
Cards use staggered vertical offsets (`m_top_6`, `m_top_8`) for a masonry-like effect.

#### Marquee/Ticker Section
```
<div class="marquee_container">
  <div class="marquee_content">         <!-- CSS animation: infinite horizontal scroll -->
    <div class="extra_wrap">
      <div class="marquee_element">
        <h2 class="marquee_text">       <!-- repeated text -->
        <div class="stripe">            <!-- decorative separator -->
        <h1 class="marquee_text">       <!-- repeated text -->
      </div>
    </div>
    <!-- extra_wrap repeated 6x for seamless loop -->
  </div>
</div>
```
The marquee works by duplicating content blocks and using CSS `animation: marquee Xs linear infinite` or Webflow's native marquee component.

#### Spacing System (custom utility classes)
```css
.gap_1 { gap: var(--_spacing---section--1); }
.gap_2 { gap: var(--_spacing---section--2); }
/* ... through gap_8 */

.p_1 { padding: var(--_spacing---section--1); }
/* ... through p_8 */

.m_top_1 { margin-top: var(--_spacing---section--1); }
/* ... through m_top_8 */

.m_bottom_1 { margin-bottom: var(--_spacing---section--1); }
/* ... through m_bottom_8 */
```

#### Typography Trimming (advanced vertical rhythm)
```css
:is(h1, h2, h3, h4, h5, h6) {
  display: flow-root;
}
:is(h1, h2, h3, h4, h5, h6)::before {
  content: "";
  display: table;
  margin-bottom: calc(-0.5lh + var(--_typography---headings--top-trim));
}
:is(h1, h2, h3, h4, h5, h6)::after {
  content: "";
  display: table;
  margin-bottom: calc(-0.5lh + var(--_typography---headings--bottom-trim));
}

/* Same pattern for paragraphs */
:is(.text_main, .text_large, .text_small)::before {
  margin-bottom: calc(-0.5lh + var(--_typography---paragraphs--top-trim));
}
```
This uses the `lh` unit (line-height unit) and CSS custom properties for pixel-perfect vertical trimming of text bounding boxes.

### C. Visual Design

#### Color Palette
| Role | Value |
|------|-------|
| Background Dark | `#000` / `#1b1b1d` |
| Red Accent / CTA sections | Red (applied via `.red` class) |
| Text Primary | `#fff` (on dark backgrounds) |
| Text Dark | `#000` (on light backgrounds) |
| Pill selected state | `#1b1b1d` bg with white text |
| Third accent color | `var(--_colors---third)` |
| Second accent color | `var(--colors---second)` |

#### Typography
- **Custom font:** `FormulaCondensed-Black` (self-hosted WOFF) -- used for large display headings
- **Text rendering optimization:**
```css
.text {
  -webkit-text-rendering: optimizeSpeed;
  text-rendering: optimizeSpeed;
  -webkit-transform: translateZ(0);
  font-kerning: none;
}
```
- **Text classes:** `.text_main`, `.text_large`, `.text_small`
- **Transform classes:** `.uppercase`, `.lowercase`, `.capitalize`
- **Alignment:** `.text_left`, `.text_center`, `.text_right`

#### Line Wrapper (for text reveal animations)
```css
.lineWrapper {
  display: block;
  overflow: hidden;
}
```
Used with SplitText to create line-by-line reveal animations where each line slides up from behind an overflow-hidden wrapper.

#### Interactive Elements
```css
.checkbox_pill_wrap {
  cursor: pointer;
  transition: all .3s ease;
  user-select: none;
}
.checkbox_pill_wrap:hover {
  background-color: #1b1b1d;
  color: white;
}
.checkbox_pill_wrap.selected {
  border-color: var(--_colors---third);
  background-color: #1b1b1d;
}
```

#### Hamburger Menu
```css
.hamburger_icon {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}
.bar {
  width: 100%;
  height: 2px;
  background-color: currentColor;
  border-radius: 1px;
}
```

### D. Standout Effects

1. **SVG Logo Line-Drawing Animation** -- The "GRIND" logo animates by drawing SVG paths using `stroke-dasharray`/`stroke-dashoffset`
2. **Full-viewport hero with multi-layer overlays** -- Three gradient overlays (top, bottom, left) over a video + photos background
3. **Clip-path reveal** on images/video: `clip-path: inset(100% 0 0 0)` animates to `inset(0)` for bottom-to-top wipe
4. **Staggered card grid** with masonry-like vertical offsets
5. **Infinite marquee ticker** with duplicated content blocks
6. **GSAP accordion** with `expo.inOut`/`expo.out` easing (very smooth, premium feel)
7. **SplitText line reveal** using `.lineWrapper { overflow: hidden }` containers
8. **Lazy video loading** with IntersectionObserver (300px rootMargin)
9. **Custom font (FormulaCondensed-Black)** for bold display headings

---

## 3. APPYCAMPER.COM

**Platform:** Webflow + Lenis Smooth Scroll + Custom JS
**URL:** https://www.appycamper.com

### A. Animation Patterns

#### Libraries Loaded
- **Lenis** (smooth scroll): `@studio-freight/lenis@latest`
- **Webflow IX** (native Webflow interactions) -- 95 animated elements with `data-w-id`
- **No GSAP** -- relies on Webflow native animations + custom vanilla JS

#### Lenis Smooth Scroll Configuration (exact code)
```javascript
const lenis = new Lenis({
  lerp: 0.05,           // Very smooth inertia (low = more smooth)
  wheelMultiplier: 1,    // Normal scroll speed
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
```

#### Side-Scroll Card Momentum Effect (exact code)
This is the most interesting custom animation -- a physics-based horizontal scroll with elastic card lag:

```javascript
(() => {
  const track = document.querySelector(".impact-sidescroll");
  if (!track) return;

  const cards = Array.from(track.querySelectorAll(".impact-card"));
  if (!cards.length) return;

  // Assign progressive lag values (quadratic curve)
  const total = Math.max(1, cards.length - 1);
  cards.forEach((card, i) => {
    const t = i / total;
    const lag = t * t;  // quadratic: later cards lag more
    // Use t**3 for more dramatic effect
    card.style.setProperty("--lag", lag.toFixed(4));
  });

  const MAX_STRETCH = 260;      // Max pixel displacement
  const SENSITIVITY = 0.38;     // Velocity-to-displacement multiplier
  const EASE = 0.08;            // Interpolation speed (lower = smoother)
  const DECAY = 0.94;           // How fast the effect fades (lower = faster fade)

  let lastX = null;
  let lastT = null;
  let target = 0;
  let current = 0;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function getTranslateX(el) {
    const tr = getComputedStyle(el).transform;
    if (!tr || tr === "none") return 0;
    const m3 = tr.match(/matrix3d\((.+)\)/);
    if (m3) return (m3[1].split(",").map(Number)[12]) || 0;
    const m2 = tr.match(/matrix\((.+)\)/);
    if (m2) return (m2[1].split(",").map(Number)[4]) || 0;
    return 0;
  }

  function tick(now) {
    const x = getTranslateX(track);
    if (lastX === null) {
      lastX = x; lastT = now;
      requestAnimationFrame(tick);
      return;
    }

    const dx = x - lastX;
    const dt = Math.max(16, now - lastT);
    const v = dx / dt;                                        // velocity
    const mag = clamp(Math.abs(v) * 1000 * SENSITIVITY, 0, MAX_STRETCH);
    const dir = v === 0 ? 0 : -Math.sign(v);                 // trail the motion
    target = dir * mag;

    current += (target - current) * EASE;                     // lerp
    track.style.setProperty("--extra", current.toFixed(2) + "px");

    target *= DECAY;                                          // decay target

    lastX = x;
    lastT = now;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
```

#### CSS for Side-Scroll Cards
```css
body { overflow-x: clip; }

.impact-card {
  will-change: translate;
  translate: calc(var(--lag, 0) * var(--extra, 0px)) 0;
}
```

**How it works:**
1. Each card gets a `--lag` CSS variable (0 to 1, quadratic distribution)
2. On every frame, the script calculates scroll velocity of the `.impact-sidescroll` track
3. It sets `--extra` on the track (a pixel value based on velocity)
4. Each card's `translate` is `--lag * --extra`, so later cards stretch more
5. The result is a rubber-band/elastic spread effect during fast scrolling

#### Webflow Native Animations (95 animated elements)
Initial states defined for scroll-triggered reveals:
```css
/* Fade-up entrance (mobile breakpoints) */
[data-w-id="60719dc3-..."] {
  transform: translate3d(0, 4vh, 0) scale3d(1,1,1) rotateX(0) rotateY(0) rotateZ(0) skew(0,0);
  opacity: 0;
}
```

**Animated element types include:**
- `nav-link` -- hover underline animation
- `hero` -- entrance animation
- `heading-super` -- text entrance
- `pop` -- pop-in effect on hero inline icons
- `section` -- scroll-triggered section reveals
- `showcase-track` -- horizontal scroll showcase
- `showcase-mask` -- mask/reveal transitions
- `text`, `text _2x` -- text fade-ins
- `rows` -- row entrances

### B. Layout Techniques

#### Page Structure
```
<div class="wrapper">
  <div class="hero">
    <div class="container">
      <div class="home-heading-wrap">
        <h1 class="heading _3x">
          <span class="heading-super">
          <span class="hero-inline-icon _2">   <!-- inline animated icon -->
          <span class="hero-inline-icon">
      <div class="cloud-wrap">                 <!-- floating cloud images -->
        <div class="cloud-rows-wrap front">
          <div class="cloud-row">
            <div class="cloud-image-wrap">
            <div class="cloud-image-wrap offset-4">
            <div class="cloud-image-wrap offset-2">
          <div class="cloud-row">
        <div class="cloud-rows-wrap back">     <!-- parallax back layer -->
          <div class="cloud-row middle">
        <div class="cloud-gradient">           <!-- gradient overlay -->
  <div class="section">                        <!-- content sections -->
    <div class="container">
      <div class="grid">
  <div class="section"> (showcase)
    <div class="showcase-track">
      <div class="showcase-sticky">
        <div class="showcase-mask">
          <div class="showcase-content">
            <div class="showcase-square">
              <img class="cover">
  <div class="section"> (impact)
    <div class="impact-track">
      <div class="impact-sticky">
        <div class="impact-sidescroll">
          <div class="impact-card metric">
          <div class="impact-card">
  <div class="about-section">
    <div class="bg">
      <div class="about-overlay">
    <div class="about-ticker-wrap">
      <div class="ticker-wrap">
        <div class="ticker-group">
          <div class="heading _3x">
          <img class="inline-icon _3x">
```

#### Hero Cloud Layout
The hero uses a multi-layer floating cloud/image grid:
- **Front layer** (`cloud-rows-wrap front`): Two rows of cloud images with offset classes (`offset-2`, `offset-4`)
- **Back layer** (`cloud-rows-wrap back`): Single middle row for parallax depth
- **Gradient** (`cloud-gradient`): Overlay gradient fading the clouds

#### Showcase Section (Horizontal Scroll with Sticky)
```
showcase-track       -- outer wrapper, sets the scroll distance
  showcase-sticky    -- position: sticky to pin during scroll
    showcase-mask    -- clip/mask for reveal transitions
      showcase-content
        showcase-square
          img.cover  -- portfolio images
```
This is a classic pinned horizontal scroll pattern where the `showcase-track` is tall (to create scroll distance) and `showcase-sticky` pins the visual content while the horizontal position changes based on scroll progress.

#### Impact Section (Side-Scroll Cards)
```
impact-track         -- outer wrapper
  impact-sticky      -- sticky container
    impact-sidescroll -- horizontally scrolling track (Webflow native)
      impact-card.metric  -- metric cards
        impact-metric
          text-metric
      impact-card         -- quote cards
        impact-author
          img.cover.tone-bw
        impact-quote
          text._2x
```

#### Ticker/Marquee
```
ticker-wrap            -- overflow hidden container
  ticker-group         -- duplicated for seamless loop
    heading._3x        -- large text
    img.inline-icon._3x -- inline icon between text
  ticker-group         -- second copy
```
A second ticker appears in the about section with the same structure.

### C. Visual Design

#### Typography
- **Primary Font:** `Funnel Display` (weights: 300, 400, 500, 600, 700)
- **Size multiplier classes:**
  - `.heading` -- base heading size
  - `.heading._3x` -- 3x size
  - `.text` -- base text
  - `.text._2x` -- 2x size
  - `.text-metric` -- large metric numbers
  - `.inline-icon`, `.inline-icon._3x` -- icons sized to match text

#### Hero Heading Structure
```html
<h1 class="heading _3x">
  <span class="heading-super">Main heading text</span>
  <span class="hero-inline-icon _2"><!-- inline animated icon --></span>
  <span class="hero-inline-icon"><!-- inline animated icon --></span>
</h1>
```
Inline icons (images) are embedded within the heading text itself, creating a mixed text+image heading effect.

#### Image Treatments
```css
.cover { object-fit: cover; }      /* fill container */
.tone-bw { filter: grayscale(1); } /* black & white */
```

#### Grid System
```
.container    -- max-width centered container
.grid         -- CSS Grid
.rows._3x     -- 3-column row variant
.rows._1-5x   -- 1.5-column variant
.rows._9x     -- 9-column variant
.align-right  -- right-aligned content
```

### D. Standout Effects

1. **Elastic Side-Scroll Cards** -- The rubber-band momentum effect on horizontal scroll cards is the most distinctive effect. Cards spread apart based on scroll velocity with quadratic lag distribution. Parameters: `MAX_STRETCH: 260px`, `SENSITIVITY: 0.38`, `EASE: 0.08`, `DECAY: 0.94`.

2. **Lenis Smooth Scroll** -- Ultra-smooth scrolling with `lerp: 0.05` (very inertial).

3. **Cloud/Image Parallax Hero** -- Multiple rows of floating images at different speeds with gradient fade-out.

4. **Showcase Sticky Horizontal Scroll** -- Pinned section that scrolls horizontally while user scrolls vertically.

5. **Inline Icons in Headings** -- Images embedded directly within `<h1>` text create a dynamic, editorial feel.

6. **Ticker/Marquee with Inline Icons** -- Infinite horizontal scroll with alternating text and icon elements.

7. **Impact Card Types** -- Mixed metric cards (large numbers) and quote cards (testimonials with B&W photos) in the same horizontal scroll.

8. **95 Webflow-animated elements** -- Extensive use of scroll-triggered fade-up entrances (`translate3d(0, 4vh, 0)` + opacity).

---

## CROSS-SITE PATTERN SUMMARY

### Best Patterns to Recreate in Next.js/React

#### 1. Scroll-Triggered Fade-Up Entrance
Used by ALL three sites. The most universal pattern:
```typescript
// React/GSAP implementation
gsap.from(element, {
  y: '4vh',      // or 40-60px
  opacity: 0,
  duration: 0.8,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none none'
  }
});
```

#### 2. Clip-Path Image Reveal (The Grind)
```typescript
gsap.from('.image', {
  clipPath: 'inset(100% 0 0 0)',  // hidden from bottom
  duration: 1.2,
  ease: 'expo.out',
  scrollTrigger: { trigger: '.image', start: 'top 80%' }
});
```

#### 3. Elastic Side-Scroll Cards (AppyCamper)
Recreate with a custom hook that tracks scroll velocity on a horizontal container and applies CSS custom properties for elastic lag effect. Key values: `lerp: 0.08`, `decay: 0.94`, `maxStretch: 260px`.

#### 4. Infinite Marquee/Ticker
CSS-only approach with duplicated content:
```css
.ticker-group {
  display: flex;
  animation: ticker 20s linear infinite;
}
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

#### 5. GSAP Accordion (The Grind)
Key insight: measure auto height, then animate from 0. Easing: `expo.out` for open, `expo.inOut` for close.

#### 6. Lenis Smooth Scroll
```typescript
import Lenis from '@studio-freight/lenis';
const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 1 });
```

#### 7. SVG Line-Drawing
Animate `stroke-dashoffset` from pathLength to 0 with GSAP or CSS transitions.

#### 8. Pinned Horizontal Scroll Section
Use ScrollTrigger's `pin` feature with horizontal translation based on scroll progress.

### Recommended Easing Functions
| Effect | Easing | Duration |
|--------|--------|----------|
| Fade-up entrance | `expo.out` | 0.8-1.0s |
| Accordion open | `expo.out` | 0.8s |
| Accordion close | `expo.inOut` | 0.8s |
| Icon rotation | `expo.inOut` | 0.5s |
| Image clip reveal | `expo.out` | 1.2s |
| Smooth scroll | lerp 0.05-0.08 | continuous |
| Elastic decay | 0.94 multiplier | continuous |

### Recommended Color Palette (combined best elements)
| Role | Omnica | The Grind | AppyCamper |
|------|--------|-----------|------------|
| BG Light | `#eff4fd` | -- | -- |
| BG Dark | `#031c4d` | `#000`/`#1b1b1d` | -- |
| Primary CTA | `#1d82e0` | Red | -- |
| Accent | `#beed3e` | `var(--_colors---third)` | -- |
| Header BG | `#e3e0ec` | -- | -- |

### Typography Stack
| Site | Headings | Body |
|------|----------|------|
| Omnica | Lexend Deca (300/400/700) | Questrial (400) |
| The Grind | FormulaCondensed-Black (display) | System/Webflow default |
| AppyCamper | Funnel Display (300-700) | Funnel Display |
