import type { Lang } from "@/lib/i18n";

type L = Record<Lang, string>;

type LP = Record<Lang, string[]>;

export type Role = {
  /** "2024 — " for the current position; "2023 — 2024"; or a single year. */
  period: string;
  /** Optional precision beside the years, e.g. "mars — août". */
  months?: L;
  /** Set for the current position; renders the “present” marker. */
  current?: boolean;
  /** An internship: the years field says so instead of an end year. */
  internship?: boolean;
  /** A real company name is the same in both languages — write it twice. */
  org: L;
  /** City. Empty means it is not shown. */
  location?: L;
  title: L;
  /** One line, used where the role is mentioned in passing (the statement band). */
  summary: L;
  /** The story, as paragraphs. The first one is set as a lead. */
  description: LP;
  /** What was actually done, one line each. */
  missions: LP;
  stack: string[];
  sample?: boolean;
};

export type Study = {
  period: string;
  /** A real school name is the same in both languages — write it twice. */
  school: L;
  city: L;
  title: L;
  /** One short line about the programme, shown beside the degree. */
  note: L;
  sample?: boolean;
};

/** From the CV, 2026-09-08. Most recent first. */
export const ROLES: Role[] = [
  {
    period: "2024 — ",
    current: true,
    org: { fr: "Artibox", en: "Artibox" },
    location: { fr: "", en: "" },
    title: { fr: "Développeur fullstack", en: "Fullstack Developer" },
    summary: {
      fr: "Deux produits pour le BTP : un CRM historique à maintenir et faire évoluer, une place de marché à développer.",
      en: "Two products for the construction trade: a legacy CRM to maintain and evolve, a marketplace to develop.",
    },
    description: {
      fr: [
        "Deux produits pour un même secteur, le bâtiment : Devibox, un CRM historique à maintenir et faire évoluer, et Artibox, une place de marché à développer.",
        "Artibox, société du portefeuille du fonds d'investissement Naxicap, édite des logiciels pour le BTP : Devibox gère les réseaux de franchises du devis à la comptabilité, Artibox met leurs appels d'offres en relation avec des artisans. Les deux s'enchaînent, et c'est avec cette chaîne en tête que j'interviens.",
        "Sur Devibox, le run m'a donné une connaissance complète de l'application, sur laquelle se sont appuyés les chantiers structurants : la refonte intégrale de l'application, interface et API réécrites au propre, de la conception au développement, motivée par un CRM vieillissant dont l'ergonomie pesait sur la productivité de tout un réseau ; puis l'internationalisation vers quatre nouveaux pays, avec leurs règles de facturation et leurs devises.",
        "Sur Artibox, l'enjeu est l'activité des artisans sur la plateforme : abonnements multi-plan, badges et récompenses, bannières d'incitation configurables, campagnes d'e-mails et de notifications construites sur des segments communs. Chaque artisan actif augmente la probabilité qu'un appel d'offres aboutisse.",
        "L'intelligence artificielle a transformé nos méthodes de travail sur ces deux années. J'ai été proactif sur la veille et l'adoption : règles et skills partagés, accompagnement de l'équipe sur Cursor et Claude, et évolution du processus de développement des fonctionnalités, avec des gains mesurables en vitesse de livraison, en couverture de tests et en autonomie.",
      ],
      en: [
        "Two products for one sector, construction: Devibox, a legacy CRM to maintain and evolve, and Artibox, a marketplace to develop.",
        "Artibox, a portfolio company of the investment fund Naxicap, builds software for the construction industry: Devibox runs franchise networks from quote to accounting, Artibox connects their calls for tender with tradespeople. The two chain together, and I work with that chain in mind.",
        "On Devibox, run gave me a complete knowledge of the application, on which the structural projects were built: the full rebuild of the application, interface and APIs rewritten cleanly, from concept to code, driven by an ageing CRM whose ergonomics weighed on the productivity of an entire network; then internationalisation to four new countries, with their invoicing rules and currencies.",
        "On Artibox, the stake is tradespeople's activity on the platform: multi-plan subscriptions, badges and rewards, configurable incentive banners, e-mail and notification campaigns built on shared segments. Every active tradesperson raises the odds that a tender finds a taker.",
        "Artificial intelligence transformed our working methods over these two years. I was proactive in watching and adopting it: shared rules and skills, onboarding the team on Cursor and Claude, and an evolution of the feature development process, with measurable gains in delivery speed, test coverage and autonomy.",
      ],
    },
    missions: {
      fr: [
        "Refonte complète de Devibox, interface et back-office : conception, design, réécriture des API et développement.",
        "Automatisations et outils internes développés pour améliorer la productivité des équipes.",
        "Refonte des commissions mandataires, optimisation SQL, migrations de données, parcours utilisateurs simplifiés.",
        "DevOps : infrastructure AWS et chaîne de déploiement, environnements, intégration et livraison continues, tests.",
        "Artibox : abonnements multi-plan, gamification, bannières d'incitation, campagnes mailing et push par segments.",
        "Tests end-to-end Playwright ; workflows IA dans les produits et dans l'équipe ; run sur 13 projets.",
      ],
      en: [
        "Full rebuild of Devibox, interface and back office: concept, design, API rewrite and development.",
        "Automations and internal tools built to improve the teams' productivity.",
        "Rebuilt agent commissions, SQL optimisation, data migrations, simpler user journeys.",
        "DevOps: AWS infrastructure and delivery pipeline, environments, continuous integration and delivery, tests.",
        "Artibox: multi-plan subscriptions, gamification, incentive banners, e-mail and push campaigns on segments.",
        "Playwright end-to-end tests; AI workflows in the products and the team; run across 13 projects.",
      ],
    },
    stack: ["PHP", "Symfony", "Flutter", "Next.js", "React", "JavaScript", "AWS", "Docker", "GitLab CI", "DocuSign", "Stripe", "LLM", "Cursor", "MariaDB"],
  },
  {
    period: "2023 — 2024",
    org: { fr: "One Prev", en: "One Prev" },
    location: { fr: "", en: "" },
    title: { fr: "Software Engineer", en: "Software Engineer" },
    summary: {
      fr: "Seul développeur d'une application mobile de prévention santé, de zéro à la production en six mois.",
      en: "Sole developer of a mobile health-prevention app, from zero to production in six months.",
    },
    description: {
      fr: [
        "Une startup qui part de zéro, une application de prévention santé, et un seul développeur entre la roadmap et le produit.",
        "One Prev développait une application mobile de prévention santé de premier niveau. Cinq dimensions, la santé, le mental et le bien-être au travail, l'alimentation, le sommeil et le sport, dont les données sont corrélées pour faire émerger des analyses de risque. Pour épargner la saisie à l'utilisateur, elle était conçue pour s'appuyer sur les données de santé du téléphone et de l'Apple Watch, une intégration alors à l'étude.",
        "Seul développeur, j'ai traduit la roadmap et les besoins définis par le CEO et le CPO en spécifications techniques, et porté la conception de bout en bout, de l'architecture au design. Six mois ont séparé la première ligne de code de la mise en production : le produit a existé en ligne bien avant d'être complet.",
        "Associé à la stratégie, j'y ai fait l'expérience des enjeux d'un projet qui commence : arbitrer ce qui est livrable dans le délai, décider ce que l'on ne fait pas, et tenir une architecture capable de grandir sans avoir été construite pour tout.",
      ],
      en: [
        "A startup starting from zero, a health-prevention app, and a single developer between the roadmap and the product.",
        "One Prev was building a first-level health-prevention mobile app. Five dimensions, health, mental well-being including at work, nutrition, sleep and sport, whose data is correlated to surface risk analyses. To spare the user any data entry, it was designed to draw on the phone's health data and the Apple Watch, an integration then under study.",
        "As the sole developer, I translated the roadmap and the needs set by the CEO and CPO into technical specifications, and carried the design end to end, from architecture to UI. Six months separated the first line of code from production: the product was live well before it was complete.",
        "Involved in strategy, I learned first-hand what an early-stage project demands: deciding what can ship within the deadline, deciding what not to build, and keeping an architecture able to grow without having been built for everything.",
      ],
    },
    missions: {
      fr: [
        "Traduction de la roadmap et des besoins CEO/CPO en spécifications techniques, avec arbitrage sur le périmètre.",
        "Conception de l'architecture et du design de l'application.",
        "Modèle de données croisant cinq dimensions de santé pour produire des analyses de risque.",
        "Étude de l'intégration des données de santé du téléphone et de l'Apple Watch.",
        "Mise en production en six mois, du zéro au premier déploiement.",
      ],
      en: [
        "Translation of the CEO/CPO roadmap and needs into technical specifications, with scope decisions.",
        "Design of the application's architecture and UI.",
        "Data model crossing five health dimensions to produce risk analyses.",
        "Study of the integration of the phone's health data and the Apple Watch.",
        "Production in six months, from zero to the first deployment.",
      ],
    },
    stack: ["Symfony", "Python", "React", "Flutter", "PostgreSQL", "AWS"],
  },
  {
    period: "2023",
    months: { fr: "mars — août", en: "March — August" },
    internship: true,
    org: { fr: "Air Liquide Santé", en: "Air Liquide Santé" },
    location: { fr: "", en: "" },
    title: { fr: "Data Scientist", en: "Data Scientist" },
    summary: {
      fr: "Cartographie d'un marché à partir de données publiques, scoring ML, tableaux de bord Power BI.",
      en: "Mapping a market from public data, ML scoring, Power BI dashboards.",
    },
    description: {
      fr: [
        "Six mois de projet exploratoire au pôle santé d'Air Liquide, où des données publiques deviennent une lecture du marché de la santé à domicile.",
        "Air Liquide Santé accompagne des patients à domicile, pour l'apnée du sommeil ou le diabète notamment. Au sein de l'équipe des projets exploratoires, j'ai travaillé sur la cartographie de ce marché à partir de données publiques : depuis quelques acteurs connus, reconstruire de proche en proche les réseaux de sociétés en analysant les liens entre entreprises et dirigeants, puis pondérer chaque société avec l'algorithme PageRank. La collecte, jusque-là manuelle à raison de dix heures par semaine, a été automatisée en Python et Selenium et ramenée à vingt minutes par jour.",
        "Le nettoyage des faux positifs a été un travail à part entière, parce qu'un réseau reconstruit ne vaut que par la fiabilité de ses liens. Résultat : 322 entreprises rattachées, à 92 % de précision, et une lecture des mouvements du secteur, acquisitions et couverture du territoire, pour les équipes d'analyse stratégique.",
        "J'ai ensuite croisé ce réseau avec la base publique Transparence Santé, qui recense les liens d'intérêts entre entreprises et professionnels de santé, et développé un scoring ML pour estimer la solidité des relations avec les praticiens partenaires. L'ensemble se lit dans des tableaux de bord Power BI interactifs, construits pour quatre équipes du pôle.",
      ],
      en: [
        "Six months of exploratory work in Air Liquide's health division, where public data becomes a reading of the home-healthcare market.",
        "Air Liquide Santé cares for patients at home, notably for sleep apnea and diabetes. Within the exploratory-projects team, I worked on mapping that market from public data: starting from a few known players, rebuilding company networks step by step by analysing the links between companies and their executives, then weighting each company with the PageRank algorithm. The collection, until then ten hours a week by hand, was automated in Python and Selenium and brought down to twenty minutes a day.",
        "Cleaning the false positives was a job in itself, because a rebuilt network is only worth the reliability of its links. The result: 322 companies attached at 92% precision, and a reading of the sector's movements, acquisitions and territorial coverage, for the strategic analysis teams.",
        "I then crossed this network with the public Transparence Santé database, which records ties between companies and healthcare professionals, and built an ML score to estimate the strength of relationships with partner practitioners. All of it reads in interactive Power BI dashboards, built for four teams of the division.",
      ],
    },
    missions: {
      fr: [
        "Collecte automatisée de données publiques en Python et Selenium : une veille de 10 h par semaine ramenée à 20 minutes par jour.",
        "Reconstruction des réseaux de sociétés du secteur, pondération PageRank et nettoyage des faux positifs : 322 entreprises, 92 % de précision.",
        "Croisement avec la base Transparence Santé et scoring ML de la solidité des relations avec les professionnels de santé.",
        "Tableaux de bord Power BI interactifs pour quatre équipes du pôle santé.",
      ],
      en: [
        "Automated collection of public data in Python and Selenium: ten hours a week of monitoring brought down to twenty minutes a day.",
        "Reconstruction of the sector's company networks, PageRank weighting and false-positive cleaning: 322 companies, 92% precision.",
        "Cross-referencing with the Transparence Santé database and ML scoring of relationship strength with healthcare professionals.",
        "Interactive Power BI dashboards for four teams of the health division.",
      ],
    },
    stack: ["Python", "pandas", "scikit-learn", "NetworkX", "Selenium", "Power BI"],
  },
];

