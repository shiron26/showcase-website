"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { dict } from "@/lib/i18n";

/**
 * The entrance: a counter to 100, once per session.
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
    try {
      sessionStorage.setItem("entered", "1");
    } catch {
      /* private mode: it simply plays again next load */
    }
    const start = Date.now();
    const DUR = 820;
    const id = window.setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DUR);
      setN(Math.round(p * 100));
      if (p >= 1) window.clearInterval(id);
    }, 24);
    const off = window.setTimeout(() => {
      delete document.documentElement.dataset.enter;
    }, 1400);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(off);
    };
  }, []);

  return (
    <div className="preloader" aria-hidden="true">
      {/* The monogram, where the header's will be once the panel has left: the
          wipe hands one over to the other. The panel is ink in both themes, so
          only the light variant is ever right here — no theme pair needed. */}
      <img className="preloader-mark" src="/brand/sb-mark-light.png" alt="" width={245} height={200} />
      <p className="preloader-count num">
        {n}
        <sup>%</sup>
      </p>
      <div className="preloader-word tag-label">
        <span>{t.site.name}</span>
        <span>{t.site.role}</span>
      </div>
      <div className="preloader-rule" style={{ transform: `scaleX(${n / 100})` }} />
    </div>
  );
}
