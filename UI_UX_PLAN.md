# 🎸 Reffband UI/UX Plan: 3D Accordion Booklet & Horizontal Zine Architecture
**Adapted from the GoShuin Booklet Architecture (`references/ACCORDION_PAGING_GUIDE.md`, `TEARDOWN.md`, `COMPLETE_SPEC_AND_ASSET_MANIFEST.md`, `book-reader.js`, & `book-reader.css`)**  
**Design Lead:** Sally (🎨 UX Designer, `/bmad-agent-ux-designer`)  
**Status:** Approved New Architecture Plan  
**Target:** Reffband Digital EPK & Talent Matchmaking Platform  
**Viewport Specification:** Viewport-Locked Stage (`100vh`, strictly NO window vertical scroll) with 3D Accordion Z-Fold & Left-to-Right Slide Navigation  

---

## 1. Executive Summary & Design Vision

The updated reference codebase (`references/`) proves that modern, high-impact digital products do not need generic vertical scrolling feeds or heavy WebGL Three.js engines. Instead, the reference achieves a masterclass in interaction design through an **Orihon (折本 - Japanese accordion booklet)**:
1. **Strictly 100vh Viewport-Locked Shell:** The main window never scrolls vertically (`overflow: hidden; height: 100vh`).
2. **Horizontal Left-to-Right Slide:** Navigating between sections moves horizontally across the screen along the X/Y axes.
3. **The 3D Accordion Z-Fold Engine:** Switching pages clones the active DOM leaf into a 3-panel geometric accordion mesh (`fold-leading`, `fold-mountain`, `fold-valley`) that physically lifts ($Z$) and rotates ($\pm 52^\circ$ in 3D perspective) with dynamic face lighting and SVG ground shadow projection.

### 🎯 The Reffband Adaptation: The "Gig Zine & Cassette Case"
For **Reffband**, we directly translate this physical booklet paradigm into an authentic **Indie Music Gig Zine, Rehearsal Dossier & Cassette Mixtape Case**:
* **The Book Shell:** Rather than traditional washi paper, Reffband is bound in textured zine paper (`#FAF8F5`), vintage cardboard sleeves (`#F3EFEA`), and vinyl ink borders (`#14110F`).
* **The 3D Fold Experience:** When a user switches from the **Login/Gatekeeper** to the **Band Studio**, or an EO browses through the **Band EPK Dossier**, the page physically folds like a concert tour guide or unspools like an unfolded cassette J-card inlay!
* **The Bottom Paging Bar:** A persistent booklet navigator (`[← Prev] [1 / 5 — Screen Title] [Next →]`) sits at the bottom, anchored by a dynamic chapter fabric ribbon featuring checkered tape, vinyl grooves, or amplifier grilles.

---

## 2. Layout Hierarchy: The Viewport-Locked Book Stage

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. FIXED BRAND HEADER (.site-header)                                        │
│ [Logo "R" + REFFBAND]             [Role Switcher Pill]    [Paging Status]   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. THE 3D BOOK STAGE (.reader-stage, perspective: 2000px, 100vh locked)    │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ ACTIVE LEAF (.reader-leaf: 1 visible at a time, internal scroll only)  │  │
│  │                                                                       │  │
│  │  [Left-to-Right Slide Zone / 3D Z-Fold Geometric Transform Plane]     │  │
│  │                                                                       │  │
│  │  • Leaf 1: Cover & Gatekeeper (Pilihan Menu Band vs EO)               │  │
│  │  • Leaf 2: Band Studio Wizard (Create/Edit Profile Band 4-Step)       │  │
│  │  • Leaf 3: Band EPK Dossier Layout (Public Dossier @suarasenja)       │  │
│  │  • Leaf 4: EO Discovery & 1-Tap WA Booking (Search, Filter, Audition) │  │
│  │  • Leaf 5: UX Architecture Scorecard & Heuristic Verification         │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. PERSISTENT BOOKLET CONTROLS (.reader-controls)                           │
│ [← Prev Leaf]        <select> Page 1 / 5 — Cover Gate </select> [Next Leaf →]│
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. CHAPTER DECORATIVE RIBBON (.footer-band, checkered.glsl / vinyl groove)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Core CSS Container Rules (`book-reader.css` Alignment)
```css
/* 1. Lock outer window completely */
html, body {
  overflow: hidden;
  height: 100vh;
  margin: 0;
  background-color: #14110F;
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
}

/* 2. Physical Book Frame */
.reffband-book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 980px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 16px 28px 20px 28px;
  background: var(--paper, #FAF8F5);
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
}

/* 3. The 3D Stage */
.reader-stage {
  flex: 1;
  position: relative;
  overflow: hidden;
  perspective: 2000px; /* CRITICAL: Enables authentic 3D accordion depth */
  border: 2px solid #14110F;
  border-radius: 8px;
  background: #FBF8F1;
}

/* 4. Individual Leaf Slices */
.reader-leaf {
  position: absolute;
  inset: 0;
  display: block;
  overflow-y: auto; /* Internal scroll only if content overflows 100vh */
  overflow-x: hidden;
  background: #FBF8F1;
  transition: opacity 0.3s ease;
}

.reader-leaf[hidden] {
  display: none !important;
}
```

