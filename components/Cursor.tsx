"use client";

import { useEffect } from "react";

/**
 * A round cursor that prints the page in negative.
 *
 * One white disc with `mix-blend-mode: difference`, so whatever it crosses is
 * inverted under it: bone on ink, ink on bone, the field's colour turned inside
 * out. It trails the pointer on an exponential ease and swells over anything
 * that can be clicked.
 *
 * THE EXIT CONTRACT, as everywhere else in this codebase:
 *   - The native cursor is hidden only once this has mounted, and only on a
 *     fine pointer. A touch screen, reduced motion, or a script that never ran
 *     all keep the browser's own cursor.
 *   - The loop runs only while the disc is still behind the pointer, then
 *     stops. The disc takes no pointer events and is never in the way.
 *   - The element is created here, not rendered: nothing to hydrate, nothing
 *     in the markup when the component does not engage.
 *
 * Position goes on the individual `translate` property, not `transform`: the
 * disc's size is the `scale` property, and the individual properties compose
 * translate → rotate → scale → transform, so a translate inside `transform`
 * would be multiplied by the scale and the swollen disc would leave the screen.
 */

/** Time constant of the trail, in seconds: how long the disc takes to catch a stop. */
const TAU = 0.08;
/** Below this distance the loop stops and waits for the next move. */
const REST_PX = 0.15;
/** What the disc swells over. */
const HOVER = "a, button, [role='button'], summary, label, input, select, textarea";

export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const root = document.documentElement;
    const el = document.createElement("div");
    el.className = "cursor";
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    root.dataset.cursor = "1";

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let shown = false;
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const k = 1 - Math.exp(-dt / TAU);
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.translate = `${x}px ${y}px`;
      if (Math.abs(tx - x) > REST_PX || Math.abs(ty - y) > REST_PX) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };
    const wake = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const hide = () => {
      shown = false;
      el.classList.remove("cursor--on", "cursor--hover", "cursor--down");
    };
    const overClickable = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest(HOVER);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        hide();
        return;
      }
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        /* First sight: appear where the pointer is, not fly in from the corner. */
        x = tx;
        y = ty;
        el.style.translate = `${x}px ${y}px`;
        shown = true;
        el.classList.add("cursor--on");
      }
      el.classList.toggle("cursor--hover", overClickable(e.target));
      wake();
    };
    const onOver = (e: PointerEvent) => {
      if (shown) el.classList.toggle("cursor--hover", overClickable(e.target));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") el.classList.add("cursor--down");
    };
    const onUp = () => el.classList.remove("cursor--down");
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) hide();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
      el.remove();
      delete root.dataset.cursor;
    };
  }, []);

  return null;
}
