---
tracker_id: ""
type: initiative
title: "Reffband MVP: 3D Accordion Gig Zine & Indie Band-EO Matchmaking Platform"
covers: []
sources:
  - PRD.md
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
  - references/MOBILE_PHONE_ADAPTATION_GUIDE.md
companions:
  - design-system-preview.html
  - pen-dev-export.png
  - ARCHITECTURE.md
after: []
risk: medium
---

# Reffband MVP: 3D Accordion Gig Zine & Indie Band-EO Matchmaking Platform

## Description

Reffband adalah platform matchmaking dua sisi (*two-sided platform*) yang menghubungkan musisi/band indie dengan Event Organizer (EO) dan pemilik venue panggung. Berbeda dari feed scroll vertikal konvensional, Reffband dirancang dengan arsitektur **Japanese Orihon 3D Accordion Booklet (100vh Viewport-Locked Stage)** yang memadukan estetika *indie concert gig zine*, kemasan kaset pita lo-fi, dan piringan hitam vinyl. Musisi dapat membangun EPK terverifikasi lengkap (demo audio 30 detik, dokumentasi latihan studio, portofolio event lampau, dan technical rider), sementara EO dapat mengkurasi serta mengaudisi band dalam hitungan detik dan langsung melakukan kesepakatan jadwal panggung via *1-Tap WhatsApp Booking Handshake*.

## Outcome

Musisi indie lokal memiliki portofolio digital standar industri yang kredibel dan siap manggung, sementara Event Organizer dapat mengaudisi 5 band dalam waktu 60 detik tanpa berpindah tab (*zero-page-load audition*) dan mengunci kesepakatan panggung secara langsung.

## Requirements

1. **R1 (PRD FR-1, UI/UX Leaf 1): Role Gatekeeper & Session Bifurcation**  
   Pengguna disambut dengan pemilihan peran dua pintu kontras tinggi: "Musisi / Band" (Kaset MK-60 Maroon `#7E1929`) atau "Event Organizer / Venue" (Vinyl LP Mustard `#F5C542`). Pemilihan peran langsung membelah alur aplikasi ke wizard EPK atau dasbor kurasi tanpa formulir awal yang membingungkan.
2. **R2 (PRD FR-2.1, UI/UX Leaf 2): Band Profile & Genre Identity**  
   Musisi dapat memasukkan identitas band (nama, kota domisili, kontak manajer, standar tarif panggung / rate card) dan memilih *multi-select chips* genre (*Indie Folk, Alternative Rock, Midwest Emo, Grunge, Pop Punk*).
3. **R3 (PRD FR-2.2, UI/UX Leaf 2): 30s Audio Demo Uploader & Waveform Deck**  
   Musisi dapat mengunggah file audio demo (MP3/WAV maks. 15MB) yang dilengkapi pemutar waveform interaktif, visual reel pita kaset berputar, serta opsi input tautan Spotify & YouTube.
4. **R4 (PRD FR-2.3, UI/UX Leaf 2): Studio Rehearsal Evidence & Gig History**  
   Musisi dapat mengunggah dokumentasi foto latihan studio Polaroid bertanggal dan tautan video latihan (sebagai bukti kesiapan panggung dan pencegah band fiktif), serta mengisi riwayat festival/gig panggung yang pernah dimainkan.
5. **R5 (PRD FR-2.4, UI/UX Leaf 2): Technical Rider Checklist & Completeness Meter**  
   Formulir dilengkapi checklist kebutuhan panggung (drum kit, mic vokal, amplifier gitar/bass, DI box) dan *Rule-4 Completeness Meter* (`100% VERIFIED READY`) yang memperbarui *Live Cassette Card Preview* secara instan.
6. **R6 (PRD FR-3, UI/UX Leaf 3): Shareable Public EPK Dossier**  
   Setiap band mendapatkan tautan publik siap bagi (`reffband.id/@namaband`) yang merangkum hero banner, pemutar kaset audio 30-detik, galeri foto latihan, diskografi vinyl, dan matriks technical rider audio panggung format PDF.
