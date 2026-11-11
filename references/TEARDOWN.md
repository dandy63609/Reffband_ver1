# Teardown: GoShuin (AE Studio)

**URL:** https://aestudio.studio/goshuin/en  
**Analyzed:** 2026-11-07 @ 1440px / 768px / 390px  
**Platform:** Custom Vanilla Web Architecture (zero framework bloat) — CONFIRMED  
**Built by:** AE Studio (`aestudio.studio`) — CONFIRMED  
**Surfaces:** 14 DOM Book Leaves, 0 GPU Canvas, 2 Looping Video Patterns — CONFIRMED  

---

## 1. Executive Summary & Design Vibe
> [!CAUTION]
> **DO NOT BUILD AS A VERTICAL TOP-TO-BOTTOM SCROLL PAGE.**  
> GoShuin is **NOT a vertical scrolling website**. Its document scroll height is strictly 100vh (`900px`).  
> It is an **Orihon (折本 - Japanese accordion booklet)**. The screen is a viewport-locked stage, and moving between leaves triggers a **horizontal 3D accordion fold animation** (rotating $\pm 52^\circ$ in 3D perspective).  
> **See the full implementation guide:** [`ACCORDION_PAGING_GUIDE.md`](./ACCORDION_PAGING_GUIDE.md).

GoShuin is an editorial, Japanese-style virtual booklet showcasing an iPhone travel journal app. 
Instead of typical generic SaaS gradients or heavy Three.js 3D models, it uses **washi paper tones, traditional Japanese mineral pigment colors (vermilion, indigo, pine, sage), classical serif typography, and tactile ink reveals** executed with pure CSS.

---

## 2. Stack (From Runtime Probe)

| Layer | What | Evidence |
|---|---|---|
| **Framework** | Vanilla HTML5 / Modular ES6 Scripts | No React, Vue, Next, Nuxt, or Webflow markers found (`raw-recon.json`) — CONFIRMED |
| **Scripts** | Modular book architecture (`book-reader.js`, `book-journey.js`, `journey.js`) | `<script>` inspection in `raw-recon.json` — CONFIRMED |
| **Animation Engine** | Native CSS `@keyframes` + CSS Transitions (`--journey-ease`) | `motion.json › keyframes, transitions` — CONFIRMED |
| **Scroll / Paging** | Native CSS `scroll-snap` + `IntersectionObserver` (7 target clusters) | `surface-map.json › scroll.scrollSnap: true`, `motion.json` — CONFIRMED |
| **3D / GPU** | **None (Pure DOM)** — Fabric motion is rendered via looping MP4 video | `surface-map.json › counts.canvas: 0, video: 2` — CONFIRMED |
| **Typography** | Classical Editorial Serif + Apple System Sans | `tokens-1440.json › fonts` — CONFIRMED |

---

## 3. Measured Design System (Exact Tokens)

### Color Palette (Extracted Tokens)
```css
:root {
  /* Surface & Paper */
  --paper: #fdfcf9;       /* Primary warm washi paper background */
  --warm-paper: #f8f6ef;  /* Subtle card elevation / inner spread */
  --line: #e5e1d8;        /* Hairline borders & book dividers */

  /* Text & Ink */
  --ink: #292824;         /* Primary sumi ink black (softer than #000) */
  --muted: #68665f;       /* Editorial body & secondary notes */

  /* Traditional Japanese Accent Pigments */
  --vermilion: #a6362f;   /* Shinto torii vermilion (stamps, badges, links) */
  --coral: #943e37;       /* Muted lacquer red */
  --forest: #2f493e;      /* Deep temple pine green */
  --sage: #b7c6b3;        /* Soft matcha / bamboo sage */
  
  /* Motion & Easing */
  --journey-ease: cubic-bezier(0.22, 0.68, 0.2, 1);
}
```

### Type Scale (@ 1440px Desktop)
* **Font Families:**
  * **Editorial / Display:** `Georgia, "Hiragino Mincho ProN", "Yu Mincho", serif`
  * **UI / Body / Sans:** `-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif`
