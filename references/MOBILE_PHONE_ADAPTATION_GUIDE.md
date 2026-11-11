# GoShuin Mobile & Phone UI/UX Adaptation Guide

> [!IMPORTANT]
> **HOW GOSHUIN TRANSFORMS ON SMARTPHONES (Viewport $\le$ 700px)**  
> GoShuin does **not** simply shrink its desktop layout. It undergoes a major behavioral shift:  
> **It switches from a Horizontal Book Fold to a Vertical Calendar Fold.**

---

## 1. Core Behavioral Differences: Desktop vs. Phone

| Feature | Desktop / Tablet (> 700px) | Mobile Phone ($\le$ 700px) |
|---|---|---|
| **Fold Direction** | **Horizontal** (folds like a book) | **Vertical** (folds like a Japanese hanging calendar) |
| **Rotation Axis** | `rotateY(±52deg)` around Y-axis | `rotateX(±52deg)` around X-axis |
| **Hinge Origin** | `transform-origin: left center` | `transform-origin: center top` |
| **Control Arrows** | `← Previous` & `Next →` | `↑ Previous` & `Next ↓` |
| **Swipe Gestures** | Horizontal swipe (Left / Right) | Vertical swipe (Up / Down) |
| **Keyboard Controls** | `ArrowLeft` / `ArrowRight` | `ArrowUp` / `ArrowDown` |
| **Stage Touch Action** | Normal pointer tracking | `touch-action: pan-x` (allows natural scrolling inside leaves) |

---

## 2. Phone Touch & Gesture Mechanics (`book-reader-d796e39c0771.js`)

On mobile devices, page turns are controlled by native touch pointer gestures:

```javascript
// Mobile touch detection threshold
const vertical = matchMedia('(max-width: 700px)');
let touch = null;

stage.addEventListener('pointerdown', (e) => {
  // Ignore touches on interactive child elements (buttons, links, inputs)
  if (e.pointerType !== 'touch' || e.target.closest('button, a, input, select, summary')) return;
  touch = { x: e.clientX, y: e.clientY };
}, { passive: true });

stage.addEventListener('pointerup', (e) => {
  if (!touch) return;
  const dx = e.clientX - touch.x;
  const dy = e.clientY - touch.y;
  touch = null;

  // On phones (<=700px), check vertical swipe distance (dy)
  // On desktop/tablet, check horizontal swipe distance (dx)
  const distance = vertical.matches ? dy : dx;
  const cross = vertical.matches ? dx : dy;

  // Trigger page change only if swipe distance exceeds 65px and is predominantly in the primary axis
  if (Math.abs(distance) > 65 && Math.abs(distance) > Math.abs(cross) * 1.5) {
    show(current + (distance < 0 ? 1 : -1));
  }
}, { passive: true });
```

---

## 3. The Vertical 3D Accordion Fold for Phones

When folding on a phone:
1. Slices the page into **3 horizontal strips** instead of vertical columns:
   ```javascript
   const panelSize = (isVertical ? height : width) / 3;
   
   panel.style.width = isVertical ? `${width}px` : `${panelSize}px`;
   panel.style.height = isVertical ? `${panelSize}px` : '100%';
   
   // Position slices
   snapshot.style.left = isVertical ? '0px' : `${-i * panelSize}px`;
   snapshot.style.top = isVertical ? `${-i * panelSize}px` : '0px';
   ```
2. Applies 3D rotation along the **X-axis**:
   ```javascript
   const axis = isVertical ? 'X' : 'Y';
   const travel = isVertical ? 'Y' : 'X';
   panel.style.transform = `translate${travel}(${i === 0 ? shift : 0}px) translateZ(${i === 0 ? lift : 0}px) rotate${axis}(${relative * angle}deg)`;
   ```
3. Book cover hinge switches to top:
   ```css
   @media (max-width: 700px) {
     .is-book-reader .book-cover {
       transform-origin: center top;
     }
     .is-book-reader .book-cover-back {
       transform: rotateX(180deg);
     }
   }
   ```

---

## 4. Mobile Layout & Responsive Adjustments (`@media (max-width: 700px)`)

### Book Frame & Elevation
* **Desktop:** `padding: 24px 32px`
* **Phone:** `margin: 10px 9px 24px; width: calc(100% - 18px);`
* **Stacked Paper Layer Shadow (Simulating real washi pages stacked):**
  ```css
  .is-book-reader .goshuin-book {
    box-shadow: 
      0 1px 3px #40301c0d,
      0 9px 16px -10px #3a2b214a,
      0 20px 32px -23px #3a2b2138,
      2px 1px 0 #c7b99f,   /* page 1 edge */
      4px 2px 0 #f6f0e3,   /* page 2 edge */
      5px 3px 0 #cbbda4;   /* bottom cover edge */
  }
  ```

### Header & Topline
* Header height drops to **`49px`** (compact single line).
* Brand font size scales down from `25px` to **`23px`**; icon scales to `24px`.
* Nav links collapse to an accessible dropdown or compact chapter pills.

### Content Adjustments
* **Tour Section (Leaf 02):** The side-by-side tour steps + phone frame collapse into a vertical stack; phone screenshot width scales to `211px` with a `25px` border radius.
* **Culture Grid (Leaf 08):** 3-column card grid collapses to a single column with `12px` gaps.
* **Stats Chart (Leaf 11):** Chart heading switches from flex row to `flex-direction: column`, and segmentation buttons span full width.
* **Washi Bottom Ribbon (`.footer-band`):** Drops from `88px` to **`68px`**.
* **Mobile Download Bar:** A fixed bottom banner (`<aside class="mobile-download">`) appears at the base of the screen offering an App Store download button.

---

## 5. React Implementation Summary for Phone

When building the responsive React component:

```tsx
import { useEffect, useState } from "react";

export function useResponsiveOrientation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

// In your 3D presence animation:
// If isMobile == true:
//   Animate rotateX (-45deg to +45deg) and translateY
//   Control text: "↑ Prev" and "Next ↓"
// If isMobile == false:
//   Animate rotateY (-45deg to +45deg) and translateX
//   Control text: "← Prev" and "Next →"
```
