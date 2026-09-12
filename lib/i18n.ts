export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** The project-index path segment, in each language. Both are really generated. */
export const SECTION: Record<Lang, string> = { fr: "projets", en: "projects" };

export function sectionToLang(section: string): Lang | null {
  const found = (Object.keys(SECTION) as Lang[]).find((l) => SECTION[l] === section);
  return found ?? null;
}

export function projectHref(lang: Lang, slug: string) {
  return `/${lang}/${SECTION[lang]}/${slug}`;
}

type Dict = {
  site: { name: string; role: string };
  badge: string;
  marquee: string[];
  statement: { before: string; em: string; after: string; why: string };
  /** The specimen label beside the portrait. */
  portrait: { fig: string; note: string; sign: string };
  nav: { work: string; path: string; skills: string; contact: string; sections: string; menu: string; close: string };
  skip: string;
  hero: {
    now: string;
    nowRole: string;
    nowAt: string;
    latest: string;
    actions: { email: string; cv: string; github: string; linkedin: string };
  };
  work: {
    title: string;
    lead: string;
    all: string;
    freelance: string;
    perso: string;
    countOne: string;
    countMany: string;
    empty: string;
    emptyHint: string;
    year: string;
    role: string;
    open: string;
  };
  path: { title: string; lead: string; present: string; internship: string; missions: string; readMore: string; readLess: string; countOne: string; countMany: string };
  /** The three counters under the statement: roles, freelance missions, personal projects. */
  counts: { roles: [string, string]; freelance: [string, string]; perso: [string, string] };
  /** The scrubbed education panel: kicker, lead, and the four labels around the word. */
  education: { title: string; lead: string; sign: string; city: string; years: string; degree: string; school: string };
  skills: { title: string; lead: string };
  contact: { title: string; titleEm: string; lead: string; email: string; cvNote: string; sign: string; available: string };
  project: {
    back: string;
    context: string;
    role: string;
    approach: string;
    outcome: string;
    stack: string;
    links: string;
    live: string;
    source: string;
    next: string;
    previous: string;
    notFound: string;
    notFoundHint: string;
    pagination: string;
  };
  langSwitch: { label: string };
  placeholder: { chip: string; banner: string; bannerLink: string; missing: string; emailUnconfirmed: string };
  footer: { rights: string };
};

