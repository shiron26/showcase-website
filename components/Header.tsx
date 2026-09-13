"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";
import { SITE } from "@/content/site";

function Roll({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="roll">
      <span>{label}</span>
      <span aria-hidden="true">{label}</span>
    </Link>
  );
}

const SECTIONS = ["path", "work", "skills", "contact"] as const;
type Section = (typeof SECTIONS)[number];

export default function Header({
  lang,
  notice,
}: {
  lang: Lang;
  notice?: React.ReactNode;
}) {
  const t = dict(lang);
  const ref = useRef<HTMLElement | null>(null);
  const menuBtn = useRef<HTMLButtonElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  // The menu holds :root[data-menu="open"] { overflow: hidden }. A navigation
  // started from inside it must close it, or the next page cannot scroll.
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  const [current, setCurrent] = useState<Section | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    publish();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", publish);
      return () => window.removeEventListener("resize", publish);
    }
    const ro = new ResizeObserver(publish);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /**
   * The full-screen menu, on narrow screens. Opening it: read which section
   * is under the reader (the last one whose top has passed 40% of the
   * viewport), lock the page behind, move focus to the close button. Closing
   * it: give focus back to the button that opened it. Escape closes.
   */
  const show = useCallback(() => {
    const line = window.scrollY + window.innerHeight * 0.4;
    let found: Section | null = null;
    for (const id of SECTIONS) {
      const node = document.getElementById(id);
      if (node && node.getBoundingClientRect().top + window.scrollY <= line) found = id;
    }
    setCurrent(found);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    menuBtn.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.dataset.menu = "open";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.documentElement.dataset.menu;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, hide]);

  const links: { id: Section; label: string }[] = [
    { id: "path", label: t.nav.path },
    { id: "work", label: t.nav.work },
    { id: "skills", label: t.nav.skills },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header className="header" ref={ref}>
      {notice}
      <div className="header-bar">
        {/* The monogram, in the pill the wordmark used to sit in: the dark mark
            on the light ground. The site is light only (2026-09-12). */}
        <Link href={`/${lang}`} className="mark" aria-label={SITE.name}>
          <img className="mark-img" src="/brand/sb-mark-dark.png" alt="" width={245} height={200} />
        </Link>
        <nav className="header-nav" aria-label={t.nav.sections}>
          {links.map((l) => (
            <Roll key={l.id} href={`/${lang}#${l.id}`} label={l.label} />
          ))}
        </nav>
        <div className="header-controls" style={{ marginInlineStart: "auto" }}>
          <LangSwitch lang={lang} />
        </div>
        <button
          type="button"
          className="menu-btn"
          ref={menuBtn}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="menu"
          onClick={show}
        >
          {t.nav.menu}
        </button>
      </div>

      {/* The menu: an ink veil with the four sections in display type, the
          one under the reader at full colour, the others dimmed. It is in the
          DOM only while open, so nothing here is tabbable behind the page. */}
      {open ? (
        <div className="menu" id="menu" role="dialog" aria-modal="true" aria-label={t.nav.sections}>
          <div className="menu-top">
            <img className="menu-mark mark-img" src="/brand/sb-mark-light.png" alt="" width={245} height={200} />
            <button type="button" className="menu-close" ref={closeBtn} onClick={hide} aria-label={t.nav.close}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="menu-links" aria-label={t.nav.sections}>
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="menu-link"
                aria-current={current === l.id ? "location" : undefined}
                style={{ "--i": i } as React.CSSProperties}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a className="menu-mail tag-label" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
        </div>
      ) : null}
    </header>
  );
}
