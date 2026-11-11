---
name: Reffband Design System
description: Visual identity, tokens, 3D accordion booklet geometry, and component specifications for Reffband — featuring hardware-accelerated tactile zine & cassette VFX.
version: 2.0.0
status: approved
updated: 2026-11-07
colors:
  # Primary Brand Identity (Derived from Reffband Logo & Teaser Motion)
  primary: '#7E1929'               # Deep Wine Maroon / Stage Burgundy
  primary-hover: '#661220'         # Darker wine on press/hover
  primary-focus: '#9B2338'         # Radiant crimson focus ring
  primary-subtle: '#F7EDEE'        # Soft tinted wine container
  on-primary: '#FFFFFF'            # Crisp white on primary

  # Secondary & Stage Accents (Derived from Cassette & Teaser References)
  secondary: '#F5C542'             # Indie Stage Mustard Yellow (From Video Teaser & Marquee)
  secondary-amber: '#E65C00'       # Vintage Fe Cassette Orange / High-gain accent
  secondary-subtle: '#FEF9E7'      # Warm mustard tinted backing
  on-secondary: '#14110F'          # Deep vinyl ink on yellow
  accent-cyan: '#00A8B5'           # Electric Stage Light / Nirvana Nevermind Blue
  accent-cyan-subtle: '#E6F8FA'    # Subtle blue wash for filters and audio meters
  on-accent-cyan: '#0B2D31'        # Deep navy on stage blue

  # Backgrounds & Paper Surfaces (Lo-fi Analog Cassette & Booklet Leaf Aesthetics)
  surface: '#FAF8F5'               # Vintage Tape Paper / Off-white cream
  surface-dim: '#ECE7E1'           # Kraft paper border & table divider
  surface-bright: '#FBF8F1'        # Pure zine paper white
  surface-card: '#FFFFFF'          # Elevated card surface
  surface-tape: '#F3EFEA'          # Cassette label texture backing / Inset leaf
  surface-dark: '#14110F'          # Vinyl Black / Stage Dark Mode container
  surface-dark-card: '#1F1F23'     # Dark amplifier grill surface

  # Typography & Content (Zine Ink & High Contrast)
  text-primary: '#14110F'          # Heavy Vinyl Ink Black (14.8:1 contrast on surface-bright)
  text-secondary: '#52525B'        # Muted cassette grey
  text-tertiary: '#71717A'         # Cassette serial & timestamp mono grey
  text-on-dark: '#FBF8F1'          # Cream white on vinyl dark surfaces
  text-on-dark-muted: '#A1A1AA'    # Muted grey on dark

  # Borders & Outlines
  border-subtle: '#E4DFD7'         # Warm analog paper border
  border-bold: '#14110F'           # 2px/3px zine/sticker solid ink outline
  border-focus: '#7E1929'          # Focus highlight border

  # 3D Accordion & Perspective Tokens (From references/ACCORDION_PAGING_GUIDE.md & MOBILE_PHONE_ADAPTATION_GUIDE.md)
  stage-perspective: '2000px'      # Viewport perspective for realistic 3D paper fold
  fold-duration: '1280ms'          # Duration of full 3D Z-fold page turn
  fold-angle-max: '52deg'          # Peak opening angle theta during accordion departure
  fold-lift-max: '22px'            # Z-axis elevation toward viewer during page fold
  
  # Mobile Phone Adaptation Tokens (<=700px)
  mobile-header-height: '49px'     # Compact mobile single-line header
  mobile-footer-ribbon: '68px'     # Scaled down bottom decorative ribbon
  mobile-axis: 'rotateX'           # Vertical calendar fold axis on phones
  mobile-hinge: 'center top'       # Calendar hinge origin on phones
  mobile-swipe-threshold: '65px'   # Vertical pointer swipe distance threshold
  mobile-paper-layers: '2px 1px 0 #c7b99f, 4px 2px 0 #f6f0e3, 5px 3px 0 #cbbda4' # Stacked washi paper depth shadow

  # Status & Feedback
  success: '#2E6F40'               # Booked / Gig Confirmed
  success-subtle: '#EBF7F1'
  warning: '#D97706'               # Pending Audition / Under Review
  warning-subtle: '#FEF3C7'
  danger: '#DC2626'                # Gig Cancelled / Slot Full
  danger-subtle: '#FEE2E2'
  info: '#2563EB'                  # Profile Notice
  info-subtle: '#EFF6FF'