export const DICT: Record<Lang, Dict> = {
  fr: {
    site: { name: "Shiron Beskiwin", role: "Software Engineer" },
    badge: "Software Engineer",
    marquee: ["Fullstack", "Back-end", "Automatisation", "IA", "Livré"],
    statement: {
      before: "Je livre des\nproduits",
      em: "entiers",
      after: "Du problème posé à la version que des gens utilisent.",
      why: "Ce qui me plaît dans ce métier, c'est son impact sur les autres : un processus automatisé, c'est du temps rendu à une équipe et de la performance gagnée pour l'organisation. C'est aussi un métier qui change de terrain à chaque expérience (la santé, la finance, le BTP, etc.) et qui demande de comprendre chacun d'eux. Cette variété nourrit ma curiosité, et c'est pour elle que je cherche les projets qui me sortent de ma zone de confort.",
    },
    portrait: { fig: "Fig. 01 — Portrait", note: "Bichromie ink / bone", sign: "C'est moi" },
    nav: {
      work: "Réalisations",
      path: "Parcours",
      skills: "Compétences",
      contact: "Contact",
      sections: "Sections du site",
      menu: "Menu",
      close: "Fermer le menu",
    },
    skip: "Aller au contenu",
    hero: {
      now: "En ce moment",
      nowRole: "développeur fullstack",
      nowAt: "chez",
      latest: "Dernier projet",
      actions: { email: "M'écrire", cv: "Télécharger le CV", github: "GitHub", linkedin: "LinkedIn" },
    },
    work: {
      title: "Réalisations",
      lead: "Missions freelance et projets personnels, avec le contexte, mon rôle et le résultat pour chacun.",
      all: "Tout",
      freelance: "Freelance",
      perso: "Personnel",
      countOne: "réalisation",
      countMany: "réalisations",
      empty: "Aucune réalisation dans ce filtre.",
      emptyHint: "Reviens à « Tout » pour voir le catalogue complet.",
      year: "Année",
      role: "Rôle",
      open: "Ouvrir le projet",
    },
    path: {
      title: "Expériences",
      lead: "Là où j'ai travaillé, et ce que j'y ai construit, en détail.",
      present: "aujourd'hui",
      internship: "stage",
      missions: "Missions",
      readMore: "Lire le récit",
      readLess: "Replier",
      countOne: "poste",
      countMany: "postes",
    },
    counts: {
      roles: ["poste en entreprise", "postes en entreprise"],
      freelance: ["mission freelance", "missions freelance"],
      perso: ["projet personnel", "projets personnels"],
    },
    education: {
      title: "Formation",
      lead: "Cinq ans à apprendre en construisant.",
      sign: "Diplômé de",
      city: "Ville",
      years: "Années",
      degree: "Diplôme",
      school: "Programme",
    },
    skills: {
      title: "Compétences",
      lead: "Ce que je sais faire.",
    },
    contact: {
      title: "Travaillons",
      titleEm: "ensemble",
      lead: "Une mission, un poste, ou juste une question sur un projet : écris-moi, je réponds.",
      email: "M'écrire",
      cvNote: "Le CV complet est aussi disponible en PDF.",
      sign: "à bientôt",
      available: "Disponible pour un poste ou une mission",
    },
    project: {
      back: "Tous les projets",
      context: "Contexte",
      role: "Mon rôle",
      approach: "Approche",
      outcome: "Résultat",
      stack: "Stack",
      links: "Liens",
      live: "Voir en ligne",
      source: "Code source",
      next: "Projet suivant",
      previous: "Projet précédent",
      notFound: "Ce projet n'existe pas.",
      notFoundHint: "Il a peut-être été renommé. Voici le catalogue complet.",
      pagination: "Projet précédent et suivant",
    },
    langSwitch: { label: "Langue" },
    placeholder: {
      chip: "Exemple",
      banner: "Contenu d'exemple : les projets, dates et résultats ci-dessous sont fictifs.",
      bannerLink: "Comment les remplacer",
      missing: "À confirmer ou configurer dans content/site.ts :",
      emailUnconfirmed: "adresse e-mail",
    },
    footer: { rights: "Tous droits réservés." },
  },
  en: {
    site: { name: "Shiron Beskiwin", role: "Software Engineer" },
    badge: "Software Engineer",
    marquee: ["Fullstack", "Back-end", "Automation", "AI", "Shipped"],
    statement: {
      before: "I ship products,\nstart to",
      em: "finish",
      after: "From the problem posed to the version people actually use.",
      why: "What I like about this job is its impact on others: an automated process is time given back to a team and performance gained for the organisation. It is also a job that changes ground with every experience (healthcare, finance, construction, etc.) and asks you to understand each of them. That variety feeds my curiosity, and it is why I look for the projects that take me out of my comfort zone.",
    },
    portrait: { fig: "Fig. 01 — Portrait", note: "Ink / bone duotone", sign: "That's me" },
    nav: {
      work: "Work",
      path: "Path",
      skills: "Skills",
      contact: "Contact",
      sections: "Site sections",
      menu: "Menu",
      close: "Close the menu",
    },
    skip: "Skip to content",
    hero: {
      now: "Currently",
      nowRole: "fullstack developer",
      nowAt: "at",
      latest: "Latest project",
      actions: { email: "Email me", cv: "Download CV", github: "GitHub", linkedin: "LinkedIn" },
    },
    work: {
      title: "Work",
      lead: "Freelance missions and personal projects, each with its context, my role and the outcome.",
      all: "All",
      freelance: "Freelance",
      perso: "Personal",
      countOne: "piece of work",
      countMany: "pieces of work",
      empty: "Nothing in this filter.",
      emptyHint: "Go back to “All” to see the full catalogue.",
      year: "Year",
      role: "Role",
      open: "Open project",
    },
    path: {
      title: "Experience",
      lead: "Where I have worked, and what I built there, in full.",
      present: "present",
      internship: "internship",
      missions: "What I did",
      readMore: "Read the story",
      readLess: "Fold",
      countOne: "role",
      countMany: "roles",
    },
    counts: {
      roles: ["role in a company", "roles in companies"],
      freelance: ["freelance mission", "freelance missions"],
      perso: ["personal project", "personal projects"],
    },
    education: {
      title: "Education",
      lead: "Five years of learning by building.",
      sign: "Graduate of",
      city: "City",
      years: "Years",
      degree: "Degree",
      school: "Programme",
    },
    skills: {
      title: "Skills",
      lead: "What I can do.",
    },
    contact: {
      title: "Let's build",
      titleEm: "together",
      lead: "A role, a project, or just a question about something here: write to me, I answer.",
      email: "Email me",
      cvNote: "The full CV is also available as a PDF.",
      sign: "see you soon",
      available: "Available for a role or a mission",
    },
    project: {
      back: "All projects",
      context: "Context",
      role: "My role",
      approach: "Approach",
      outcome: "Outcome",
      stack: "Stack",
      links: "Links",
      live: "View live",
      source: "Source code",
      next: "Next project",
      previous: "Previous project",
      notFound: "This project does not exist.",
      notFoundHint: "It may have been renamed. Here is the full catalogue.",
      pagination: "Previous and next project",
    },
    langSwitch: { label: "Language" },
    placeholder: {
      chip: "Sample",
      banner: "Sample content: the projects, dates and outcomes below are fictional.",
      bannerLink: "How to replace them",
      missing: "To confirm or configure in content/site.ts:",
      emailUnconfirmed: "email address",
    },
    footer: { rights: "All rights reserved." },
  },
};

export function dict(lang: Lang) {
  return DICT[lang];
}
