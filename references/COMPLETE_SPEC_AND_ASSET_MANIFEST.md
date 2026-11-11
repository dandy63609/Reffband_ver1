# GoShuin: Complete UI/UX Specification & Asset Manifest

This document is the **single source of truth** for cloning or referencing the **https://aestudio.studio/goshuin/en** experience in React. Every stylesheet, script, asset, font, and animation algorithm has been extracted and saved locally into this directory.

---

## 1. Directory Structure of Extracted Files

```
D:\dandy_personal\Dandy_College\SEMESTER_3\Bisdig\Reffband\references\
├── COMPLETE_SPEC_AND_ASSET_MANIFEST.md  <-- You are here
├── MOBILE_PHONE_ADAPTATION_GUIDE.md    <-- Phone & Mobile UI/UX adaptation guide (Vertical fold)
├── ACCORDION_PAGING_GUIDE.md           <-- React implementation guide for 3D page turns
├── TEARDOWN.md                         <-- High-level measured design blueprint
├── ROUTING.md                          <-- Surface classification & page topology
├── snapshot.html                       <-- Complete hydrated DOM
├── motion.json                         <-- Extracted @keyframes and transitions
├── surface-map.json                    <-- Surface material routing (DOM vs Video)
├── tokens-1440.json, 768, 390          <-- Measured responsive tokens
│
├── css/                                <-- All 14 original stylesheets
│   ├── site-f6816fdbdae5.css          (Global variables, base reset, layout)
│   ├── book-reader-066f1703ed2f.css   (Accordion 3D paging & stage styling)
│   ├── book-journey-c9609446cad1.css  (Book cover & fabric bands)
│   ├── illustrated-journey-d98e...css (Hero illustration & ink reveals)
│   └── ... (all 10 other section stylesheets)
│
├── js/                                 <-- All 5 original JavaScript modules
│   ├── book-reader-d796e39c0771.js    (The 3D Accordion Z-Fold engine)
│   ├── illustrated-journey-b270...js  (The 8-band SVG ink stippling engine)
│   ├── book-journey-c49d5428997f.js   (Cover lift & interaction hooks)
│   ├── journey-cdcd0a0ccc2e.js        (Tour navigation & reveal triggers)
│   └── site-371f3181278d.js          (Global utilities)
│
├── assets/                             <-- Downloaded media & washi fabric patterns
│   ├── cover-indigo-veo-loop-20261006.mp4 (Living indigo book cover video)
│   ├── cover-indigo-veo-poster-20261006.jpg
│   ├── shrine-approach-1448-20261006.webp (Hero shrine illustration)
│   ├── ja-scan-library-20261006.webp     (Phone scan library screenshot)
│   ├── band-indigo-waves-20261004.webp   (Washi pattern 1)
│   ├── band-vermilion-clouds-20261004.webp (Washi pattern 2)
│   ├── band-pine-fan-20261004.webp       (Washi pattern 3)
│   ├── band-golden-tide-20261004.webp    (Washi pattern 4)
│   ├── band-jade-ribbons-20261004.webp   (Washi pattern 5)
│   ├── band-sakura-silk-20261004.webp    (Washi pattern 6)
│   └── band-minimal-drift-20261004.webp  (Washi pattern 7)
│
└── captures/                           <-- Full viewport captures
    ├── full-1440.png (Desktop 1440x900)
    ├── full-768.png  (Tablet 768x1024)
    └── full-390.png  (Mobile 390x844)
```

---

## 2. Layout & Viewport Rules

> [!WARNING]
> **NO VERTICAL PAGE SCROLLING.**  
> The site's `scrollHeight` is strictly **100vh (`900px`)**. Never stack the 14 sections vertically.

* **Shell:** A fixed `100vh` frame with `padding: 24px 32px` on desktop.
* **Stage:** `.reader-stage` has `perspective: 2000px` and `overflow: hidden`.
* **Leaves:** 14 distinct `<section class="reader-leaf">` containers. Exactly **ONE** is visible at a time (`hidden` attribute toggles between them).
* **Bottom Bar:** `.reader-controls` with Previous button, native select dropdown (`1 / 14 — Title`), and Next button.
* **Washi Strip:** A persistent bottom fabric ribbon (`.footer-band`) that dynamically swaps its pattern (`band-*.webp`) to match the active chapter.

---

## 3. Typography System

The site avoids slow external webfonts and relies on **authentic Japanese Mincho and Apple System typography** for native iOS fidelity:

```css
:root {
  /* Classical Japanese Editorial Serif (Titles, Headings, Numbers) */
  --serif: Georgia, 'Hiragino Mincho ProN', 'Yu Mincho', serif;

  /* Modern Clean Sans (Body, Labels, Controls) */
  --sans: -apple-system, BlinkMacSystemFont, 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif;
}
```