typography:
  display-hero:
    fontFamily: '"Archivo Black", "Plus Jakarta Sans", sans-serif'
    fontSize: '44px'
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: '-0.03em'
  display-section:
    fontFamily: '"Archivo Black", "Plus Jakarta Sans", sans-serif'
    fontSize: '28px'
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: '-0.02em'
  headline:
    fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif'
    fontSize: '20px'
    fontWeight: '800'
    lineHeight: '1.25'
    letterSpacing: '-0.015em'
  title-card:
    fontFamily: '"Archivo Black", "Plus Jakarta Sans", sans-serif'
    fontSize: '16px'
    fontWeight: '900'
    lineHeight: '1.3'
    letterSpacing: '-0.01em'
  body-lead:
    fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif'
    fontSize: '15px'
    fontWeight: '500'
    lineHeight: '1.6'
    letterSpacing: '-0.005em'
  body-default:
    fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif'
    fontSize: '13px'
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  caption:
    fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif'
    fontSize: '11px'
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '0.01em'
  badge-code:
    fontFamily: '"Space Mono", "JetBrains Mono", monospace'
    fontSize: '11px'
    fontWeight: '700'
---

# Reffband Design System Specification

## 1. Architectural Model: 3D Accordion Booklet Shell

### 1.1 Strict Viewport Lock (No Window Scroll)
```css
html, body {
  overflow: hidden;
  height: 100vh;
  margin: 0;
  background-color: var(--surface-dark, #14110F);
}

.reffband-book {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 980px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 16px 28px 20px 28px;
  background: var(--surface, #FAF8F5);
  position: relative;
}

.reader-stage {
  flex: 1;
  position: relative;
  overflow: hidden;
  perspective: 2000px; /* Essential for 3D page folding */
  border: 2px solid var(--text-primary, #14110F);
  border-radius: 8px;
  background: var(--surface-bright, #FBF8F1);
}
```

---

## 2. Motion & Physics Engine

### 2.1 The 3D Accordion Z-Fold
```css
:root {
  --journey-ease: cubic-bezier(0.22, 0.68, 0.2, 1);
  --stamp-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.preserve-3d {
  transform-style: preserve-3d;
}

/* 3-Panel Crease Shading */
.accordion-shading {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to right, rgba(20, 17, 15, 0.45), transparent 45%);
}

/* Dynamic Face Light */
.accordion-light {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: multiply;
  transition: opacity 0.05s linear;
}
```

---

## 3. Component Specifications

### 3.1 The 5 Zine Leaves
1. **Leaf 01:** Cover & Gatekeeper (Pilihan Peran Band vs EO).
2. **Leaf 02:** Band Studio Wizard (Create Profile Band 4-Step Form + Completeness Meter).
3. **Leaf 03:** Band EPK Dossier Layout (Public Dossier `@suarasenja`, Polaroid Latihan, Rider).
4. **Leaf 04:** EO Discovery & Filter (Cari Band, 30s Inline Audio Deck, 1-Tap WA Booking Handshake).
5. **Leaf 05:** UX Evaluation Scorecard & Verification Board (6 Heuristic Laws).

### 3.2 The Bottom Paging Controls
Fixed `.reader-controls` with:
- `[data-reader-prev]`: Previous leaf button.
- `[data-reader-select]`: Native select dropdown showing `Leaf N / 5 — [Title]`.
- `[data-reader-next]`: Next leaf button.
- `.footer-band`: Chapter decorative ribbon swapping patterns dynamically.

### 📱 3.3 Smartphone Responsive Architecture (`@media (max-width: 700px)`)
```css
@media (max-width: 700px) {
  /* Book Frame & Stacked Washi Edge Elevation */
  .reffband-book {
    margin: 6px 4px 16px !important;
    width: calc(100% - 8px) !important;
    box-shadow: 
      0 1px 3px rgba(64, 48, 28, 0.05),
      0 9px 16px -10px rgba(58, 43, 33, 0.29),
      0 20px 32px -23px rgba(58, 43, 33, 0.22),
      2px 1px 0 #c7b99f,   /* page 1 edge */
      4px 2px 0 #f6f0e3,   /* page 2 edge */
      5px 3px 0 #cbbda4 !important; /* bottom cover edge */
  }

  /* Compact 49px Header */
  .site-header {
    height: 49px !important;
    min-height: 49px !important;
    padding: 0 12px !important;
  }
  .brand-title {
    font-size: 18px !important;
  }

  /* 3D Vertical Calendar Fold Hinge Configuration */
  .accordion-panel {
    transform-origin: center top !important;
  }
  .accordion-panel > .accordion-panel {
    left: 0 !important;
    top: 100% !important;
  }

  /* Touch Action */
  .reader-stage {
    touch-action: pan-x;
  }

  /* Compact Controls with Vertical Navigation Labels */
  .reader-controls {
    height: 52px !important;
    min-height: 52px !important;
    padding: 0 10px !important;
  }
  .control-btn {
    padding: 6px 10px !important;
    font-size: 11px !important;
  }
}
```
