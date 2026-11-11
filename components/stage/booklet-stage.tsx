"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookHeader } from "./book-header";
import { ReaderControls } from "./reader-controls";
import { LeafCover } from "../leaves/leaf-01-cover";
import { LeafWizard } from "../leaves/leaf-02-wizard";
import { LeafEpk } from "../leaves/leaf-03-epk";
import { LeafDiscovery } from "../leaves/leaf-04-discovery";
import { LeafScorecard } from "../leaves/leaf-05-scorecard";

export const BookletStage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [forcedPhoneMode, setForcedPhoneMode] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const [isFolding, setIsFolding] = useState(false);
  const [manualFoldAngle, setManualFoldAngle] = useState(0); // 0 to 65 deg for manual scrub
  const [isManualScrubbing, setIsManualScrubbing] = useState(false);

  // Active role state bifurcation ("BAND" | "EO" | null)
  const [activeRole, setActiveRole] = useState<"BAND" | "EO" | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const foldOverlayRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Monitor media query <= 700px
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    setIsMobileScreen(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsMobileScreen(e.matches);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isVertical = forcedPhoneMode || isMobileScreen;

  // Authentic 3-Panel Japanese Orihon 3D Accordion Fold Execution
  const run3DAccordionFold = useCallback(
    (target: number, dir: number) => {
      const stageEl = stageRef.current;
      if (!stageEl || !is3DEnabled) {
        setDirection(dir);
        setCurrentIndex(target);
        return;
      }

      const activeLeafEl = stageEl.querySelector(".active-leaf-content") as HTMLElement;
      if (!activeLeafEl) {
        setDirection(dir);
        setCurrentIndex(target);
        return;
      }

      // Sizing
      const width = stageEl.clientWidth;
      const height = stageEl.clientHeight;
      const primaryDim = isVertical ? height : width;
      const panelSize = primaryDim / 3;
      const duration = 650; // ms snappy fold
      const axis = isVertical ? "X" : "Y";
      const travel = isVertical ? "Y" : "X";

      // Create Accordion Container
      const overlay = document.createElement("div");
      overlay.className = "reader-accordion absolute inset-0 z-30 pointer-events-none";
      overlay.style.perspective = "2000px";

      let currentParent: HTMLElement = overlay;
      const panels: HTMLElement[] = [];
      const lights: HTMLElement[] = [];
      const shadings: HTMLElement[] = [];

      for (let i = 0; i < 3; i++) {
        const panel = document.createElement("div");
        panel.className = isVertical ? "accordion-panel-mobile" : "accordion-panel-desktop";
        panel.style.width = isVertical ? `${width}px` : `${panelSize}px`;
        panel.style.height = isVertical ? `${panelSize}px` : `${height}px`;
        // Hinge physics configuration:
        // transformOrigin: "center top"
        // transformOrigin: direction > 0 ? "left center" : "right center"
        panel.style.transformOrigin = isVertical
          ? "center top"
          : direction > 0
          ? "left center"
          : "right center";

        if (i > 0) {
          panel.style.left = isVertical ? "0px" : "100%";
          panel.style.top = isVertical ? "100%" : "0px";
        }

        const face = document.createElement("div");
        face.className = "accordion-slice";

        const snapshot = activeLeafEl.cloneNode(true) as HTMLElement;
        snapshot.style.width = `${width}px`;
        snapshot.style.height = `${height}px`;
        snapshot.style.position = "absolute";
        snapshot.style.left = isVertical ? "0px" : `${-i * panelSize}px`;
        snapshot.style.top = isVertical ? `${-i * panelSize}px` : "0px";
        snapshot.style.pointerEvents = "none";

        const light = document.createElement("span");
        light.className = "accordion-light";
        lights.push(light);

        face.appendChild(snapshot);
        face.appendChild(light);

        if (i > 0) {
          const crease = document.createElement("span");
          crease.className = "accordion-shading";
          face.appendChild(crease);
          shadings.push(crease);
        }

        panel.appendChild(face);
        currentParent.appendChild(panel);
        currentParent = panel;
        panels.push(panel);
      }

      stageEl.appendChild(overlay);
      setIsFolding(true);

      // Smooth step calculation
      const smooth = (a: number, b: number, t: number) => {
        const u = Math.max(0, Math.min(1, (t - a) / (b - a)));
        return u * u * (3 - 2 * u);
      };

      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(1, elapsed / duration);

        const opening = smooth(0.05, 0.55, t);
        const departure = smooth(0.45, 1.0, t);
        const maxAngle = 54;
        const angle = maxAngle * opening + 26 * departure;
        const radians = (angle * Math.PI) / 180;
        const lift = 26 * smooth(0, 0.18, t) + 14 * opening - 28 * departure;
        const shift =
          (primaryDim - primaryDim * Math.cos(radians)) * 0.2 +
          (dir > 0 ? -0.55 : 1.1) * primaryDim * departure;

        const sin = Math.sin(radians);
        const cos = Math.cos(radians);
        const visibility = 1 - smooth(0.8, 1.0, t);

        panels.forEach((p, i) => {
          // Relative accordion hinge angles: -angle, +2*angle, -2*angle
          const relAngle = i === 0 ? -1 : i === 1 ? 2 : -2;
          p.style.transform = `translate${travel}(${
            i === 0 ? shift : 0
          }px) translateZ(${i === 0 ? lift : 0}px) rotate${axis}(${relAngle * angle}deg)`;

          const illumination = 0.78 * cos + (i === 1 ? -0.48 : 0.48) * sin;
          const dark = Math.max(0, 1 - illumination / 0.78) * 0.68;
          if (lights[i]) {
            lights[i].style.background = illumination < 0.78 ? "#14110F" : "#FFFBED";
            lights[i].style.opacity = `${
              illumination < 0.78 ? dark : Math.min(0.15, (illumination - 0.78) * 0.65)
            }`;
          }
        });

        overlay.style.opacity = `${visibility}`;

        if (t === 0.35) {
          // Swap target index while covered by folding mesh
          setDirection(dir);
          setCurrentIndex(target);
        }

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(animate);
        } else {
          overlay.remove();
          setIsFolding(false);
          setDirection(dir);
          setCurrentIndex(target);
        }
      };

      animFrameRef.current = requestAnimationFrame(animate);
    },
    [is3DEnabled, isVertical]
  );

  const goToLeaf = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(4, target));
      if (clamped === currentIndex || isFolding) return;
      const dir = clamped > currentIndex ? 1 : -1;

      // Sync active role
      if (clamped === 1 || clamped === 2) {
        setActiveRole("BAND");
      } else if (clamped === 3) {
        setActiveRole("EO");
      }

      if (is3DEnabled) {
        run3DAccordionFold(clamped, dir);
      } else {
        setDirection(dir);
        setCurrentIndex(clamped);
      }
    },
    [currentIndex, isFolding, is3DEnabled, run3DAccordionFold]
  );

  const nextLeaf = useCallback(() => {
    if (currentIndex < 4) goToLeaf(currentIndex + 1);
  }, [currentIndex, goToLeaf]);

  const prevLeaf = useCallback(() => {
    if (currentIndex > 0) goToLeaf(currentIndex - 1);
  }, [currentIndex, goToLeaf]);

  const handleSelectRole = useCallback(
    (role: "BAND" | "EO") => {
      setActiveRole(role);
      goToLeaf(role === "BAND" ? 1 : 3);
    },
    [goToLeaf]
  );

  const handleToggleRole = useCallback(() => {
    if (activeRole === "BAND" || currentIndex === 1 || currentIndex === 2) {
      setActiveRole("EO");
      goToLeaf(3);
    } else {
      setActiveRole("BAND");
      goToLeaf(1);
    }
  }, [activeRole, currentIndex, goToLeaf]);

  const toggleViewMode = () => {
    setForcedPhoneMode((prev) => !prev);
  };

  const toggle3D = () => {
    setIs3DEnabled((prev) => !prev);
  };

  // Keyboard navigation (STORY-1.4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextLeaf();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        prevLeaf();
      } else if (e.key >= "1" && e.key <= "5") {
        goToLeaf(Number(e.key) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextLeaf, prevLeaf, goToLeaf]);

  // Touch and pointer gesture detection (STORY-1.3)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (
      (e.target as HTMLElement).closest(
        "button, a, input, select, textarea, summary, input[type='range']"
      )
    ) {
      return;
    }
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const distance = isVertical ? dy : dx;
    const cross = isVertical ? dx : dy;

    // Threshold: 65px activation along primary axis with 1.3x dominance over cross axis
    if (Math.abs(distance) > 65 && Math.abs(distance) > Math.abs(cross) * 1.3) {
      if (distance < 0) {
        nextLeaf(); // Swipe up on phone or swipe left on desktop
      } else {
        prevLeaf(); // Swipe down on phone or swipe right on desktop
      }
    }
  };

  // Leaves array
  const leaves = [
    <LeafCover key="leaf-1" onSelectRole={handleSelectRole} />,
    <LeafWizard key="leaf-2" />,
    <LeafEpk key="leaf-3" />,
    <LeafDiscovery key="leaf-4" />,
    <LeafScorecard key="leaf-5" />,
  ];

  return (
    <main className="w-full h-full min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-center items-center bg-[#14110F] p-0 sm:p-2 md:p-4 select-none">
      {/* Physical Book Container */}
      <div
        className={`w-full h-full max-h-[980px] flex flex-col bg-[#FAF8F5] border-2 border-[#14110F] rounded-lg overflow-hidden transition-all duration-300 relative ${
          forcedPhoneMode
            ? "max-w-[420px] washi-book-shadow my-auto"
            : "max-w-[1600px] shadow-2xl"
        }`}
      >
        {/* 1. Fixed Brand Header */}
        <BookHeader
          currentIndex={currentIndex}
          activeRole={activeRole}
          isVertical={isVertical}
          is3DEnabled={is3DEnabled}
          onToggleRole={handleToggleRole}
          onToggleViewMode={toggleViewMode}
          onToggle3D={toggle3D}
        />

        {/* Manual Fold Angle Scrubber Bar */}
        <div className="bg-[#FEF9E7] border-b border-[#14110F] px-4 py-1.5 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#7E1929]">📐 ATUR SUDUT LIPAT 3D MANUAL:</span>
            <input
              type="range"
              min="0"
              max="65"
              value={manualFoldAngle}
              onChange={(e) => {
                setManualFoldAngle(Number(e.target.value));
                setIsManualScrubbing(Number(e.target.value) > 0);
              }}
              className="w-32 sm:w-48 cursor-pointer accent-[#7E1929]"
            />
            <strong className="text-[#14110F] w-10">{manualFoldAngle}°</strong>
          </div>

          <div className="flex items-center gap-2">
            {manualFoldAngle > 0 && (
              <button
                onClick={() => {
                  setManualFoldAngle(0);
                  setIsManualScrubbing(false);
                }}
                className="text-[10px] font-bold px-2 py-0.5 bg-[#FAF8F5] border border-[#14110F] rounded hover:bg-zinc-200"
              >
                RESET DATAR (0°)
              </button>
            )}
            <span className="text-[10px] text-[#52525B] hidden sm:inline">
              *Tarik slider untuk melihat lipatan akordeon 3D fisik secara langsung
            </span>
          </div>
        </div>

        {/* Top Decorative Checkered Strip */}
        <div className="checkered-band" />

        {/* 2. The 3D Book Stage (perspective: 2000px, 100vh locked) */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="stage-booklet-viewport flex-1 relative w-full overflow-hidden bg-[#FAF8F5] cursor-grab active:cursor-grabbing perspective-stage"
          style={{ perspective: is3DEnabled ? "2000px" : "none" }}
        >
          {/* Active Leaf with Manual Fold Angle Applied */}
          <div
            className="active-leaf-content absolute inset-0 w-full h-full transition-transform duration-150"
            style={
              isManualScrubbing
                ? {
                    transformOrigin: isVertical ? "center top" : "left center",
                    transform: isVertical
                      ? `rotateX(${manualFoldAngle}deg) translateZ(${manualFoldAngle * 0.4}px)`
                      : `rotateY(${-manualFoldAngle}deg) translateZ(${manualFoldAngle * 0.4}px)`,
                    boxShadow:
                      manualFoldAngle > 5
                        ? "12px 0 35px rgba(20, 17, 15, 0.35)"
                        : "none",
                  }
                : {}
            }
          >
            {leaves[currentIndex]}
          </div>
        </div>

        {/* Bottom Decorative Checkered Strip */}
        <div className="checkered-band" />

        {/* 3. Fixed Reader Navigation Controls */}
        <ReaderControls
          currentIndex={currentIndex}
          totalLeaves={5}
          isVertical={isVertical}
          onPrev={prevLeaf}
          onNext={nextLeaf}
          onSelectLeaf={goToLeaf}
        />
      </div>
    </main>
  );
};
