---
tracker_id: ""
type: epic
title: "100vh Viewport-Locked Booklet Shell & Dual-Mode 3D Fold Engine"
parent: initiative-reffband-mvp
covers:
  - R9
sources:
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
  - references/MOBILE_PHONE_ADAPTATION_GUIDE.md
companions:
  - design-system-preview.html
after: []
refined: true
risk: medium
---

# 100vh Viewport-Locked Booklet Shell & Dual-Mode 3D Fold Engine

## Description
Mengimplementasikan panggung dasar aplikasi Reffband berupa Japanese Orihon Booklet yang terkunci pada 100vh (`overflow: hidden` pada window). Dilengkapi mesin kinematik 3D origami dual-mode: *Horizontal Book Fold* (`rotateY`) untuk desktop (>700px) dan *Vertical Calendar Fold* (`rotateX`) untuk smartphone ($\le 700\text{px}$), bilah kontrol navigasi lembaran permanen (`.reader-controls`), gestur sentuh otonom ($dy / dx \ge 65\text{px}$), serta bayangan bertingkat kertas washi (*stacked washi shadows*).

## Outcome
Pengguna merasakan pengalaman membolak-balik zine musik indie fisik secara taktil, cepat (60fps), tanpa gangguan scroll vertikal halaman browser baik di desktop maupun ponsel.

## Requirements

1. **R9.1: 100vh Viewport-Lock & Panggung Leaf Bersekat**  
   Window peramban terkunci penuh pada `100vh` tanpa scrollbar halaman luar. Konten panjang digulirkan secara internal di dalam container `.reader-leaf`.
2. **R9.2: Mesin Lipatan 3D Desktop (Horizontal Book Fold)**  
   Navigasi antar lembaran pada layar >700px membagi halaman keluar menjadi 3 kolom vertikal ($W/3$), berotasi $\pm 52^\circ$ pada sumbu Y (`transform-origin: left center`), mengangkat sumbu Z ($22\text{px}$), dan memproyeksikan bayangan SVG tanah dinamis.
3. **R9.3: Mesin Lipatan 3D Smartphone (Vertical Calendar Fold)**  
   Pada layar $\le 700\text{px}$, sistem beralih otomatis ke rotasi sumbu X (`rotateX(±52°)`), engsel atas (`transform-origin: center top`), partisi 3 strip horizontal ($H/3$), dan deteksi sentuhan swipe vertikal ($dy \ge 65\text{px}$).
4. **R9.4: Bilah Paging Buku Permanen (.reader-controls)**  
   Bilah navigasi bawah yang persisten menampilkan tombol `[← SEBELUMNYA]` / `[SELANJUTNYA →]` pada desktop dan `[↑ SEBELUMNYA]` / `[SELANJUTNYA ↓]` pada ponsel, dropdown nomor lembaran, serta navigasi keyboard panah.

## Done when
- [x] Panggung 100vh terkunci di Chrome, Firefox, Safari desktop dan mobile.
- [x] Transisi lipatan 3D berjalan 60fps tanpa detachment engsel.
- [x] Deteksi media query $\le 700\text{px}$ memicu mode vertikal kalender secara mulus.
- [x] Tombol navigasi dan gestur sentuh merespons sesuai sumbu aktif.

## Boundaries
- Konten formulir atau data spesifik band/EO bukan tanggung jawab epic ini (dikelola oleh Epic 2, 3, 4, 5).