* **Hierarchy:**
  * **H1 / Hero Title:** `25px` · weight `400` · letter-spacing `-0.625px` (`Georgia / Mincho`)
  * **H2 / Chapter Headings:** `23px` · weight `400` · line-height normal
  * **Editorial Body:** `16px` · line-height `29.6px` (1.85 line-height ratio — generous book-style vertical rhythm)
  * **Buttons / Controls:** `12px` – `13px` · line-height `16.8px` · weight `400`
  * **Kickers / Eyebrows:** `9px` – `11px` · uppercase · tracked letter-spacing `+0.3px` to `+0.88px`

### Layout & Book Shell
* **Outer Margin:** `32px` horizontal padding, `24px` top margin.
* **Aspect Structure:** Centered book spread with physical page borders (`border: 1px solid rgb(214, 209, 197)`).
* **Radii:** Subtle and disciplined (`4px` to `8px` max for buttons and paper leaves; no cartoonish large pill shapes).

---

## 4. Key Motion & Interaction Reveals

### Reveal #1: The Ink Brush Reveal (`folio-ink`)
* **What it looks like:** Text and stamp details unroll smoothly across the page like fresh ink brushing on paper.
* **The Secret:** Pure CSS `clip-path` transition:
```css
@keyframes folio-ink { 
  0% { clip-path: inset(0px 100% 0px 0px); }
  100% { clip-path: inset(0px); }
}
```
* **Why it works:** It requires zero JavaScript canvas math. By animating `clip-path: inset()`, the GPU composites the reveal smoothly at 60–120fps.

### Reveal #2: The Temple Seal Stamp (`folio-stamp`)
* **What it looks like:** A red goshuin vermilion stamp presses down firmly onto the book leaf.
* **The Secret:** Scale drop with opacity build:
```css
@keyframes folio-stamp { 
  0% { opacity: 0.2; transform: scale(1.5); }
  100% { opacity: 1; transform: scale(1.0); }
}
```
* **Timing:** Paired with an ease-out timing curve to simulate physical pressure.

### Reveal #3: Living Indigo Book-Cloth Texture
* **What it looks like:** The fabric borders of the book cover subtly shimmer and ripple with living dye.
* **The Secret:** Instead of a heavy WebGL Three.js shader, it is a micro-optimized looping `<video>`:
  * Asset: `cover-indigo-veo-loop-20261006.mp4` (muted, loop, playsinline)
  * CSS Tide filter animation:
  ```css
  @keyframes cover-ink-tide { 
    0%, 100% { filter: brightness(1) saturate(0.95); }
    50% { filter: brightness(1.08) saturate(1.08); }
  }
  ```

---

## 5. Assets Captured & Cataloged

All captured artifacts are saved in your local directory:
* **Screenshots:**
  * Desktop full view: `captures/full-1440.png`
  * Desktop hero view: `captures/hero-1440.png`
  * Tablet view: `captures/full-768.png`
  * Mobile view: `captures/full-390.png`
* **Machine Evidence:**
  * `surface-map.json` — Canvas/Video/DOM classification
  * `motion.json` — Keyframes, transitions, and IO observers
  * `tokens-1440.json`, `tokens-768.json`, `tokens-390.json` — Measured responsive tokens
  * `raw-recon.json` & `snapshot.html` — Full DOM snapshot

---

## 6. How to Use This in Your React Project

When you are ready to build your React app using this style, you can configure your `tailwind.config.js` or CSS variables directly with these tokens:

```javascript
// tailwind.config.js theme extension
module.exports = {
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#fdfcf9', warm: '#f8f6ef' },
        ink: { DEFAULT: '#292824', muted: '#68665f' },
        line: '#e5e1d8',
        vermilion: '#a6362f',
        forest: '#2f493e',
        sage: '#b7c6b3',
      },
      fontFamily: {
        editorial: ['Georgia', '"Hiragino Mincho ProN"', '"Yu Mincho"', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Hiragino Kaku Gothic ProN"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'journey': 'cubic-bezier(0.22, 0.68, 0.2, 1)',
      }
    }
  }
}
```
