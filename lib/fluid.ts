/**
 * A pointer-velocity fluid, in raw WebGL2.
 *
 * This is the Stable-Fluids idea reduced to what the effect actually needs:
 * the cursor writes its frame-to-frame delta as a force into a velocity field,
 * the field advects itself and dissipates, and the heading's stencil is sampled
 * with its UVs offset by that field. Because the force is a *delta*, a still
 * cursor does nothing; because the field dissipates, the smear curls behind the
 * stroke and returns to rest on its own.
 *
 * Deliberately omitted: the divergence + Jacobi pressure solve. It would add
 * 20-40 full-screen passes per frame, replacing 2, to buy incompressible curl
 * on a field that is 98% gone in 0.8s and never lives long enough to show it.
 * If the trail ever reads too straight, add vorticity confinement (2 passes),
 * not pressure (~25).
 *
 * Two conventions are load-bearing and everything breaks subtly if they drift:
 *
 *   - `vUv` is y-up everywhere. An FBO texture's t=1 is NDC y=+1, so any other
 *     convention mirrors the field on every round-trip.
 *   - Velocity is stored in uv-X units per second for BOTH components, i.e.
 *     both axes normalised by the canvas WIDTH. This keeps the field isotropic
 *     on a wide, short canvas. Converting back to uv costs one multiply by
 *     `uAspect`; forgetting it stretches the smear horizontally.
 */

import type { HeroBox, HeroColors } from "./heroType";

/**
 * How far a stroke drags the glyphs, in seconds of velocity per uv.
 *
 * The response is very nearly linear in cursor speed, which is worth writing
 * down because it is the whole tuning model:
 *
 *     displacement in px  ~=  cursor speed in px/s  x  DISPLACE
 *
 * (Measured, not assumed: a 4500 px/s sweep displaced ~45px at DISPLACE 0.01.)
 *
 Tuned by eye against the reference, which is the only way this can be settled:
 * 0.045 was legible but coarse — a natural stroke moved the glyphs a fifth of
 * their height and a quick flick tore the word open. Half that reads as ink
 * being dragged rather than type being deformed.
 */
export const DISPLACE = 0.022;
/** Chromatic split as a fraction of the displacement. The reference's 0.2, verbatim. */
export const SPLIT = 0.2;
/** Dissipation, 1/s. exp(-6.5 * 0.7) = 0.011 — 99% gone in 0.7s. Tightened from
 *  the reference's pacing so the trail resolves rather than lingering soft. */
export const DECAY = 6.5;
/** Cursor radius, uv-x units — the reference's `scale`, narrowed. At 0.16 the
 *  whole word wobbled; at 0.11 the disturbance stays a pinch that follows the
 *  cursor, which is what separates a precise smear from a general tremble. */
export const RADIUS = 0.11;
/**
 * Force clamp, uv-x/s. With a linear response this is what stops a fast flick
 * from tearing the word apart, so it moved down as DISPLACE moved up: the
 * largest displacement any stroke can produce is VMAX * DISPLACE * width.
 * It also sizes the canvas bleed, so raising it widens the canvas.
 */
export const VMAX = 1;

/** Bleed around the ink, in CSS px, so the smear is never clipped early. */
export function bleedFor(widthCss: number): number {
  return Math.ceil(VMAX * DISPLACE * widthCss) + 8;
}

/**
 * The displacement is sub-pixel below this energy, so the loop may stop. Derived
 * from a visibility criterion rather than picked, which is the difference
 * between "it stops" and "it stops when you can no longer see it".
 */
export function stopEnergy(widthCss: number): number {
  return 0.35 / Math.max(1, DISPLACE * widthCss);
}

