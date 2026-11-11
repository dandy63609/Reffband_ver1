# GoShuin Booklet Architecture & 3D Accordion Page Turn Guide

> [!IMPORTANT]
> **CRITICAL ARCHITECTURE WARNING FOR CODING AGENTS:**  
> **DO NOT build this site as a vertical top-to-bottom scrolling page.**  
> GoShuin is **NOT a vertical scroll website**. Its `scrollHeight` is strictly 100vh (`900px` on desktop).  
> It is an **Orihon (折本 - Japanese accordion booklet)**. The viewport is locked, and navigating between pages triggers a **horizontal 3D accordion fold animation**.

---

## 1. How the Layout Works (Viewport-Locked Book Shell)

### The Container Hierarchy
```html
<main class="goshuin-book is-book-reader">
  <!-- Fixed Header & Brand -->
  <header class="site-header">...</header>

  <!-- The Fixed Book Stage (No Vertical Window Scroll) -->
  <div class="reader-stage">
    <!-- Active Leaf (Only ONE leaf is visible at a time) -->
    <section class="reader-leaf" id="hero-en">
      <div class="reader-content">
        <!-- Content of the current spread -->
      </div>
    </section>

    <!-- Hidden Leaves (All other 13 pages have `hidden` attribute) -->
    <section class="reader-leaf" id="discover-en" hidden>...</section>
    <section class="reader-leaf" id="scan-en" hidden>...</section>
    ...
  </div>

  <!-- Bottom Paging Bar -->
  <nav class="reader-controls">
    <button data-reader-prev disabled>← Prev</button>
    <select data-reader-select>
      <option value="0">1 / 14 — Every Stamp, A Memory</option>
      <option value="1">2 / 14 — Explore GoShuin</option>
      ...
    </select>
    <button data-reader-next>Next →</button>
  </nav>

  <!-- Chapter Washi Fabric Strip at the bottom of the book -->
  <div class="footer-band" style="background-image: url('band-indigo-waves.webp')"></div>
</main>
```

### CSS Layout Rules
```css
/* Lock outer window */
html, body {
  overflow: hidden;
  height: 100vh;
  margin: 0;
}

/* The Book Spread */
.goshuin-book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 900px;
  padding: 24px 32px;
  background: var(--paper); /* #fdfcf9 */
  position: relative;
}

.reader-stage {
  flex: 1;
  position: relative;
  overflow: hidden;
  perspective: 2000px; /* Essential for 3D page folding! */
}

/* Each Page / Leaf */
.reader-leaf {
  position: absolute;
  inset: 0;
  display: block;
  overflow-y: auto; /* Internal scroll only if content overflows */
}

.reader-leaf[hidden] {
  display: none !important;
}
```

---

## 2. The 3D Accordion Page-Turn Engine (`fold()`)

When the user clicks "Next", swipes left, or presses the `→` arrow key:
The browser does **not** do a basic `transform: translateX(-100%)`. Instead, it clones the outgoing page and folds it into a physical **3D Z-fold mesh**.

### The Geometry of the 3D Z-Fold
1. **Split into 3 Panels:**
   The outgoing page is divided into 3 vertical slices (each `width / 3` wide):
   - `Panel 0`: `fold-leading`
   - `Panel 1`: `fold-mountain`
   - `Panel 2`: `fold-valley`
2. **Nested Hinges (`transform-style: preserve-3d`):**
   - Panel 1 is a child of Panel 0.
   - Panel 2 is a child of Panel 1.
3. **The 3D Rotation Formula:**
   As time `t` progresses over `1280ms`:
   * Angle $\theta$ opens up to $\approx 52^\circ$.
   * Panel 0 rotates by $+1 \cdot \theta$ around the Y-axis.
   * Panel 1 rotates relative to Panel 0 by $-2 \cdot \theta$ (hinging backward).
   * Panel 2 rotates relative to Panel 1 by $+2 \cdot \theta$ (hinging forward).
   * The entire structure translates along X (`shift`) and lifts toward the viewer along Z (`lift`).
4. **Dynamic Face Lighting (`accordion-light`):**
   * As a panel rotates away from the simulated top-left light source, its shading darkens (`#28251f`).
   * When facing the light, it warms up (`#fffbed`).
5. **Real-time Projected SVG Ground Shadow:**
   An SVG path (`<svg class="reader-fold-ground">`) calculates the shadow of the 3 folded vertices onto the ground paper below, with blur increasing as the page lifts.

---

## 3. How to Implement This in React

### Option A: Authentic 3D Orihon Fold in React
Use the captured source code in `book-reader.js` (lines 71–160). It is written in pure vanilla JS using `requestAnimationFrame`, nested `<div>`s, and CSS 3D transforms, and can be ported directly into a React custom hook (`useBookFold()`).

### Option B: High-Fidelity Framer Motion Alternative
If you prefer standard modern React animation libraries (Framer Motion), use an animated 3D presence transition:

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function GoshuinBook({ pages }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentPage((prev) => Math.max(0, Math.min(pages.length - 1, prev + newDirection)));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#fdfcf9] flex flex-col p-8">
      {/* Book Stage with 3D Perspective */}
      <div className="relative flex-1 perspective-[2000px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                rotateY: dir > 0 ? -45 : 45,
                x: dir > 0 ? "50%" : "-50%",
                opacity: 0,
                transformOrigin: dir > 0 ? "left center" : "right center",
              }),
              center: {
                rotateY: 0,
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 0.68, 0.2, 1], // --journey-ease
                },
              },
              exit: (dir: number) => ({
                rotateY: dir > 0 ? 55 : -55,
                x: dir > 0 ? "-60%" : "60%",
                opacity: 0,
                transformOrigin: dir > 0 ? "left center" : "right center",
                transition: {
                  duration: 0.8,
                  ease: [0.22, 0.68, 0.2, 1],
                },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 preserve-3d"
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <nav className="flex justify-between items-center py-4 border-t border-[#e5e1d8]">
        <button 
          onClick={() => paginate(-1)} 
          disabled={currentPage === 0}
          className="text-sm text-[#292824] disabled:opacity-30"
        >
          ← Prev
        </button>
        <span className="text-xs tracking-widest text-[#68665f]">
          {currentPage + 1} / {pages.length}
        </span>
        <button 
          onClick={() => paginate(1)} 
          disabled={currentPage === pages.length - 1}
          className="text-sm text-[#292824] disabled:opacity-30"
        >
          Next →
        </button>
      </nav>
    </div>
  );
}
```

---

## 4. Key Takeaways for Any Agent Coding This
1. **Never make the main window scrollable.** Set `overflow: hidden` on the container.
2. **Each section is a `reader-leaf` (1 page).** Only 1 leaf is active at a time.
3. **Paging moves horizontally** along the Y-axis (desktop) with 3D accordion folding or rotating page leaves.
4. **All files are downloaded locally:**
   - Look at `references/book-reader.js` (lines 71–160) for the exact mathematical formulas for the 3D accordion fold.
   - Look at `references/book-reader.css` for the 3D perspective and face lighting styles.
