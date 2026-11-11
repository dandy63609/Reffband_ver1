---
title: "Reffband MVP — Product Requirements Document (PRD)"
template: prd
version: "1.1.0"
description: "Core product requirements for Reffband MVP: Dual-role onboarding (Band vs. Event Organizer), Band EPK & Multimedia Portfolio, Technical Rider Checklist, Verification Stamping, and EO Discovery Search Engine."
rubric: rubric-planning
status: approved
created: "2026-11-07"
updated: "2026-11-07"
---

# Reffband MVP — Product Requirements Document

## 1. Document Purpose
This document specifies the minimum viable product (MVP) requirements for **Reffband**. It aligns engineering, design, and product goals around a sharp two-sided marketplace scope: **Band Portfolio & EPK Management** on one side, and **Event Organizer (EO) Talent Discovery** on the other.

This document builds directly on:
- Visual identity tokens and tactile motion specs in [`DESIGN.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/DESIGN.md)
- Information architecture, 6-leaf booklet topology, and behavioral specs in [`EXPERIENCE.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/EXPERIENCE.md)
- Architectural teardown and VFX engine specifications in [`UI_UX_PLAN.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/UI_UX_PLAN.md)
- Original business model assumptions in the [Reffband Lean Canvas](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/WhatsApp%20Image%202026-11-07%20at%2018.40.29.jpeg)

---

## 2. Vision
Emerging local bands and solo artists face a severe discovery barrier: they possess authentic talent and tight rehearsal recordings, but lack agency connections or formal press kits to land gigs at coffee shops, campuses, and festivals. Concurrently, local event organizers spend hours sifting through fragmented social media links, poorly formatted PDFs, and uncurated WhatsApp chats to find bands that match their budget, genre, and gear backline.

**Reffband** solves this disconnect by becoming the standardized digital press kit (EPK) and discovery network for local live music, packaged as a lightweight, tactile "Gig Zine".

> **Core Value Proposition:** *"Temukan panggung atau musisi lokal yang tepat, dalam satu platform."*

---

## 3. Users and Journeys

### User Segment 1: The Performer (Band / Solo Musician)
- **Actor:** Emerging bands, college music clubs (UKM Musik), independent solo acts.
- **Core Job:** Create a single, credible digital press kit (EPK) to showcase raw sound, past stage credibility, rehearsal energy, and technical rider without paying for expensive website builders.

#### UJ-1: Band Registers and Builds EPK
1. **Entry & Role Selection:** Bimo (vocalist/guitarist) lands on the onboarding screen (Leaf 01), clicks *"Daftar Akun"*, and selects role: **"Musisi / Band"**.
2. **Identity Setup:** Enters band name *"Suara Senja"*, home city *"Semarang"*, and selects 1–3 primary genres (*Indie Folk, Alternative, Midwest Emo*).
3. **Multimedia Portfolio Upload (Leaf 02 & 03):**
   - Attaches 30-second highlight demo audio (MP3/WAV) or Spotify/SoundCloud embed link.
   - Uploads rehearsal documentation (polaroid-style practice photos and video clips).
   - Adds past performance log (e.g. *"Pensi SMAN 3 Semarang 2025"*, *"Ruang Teduh Cafe Acoustic Night"*).
4. **Technical Rider Setup (Leaf 05):** Selects format (*Semi-Akustik*), inputs required mics (2 vocal mics) and DI boxes (1 guitar, 1 bass).
5. **Contact Connect & Verification:** Links WhatsApp booking contact and social handles. System immediately evaluates criteria and applies the **`VERIFIED BAND`** physical stamp.
6. **Climax & Resolution:** Bimo previews his public cassette card and copies his shareable link (`reffband.id/@suarasenja`) to submit to venues.

---

### User Segment 2: The Event Organizer (EO / Venue Curator)
- **Actor:** Coffee shop owners, campus event heads (Ketua Pensi), wedding organizers, local festival program directors.
- **Core Job:** Find and vet active local bands within specific genre boundaries, budget ranges, and geographic proximity in under 2 minutes.

#### UJ-2: EO Searches and Vets Bands for an Upcoming Showcase
1. **Entry & Role Selection (Leaf 01):** Dina (coffee shop manager at *Kala Kopi Semarang*) registers as **"Event Organizer / Venue"**.
2. **Search Discovery Feed (Leaf 02):** Dina accesses the cassette roster. She is immediately presented with a search bar and fast facet chips.
3. **Targeted Filtering:** She filters by:
   - City: *"Semarang"*
   - Genre: *"Indie Rock"* & *"Acoustic"*
   - Verification: *"Hanya Band Terverifikasi (Audio & Rider Lengkap)"*
4. **Fast Vetting:** Dina scans 5 band cards. Rather than opening 5 separate browser tabs, she listens to the 30-second demo clip right from the card feed with spinning spools and unspooling waveform.
5. **Rider & Logistics Check (Leaf 05):** She inspects Suara Senja's rider and confirms their 2-mic setup matches Kala Kopi's compact PA system.
6. **Climax & Resolution (Leaf 06):** Dina clicks *"Undang Tampil"*. The system generates a structured WhatsApp booking invitation with date, slot time, and proposed fee, opening a direct negotiation thread with Bimo.

---

## 4. Glossary

| Term | Definition |
|---|---|
| **Band** | A musical unit (solo artist, duo, full band) holding a performer account on Reffband. |
| **Event Organizer (EO)** | Any entity (cafe, campus committee, wedding planner, festival) seeking live music performers. |
| **EPK (Electronic Press Kit)** | The standardized digital profile showcasing audio samples, genres, photos, past gig history, technical rider, and booking contacts. |
| **Technical Rider** | A standardized checklist of stage equipment needed by the band (mics, DI boxes, backline) and what they provide vs. what the venue supplies. |
| **Verified EPK Badge** | A data-driven status and visual stamp applied to band profiles that satisfy all mandatory completeness criteria. |
| **Audio Preview** | A 30-second representative sound snippet playable directly within the feed without page reloads. |
| **WhatsApp Booking Payload** | A pre-structured message query automatically compiled when an EO clicks to book a band. |

---

## 5. Features and Requirements

### Feature 1: Role-Based Authentication & Gatekeeper (Leaf 01)
*Allows new users to segment their experience into Performer vs. Organizer.*

- **FR-1.1:** The registration/login screen MUST prompt the user to choose their primary persona: **"Musisi / Band"** or **"Event Organizer / Venue"**.
- **FR-1.2:** Choosing **"Musisi / Band"** MUST route the user into the Band Profile Onboarding Wizard.
- **FR-1.3:** Choosing **"Event Organizer"** MUST route the user directly to the Talent Discovery Dashboard with search enabled.
- **FR-1.4:** The user profile MUST persist role credentials across sessions (JWT / secure session token).

---

### Feature 2: Band Profile, Multimedia EPK & Technical Rider (Leaf 02, 03, 05)
*Enables bands to curate their identity, music, past gigs, rehearsal validation, and gear requirements.*

- **FR-2.1 (Basic Info):** Band can input Stage Name, Hometown/City, Member count, and Bio (max 500 characters).
- **FR-2.2 (Genre Tagging):** Band MUST select at least 1 and up to 5 genre tags from a standardized list (with custom tag support).
- **FR-2.3 (Audio Demo Upload):** Band can upload up to 2 direct audio clips (MP3/WAV, max 10MB each, trimmed to 30s preview) or provide external streaming links (Spotify, Soundcloud).
- **FR-2.4 (Rehearsal & Media Documentation):** Band can upload up to 6 gallery photos (studio practice, soundcheck) and provide up to 2 video links (YouTube / TikTok rehearsal reel).
- **FR-2.5 (Past Gig History):** Band can add historical event entries consisting of: Event Name, Venue/City, Date (Month/Year), and Role (Headliner, Opening Act, Regular Cafe).
- **FR-2.6 (Social Media Integration):** Band can connect links for Instagram, TikTok, YouTube, and an active WhatsApp booking number.
- **FR-2.7 (Technical Rider & Stage Setup):** Band MUST specify:
  - Performance Format: `Full Band` | `Semi-Akustik` | `Akustik Saja` | `Solo/Duo`
  - Vocal Microphones required (numeric: 1 to 6)
  - Instrument Inputs / DI Boxes required (e.g. Acoustic Guitar, Bass DI, Keyboard Stereo)
  - Drum Kit Requirement: `Bawa Snare & Simbal Saja` | `Butuh Full Drum Kit Venue` | `Elektronik / Cajon Sendiri`
  - Electrical Outlets required at stage area (numeric: 1 to 4)

---

### Feature 3: EO Talent Discovery, Filters & Direct Handshake (Leaf 02, 04, 06)
*Empowers Event Organizers to search, filter, audit, and initiate booking negotiations with local acts.*

- **FR-3.1 (Keyword Search):** EO can search bands by band name, hometown city, or specific keywords.
- **FR-3.2 (Genre Filter):** EO can filter the talent list by single or multiple genres.
- **FR-3.3 (City/Location Filter):** EO can filter bands active within their city radius (e.g. *"Semarang"*, *"Solo"*, *"Yogyakarta"*).
- **FR-3.4 (Inline Audio Playback):** Discovery card list MUST support 1-tap inline audio auditioning of the band's primary demo snippet without leaving the search view.
- **FR-3.5 (Detailed Band Dossier):** Clicking a card opens the full EPK view displaying full portfolio, past events, practice footage, technical rider, and social links.
- **FR-3.6 (Technical Rider Compatibility Check):** EO can view the band's equipment checklist alongside their own venue capabilities before initiating contact.
- **FR-3.7 (Standardized WhatsApp Booking Payload):** Clicking *"Undang Tampil"* or *"Hubungi Band"* MUST compile a structured message template pre-filled with:
  ```text
  Halo [Nama Band], kami dari [Nama Event / Venue] tertarik mengundang kalian tampil:
  📅 Tanggal Acara: [Tanggal]
  ⏰ Slot Waktu: [Jam Mulai - Jam Selesai] ([Durasi] menit)
  📍 Lokasi: [Nama Tempat, Kota]
  🎸 Format: [Full Band / Akustik] (Rider 2 Mic, 2 DI terkonfirmasi)
  💰 Penawaran Honorarium: Rp [Jumlah]
  Profil Reffband: reffband.id/@[slug]
  Apakah jadwal kalian tersedia? Terima kasih!
  ```

---

## 6. Rules (System Constraints & Business Logic)

- **RULE-1 (Single Active Audio):** Only one audio track can play at a time across the entire application. Playing a new track must immediately pause any active track with a smooth crossfade.
- **RULE-2 (Public Profile Accessibility):** Completed band profiles MUST have public URLs accessible without requiring login (e.g., `reffband.id/@bandname`) so bands can use Reffband as their universal link-in-bio.
- **RULE-3 (Clean Contact Handshake):** The platform does not hide the band's contact info behind a paywall during the MVP phase, encouraging immediate adoption and trust.
- **RULE-4 (Verification & Stamp Criteria):** The **`VERIFIED BAND`** badge and stamp (`stage-pass-stamp`) is granted automatically if and only if the profile satisfies all 4 conditions:
  1. Valid Stage Name, Home City, and at least 1 Genre Tag.
  2. At least 1 active audio demo (playable).
  3. At least 1 piece of practice/soundcheck documentation (photo or video link).
  4. Active WhatsApp booking contact number and completed Technical Rider (`FR-2.7`).
- **RULE-5 (Backstage Performance & Zero-Bloat Constraint):** Total initial page weight MUST NOT exceed 1.5MB (excluding streamed audio bytes). First Contentful Paint (FCP) MUST be < 1.8 seconds on 4G mobile connections. Zero WebGL or Three.js dependencies are permitted; all visual effects must use pure semantic DOM and CSS hardware acceleration.

---

## 7. Non-Goals (Out of Scope for MVP)

To ship the smallest thing that validates the two-sided value proposition, the following items are explicitly **OUT OF SCOPE** for this release:
1. **In-App Payment Gateway & Escrow:** No automated DP or fee processing inside the app. Payment terms remain directly negotiated between EO and Band.
2. **Contract & Legal Signing Tool:** Automated digital contracts are deferred to v2.
3. **Interactive 3D Stage Plot Designer:** Drag-and-drop 3D stage canvas is deferred; MVP relies on the standardized checklist (`FR-2.7`).
4. **Ticketing & Fan Merch Store:** Reffband is strictly a B2B2C booking matchmaker; end-consumer ticketing is not supported in MVP.
5. **Algorithmic AI Recommendation Engine:** Discovery uses clean facet filters and chronological/featured sorting.

---

## 8. MVP Scope Matrix

| Feature / Component | MVP (In Scope) | Deferred to v1.2+ |
|---|---|---|
| **Role Selector** | Dual Role (Band vs. EO) on Register/Login (Leaf 01) | Multi-account switching under 1 email |
| **Band Media** | 30s Audio MP3 upload + Rehearsal Photos & Video Reel | In-browser multi-track stems mixer |
| **Technical Rider** | Standardized Backline & Mic Checklist (`FR-2.7`) | Interactive visual drag-and-drop stage plotter |
| **Verification** | Automatic data-completeness validation stamp (`RULE-4`) | Manual human curator review & audition badges |
| **Gig History** | Self-reported past gig logs (Leaf 03) | Verified EO check-ins and mutual review stars |
| **Search & Filter** | Genre, City, Keyword, Verification status | Distance radius by GPS kilometers & price slider |
| **Booking Flow** | 1-Tap Structured WhatsApp Handshake (`FR-3.7`) | In-app calendar reservation & escrow payment |

---

## 9. Success Metrics & Counter-Metrics

| Metric ID | Target (First 90 Days) | Validated Feature | Counter-Metric (Guardrail) |
|---|---|---|---|
| **SM-1** | ≥ 100 Verified Local Band Profiles created with complete audio, media, and technical rider | FR-2 & RULE-4 (Band EPK & Rider) | Profile drop-off rate during onboarding (< 20%) |
| **SM-2** | ≥ 30 Unique EOs / Venues registered and searching actively | FR-1 & FR-3 (EO Discovery) | Zero-result searches (< 10% of total search queries) |
| **SM-3** | ≥ 150 Inbound booking clicks (*"Undang Tampil"*) generating WhatsApp handshake payloads | FR-3.7 (Direct Contact Payload) | Immediate WhatsApp bounce rate (< 15%) |
| **SM-4** | Page load time < 2.0s on mobile 4G devices | RULE-5 (Zero-Bloat Performance) | Memory crash rate on low-end Android (< 0.5%) |

---

## 10. Traceability to Design & Technical Specs

- **Visual Tokens & Motion:** Consumes tokens and keyframe animations from [`DESIGN.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/DESIGN.md) (`--primary: #7E1929`, `stage-pass-stamp`, `tape-reveal`).
- **Interaction Architecture:** Conforms to 6-leaf booklet layout in [`EXPERIENCE.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/EXPERIENCE.md) and [`UI_UX_PLAN.md`](file:///D:/dandy_personal/Dandy_College/SEMESTER_3/Bisdig/Reffband/UI_UX_PLAN.md).