---

## 3. Motion & Animation Specification: Left-to-Right Slide & 3D Effect Slide

### 🚀 3.1. The Horizontal Left-to-Right Slide Navigation
Moving between pages does **not** jump instantaneously. It follows a coordinated horizontal choreography:
1. **Directional Flow:**
   * **Forward Navigation (Next / Right Arrow / Swipe Left):** Content slides from right to left ($X: +100\% \to 0 \to -100\%$).
   * **Backward Navigation (Prev / Left Arrow / Swipe Right):** Content slides from left to right ($X: -100\% \to 0 \to +100\%$).
2. **Gesture Interaction:**
   * Horizontal touch swipes on mobile and trackpad gestures on desktop trigger pagination when threshold $|\Delta X| \ge 48\text{px}$.
   * Rubber-band resistance is applied at Leaf 1 (Left limit) and Leaf 5 (Right limit).
3. **Keyboard Shortcuts:**
   * `ArrowRight` / `KeyL` $\to$ Next Leaf.
   * `ArrowLeft` / `KeyH` $\to$ Prev Leaf.
   * `Digit1` through `Digit5` $\to$ Jump directly to Leaf 1–5.

---

### 📦 3.2. The 3D Accordion Z-Fold Engine (`book-reader.js` Mathematical Translation)
When `show(index)` is invoked with 3D animation enabled:
1. **3-Panel Geometric Slicing:**
   The outgoing leaf is snapshotted and partitioned into 3 vertical panels, each exactly $\frac{\text{Stage Width}}{3}$ wide:
   * **Panel 0 (`fold-leading`):** Anchored to the left seam.
   * **Panel 1 (`fold-mountain`):** First crease, hinges backward.
   * **Panel 2 (`fold-valley`):** Second crease, hinges forward.
2. **Nested 3D Hinges:**
   Each panel is DOM-nested inside the previous panel with `transform-style: preserve-3d`, ensuring creases never detach during motion.
3. **The Physics Formula (Over Duration $T = 1280\text{ms}$):**
   $$\text{opening} = \text{smooth}(0.12, 0.62, t), \quad \text{departure} = \text{smooth}(0.52, 1.0, t)$$
   $$\theta(t) = 52^\circ \cdot \text{opening} + 26^\circ \cdot \text{departure}$$
   $$\text{Lift}_Z(t) = 22\text{px} \cdot \text{smooth}(0, 0.16, t) + 12\text{px} \cdot \text{opening} - 26\text{px} \cdot \text{departure}$$
   $$\text{Shift}_X(t) = (W - W\cos\theta) \cdot 0.22 + (\text{forward} ? -0.58 : 1.12) \cdot W \cdot \text{departure}$$
   * **Panel 0 Rotation:** $+1 \cdot \theta(t)$ around the Y-axis.
   * **Panel 1 Rotation:** $-2 \cdot \theta(t)$ relative to Panel 0.
   * **Panel 2 Rotation:** $+2 \cdot \theta(t)$ relative to Panel 1.
