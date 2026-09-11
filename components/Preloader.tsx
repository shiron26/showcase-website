"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

/**
 * The entrance: the monogram filling up, on every arrival.
 *
 * The mark sits at the centre and is drawn twice: a ghost at low opacity, and
 * the full mark over it clipped from the top by the progress, so it fills from
 * the foot up as the count runs. The count itself is small, in the bottom row
 * between the name and the role; the mark is the counter now.
 *
 * Whether it plays at all is decided before first paint by the boot script in
 * RootShell, which sets `data-enter` on <html>; CSS keeps this markup hidden
 * otherwise, so it is either there from the first frame or never — it never
 * drops onto an already-painted page.
 *
 * The panel's exit is a CSS animation, deliberately: requestAnimationFrame is
 * throttled in background tabs and low-power modes, and an overlay whose only
 * way out is a JavaScript frame can sit over the page indefinitely. JavaScript
 * owns nothing here but the digits, and it never locks scrolling or gates
 * content — the page is complete underneath the whole time.
 */
export default function Preloader({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (document.documentElement.dataset.enter !== "1") return;
    const start = Date.now();
    const DUR = 1500;
    const id = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DUR);
      setN(Math.round(p * 100));
      if (p >= 1) window.clearInterval(id);
    }, 24);
    const off = window.setTimeout(() => {
      delete document.documentElement.dataset.enter;
    }, 2100);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(off);
    };
  }, []);

  return (
    <div className="preloader" aria-hidden="true">
      {/* The panel is ink in both themes, so only the light variant is ever
          right here — no theme pair needed. */}
      <div className="preloader-mark" style={{ "--p": n / 100 } as CSSProperties}>
        <img className="preloader-mark-ghost" src="/brand/sb-mark-light.png" alt="" width={245} height={200} />
        <img className="preloader-mark-fill" src="/brand/sb-mark-light.png" alt="" width={245} height={200} />
      </div>
      <div className="preloader-word tag-label">
        <span>{t.site.name}</span>
        <span className="preloader-count num">{n}%</span>
        <span>{t.site.role}</span>
      </div>
      <div className="preloader-rule" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}
