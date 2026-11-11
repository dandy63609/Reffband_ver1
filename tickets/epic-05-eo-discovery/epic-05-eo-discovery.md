---
tracker_id: ""
type: epic
title: "EO Talent Discovery & 1-Tap WhatsApp Booking Handshake"
parent: initiative-reffband-mvp
covers:
  - R7
  - R8
sources:
  - PRD.md
  - DESIGN.md
  - EXPERIENCE.md
  - UI_UX_PLAN.md
companions:
  - design-system-preview.html
after:
  - epic = 4
    needs: "Katalog profil band publik dan pemutar audio demo"
refined: true
risk: medium
---

# EO Talent Discovery & 1-Tap WhatsApp Booking Handshake

## Description
Membangun dasbor kurasi dan pemesanan musisi bagi Event Organizer dan Venue (Leaf 04). Memungkinkan EO mencari band dengan filter cepat multi-kriteria (genre, kota, anggaran tarif), mengaudisi audio demo 30 detik langsung di tempat tanpa berpindah tab (*zero-page-load audition*), dan mengunci jadwal manggung melalui *1-Tap WhatsApp Booking Handshake* yang secara otomatis merakit draf undangan resmi ke manajer band.

## Outcome
EO dapat menemukan dan mengaudisi 5 kandidat band dalam waktu 60 detik langsung di platform, dan menghubungi manajer band dengan pesan terstruktur yang siap disepakati.

## Requirements

1. **R7.1: Bilah Pencarian Cepat & Filter Multi-Kriteria**  
   Input pencarian instan nama/kota, chip filter genre (*Indie Folk, Alternative Rock, Midwest Emo, Grunge, Pop Punk*), dan dropdown rentang honorarium (*< Rp 1 Jt, Rp 1 - 3 Jt, > Rp 3 Jt*).
2. **R7.2: Roster Kartu Kaset Band & Audisi Audio 30s di Tempat**  
   Daftar kartu band berwujud kaset pita analog dengan tombol `▶ PLAY 30s DEMO` yang langsung memutar cuplikan audio di kartu tanpa reload halaman atau membuka tab baru.
3. **R8.1: Bilah Handshake Booking WhatsApp 1-Tap**  
   Tombol `AJUKAN JADWAL MANGGUNG` yang memicu modal konfirmasi formulir tanggal, nama acara, tawaran honorarium, dan otomatis membuka tautan `https://wa.me/[nomor]?text=[encoded_payload]`.
4. **R8.2: Generator Payload Pesan Undangan Resmi**  
   Sistem menyusun draf pesan WhatsApp resmi berisi:
   ```
   "Halo Manajer [Nama Band], kami dari [Nama EO] tertarik untuk mengundang 
   tampil di acara [Nama Acara] pada tanggal [Tanggal] di [Lokasi]. 
   Kami telah meninjau EPK & Technical Rider Anda di Reffband..."
   ```

## Done when
- [x] Input search dan filter genre langsung menyaring kartu kaset band secara responsif.
- [x] Tombol play pada kartu kaset memutar audio 30 detik secara instan di tempat.
- [x] Klik tombol booking menghasilkan URL WhatsApp valid dengan draf teks undangan terisi otomatis.
- [x] Manajer band menerima pesan berisi seluruh detail panggung tanpa bolak-balik bertanya.
