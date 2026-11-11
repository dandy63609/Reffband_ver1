"use client";

import React from "react";
import Image from "next/image";

interface BookHeaderProps {
  currentIndex: number;
  activeRole: "BAND" | "EO" | null;
  isVertical: boolean;
  is3DEnabled: boolean;
  onToggleRole: () => void;
  onToggleViewMode: () => void;
  onToggle3D: () => void;
}

export const BookHeader: React.FC<BookHeaderProps> = ({
  currentIndex,
  activeRole,
  isVertical,
  is3DEnabled,
  onToggleRole,
  onToggleViewMode,
  onToggle3D,
}) => {
  // Determine role display: prefer explicit activeRole state, fallback to current leaf derivation
  const roleDisplay =
    activeRole === "BAND"
      ? "BAND"
      : activeRole === "EO"
      ? "EO"
      : currentIndex === 1 || currentIndex === 2
      ? "BAND"
      : currentIndex === 3
      ? "EO"
      : "PILIH";

  return (
    <header className="flex items-center justify-between px-3 md:px-5 h-[49px] md:h-[64px] bg-[#FAF8F5] border-b-2 border-[#14110F] select-none flex-shrink-0 z-20">
      {/* Brand Lockup */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="relative w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
          <Image
            src="/extracted_assets/logo-r-transparent.png"
            alt="Reffband Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h1 className="font-['Archivo_Black',sans-serif] text-base md:text-xl tracking-tight leading-none text-[#14110F]">
            REFFBAND
          </h1>
          <p className="hidden md:block font-['Space_Mono',monospace] text-[9px] text-[#52525B] tracking-wider leading-none mt-1">
            3D ACCORDION GIG ZINE & TALENT DOSSIER
          </p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Story 2.3: Persistent Role Switcher Navbar Control */}
        <button
          onClick={onToggleRole}
          data-testid="role-switcher-btn"
          className="font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 bg-[#FAF8F5] border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#F3EFEA] transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1"
          title="MENU PERAN: Beralih instan antara Studio Band (Leaf 02) dan EO Discovery (Leaf 04) tanpa logout"
        >
          <span className="hidden sm:inline">MENU PERAN: </span>
          <span className="inline sm:hidden">PERAN: </span>
          <strong
            className={`px-1.5 py-0.5 rounded text-[9px] md:text-[11px] ${
              roleDisplay === "BAND"
                ? "bg-[#7E1929] text-white"
                : roleDisplay === "EO"
                ? "bg-[#F5C542] text-[#14110F]"
                : "bg-[#71717A] text-white"
            }`}
          >
            [{roleDisplay}]
          </strong>
        </button>

        {/* View Mode Toggle (Desktop rotateY vs Phone rotateX) */}
        <button
          onClick={onToggleViewMode}
          className="font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 bg-[#5B21B6] text-white border-2 border-[#14110F] rounded shadow-zine-sm hover:bg-[#4C1D95] transition active:translate-x-0.5 active:translate-y-0.5"
          title="Toggle antara Desktop Book Fold (rotateY) dan Phone Calendar Fold (rotateX)"
        >
          <span className="hidden sm:inline">FOLD: </span>
          <strong>{isVertical ? "PHONE (rotateX)" : "DESKTOP (rotateY)"}</strong>
        </button>

        {/* 3D Fold Physics Toggle */}
        <button
          onClick={onToggle3D}
          className={`font-['Space_Mono',monospace] text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 border-2 border-[#14110F] rounded shadow-zine-sm transition active:translate-x-0.5 active:translate-y-0.5 ${
            is3DEnabled ? "bg-[#2E6F40] text-white" : "bg-[#71717A] text-white"
          }`}
          title="Toggle 3D Origami Mesh Physics Engine"
        >
          3D: [{is3DEnabled ? "ON" : "OFF"}]
        </button>
      </div>
    </header>
  );
};
