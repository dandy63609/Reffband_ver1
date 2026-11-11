---
tracker_id: ""
type: epic
title: "Role Gatekeeper & Session Bifurcation"
parent: initiative-reffband-mvp
covers:
  - R1
sources:
  - PRD.md
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
companions:
  - design-system-preview.html
after:
  - epic = 1
    needs: "Panggung booklet 100vh dan sistem navigasi lembaran"
refined: true
risk: low
---

# Role Gatekeeper & Session Bifurcation

## Description
Membangun pintu masuk utama Reffband (Leaf 01) yang membagi pengguna secara tegas ke dalam dua peran: Musisi/Band dan Event Organizer/Venue. Menggunakan metafora visual fisik kaset pita MK-60 maroon untuk musisi dan piringan hitam vinyl LP mustard untuk EO, dilengkapi tombol routing instan dan switcher peran di bilah atas.

## Outcome
Pengguna langsung memahami proposisi nilai Reffband dalam waktu < 3 detik tanpa kebingungan formulir umum, dan langsung masuk ke ruang kerja yang relevan dengan peran mereka.

## Requirements

1. **R1.1: Dua Kartu Pilihan Peran Kontras Tinggi**  
   Menyajikan Card A ("Saya Musisi/Band: Buat Profil EPK, Unggah Demo, Terima Panggung") dan Card B ("Saya Event Organizer: Cari Band, Dengar Demo 30s, Kontak Manajer").
2. **R1.2: Percabangan Sesi & Routing Otomatis**  
   Klik pada kartu Band mengarahkan panggung ke Leaf 02 (Studio Wizard), sementara klik pada kartu EO mengarahkan panggung ke Leaf 04 (Discovery Dashboard).
3. **R1.3: Role Switcher Pill di Header**  
   Tombol saklar peran di bilah atas (`MENU PERAN: [BAND] / [EO]`) yang memungkinkan pengguna berganti sudut pandang tanpa perlu logout.

## Done when
- [x] Kartu peran merender cutout resmi kaset MK-60 dan piringan hitam vinyl.
- [x] Klik pada kartu Musisi memindahkan lembaran langsung ke Leaf 2.
- [x] Klik pada kartu EO memindahkan lembaran langsung ke Leaf 4.
- [x] Switcher peran di header memperbarui konteks peran aktif.
