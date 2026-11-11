"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface CassetteDeckProps {
  title: string;
  artist: string;
  city?: string;
  rate?: string;
  genre?: string;
  audioUrl?: string | null;
  peaks?: number[];
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  className?: string;
  interactiveWaveform?: boolean;
}

export const CassetteDeck: React.FC<CassetteDeckProps> = ({
  title,
  artist,
  city = "Semarang",
  rate = "Rp 1.000.000",
  genre = "Indie Folk",
  audioUrl = null,
  peaks = [
    0.3, 0.5, 0.8, 0.9, 0.6, 0.4, 0.85, 0.95, 0.8, 0.6, 0.4, 0.75, 0.9, 0.7, 0.5, 0.3,
    0.4, 0.7, 0.85, 0.9, 0.7, 0.5, 0.8, 0.95, 0.8, 0.5, 0.3, 0.7, 0.85, 0.6, 0.4, 0.2
  ],
  isPlaying: externalIsPlaying,
  onTogglePlay,
  className = "",
  interactiveWaveform = true,
}) => {
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0.0 to 1.0
  const [duration, setDuration] = useState(30); // 30s limit
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;

  const togglePlay = () => {
    if (onTogglePlay) {
      onTogglePlay();
    } else {
      setAudioError(null);
      if (!audioRef.current && audioUrl) {
        setIsLoading(true);
        audioRef.current = new Audio(audioUrl);
        audioRef.current.oncanplay = () => setIsLoading(false);
        audioRef.current.onerror = () => {
          setIsLoading(false);
          setInternalIsPlaying(false);
          setAudioError("Demo audio belum tersedia.");
        };
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = Math.min(30, audioRef.current.duration || 30);
            setProgress(current / dur);
            if (current >= 30) {
              audioRef.current.pause();
              setInternalIsPlaying(false);
            }
          }
        };
        audioRef.current.onended = () => {
          setInternalIsPlaying(false);
          setProgress(0);
        };
      }

      if (audioRef.current) {
        if (internalIsPlaying) {
          audioRef.current.pause();
          setInternalIsPlaying(false);
        } else {
          audioRef.current
            .play()
            .then(() => setInternalIsPlaying(true))
            .catch(() => {
              setInternalIsPlaying(false);
              setAudioError("Gagal memutar audio demo.");
            });
        }
      } else {
        // Simulated playback for preview when no direct file attached
        setInternalIsPlaying(!internalIsPlaying);
      }
    }
  };

  // Simulated progress timer if playing without native HTMLAudioElement
  useEffect(() => {
    if (!audioUrl && internalIsPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setInternalIsPlaying(false);
            return 0;
          }
          return prev + 1 / 30; // 30-second duration step
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [audioUrl, internalIsPlaying]);

  // Draw waveform bars on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const barCount = peaks.length;
    const barWidth = Math.max(2, (width / barCount) - 1.5);
    const activeIndex = Math.floor(progress * barCount);

    peaks.forEach((peak, i) => {
      const x = i * (width / barCount);
      const barHeight = Math.max(3, peak * (height - 4));
      const y = (height - barHeight) / 2;

      // Color past progress vs remaining
      if (i <= activeIndex) {
        ctx.fillStyle = "#F5C542"; // Gold/Mustard played
      } else {
        ctx.fillStyle = "#FAF8F5"; // Sand cream unplayed
      }

      // Rounded rectangle for retro tape equalizer look
      ctx.fillRect(x, y, barWidth, barHeight);
    });
  }, [peaks, progress]);

  // Click on waveform to seek
  const handleWaveformClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!interactiveWaveform) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
      setProgress(newProgress);

      if (audioRef.current) {
        audioRef.current.currentTime = newProgress * 30;
      }
    },
    [interactiveWaveform]
  );

  const currentSeconds = Math.floor(progress * duration);

  return (
    <div
      className={`relative w-full bg-[#14110F] border-2 border-[#14110F] rounded-lg p-3 text-white shadow-zine overflow-hidden select-none ${className}`}
    >
      {/* Cassette Header Strip */}
      <div className="flex justify-between items-center text-[10px] font-['Space_Mono',monospace] pb-2 border-b border-zinc-800">
        <span className="bg-[#7E1929] text-white px-2 py-0.5 rounded font-bold border border-[#F5C542]/40">
          SIDE A • 30s PROOF OF SOUND
        </span>
        <span className="text-[#F5C542] font-bold tracking-wider">
          MK-60 • NORMAL BIAS
        </span>
      </div>

      {/* Center Reel Window & Waveform */}
      <div className="my-3 p-2 bg-[#272320] rounded border border-zinc-700 flex flex-col gap-2 relative">
        {/* Animated Tape Reels & Brand Label */}
        <div className="flex justify-between items-center px-4">
          {/* Left Spool */}
          <div
            className={`w-9 h-9 rounded-full border-2 border-dashed border-[#F5C542] bg-[#14110F] flex items-center justify-center transition-all ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "2.8s" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5C542]" />
          </div>

          {/* Tape Label Window */}
          <div className="flex-1 mx-3 px-2 py-1 bg-[#EFE6D5] text-[#14110F] border border-[#14110F] rounded flex flex-col items-center">
            <span className="font-['Archivo_Black',sans-serif] text-[11px] truncate max-w-[170px] text-center">
              {artist || "NAMA BAND"}
            </span>
            <span className="font-['Space_Mono',monospace] text-[9px] text-[#7E1929] font-bold truncate max-w-[170px]">
              "{title || "Judul Lagu Demo"}"
            </span>
          </div>

          {/* Right Spool */}
          <div
            className={`w-9 h-9 rounded-full border-2 border-dashed border-[#F5C542] bg-[#14110F] flex items-center justify-center transition-all ${
              isPlaying ? "animate-spin" : ""
            }`}
            style={{ animationDuration: "2.8s" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5C542]" />
          </div>
        </div>

        {/* Waveform Canvas */}
        <div className="bg-[#14110F] p-1.5 rounded border border-zinc-800">
          <canvas
            ref={canvasRef}
            width={320}
            height={36}
            onClick={handleWaveformClick}
            className={`w-full h-9 rounded block ${
              interactiveWaveform ? "cursor-pointer" : ""
            }`}
            title="Klik waveform untuk seek cuplikan demo 30 detik"
          />
        </div>

        {/* Player Controls & Scrubber Times */}
        <div className="flex justify-between items-center text-[10px] font-['Space_Mono',monospace] px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              data-testid="cassette-play-btn"
              disabled={isLoading}
              className="px-2 py-1 bg-[#F5C542] text-[#14110F] font-bold rounded border border-[#14110F] shadow-zine-sm hover:brightness-110 active:translate-y-0.5 disabled:opacity-50"
            >
              {isLoading ? "MEMUAT..." : isPlaying ? "❚❚ PAUSE" : "▶ PLAY 30s"}
            </button>
            <span className="text-[#ECE7E1]">
              00:{currentSeconds.toString().padStart(2, "0")} / 00:30
            </span>
          </div>

          {audioError ? (
            <span className="text-red-400 text-[9px] font-bold bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500/50">
              {audioError}
            </span>
          ) : (
            <span className="text-[#2E6F40] bg-[#FAF8F5] text-[9px] px-1.5 py-0.5 rounded font-bold border border-[#14110F]">
              ● ZERO-PAGE-LOAD
            </span>
          )}
        </div>
      </div>

      {/* Cassette Footer Metadata */}
      <div className="flex justify-between items-end pt-1 text-[11px] font-['Space_Mono',monospace]">
        <div>
          <span className="text-[#ECE7E1] font-bold text-xs">{genre}</span>
          <span className="text-zinc-400 block text-[10px]">Domisili: {city}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-400 block">Rate Card</span>
          <span className="text-[#F5C542] font-bold text-xs">{rate}</span>
        </div>
      </div>
    </div>
  );
};
