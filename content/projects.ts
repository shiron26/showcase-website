import type { Lang } from "@/lib/i18n";

export type ProjectKind = "freelance" | "perso";

type L = Record<Lang, string>;
type LP = Record<Lang, string[]>;

export type Project = {
  slug: string;
  kind: ProjectKind;
  /** Displayed as-is. Use a range ("2023 — 2025") or a single year. */
  period: string;
  /** Sort key. Higher is more recent. */
  order: number;
  /** The client for a freelance mission, or "Personnel". Keep it short. */
  org: L;
  title: string;
  /** One line, read in the index. Say the outcome, not the category. */
  summary: L;
  context: LP;
  role: LP;
  approach: LP;
  outcome: LP;
  stack: string[];
  links?: { live?: string; source?: string };
  /**
   * Drop a screenshot at `public/work/<slug>.png` (1600×1000 works well) and
   * set `cover` to its path. Without it, no image slot is rendered at all and
   * the entry is purely typographic — never a decorative filler plate.
   */
  cover?: string;
  /** Marks the entry as sample content until you replace it. */
  sample?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE CATALOGUE: freelance missions and personal projects, one entry each,
 *  every one with its own page. Employment (Artibox, One Prev, Air Liquide
 *  Santé) is told in chapters in content/cv.ts, not here.
 *
 *  Written from Shiron's notes on 2026-09-11.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const PROJECTS: Project[] = [
  {
    slug: "lyodge",
    kind: "freelance",
    period: "2021 — 2022",
    order: 2022,
    org: { fr: "Lyodge · serveur Minecraft", en: "Lyodge · Minecraft server" },
    title: "Lyodge",
    summary: {
      fr: "Une plateforme web qui donne à un serveur Minecraft ce que le jeu ne permettait pas encore : arbres de compétences, skins par faction, boutique.",
      en: "A web platform giving a Minecraft server what the game did not yet allow: skill trees, faction skins, a shop.",
    },
    context: {
      fr: [
        "Lyodge préparait l'ouverture d'un serveur Minecraft et voulait des mécaniques que le jeu rendait difficiles à réaliser à l'époque : un arbre de compétences par joueur, des skins propres à chaque faction, une boutique. La réponse a été de les sortir du jeu, dans une plateforme web reliée au serveur.",
      ],
      en: [
        "Lyodge was preparing to open a Minecraft server and wanted mechanics the game made hard to build at the time: a skill tree per player, skins specific to each faction, a shop. The answer was to take them out of the game, into a web platform connected to the server.",
      ],
    },
    role: {
      fr: [
        "Seul développeur, sur toutes les phases du projet : cahier des charges front et back, design UI/UX sur Figma, conception et développement, documentation, tests unitaires et déploiement, dans les délais fixés. J'ai aussi capturé les images et monté la bande-annonce d'ouverture du serveur.",
      ],
      en: [
        "Sole developer, across every phase of the project: front and back specifications, UI/UX design in Figma, design and development, documentation, unit tests and deployment, within the agreed deadlines. I also shot the footage and edited the server's launch trailer.",
      ],
    },
    approach: {
      fr: [
        "Un front React pour l'interface des joueurs, un back Express sur MongoDB pour les données de jeu, le tout conteneurisé avec Docker. Le cahier des charges écrit avant la première ligne de code, pour que neuf mois suffisent.",
      ],
      en: [
        "A React front end for the players' interface, an Express back end on MongoDB for the game data, all containerised with Docker. The specifications written before the first line of code, so that nine months would be enough.",
      ],
    },
    outcome: {
      fr: ["La plateforme livrée pour l'ouverture du serveur, avec sa bande-annonce."],
      en: ["The platform delivered for the server's opening, trailer included."],
    },
    stack: ["React", "Node.js", "Express", "MongoDB", "Docker", "Figma", "Premiere Pro", "After Effects"],
  },
  {
    slug: "angie",
    kind: "freelance",
    period: "2020 — 2021",
    order: 2021,
    org: { fr: "Angie · stage", en: "Angie · internship" },
    title: "Angie",
    summary: {
      fr: "Des scripts d'extraction de données rendus 65 % plus rapides grâce au parallélisme Python.",
      en: "Data extraction scripts made 65% faster through Python parallelism.",
    },
    context: {
      fr: [
        "Le travail portait sur des données extraites du web et des réseaux sociaux. Les scripts d'extraction tournaient en séquence, et leur durée limitait ce que l'équipe pouvait collecter.",
      ],
      en: [
        "The work was about data extracted from the web and social networks. The extraction scripts ran sequentially, and their duration limited what the team could collect.",
      ],
    },
    role: {
      fr: ["Data Engineer en stage, cinq mois, sur l'extraction et le scraping."],
      en: ["Data Engineer intern, five months, on extraction and scraping."],
    },
    approach: {
      fr: ["Paralléliser l'extraction en Python plutôt que réécrire les scripts, et étendre le scraping aux réseaux sociaux."],
      en: ["Parallelise the extraction in Python rather than rewrite the scripts, and extend the scraping to social networks."],
    },
    outcome: {
      fr: ["65 % de temps gagné sur les extractions."],
      en: ["65% of extraction time saved."],
    },
    stack: ["Python", "Scraping"],
  },
  {
    slug: "clarity",
    kind: "perso",
    period: "2026 — ",
    order: 2026.5,
    org: { fr: "Personnel", en: "Personal" },
    title: "Clarity",
    summary: {
      fr: "Une application de productivité qui relie des objectifs annuels à la semaine en cours, réécrite une fois pour en enlever plutôt qu'en ajouter.",
      en: "A productivity app that ties yearly goals to the current week, rewritten once to remove rather than add.",
    },
    context: {
      fr: [
        "Des objectifs annuels, découpés en jalons trimestriels puis en tâches, et un rituel de revue hebdomadaire, trimestrielle et annuelle. Des espaces partagés pour travailler jusqu'à quatre. D'abord pour moi, avec l'idée de l'ouvrir ensuite.",
      ],
      en: [
        "Yearly goals, broken into quarterly milestones and then tasks, with a weekly, quarterly and yearly review ritual. Shared spaces to work up to four. First for myself, with the idea of opening it up later.",
      ],
    },
    role: {
      fr: ["Conception, spécification et développement, seul : la spécification écrite avant le code, les maquettes à part, un audit de sécurité avant de livrer."],
      en: ["Design, specification and development, alone: the spec written before the code, the mockups separately, a security audit before shipping."],
    },
    approach: {
      fr: [
        "Une première version a tout eu, et c'était trop. La deuxième repart de zéro, retire le kanban, les statuts, le pourcentage de progression et le streak, et garde une seule cadence hebdomadaire avec un principe : rien n'est jamais reporté automatiquement. Une application entièrement derrière login, très interactive, avec un chiffrement géré dans la base et un modèle de menace posé clairement.",
      ],
      en: [
        "A first version had everything, and it was too much. The second starts from zero, drops the kanban, the statuses, the progress percentage and the streak, and keeps a single weekly cadence with one principle: nothing is ever carried over automatically. An app that lives entirely behind login, highly interactive, with encryption handled in the database and a clearly stated threat model.",
      ],
    },
    outcome: {
      fr: ["En production."],
      en: ["In production."],
    },
    stack: ["React", "Vite", "TanStack Router", "TanStack Query", "Supabase", "PostgreSQL", "pgcrypto", "Zustand", "Next.js", "Tailwind"],
  },
  {
    slug: "myadvisor",
    kind: "perso",
    period: "2026 — ",
    order: 2026.3,
    org: { fr: "MyAdvisor · Singapour", en: "MyAdvisor · Singapore" },
    title: "MyAdvisor",
    summary: {
      fr: "Une plateforme de gestion de leads pour conseillers financiers à Singapour, du site qui les capte au back-office qui les convertit, conforme PDPA.",
      en: "A lead-management platform for financial advisers in Singapore, from the site that captures them to the back office that converts them, PDPA-compliant.",
    },
    context: {
      fr: [
        "Développée pour une première cliente, conseillère financière à Singapour. Deux volets : un site vitrine qui génère les leads, et un back-office qui suit chaque lead jusqu'à sa conversion en client. La finance est un domaine sensible : la conformité PDPA et la protection des données personnelles sont des contraintes de départ, pas des finitions.",
      ],
      en: [
        "Built for a first client, a financial adviser in Singapore. Two parts: a marketing site that generates leads, and a back office that follows each lead through to becoming a client. Finance is a sensitive domain: PDPA compliance and personal-data protection are starting constraints, not finishing touches.",
      ],
    },
    role: {
      fr: ["Conception et développement, seul, sur un cahier des charges itéré avec la cliente."],
      en: ["Design and development, alone, on a requirements document iterated with the client."],
    },
    approach: {
      fr: [
        "Un cycle Lead, Prospect, Client avec suivi et rendez-vous, un quiz de profil investisseur à scoring pondéré, un blog conçu pour le référencement, et un module d'évaluation de psychologie financière réservé au conseiller. Des choix de MVP assumés, deux rôles seulement, et l'administrateur ne voit jamais les données personnelles en clair.",
      ],
      en: [
        "A Lead, Prospect, Client cycle with follow-up and appointments, a weighted-scoring investor-profile quiz, a blog built for search, and a financial-psychology assessment module reserved for the adviser. Deliberate MVP choices, two roles only, and the administrator never sees personal data in the clear.",
      ],
    },
    outcome: {
      fr: ["En production."],
      en: ["In production."],
    },
    stack: ["FastAPI", "PostgreSQL", "Alembic", "React", "Vite", "Next.js", "next-intl", "Cloudflare R2", "Twilio", "pyvips"],
    links: { live: "https://myadvisor.sg" },
  },
  {
    slug: "beezb",
    kind: "perso",
    period: "2025 — ",
    order: 2025.9,
    org: { fr: "Genius Brio · Asie du Sud-Est", en: "Genius Brio · South-East Asia" },
    title: "BeezB",
    summary: {
      fr: "Une application mobile de missions ponctuelles en Asie du Sud-Est, où je pilote le produit et une équipe de développeurs.",
      en: "A gig-work mobile app in South-East Asia, where I lead the product and a team of developers.",
    },
    context: {
      fr: [
        "Beez met en relation trois acteurs : les giggers qui travaillent, les entreprises qui publient des missions, et les consommateurs par un parcours de bons d'achat. Le modèle est salarié et multi-pays, ce qui met les flux de paiement au centre de tout.",
      ],
      en: [
        "Beez connects three parties: giggers who work, companies that post missions, and consumers through a voucher journey. The model is employee-based and multi-country, which puts payment flows at the centre of everything.",
      ],
    },
    role: {
      fr: ["Membre de la direction produit et stratégie, en charge du pilotage d'une équipe de plusieurs développeurs."],
      en: ["Member of the product and strategy leadership, in charge of steering a team of several developers."],
    },
    approach: {
      fr: [
        "Cadrer le produit avant de le construire : les parcours clés traduits en user stories pour l'équipe, le flux de paiement clarifié avec les parties prenantes et formalisé pour les équipes tech et produit, puis les arbitrages techniques sur les moyens de paiement.",
      ],
      en: [
        "Frame the product before building it: the key journeys translated into user stories for the team, the payment flow clarified with stakeholders and formalised for the tech and product teams, then the technical decisions on payment methods.",
      ],
    },
    outcome: {
      fr: ["En développement."],
      en: ["In development."],
    },
    stack: ["React Native", "PayNow", "OpenProject"],
  },
];

export const SORTED_PROJECTS = [...PROJECTS].sort((a, b) => b.order - a.order);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export function neighbours(slug: string) {
  const i = SORTED_PROJECTS.findIndex((p) => p.slug === slug);
  return {
    previous: i > 0 ? SORTED_PROJECTS[i - 1] : null,
    next: i >= 0 && i < SORTED_PROJECTS.length - 1 ? SORTED_PROJECTS[i + 1] : null,
  };
}
