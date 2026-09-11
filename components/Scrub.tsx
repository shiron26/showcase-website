"use client";

/**
 * A section whose motion is a pure function of the scroll position.
 *
 * THE REST CONTRACT — the same one HeroFluid keeps, applied to scroll.
 *
 * JavaScript owns exactly three things here and nothing else: the attribute
 * `data-scrub="on"`, the custom property `--p` (progress through the section,
 * 0 to 1) and `--over` (how far a `[data-track]` child overflows its box, in
 * px). Every visual decision is made in CSS from those values, and the CSS
 * default — no attribute, no properties — is the FINISHED state: the panel
 * fully revealed, the track a plain horizontal scroller. So without JavaScript,
 * under reduced motion, or if this effect dies mid-visit, the page is complete
 * and correct; it is only *less animated*.
 *
 * There is no requestAnimationFrame loop. `--p` is recomputed inside the scroll
 * event itself, which the browser already delivers at most once per frame, so
 * the value is never a frame behind the scrollbar and there is nothing to
 * throttle. Scrolling up reverses the motion for free: it is the same function
 * evaluated at a smaller input.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Scrub({
  id,
  className,
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const track = el.querySelector<HTMLElement>("[data-track]");
    let on = false;
    let last = -1;

    const progress = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const p = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 1;
      const q = Math.round(p * 1000) / 1000;
      if (q === last) return;
      last = q;
      el.style.setProperty("--p", String(q));
    };

    const measure = () => {
      const tail = track?.lastElementChild;
      if (track && tail) {
        // Not scrollWidth: once the track is `overflow: visible` Chrome reports
        // no scrollable overflow at all. The last child's right edge, measured
        // against the track's own left edge, is invariant under the translate
        // (both rects move together), so it is stable mid-slide.
        const end = tail.getBoundingClientRect().right - track.getBoundingClientRect().left;
        const pad = parseFloat(getComputedStyle(track).paddingInlineEnd) || 0;
        const over = Math.max(0, end + pad - track.clientWidth);
        el.style.setProperty("--over", `${Math.round(over)}px`);
      }
      // The section's own height depends on --over, so re-read progress after
      // it has been written and the observer below will settle on the next
      // resize with an identical value and stop.
      progress();
    };

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;

    const arm = () => {
      if (on) return;
      on = true;
      el.dataset.scrub = "on";
      window.addEventListener("scroll", progress, { passive: true });
      window.addEventListener("resize", measure);
      ro?.observe(el);
      if (track) ro?.observe(track);
      measure();
      // Type metrics change when the display face lands; widths with it.
      document.fonts?.ready.then(() => on && measure()).catch(() => {});
    };

    const disarm = () => {
      if (!on) return;
      on = false;
      window.removeEventListener("scroll", progress);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      delete el.dataset.scrub;
      el.style.removeProperty("--p");
      el.style.removeProperty("--over");
      last = -1;
    };

    const apply = () => (reduce.matches ? disarm() : arm());
    apply();
    reduce.addEventListener("change", apply);

    return () => {
      reduce.removeEventListener("change", apply);
      disarm();
    };
  }, []);

  return (
    <section id={id} className={className} style={style} ref={ref}>
      {children}
    </section>
  );
}
