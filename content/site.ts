import type { Lang } from "@/lib/i18n";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE ONLY FILE YOU NEED TO EDIT TO MAKE THIS SITE YOURS.
 *  Filled from Shiron's CV on 2026-09-08. The remaining TODOs are the
 *  GitHub URL and the CV PDF, which the CV itself does not carry.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const SITE = {
  name: "Shiron Beskiwin",

  /** Software Engineer, in both languages — the title is the same on the CV. */
  title: {
    fr: "Software Engineer",
    en: "Software Engineer",
  } satisfies Record<Lang, string>,

  /** The one sentence a recruiter reads first. Say what you ship, not what you know. */
  positioning: {
    fr: "Je construis des produits de bout en bout, en travaillant avec le métier plutôt qu'à côté.",
    en: "I build products end to end, working with the business rather than beside it.",
  } satisfies Record<Lang, string>,
  /** The one word of the positioning line set in the hand. It must appear in
      the sentence above as a whole word; Home.tsx splits on it. */
  positioningEm: {
    fr: "avec",
    en: "with",
  } satisfies Record<Lang, string>,

  /** The address on the CV. */
  email: "shiron2603@gmail.com",
  emailConfirmed: true,

  /**
   * TODO — your real GitHub URL. Empty means the link is not rendered at all:
   * a portfolio that ships a button to github.com/ is worse than one that ships
   * no button, so nothing appears here until you put a real URL in.
   */
  github: "",
  linkedin: "https://www.linkedin.com/in/shiron-beskiwin/",

  location: {
    fr: "Paris",
    en: "Paris",
  } satisfies Record<Lang, string>,

  /**
   * TODO — drop your CV at `public/cv/shiron-beskiwin-cv.pdf` (and the English
   * version beside it), then set these two paths. Empty means the download
   * button is not rendered, because a button that 404s is a defect, not a
   * placeholder.
   */
  cv: {
    fr: "",
    en: "",
  } satisfies Record<Lang, string>,

  /** The domain on the CV. Used for canonical URLs and Open Graph. */
  url: "https://shironbeskiwin.fr",

  /**
   * The three counters under the statement. By default they are counted from
   * the content (roles in cv.ts, entries in projects.ts). A number set here
   * wins over the count, for work that is real but not written up yet.
   * Set to null to go back to counting.
   */
  counts: {
    roles: null as number | null,
    freelance: 3 as number | null,
    perso: 5 as number | null,
  },
};

/**
 * The sample projects and history have been replaced with the real ones, so
 * the notice bar is off. It still lists the unconfigured fields above if you
 * turn it back on.
 */
export const SHOW_PLACEHOLDER_BANNER = false;
