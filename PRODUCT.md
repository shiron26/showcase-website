# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js / React — chosen by the user in the init interview. Static-export friendly portfolio; bilingual FR/EN routing required (see Capabilities).

## Users

Primary: **technical recruiters, engineering managers, CTOs and lead engineers** evaluating Shiron BESKIWIN for a software engineering role. They arrive from a CV, a LinkedIn message, a GitHub profile or a job application, usually on desktop during a screening session, sometimes on mobile between meetings. Their job is to decide within a few minutes whether this candidate is worth an interview, and to find evidence they can quote to someone else.

Secondary: **peers and potential collaborators** arriving from a shared link, browsing projects out of curiosity.

## Product Purpose

A personal showcase site that doubles as a CV. It lists every project Shiron has shipped — professional and personal — and gives each one enough context that a stranger can judge the work without a conversation. Success is a visitor who leaves having (a) understood what Shiron builds, and (b) taken one of the four confirmed actions: sent an email, downloaded the CV PDF, opened GitHub/LinkedIn, or read a project in depth.

## Positioning

Fullstack / product engineer: the through-line is **problem → shipped product**, not a stack list. Projects are presented end-to-end — the problem, the role held, the decisions made, the outcome — rather than as a grid of logos. Professional and personal work sit in the same catalogue, deliberately: the personal projects are evidence of self-direction, not filler.

## Operating Context

- Evaluated in short screening sessions, often with several other candidate sites open in adjacent tabs.
- Frequently reached deep-linked (a single project URL shared in a thread), so every project page must stand alone.
- Read in French by the FR market and in English by international recruiters; the same visitor never needs both.
- The site is the canonical index; GitHub and LinkedIn are corroborating sources, not substitutes.

## Capabilities and Constraints

- **Project catalogue** — every professional and personal project, filterable/browsable, each with its own detail page (confirmed CTA: "explore a project in depth").
- **CV**: downloadable PDF. The PDF itself is not yet provided; the site must wire the slot and degrade gracefully.
- **Contact**: direct email as the primary action. No form/backend confirmed.
- **External profiles**: GitHub and LinkedIn links.
- **Bilingual FR / EN**: full content parity, explicit language switch, language-scoped routes.
- **No backend confirmed.** Static hosting is the assumption until the user says otherwise.

### Undecided / open

- Contact email address, GitHub URL, LinkedIn URL, city — **not yet supplied**. Centralised as clearly marked TODO placeholders in one content file.
- Exact job title Shiron wants under his name — not supplied; a neutral fullstack-engineer title is used as a labelled placeholder.
- Domain name and hosting target.
- Whether any professional project is under NDA and must be anonymised.

## Brand Commitments

- Name displayed on the site: **Shiron BESKIWIN** (confirmed).
- The user stated three binding intents for this site: design quality matters deeply to him, the result must feel **elegant** and **"à son image"** (personal, not generic), and the site must be **unique** — not a recognisable portfolio template.
- No existing logo, palette, typeface or asset was supplied; nothing pre-existing constrains the visual world.

## Evidence on Hand

**None yet.** The user has no written project list, no project visuals, no CV file and no metrics at hand. All project entries, screenshots, dates, roles and results shipped in the first version are placeholders and must be clearly marked as such in the content layer. Nothing about Shiron's employers, clients, results, numbers or testimonials may be invented as fact.

## Product Principles

1. **Evidence over adjectives.** Every claim on the site should be traceable to a project, a repository or an artefact. No unsourced superlatives.
2. **Each project stands alone.** A deep-linked project page must give context, role and outcome without the home page.
3. **One catalogue, two origins.** Professional and personal projects share the same presentation quality; the distinction is metadata, not a hierarchy.
4. **The decision is fast.** A screening visitor gets the "who and what" within the first viewport; depth is available, never mandatory.
5. **Content is swappable.** Because real content is not yet available, the structure must survive placeholder text now and real text later without redesign.

## Accessibility & Inclusion

No product-specific requirement was established by the user. Default target: WCAG 2.2 AA — keyboard-operable navigation, visible focus, contrast-compliant text, and full respect of `prefers-reduced-motion` (relevant because the site is expected to be visually ambitious).

## Standing Design Preference

<!-- Revised 2026-09-08. The earlier preference recorded here is REVOKED by the user. -->

On 2026-09-07 the user was shown two hands of committed own-world directions and took the standing exit — the category standard, played straight. On 2026-09-08, seeing it built, he rejected it in his own words: **"On y est pas du tout"** and **"Le site actuel est beaucoup trop générique"**. That preference is dead and must not be re-applied.

**What replaces it — a pinned brief.** He supplied four reference sites and asked for a design that is épuré, modern and genuinely inventive:

- `https://gusta.studio/` — off-grid collage of tilted image cards on white, giant centred grotesque statements, floating circular mark.
- `https://dineshrevunuru.com/` — large-radius pastel-tinted panels, one colour family per project, serif display titles drawn from the panel's own hue, a full-bleed saturated close.
- `https://www.huuuuue.agency/` — full-bleed colour fields, huge uppercase grotesque with one contrasting italic serif word inside the headline, marquee ticker of names, oversized outlined type as texture.
- `https://www.ryanritzenthaler.com/` — white ground, name in enormous display type spanning the full width, a rotating circular badge, a counter preloader, a full-bleed keyword marquee, media treated as a warped object.

The shared mechanism, which is what binds future work: **display type as the primary content at absurd scale; two typefaces inside one headline; full-bleed colour fields rather than accents; a marquee band; a rotating badge; media treated as an object, never as a card.** A pinned brief beats the concept roll — future work honours this register rather than re-opening a direction round.

**Constraint the references cannot answer:** all four lean on real imagery. This project has none and no image generation. The creative load therefore sits on typography, colour fields, motion and layout, and the imagery slots stay wired for when real screenshots arrive.

**Theme:** light and dark both fully held with a selector, confirmed 2026-09-07 and still binding.