### Drop-in Google Font Equivalents (For Cross-Platform React Apps):
If your React app will be viewed on Windows, Android, or Linux devices that lack Apple fonts:
* **Serif:** `Shippori Mincho` or `Noto Serif JP` (`font-family: 'Shippori Mincho', serif;`)
* **Sans:** `Noto Sans JP` or `Inter` (`font-family: 'Noto Sans JP', sans-serif;`)

---

## 4. The 4 Signature Animations (Complete Code Breakdown)

### Animation A: The 3D Accordion Page-Turn (`book-reader.js` L71–160)
* **Trigger:** Click "Next", swipe left, or press `ArrowRight`.
* **How it works:**
  1. The leaving page is cloned into 3 vertical slices: `fold-leading`, `fold-mountain`, `fold-valley` (each `width / 3`).
  2. Nested with `transform-style: preserve-3d`.
  3. Over `1280ms`, rotates $+52^\circ$ (hinging backward) and $-104^\circ$ (hinging forward) while translating along X.
  4. An animated SVG path calculates and projects a **real-time blurred ground shadow** onto the paper beneath as the folds lift.
  5. Dynamic lighting (`.accordion-light`) darkens panels as their normals rotate away from the virtual top-left light source.

### Animation B: 8-Band Ink Stippling Reveal (`illustrated-journey.js` L25–58)
* **Trigger:** Page load or clicking "Replay the Ink".
* **How it works:**
  1. The shrine illustration (`shrine-approach-1448.webp`) is **not** a video or canvas.
  2. It generates 8 inline SVG luminance filters (`feColorMatrix` + `feComponentTransfer` discrete alpha masks).
  3. It stacks 8 identical layers of the image, each filtered to a specific luminance band.
  4. Layer 0 (darkest sumi ink dots) fades in first; Layers 1–7 stagger every `105ms` (`duration: 480ms`, `cubic-bezier(.3, 0, .35, 1)`).
  5. The result: The drawing magically builds up like dots of wet ink settling into handmade paper!

### Animation C: Living Indigo Book-Cloth (`book-journey.css` + `cover-indigo-veo-loop.mp4`)
* **How it works:** The top and bottom cover trim uses a muted, looping video (`cover-indigo-veo-loop-20261006.mp4`) masked inside `.cover-pattern`.
* **Breathing Filter:**
  ```css
  @keyframes cover-ink-tide { 
    0%, 100% { filter: brightness(1) saturate(0.95); }
    50% { filter: brightness(1.08) saturate(1.08); }
  }
  ```

### Animation D: Temple Seal Stamp Impact (`motion.json` L19–21)
* **How it works:** Simulates pressing a red woodblock vermilion seal onto paper:
  ```css
  @keyframes folio-stamp { 
    0% { opacity: 0.2; transform: scale(1.5); }
    100% { opacity: 1; transform: scale(1.0); }
  }
  ```

---

## 5. All 14 Book Leaves (Content & Layout Roster)

1. **Leaf 01 (`#hero-en` / `reader-arrival`):** Living book cover with indigo video borders, title lockup, "Replay the Ink" button, and shrine illustration.
2. **Leaf 02 (`#discover-en` / `reader-tour`):** 4-step feature tour tabs (Keep the page, Find your next visit, Read its history, Connect the memory) with phone frame screenshot preview.
3. **Leaf 03 (`reader-features`):** "Your Travel Journal" 3-column feature grid + editorial art note.
4. **Leaf 04 (`#scan-en` / `reader-scan`):** Step-by-step camera scanning instructions with step numbers.
5. **Leaf 05 (`#purpose-en` / `reader-memory`):** "Why GoShuin" mission statement with vermilion seal stamp.
6. **Leaf 06 (`#create-en` / `reader-generation`):** "Create Your Own Goshuin" generation preview.
7. **Leaf 07 (`reader-principles`):** "Visiting with Care" etiquette (3-column guide for shrine visitors).
8. **Leaf 08 (`#culture-en` / `reader-culture`):** History & Culture guide with article cards.
9. **Leaf 09 (`reader-history`):** Meiji Jingu historical spotlight with archival photography.
10. **Leaf 10 (`#trends-en` / `reader-data`):** National temple & shrine statistics breakdown.
11. **Leaf 11 (`#chart-en` / `reader-chart`):** Interactive SVG trend lines (2019–2024 changes).
12. **Leaf 12 (`reader-data-notes`):** Official sources and cultural research yearbook citations.
13. **Leaf 13 (`#support-en` / `reader-faq`):** Accordion FAQ section with interactive disclosure elements.
14. **Leaf 14 (`reader-closing`):** Final call to action, App Store badge, and colophon footer.

---

### How to use this folder with any coding agent:
Tell your agent:
> *"Implement our React web app following `D:\dandy_personal\Dandy_College\SEMESTER_3\Bisdig\Reffband\references\COMPLETE_SPEC_AND_ASSET_MANIFEST.md` and `ACCORDION_PAGING_GUIDE.md`. All CSS, JavaScript modules, assets, and 3D folding animations are already downloaded locally in the `css/`, `js/`, and `assets/` subfolders."*
