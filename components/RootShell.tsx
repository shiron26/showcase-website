import type { ReactNode } from "react";
import { dict, type Lang } from "@/lib/i18n";
import { SITE, SHOW_PLACEHOLDER_BANNER } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import PlaceholderBanner from "@/components/PlaceholderBanner";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "@/app/globals.css";

const CONTRACT = `<!--
THESIS: a portfolio where display type IS the content at the scale it has in life, and colour arrives as full-bleed fields that own whole sections. It refuses the developer-portfolio default this project shipped first and the user rejected: a neutral page with a hairline index and an accent.
OWN-WORLD: one light ground only (dark mode removed 2026-09-12), one deep tobacco field that drenches whole bands, one pale sky that only ever means live (palette "Tabac", 2026-09-10; before it: bone/ink, ultramarine, acid green). Two voices in a headline — a wide grotesque plus a single didone italic word. No cards, no shadows, no containers.
STORY: a recruiter is met by the name at full width, reads one statement, scans the catalogue as bands that drench under the cursor, and leaves by email, CV, GitHub or a project page.
FIRST VIEWPORT: SHIRON BESKIWIN set edge to edge in uppercase display, a turning badge at its right, the positioning line and four actions beneath, the marquee band breaking the fold.
FORM: pinned brief (gusta.studio, dineshrevunuru.com, huuuuue.agency, ryanritzenthaler.com) — a pinned brief beats the roll; direction seed aa4446f1 superseded.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
-->`;

/* Runs before first paint: decides whether the entrance plays at all — so the
   overlay is either there from the first frame or never, and it never drops
   onto an already-painted page. It plays on every arrival, refresh included;
   only reduced motion skips it. (The site is light only since 2026-09-12; the
   theme choice this script used to settle is gone with the toggle.) */
const BOOT_SCRIPT = `(function(){var d=document.documentElement;try{var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!reduce){d.dataset.enter="1";d.style.setProperty("--enter-delay","1630ms");}}catch(e){}})();`;

export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = dict(lang);
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <link rel="preload" href="/fonts/bricolage.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/hanken.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      {/* suppressHydrationWarning: browser extensions (here ColorZilla, with
          its cz-shortcut-listen attribute) edit <body> before React hydrates.
          The mismatch is theirs, not ours, and only this element is exempted. */}
      <body suppressHydrationWarning>
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <Preloader lang={lang} />
        <SmoothScroll />
        <Cursor />
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Header
          lang={lang}
          notice={SHOW_PLACEHOLDER_BANNER ? <PlaceholderBanner lang={lang} /> : null}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}

export function baseMetadata(lang: Lang) {
  const title = `${SITE.name} — ${SITE.title[lang]}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s — ${SITE.name}` },
    description: SITE.positioning[lang],
    alternates: { canonical: `/${lang}`, languages: { fr: "/fr", en: "/en" } },
    openGraph: {
      title,
      description: SITE.positioning[lang],
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website" as const,
      url: `${SITE.url}/${lang}`,
    },
  };
}
