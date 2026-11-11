import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Epic 02: Role Gatekeeper & Session Bifurcation", () => {
  const root = process.cwd();

  it("STORY-2.1 (AC-1): Leaf 01 renders high-contrast Band and EO cards with authentic cutouts", () => {
    const coverPath = path.join(root, "components", "leaves", "leaf-01-cover.tsx");
    assert.ok(fs.existsSync(coverPath), "leaf-01-cover.tsx must exist");
    const cover = fs.readFileSync(coverPath, "utf-8");

    // Band Card checks
    assert.match(cover, /#7E1929/, "Band card must use wine maroon #7E1929");
    assert.match(cover, /cassette-mk60-cutout\.png/, "Band card must render MK-60 cassette cutout asset");
    assert.match(cover, /MASUK KE STUDIO BAND/, "Band card must have explicit CTA 'MASUK KE STUDIO BAND'");
    assert.match(cover, /PINTU 01: MUSISI & BAND/, "Band card must have badge 'PINTU 01: MUSISI & BAND'");

    // EO Card checks
    assert.match(cover, /#F5C542/, "EO card must use mustard yellow #F5C542");
    assert.match(cover, /vinyl-lp-cutout\.png/, "EO card must render vinyl LP cutout asset");
    assert.match(cover, /CARI BAND SEKARANG/, "EO card must have explicit CTA 'CARI BAND SEKARANG'");
    assert.match(cover, /PINTU 02: EVENT ORGANIZER & VENUE/, "EO card must have badge 'PINTU 02: EVENT ORGANIZER & VENUE'");

    // Hero Stage checks
    assert.match(cover, /band-silhouette-cutout\.png/, "Hero stage must render concert silhouette cutout");
    assert.match(cover, /Katalog Musisi Independen & Panggung Musik Semarang/, "Hero stage must have the main headline");
  });

  it("STORY-2.2 (AC-2): Role routing and state bifurcation navigate to Leaf 02 and Leaf 04", () => {
    const stagePath = path.join(root, "components", "stage", "booklet-stage.tsx");
    assert.ok(fs.existsSync(stagePath), "booklet-stage.tsx must exist");
    const stage = fs.readFileSync(stagePath, "utf-8");

    // Check that BookletStage passes onSelectRole handler
    assert.match(stage, /onSelectRole=/, "BookletStage must pass role selection handler to LeafCover");
    // Band role jump to index 1 (Leaf 02)
    assert.match(stage, /role\s*===\s*["']BAND["']\s*\?\s*1\s*:\s*3/, "Band role must jump to index 1, EO role must jump to index 3");
    // State bifurcation
    assert.match(stage, /activeRole/, "BookletStage must maintain activeRole state");
  });

  it("STORY-2.3 (AC-3): Persistent Role Switcher navbar control allows instant switching without logout", () => {
    const headerPath = path.join(root, "components", "stage", "book-header.tsx");
    assert.ok(fs.existsSync(headerPath), "book-header.tsx must exist");
    const header = fs.readFileSync(headerPath, "utf-8");

    // Header role switcher button and styling
    assert.match(header, /MENU PERAN/, "BookHeader must display 'MENU PERAN' label");
    assert.match(header, /onToggleRole/, "BookHeader must receive onToggleRole callback");
    assert.match(header, /data-testid=["']role-switcher-btn["']/, "Header must have data-testid='role-switcher-btn'");
  });
});
