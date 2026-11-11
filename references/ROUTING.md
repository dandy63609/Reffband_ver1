# Routing Plan: GoShuin (AE Studio)

**Target URL:** https://aestudio.studio/goshuin/en  
**Analyzed:** 2026-11-07  
**Architecture:** Pure DOM / CSS Booklet Reader (Zero WebGL / Canvas)

---

## 1. Surface Material Classification

| Surface ID | Type | Route / Track | Selector / Region | Dimensions | Notes |
|---|---|---|---|---|---|
| `video-0` | `VIDEO` | `dom-clone` | `.hero.illustrated-hero > .book-cover > .cover-pattern > video.cover-pattern-video:nth-of-type(1)` | 688 × 134 px | Living book-cloth top pattern (`cover-indigo-veo-loop-20261006.mp4`) |
| `video-1` | `VIDEO` | `dom-clone` | `.hero.illustrated-hero > .book-cover > .cover-pattern > video.cover-pattern-video-bottom:nth-of-type(2)` | 688 × 134 px | Living book-cloth bottom pattern (`cover-indigo-veo-loop-20261006.mp4`) |
| `book-reader` | `DOM` | `dom-clone` | `main.goshuin-book` | 1376 × 849 px | Virtual Japanese accordion booklet (`orihon`) container |
| `reader-leaf-*` | `DOM` | `dom-clone` | `section.reader-leaf` (14 pages/leaves) | Multi-page | Paged leaf system with scroll-snap and keyboard controls |

> [!NOTE]
> **No GPU / WebGL canvases detected.** All textures, ink reveals, and fabric motions are rendered via high-performance native CSS (`clip-path`, `@keyframes`, `filter`) and muted looping `<video>` elements.

---

## 2. Section Topology (Book Leaves)

1. **Leaf 01 (`#hero-en` / `reader-arrival`)**: Book cover presentation, living indigo fabric video borders, app store badge, title lockup.
2. **Leaf 02–06 (`reader-tour`, `reader-scan`)**: Feature tour, interactive scan demo, goshuin map preview, journal showcase.
3. **Leaf 07 (`reader-principles`)**: "Visiting with Care" etiquette and temple guidelines.
4. **Leaf 08–09 (`reader-culture`, `reader-history`)**: History & culture background (Meiji Jingu feature spotlight).
5. **Leaf 10–12 (`reader-data`, `reader-chart`)**: Data on national temple & shrine counts, historical changes since 2019.
6. **Leaf 13 (`reader-faq`)**: FAQ accordion and support links.
7. **Leaf 14 (`reader-closing`)**: Final App Store call-to-action and footer colophon.

---

## 3. Recommended Rebuild Strategy for React

- **Engine:** React 19 / Next.js with Tailwind CSS
- **Layout Paradigm:** Fixed book frame (`aspect-[16/10]` or viewport-locked modal frame) with horizontal snap paging or swipeable tabs.
- **Motion:** Custom CSS keyframes for ink reveal + Framer Motion / CSS Transitions for page turns.