/** The first entry is the one the Education panel builds; the rest are listed under it. */
export const STUDIES: Study[] = [
  {
    period: "2018 — 2023",
    school: { fr: "Epitech", en: "Epitech" },
    city: { fr: "Paris", en: "Paris" },
    title: {
      fr: "Master d'expert en technologies de l'information",
      en: "Master's degree, Expert in information technology",
    },
    note: {
      fr: "Programme Grande École, cinq ans, projets en continu",
      en: "Five-year Grande École programme, project-based throughout",
    },
  },
  {
    period: "2015 — 2018",
    school: { fr: "Lycée Wolfgang Amadeus Mozart", en: "Lycée Wolfgang Amadeus Mozart" },
    city: { fr: "", en: "" },
    title: { fr: "Baccalauréat scientifique", en: "Baccalauréat, sciences track" },
    note: { fr: "", en: "" },
  },
];

export type SkillGroup = {
  /** The capability, as something you can do. */
  title: L;
  /** One sentence, first person: how it shows in the work, and why it matters. */
  statement: L;
  /** The tools behind it, in small type. */
  items: Record<Lang, string[]>;
};

/** Drawn from every role and project on the site. Capabilities first, tools second. */
export const SKILLS: SkillGroup[] = [
  {
    title: { fr: "Traduire un besoin métier en produit", en: "Turn a business need into a product" },
    statement: {
      fr: "Je passe du temps avec les gens qui ont le besoin avant d'écrire une ligne : comprendre le métier, poser les bonnes questions, traduire une intention en spécifications que l'on peut construire. Le code vient après la compréhension.",
      en: "I spend time with the people who have the need before writing a line: understanding the business, asking the right questions, turning an intent into specifications that can be built. Code comes after understanding.",
    },
    items: {
      fr: ["Cadrage", "User stories", "Spécifications techniques", "Ateliers avec le métier"],
      en: ["Framing", "User stories", "Technical specifications", "Workshops with the business"],
    },
  },
  {
    title: { fr: "Concevoir une interface qu'on n'a pas à expliquer", en: "Design an interface that needs no explaining" },
    statement: {
      fr: "L'ergonomie n'est pas un vernis posé à la fin. Je maquette avant de coder, je compte les clics qu'une action demande, et je tiens qu'une interface réussie est celle que personne n'a besoin d'expliquer.",
      en: "Usability is not a varnish applied at the end. I mock up before I code, I count the clicks an action takes, and I hold that a successful interface is one nobody needs to explain.",
    },
    items: {
      fr: ["Design UI/UX", "Figma", "Maquettes et prototypes", "Design system", "Accessibilité", "Motion"],
      en: ["UI/UX design", "Figma", "Mockups and prototypes", "Design system", "Accessibility", "Motion"],
    },
  },
  {
    title: { fr: "Construire un produit de bout en bout", en: "Build a product end to end" },
    statement: {
      fr: "Architecture, back-end, interface, déploiement : je livre des produits entiers, du zéro à la production, et je sais ce que chaque couche coûte à la suivante.",
      en: "Architecture, back end, interface, deployment: I ship whole products, from zero to production, and I know what each layer costs the next.",
    },
    items: {
      fr: ["PHP", "Symfony", "Python", "FastAPI", "Node.js", "React", "Next.js", "TypeScript", "Flutter", "React Native", "PostgreSQL", "MariaDB", "MongoDB"],
      en: ["PHP", "Symfony", "Python", "FastAPI", "Node.js", "React", "Next.js", "TypeScript", "Flutter", "React Native", "PostgreSQL", "MariaDB", "MongoDB"],
    },
  },
  {
    title: { fr: "Faire vivre un produit en production", en: "Keep a product alive in production" },
    statement: {
      fr: "Un produit en production se maintient au quotidien : qualifier un ticket vite et bien, corriger un bug sans en créer un autre, suivre les failles de sécurité et mettre à jour les dépendances avant qu'elles ne deviennent un risque, et arbitrer entre ce qui doit être réglé maintenant et ce qui peut attendre.",
      en: "A product in production is maintained every day: triaging a ticket fast and well, fixing a bug without creating another, tracking security vulnerabilities and updating dependencies before they become a risk, and deciding between what must be fixed now and what can wait.",
    },
    items: {
      fr: ["AWS", "Docker", "Linux", "GitLab CI", "Supabase", "Cloudflare", "Tests Playwright", "Run et incidents"],
      en: ["AWS", "Docker", "Linux", "GitLab CI", "Supabase", "Cloudflare", "Playwright tests", "Run and incidents"],
    },
  },
  {
    title: { fr: "Automatiser ce qui coûte du temps aux équipes", en: "Automate what costs teams their time" },
    statement: {
      fr: "Je cherche la tâche répétitive qui occupe des gens, et je rends ce temps à ceux qui ont mieux à faire. L'IA en fait partie, comme outil de l'équipe autant que des produits.",
      en: "I look for the repetitive task that occupies people and give that time back to those who have better things to do. AI is part of it, as a tool for the team as much as for the products.",
    },
    items: {
      fr: ["Python", "Selenium", "OCR", "Workflows IA et LLM", "Cursor", "Stripe", "DocuSign", "Twilio"],
      en: ["Python", "Selenium", "OCR", "AI and LLM workflows", "Cursor", "Stripe", "DocuSign", "Twilio"],
    },
  },
  {
    title: { fr: "Faire parler les données", en: "Make data speak" },
    statement: {
      fr: "La donnée est ce qui permet à une équipe de décider sur autre chose qu'une intuition : mesurer ce qu'un produit fait vraiment, comprendre un marché, repérer ce qui change avant qu'il ne soit trop tard. Je la collecte, je la nettoie et je la modélise pour qu'elle réponde à une question business, et je la présente de façon à ce qu'une décision puisse s'appuyer dessus.",
      en: "Data is what lets a team decide on something other than a hunch: measure what a product really does, understand a market, spot what is changing before it is too late. I collect it, clean it and model it so that it answers a business question, and present it so that a decision can rest on it.",
    },
    items: {
      fr: ["pandas", "scikit-learn", "NetworkX", "Scraping", "Power BI"],
      en: ["pandas", "scikit-learn", "NetworkX", "Scraping", "Power BI"],
    },
  },
  {
    title: { fr: "Piloter un projet", en: "Steer a project" },
    statement: {
      fr: "Cadrer, prioriser, arbitrer le périmètre livrable, suivre l'avancement et le présenter aux parties prenantes. Tenir les délais est une décision prise tôt, pas une course à la fin.",
      en: "Frame, prioritise, decide the deliverable scope, follow progress and present it to stakeholders. Meeting a deadline is a decision made early, not a sprint at the end.",
    },
    items: {
      fr: ["Gestion de projet", "Arbitrage de périmètre", "Documentation", "Notion", "Slack"],
      en: ["Project management", "Scope decisions", "Documentation", "Notion", "Slack"],
    },
  },
  {
    title: { fr: "Langues", en: "Languages" },
    statement: { fr: "", en: "" },
    items: {
      fr: ["Français", "Anglais · B2", "Tamoul · C1"],
      en: ["French", "English · B2", "Tamil · C1"],
    },
  },
];
