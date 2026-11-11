"use client";

import React from "react";

interface ReaderControlsProps {
  currentIndex: number;
  totalLeaves: number;
  isVertical: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelectLeaf: (index: number) => void;
}

const LEAF_LABELS = [
  "1 / 5: Cover & Gatekeeper (Pilihan Peran)",
  "2 / 5: Band Studio Wizard (Create Profile)",
  "3 / 5: Public Band EPK Dossier",
  "4 / 5: EO Discovery & 1-Tap Booking",
  "5 / 5: UX Scorecard & Verification",
];

export const ReaderControls: React.FC<ReaderControlsProps> = ({
  currentIndex,
  totalLeaves,
  isVertical,
  onPrev,
  onNext,
  onSelectLeaf,
}) => {
  return (
    <nav className="h-[52px] min-h-[52px] bg-[#EFE6D5] border-t-2 border-[#14110F] flex items-center justify-between px-3 md:px-5 select-none relative z-20 flex-shrink-0">
      {/* Prev Button */}
      <button
        type="button"
        onClick={onPrev}
        disabled={currentIndex === 0}
        aria-label="Halaman Sebelumnya"
        className="font-['Space_Mono',monospace] text-[11px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 bg-[#F5C542] text-[#14110F] border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#E5B532] transition active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isVertical ? "↑ SEBELUMNYA" : "← PREV LEAF"}
      </button>

      {/* Center Select Dropdown */}
      <div className="flex items-center gap-2">
        <select
          value={currentIndex}
          onChange={(e) => onSelectLeaf(Number(e.target.value))}
          aria-label="Pilih Halaman Booklet"
          className="font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold bg-[#FAF8F5] text-[#14110F] border-2 border-[#14110F] rounded px-2 md:px-3 py-1 md:py-1.5 shadow-zine-sm focus:outline-none focus:ring-2 focus:ring-[#7E1929] max-w-[140px] sm:max-w-[200px] md:max-w-xs cursor-pointer"
        >
          {LEAF_LABELS.map((label, idx) => (
            <option key={idx} value={idx}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={currentIndex === totalLeaves - 1}
        aria-label="Halaman Selanjutnya"
        className="font-['Space_Mono',monospace] text-[11px] md:text-xs font-bold px-3 md:px-4 py-1.5 md:py-2 bg-[#F5C542] text-[#14110F] border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#E5B532] transition active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-35 disabled:cursor-not-allowed disabled:shadow-none"
      >
        {isVertical ? "SELANJUTNYA ↓" : "NEXT LEAF →"}
      </button>
    </nav>
  );
};
