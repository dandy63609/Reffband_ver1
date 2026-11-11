"use client";

import React from "react";
import Image from "next/image";

interface LeafCoverProps {
  onSelectRole: (role: "BAND" | "EO") => void;
}

export const LeafCover: React.FC<LeafCoverProps> = ({ onSelectRole }) => {
  return (
    <div className="h-full w-full flex flex-col p-4 md:p-8 overflow-y-auto reader-leaf-content bg-[#FBF8F1]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center flex-1">
        {/* Left Side: Hero Stage Collage */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2E6F40] text-white font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold rounded w-fit border border-[#14110F] shadow-zine-sm">
            <span>●</span> PLATFORM MATCHMAKING BAND INDIE SEMARANG
          </div>

          <h2 className="font-['Archivo_Black',sans-serif] text-2xl sm:text-3xl md:text-4xl text-[#14110F] leading-tight">
            Katalog Musisi Independen & Panggung Musik Semarang
          </h2>

          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-sm text-[#52525B] leading-relaxed max-w-lg">
            Kurasi profil EPK, dengarkan rekaman demo 30 detik, dan hubungi jadwal manggung tanpa perantara.
          </p>


          {/* Hero Stage Cutout */}
          <div className="relative w-full h-44 sm:h-52 md:h-64 border-2 border-[#14110F] rounded-lg overflow-hidden bg-[#14110F] shadow-zine mt-2">
            <Image
              src="/extracted_assets/band-silhouette-cutout.png"
              alt="Band Concert Silhouette"
              fill
              className="object-cover opacity-85"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#F5C542] font-bold bg-[#14110F]/80 px-2 py-1 rounded border border-[#F5C542]/30">
                LIVE STAGE • REFFBAND ZINE VOL. 01
              </span>
              <span className="font-['Space_Mono',monospace] text-[10px] text-[#EFE6D5] bg-[#14110F]/80 px-2 py-1 rounded hidden sm:inline">
                SEMARANG UNDERGROUND SKENA
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Two-Door Role Gatekeeper */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="text-center md:text-left">
            <span className="font-['Space_Mono',monospace] text-xs font-bold text-[#7E1929] tracking-wider">
              LANGKAH AWAL • PILIH PERAN
            </span>
            <h3 className="font-['Archivo_Black',sans-serif] text-lg sm:text-xl text-[#14110F] mt-1">
              MASUK SEBAGAI APA HARI INI?
            </h3>
          </div>

          {/* Card A: Musisi / Band */}
          <button
            type="button"
            id="gatekeeper-card-band"
            data-testid="gatekeeper-card-band"
            onClick={() => onSelectRole("BAND")}
            className="w-full text-left group cursor-pointer p-4 md:p-5 bg-[#7E1929] text-white border-2 border-[#14110F] rounded-lg shadow-zine hover:translate-x-1 hover:-translate-y-1 transition relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#9B2338]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="font-['Space_Mono',monospace] text-[10px] bg-[#F5C542] text-[#14110F] font-bold px-2 py-0.5 rounded border border-[#14110F]">
                  PINTU 01: MUSISI & BAND
                </span>
                <h4 className="font-['Archivo_Black',sans-serif] text-base md:text-lg mt-2">
                  SAYA MUSISI / BAND INDIE
                </h4>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#EFE6D5] mt-1 line-clamp-2">
                  Buat profil EPK digital, unggah demo lagu kaset pita, lampirkan bukti latihan studio Polaroid, dan terima tawaran panggung.
                </p>
                <div
                  data-testid="btn-enter-band-studio"
                  className="mt-4 inline-flex items-center font-['Space_Mono',monospace] text-xs font-bold text-[#F5C542] group-hover:underline"
                >
                  MASUK KE STUDIO BAND
                </div>
              </div>
              <div className="relative w-24 h-16 sm:w-28 sm:h-20 flex-shrink-0">
                <Image
                  src="/extracted_assets/cassette-mk60-cutout.png"
                  alt="Kaset MK-60"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </button>

          {/* Card B: Event Organizer */}
          <button
            type="button"
            id="gatekeeper-card-eo"
            data-testid="gatekeeper-card-eo"
            onClick={() => onSelectRole("EO")}
            className="w-full text-left group cursor-pointer p-4 md:p-5 bg-[#F5C542] text-[#14110F] border-2 border-[#14110F] rounded-lg shadow-zine hover:translate-x-1 hover:-translate-y-1 transition relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#7E1929]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="font-['Space_Mono',monospace] text-[10px] bg-[#7E1929] text-white font-bold px-2 py-0.5 rounded border border-[#14110F]">
                  PINTU 02: EVENT ORGANIZER & VENUE
                </span>
                <h4 className="font-['Archivo_Black',sans-serif] text-base md:text-lg mt-2">
                  SAYA EVENT ORGANIZER / VENUE
                </h4>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#3A322D] mt-1 line-clamp-2">
                  Temukan musisi kurasi lokal, dengarkan cuplikan audio 30 detik tanpa ganti tab, dan hubungi manajer band via WhatsApp.
                </p>
                <div
                  data-testid="btn-enter-eo-discovery"
                  className="mt-4 inline-flex items-center font-['Space_Mono',monospace] text-xs font-bold text-[#7E1929] group-hover:underline"
                >
                  CARI BAND SEKARANG
                </div>
              </div>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <Image
                  src="/extracted_assets/vinyl-lp-cutout.png"
                  alt="Vinyl LP Record"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
