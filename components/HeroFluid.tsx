"use client";

/**
 * The hero heading, dragged like ink by the cursor.
 *
 * THE EXIT CONTRACT — read this before changing anything below.
 *
 * This codebase has no other requestAnimationFrame loop, and two comments argue
 * against having one (Preloader.tsx, and the entrance block in globals.css).
 * The principle behind them is not "never rAF"; it is that rAF is throttled in
 * background tabs and low-power modes, so *a visual state whose only way back
 * to rest is a JavaScript frame can persist indefinitely*. Everything here is
 * arranged so that never applies:
 *
 *   - The resting state is the CSS default. The <h1> is visible and the canvas
 *     is `display: none` with no JavaScript involved at all. There is nothing to
 *     undo at rest, so a loop that never starts, or dies mid-flight, is
 *     indistinguishable from the page as it ships.
 *   - The transient state is one attribute, `data-fluid="on"`, and there are
 *     FOUR independent ways out of it, only one of which is a frame:
 *       1. the energy threshold, in the loop (the normal path);
 *       2. any of the DOM signals — visibility, intersection, theme, resize,
 *          context loss, reduced-motion change — all event-driven;
 *       3. a setTimeout watchdog re-armed every frame, so if frames stop
 *          arriving for any reason the heading is back within 500ms;
 *       4. React unmount cleanup.
 *   - Nothing is ever gated behind the effect: no scroll lock, no focus trap,
 *     no content that only exists on the canvas.
 *
 * The effect also never engages at all under reduced motion, on coarse
 * pointers, without WebGL2 or float render targets, before the font has loaded,
 * while the entrance panel is up, or if the raster cannot be registered on the
 * live text. In every one of those cases the page is exactly what ships today.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { createFluid, bleedFor, stopEnergy, DECAY, VMAX, type Fluid } from "@/lib/fluid";
import { rasterizeHero, heroFontReady, readColors, type HeroBox } from "@/lib/heroType";

/** Arm when the cursor comes within this many px of the hero, not on mount. */
const ARM_MARGIN = 400;
/**
 * Hard deadline on the idle callback that arms the effect. `requestIdleCallback`
 * with no timeout waits for the main thread to go idle, and the main thread is
 * at its busiest exactly when the first pointer move arrives — hydration, font
 * loading, the entrance counter's interval. Without this bound the effect can
 * sit unarmed for seconds and read as broken; with it, idle is still preferred
 * and the worst case is bounded.
 */
const ARM_TIMEOUT_MS = 200;
/** If frames stop arriving, restore the heading within this long. */
const WATCHDOG_MS = 500;
/** `body` transitions its colours over 120ms; read the theme after it settles. */
const THEME_SETTLE_MS = 200;
const RESIZE_DEBOUNCE_MS = 120;
/** Transient arming failures to tolerate before giving up on the visit. */
const MAX_ARM_FAILURES = 3;

