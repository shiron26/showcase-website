/**
 * The hero heading, redrawn into an alpha stencil.
 *
 * The reference this effect comes from ships a pre-rendered WebP of its
 * heading. This build cannot: DESIGN.md forbids hardcoding the hero size, and
 * `--d-hero` is a live `min()/max()` of viewport units with `--hero-ch` set
 * inline from the name itself. So the texture is rasterized from the DOM text
 * at whatever size it currently computes to — the fluid type stays fluid.
 *
 * Two consequences shape everything here:
 *
 *   1. The raster must register on the live <h1> to the pixel. The instant the
 *      effect arms, the painted glyphs replace the DOM ones; a millimetre of
 *      drift reads as a jump. Every measurement is taken from the live boxes.
 *   2. The glyphs are drawn white on transparent and tinted in the shader, so
 *      a theme flip is a uniform update rather than a re-raster of a canvas
 *      that can reach 2800x1080.
 *
 * Everything is measured with a Range over each line's text, never with the
 * span's own box. `.hero-name span` is `display: block`, so its border box is
 * the full column width (1400px) and its height is the line box — neither of
 * which is where the glyphs are. A Range returns the inline content area:
 * the true ink width, and a client rect per line fragment, which is also the
 * only honest way to detect that `text-wrap: balance` split a long name.
 *
 * Anything unexpected returns null, which the caller reads as "do not engage".
 * A plain <h1> is always an acceptable outcome; a wrong one never is.
 */

/** Never rasterize above this: the texture is width x height x dpr^2 bytes. */
export const MAX_DPR = 2;

export type HeroBox = {
  /** Canvas geometry in CSS px, relative to the `.hero` border box. */
  top: number;
  height: number;
  width: number;
  /** Viewport-space origin that glyph coordinates are measured against. */
  originLeft: number;
  originTop: number;
  dpr: number;
};

export type HeroRaster = {
  source: HTMLCanvasElement;
  box: HeroBox;
};

export type HeroColors = {
  fg: [number, number, number];
  bg: [number, number, number];
};

/**
 * Computed colours arrive as `rgb(12, 12, 13)` normally, but a `color-mix()`
 * anywhere in the chain makes an engine report `color(srgb 0.04 0.04 0.05)`
 * instead, whose components are already 0..1. Handle both.
 *
 * These values are NOT linearized, deliberately. The browser composites the
 * canvas in non-linear sRGB and the draw shader blends against uBg in the same
 * space. Converting to linear here would give wrong fringes and mushy edges.
 */
function parseColor(value: string): [number, number, number] {
  const nums = value.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)?.map(Number) ?? [];
  const [r = 0, g = 0, b = 0] = nums;
  return value.trim().startsWith("color(") ? [r, g, b] : [r / 255, g / 255, b / 255];
}

/** Read the used values, never the custom properties — `var()` chains are not
 *  reported consistently, `color` and `background-color` always are. */
export function readColors(h1: HTMLElement): HeroColors {
  return {
    fg: parseColor(getComputedStyle(h1).color),
    bg: parseColor(getComputedStyle(document.body).backgroundColor),
  };
}

/**
 * True once the real face is available. `fonts.ready` settles the loads;
 * `check` is the assertion that this specific face — not the swap fallback —
 * is what `fillText` will use. Rastering in `ui-sans-serif` and laying it over
 * a Bricolage <h1> is the ugliest failure available, so it is worth the guard.
 */
export async function heroFontReady(h1: HTMLElement): Promise<boolean> {
  const cs = getComputedStyle(h1);
  try {
    await document.fonts.ready;
    const family = cs.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
    return document.fonts.check(`${cs.fontWeight} ${cs.fontSize} "${family}"`);
  } catch {
    return false;
  }
}

type Line = { text: string; rect: DOMRect };

/**
 * One entry per line of the heading, measured as ink. Returns null if any line
 * wrapped into more than one fragment — a single fillText per line would then
 * be wrong, so the effect declines rather than painting something misplaced.
 * The name still renders at full quality; it simply gets no distortion.
 */
function heroLines(h1: HTMLElement): Line[] | null {
  const spans = Array.from(h1.children).filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );
  if (spans.length === 0) return null;

  const lines: Line[] = [];
  for (const span of spans) {
    const text = lineText(span);
    if (!text) continue;

    // The line's text may sit inside a wrapper (the entrance rises an inner
    // span into the outer one's clip). A Range over the outer span would then
    // report the wrapper's border box AND the text's rect — two rects, and
    // the "wrapped onto two lines" guard below would decline the effect. So
    // select the contents of the innermost single-child element: the text.
    let ink: HTMLElement = span;
    while (ink.childElementCount === 1 && ink.firstElementChild instanceof HTMLElement) {
      ink = ink.firstElementChild;
    }
    const range = document.createRange();
    range.selectNodeContents(ink);
    const rects = range.getClientRects();
    if (rects.length !== 1) return null;

    lines.push({ text, rect: rects[0] });
  }
  return lines.length > 0 ? lines : null;
}

