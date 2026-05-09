import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { prepareWithSegments, layoutNextLine, type LayoutCursor } from "@chenglou/pretext";

// ─── PORTFOLIO-MEANINGFUL TEXT ───────────────────────────────────────────────
// This section is themed as "Collaboration" — describing how Dev works with
// teams, clients, and communities. The gaming characters reinforce the visual.
const WRAP_TEXT = `Great software is never built alone. Every pixel on this site is the result of deep collaboration — with clients who trust the vision, with teammates who sharpen the thinking, and with a global developer community that pushes the craft forward every single day. Dev Jasani brings more than code to every engagement. He brings a product mindset, an architect's discipline, and a designer's eye. When you work with Dev, you get a partner who listens before he ships, who asks the right questions before writing a single line, and who treats your users' experience as a first-class constraint — not an afterthought. From early-stage startups navigating product-market fit to established teams looking to scale their infrastructure, the approach is always the same: understand the problem deeply, design the simplest solution that could possibly work, and then build it to a standard that will not embarrass either of us in three years. Communication is asynchronous-first, documentation is a deliverable, and every project ends with a codebase the next engineer can actually read. This is not a freelancer who disappears after the invoice. This is an engineering partner who stays accountable to outcomes — not just outputs. The tech stack is irrelevant if the product does not ship. The architecture is irrelevant if the team cannot maintain it. The performance score is irrelevant if real users are not retained. What matters is business impact, measured in users who return, in latency that delights, and in systems that stay up when it counts. Ready to build something that actually matters? Let us talk. `.repeat(4);

const LINE_H = 21;
const FONT = `13px 'Inter', 'Segoe UI', sans-serif`;
const MIN_SEG_W = 55; // Minimum segment width before we bother drawing text
const ALPHA_THRESHOLD = 55;
const PAD = 9; // Pixel padding around the character's solid edges

