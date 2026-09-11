"use client";

/**
 * An element that plays its entrance once, when it comes into view.
 *
 * Same contract as Scrub: JavaScript owns two attributes and nothing else.
 * `data-reveal="armed"` puts the children in their starting positions;
 * `data-in="1"` lets the CSS animations run from there to the resting state.
 * The un-attributed CSS is the resting state, so without JavaScript, under
 * reduced motion, or if the observer never fires, the element is simply
 * complete and still.
 */

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({
  as = "section",
  id,
  className,
  style,
  children,
  threshold = 0.18,
}: {
  /** The element to render: a section by default, a list item inside a list. */
  as?: "section" | "div" | "li" | "article";
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** How much of the element must be visible before it plays. */
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    el.dataset.reveal = "armed";
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        el.dataset.in = "1";
        io.disconnect();
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      delete el.dataset.reveal;
      delete el.dataset.in;
    };
  }, [threshold]);

  return createElement(as, { id, className, style, ref }, children);
}
