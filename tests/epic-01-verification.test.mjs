import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Epic 01: 100vh Viewport-Locked Booklet Shell & Dual-Mode 3D Fold Engine", () => {
  const root = process.cwd();

  it("STORY-1.1 (AC-1): globals.css enforces strict 100vh window lock with zero outer scroll", () => {
    const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf-8");
    assert.match(css, /overflow:\s*hidden/, "globals.css must enforce overflow: hidden on window");
    assert.match(css, /height:\s*100vh/, "globals.css must lock height to 100vh");
    assert.match(css, /perspective:\s*2000px/, "Stage must define perspective: 2000px for 3D depth");
    assert.match(css, /\.reader-leaf-content::-webkit-scrollbar/, "Retro scrollbar must be configured for internal scrolling");
  });

  it("STORY-1.2 (AC-2): Desktop horizontal accordion kinematics and shading are defined", () => {
    const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf-8");
    const stage = fs.readFileSync(path.join(root, "components", "stage", "booklet-stage.tsx"), "utf-8");

    assert.match(css, /\.accordion-panel-desktop/, "Must declare desktop accordion panel classes");
    assert.match(stage, /rotateY/, "Desktop mode must apply rotateY fold kinematics");
    assert.match(stage, /transformOrigin:\s*direction\s*>\s*0\s*\?\s*"left center"/, "Desktop hinge must anchor to left center");
  });

  it("STORY-1.3 (AC-3): Mobile vertical calendar fold kinematics and touch pointer thresholds are defined", () => {
    const css = fs.readFileSync(path.join(root, "app", "globals.css"), "utf-8");
    const stage = fs.readFileSync(path.join(root, "components", "stage", "booklet-stage.tsx"), "utf-8");

    assert.match(css, /\.washi-book-shadow/, "Must define stacked washi paper multi-layer shadow");
    assert.match(stage, /rotateX/, "Mobile mode must apply rotateX vertical fold kinematics");
    assert.match(stage, /transformOrigin:\s*"center top"/, "Mobile hinge must anchor to center top");
    assert.match(stage, /Math\.abs\(distance\)\s*>\s*65/, "Pointer touch swipe must enforce 65px activation threshold");
    assert.match(stage, /Math\.abs\(distance\)\s*>\s*Math\.abs\(cross\)\s*\*\s*1\.3/, "Swipe must enforce 1.3x primary axis dominance");
  });

  it("STORY-1.4 (AC-4): Persistent booklet controls bar and keyboard arrow handlers are implemented", () => {
    const controls = fs.readFileSync(path.join(root, "components", "stage", "reader-controls.tsx"), "utf-8");
    const stage = fs.readFileSync(path.join(root, "components", "stage", "booklet-stage.tsx"), "utf-8");

    assert.match(controls, /isVertical \? "↑ SEBELUMNYA" : "← PREV LEAF"/, "Controls must dynamically swap button labels between desktop and mobile");
    assert.match(controls, /isVertical \? "SELANJUTNYA ↓" : "NEXT LEAF →"/, "Controls must dynamically swap next button labels");
    assert.match(stage, /ArrowRight.*ArrowDown/, "Keyboard event listener must support ArrowRight and ArrowDown for next");
    assert.match(stage, /ArrowLeft.*ArrowUp/, "Keyboard event listener must support ArrowLeft and ArrowUp for prev");
  });
});