export function DragonFlex() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const mainCanvas = mainCanvasRef.current;
    const container = containerRef.current;
    if (!mainCanvas || !container) return;
    const ctx = mainCanvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    // Hidden Lottie canvas — must be in DOM for IntersectionObserver to play
    const offscreen = document.createElement("canvas");
    offscreen.style.cssText =
      "position:absolute;opacity:0.0001;pointer-events:none;z-index:-1;top:0;left:0;";
    container.appendChild(offscreen);

    const dpr = window.devicePixelRatio || 1;
    let canvasW = 0;
    let canvasH = 0;
    let animId: number;

    // Character size — fill most of the section height
    const CHAR_W = 560;
    const CHAR_H = 560;

    const prepared = prepareWithSegments(WRAP_TEXT, FONT);

    const dotLottie = new DotLottie({
      canvas: offscreen,
      src: "/gaming-community.lottie",
      loop: true,
      autoplay: true,
    });

    // ── SETUP ──────────────────────────────────────────────────────────────────
    const setup = () => {
      canvasW = container.clientWidth;
      canvasH = container.clientHeight;
      mainCanvas.width = canvasW * dpr;
      mainCanvas.height = canvasH * dpr;
      mainCanvas.style.width = canvasW + "px";
      mainCanvas.style.height = canvasH + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      offscreen.width = CHAR_W * dpr;
      offscreen.height = CHAR_H * dpr;
    };

    // ── MULTI-SEGMENT SCANNER ──────────────────────────────────────────────────
    // For each row, find ALL transparent "slots" (gaps between characters)
    // and return them as segments where text can be drawn.
    // This means text flows INTO the gaps between gaming characters, not just sides.
    const getTextSlots = (
      pixelData: Uint8ClampedArray,
      charX: number,
      charY: number,
      canvasRow: number
    ): Array<{ x: number; w: number }> => {
      const relY = canvasRow - charY;
      if (relY < 0 || relY >= CHAR_H) {
        // Outside the character zone — full width available
        return [{ x: 0, w: canvasW }];
      }

      const offY = Math.floor(relY * dpr);
      const rowStart = offY * offscreen.width * 4;
      const offW = offscreen.width;

      // Build a pixel-level blocked map for this row on the main canvas scale
      const blocked = new Uint8Array(canvasW + 20);

      for (let px = 0; px < offW; px++) {
        const alpha = pixelData[rowStart + px * 4 + 3];
        if (alpha > ALPHA_THRESHOLD) {
          const cx = Math.floor(charX + px / dpr);
          // Dilate by PAD pixels on each side
          const lo = Math.max(0, cx - PAD);
          const hi = Math.min(canvasW - 1, cx + PAD);
          for (let b = lo; b <= hi; b++) blocked[b] = 1;
        }
      }

      // Walk the blocked map and collect contiguous free slots
      const slots: Array<{ x: number; w: number }> = [];
      let slotStart = -1;
      for (let x = 0; x <= canvasW; x++) {
        const isBlocked = x === canvasW || blocked[x] === 1;
        if (!isBlocked) {
          if (slotStart === -1) slotStart = x;
        } else {
          if (slotStart !== -1) {
            const w = x - slotStart;
            if (w >= MIN_SEG_W) slots.push({ x: slotStart, w });
            slotStart = -1;
          }
        }
      }

      // If no slots found (row fully blocked), return empty
      return slots;
    };

    // ── RENDER LOOP ────────────────────────────────────────────────────────────
    const render = () => {
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Dark themed background
      const bg = ctx.createLinearGradient(0, 0, 0, canvasH);
      bg.addColorStop(0, "#080b18");
      bg.addColorStop(1, "#0c0f22");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Subtle glow at character position
      const charX = (canvasW - CHAR_W) / 2;
      const charY = (canvasH - CHAR_H) / 2;

      const glow = ctx.createRadialGradient(
        canvasW / 2, charY + CHAR_H * 0.55, 40,
        canvasW / 2, charY + CHAR_H * 0.55, 300
      );
      glow.addColorStop(0, "rgba(90, 60, 255, 0.14)");
      glow.addColorStop(0.6, "rgba(20, 120, 255, 0.06)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Read this frame's pixel data from the Lottie canvas
      let pixelData: Uint8ClampedArray | null = null;
      try {
        const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
        if (offCtx) {
          pixelData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height).data;
        }
      } catch (_) { /* not ready yet */ }

      // ── PRETEXT LAYOUT ──────────────────────────────────────────────────────
      ctx.font = FONT;
      ctx.textBaseline = "top";

      let y = 12;
      let lineIndex = 0;
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

      // Subtle alternating colors — cool-toned to match portfolio theme
      const colorPalette = [
        "rgba(190, 200, 230, 0.72)",
        "rgba(160, 190, 255, 0.68)",
        "rgba(190, 200, 230, 0.72)",
        "rgba(140, 215, 255, 0.64)",
      ];

      while (y < canvasH - LINE_H) {
        const midRow = y + LINE_H / 2;

        const slots = pixelData
          ? getTextSlots(pixelData, charX, charY, midRow)
          : [{ x: 0, w: canvasW }];

        ctx.fillStyle = colorPalette[lineIndex % colorPalette.length];

        for (const slot of slots) {
          if (cursor.segmentIndex >= prepared.segments.length - 1) {
            cursor = { segmentIndex: 0, graphemeIndex: 0 };
          }
          const line = layoutNextLine(prepared, cursor, slot.w);
          if (line) {
            ctx.fillText(line.text, slot.x, y);
            cursor = line.end;
          }
        }

        y += LINE_H;
        lineIndex++;

        // Safety reset
        if (cursor.segmentIndex >= prepared.segments.length - 1) {
          cursor = { segmentIndex: 0, graphemeIndex: 0 };
        }
      }

      // Draw Lottie on top of the text
      if (offscreen.width > 0) {
        ctx.drawImage(offscreen, charX, charY, CHAR_W, CHAR_H);
      }

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      cancelAnimationFrame(animId);
      setup();
      animId = requestAnimationFrame(render);
    };

    setup();
    animId = requestAnimationFrame(render);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      dotLottie.destroy();
      if (offscreen.parentNode === container) container.removeChild(offscreen);
    };
  }, []);

  return (
    <section className="relative w-full bg-[#080b18] overflow-hidden">
      {/* Section heading — meaningful, on-theme */}
      <div className="relative z-10 pt-20 pb-4 px-6 md:px-12">
        <p className="font-mono text-[11px] tracking-[0.3em] text-blue-400/50 uppercase mb-3">
          Philosophy &amp; Collaboration
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-white">
          Great software is{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            never built alone.
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-white/40 leading-relaxed">
          A peek into the development philosophy — measured in outcomes, not outputs.
          The text below dynamically wraps around the characters using a zero-DOM,
          pixel-perfect layout engine built on{" "}
          <code className="text-blue-400/70 font-mono text-xs">@chenglou/pretext</code>.
        </p>
      </div>

      {/* Canvas — the shape-wrap engine */}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "75vh" }}
      >
        <canvas ref={mainCanvasRef} className="absolute inset-0 z-10" />
      </div>

      {/* Footer metadata bar */}
      <div className="relative z-10 py-3 px-6 md:px-12 border-t border-white/[0.04] flex flex-wrap gap-4 items-center justify-between">
        <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
          Pretext shape-wrap · Multi-segment alpha scan · 60fps
        </span>
        <span className="font-mono text-[10px] text-purple-400/30 tracking-widest uppercase">
          DOM reads: 0 · Layout thrash: 0ms
        </span>
      </div>
    </section>
  );
}
