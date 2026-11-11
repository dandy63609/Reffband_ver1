---
tracker_id: ""
type: epic
title: "Public EPK Dossier & Media Player"
parent: initiative-reffband-mvp
covers:
  - R6
sources:
  - PRD.md
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
companions:
  - design-system-preview.html
after:
  - epic = 3
    needs: "Model data profil band dan penyimpanan audio demo"
refined: true
risk: low
---

# Public EPK Dossier & Media Player

## Description
Membangun tampilan profil publik band (Leaf 03) dengan tautan yang dapat dibagikan (`reffband.id/@band`). Mengadopsi format dossier majalah musik indie 3-kolom: Banner panggung dengan stempel domisili dan tarif, pemutar kaset audio demo 30 detik dengan reel berputar, galeri Polaroid latihan studio, tiket konser lampau, matriks technical rider panggung, dan tombol CTA booking instan ke WhatsApp manajer.

## Outcome
Musisi memiliki satu tautan kredibel dan profesional untuk dibagikan ke panitia festival/EO, dan EO dapat meninjau seluruh materi kelayakan band dalam satu layar tanpa perlu meminta berkas PDF terpisah via chat.

## Requirements

1. **R6.1: Tautan Publik Siap Bagi & Tombol Salin 1-Klik**  
   Header publik dengan URL slug unik (`reffband.id/@suarasenja`) dan tombol salin tautan dengan feedback toast visual.
2. **R6.2: Hero Banner Panggung & Metrik Kunci**  
   Kolase visual siluet panggung, stempel domisili kota, badge tarif honorarium (*Rp 1.000.000 / Gig*), dan tombol CTA utama booking WhatsApp.
3. **R6.3: Kolom 1 — Audio Demo Player & Diskografi Vinyl**  
   Pemutar audio kaset analog 30 detik dengan animasi reel berputar, lirik lagu andalan, dan grid piringan hitam diskografi.
4. **R6.4: Kolom 2 — Galeri Polaroid Latihan & Riwayat Event**  
   Kumpulan foto Polaroid sesi latihan studio bertanggal, klip video rehearsal, dan susunan tiket konser gig lampau.
5. **R6.5: Kolom 3 — Matriks Technical Rider & Kontak Resmi**  
   Matriks kebutuhan audio panggung terstruktur dengan tombol unduh PDF resmi dan tautan media sosial terverifikasi.

## Done when
- [x] Tautan `reffband.id/@band` dapat diakses secara publik tanpa login.
- [x] Pemutar audio kaset memutar lagu demo 30 detik dengan visual reel berputar.
- [x] Foto latihan Polaroid dan riwayat event tampil lengkap dan rapi.
- [x] Matriks technical rider menampilkan kebutuhan alat musik band.
