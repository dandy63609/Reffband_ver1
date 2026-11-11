---
tracker_id: ""
type: epic
title: "Band Studio Wizard & 4-Step EPK Builder"
parent: initiative-reffband-mvp
covers:
  - R2
  - R3
  - R4
  - R5
sources:
  - PRD.md
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
companions:
  - design-system-preview.html
after:
  - epic = 2
    needs: "Autentikasi dan identifikasi peran Musisi"
refined: true
risk: medium
---

# Band Studio Wizard & 4-Step EPK Builder

## Description
Membangun ruang studio kreasi musisi (Leaf 02) dengan wizard 4 langkah terstruktur. Musisi dapat melengkapi identitas, genre, demo audio 30-detik, bukti latihan studio Polaroid, riwayat gig lampau, serta technical rider panggung. Dilengkapi *Live Cassette Card Preview* yang terupdate secara real-time dan *Completeness Meter* bertuliskan `100% VERIFIED READY` sebagai motivasi psikologis *goal-gradient*.

## Outcome
Musisi dapat merampungkan portofolio digital EPK berkualitas profesional dalam waktu < 5 menit dengan kepastian kelengkapan berkas sebelum dipublikasikan ke EO.

## Requirements

1. **R2.1: Formulir Identitas & Multi-Select Genre Chips**  
   Input nama band, domisili/kota, tarif manggung (*Rate Card*), dan pemilihan chip genre interaktif (*Indie Pop, Alternative Rock, Midwest Emo, Grunge, Folk*).
2. **R3.1: Dropzone Upload Audio Demo & Waveform Player**  
   Unggah audio MP3/WAV (maks. 15MB) dengan animasi pita kaset, scrubber waveform visual, dan input tautan Spotify & YouTube.
3. **R4.1: Bukti Foto Latihan Polaroid & Riwayat Gig**  
   Unggah foto sesi latihan studio berbingkai Polaroid dengan stempel tanggal dan link video rehearsal (mencegah band fiktif) + tabel interaktif riwayat panggung sebelumnya.
4. **R5.1: Checklist Technical Rider & Kontak Manajer**  
   Checklist kebutuhan audio panggung (drum kit, mic vokal, amp gitar/bass, direct box) serta kontak WhatsApp manajer dan akun media sosial.
5. **R5.2: Meter Kelengkapan EPK & Pratinjau Kaset Real-Time**  
   Meter indikator kelengkapan progresif hingga 100% dan kartu kaset visual yang otomatis merefleksikan ketikan nama band dan kota secara instan.

## Done when
- [x] Form 4 langkah dapat diisi secara bertahap tanpa kehilangan data.
- [x] File audio dapat diunggah dan waveform dapat diklik untuk memutar audio.
- [x] Foto latihan Polaroid tampil dengan bingkai retro dan metadata tanggal.
- [x] Kartu kaset preview di sisi kanan langsung berubah nama dan kota saat musisi mengetik.
- [x] Completeness meter mencapai 100% saat seluruh syarat terpenuhi.
