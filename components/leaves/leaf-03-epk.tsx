"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CassetteDeck } from "../media/cassette-deck";

export const LeafEpk: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("https://reffband.id/@suarasenja");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadRider = () => {
    setIsPdfGenerating(true);
    setTimeout(() => {
      setIsPdfGenerating(false);
      // Trigger simple printable rider document
      window.print();
    }, 600);
  };

  const bookingWaUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    "Halo Manajer Suara Senja, kami dari [Nama EO/Venue] tertarik untuk mengundang tampil di acara kami. Kami telah meninjau EPK & Technical Rider Anda di Reffband (reffband.id/@suarasenja)."
  )}`;

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 overflow-y-auto reader-leaf-content bg-[#FBF8F1]">
      {/* Story 4.1: Shareable EPK URL Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm mb-4">
        <div className="flex items-center gap-2">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#52525B]">
            SHAREABLE EPK URL:
          </span>
          <strong
            data-testid="shareable-epk-slug"
            className="font-['Space_Mono',monospace] text-xs text-[#7E1929] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#14110F]"
          >
            reffband.id/@suarasenja
          </strong>
        </div>
        <button
          onClick={handleCopy}
          data-testid="btn-copy-epk-link"
          className="font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold px-3 py-1 bg-[#FAF8F5] border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#EFE6D5] transition active:translate-x-0.5 active:translate-y-0.5"
        >
          {copied ? "✓ LINK TERSALIN!" : "📋 SALIN LINK EPK"}
        </button>
      </div>

      {/* Story 4.2: Hero Stage Banner */}
      <div
        data-testid="epk-hero-banner"
        className="relative w-full p-4 md:p-6 bg-[#7E1929] text-white border-2 border-[#14110F] rounded-lg shadow-zine mb-6 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#F5C542] text-[#14110F] font-['Space_Mono',monospace] text-[10px] font-bold rounded mb-2 border border-[#14110F]">
              <span>●</span> VERIFIED BAND • SEMARANG UNDERGROUND
            </div>
            <h2 className="font-['Archivo_Black',sans-serif] text-2xl sm:text-3xl md:text-4xl text-white">
              SUARA SENJA
            </h2>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#EFE6D5] mt-1 max-w-xl">
              Indie Folk / Midwest Emo • Melodi Akustik & Puisi Kota Semarang • Aktif sejak 2021 • 4 Personel
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <span
              data-testid="badge-rate-card"
              className="font-['Space_Mono',monospace] text-xs bg-[#14110F] text-[#F5C542] px-3 py-1.5 rounded border border-[#F5C542] font-bold shadow-zine-sm"
            >
              TARIF: Rp 1.000.000 / GIG
            </span>
            <a
              href={bookingWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-hero-booking-wa"
              className="font-['Space_Mono',monospace] text-xs font-bold px-4 py-2 bg-[#2E6F40] text-white border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#255733] transition active:translate-x-0.5 active:translate-y-0.5"
            >
              BOOKING BAND VIA WHATSAPP
            </a>
          </div>
        </div>
      </div>

      {/* 3-Column Zine Dossier Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Column 1: Audio Demo Player & Vinyl Discography Grid */}
        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                KOLOM 1: 30s CASSETTE AUDIO DEMO
              </span>
              <span className="text-[10px] font-mono text-[#2E6F40] font-bold">
                ● MASTER QUALITY
              </span>
            </div>

            {/* Embedded Cassette Deck Player */}
            <CassetteDeck
              artist="Suara Senja"
              title="Deru Kota Lama"
              city="Semarang"
              rate="Rp 1.000.000"
              genre="Indie Folk"
              className="my-2"
            />

            {/* Lyrics Excerpt */}
            <div className="mt-3 p-2.5 bg-[#FEF9E7] border border-[#14110F] rounded text-[11px] font-mono text-[#14110F]">
              <span className="font-bold text-[#7E1929] block mb-1">
                LIRIK CUPLIKAN // REFF:
              </span>
              <p className="italic leading-relaxed">
                "Di sudut kota lama lampu temaram berbisik,<br />
                Gemuruh kereta senja menuntun kita kembali..."
              </p>
            </div>
          </div>

          {/* Vinyl Discography Grid */}
          <div data-testid="vinyl-discography-grid" className="mt-2 pt-3 border-t border-zinc-200">
            <span className="font-['Space_Mono',monospace] text-[10px] text-[#14110F] font-bold block mb-2">
              DISKOGRAFI & RILISAN VINYL:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center p-2 bg-[#FAF8F5] border border-[#14110F] rounded">
                <div className="relative w-12 h-12">
                  <Image
                    src="/extracted_assets/vinyl-lp-cutout.png"
                    alt="EP 2024"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-[9px] font-mono font-bold mt-1 text-center truncate w-full">
                  Kota Lama EP
                </span>
                <span className="text-[8px] text-zinc-500 font-mono">2024</span>
              </div>

              <div className="flex flex-col items-center p-2 bg-[#FAF8F5] border border-[#14110F] rounded">
                <div className="relative w-12 h-12">
                  <Image
                    src="/extracted_assets/album-theadams.png"
                    alt="Single 2023"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="text-[9px] font-mono font-bold mt-1 text-center truncate w-full">
                  Ruang Sunyi
                </span>
                <span className="text-[8px] text-zinc-500 font-mono">2023</span>
              </div>

              <div className="flex flex-col items-center p-2 bg-[#FAF8F5] border border-[#14110F] rounded">
                <div className="relative w-12 h-12">
                  <Image
                    src="/extracted_assets/album-erk.png"
                    alt="Demo 2022"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="text-[9px] font-mono font-bold mt-1 text-center truncate w-full">
                  Awal Mula
                </span>
                <span className="text-[8px] text-zinc-500 font-mono">2022</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Studio Polaroid Gallery & Gig History */}
        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                KOLOM 2: BUKTI LATIHAN & RIWAYAT GIG
              </span>
              <span className="text-[10px] font-mono text-[#2E6F40] font-bold">
                ● 100% VERIFIED ACTIVE
              </span>
            </div>

            {/* Studio Polaroid Gallery */}
            <div
              data-testid="polaroid-gallery"
              className="grid grid-cols-2 gap-3 my-2"
            >
              <div className="bg-[#FAF8F5] p-2 pb-5 border-2 border-[#14110F] rounded shadow-zine-sm rotate-[-1.5deg]">
                <div className="relative w-full h-24 bg-[#14110F] rounded overflow-hidden">
                  <Image
                    src="/extracted_assets/band-silhouette-cutout.png"
                    alt="Rehearsal 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-['Space_Mono',monospace] text-[8px] text-[#14110F] font-bold text-center mt-1.5 truncate">
                  14 OKT 2024 • NADA STUDIO
                </p>
              </div>

              <div className="bg-[#FAF8F5] p-2 pb-5 border-2 border-[#14110F] rounded shadow-zine-sm rotate-[1.5deg]">
                <div className="relative w-full h-24 bg-[#14110F] rounded overflow-hidden">
                  <Image
                    src="/extracted_assets/vid-frame-motion.png"
                    alt="Rehearsal 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-['Space_Mono',monospace] text-[8px] text-[#14110F] font-bold text-center mt-1.5 truncate">
                  02 SEP 2024 • SOUNDCHECK
                </p>
              </div>
            </div>
          </div>

          {/* Past Gigs List */}
          <div data-testid="past-gigs-list" className="mt-2 pt-3 border-t border-zinc-200">
            <span className="font-['Space_Mono',monospace] text-[10px] text-[#14110F] font-bold block mb-2">
              TIKET & RIWAYAT PANGGUNG:
            </span>
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="p-2 bg-[#FAF8F5] border border-[#14110F] rounded flex justify-between items-center">
                <div>
                  <strong className="text-[#14110F] block">Loka Skena Semarang 2024</strong>
                  <span className="text-zinc-500 text-[9px]">Taman Budaya Raden Saleh • 450 Penonton</span>
                </div>
                <span className="bg-[#7E1929] text-white px-1.5 py-0.5 rounded text-[8px] font-bold">
                  HEADLINER
                </span>
              </div>

              <div className="p-2 bg-[#FAF8F5] border border-[#14110F] rounded flex justify-between items-center">
                <div>
                  <strong className="text-[#14110F] block">Gigs Halaman Belakang #4</strong>
                  <span className="text-zinc-500 text-[9px]">Kota Lama Semarang • 200 Penonton</span>
                </div>
                <span className="bg-[#2E6F40] text-white px-1.5 py-0.5 rounded text-[8px] font-bold">
                  CO-HEADLINER
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Technical Stage Rider & Contact */}
        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-200">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                KOLOM 3: MATRIKS TECHNICAL RIDER
              </span>
              <span className="text-[10px] font-mono text-[#7E1929] font-bold">
                RIDER 2024/2025
              </span>
            </div>

            {/* Technical Rider Matrix */}
            <div data-testid="rider-matrix" className="mt-2 border border-[#14110F] rounded overflow-hidden">
              <div className="bg-[#FEF9E7] p-2 text-[10px] font-mono font-bold border-b border-[#14110F] flex justify-between">
                <span>KEBUTUHAN ALAT</span>
                <span>SPESIFIKASI</span>
              </div>
              <div className="divide-y divide-zinc-200 text-[10px] font-mono bg-[#FAF8F5]">
                <div className="p-2 flex justify-between">
                  <span className="font-bold">Drum Kit</span>
                  <span>5-Piece Standard (Pearl/Yamaha)</span>
                </div>
                <div className="p-2 flex justify-between">
                  <span className="font-bold">Vocal Mic</span>
                  <span>3x Shure SM58 + Boom Stands</span>
                </div>
                <div className="p-2 flex justify-between">
                  <span className="font-bold">Guitar Amp</span>
                  <span>2x Fender Twin Reverb / Marshall</span>
                </div>
                <div className="p-2 flex justify-between">
                  <span className="font-bold">Bass Amp</span>
                  <span>1x Ampeg SVT-CL 4x10</span>
                </div>
                <div className="p-2 flex justify-between">
                  <span className="font-bold">Direct Box</span>
                  <span>2x Active DI (Acoustic Guitar)</span>
                </div>
              </div>
            </div>

            <div className="mt-3 p-2 bg-[#FAF8F5] border border-dashed border-[#14110F] rounded text-[10px] font-mono text-zinc-600">
              <strong>Catatan:</strong> Soundcheck min. 45 menit sebelum open gate. Air mineral 2 botol per personel.
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              onClick={handleDownloadRider}
              data-testid="btn-download-rider-pdf"
              className="w-full font-['Space_Mono',monospace] text-xs font-bold py-2 bg-[#FAF8F5] text-[#14110F] border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#EFE6D5] transition active:translate-x-0.5 active:translate-y-0.5"
            >
              {isPdfGenerating ? "MENYIAPKAN SLIP..." : "📄 UNDUH RIDER RESMI (PDF/PRINT)"}
            </button>

            <a
              href={bookingWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block font-['Space_Mono',monospace] text-xs font-bold py-2 bg-[#2E6F40] text-white border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#255733] transition"
            >
              KONTAK MANAJER VIA WA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
