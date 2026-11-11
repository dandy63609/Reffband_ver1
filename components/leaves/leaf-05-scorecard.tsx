"use client";

import React from "react";

export const LeafScorecard: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col p-4 md:p-6 overflow-y-auto reader-leaf-content bg-[#FBF8F1]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 mb-4 border-b-2 border-[#14110F]">
        <div>
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#2E6F40] font-bold">
            LEAF 05: UX EVALUATION & ARCHITECTURE
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-xl md:text-2xl text-[#14110F]">
            PANDUAN PRINSIP DESAIN & INTERAKSI REFFBAND
          </h2>
        </div>
        <div className="font-['Space_Mono',monospace] text-xs font-bold bg-[#14110F] text-[#F5C542] px-3 py-1.5 rounded border-2 border-[#14110F] shadow-zine-sm">
          STANDAR INTERAKSI FISIK & AKSESIBILITAS
        </div>
      </div>

      {/* Grid of UX Laws */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            PRINSIP 01: HICK&apos;S LAW
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            ROLE CLARITY DUA PINTU
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Di Leaf 1, pengguna langsung memilih antara Band vs EO dengan kartu kontras tinggi, memangkas waktu keputusan di bawah 3 detik.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            PRINSIP 02: GOAL-GRADIENT EFFECT
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            METER KELENGKAPAN 100%
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Form 4 langkah memecah beban kognitif musisi menjadi tahapan terukur yang secara psikologis mendorong penyelesaian profil.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            PRINSIP 03: INSTANT AUDITION
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            AUDISI 30s DI TEMPAT
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            EO dapat mengaudisi 5 band dalam 60 detik tanpa membuka tab Linktree eksternal atau berpindah konteks layar.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            PRINSIP 04: TRUST SIGNALS
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            BUKTI LATIHAN POLAROID
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Dokumentasi foto latihan studio bertanggal dan technical rider audio menjamin keabsahan dan kesiapan panggung musisi.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#14110F] rounded-lg shadow-zine-sm">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#7E1929] font-bold">
            PRINSIP 05: FITTS&apos;S LAW & KONTRAS
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            KONTRAS TINGGI & TARGET SENTUH
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Tinta cetak vinyl ink di atas kertas zine menjamin keterbacaan tinggi di kondisi pencahayaan minim panggung konser.
          </p>
        </div>

        <div className="p-4 bg-white border-2 border-[#5B21B6] rounded-lg shadow-zine-sm border-l-4">
          <span className="font-['Space_Mono',monospace] text-[10px] text-[#5B21B6] font-bold">
            PRINSIP 06: DUAL-MODE KINEMATICS
          </span>
          <h4 className="font-['Archivo_Black',sans-serif] text-sm text-[#14110F] mt-1">
            CALENDAR FOLD (≤700PX)
          </h4>
          <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
            Ponsel beralih otomatis ke rotasi sumbu X (rotateX), engsel atas, swipe vertikal (dy &gt; 65px), dan bayangan kertas washi bertumpuk.
          </p>
        </div>
      </div>
    </div>
  );
};