export default function HeroFluid({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const h1 = host.firstElementChild;
    const hero = host.closest<HTMLElement>(".hero");
    if (!(h1 instanceof HTMLElement) || !hero) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    let mounted = true;
    let fluid: Fluid | null = null;
    let raster: HTMLCanvasElement | undefined;
    let arming = false;
    let armed = false;
    let dead = false;
    // A failure to arm used to be permanent: one transient miss — a font not
    // settled, a raster taken mid-layout — and the effect was gone for the
    // life of the page, silently. Bounded retries instead, so a bad moment
    // costs a stroke rather than the whole visit.
    let failures = 0;

    let running = false;
    let frameId = 0;
    let watchdog = 0;
    let last = 0;
    let energy = 0;
    let stopAt = 0;

    /**
     * The canvas's viewport rect, DERIVED rather than measured.
     *
     * It used to be `canvas.getBoundingClientRect()`, taken inside build() —
     * which runs during arming, while the canvas is still `display: none`. A
     * display:none element reports an all-zero rect, so the pointer mapping
     * divided by zero, every splat landed at (Infinity, -Infinity), and the
     * falloff `1 - min(length, 1)` evaluated to exactly 0. The velocity field
     * stayed empty forever and the canvas redrew the heading perfectly
     * undistorted: the effect looked dead while every gate said it was running.
     * It only came alive if a scroll happened to re-measure while the canvas
     * was displayed — which is why it seemed to start working "later".
     *
     * The geometry is fully known from the hero's live rect plus the box the
     * raster was built with, so nothing here depends on the canvas being
     * painted, or on a forced layout at wake time.
     */
    let rect: { left: number; top: number; width: number; height: number } | null = null;
    let box: HeroBox | null = null;
    let builtOffset = 0;
    let px = 0;
    let py = 0;
    let hasPrev = false;
    let dx = 0;
    let dy = 0;

    let visible = true;
    let onScreen = true;
    let idleId = 0;
    let resizeTimer = 0;
    let themeTimer = 0;

    /* ── resting ─────────────────────────────────────────────────────────── */

    const rest = () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      if (watchdog) clearTimeout(watchdog);
      watchdog = 0;
      energy = 0;
      hasPrev = false;
      dx = dy = 0;
      fluid?.clearField();
      fluid?.clearScreen();
      delete host.dataset.fluid;
    };

    const armWatchdog = () => {
      if (watchdog) clearTimeout(watchdog);
      watchdog = window.setTimeout(rest, WATCHDOG_MS);
    };

    /* ── the loop ────────────────────────────────────────────────────────── */

    const frame = (now: number) => {
      frameId = 0;
      if (!running || !fluid) return;

      // Clamp so a stall (tab restore, GC pause) cannot teleport the advection.
      const dt = Math.min(Math.max((now - last) / 1000, 1 / 240), 1 / 30);
      last = now;

      if ((dx !== 0 || dy !== 0) && rect && rect.width > 1) {
        const w = rect.width;
        let fx = dx / w / dt;
        let fy = -(dy / w) / dt;
        const mag = Math.hypot(fx, fy);
        if (mag > VMAX) {
          fx = (fx / mag) * VMAX;
          fy = (fy / mag) * VMAX;
        }
        fluid.splat(pointerUv(), [fx, fy]);
        energy = Math.max(energy, Math.hypot(fx, fy));
        dx = dy = 0;
      }

      // The field's peak is modelled on the CPU rather than read back from the
      // GPU, which would stall the pipeline every frame. Splats raise it and
      // dissipation lowers it by a known factor; advection only spreads the
      // field, which can only lower its peak. So this is a strict upper bound:
      // it can stop late, never early.
      energy *= Math.exp(-DECAY * dt);

      fluid.step(dt);
      fluid.draw();
      // Hand the heading over only once the canvas has actually painted it.
      // Setting this in wake() meant the <h1> went transparent one frame early,
      // and if that frame never arrived — a throttled tab, a stalled GPU — the
      // name was simply gone until the watchdog fired half a second later.
      host.dataset.fluid = "on";
      armWatchdog();

      if (energy < stopAt) {
        rest();
        return;
      }
      frameId = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (running || !armed || dead || !visible || !onScreen) return;
      if (reduceMq.matches) return;
      // The entrance panel covers the hero for its first 1150ms. Drawing under
      // it is wasted work and an uncontrolled hand-off — but ARMING under it is
      // free and desirable, so the gate lives here rather than in the pointer
      // handler: the effect is ready the instant the panel lifts.
      if (document.documentElement.dataset.enter === "1") return;

      // ResizeObserver only fires on SIZE changes, and the heading can MOVE
      // without resizing — `.hero` pads itself with `calc(var(--header-h) + …)`,
      // so the notice bar rewrapping shifts the whole heading down while its box
      // stays identical. The canvas would then paint the name a few pixels off
      // its real position, for the rest of the visit. One rect per wake settles it.
      if (Math.abs(headingOffset() - builtOffset) > 0.5 && !build()) {
        armed = false;
        giveUp();
        return;
      }

      running = true;
      last = performance.now();
      armWatchdog();
      frameId = requestAnimationFrame(frame);
    };

    const pointerUv = (): [number, number] => {
      if (!rect || rect.width < 1 || rect.height < 1) return [0.5, 0.5];
      return [(px - rect.left) / rect.width, 1 - (py - rect.top) / rect.height];
    };

    /* ── building ────────────────────────────────────────────────────────── */

    const measureRect = () => {
      if (!box) return;
      const hr = hero.getBoundingClientRect();
      rect = { left: hr.left, top: hr.top + box.top, width: box.width, height: box.height };
    };

    /** Where the heading sat, relative to `.hero`, when the raster was taken. */
    const headingOffset = () =>
      h1.getBoundingClientRect().top - hero.getBoundingClientRect().top;

    const build = (): boolean => {
      if (!fluid) return false;
      const bleed = bleedFor(hero.getBoundingClientRect().width);
      const next = rasterizeHero(h1, hero, bleed, raster);
      if (!next) return false;
      builtOffset = headingOffset();
      box = next.box;
      raster = next.source;
      canvas.style.top = `${next.box.top}px`;
      canvas.style.height = `${next.box.height}px`;
      fluid.resize(next.box);
      fluid.setType(next.source);
      fluid.setColors(readColors(h1));
      stopAt = stopEnergy(next.box.width);
      measureRect();
      return true;
    };

    const giveUp = () => {
      failures += 1;
      if (failures >= MAX_ARM_FAILURES) dead = true;
    };

    const arm = async () => {
      if (armed || arming || dead) return;
      arming = true;

      const ok = await heroFontReady(h1);
      if (!mounted || !ok) {
        arming = false;
        if (!ok) giveUp();
        return;
      }

      // The entrance slides each line up inside its clip. The raster registers
      // on the live ink rects, and those move with the transform — so a raster
      // taken mid-entrance would sit a line too low. Wait for the lines to
      // settle; `finished` rejects if an animation is cancelled, and that is
      // just as good a signal that nothing is moving any more.
      const moving = h1
        .getAnimations({ subtree: true })
        .filter((a) => a.playState !== "finished" && a.playState !== "idle");
      if (moving.length) {
        await Promise.allSettled(moving.map((a) => a.finished));
        if (!mounted) {
          arming = false;
          return;
        }
      }

      fluid = createFluid(canvas);
      if (!fluid) {
        // No WebGL2, or no float render targets. This one really is permanent.
        arming = false;
        dead = true;
        return;
      }
      if (!build()) {
        fluid.destroy();
        fluid = null;
        arming = false;
        giveUp();
        return;
      }

      canvas.addEventListener("webglcontextlost", onContextLost);
      canvas.addEventListener("webglcontextrestored", onContextRestored);
      armed = true;
      arming = false;
    };

    const onContextLost = (e: Event) => {
      // Without preventDefault the context can never be restored.
      e.preventDefault();
      rest();
      armed = false;
    };

    const onContextRestored = () => {
      if (!mounted || !fluid) return;
      armed = build();
      if (!armed) giveUp();
    };

    // An arrow const, not a function declaration: TypeScript drops the
    // non-null narrowing of `canvas` inside hoisted declarations.
    const teardownGl = () => {
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      fluid?.destroy();
      fluid = null;
      armed = false;
    };

    /* ── input ───────────────────────────────────────────────────────────── */

    const scheduleArm = (cx: number, cy: number) => {
      if (armed || arming || dead || idleId) return;
      const box = hero.getBoundingClientRect();
      const near =
        cx > box.left - ARM_MARGIN &&
        cx < box.right + ARM_MARGIN &&
        cy > box.top - ARM_MARGIN &&
        cy < box.bottom + ARM_MARGIN;
      if (!near) return;
      idleId = requestIdle(() => {
        idleId = 0;
        void arm();
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      // Per-event as well as per-media-query: a touchscreen laptop reports a
      // fine pointer, and its touch strokes should still be ignored.
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (reduceMq.matches || dead) return;

      const cx = e.clientX;
      const cy = e.clientY;

      // Deltas in CLIENT space, so scrolling injects nothing: a still cursor
      // has zero client delta even as the hero moves under it. The position is
      // tracked even before the effect is armed, so the first move after arming
      // already carries a delta — otherwise arming silently costs two moves,
      // and a user who arrives and pauses sees nothing happen.
      if (armed && hasPrev) {
        dx += cx - px;
        dy += cy - py;
      }
      px = cx;
      py = cy;
      hasPrev = true;

      if (!armed) {
        scheduleArm(cx, cy);
        return;
      }

      if (dx !== 0 || dy !== 0) wake();
    };

    const onPointerLeave = () => {
      // Clear the previous point so re-entry cannot synthesise a delta that
      // crosses the screen. The field then decays on its own.
      hasPrev = false;
    };

    /* ── signals ─────────────────────────────────────────────────────────── */

    const onVisibility = () => {
      visible = !document.hidden;
      if (!visible) rest();
    };

    const onScroll = () => {
      measureRect();
    };

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        rest();
        if (armed && !build()) {
          armed = false;
          giveUp();
        }
      }, RESIZE_DEBOUNCE_MS);
    };

    const onTheme = () => {
      rest();
      if (themeTimer) clearTimeout(themeTimer);
      // `body` transitions its colours over 120ms; reading immediately would
      // catch a mid-transition value and tint the glyphs wrong until the next
      // theme change.
      themeTimer = window.setTimeout(() => {
        if (mounted && armed) fluid?.setColors(readColors(h1));
      }, THEME_SETTLE_MS);
    };

    const onReduceChange = () => {
      if (reduceMq.matches) {
        rest();
        teardownGl();
        dead = true;
      } else {
        dead = false;
      }
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(h1);

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((en) => en.isIntersecting);
        if (!onScreen) rest();
      },
      { rootMargin: "200px", threshold: 0 },
    );
    io.observe(h1);

    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    if (fineMq.matches && !reduceMq.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("resize", onResize);
    }
    reduceMq.addEventListener("change", onReduceChange);

    return () => {
      mounted = false;
      rest();
      cancelIdle(idleId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (themeTimer) clearTimeout(themeTimer);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      reduceMq.removeEventListener("change", onReduceChange);
      teardownGl();
      // Unconditional: a torn-down effect must never leave the heading hidden.
      delete host.dataset.fluid;
    };
  }, []);

  return (
    <div ref={hostRef} className="hero-fluid-host">
      {children}
      <canvas ref={canvasRef} className="hero-fluid" aria-hidden="true" />
    </div>
  );
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

/** Arm off the critical path, so the move that triggered it is never blocked —
 *  but under a deadline, so a busy main thread cannot defer it indefinitely. */
function requestIdle(cb: () => void): number {
  const w = window as IdleWindow;
  return w.requestIdleCallback
    ? w.requestIdleCallback(cb, { timeout: ARM_TIMEOUT_MS })
    : window.setTimeout(cb, 0);
}

function cancelIdle(id: number) {
  if (!id) return;
  const w = window as IdleWindow;
  if (w.cancelIdleCallback) w.cancelIdleCallback(id);
  else clearTimeout(id);
}
