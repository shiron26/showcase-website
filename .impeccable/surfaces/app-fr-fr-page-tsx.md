---
version: 1
slug: "app-fr-fr-page-tsx"
primary_target: "app/(fr)/fr/page.tsx"
related_targets: ["app/(en)/en/page.tsx","components/Home.tsx"]
---

## Scope

The whole public site: the bilingual home page (`/fr`, `/en`) and the project detail pages. Visitor mode: **Persuade** — the visitor decides whether to contact Shiron and acts.

## Audience and job

A technical recruiter, engineering manager or CTO, mid-screening, with other candidate tabs open. They decide in minutes whether this is worth an interview. Secondary: peers arriving deep-linked to one project.

## Action and proof

Four confirmed actions — email (primary), CV PDF, GitHub, LinkedIn — plus opening a project. Unconfigured destinations render nothing rather than a broken button, and the notice bar names what is missing. The proof is the project record: context, role, approach, outcome, in that order.

## Chosen direction — REPLACES the category standard

The first build executed the category standard, and the user rejected it on sight: *"On y est pas du tout" / "beaucoup trop générique."* He then pinned four references (gusta.studio, dineshrevunuru.com, huuuuue.agency, ryanritzenthaler.com). A pinned brief beats the concept roll, so no new direction round was run.

**The world:** display type is the content, at the scale it has in life. Colour arrives as full-bleed fields that own whole sections, never as accents. Bone and ink invert between the two themes; one electric ultramarine drenches; one acid green only ever means live or interactive.

**The five mechanisms taken from the references, and how each is transposed** — none of the four can be copied directly, because all four lean on real imagery this project does not have:

1. *The name at absurd scale* (Ryan) → `SHIRON BESKIWIN` uppercase at 17.6vw, edge to edge, the first thing on the page.
2. *Two typefaces inside one headline* (Hue&Cry, Dinesh) → a wide grotesque (Bricolage) with exactly one didone italic word (Bodoni Moda) per statement: "produits *entiers*", "Travaillons *ensemble*".
3. *A full-bleed marquee band* (Ryan, Hue&Cry) → an ink band of what he does, four-point stars as separators, paused on hover and stopped under reduced motion.
4. *A rotating circular badge* (Ryan) → SVG text on a circle around the mark, 24s, stopped under reduced motion.
5. *Colour at page scale* (Hue&Cry, Dinesh) → the close is a full-bleed ultramarine field with the name at display scale behind it.

**The photograph (added 2026-09-08, reworked twice).** The user supplied a portrait; it is the site's only raster. Two attempts were rejected by him before this one, and both rejections were right:

1. *A plain rectangle with its own warm background* — read as an image pasted on the page, and broke the world's own no-container rule.
2. *A rectangle dissolved on all four edges by gradient masks* — his words: the blurred edges "dégoulinent". A fade is not a form.

What holds: the photograph is cut to an **arch** (`border-radius: 999px 999px 0 0`, the site's pill radius taken to its full stop) rising out of the statement band's bottom edge, with the site's circular mark as a seal at the point where it meets the sentence. It is duotoned into the field's two colours and gently vignetted in the asset so the subject reads inside the shape — the vignette is deliberately mild, because pushed further it eats the contour and the shape stops reading, which was failure (2) returning by another door.

Rules that came out of it, measured rather than judged by eye: the statement band is pinned to ink in **both** themes (the grade cannot survive an inverted ground, so the marquee above keeps its own inverting band and provides the separation), and the sentence never overlaps the photograph — at desktop width the two sit in clean columns, and on narrow screens the arch stands above the text. An earlier overlapping version measured 1.34:1 for bone type over the near-white shirt.

**The transposition that replaces imagery:** the work index is a set of full-bleed bands, and hovering one **drenches the whole band in ultramarine** — the type inverts to bone, the index number and the arrow go acid. That is the mechanism the references get from photography, done with colour and type instead.

## Memorable moment

The entrance: the monogram fills 0→100 over 1.5s, then the panel wipes up. On every arrival, skipped entirely under `prefers-reduced-motion`, and it never gates content — the page renders underneath it the whole time.

## Constraints

- All shipped content is invented sample content; a notice bar and a per-row chip say so.
- Light and dark are the same world inverted, both first-class, with a selector.
- `--drench` is a field colour only. As text on the dark ground it measures 2.9:1, so text uses `--link` instead — blue on bone, acid on ink.
- The fixed header publishes its measured height as `--header-h`; the hero and project pages reserve exactly that, because the notice bar's height changes with wrapping.

## Unresolved

- Real project content, screenshots, CV PDF, contact details and domain.
- Whether the entrance counter should survive contact with a real recruiter; it is one `sessionStorage` key away from being removed.
