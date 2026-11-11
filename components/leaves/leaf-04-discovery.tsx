"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  buildWhatsAppBookingPayload,
  buildWhatsAppUrl,
  BookingPayloadInput,
} from "../../lib/whatsapp/payload-builder";

interface BandItem {
  id: string;
  name: string;
  slug: string;
  genre: string;
  city: string;
  rateNumber: number;
  rateDisplay: string;
  song: string;
  phone: string;
  verified: boolean;
  peaks: number[];
}

const CURATED_BANDS: BandItem[] = [
  {
    id: "band-1",
    name: "Suara Senja",
    slug: "suarasenja",
    genre: "Indie Folk",
    city: "Semarang",
    rateNumber: 1000000,
    rateDisplay: "Rp 1.000.000",
    song: "Deru Kota Lama",
    phone: "081234567890",
    verified: true,
    peaks: [0.3, 0.6, 0.9, 0.7, 0.4, 0.85, 0.95, 0.7, 0.5, 0.8, 0.6, 0.3],
  },
  {
    id: "band-2",
    name: "Distorsi Muda",
    slug: "distorsimuda",
    genre: "Alternative Rock",
    city: "Semarang",
    rateNumber: 2500000,
    rateDisplay: "Rp 2.500.000",
    song: "Asap Pabrik",
    phone: "089876543210",
    verified: true,
    peaks: [0.8, 0.95, 0.7, 0.9, 1.0, 0.85, 0.9, 0.75, 0.8, 0.95, 0.6, 0.4],
  },
  {
    id: "band-3",
    name: "Kala Senja Akustik",
    slug: "kalasenja",
    genre: "Indie Pop",
    city: "Salatiga",
    rateNumber: 800000,
    rateDisplay: "Rp 800.000",
    song: "Sudut Dingin",
    phone: "081122334455",
    verified: true,
    peaks: [0.2, 0.4, 0.6, 0.5, 0.7, 0.65, 0.5, 0.4, 0.6, 0.7, 0.5, 0.3],
  },
  {
    id: "band-4",
    name: "Kabut Selatan",
    slug: "kabutselatan",
    genre: "Midwest Emo",
    city: "Solo",
    rateNumber: 1800000,
    rateDisplay: "Rp 1.800.000",
    song: "Senja & Nostalgia",
    phone: "081399887766",
    verified: true,
    peaks: [0.4, 0.7, 0.85, 0.9, 0.6, 0.8, 0.95, 0.7, 0.5, 0.85, 0.7, 0.4],
  },
  {
    id: "band-5",
    name: "The Grungers",
    slug: "thegrungers",
    genre: "Grunge",
    city: "Semarang",
    rateNumber: 1200000,
    rateDisplay: "Rp 1.200.000",
    song: "Pecah Kaca",
    phone: "081765432109",
    verified: false,
    peaks: [0.6, 0.85, 0.95, 0.8, 0.7, 0.9, 1.0, 0.8, 0.6, 0.75, 0.9, 0.5],
  },
  {
    id: "band-6",
    name: "Halaman Depan",
    slug: "halamandepan",
    genre: "Post-Punk",
    city: "Semarang",
    rateNumber: 3500000,
    rateDisplay: "Rp 3.500.000",
    song: "Gema Beton",
    phone: "081512345678",
    verified: true,
    peaks: [0.5, 0.8, 0.9, 0.75, 0.85, 0.9, 0.7, 0.6, 0.8, 0.95, 0.7, 0.4],
  },
];