4. **Dynamic Face Lighting (`.accordion-light`):**
   * Virtual spotlight placed at top-left.
   * As Panel 1 rotates away from the light normal, illumination drops, shading with `#28251F` at up to 68% opacity.
   * Panels facing the light brighten with `#FFFBED` warmth.
5. **Real-Time Projected SVG Ground Shadow:**
   * An SVG `<path class="reader-fold-ground">` calculates the 3D polygon shadow of the 4 hinge coordinates onto the stage paper below.
   * Dynamic blur formula: `filter: blur(${2 + Lift_Z * 0.12 + \sin(\theta) * 3}px)`.

---

### 📱 3.4. Smartphone Adaptation Paradigm Shift (Viewport $\le 700\text{px}$): Horizontal Book Fold $\to$ Vertical Calendar Fold
> [!IMPORTANT]
> **HOW REFFBAND TRANSFORMS ON SMARTPHONES ($\le 700\text{px}$)**  
> Reffband does **not** simply shrink its desktop layout. It undergoes a fundamental behavioral and kinematic shift:  
> **It switches from a Horizontal Book Fold (`rotateY`) to a Vertical Calendar Fold (`rotateX`).**

#### 1. Core Behavioral Differences: Desktop vs. Phone

| Feature | Desktop / Tablet (> 700px) | Mobile Phone ($\le$ 700px) |
|---|---|---|
| **Fold Direction** | **Horizontal** (folds like a concert booklet) | **Vertical** (folds like a Japanese hanging calendar) |
| **Rotation Axis** | `rotateY(±52deg)` around Y-axis | `rotateX(±52deg)` around X-axis |
| **Hinge Origin** | `transform-origin: left center` | `transform-origin: center top` |
| **Control Arrows** | `← Previous` & `Next →` | `↑ Previous` & `Next ↓` |
| **Swipe Gestures** | Horizontal swipe (Left / Right) | Vertical swipe (Up / Down) |
| **Keyboard Controls** | `ArrowLeft` / `ArrowRight` | `ArrowUp` / `ArrowDown` |
| **Stage Touch Action** | Normal pointer tracking | `touch-action: pan-x` (allows natural scrolling inside leaves) |
| **Chained Hinges** | `.accordion-panel > .accordion-panel { left: 100%; top: 0; }` | `.accordion-panel > .accordion-panel { left: 0; top: 100%; }` |

#### 2. Mobile Touch & Gesture Mechanics (`MOBILE_PHONE_ADAPTATION_GUIDE.md`)
On smartphones, page transitions are governed by directional touch pointer physics:
```javascript
// Mobile touch detection threshold
const vertical = matchMedia('(max-width: 700px)');
let touch = null;

stage.addEventListener('pointerdown', (e) => {
  // Ignore touches on interactive child elements (buttons, links, inputs)
  if (e.target.closest('button, a, input, select, textarea, summary')) return;
  touch = { x: e.clientX, y: e.clientY };
}, { passive: true });

stage.addEventListener('pointerup', (e) => {
  if (!touch) return;
  const dx = e.clientX - touch.x;
  const dy = e.clientY - touch.y;
  touch = null;

  // On phones (<=700px), evaluate vertical travel (dy)
  // On desktop/tablet (>700px), evaluate horizontal travel (dx)
  const distance = vertical.matches ? dy : dx;
  const cross = vertical.matches ? dx : dy;

  // Trigger page change only if swipe distance exceeds 65px and dominates cross-axis by 1.3x
  if (Math.abs(distance) > 65 && Math.abs(distance) > Math.abs(cross) * 1.3) {
    if (distance < 0) {
      nextLeaf(); // Swipe up on phone -> Next Leaf
    } else {
      prevLeaf(); // Swipe down on phone -> Prev Leaf
    }
  }
}, { passive: true });
```

