import type { Lang } from "@/lib/i18n";

export type ProjectKind = "client" | "perso";

type L = Record<Lang, string>;
type LP = Record<Lang, string[]>;

export type Shot = {
  /** Path under `public/`, e.g. "/work/angie-collecte.png". */
  src: string;
  /** What the image shows. Used as the alt text and printed under the image. */
  caption: L;
  /** The file's pixel size, so the space is held before the image loads. */
  w?: number;
  h?: number;
};

export type Project = {
  slug: string;
  kind: ProjectKind;
  /** Displayed as-is. Use a range ("2023 — 2025") or a single year. */
  period: string;
  /** Sort key. Higher is more recent. */
  order: number;
  /** Who the work was for: the client, or "Personnel". Keep it short. */
  org: L;
  title: string;
  /** One line, read in the index. Say the outcome, not the category. */
  summary: L;
  context: LP;
  role: LP;
  approach: LP;
  outcome: LP;
  stack: string[];
  /**
   * Every link the project can offer. `live` and `source` carry translated
   * labels; anything else (a case study, a store listing, a demo video) goes in
   * `more` with its own label. Omit the key and its button is not rendered.
   */
  links?: {
    live?: string;
    source?: string;
    more?: { label: L; href: string }[];
  };
  /**
   * The images that illustrate the project, shown in their own ruled section
   * after the story. Leave it out and the section does not exist: a project
   * with nothing to show must never render an empty frame or a placeholder.
   */
  gallery?: Shot[];
  /** Marks the entry as sample content until you replace it. */
  sample?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE CATALOGUE: client work and personal projects, one entry each,
 *  every one with its own page. Employment (Artibox, One Prev, Air Liquide
 *  Santé) is told in chapters in content/cv.ts, not here.
 *
 *  Written from Shiron's notes on 2026-09-11.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const PROJECTS: Project[] = [
  {
    slug: "lyodge",
    kind: "client",
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
    links: { live: "https://minecamelot.com/" },
  },
  {
    slug: "angie",
    kind: "client",
    period: "2020 — 2021",
    order: 2021,
    org: { fr: "Angie · agence de communication", en: "Angie · communications agency" },
    title: "Angie",
    summary: {
      fr: "Des programmes Python qui traitent 5 000 à 10 000 profils Twitter et LinkedIn par étude, un volume que personne ne couvre à la main.",
      en: "Python programs that handle 5,000 to 10,000 Twitter and LinkedIn profiles per study, a volume nobody covers by hand.",
    },
    context: {
      fr: [
        "Angie est une agence de communication. Son pôle data conseille des personnalités publiques, des responsables politiques et des entreprises sur leur communication. Pour les conseiller, l'équipe a besoin de savoir ce qui se dit sur un sujet, qui le dit, et devant combien de personnes.",
        "Ces informations sont publiques, mais dispersées sur Twitter et LinkedIn, un profil à la fois. Une étude pouvait porter sur 5 000 à 10 000 profils. À la main, ce volume est hors de portée : sans programme pour le faire à la place de l'équipe, l'étude n'a tout simplement pas lieu.",
      ],
      en: [
        "Angie is a communications agency. Its data team advises public figures, political leaders and companies on their communication. To advise them, the team needs to know what is being said on a subject, who is saying it, and to how many people.",
        "That information is public, but scattered across Twitter and LinkedIn, one profile at a time. A study could cover 5,000 to 10,000 profiles. By hand, that volume is out of reach: without a program to do it for the team, the study simply does not happen.",
      ],
    },
    role: {
      fr: [
        "Ma première mission en freelance, obtenue après un stage dans la même équipe. J'étais seul sur le sujet. J'ai écrit les programmes qui récupèrent les informations, je les ai nettoyées et mises au même format, puis j'ai automatisé les étapes qui revenaient à chaque étude.",
      ],
      en: [
        "My first freelance mission, won after an internship in the same team. I was alone on it. I wrote the programs that collect the information, cleaned the data and put it in a single format, then automated the steps that came back with every study.",
      ],
    },
    approach: {
      fr: [
        "J'ai tout développé en Python.",
        "La vitesse d'abord. Traités un par un, 10 000 profils demandent bien trop de temps. J'ai mesuré où ce temps se perdait, puis j'ai fait traiter plusieurs profils en même temps. C'est ce qui rend une étude de cette taille réalisable dans les délais de l'agence.",
        "La fiabilité ensuite. Twitter et LinkedIn limitent la récupération automatique et modifient souvent leurs pages. Le programme espace donc ses demandes, reprend là où il s'est arrêté après une coupure, et je l'adaptais dès qu'une page changeait.",
        "La qualité enfin. Les informations récupérées arrivent en désordre. Je supprimais les doublons et j'alignais les formats des deux réseaux, pour que l'équipe travaille sur un seul fichier propre plutôt que sur deux exports à recoller.",
      ],
      en: [
        "Everything was built in Python.",
        "Speed first. Handled one after another, 10,000 profiles take far too long. I measured where that time was going, then had the program handle several profiles at once. That is what makes a study of this size fit the agency's deadlines.",
        "Reliability next. Twitter and LinkedIn limit automated collection and change their pages often. So the program spaces out its requests, restarts where it stopped after an interruption, and I adapted it whenever a page changed.",
        "Quality last. Collected information arrives messy. I removed duplicates and aligned the formats of both networks, so the team worked from one clean file instead of two exports to stitch together.",
      ],
    },
    outcome: {
      fr: [
        "Des études que le pôle data ne pouvait pas mener sont devenues possibles. Analyser 5 000 profils n'était pas une question de temps, c'était hors d'atteinte.",
        "Les étapes répétées à chaque étude tournent sans intervention, et l'équipe reçoit des données directement exploitables.",
      ],
      en: [
        "Studies the data team could not run became possible. Analysing 5,000 profiles was never a matter of time, it was out of reach.",
        "The steps repeated on every study run without anyone touching them, and the team receives data it can use straight away.",
      ],
    },
    stack: ["Python", "Scraping", "Twitter", "LinkedIn"],
  },
  {
    slug: "clarity",
    kind: "perso",
    period: "2026 — ",
    order: 2026.5,
    org: { fr: "Personnel", en: "Personal" },
    title: "Clarity",
    summary: {
      fr: "Une liste de tâches construite autour des objectifs de l'année et du trimestre, pour voir si ce qu'on fait aujourd'hui y mène.",
      en: "A to-do list built around the year's and the quarter's goals, to see whether what you do today leads there.",
    },
    context: {
      fr: [
        "Les listes de tâches gèrent bien la journée. Elles ne disent rien de l'année : on coche beaucoup sans savoir si on avance sur ce qu'on s'était fixé.",
        "Clarity part de l'autre bout : il prend les objectifs qu'on s'est donnés pour l'année, et fait descendre tout le reste à partir de là.",
      ],
      en: [
        "To-do lists handle the day well. They say nothing about the year: you tick a lot without knowing whether you are moving on what you set out to do.",
        "Clarity starts from the other end: it takes the goals you set for the year, and everything else comes down from there.",
      ],
    },
    role: {
      fr: [
        "Conçu et développé avec un ami. La spécification écrite avant le code, et les maquettes à part.",
      ],
      en: [
        "Designed and built with a friend. The specification written before the code, and the mockups apart from it.",
      ],
    },
    approach: {
      fr: [
        "L'objectif d'abord, la tâche ensuite. On ne crée pas une tâche seule : elle se rattache à un jalon du trimestre, qui se rattache à un objectif de l'année. La liste de la semaine est donc toujours la conséquence de quelque chose.",
        "Trois horizons, trois revues. Chaque semaine pour la semaine, chaque trimestre pour le jalon, chaque année pour l'objectif. C'est là que se voit l'écart entre ce qu'on avait prévu et ce qu'on a fait.",
        "L'UX avant les fonctionnalités. Une application qu'on ouvre tous les jours n'a droit à aucun frottement : une routine ne tient que si elle est facile. La navigation est dessinée pour que ranger une tâche ou faire sa revue demande le moins de gestes possible.",
        "Une vraie application sur le téléphone. Clarity est une PWA : elle s'ajoute à l'écran d'accueil depuis le navigateur, sans passer par un store, et s'ouvre en plein écran. L'interface mobile suit les conventions du mobile, elle n'est pas une version rétrécie du bureau.",
        "Les données restent privées. Tout est derrière un compte et chiffré en base, avec un modèle de menace écrit : ce que l'application protège, contre qui, et ce qu'elle ne protège pas.",
      ],
      en: [
        "The goal first, the task after. You do not create a task on its own: it hangs off a quarterly milestone, which hangs off a goal for the year. The week's list is therefore always the consequence of something.",
        "Three horizons, three reviews. Every week for the week, every quarter for the milestone, every year for the goal. That is where the gap shows between what was planned and what was done.",
        "UX before features. An app you open every day can afford no friction: a routine only holds if it is easy. The navigation is drawn so that filing a task or running a review takes the fewest moves possible.",
        "A real app on the phone. Clarity is a PWA: it is added to the home screen straight from the browser, with no app store in between, and opens full screen. The mobile interface follows mobile conventions; it is not a shrunken desktop.",
        "The data stays private. Everything sits behind an account and is encrypted in the database, with a written threat model: what the app protects, against whom, and what it does not.",
      ],
    },
    outcome: {
      fr: [
        "En production. Nous l'utilisons tous les jours, et quelques personnes de notre entourage aussi.",
      ],
      en: [
        "In production. We use it every day, and a few people around us do too.",
      ],
    },
    stack: ["React", "Vite", "TanStack Router", "TanStack Query", "Supabase", "PostgreSQL", "pgcrypto", "Zustand", "PWA", "Next.js", "Tailwind", "Claude Design"],
    links: { live: "https://clarity-v2-cuqb.vercel.app/login" },
    gallery: [
      {
        src: "/work/clarity-1-connexion.webp",
        caption: {
          fr: "L'écran de connexion. Tout est derrière un compte.",
          en: "The sign-in screen. Everything sits behind an account.",
        },
        w: 2000,
        h: 1385,
      },
      {
        src: "/work/clarity-2-dashboard.webp",
        caption: {
          fr: "Le tableau de bord : les objectifs en haut, la semaine en cours, les idées à trier, et l'année qui avance.",
          en: "The dashboard: the goals at the top, the current week, ideas waiting to be sorted, and the year going by.",
        },
        w: 2000,
        h: 1343,
      },
      {
        src: "/work/clarity-3-taches.webp",
        caption: {
          fr: "La liste des tâches, filtrée par aujourd'hui, par la semaine, ou sans date.",
          en: "The task list, filtered by today, by the week, or with no date.",
        },
        w: 2000,
        h: 1331,
      },
      {
        src: "/work/clarity-4-nouvelle-tache.webp",
        caption: {
          fr: "La création d'une tâche : on choisit l'objectif auquel elle se rattache avant la liste et l'échéance.",
          en: "Creating a task: you pick the goal it hangs off before the list and the due date.",
        },
        w: 2000,
        h: 1538,
      },
      {
        src: "/work/clarity-5-annee.webp",
        caption: {
          fr: "La vue de l'année : chaque objectif semaine par semaine, et les quatre trimestres avec leur bilan.",
          en: "The year view: each goal week by week, and the four quarters with their review.",
        },
        w: 2000,
        h: 1333,
      },
      {
        src: "/work/clarity-6-mobile-dashboard.webp",
        caption: {
          fr: "Le même tableau de bord sur téléphone, avec la barre d'onglets et le bouton d'ajout du mobile.",
          en: "The same dashboard on a phone, with the mobile tab bar and add button.",
        },
        w: 1210,
        h: 1858,
      },
      {
        src: "/work/clarity-7-mobile-tache.webp",
        caption: {
          fr: "La création d'une tâche sur téléphone, en feuille plein écran plutôt qu'en fenêtre.",
          en: "Creating a task on a phone, as a full-screen sheet rather than a dialog.",
        },
        w: 1204,
        h: 1846,
      },
    ],
  },
  {
    slug: "myadvisor",
    kind: "client",
    period: "2026 — ",
    order: 2026.3,
    org: { fr: "Conseillère financière · Singapour", en: "Financial adviser · Singapore" },
    title: "MyAdvisor",
    summary: {
      fr: "Le site d'une conseillère financière à Singapour, piloté par un CMS sur mesure qui gère aussi ses articles et les clients qu'elle y gagne.",
      en: "The site of a financial adviser in Singapore, driven by a bespoke CMS that also handles her articles and the clients she wins through it.",
    },
    context: {
      fr: [
        "La cliente est conseillère financière à Singapour. Elle avait besoin d'un site qui lui amène des clients, et de pouvoir le faire vivre seule ensuite.",
        "La finance est un domaine sensible. À Singapour, la protection des données personnelles est encadrée par la loi, la PDPA. C'est une contrainte de départ, pas une finition.",
      ],
      en: [
        "The client is a financial adviser in Singapore. She needed a site that brings her clients, and the means to keep it alive on her own afterwards.",
        "Finance is a sensitive field. In Singapore, personal data protection is set by law, the PDPA. That is a starting constraint, not a finishing touch.",
      ],
    },
    role: {
      fr: [
        "Conception et développement sur un cahier des charges itéré avec la cliente. J'assure aussi le run de la plateforme en production.",
      ],
      en: [
        "Design and development on a requirements document iterated with the client. I also run the platform in production.",
      ],
    },
    approach: {
      fr: [
        "Un CMS sur mesure. La cliente modifie son site, publie ses articles et suit les contacts qui arrivent, de la première prise de contact jusqu'au client signé. Elle n'a pas besoin de moi pour ça.",
        "Le référencement dès le départ. Le blog est conçu pour la recherche, et chaque image envoyée est compressée et convertie au format adapté au web automatiquement, parce que leur poids pèse sur le classement.",
        "Deux environnements. La cliente valide en préproduction avant que quoi que ce soit parte en ligne. Les tests et les déploiements sont automatisés, donc une correction part le jour où elle est écrite.",
        "Tenir le produit en production. Un système de tickets pour qu'elle remonte un problème en quelques clics, des journaux applicatifs, une mesure d'audience auto-hébergée, des sauvegardes et une procédure de restauration.",
        "Les données personnelles. Elles sont chiffrées en base et seule la conseillère y accède : l'administrateur du site ne voit jamais les coordonnées de ses contacts en clair.",
      ],
      en: [
        "A bespoke CMS. The client edits her site, publishes her articles and follows the contacts coming in, from the first message through to a signed client. She does not need me for any of it.",
        "Search from the start. The blog is built for search, and every image uploaded is compressed and converted to a web format automatically, because their weight weighs on the ranking.",
        "Two environments. The client approves in pre-production before anything goes live. Tests and deployments are automated, so a fix ships the day it is written.",
        "Keeping it alive in production. A ticket system so she reports a problem in a few clicks, application logs, self-hosted analytics, backups and a restore procedure.",
        "Personal data. It is encrypted in the database and only the adviser can reach it: the site administrator never sees a contact's details in the clear.",
      ],
    },
    outcome: {
      fr: [
        "Le site est en ligne. La cliente le met à jour et suit ses contacts seule ; je reste sur le run et les évolutions.",
      ],
      en: [
        "The site is live. The client updates it and follows her contacts on her own; I stay on the run and what comes next.",
      ],
    },
    stack: ["Python", "FastAPI", "PostgreSQL", "Alembic", "React", "Vite", "Next.js", "next-intl", "Cloudflare R2", "Resend", "Umami", "Twilio", "pyvips"],
    links: { live: "https://myadvisor.sg" },
    gallery: [
      {
        src: "/work/myadvisor-accueil.webp",
        caption: {
          fr: "La page d'accueil, et la prise de rendez-vous dès la première ligne.",
          en: "The home page, with the booking entry from the first line.",
        },
        w: 2000,
        h: 1060,
      },
      {
        src: "/work/myadvisor-conseillere.webp",
        caption: {
          fr: "La présentation de la conseillère, puis l'entrée vers le questionnaire de comportement financier.",
          en: "The adviser's introduction, then the way in to the financial behaviour questionnaire.",
        },
        w: 2000,
        h: 1288,
      },
      {
        src: "/work/myadvisor-journal.webp",
        caption: {
          fr: "Le journal, filtrable par thème. Les articles sont écrits et publiés depuis le back-office.",
          en: "The journal, filterable by topic. Articles are written and published from the back office.",
        },
        w: 2000,
        h: 1267,
      },
      {
        src: "/work/myadvisor-article.webp",
        caption: {
          fr: "Un article, avec son sommaire et son image d'en-tête, compressée et convertie à l'envoi.",
          en: "An article, with its table of contents and its header image, compressed and converted on upload.",
        },
        w: 2000,
        h: 1376,
      },
      {
        src: "/work/myadvisor-article-fin.webp",
        caption: {
          fr: "La fin d'un article : mention légale, partage, présentation de l'autrice et retour vers le questionnaire.",
          en: "The end of an article: disclaimer, sharing, author card and a way back to the questionnaire.",
        },
        w: 2000,
        h: 1379,
      },
      {
        src: "/work/myadvisor-cms-blog.webp",
        caption: {
          fr: "Le back-office : la gestion des articles, avec un score de référencement par publication.",
          en: "The back office: article management, with a search score for each post.",
        },
        w: 2000,
        h: 1364,
      },
      {
        src: "/work/myadvisor-leads.webp",
        caption: {
          fr: "Les contacts dans le back-office. Les données personnelles sont masquées, et un onglet suit le consentement exigé par la PDPA.",
          en: "Contacts in the back office. Personal data is masked, and a tab tracks the consent the PDPA requires.",
        },
        w: 2000,
        h: 1378,
      },
    ],
  },
  {
    slug: "beezb",
    kind: "client",
    period: "2025 — ",
    order: 2025.9,
    org: { fr: "Genius Brio · Asie du Sud-Est", en: "Genius Brio · South-East Asia" },
    title: "BeezB",
    summary: {
      fr: "Une place de marché sur mobile entre particuliers et entreprises.",
      en: "A mobile marketplace between individuals and companies.",
    },
    context: {
      fr: [
        "BeezB est une place de marché sur mobile, en Asie du Sud-Est. Les entreprises y publient des missions, les particuliers les réalisent et sont payés.",
        "L'application ne s'arrête pas à la mise en relation : la contractualisation et les paiements se font dedans.",
      ],
      en: [
        "BeezB is a mobile marketplace in South-East Asia. Companies post gigs there, individuals carry them out and get paid.",
        "The app does not stop at the matching: contracts and payments happen inside it.",
      ],
    },
    role: {
      fr: [
        "La direction du produit sur un projet collaboratif : la stratégie, et les échanges avec le porteur du projet.",
        "Nous avons commencé à quatre. L'équipe s'est étoffée, et le design, les spécifications et une partie du développement sont passés à d'autres. J'ai beaucoup développé moi-même, surtout au début.",
      ],
      en: [
        "Product leadership on a collaborative project: the strategy, and the conversation with the project's founder.",
        "We started as four. The team grew, and the design, the specifications and part of the development passed to others. I did a lot of the development myself, especially at the start.",
      ],
    },
    approach: {
      fr: [
        "Cadrer avant de construire. Les parcours clés ont été traduits en user stories pour l'équipe, pour que chacun sache ce qu'il construit et pourquoi.",
        "Écrire le flux de paiement. Clarifié avec le porteur du projet, puis mis noir sur blanc pour les équipes technique et produit. C'est là que les erreurs coûtent le plus cher.",
        "Déléguer par lots entiers. Chaque personne a pris un domaine complet plutôt que des tâches isolées, ce qui ne tient que si le cadre est écrit avant.",
        "Tenir l'infrastructure. Plusieurs outils open source sont auto-hébergés sur un VPS en conteneurs, pour limiter les coûts du projet. Les livraisons passent par GitHub Actions, et les versions de test partent sur les stores pour être essayées sur de vrais téléphones.",
      ],
      en: [
        "Frame it before building it. The key journeys were turned into user stories for the team, so everyone knows what they are building and why.",
        "Write the payment flow down. Clarified with the founder, then set out in full for the tech and product teams. That is where mistakes cost the most.",
        "Delegate whole areas. Each person took a complete area rather than scattered tasks, which only holds if the frame is written first.",
        "Run the infrastructure. Several open-source tools are self-hosted on a VPS in containers, to keep the project's costs down. Releases go through GitHub Actions, and test builds go to the stores so the app is tried on real phones.",
      ],
    },
    outcome: {
      fr: ["L'application est en développement."],
      en: ["The app is in development."],
    },
    stack: ["React Native", "Hono", "Docker", "GitHub Actions", "VPS", "OpenProject"],
  },
];

export const SORTED_PROJECTS = [...PROJECTS].sort((a, b) => b.order - a.order);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

/**
 * The pagination at the foot of a project page reads in time, not in list
 * order: "précédent" is the project that came before this one, "suivant" the
 * one that came after. SORTED_PROJECTS runs newest first, so the older
 * neighbour is the next index and the newer one the previous index.
 */
export function neighbours(slug: string) {
  const i = SORTED_PROJECTS.findIndex((p) => p.slug === slug);
  if (i < 0) return { previous: null, next: null };
  return {
    previous: i < SORTED_PROJECTS.length - 1 ? SORTED_PROJECTS[i + 1] : null,
    next: i > 0 ? SORTED_PROJECTS[i - 1] : null,
  };
}
