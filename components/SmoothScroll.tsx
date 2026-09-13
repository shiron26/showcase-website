"use client";

/**
 * Inertial wheel scrolling, by hand.
 *
 * A mouse wheel moves the page in steps; this turns the steps into a glide.
 * Each wheel notch moves a *target*; the page eases toward it a little more
 * every frame, so a flick keeps going for a moment and a stop settles softly.
 * Everything downstream — the pinned fields, the scrubbed panel, the reveals —
 * still reads the real scroll position, because the page really scrolls; it
 * just scrolls smoothly.
 *
 * THE EXIT CONTRACT, as everywhere else in this codebase:
 *   - Nothing here is ever in the way. Touch, keyboard, scrollbar drag, anchor
 *     links and the browser's own scroll all stay native; the loop only runs
 *     between a wheel event and the moment the page has caught up with it,
 *     then stops. If a frame never arrives, the page is simply where it is.
 *   - Any scroll that is not ours re-syncs the target to the real position,
 *     so the two can never fight.
 *   - It never engages on a coarse pointer or under reduced motion.
 */

import { useEffect } from "react";

/** Time constant of the ease, in seconds: how long a flick takes to settle. */
const TAU = 0.14;
/** Below this distance the loop stops and hands the page back. */
const REST_PX = 0.4;
/** A wheel notch in lines or pages, normalised to pixels. */
const LINE_PX = 40;

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const doc = document.documentElement;

    let target = 0;
    let current = 0;
    let frame = 0;
    let last = 0;

    const maxScroll = () => Math.max(0, doc.scrollHeight - window.innerHeight);

    const step = (now: number) => {
      frame = 0;
      const dt = Math.min((now - last) / 1000, 1 / 20);
      last = now;
      const gap = target - current;
      if (Math.abs(gap) < REST_PX) {
        current = target;
        window.scrollTo({ top: target, behavior: "instant" });
        return;
      }
      current += gap * (1 - Math.exp(-dt / TAU));
      window.scrollTo({ top: current, behavior: "instant" });
      frame = requestAnimationFrame(step);
    };

    /** True if the wheel happened over something that scrolls on its own. */
    const nativeScroller = (el: EventTarget | null) => {
      let node = el instanceof Element ? el : null;
      while (node && node !== doc) {
        const cs = getComputedStyle(node);
        const oy = cs.overflowY;
        if ((oy === "auto" || oy === "scroll") && node.scrollHeight > node.clientHeight) return true;
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      // While the route curtain is closed there is nothing to scroll: the page
      // behind it is being replaced and its position is not the reader's yet.
      if (doc.dataset.route) return;
      if (reduce.matches || !fine.matches || e.ctrlKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (nativeScroller(e.target)) return;
      e.preventDefault();

      const unit = e.deltaMode === 1 ? LINE_PX : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!frame) {
        // Starting fresh: take the page where it really is.
        current = window.scrollY;
        target = current;
        last = performance.now();
      }
      target = Math.min(maxScroll(), Math.max(0, target + e.deltaY * unit));
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onScroll = () => {
      // Scroll events arrive a frame after the scrollTo that caused them, so
      // a flag set around our own call would already be down. Instead: if the
      // page is where we last put it, this is our scroll; otherwise someone
      // else moved it — keyboard, scrollbar, an anchor — and that is where we
      // are now.
      if (Math.abs(window.scrollY - current) < 1.5) return;
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      current = window.scrollY;
      target = current;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
