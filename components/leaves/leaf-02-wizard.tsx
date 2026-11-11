"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CassetteDeck } from "../media/cassette-deck";
import {
  generateDefaultPeaks,
  validateAudioFile,
  decodeAudioFile,
} from "../../lib/audio/decoder";

interface GigItem {
  id: string;
  event: string;
  venue: string;
  year: string;
}

interface RehearsalPhoto {
  id: string;
  url: string;
  date: string;
  studio: string;
}

export const LeafWizard: React.FC = () => {
  // Step 1: Identitas & Genre
  const [bandName, setBandName] = useState("Suara Senja");
  const [city, setCity] = useState("Semarang");
  const [rateCard, setRateCard] = useState("Rp 1.000.000");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Indie Folk",
    "Midwest Emo",
  ]);

  const allGenres = [
    "Indie Folk",
    "Alternative Rock",
    "Midwest Emo",
    "Indie Pop",
    "Grunge",
    "Post-Punk",
    "Shoegaze",
    "Hardcore",
  ];

  // Step 2: Audio Demo Dropzone & Waveform
  const [songTitle, setSongTitle] = useState("Deru Kota Lama");
  const [audioFileName, setAudioFileName] = useState("deru-kota-lama-demo.mp3");
  const [hasAudio, setHasAudio] = useState(true);
  const [peaks, setPeaks] = useState<number[]>(generateDefaultPeaks());
  const [spotifyUrl, setSpotifyUrl] = useState("https://open.spotify.com/track/suarasenja");
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtube.com/watch?v=live-semarang");
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Step 3: Foto Latihan Polaroid & Gig History
  const [rehearsalPhotos, setRehearsalPhotos] = useState<RehearsalPhoto[]>([
    {
      id: "photo-1",
      url: "/extracted_assets/band-silhouette-cutout.png",
      date: "14 OKT 2024",
      studio: "NADA STUDIO SEMARANG",
    },
  ]);
  const [rehearsalVideoUrl, setRehearsalVideoUrl] = useState(
    "https://instagram.com/reel/rehearsal-suarasenja"
  );
  const [gigHistory, setGigHistory] = useState<GigItem[]>([
    {
      id: "gig-1",
      event: "Loka Skena Semarang",
      venue: "Taman Budaya Raden Saleh",
      year: "2024",
    },
    {
      id: "gig-2",
      event: "Gigs Halaman Belakang",
      venue: "Gedung Monod Diephuis Kota Lama",
      year: "2023",
    },
  ]);
  const [newGigEvent, setNewGigEvent] = useState("");
  const [newGigVenue, setNewGigVenue] = useState("");
  const [newGigYear, setNewGigYear] = useState("2024");

  // Step 4: Technical Rider & Kontak
  const allRiderItems = [
    "Drum Kit (5-Piece)",
    "Vocal Mic (Shure SM58 x3)",
    "Guitar Amp (Twin Reverb / Marshall x2)",
    "Bass Amp (Ampeg SVT)",
    "Direct Box (DI Box x2)",
    "Stage Monitors (3x Wedges)",
  ];
  const [selectedRiderItems, setSelectedRiderItems] = useState<string[]>([
    "Drum Kit (5-Piece)",
    "Vocal Mic (Shure SM58 x3)",
    "Guitar Amp (Twin Reverb / Marshall x2)",
    "Direct Box (DI Box x2)",
  ]);
  const [customRiderNotes, setCustomRiderNotes] = useState(
    "Soundcheck minimal 45 menit sebelum open gate. Menyediakan 2 botol air mineral per personel."
  );
  const [managerWa, setManagerWa] = useState("0812-3456-7890");
  const [instagram, setInstagram] = useState("@suarasenja.music");
  const [isSavedToast, setIsSavedToast] = useState(false);

  // Genre multi-select toggle
  const toggleGenre = (g: string) => {
    if (selectedGenres.includes(g)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== g));
    } else {
      setSelectedGenres([...selectedGenres, g]);
    }
  };

  // Audio file upload & validation
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setAudioError(validation.error || "File audio tidak valid.");
      return;
    }

    setAudioError(null);
    setAudioFileName(file.name);
    setHasAudio(true);

    try {
      const analysis = await decodeAudioFile(file, 64);
      setPeaks(analysis.peaks);
    } catch {
      // Fallback to generated peaks
      setPeaks(generateDefaultPeaks());
    }
  };

  // Gig history add/delete
  const handleAddGig = () => {
    if (!newGigEvent.trim() || !newGigVenue.trim()) return;
    const newGig: GigItem = {
      id: `gig-${Date.now()}`,
      event: newGigEvent.trim(),
      venue: newGigVenue.trim(),
      year: newGigYear || "2024",
    };
    setGigHistory([...gigHistory, newGig]);
    setNewGigEvent("");
    setNewGigVenue("");
  };

  const handleDeleteGig = (id: string) => {
    setGigHistory(gigHistory.filter((g) => g.id !== id));
  };

  // Technical rider toggle
  const toggleRiderItem = (item: string) => {
    if (selectedRiderItems.includes(item)) {
      setSelectedRiderItems(selectedRiderItems.filter((i) => i !== item));
    } else {
      setSelectedRiderItems([...selectedRiderItems, item]);
    }
  };

  // Completeness score calculation (4 steps, 25% each)
  const step1Complete = Boolean(bandName.trim() && city.trim() && selectedGenres.length > 0);
  const step2Complete = Boolean(songTitle.trim() && hasAudio);
  const step3Complete = Boolean(rehearsalPhotos.length > 0 && gigHistory.length > 0);
  const step4Complete = Boolean(selectedRiderItems.length > 0 && managerWa.trim());

  let completenessScore = 0;
  if (step1Complete) completenessScore += 25;
  if (step2Complete) completenessScore += 25;
  if (step3Complete) completenessScore += 25;
  if (step4Complete) completenessScore += 25;

  const isVerifiedReady = completenessScore === 100;

  const handlePublish = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 overflow-y-auto reader-leaf-content bg-[#FAF8F5]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 mb-4 border-b-2 border-[#14110F]">
        <div>
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            LEAF 02: STUDIO KREASI MUSISI
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-xl md:text-2xl text-[#14110F]">
            BUAT & EDIT PROFIL EPK BAND
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isVerifiedReady && (
            <div
              data-testid="verified-ready-badge"
              className="font-['Space_Mono',monospace] text-xs font-bold bg-[#2E6F40] text-white px-3 py-1.5 rounded border-2 border-[#14110F] shadow-zine-sm flex items-center gap-1.5"
            >
              <span>●</span> SIAP VERIFIKASI
            </div>
          )}
          <button
            onClick={handlePublish}
            data-testid="btn-publish-epk"
            className="font-['Space_Mono',monospace] text-xs font-bold bg-[#7E1929] text-white px-3 py-1.5 rounded border-2 border-[#14110F] shadow-zine-sm hover:brightness-110 active:translate-x-0.5 active:translate-y-0.5"
          >
            SIMPAN & TERBITKAN
          </button>
        </div>
      </div>

      {isSavedToast && (
        <div className="mb-4 p-2 bg-[#2E6F40] text-white text-xs font-mono font-bold rounded border-2 border-[#14110F] shadow-zine flex justify-between items-center animate-fade-in">
          <span>✓ Profil EPK "@{bandName.toLowerCase().replace(/\s+/g, "")}" berhasil disimpan & diperbarui!</span>
          <span className="text-[10px]">Tersedia di Leaf 03 Dossier</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left: 4-Step Form Cards */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* STEP 1: Identitas & Genre */}
          <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                LANGKAH 1 DARI 4 // IDENTITAS & GENRE
              </span>
              <span className={`text-[10px] font-mono font-bold ${step1Complete ? "text-[#2E6F40]" : "text-amber-600"}`}>
                {step1Complete ? "✓ Lengkap" : "● Perlu Diisi"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Nama Band / Proyek Musik
                </label>
                <input
                  type="text"
                  data-testid="input-band-name"
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                  placeholder="Misal: Suara Senja"
                  className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Kota Domisili (Skena)
                </label>
                <input
                  type="text"
                  data-testid="input-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Misal: Semarang"
                  className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Tarif Manggung Standar (Rate Card)
                </label>
                <input
                  type="text"
                  data-testid="input-rate-card"
                  value={rateCard}
                  onChange={(e) => setRateCard(e.target.value)}
                  placeholder="Misal: Rp 1.000.000 - Rp 2.500.000 / gig"
                  className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>
            </div>

            {/* Genre Multi-Select Chips */}
            <div className="mt-3">
              <label className="block text-[11px] font-bold text-[#14110F] mb-1.5 font-mono">
                Pilih Genre (Bisa Pilih Lebih dari Satu):
              </label>
              <div
                data-testid="genre-chips-container"
                className="flex flex-wrap gap-1.5"
              >
                {allGenres.map((g) => {
                  const isSelected = selectedGenres.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleGenre(g)}
                      className={`font-['Space_Mono',monospace] text-[10px] font-bold px-2.5 py-1 rounded border border-[#14110F] transition active:scale-95 ${
                        isSelected
                          ? "bg-[#7E1929] text-white shadow-zine-sm"
                          : "bg-[#FAF8F5] text-[#14110F] hover:bg-zinc-200"
                      }`}
                    >
                      {isSelected ? `✓ ${g}` : `+ ${g}`}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 2: Cassette Dropzone Audio Demo & Waveform */}
          <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                LANGKAH 2 DARI 4 // PORTOFOLIO AUDIO DEMO (30s PROOF)
              </span>
              <span className={`text-[10px] font-mono font-bold ${step2Complete ? "text-[#2E6F40]" : "text-amber-600"}`}>
                {step2Complete ? "✓ Lengkap" : "● Perlu Diisi"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Judul Lagu Demo Unggulan
                </label>
                <input
                  type="text"
                  data-testid="input-song-title"
                  value={songTitle}
                  onChange={(e) => setSongTitle(e.target.value)}
                  placeholder="Misal: Deru Kota Lama"
                  className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>

              {/* Cassette Audio Dropzone */}
              <div
                data-testid="audio-dropzone"
                onClick={() => audioInputRef.current?.click()}
                className="sm:col-span-2 cursor-pointer p-4 bg-[#FEF9E7] border-2 border-dashed border-[#14110F] rounded-lg hover:bg-[#FDF3D0] transition flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
              >
                <div className="relative w-16 h-12 flex-shrink-0">
                  <Image
                    src="/extracted_assets/cassette-mk60-cutout.png"
                    alt="MK-60 Tape"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#14110F]">
                    Unggah File Audio Demo (MP3 / WAV, Maks. 15MB)
                  </p>
                  <p className="text-[10px] text-[#52525B] mt-0.5 font-mono">
                    File aktif: <strong>{audioFileName}</strong> (Waveform 30s Ready)
                  </p>
                  {audioError && (
                    <p className="text-[10px] text-red-600 font-bold mt-1 font-mono">
                      ⚠️ {audioError}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="font-['Space_Mono',monospace] text-[10px] font-bold px-3 py-1.5 bg-[#7E1929] text-white border border-[#14110F] rounded shadow-zine-sm flex-shrink-0"
                >
                  PILIH FILE
                </button>
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/mpeg, audio/mp3, audio/wav, audio/x-wav"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>

              {/* Streaming Links */}
              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Tautan Spotify Track (Opsional)
                </label>
                <input
                  type="url"
                  data-testid="input-spotify-url"
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full text-xs p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Tautan YouTube Live Video (Opsional)
                </label>
                <input
                  type="url"
                  data-testid="input-youtube-url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full text-xs p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Bukti Foto Latihan Polaroid & Riwayat Gig */}
          <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                LANGKAH 3 DARI 4 // FOTO LATIHAN POLAROID & RIWAYAT GIG
              </span>
              <span className={`text-[10px] font-mono font-bold ${step3Complete ? "text-[#2E6F40]" : "text-amber-600"}`}>
                {step3Complete ? "✓ Lengkap" : "● Perlu Diisi"}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Polaroid Photo Proof */}
              <div
                data-testid="polaroid-uploader"
                className="sm:col-span-5 flex flex-col items-center"
              >
                <div className="bg-white p-2.5 pb-6 border-2 border-[#14110F] rounded shadow-zine rotate-[-1deg] w-full max-w-[200px]">
                  <div className="relative w-full h-32 bg-[#14110F] rounded overflow-hidden">
                    <Image
                      src={rehearsalPhotos[0]?.url || "/extracted_assets/band-silhouette-cutout.png"}
                      alt="Rehearsal Polaroid"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <span className="font-['Space_Mono',monospace] text-[9px] text-[#7E1929] font-bold block">
                      {rehearsalPhotos[0]?.date || "14 OKT 2024"}
                    </span>
                    <span className="font-['Space_Mono',monospace] text-[8px] text-[#52525B] font-bold truncate block">
                      {rehearsalPhotos[0]?.studio || "NADA STUDIO SEMARANG"}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-2">
                  <label className="block text-[10px] font-bold text-[#14110F] mb-1 font-mono">
                    Link Video Rehearsal
                  </label>
                  <input
                    type="url"
                    data-testid="input-rehearsal-video"
                    value={rehearsalVideoUrl}
                    onChange={(e) => setRehearsalVideoUrl(e.target.value)}
                    placeholder="https://instagram.com/reel/..."
                    className="w-full text-[10px] p-1.5 border border-[#14110F] rounded bg-[#FAF8F5]"
                  />
                </div>
              </div>

              {/* Dynamic Gig History Table */}
              <div className="sm:col-span-7 flex flex-col">
                <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                  Riwayat Panggung Sebelumnya
                </label>
                <div
                  data-testid="gig-history-table"
                  className="border border-[#14110F] rounded overflow-hidden bg-[#FAF8F5] mb-2"
                >
                  <div className="grid grid-cols-12 bg-[#FEF9E7] text-[10px] font-mono font-bold p-1.5 border-b border-[#14110F]">
                    <div className="col-span-5">Acara / Festival</div>
                    <div className="col-span-4">Venue</div>
                    <div className="col-span-2">Tahun</div>
                    <div className="col-span-1 text-center">Aksi</div>
                  </div>
                  <div className="max-h-32 overflow-y-auto divide-y divide-zinc-200">
                    {gigHistory.map((g) => (
                      <div
                        key={g.id}
                        className="grid grid-cols-12 text-[10px] p-1.5 items-center font-mono"
                      >
                        <div className="col-span-5 font-bold truncate">{g.event}</div>
                        <div className="col-span-4 text-zinc-600 truncate">{g.venue}</div>
                        <div className="col-span-2">{g.year}</div>
                        <div className="col-span-1 text-center">
                          <button
                            type="button"
                            data-testid="btn-delete-gig"
                            onClick={() => handleDeleteGig(g.id)}
                            className="text-red-600 font-bold hover:text-red-800"
                            title="Hapus baris panggung"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add new gig inputs */}
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={newGigEvent}
                    onChange={(e) => setNewGigEvent(e.target.value)}
                    placeholder="Nama Acara"
                    className="flex-1 text-[10px] p-1 border border-[#14110F] rounded bg-white"
                  />
                  <input
                    type="text"
                    value={newGigVenue}
                    onChange={(e) => setNewGigVenue(e.target.value)}
                    placeholder="Venue"
                    className="w-24 text-[10px] p-1 border border-[#14110F] rounded bg-white"
                  />
                  <input
                    type="text"
                    value={newGigYear}
                    onChange={(e) => setNewGigYear(e.target.value)}
                    placeholder="Tahun"
                    className="w-12 text-[10px] p-1 border border-[#14110F] rounded bg-white"
                  />
                  <button
                    type="button"
                    data-testid="btn-add-gig"
                    onClick={handleAddGig}
                    className="text-[10px] font-mono font-bold px-2 py-1 bg-[#2E6F40] text-white rounded border border-[#14110F]"
                  >
                    + TAMBAH
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Technical Stage Rider Checklist & Socials */}
          <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                LANGKAH 4 DARI 4 // TECHNICAL RIDER & KONTAK MANAJEMEN
              </span>
              <span className={`text-[10px] font-mono font-bold ${step4Complete ? "text-[#2E6F40]" : "text-amber-600"}`}>
                {step4Complete ? "✓ Lengkap" : "● Perlu Diisi"}
              </span>
            </div>

            <div className="mt-3">
              <label className="block text-[11px] font-bold text-[#14110F] mb-1.5 font-mono">
                Checklist Kebutuhan Panggung (Rider):
              </label>
              <div
                data-testid="rider-checklist"
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 bg-[#FAF8F5] border border-[#14110F] rounded"
              >
                {allRiderItems.map((item) => {
                  const isChecked = selectedRiderItems.includes(item);
                  return (
                    <label
                      key={item}
                      className="flex items-center gap-2 text-[11px] font-mono cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleRiderItem(item)}
                        className="rounded border-[#14110F] text-[#7E1929] focus:ring-[#7E1929]"
                      />
                      <span className={isChecked ? "font-bold text-[#14110F]" : "text-zinc-600"}>
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-2">
                <label className="block text-[10px] font-bold text-[#14110F] mb-1 font-mono">
                  Catatan Tambahan Rider
                </label>
                <textarea
                  rows={2}
                  value={customRiderNotes}
                  onChange={(e) => setCustomRiderNotes(e.target.value)}
                  className="w-full text-xs p-2 border border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#7E1929]"
                />
              </div>

              {/* Contact Inputs */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                    Nomor WhatsApp Manajer (1-Tap Booking)
                  </label>
                  <input
                    type="tel"
                    data-testid="input-manager-wa"
                    value={managerWa}
                    onChange={(e) => setManagerWa(e.target.value)}
                    placeholder="0812-XXXX-XXXX"
                    className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#14110F] mb-1 font-mono">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    data-testid="input-instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@namaband"
                    className="w-full text-xs font-bold p-2 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Cassette Card Preview & Completeness Meter */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Story 3.5: Goal-Gradient Completeness Meter */}
          <div
            data-testid="completeness-meter"
            className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-['Space_Mono',monospace] text-xs font-bold text-[#14110F]">
                KONTRAK KELENGKAPAN EPK
              </span>
              <span className="font-['Space_Mono',monospace] text-xs font-bold text-[#7E1929]">
                {completenessScore}% / 100%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-zinc-200 rounded border border-[#14110F] overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  isVerifiedReady ? "bg-[#2E6F40]" : "bg-[#F5C542]"
                }`}
                style={{ width: `${completenessScore}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className={`p-1.5 rounded border ${step1Complete ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold" : "bg-zinc-50 border-zinc-300 text-zinc-500"}`}>
                {step1Complete ? "✓" : "○"} 1. Identitas & Genre
              </div>
              <div className={`p-1.5 rounded border ${step2Complete ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold" : "bg-zinc-50 border-zinc-300 text-zinc-500"}`}>
                {step2Complete ? "✓" : "○"} 2. Audio Demo 30s
              </div>
              <div className={`p-1.5 rounded border ${step3Complete ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold" : "bg-zinc-50 border-zinc-300 text-zinc-500"}`}>
                {step3Complete ? "✓" : "○"} 3. Foto Polaroid & Gig
              </div>
              <div className={`p-1.5 rounded border ${step4Complete ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold" : "bg-zinc-50 border-zinc-300 text-zinc-500"}`}>
                {step4Complete ? "✓" : "○"} 4. Rider & WA Manajer
              </div>
            </div>
          </div>

          {/* Story 3.5: Real-time Live Cassette Card Instance */}
          <div data-testid="live-cassette-preview" className="flex flex-col gap-2">
            <div className="font-['Space_Mono',monospace] text-xs font-bold text-[#14110F] flex items-center justify-between">
              <span>⚡ LIVE CASSETTE CARD INSTANCE</span>
              <span className="text-[10px] text-[#2E6F40]">● REAL-TIME MIRROR</span>
            </div>

            <CassetteDeck
              artist={bandName || "NAMA BAND"}
              title={songTitle || "Judul Lagu Demo"}
              city={city || "Semarang"}
              rate={rateCard || "Rp 1.000.000"}
              genre={selectedGenres.join(", ") || "Indie"}
              peaks={peaks}
              interactiveWaveform={true}
            />

            <p className="text-[10px] text-[#52525B] font-mono italic">
              *Setiap karakter nama band, lagu, dan tarif yang diketik di formulir langsung direfleksikan ke kaset pita MK-60 di atas tanpa reload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