const VERT = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vUv;
void main() {
  vec2 p = P[gl_VertexID];
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const SPLAT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outVel;
uniform sampler2D uVelocity;
uniform vec2  uPoint;
uniform vec2  uForce;
uniform float uRadius;
uniform float uAspect;
void main() {
  // uv-y differences are (1/uAspect) as many uv-x units, so the falloff stays
  // a circle on screen rather than an ellipse.
  vec2  d      = vUv - uPoint;
  vec2  circle = vec2(d.x, d.y / uAspect) / uRadius;
  float f = 1.0 - min(length(circle), 1.0);
  f *= f * 1.5;
  outVel = vec4(texture(uVelocity, vUv).xy + uForce * f, 0.0, 1.0);
}`;

const ADVECT = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outVel;
uniform sampler2D uVelocity;
uniform float uDt;
uniform float uDecay;
uniform float uAspect;
void main() {
  vec2 v    = texture(uVelocity, vUv).xy;
  vec2 back = vUv - uDt * vec2(v.x, v.y * uAspect);
  // exp(-decay*dt), not a per-frame constant: a 30fps frame and two 60fps
  // frames must dissipate identically or the decay depends on the machine.
  outVel = vec4(texture(uVelocity, back).xy * exp(-uDecay * uDt), 0.0, 1.0);
}`;

/**
 * The whole visual effect.
 *
 * The reference does the bulk push in a vertex shader and the chromatic split
 * in the fragment shader, because its planes are subdivided meshes. On a single
 * textured quad the two are the same operation on the sampled UV, so they are
 * folded here — which also means the glyphs deform rather than slide as a body.
 *
 * The last line is the part that is not obvious. Three different per-channel
 * alphas CANNOT be composited by ordinary alpha blending: one alpha applies to
 * all three channels, and a canvas cannot read the page behind it. So the blend
 * is done here, against the page's known ground. We want
 *     P = bg*(1-a) + fg*a          per channel
 * and the browser will compute
 *     P = S + bg*(1-A)             premultiplied source S, source alpha A
 * so with A = max(aR,aG,aB) the source must be
 *     S = bg*(A-a) + fg*a
 * which is a valid premultiplied colour, is (0,0,0,0) outside the glyph so no
 * rectangle is painted, and reduces to plain fg*a wherever the three alphas
 * agree. The cost is that the hero must stay on a flat --bg ground.
 *
 * All of this is in non-linear sRGB on purpose. The browser composites the
 * canvas that way; linearising here would give wrong fringes and mushy edges.
 */
const DRAW = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uType;
uniform sampler2D uVelocity;
uniform vec3  uFg;
uniform vec3  uBg;
uniform float uDisplace;
uniform float uSplit;
uniform float uAspect;
void main() {
  vec2 v   = texture(uVelocity, vUv).xy;
  vec2 off = vec2(v.x, v.y * uAspect) * uDisplace;
  vec2 uv  = vUv - off;
  vec2 s   = off * uSplit;

  // The split is on ALPHA, not colour — correct for a solid glyph on
  // transparency, and the entire source of the R/G/B fringing.
  float aR = texture(uType, uv - s).a;
  float aG = texture(uType, uv + s * 0.33).a;
  float aB = texture(uType, uv + s).a;

  vec3  a = vec3(aR, aG, aB);
  float A = max(aR, max(aG, aB));
  outColor = vec4(uBg * (A - a) + uFg * a, A);
}`;

export type Fluid = {
  resize(box: HeroBox): void;
  setType(source: TexImageSource): void;
  setColors(colors: HeroColors): void;
  splat(uv: [number, number], force: [number, number]): void;
  step(dt: number): void;
  draw(): void;
  clearField(): void;
  clearScreen(): void;
  destroy(): void;
};

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGL2RenderingContext, fragSrc: string, vert: WebGLShader) {
  const frag = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
  if (!frag) return null;
  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  gl.deleteShader(frag);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

export function createFluid(canvas: HTMLCanvasElement): Fluid | null {
  const ctx = canvas.getContext("webgl2", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: "low-power",
  });
  if (!ctx) return null;
  // Bound as a non-nullable const so the hoisted helpers below keep the
  // narrowing; TypeScript drops it inside function declarations otherwise.
  const gl: WebGL2RenderingContext = ctx;

  // Half-float render targets are required. The RGBA8 alternative would encode
  // velocity around 0.5, quantising it to ~0.023 uv/s — the same order as the
  // stop threshold, so the decay would stair-step and the field would freeze on
  // a non-zero residue instead of reaching rest, which is precisely the
  // behaviour being reproduced. Declining is the honest outcome; the heading is
  // complete without the effect. (Devices with WebGL2 but no float targets are
  // old Android, already excluded by the coarse-pointer gate.)
  if (
    !gl.getExtension("EXT_color_buffer_float") &&
    !gl.getExtension("EXT_color_buffer_half_float")
  ) {
    return null;
  }

  const vert = compile(gl, gl.VERTEX_SHADER, VERT);
  if (!vert) return null;
  const pSplat = link(gl, SPLAT, vert);
  const pAdvect = link(gl, ADVECT, vert);
  const pDraw = link(gl, DRAW, vert);
  gl.deleteShader(vert);
  if (!pSplat || !pAdvect || !pDraw) return null;

  const u = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);
  const loc = {
    splat: {
      vel: u(pSplat, "uVelocity"),
      point: u(pSplat, "uPoint"),
      force: u(pSplat, "uForce"),
      radius: u(pSplat, "uRadius"),
      aspect: u(pSplat, "uAspect"),
    },
    advect: {
      vel: u(pAdvect, "uVelocity"),
      dt: u(pAdvect, "uDt"),
      decay: u(pAdvect, "uDecay"),
      aspect: u(pAdvect, "uAspect"),
    },
    draw: {
      type: u(pDraw, "uType"),
      vel: u(pDraw, "uVelocity"),
      fg: u(pDraw, "uFg"),
      bg: u(pDraw, "uBg"),
      displace: u(pDraw, "uDisplace"),
      split: u(pDraw, "uSplit"),
      aspect: u(pDraw, "uAspect"),
    },
  };

  type Target = { tex: WebGLTexture; fbo: WebGLFramebuffer };
  let field: [Target, Target] | null = null;
  let simW = 0;
  let simH = 0;
  let aspect = 1;

  const typeTex = gl.createTexture();
  if (!typeTex) return null;
  // Always pick the unit explicitly before binding: after a draw the active
  // unit is TEXTURE1, and binding blind would clobber the field's binding.
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, typeTex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  // The 2D canvas is y-down; the field is y-up. Flip once, on upload.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);

  // ALPHA is one byte per texel instead of four, which matters at 2800x900 on
  // a 2x display. It is a legacy unsized format, so fall back if it is refused.
  let typeFormat: number = gl.ALPHA;

  function makeTarget(w: number, h: number): Target | null {
    const tex = gl.createTexture();
    const fbo = gl.createFramebuffer();
    if (!tex || !fbo) return null;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      gl.deleteTexture(tex);
      gl.deleteFramebuffer(fbo);
      return null;
    }
    return { tex, fbo };
  }

  function tri() {
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function bindField(unit: number) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, field![0].tex);
  }

  function swap() {
    field = [field![1], field![0]];
  }

  return {
    resize(box) {
      const w = Math.max(1, Math.round(box.width * box.dpr));
      const h = Math.max(1, Math.round(box.height * box.dpr));
      canvas.width = w;
      canvas.height = h;
      aspect = w / h;

      // The field is low-frequency; a quarter-scale grid capped at 256 is
      // plenty, matched to the aspect so the splat stays circular.
      const nextW = Math.min(256, Math.max(64, Math.round(w / 8)));
      const nextH = Math.max(32, Math.round(nextW / aspect));
      if (field && nextW === simW && nextH === simH) return;

      if (field) {
        for (const t of field) {
          gl.deleteTexture(t.tex);
          gl.deleteFramebuffer(t.fbo);
        }
        field = null;
      }
      const a = makeTarget(nextW, nextH);
      const b = makeTarget(nextW, nextH);
      if (!a || !b) return;
      field = [a, b];
      simW = nextW;
      simH = nextH;
      this.clearField();
    },

    setType(source) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, typeTex);
      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, typeFormat, typeFormat, gl.UNSIGNED_BYTE, source);
        if (gl.getError() !== gl.NO_ERROR) throw new Error("format");
      } catch {
        typeFormat = gl.RGBA;
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      }
    },

    setColors(colors) {
      gl.useProgram(pDraw);
      gl.uniform3f(loc.draw.fg, colors.fg[0], colors.fg[1], colors.fg[2]);
      gl.uniform3f(loc.draw.bg, colors.bg[0], colors.bg[1], colors.bg[2]);
    },

    splat(uv, force) {
      if (!field) return;
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, field[1].fbo);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(pSplat);
      bindField(0);
      gl.uniform1i(loc.splat.vel, 0);
      gl.uniform2f(loc.splat.point, uv[0], uv[1]);
      gl.uniform2f(loc.splat.force, force[0], force[1]);
      gl.uniform1f(loc.splat.radius, RADIUS);
      gl.uniform1f(loc.splat.aspect, aspect);
      tri();
      swap();
    },

    step(dt) {
      if (!field) return;
      gl.disable(gl.BLEND);
      gl.bindFramebuffer(gl.FRAMEBUFFER, field[1].fbo);
      gl.viewport(0, 0, simW, simH);
      gl.useProgram(pAdvect);
      bindField(0);
      gl.uniform1i(loc.advect.vel, 0);
      gl.uniform1f(loc.advect.dt, dt);
      gl.uniform1f(loc.advect.decay, DECAY);
      gl.uniform1f(loc.advect.aspect, aspect);
      tri();
      swap();
    },

    draw() {
      if (!field) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      // Premultiplied source, which is what the draw shader emits.
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(pDraw);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, typeTex);
      gl.uniform1i(loc.draw.type, 0);
      bindField(1);
      gl.uniform1i(loc.draw.vel, 1);
      gl.uniform1f(loc.draw.displace, DISPLACE);
      gl.uniform1f(loc.draw.split, SPLIT);
      gl.uniform1f(loc.draw.aspect, aspect);
      tri();
      gl.disable(gl.BLEND);
    },

    clearField() {
      if (!field) return;
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simW, simH);
      for (const t of field) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    },

    clearScreen() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
    },

    destroy() {
      if (field) {
        for (const t of field) {
          gl.deleteTexture(t.tex);
          gl.deleteFramebuffer(t.fbo);
        }
        field = null;
      }
      gl.deleteTexture(typeTex);
      gl.deleteProgram(pSplat);
      gl.deleteProgram(pAdvect);
      gl.deleteProgram(pDraw);
      // Release the GPU context now rather than waiting on GC — StrictMode
      // mounts this twice in development.
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