#### 3. The Vertical 3D Accordion Fold for Phones
1. **Horizontal Strip Slicing:**
   The page is sliced into 3 horizontal panels across its height rather than vertical columns:
   ```javascript
   const panelSize = (isVertical ? height : width) / 3;
   panel.style.width = isVertical ? `${width}px` : `${panelSize}px`;
   panel.style.height = isVertical ? `${panelSize}px` : '100%';
   
   // Position cloned snapshots
   snapshot.style.left = isVertical ? '0px' : `${-i * panelSize}px`;
   snapshot.style.top = isVertical ? `${-i * panelSize}px` : '0px';
   ```
2. **Rotation Along X-Axis:**
   ```javascript
   const axis = isVertical ? 'X' : 'Y';
   const travel = isVertical ? 'Y' : 'X';
   panel.style.transform = `translate${travel}(${i === 0 ? shift : 0}px) translateZ(${i === 0 ? lift : 0}px) rotate${axis}(${relative * angle}deg)`;
   ```

#### 4. Mobile Shell & Responsive Elevation
* **Book Margin & Width:** `margin: 6px 4px 16px; width: calc(100% - 8px);`
* **Stacked Washi Paper Layer Shadows:** Simulates authentic multi-layered book edge thickness:
  ```css
  box-shadow: 
    0 1px 3px rgba(64, 48, 28, 0.05),
    0 9px 16px -10px rgba(58, 43, 33, 0.29),
    0 20px 32px -23px rgba(58, 43, 33, 0.22),
    2px 1px 0 #c7b99f,   /* page 1 edge */
    4px 2px 0 #f6f0e3,   /* page 2 edge */
    5px 3px 0 #cbbda4 !important; /* bottom cover edge */
  ```
* **Compact Header:** Height drops to **`49px`**, brand title scales to **`23px`**, brand tagline hidden to preserve vertical screen real estate.
* **Footer Ribbon:** Drops from `88px` to **`68px`**.
* **Responsive Stacking:** All multi-column grids (Leaf 1 Hero/Gatekeeper, Leaf 2 4-step wizard, Leaf 3 3-column EPK dossier, Leaf 4 cassette roster, Leaf 5 scorecard) collapse into single-column responsive stacks with `12-16px` gaps.

---

### ⚛️ 3.5. React / Framer Motion Dual-Mode Implementation
For production React codebases, this responsive hook dynamically switches the animation orientation:

```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function useResponsiveOrientation() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

export const ResponsiveReffbandStage = ({ leaves }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isMobile = useResponsiveOrientation();

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => Math.max(0, Math.min(leaves.length - 1, prev + newDirection)));
  };

  return (
    <div className={`relative w-full h-[100vh] overflow-hidden bg-[#14110F] flex flex-col ${isMobile ? 'p-2' : 'p-6'}`}>
      <div className="relative flex-1 perspective-[2000px] overflow-hidden border-2 border-[#14110F] rounded-lg bg-[#FBF8F1]">
        <AnimatePresence initial={false} custom={{ direction, isMobile }}>
          <motion.div
            key={current}
            custom={{ direction, isMobile }}
            variants={{
              enter: ({ direction, isMobile }) => ({
                ...(isMobile ? {
                  rotateX: direction > 0 ? -48 : 48,
                  y: direction > 0 ? "55%" : "-55%",
                  transformOrigin: "center top"
                } : {
                  rotateY: direction > 0 ? -48 : 48,
                  x: direction > 0 ? "60%" : "-60%",
                  transformOrigin: direction > 0 ? "left center" : "right center"
                }),
                scale: 0.94,
                opacity: 0
              }),
              center: {
                rotateX: 0,
                rotateY: 0,
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
                transition: { duration: 0.85, ease: [0.22, 0.68, 0.2, 1] }
              },
              exit: ({ direction, isMobile }) => ({
                ...(isMobile ? {
                  rotateX: direction > 0 ? 54 : -54,
                  y: direction > 0 ? "-60%" : "60%",
                  transformOrigin: "center top"
                } : {
                  rotateY: direction > 0 ? 54 : -54,
                  x: direction > 0 ? "-65%" : "65%",
                  transformOrigin: direction > 0 ? "left center" : "right center"
                }),
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.85, ease: [0.22, 0.68, 0.2, 1] }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 preserve-3d"
          >
            {leaves[current].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Bottom Paging Bar */}
      <nav className={`flex justify-between items-center ${isMobile ? 'py-2 px-3' : 'py-3 px-4'} bg-[#FAF8F5] border-t-2 border-[#14110F] mt-2 rounded`}>
        <button
          onClick={() => paginate(-1)}
          disabled={current === 0}
          className="font-mono text-xs font-bold px-3 py-2 border-2 border-[#14110F] bg-[#F5C542] disabled:opacity-30 disabled:pointer-events-none"
        >
          {isMobile ? '↑ PREV' : '← PREV LEAF'}
        </button>

        <span className="font-mono text-[11px] font-bold tracking-wider text-[#14110F]">
          LEAF {current + 1} / {leaves.length}
        </span>

        <button
          onClick={() => paginate(1)}
          disabled={current === leaves.length - 1}
          className="font-mono text-xs font-bold px-3 py-2 border-2 border-[#14110F] bg-[#F5C542] disabled:opacity-30 disabled:pointer-events-none"
        >
          {isMobile ? 'NEXT ↓' : 'NEXT LEAF →'}
        </button>
      </nav>
    </div>
  );
};
```

---

## 4. The 5 Booklet Leaves: Detailed Content & Interaction Architecture

### 🎸 Leaf 1: Cover & Gatekeeper Spread (Pilihan Menu Band vs EO)
* **Title:** `01 / 05 — Cover & Gatekeeper (Pilihan Peran)`
* **Chapter Ribbon:** Wine & Mustard Checkered Glitch Strip (`checkered.glsl`).
* **Layout Structure (Dual-Panel Spread):**
  * **Left Side (The Hero Stage):**
    * Brand Lockup: Official Reffband "R" Logo + Archivo Black headline: *"HUBUNGKAN BAND INDIE DENGAN PANGGUNG IMPIAN"*.
    * Collage elements extracted from references: Silhouette band stage, vintage concert ticket stubs, and vinyl record emergence.
    * Role Switcher pill in navbar: Toggle between Band and EO view at any time without logging out.
  * **Right Side (The 2-Card Gatekeeper):**
    * **Card A (🎸 Musisi / Band):** High-contrast maroon card `#7E1929` featuring the extracted **MK-60 Compact Cassette cutout** (`cassette-mk60-cutout.png`). Copy: *"Saya Musisi/Band: Buat Profil EPK, Unggah Lagu Demo & Terima Tawaran Panggung"*. CTA: `MASUK KE STUDIO BAND ➔` (Directs to Leaf 2).
    * **Card B (☕ Event Organizer / Venue):** Mustard yellow card `#F5C542` featuring the extracted **12-Inch Red Vinyl LP cutout** (`vinyl-lp-cutout.png`). Copy: *"Saya Event Organizer: Cari Band Kurasi, Dengar Lagu 30s & Hubungi Manajer Langsung"*. CTA: `CARI BAND SEKARANG ➔` (Directs to Leaf 4).

---

### 🎛️ Leaf 2: Band Studio Wizard Spread (Create & Edit Band Profile)
* **Title:** `02 / 05 — Studio Wizard (Create Profile Band)`
* **Chapter Ribbon:** Magnetic Tape Texture (`band-cassette-ribbon`).
* **Layout Structure (2-Column Wizard Spread):**
  * **Left Column (4-Step Accordion Form):**
    * **Step 1 — Identitas & Genre:** Nama band, asal kota, tarif manggung (*Rate Card*), dan *multi-select chips* genre (*Indie Pop, Midwest Emo, Alternative Rock, Grunge, Folk*).
    * **Step 2 — Upload Portofolio Audio Demo:** Drag-and-drop file upload zone berbingkai Kaset MK-60 untuk MP3/WAV (maks. 15MB) + *visual audio waveform scrubber* + input tautan Spotify & YouTube.
    * **Step 3A — Riwayat Event & Panggung:** Tabel interaktif daftar panggung yang pernah dimainkan (Nama Acara, Venue/Kota, Tanggal, dan tombol `+ Tambah Event`).
    * **Step 3B — Dokumentasi Latihan Studio:** Upload foto latihan bergaya Polaroid + input link video rehearsal (mencegah band fiktif, memberikan bukti kesiapan panggung ke EO).
    * **Step 4 — Sosial Media & Technical Rider Checklist:** Input Instagram, TikTok, WhatsApp manajer, serta checklist alat instrumen (kebutuhan drum kit, mikrofon vokal, amplifier gitar/bass, DI box).
  * **Right Column (Instant UX Feedback & Preview):**
    * **EPK Completeness Meter:** Indikator visual progres pengisian form bertuliskan `100% VERIFIED READY` dengan status verifikasi instan.
    * **Live Cassette Card Preview:** Kartu kaset dinamis yang otomatis memperbarui judul lagu, nama band, dan stempel stiker secara real-time saat musisi mengetik di form.

---

### 📄 Leaf 3: Full Band Profile Layout Spread (Public EPK Dossier)
* **Title:** `03 / 05 — EPK Dossier (Layout Profil Band)`
* **Chapter Ribbon:** Sunburst Stage Lighting Strip (`sunburst.glsl`).
* **Layout Structure (3-Column Concert Zine Dossier):**
  * **Public Navbar:** Tautan URL publik yang bisa dibagikan langsung ke panitia (`reffband.id/@suarasenja`) + tombol salin tautan 1-klik.
  * **Hero Stage Banner:** Kolase siluet panggung band, stiker notasi musik (`music-notes-sticker.png`), badge domisili *"JAKARTA SELATAN"*, tarif booking *"Rp 1.000.000 / GIG"*, dan tombol utama `BOOKING BAND VIA WHATSAPP ➔`.
  * **Column 1 — Audio Demo & Diskografi:** Pemutar kaset MK-60 30-detik dengan animasi reel berputar, lirik lagu andalan, dan grid piringan hitam (*vinyl discography*).
  * **Column 2 — Dokumentasi Latihan & Riwayat Event:** Foto Polaroid sesi latihan studio dengan stempel tanggal, klip video latihan mini, dan susunan tiket konser (*ticket stubs*) dari gig sebelumnya.
  * **Column 3 — Technical Stage Rider & Kontak:** Matriks kebutuhan teknis audio panggung (mic, amp, direct box) dalam format siap-unduh PDF + tautan profil media sosial terverifikasi.

---

### 🔍 Leaf 4: EO Talent Discovery & Audition Spread (Search, Filter & Deal)
* **Title:** `04 / 05 — EO Discovery (Cari & Filter Band)`
* **Chapter Ribbon:** 33 RPM Vinyl Groove & Amplifier Mesh Strip.
* **Layout Structure:**
  * **Top Filter Bar:** Input pencarian instan nama band/kota, chip filter genre cepat (*Indie Folk, Alternative Rock, Midwest Emo, Grunge, Pop Punk*), dan dropdown rentang budget (*< Rp 1 Jt, Rp 1 - 3 Jt, > Rp 3 Jt*).
  * **Cassette Talent Roster (Grid 3 Kartu Kaset):**
    * **Kartu 1 (Suara Senja):** Kaset oranye MK-60, genre Indie Folk, tarif Rp 1.000.000, tombol `▶ PLAY 30s DEMO` (langsung memutar audio di tempat tanpa buka tab baru).
    * **Kartu 2 (Distorsi Muda):** Kaset grunge merah, genre Alternative Rock, tarif Rp 2.500.000, badge `VERIFIED BAND`.
    * **Kartu 3 (Kala Senja Akustik):** Kaset kuning, genre Akustik Cafe, tarif Rp 800.000.
  * **Bottom Sticky Handshake Bar (1-Tap WhatsApp Booking Payload):**
    * Saat EO menekan tombol `AJUKAN JADWAL MANGGUNG`, sistem langsung menyusun draf pesan WhatsApp resmi ke manajer band:
      ```
      "Halo Manajer [Nama Band], kami dari [Nama EO] tertarik untuk mengundang 
      tampil di acara [Nama Acara] pada tanggal [Tanggal] di [Lokasi]. 
      Kami telah meninjau EPK & Technical Rider Anda di Reffband..."
      ```

---

### 📊 Leaf 5: UX Architecture Scorecard & Heuristic Verification Spread
* **Title:** `05 / 05 — UX Evaluation (Cara Memastikan Kualitas UX Bagus)`
* **Chapter Ribbon:** Zine Edge Cutout Strip.
* **Layout Structure:**
  * Papan audit interaksi yang memvalidasi bahwa sistem memenuhi 6 hukum UX:
    1. **Hick's Law (Role Clarity):** Di Leaf 1, pengguna langsung disajikan 2 pilihan kartu yang jelas (Band vs EO) tanpa formulir berbelit-belit.
    2. **Goal-Gradient Effect:** Progres pengisian form di Leaf 2 dipecah menjadi 4 kartu terstruktur dengan *Completeness Meter* 100% dan Live Cassette Preview.
    3. **Zero-Page-Load Audio Audition:** Di Leaf 4, EO dapat mengaudisi 5 band dalam 60 detik langsung di tempat menggunakan inline 30s cassette player tanpa harus membuka tab Linktree eksternal.
    4. **Trust & Verification Signals:** Di Leaf 3, EO melihat bukti nyata kesiapan band (foto latihan studio, riwayat event, technical rider lengkap).
    5. **WCAG AAA Contrast & Fitts's Law:** Rasio kontras teks 14.8:1 (`#14110F` di atas kertas `#FBF8F1`), dan seluruh area klik tombol berukuran $\ge 44\text{px}$.
    6. **Seamless 3D Paging:** Navigasi horizontal dengan 3D accordion fold memberikan kepuasan taktil (*tactile delight*) tanpa membebani performa browser.

---

## 5. Token Desain Terintegrasi & Perbandingan dengan GoShuin

| Token Kunci | Nilai Referensi GoShuin | Adaptasi Reffband Indie Zine | Catatan Desain |
| :--- | :--- | :--- | :--- |
| **Stage Height** | `100vh` (max `900px`) | `100vh` (max `980px`) | Strictly locked viewport, no vertical window scrolling. |
| **3D Perspective** | `perspective: 2000px;` | `perspective: 2000px;` | Menghasilkan kedalaman lipatan kertas yang realistis tanpa distorsi fish-eye. |
| **Fold Angle ($\theta$)** | $\approx 52^\circ$ | $\approx 52^\circ$ | Sudut lipatan Z-fold saat transisi halaman berlangsung. |
| **Transition Ease** | `cubic-bezier(0.22, 0.68, 0.2, 1)` | `cubic-bezier(0.22, 0.68, 0.2, 1)` | Easing fisik alami saat buku dibuka dan ditutup. |
| **Primary Color** | `--vermilion: #a6362f` | `--primary-wine: #7E1929` | Warna resmi Reffband (dari logo "R"). |
| **Accent Color** | `--sage: #b7c6b3` | `--cassette-mustard: #F5C542` | Aksen kuning mustard panggung indie (dari video teaser). |
| **Surface Color** | `--paper: #fdfcf9` | `--paper-cream: #FAF8F5` | Tekstur kertas zine konser musik underground. |
| **Ink Color** | `--ink: #292824` | `--vinyl-ink: #14110F` | Tinta cetak sablon zine kontras tinggi. |

---

## 6. Verifikasi & Langkah Penerapan

1. **Prototipe Interaktif:** File prototipe interaktif [`design-system-preview.html`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/design-system-preview.html) akan diperbarui untuk mengintegrasikan mesin **Horizontal Left-to-Right Slide** dan **3D Accordion Fold**.
2. **Kanvas Pen.dev:** Seluruh 5 leaf dirancang berdampingan secara horizontal pada kanvas pen.dev dengan kontrol pagination terpadu.
3. **Dokumen Terkait:**
   * [`EXPERIENCE.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/EXPERIENCE.md) dimutakhirkan dengan model interaksi 3D booklet.
   * [`DESIGN.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/DESIGN.md) dimutakhirkan dengan token 3D perspective & booklet shell.
   * [`PRD.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/PRD.md) tetap menjadi landasan persyaratan fungsional matchmaking Band dan EO.