7. **R7 (PRD FR-4, UI/UX Leaf 4): EO Talent Discovery & Instant Audition Deck**  
   EO dapat mencari band berdasarkan nama, kota, chip filter genre cepat, dan rentang tarif honorarium. Setiap kartu band memiliki pemutar audio instan 30 detik (*zero-page-load audition*) tanpa membuka tab baru.
8. **R8 (PRD FR-5, UI/UX Leaf 4): 1-Tap WhatsApp Booking Handshake**  
   EO dapat menekan tombol booking yang secara otomatis menyusun dan membuka pesan WhatsApp resmi ke manajer band berisi tanggal acara, nama panggung, lokasi, honorarium tawaran, dan konfirmasi penerimaan technical rider.
9. **R9 (DESIGN.md, EXPERIENCE.md, Leaf 1–5): 100vh Viewport-Locked Dual-Mode 3D Booklet Engine**  
   Aplikasi berjalan di atas panggung terkunci 100vh (`overflow: hidden`). Pada desktop (>700px), navigasi menggunakan *Horizontal Book Fold* (`rotateY(±52°)`, `transform-origin: left center`, swipe $dx$). Pada smartphone ($\le 700\text{px}$), beralih otonom ke *Vertical Calendar Fold* (`rotateX(±52°)`, `transform-origin: center top`, 3 strip horizontal $H/3$, swipe $dy \ge 65\text{px}$, dan *stacked washi paper shadows*).

## Constraints

- **C1 (100vh Stage Lock):** Jendela browser utama dilarang memiliki scroll vertikal (`overflow: hidden; height: 100vh`). Scroll vertikal hanya diperbolehkan secara internal di dalam container `.reader-leaf`.
- **C2 (Indie Stage Zine Aesthetics):** Desain wajib menggunakan palet warna dan tipografi resmi Reffband (`#7E1929` Wine Maroon, `#F5C542` Cassette Mustard, `#FAF8F5` Paper, `#14110F` Vinyl Ink, font Archivo Black dan Space Mono).
- **C3 (Dual-Mode Kinematics):** Transisi halaman pada ponsel ($\le 700\text{px}$) wajib menggunakan rotasi sumbu X (`rotateX`) dan engsel atas (`center top`), bukan rotasi sumbu Y desktop.
- **C4 (Direct Handshake):** Tidak ada payment gateway perantara pada MVP; seluruh finalisasi transaksi mengalir melalui WhatsApp resmi manajer band.

## Done when

1. Musisi dapat mendaftar, mengisi wizard 4-langkah, mengunggah audio demo, melampirkan foto latihan Polaroid, dan mempublikasikan EPK aktif.
2. Tautan publik `reffband.id/@band` dapat diakses dan memutar demo audio 30-detik secara lancar di peramban desktop maupun ponsel.
3. Event Organizer dapat mencari band berdasarkan kota/genre/tarif dan mendengarkan demo audio tanpa refresh halaman.
4. Tombol booking WhatsApp di dasbor EO berhasil membuka chat WhatsApp ke manajer band dengan draf pesan resmi terisi otomatis.
5. Animasi transisi 3D accordion fold berjalan mulus (60fps) dalam mode horizontal di desktop dan mode vertikal di ponsel tanpa bug visual.

## Boundaries

- **Out of Scope (MVP):** Penjualan tiket penonton, sistem gateway pembayaran e-wallet/escrow in-app, live streaming panggung, fitur obrolan pesan instan in-app (semua booking menggunakan WhatsApp).
- **Touch point:** WhatsApp Web / Mobile API — payload pesan booking panggung; owner: epic-05-eo-discovery.

## References

- prd — PRD.md
- design — DESIGN.md
- experience — EXPERIENCE.md
- ui_ux_plan — UI_UX_PLAN.md
- mobile_guide — references/MOBILE_PHONE_ADAPTATION_GUIDE.md
- prototype — design-system-preview.html
- architecture — ARCHITECTURE.md

## Notes

- Decision: Lingkup MVP dibatasi ketat hanya untuk interaksi Musisi dan EO demi kecepatan peluncuran (2026-11-07).
- Decision: Mengadopsi arsitektur booklet 3D fisik (Orihon) dengan adaptasi dual-mode desktop (rotateY) vs smartphone (rotateX) (2026-11-08).
