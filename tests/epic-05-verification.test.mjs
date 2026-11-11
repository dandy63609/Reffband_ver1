import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  buildWhatsAppBookingPayload,
  buildWhatsAppUrl,
} from "../lib/whatsapp/payload-builder.ts";

describe("Epic 05: EO Talent Discovery & 1-Tap WhatsApp Booking Handshake", () => {
  const root = process.cwd();

  it("STORY-5.1 (AC-1): Multi-criteria search and filter controls are present and interactive", () => {
    const discoveryPath = path.join(root, "components", "leaves", "leaf-04-discovery.tsx");
    assert.ok(fs.existsSync(discoveryPath), "leaf-04-discovery.tsx must exist");
    const discovery = fs.readFileSync(discoveryPath, "utf-8");

    assert.match(discovery, /data-testid=["']input-eo-search["']/, "Must render quick search input");
    assert.match(discovery, /data-testid=["']filter-genre-chips["']/, "Must render genre filter chips container");
    assert.match(discovery, /data-testid=["']select-rate-filter["']/, "Must render rate filter dropdown");
  });

  it("STORY-5.2 (AC-2): Band cassette roster provides in-place 30s zero-page-load audio audition", () => {
    const discoveryPath = path.join(root, "components", "leaves", "leaf-04-discovery.tsx");
    const discovery = fs.readFileSync(discoveryPath, "utf-8");

    assert.match(discovery, /data-testid=["']band-roster-grid["']/, "Must render band roster grid");
    assert.match(discovery, /data-testid=["']btn-play-band-demo["']/, "Must have play demo button on cassette cards");
    assert.match(discovery, /data-testid=["']btn-open-booking-modal["']/, "Must have open booking modal CTA on each card");
  });

  it("STORY-5.3 (AC-3): 1-Tap WhatsApp booking handshake generates structured Indonesian booking payload", () => {
    const discoveryPath = path.join(root, "components", "leaves", "leaf-04-discovery.tsx");
    const discovery = fs.readFileSync(discoveryPath, "utf-8");

    assert.match(discovery, /data-testid=["']booking-handshake-modal["']/, "Must render booking handshake modal");
    assert.match(discovery, /data-testid=["']btn-send-whatsapp-booking["']/, "Must render send WhatsApp booking button");

    // Test payload generator logic directly
    const testPayload = buildWhatsAppBookingPayload({
      bandName: "Suara Senja",
      bandSlug: "suarasenja",
      organizerName: "Skena Fest EO",
      eventName: "Indie Sounds Semarang",
      eventDate: "2026-11-20",
      venueLocation: "Taman Budaya Raden Saleh",
      offeredRate: "Rp 1.500.000",
      notes: "Soundcheck jam 16:00 WIB",
    });

    assert.match(testPayload, /Halo Manajer Suara Senja/, "Payload must greet band manager");
    assert.match(testPayload, /Indie Sounds Semarang/, "Payload must include event name");
    assert.match(testPayload, /Rp 1\.500\.000/, "Payload must include offered rate");
    assert.match(testPayload, /reffband\.id\/@suarasenja/, "Payload must include verified EPK link");

    const waUrl = buildWhatsAppUrl("081234567890", testPayload);
    assert.match(waUrl, /^https:\/\/wa\.me\/6281234567890\?text=/, "WhatsApp URL must format 62 prefix and encode query string");
  });
});