/** Build the 2D context configured exactly like the heading's own type. */
function typeContext(
  canvas: HTMLCanvasElement,
  cs: CSSStyleDeclaration,
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;

  // getComputedStyle already resolved min()/max()/vw to px and -0.055em to px.
  // Never hand `em` to a canvas: it would resolve against the canvas font and
  // be wrong in a second, harder-to-see way.
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  // `wdth` is pinned to 100 in CSS and `normal` is 100% — the axes agree today.
  // If .d-hero ever moves off "wdth" 100, set fontStretch to match.
  ctx.fontStretch = "normal";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#fff";

  // Order matters: assigning `font` resets letterSpacing in Chromium.
  const spacing = cs.letterSpacing;
  if (spacing && spacing !== "normal" && parseFloat(spacing) !== 0) {
    if (!("letterSpacing" in ctx)) return null;
    ctx.letterSpacing = spacing;
    // The property silently normalises input it does not support, so assert it
    // actually took. -0.055em is ~15px per gap at hero scale: load-bearing.
    if (parseFloat(ctx.letterSpacing) === 0) return null;
  }
  return ctx;
}

/**
 * Paint the heading into an offscreen canvas the exact size of the WebGL
 * canvas, so `vUv` maps onto the texture 1:1 and there is no second coordinate
 * system to get wrong. The bleed margin stays transparent, which also means
 * CLAMP_TO_EDGE sampling outside the glyphs returns 0 rather than smearing the
 * edge row.
 */
export function rasterizeHero(
  h1: HTMLElement,
  hero: HTMLElement,
  bleed: number,
  reuse?: HTMLCanvasElement,
): HeroRaster | null {
  const lines = heroLines(h1);
  if (!lines) return null;

  const heroRect = hero.getBoundingClientRect();
  if (heroRect.width < 1) return null;

  // The canvas is sized to the INK, not to the <h1> box. With line-height 0.8
  // the glyphs overflow their line boxes by tens of pixels, so anchoring to the
  // heading's border box would eat the bleed on one side and clip the smear.
  const inkTop = Math.min(...lines.map((l) => l.rect.top));
  const inkBottom = Math.max(...lines.map((l) => l.rect.bottom));

  const box: HeroBox = {
    // `left: 0; right: 0` inside `.hero`, which is a full-width `.band`.
    // Never 100vw: that includes the scrollbar and would reopen horizontal
    // overflow against `body { overflow-x: hidden }`.
    width: heroRect.width,
    top: inkTop - heroRect.top - bleed,
    height: inkBottom - inkTop + bleed * 2,
    originLeft: heroRect.left,
    originTop: inkTop - bleed,
    dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
  };

  const source = reuse ?? document.createElement("canvas");
  source.width = Math.max(1, Math.round(box.width * box.dpr));
  source.height = Math.max(1, Math.round(box.height * box.dpr));

  const cs = getComputedStyle(h1);
  const ctx = typeContext(source, cs);
  if (!ctx) return null;

  ctx.setTransform(box.dpr, 0, 0, box.dpr, 0, 0);
  ctx.clearRect(0, 0, box.width, box.height);

  for (const { text, rect } of lines) {
    const m = ctx.measureText(text);
    const asc = m.fontBoundingBoxAscent;
    const desc = m.fontBoundingBoxDescent;
    if (!(asc >= 0) || !(desc >= 0)) return null;

    // The Range rect IS the font's content area, so its height should equal the
    // canvas's own font bounding box. Measured identical (326 = 253 + 73) in
    // Chromium; a tolerance covers engines that source the metric differently,
    // and beyond it we decline rather than guess at the baseline.
    const contentH = asc + desc;
    if (Math.abs(rect.height - contentH) > Math.max(1, contentH * 0.02)) return null;

    const x = rect.left - box.originLeft;
    const baseline = rect.top - box.originTop + asc;

    // Insurance: force the painted line onto the DOM line's ink width. Absorbs
    // any residual divergence in the variable-font instance as an invisible
    // sub-percent squeeze. Beyond 3% something is genuinely wrong — wrong face,
    // wrong axis — and painting it would be worse than not painting at all.
    const ratio = m.width > 0 ? rect.width / m.width : 1;
    if (!isFinite(ratio) || ratio < 0.97 || ratio > 1.03) return null;

    if (Math.abs(ratio - 1) > 0.005) {
      ctx.save();
      ctx.translate(x, 0);
      ctx.scale(ratio, 1);
      ctx.fillText(text, 0, baseline);
      ctx.restore();
    } else {
      ctx.fillText(text, x, baseline);
    }
  }

  return { source, box };
}

/** `.hero-name` is `text-transform: uppercase`; canvas has no such notion, so
 *  the transform is applied to the string before it is drawn. */
function lineText(span: HTMLElement): string {
  const raw = (span.textContent ?? "").trim();
  const transform = getComputedStyle(span).textTransform;
  const lang = document.documentElement.lang || undefined;
  if (transform === "uppercase") return raw.toLocaleUpperCase(lang);
  if (transform === "lowercase") return raw.toLocaleLowerCase(lang);
  return raw;
}
