import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Epic 03: Band Studio Wizard & 4-Step EPK Builder", () => {
  const root = process.cwd();

  it("STORY-3.1 (AC-1): Step 1 provides band identity inputs and multi-select genre chips", () => {
    const wizardPath = path.join(root, "components", "leaves", "leaf-02-wizard.tsx");
    assert.ok(fs.existsSync(wizardPath), "leaf-02-wizard.tsx must exist");
    const wizard = fs.readFileSync(wizardPath, "utf-8");

    assert.match(wizard, /data-testid=["']input-band-name["']/, "Must include band name input");
    assert.match(wizard, /data-testid=["']input-city["']/, "Must include city domicile input");
    assert.match(wizard, /data-testid=["']input-rate-card["']/, "Must include rate card input");
    assert.match(wizard, /data-testid=["']genre-chips-container["']/, "Must include genre chips container");
    assert.match(wizard, /Indie Folk/, "Must support Indie Folk genre");
    assert.match(wizard, /Alternative Rock/, "Must support Alternative Rock genre");
    assert.match(wizard, /Midwest Emo/, "Must support Midwest Emo genre");
    assert.match(wizard, /selectedGenres/, "Must track selectedGenres as multi-select array in state");
  });

  it("STORY-3.2 (AC-2): Step 2 provides cassette dropzone, audio validation, and native canvas waveform preview", () => {
    const wizardPath = path.join(root, "components", "leaves", "leaf-02-wizard.tsx");
    const decoderPath = path.join(root, "lib", "audio", "decoder.ts");
    const deckPath = path.join(root, "components", "media", "cassette-deck.tsx");

    assert.ok(fs.existsSync(decoderPath), "lib/audio/decoder.ts must exist");
    assert.ok(fs.existsSync(deckPath), "components/media/cassette-deck.tsx must exist");

    const wizard = fs.readFileSync(wizardPath, "utf-8");
    const decoder = fs.readFileSync(decoderPath, "utf-8");
    const deck = fs.readFileSync(deckPath, "utf-8");

    assert.match(wizard, /data-testid=["']audio-dropzone["']/, "Must render audio demo dropzone");
    assert.match(wizard, /data-testid=["']input-song-title["']/, "Must include song title input");
    assert.match(wizard, /data-testid=["']input-spotify-url["']/, "Must include Spotify link input");
    assert.match(wizard, /data-testid=["']input-youtube-url["']/, "Must include YouTube link input");

    // Audio decoder checks
    assert.match(decoder, /15\s*\*\s*1024\s*\*\s*1024/, "Audio validation must enforce strict 15MB limit");
    assert.match(decoder, /extractPeaksFromAudioBuffer/, "Waveform decoder must extract normalized peak amplitudes");

    // Cassette deck canvas waveform checks
    assert.match(deck, /<canvas/, "Cassette deck must render HTML5 canvas for waveform");
    assert.match(deck, /data-testid=["']cassette-play-btn["']/, "Must render play button for 30s audio demo");
  });

  it("STORY-3.3 (AC-3): Step 3 provides Polaroid rehearsal photo proof and dynamic gig history table", () => {
    const wizardPath = path.join(root, "components", "leaves", "leaf-02-wizard.tsx");
    const wizard = fs.readFileSync(wizardPath, "utf-8");

    assert.match(wizard, /data-testid=["']polaroid-uploader["']/, "Must render Polaroid rehearsal uploader");
    assert.match(wizard, /data-testid=["']input-rehearsal-video["']/, "Must include rehearsal video link field");
    assert.match(wizard, /data-testid=["']gig-history-table["']/, "Must render gig history table");
    assert.match(wizard, /data-testid=["']btn-add-gig["']/, "Must have button to add gig to history");
    assert.match(wizard, /data-testid=["']btn-delete-gig["']/, "Must have button to delete gig from history");
  });

  it("STORY-3.4 (AC-4): Step 4 provides technical rider checklist and manager WhatsApp contact input", () => {
    const wizardPath = path.join(root, "components", "leaves", "leaf-02-wizard.tsx");
    const wizard = fs.readFileSync(wizardPath, "utf-8");

    assert.match(wizard, /data-testid=["']rider-checklist["']/, "Must render technical rider checklist");
    assert.match(wizard, /data-testid=["']input-manager-wa["']/, "Must include manager WhatsApp input");
    assert.match(wizard, /data-testid=["']input-instagram["']/, "Must include Instagram handle input");
    assert.match(wizard, /Drum Kit/, "Checklist must include Drum Kit item");
    assert.match(wizard, /Vocal Mic/, "Checklist must include Vocal Mic item");
  });

  it("STORY-3.5 (AC-5): Real-time cassette preview updates dynamically and completeness meter reaches 100% VERIFIED READY", () => {
    const wizardPath = path.join(root, "components", "leaves", "leaf-02-wizard.tsx");
    const wizard = fs.readFileSync(wizardPath, "utf-8");

    assert.match(wizard, /data-testid=["']completeness-meter["']/, "Must include goal-gradient completeness meter");
    assert.match(wizard, /data-testid=["']verified-ready-badge["']/, "Must include 100% VERIFIED READY badge");
    assert.match(wizard, /data-testid=["']live-cassette-preview["']/, "Must include real-time live cassette card preview instance");
    assert.match(wizard, /CassetteDeck/, "Must instantiate CassetteDeck in live preview");
  });
});