export const LeafDiscovery: React.FC = () => {
  // Search & Filters state
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");
  const [rateFilter, setRateFilter] = useState<string>("ALL");
  const [activeAudition, setActiveAudition] = useState<string | null>(null);

  // Booking handshake modal state
  const [selectedBandForBooking, setSelectedBandForBooking] = useState<BandItem | null>(null);
  const [organizerName, setOrganizerName] = useState("Skena Fest EO");
  const [eventName, setEventName] = useState("Semarang Indie Fest 2026");
  const [eventDate, setEventDate] = useState("2026-12-15");
  const [venueLocation, setVenueLocation] = useState("Taman Budaya Raden Saleh, Semarang");
  const [offeredRate, setOfferedRate] = useState("Rp 1.000.000");
  const [bookingNotes, setBookingNotes] = useState("Slot main 45 menit, soundcheck sore jam 16:00 WIB.");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const genres = ["ALL", "Indie Folk", "Alternative Rock", "Indie Pop", "Midwest Emo", "Grunge", "Post-Punk"];

  // Filter logic
  const filteredBands = useMemo(() => {
    return CURATED_BANDS.filter((band) => {
      // Search text match
      const query = search.toLowerCase().trim();
      const matchSearch =
        !query ||
        band.name.toLowerCase().includes(query) ||
        band.genre.toLowerCase().includes(query) ||
        band.city.toLowerCase().includes(query) ||
        band.song.toLowerCase().includes(query);

      // Genre match
      const matchGenre = selectedGenre === "ALL" || band.genre === selectedGenre;

      // Rate match
      let matchRate = true;
      if (rateFilter === "UNDER_1M") {
        matchRate = band.rateNumber < 1000000;
      } else if (rateFilter === "1M_TO_3M") {
        matchRate = band.rateNumber >= 1000000 && band.rateNumber <= 3000000;
      } else if (rateFilter === "ABOVE_3M") {
        matchRate = band.rateNumber > 3000000;
      }

      return matchSearch && matchGenre && matchRate;
    });
  }, [search, selectedGenre, rateFilter]);

  // Open booking handshake modal
  const handleOpenBookingModal = (band: BandItem) => {
    setSelectedBandForBooking(band);
    setOfferedRate(band.rateDisplay);
  };

  // Close booking modal
  const handleCloseBookingModal = () => {
    setSelectedBandForBooking(null);
  };

  // Keyboard accessibility: dismiss modal with Escape key (R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedBandForBooking) {
        handleCloseBookingModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBandForBooking]);

  // Send WhatsApp booking inquiry
  const handleSendBooking = () => {
    if (!selectedBandForBooking) return;

    const payloadInput: BookingPayloadInput = {
      bandName: selectedBandForBooking.name,
      bandSlug: selectedBandForBooking.slug,
      organizerName,
      eventName,
      eventDate,
      venueLocation,
      offeredRate,
      notes: bookingNotes,
    };

    const message = buildWhatsAppBookingPayload(payloadInput);
    const waUrl = buildWhatsAppUrl(selectedBandForBooking.phone, message);

    // Open WhatsApp
    window.open(waUrl, "_blank");

    setToastMessage(`✓ Undangan resmi untuk ${selectedBandForBooking.name} telah dikirim ke WhatsApp!`);
    handleCloseBookingModal();
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 overflow-y-auto reader-leaf-content bg-[#FAF8F5]">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 mb-4 border-b-2 border-[#14110F]">
        <div>
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            LEAF 04: TALENT DISCOVERY & AUDISI
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-xl md:text-2xl text-[#14110F]">
            TEMUKAN BAND & AUDISI DI TEMPAT
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#FEF9E7] text-[#14110F] px-2.5 py-1 rounded border border-[#14110F] font-bold shadow-zine-sm">
            ⚡ {filteredBands.length} BAND TERSEDIA
          </span>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-4 p-2.5 bg-[#2E6F40] text-white text-xs font-mono font-bold rounded border-2 border-[#14110F] shadow-zine flex justify-between items-center">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white hover:text-amber-200">
            ✕
          </button>
        </div>
      )}

      {/* Story 5.1: Multi-Criteria Search & Filter Bar */}
      <div className="flex flex-col gap-3 p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              data-testid="input-eo-search"
              placeholder="🔍 Ketik nama band, lagu, atau kota (Semarang, Solo, Salatiga)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border-2 border-[#14110F] rounded bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#7E1929]"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              data-testid="select-rate-filter"
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
              className="w-full text-xs font-bold p-2.5 border-2 border-[#14110F] rounded bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#7E1929] font-mono"
            >
              <option value="ALL">Rentang Tarif: Semua</option>
              <option value="UNDER_1M">&lt; Rp 1.000.000</option>
              <option value="1M_TO_3M">Rp 1.000.000 - Rp 3.000.000</option>
              <option value="ABOVE_3M">&gt; Rp 3.000.000</option>
            </select>
          </div>
        </div>

        {/* Genre Chips */}
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 overflow-x-auto">
          <span className="text-[10px] font-mono font-bold text-zinc-500 whitespace-nowrap">
            GENRE:
          </span>
          <div data-testid="filter-genre-chips" className="flex items-center gap-1.5 flex-wrap">
            {genres.map((g) => {
              const isActive = selectedGenre === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGenre(g)}
                  className={`font-['Space_Mono',monospace] text-[10px] font-bold px-2.5 py-1 rounded border border-[#14110F] transition active:scale-95 ${
                    isActive
                      ? "bg-[#7E1929] text-white shadow-zine-sm"
                      : "bg-[#FAF8F5] text-[#14110F] hover:bg-zinc-200"
                  }`}
                >
                  {g === "ALL" ? "SEMUA GENRE" : g}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Story 5.2: Band Cassette Roster Grid */}
      <div
        data-testid="band-roster-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1"
      >
        {filteredBands.map((band) => {
          const isPlayingThis = activeAudition === band.id;

          return (
            <div
              key={band.id}
              className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm flex flex-col justify-between hover:translate-x-0.5 hover:-translate-y-0.5 transition"
            >
              <div>
                {/* 90s Analog Cassette Visual Frame */}
                <div className="relative w-full bg-[#14110F] border-2 border-[#14110F] rounded p-3 text-white shadow-zine-sm mb-3 overflow-hidden">
                  <div className="flex justify-between items-center text-[9px] font-mono pb-1 border-b border-zinc-800">
                    <span className="bg-[#7E1929] px-2 py-0.5 rounded text-white font-bold">
                      {band.verified ? "✓ TERVERIFIKASI" : "KOMUNITAS"}
                    </span>
                    <span className="text-[#F5C542] font-bold">{band.city}</span>
                  </div>

                  {/* Tape Spools & Song Name */}
                  <div className="flex justify-between items-center px-2 my-2.5">
                    <div
                      className={`w-7 h-7 rounded-full border border-dashed border-[#F5C542] flex items-center justify-center ${
                        isPlayingThis ? "animate-spin" : ""
                      }`}
                      style={{ animationDuration: "2.5s" }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#F5C542]" />
                    </div>

                    <div className="flex-1 mx-2 px-2 py-1 bg-[#EFE6D5] text-[#14110F] rounded text-center truncate border border-[#14110F]">
                      <span className="text-[10px] font-mono font-bold text-[#7E1929] block truncate">
                        "{band.song}"
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full border border-dashed border-[#F5C542] flex items-center justify-center ${
                        isPlayingThis ? "animate-spin" : ""
                      }`}
                      style={{ animationDuration: "2.5s" }}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#F5C542]" />
                    </div>
                  </div>

                  {/* Waveform graphic bar */}
                  <div className="h-5 bg-[#272320] rounded p-1 flex items-center gap-0.5">
                    {band.peaks.map((p, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-sm ${
                          isPlayingThis ? "bg-[#F5C542]" : "bg-zinc-500"
                        }`}
                        style={{ height: `${Math.max(15, p * 100)}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono pt-2">
                    <span className="text-[#ECE7E1]">{band.genre}</span>
                    <span className="text-[#F5C542] font-bold">{band.rateDisplay}</span>
                  </div>
                </div>

                {/* Card Header & Bio */}
                <h4 className="font-['Archivo_Black',sans-serif] text-base md:text-lg text-[#14110F]">
                  {band.name}
                </h4>
                <p className="text-xs text-[#52525B] font-mono mt-0.5">
                  {band.genre} • Basis {band.city}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-zinc-200 flex flex-col gap-2">
                <button
                  type="button"
                  data-testid="btn-play-band-demo"
                  onClick={() =>
                    setActiveAudition(isPlayingThis ? null : band.id)
                  }
                  className={`w-full font-['Space_Mono',monospace] text-xs font-bold py-2 border-2 border-[#14110F] rounded shadow-zine-sm transition active:translate-y-0.5 ${
                    isPlayingThis
                      ? "bg-[#F5C542] text-[#14110F]"
                      : "bg-[#FAF8F5] text-[#14110F] hover:bg-[#EFE6D5]"
                  }`}
                >
                  {isPlayingThis ? "❚❚ PAUSE AUDISI" : "▶ AUDISI DEMO 30s"}
                </button>

                <button
                  type="button"
                  data-testid="btn-open-booking-modal"
                  onClick={() => handleOpenBookingModal(band)}
                  className="w-full font-['Space_Mono',monospace] text-xs font-bold py-2 bg-[#2E6F40] text-white border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#255733] transition active:translate-y-0.5"
                >
                  AJUKAN JADWAL MANGGUNG VIA WA
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBands.length === 0 && (
        <div className="p-8 text-center bg-white border-2 border-[#14110F] rounded-lg my-8">
          <p className="font-['Archivo_Black',sans-serif] text-base text-[#14110F]">
            TIDAK ADA BAND YANG COCOK DENGAN FILTER
          </p>
          <p className="text-xs text-zinc-500 font-mono mt-1">
            Coba ubah kata kunci pencarian atau reset filter genre / tarif.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedGenre("ALL");
              setRateFilter("ALL");
            }}
            className="mt-3 font-mono text-xs font-bold px-3 py-1.5 bg-[#7E1929] text-white rounded border border-[#14110F]"
          >
            RESET SEMUA FILTER
          </button>
        </div>
      )}

      {/* Story 5.3: 1-Tap WhatsApp Booking Handshake Modal */}
      {selectedBandForBooking && (
        <div
          data-testid="booking-handshake-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-band"
          className="fixed inset-0 bg-[#14110F]/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] border-2 border-[#14110F] rounded-lg shadow-2xl max-w-lg w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-3 border-b-2 border-[#14110F]">
              <div>
                <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
                  1-TAP WHATSAPP BOOKING HANDSHAKE
                </span>
                <h3
                  id="modal-title-band"
                  className="font-['Archivo_Black',sans-serif] text-lg text-[#14110F]"
                >
                  UNDANG {selectedBandForBooking.name.toUpperCase()}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseBookingModal}
                aria-label="Tutup Dialog Undangan"
                className="text-base font-bold text-zinc-500 hover:text-black p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                  Nama EO / Panitia Penyelenggara
                </label>
                <input
                  type="text"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                  Nama Acara / Festival
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                    Tanggal Tampil
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                    Tawaran Honorarium
                  </label>
                  <input
                    type="text"
                    value={offeredRate}
                    onChange={(e) => setOfferedRate(e.target.value)}
                    className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                  Lokasi / Venue Panggung
                </label>
                <input
                  type="text"
                  value={venueLocation}
                  onChange={(e) => setVenueLocation(e.target.value)}
                  className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#14110F] mb-1">
                  Catatan Tambahan
                </label>
                <textarea
                  rows={2}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  className="w-full p-2 border-2 border-[#14110F] rounded bg-white text-xs"
                />
              </div>

              {/* Message Preview */}
              <div className="p-3 bg-[#FEF9E7] border border-[#14110F] rounded">
                <span className="text-[10px] font-bold text-[#7E1929] block mb-1">
                  PRATINJAU DRAF PESAN RESMI (OTOMATIS TERAkit):
                </span>
                <p className="text-[10px] text-zinc-700 whitespace-pre-wrap leading-relaxed">
                  {buildWhatsAppBookingPayload({
                    bandName: selectedBandForBooking.name,
                    bandSlug: selectedBandForBooking.slug,
                    organizerName,
                    eventName,
                    eventDate,
                    venueLocation,
                    offeredRate,
                    notes: bookingNotes,
                  })}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleCloseBookingModal}
                className="font-mono text-xs font-bold px-3 py-2 bg-zinc-200 border border-[#14110F] rounded"
              >
                BATAL
              </button>
              <button
                type="button"
                data-testid="btn-send-whatsapp-booking"
                onClick={handleSendBooking}
                className="font-mono text-xs font-bold px-4 py-2 bg-[#2E6F40] text-white border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#255733] transition"
              >
                KIRIM UNDANGAN RESMI VIA WHATSAPP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
