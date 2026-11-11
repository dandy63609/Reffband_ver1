import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LeafEpk } from "@/components/leaves/leaf-03-epk";

interface PageProps {
  params: Promise<{ bandSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { bandSlug } = await params;
  const cleanSlug = decodeURIComponent(bandSlug).replace(/^@/, "");

  // Band metadata dictionary (fallback for demo / mock)
  const bandName = cleanSlug === "distorsimuda" ? "Distorsi Muda" : "Suara Senja";
  const city = "Semarang";
  const genre = cleanSlug === "distorsimuda" ? "Alternative Rock" : "Indie Folk";
  const rate = cleanSlug === "distorsimuda" ? "Rp 2.500.000" : "Rp 1.000.000";

  return {
    title: `${bandName}: EPK Resmi & Rider Panggung | Reffband`,
    description: `Dossier resmi ${bandName} (${genre} • ${city}). Dengarkan cuplikan demo 30 detik, cek technical rider audio panggung, dan booking via WhatsApp dalam 1-klik. Tarif: ${rate}/gig.`,
    openGraph: {
      title: `${bandName} [${genre}] | Reffband Verified EPK`,
      description: `Tarif: ${rate}/gig • Domisili: ${city} • 30s Audio Demo & Technical Rider Siap Unduh.`,
      url: `https://reffband.id/@${cleanSlug}`,
      siteName: "Reffband Indie Gig Zine",
      images: [
        {
          url: "/extracted_assets/cassette-mk60-cutout.png",
          width: 800,
          height: 500,
          alt: `${bandName} MK-60 Demo Cassette`,
        },
      ],
      type: "music.song",
    },
    twitter: {
      card: "summary_large_image",
      title: `${bandName}: Verified EPK Dossier`,
      description: `Dengarkan demo 30s & booking jadwal manggung via WhatsApp.`,
      images: ["/extracted_assets/cassette-mk60-cutout.png"],
    },
  };
}

export default async function BandPublicPage({ params }: PageProps) {
  const { bandSlug } = await params;
  const cleanSlug = decodeURIComponent(bandSlug);

  return (
    <div className="min-h-screen bg-[#14110F] flex flex-col items-center p-2 sm:p-4">
      {/* Top Standalone Navigation Bar */}
      <header className="w-full max-w-6xl flex justify-between items-center py-2 px-4 mb-2 bg-[#FAF8F5] border-2 border-[#14110F] rounded-lg shadow-zine select-none">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="font-['Space_Mono',monospace] text-xs font-bold px-3 py-1 bg-[#7E1929] text-white rounded border border-[#14110F] shadow-zine-sm hover:brightness-110 active:translate-y-0.5"
          >
            ← BUKA 3D ZINE BOOKLET
          </Link>
          <span className="text-[11px] font-mono text-zinc-600 hidden sm:inline">
            Mode Dossier Publik: <strong className="text-[#14110F]">{cleanSlug}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-['Space_Mono',monospace] text-[10px] bg-[#2E6F40] text-white font-bold px-2.5 py-1 rounded border border-[#14110F]">
            ● VERIFIED EPK
          </span>
        </div>
      </header>

      {/* Main EPK Leaf Dossier Layout */}
      <main className="w-full max-w-6xl flex-1 bg-[#FAF8F5] border-2 border-[#14110F] rounded-lg overflow-hidden shadow-2xl p-2 sm:p-4">
        <LeafEpk />
      </main>
    </div>
  );
}
