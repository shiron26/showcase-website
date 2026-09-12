"use client";

/**
 * The close: the last screen of every page, revealed like a curtain.
 *
 * The footer is a full-viewport blue field that sits *behind* the page:
 * `position: sticky; bottom: 0` under a `<main>` that carries its own ground
 * and a higher z-index. As the reader reaches the end, the page lifts away
 * and uncovers the poster underneath. Nothing here animates on a clock:
 * JavaScript publishes one number, `--p` (0 when the page still covers the
 * field, 1 when it has fully lifted), and every motion — the hand writing
 * "à bientôt", the two halves of the name meeting at the horizon, the
 * address and the links rising — is a CSS function of it, so scrolling back
 * up undoes it for free. The CSS default is the finished state, and reduced
 * motion forces `--p` to 1, so the page is complete without a script.
 *
 * `--lift` is the same value published on <html>, for the page's bottom
 * corners and the shadow of the lifting sheet.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { dict, type Lang } from "@/lib/i18n";
import { SITE } from "@/content/site";
import LangLink from "@/components/LangLink";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedinIcon } from "@/components/icons";

export default function Footer({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const year = new Date().getFullYear();
  const [first, ...rest] = SITE.name.split(" ");
  const last = rest.join(" ");
  const heroCh = Math.max(first.length, last.length, 5);
  const ref = useRef<HTMLElement>(null);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const el = ref.current;
    const main = document.getElementById("main");
    if (!el || !main) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let last = -1;
    const update = () => {
      // The page's bottom edge, in the viewport: at the bottom the field is
      // covered (0), at the top it is fully uncovered (1).
      const bottom = main.getBoundingClientRect().bottom;
      const p = Math.min(1, Math.max(0, 1 - bottom / window.innerHeight));
      const q = Math.round(p * 1000) / 1000;
      if (q === last) return;
      last = q;
      el.style.setProperty("--p", String(q));
      document.documentElement.style.setProperty("--lift", String(q));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.documentElement.style.removeProperty("--lift");
    };
  }, []);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, [lang]);

  return (
    <>
      {/* The nav's #contact target. It cannot be the footer itself: a sticky
          element is always "in view" at the bottom, so scrolling to it would
          go nowhere. This anchor sits at the footer's natural position, the
          end of the document, so reaching it lifts the sheet all the way. */}
      <span id="contact" className="close-anchor" aria-hidden="true" />
      <footer className="close" ref={ref}>
      <div className="inner close-inner">
        <p className="close-meta tag-label">
          <span>
            {SITE.location[lang]} · <span className="num">{clock}</span>
          </span>
          <span>{t.contact.available}</span>
        </p>

        <div className="close-stage">
          <p className="close-sign" aria-hidden="true">
            {t.contact.sign}
          </p>
          {/* The name, cut at the horizon: full above, outline below. */}
          <p
            className="close-name"
            aria-hidden="true"
            style={{ "--hero-ch": heroCh } as CSSProperties}
          >
            <span className="close-name-hi">
              {first}
              <br />
              {last}
            </span>
            <span className="close-name-lo">
              {first}
              <br />
              {last}
            </span>
          </p>
          <a className="close-mail close-rise" href={`mailto:${SITE.email}`}>
            {SITE.email}
            <ArrowUpRightIcon />
          </a>
          <ul className="close-links close-rise">
            {SITE.cv[lang] ? (
              <li>
                <a className="close-link" href={SITE.cv[lang]} download>
                  <DownloadIcon />
                  {t.hero.actions.cv}
                </a>
              </li>
            ) : null}
            {SITE.github ? (
              <li>
                <a className="close-link" href={SITE.github} target="_blank" rel="me noreferrer">
                  <GithubIcon />
                  {t.hero.actions.github}
                </a>
              </li>
            ) : null}
            {SITE.linkedin ? (
              <li>
                <a className="close-link" href={SITE.linkedin} target="_blank" rel="me noreferrer">
                  <LinkedinIcon />
                  {t.hero.actions.linkedin}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="close-bar close-rise">
          {/* The field is blue in both themes, so only the light logo is
              ever right here. */}
          <img
            className="close-logo"
            src="/brand/sb-logo-light.png"
            alt={SITE.name}
            width={640}
            height={597}
          />
          <p className="num">
            © {year} {SITE.name} · {t.footer.rights}
          </p>
          <LangLink lang={lang}>
            {lang === "fr" ? "Read this page in English" : "Lire cette page en français"}
          </LangLink>
        </div>
      </div>
      </footer>
    </>
  );
}
