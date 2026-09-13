"use client";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE CONTACT SHEET, and the viewer behind it.
 *
 *  Seven screenshots stacked at page width took five screens and buried the
 *  pagination. They are now a contact sheet: one compact grid of frames, each
 *  cropped to its own top-left corner, which is the part of a screen you
 *  recognise it by. Hovering one holds it and lets the others fall back, so the
 *  sheet answers the pointer without a single border, shadow or lifted card.
 *
 *  Opening a frame drops the ink veil over the page — the same inversion as the
 *  mobile menu and .band--ink — and the image is shown whole against it, with
 *  its caption, a counter, and one button on each side. Arrow keys, a swipe,
 *  a tap on the ink and Escape do the same work as the buttons.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { dict, type Lang } from "@/lib/i18n";
import type { Shot } from "@/content/projects";
import { ArrowIcon } from "@/components/icons";

export default function Gallery({ shots, lang }: { shots: Shot[]; lang: Lang }) {
  const t = dict(lang).project;
  const [at, setAt] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const openers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const from = useRef<number | null>(null);

  const open = at !== null;
  const step = useCallback(
    (d: number) => setAt((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );
  const close = useCallback(() => {
    setAt((i) => {
      if (i !== null) openers.current[i]?.focus();
      return null;
    });
  }, []);

  useEffect(() => setMounted(true), []);

  /* While the veil is up the page behind is locked, focus sits on the close
     button, and the keyboard drives it. Same contract as the mobile menu. */
  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.viewer = "open";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.documentElement.dataset.viewer;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const shot = at === null ? null : shots[at];

  const sheet = (
    <ul className="sheet-grid" aria-label={t.imageCount}>
      {shots.map((s, i) => (
        <li key={`${s.src}-${i}`}>
          <button
            type="button"
            className="thumb"
            /* A phone screenshot cropped to a landscape frame loses the one
               thing that says it is a phone. A tall shot is fitted whole into
               the frame instead, and reads as the object it is. */
            data-tall={s.w && s.h && s.h > s.w ? "" : undefined}
            ref={(el) => {
              openers.current[i] = el;
            }}
            onClick={() => setAt(i)}
            aria-label={`${t.enlarge} : ${s.caption[lang]}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt=""
              width={s.w}
              height={s.h}
              /* The sheet rides the story from the first screen, so a lazy
                 frame would sit grey in plain sight. They are small WebP and
                 they yield to the fonts. */
              loading="eager"
              fetchPriority="low"
              decoding="async"
            />
          </button>
        </li>
      ))}
    </ul>
  );

  const viewer = !shot ? null : (
    <div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={t.imageCount}
      onPointerDown={(e) => {
        from.current = e.clientX;
      }}
      onPointerUp={(e) => {
        const d = from.current === null ? 0 : e.clientX - from.current;
        from.current = null;
        if (Math.abs(d) > 48) step(d < 0 ? 1 : -1);
        /* a tap on the ink beside the image closes, as it does everywhere;
           a tap on the image itself does not */
        else if (
          e.target === e.currentTarget ||
          (e.target as HTMLElement).classList?.contains("viewer-stage")
        )
          close();
      }}
    >
      <div className="viewer-bar">
        <p className="tag-label num">
          {String((at ?? 0) + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          className="viewer-x"
          ref={closeBtn}
          onClick={close}
          aria-label={t.imageClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <figure className="viewer-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.caption[lang]}
          width={shot.w}
          height={shot.h}
          decoding="async"
        />
      </figure>

      <div className="viewer-foot">
        <button type="button" className="viewer-nav" onClick={() => step(-1)} aria-label={t.imagePrev}>
          <ArrowIcon style={{ transform: "rotate(180deg)" }} />
        </button>
        <p className="viewer-cap">{shot.caption[lang]}</p>
        <button type="button" className="viewer-nav" onClick={() => step(1)} aria-label={t.imageNext}>
          <ArrowIcon />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {sheet}
      {/* The veil is portalled to <body>: a project page sits inside elements
          that carry transforms for the entrance reveals, and a transformed
          ancestor turns `position: fixed` into a box inside that ancestor —
          the veil would scroll with the page and the header would paint over
          it. */}
      {mounted && viewer ? createPortal(viewer, document.body) : null}
    </>
  );
}
