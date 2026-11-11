import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Epic 04: Public EPK Dossier & Media Player", () => {
  const root = process.cwd();

  it("STORY-4.1 (AC-1): Shareable EPK header provides 1-click clipboard copy with feedback toast", () => {
    const epkPath = path.join(root, "components", "leaves", "leaf-03-epk.tsx");
    assert.ok(fs.existsSync(epkPath), "leaf-03-epk.tsx must exist");
    const epk = fs.readFileSync(epkPath, "utf-8");

    assert.match(epk, /data-testid=["']shareable-epk-slug["']/, "Must render shareable EPK slug");
    assert.match(epk, /data-testid=["']btn-copy-epk-link["']/, "Must render copy EPK link button");
    assert.match(epk, /reffband\.id\/@/, "Must display public vanity URL format reffband.id/@band");
  });

  it("STORY-4.2 (AC-2): Concert hero banner renders verified stamp, rate card badge, and WhatsApp CTA", () => {
    const epkPath = path.join(root, "components", "leaves", "leaf-03-epk.tsx");
    const epk = fs.readFileSync(epkPath, "utf-8");

    assert.match(epk, /data-testid=["']epk-hero-banner["']/, "Must render hero banner");
    assert.match(epk, /data-testid=["']badge-rate-card["']/, "Must render rate card badge");
    assert.match(epk, /data-testid=["']btn-hero-booking-wa["']/, "Must render WhatsApp booking button");
    assert.match(epk, /VERIFIED BAND/i, "Must display verified band status badge");
  });

  it("STORY-4.3 (AC-3): 30s Cassette player renders interactive waveform and discography vinyl grid", () => {
    const epkPath = path.join(root, "components", "leaves", "leaf-03-epk.tsx");
    const epk = fs.readFileSync(epkPath, "utf-8");

    assert.match(epk, /CassetteDeck/, "Must instantiate CassetteDeck for 30s demo playback");
    assert.match(epk, /data-testid=["']vinyl-discography-grid["']/, "Must render vinyl discography grid");
    assert.match(epk, /vinyl-lp-cutout\.png/, "Must render authentic vinyl cutout asset");
  });

  it("STORY-4.4 (AC-4): Studio Polaroid gallery renders authentic tilts and technical rider PDF exporter exists", () => {
    const epkPath = path.join(root, "components", "leaves", "leaf-03-epk.tsx");
    const epk = fs.readFileSync(epkPath, "utf-8");

    assert.match(epk, /data-testid=["']polaroid-gallery["']/, "Must render Polaroid rehearsal gallery");
    assert.match(epk, /data-testid=["']rider-matrix["']/, "Must render technical rider matrix");
    assert.match(epk, /data-testid=["']btn-download-rider-pdf["']/, "Must render rider PDF download button");
    assert.match(epk, /data-testid=["']past-gigs-list["']/, "Must render past concerts gig list");
  });
});
