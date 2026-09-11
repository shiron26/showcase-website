# shiron-showcase-website

Portfolio / CV site for **Shiron Beskiwin**. Next.js (App Router), fully static, bilingual FR / EN, light and dark themes.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /fr
npm run build
npm start
```

---

## Make it yours — in this order

Everything you need to change lives in three files. Nothing else has to be touched.

### 1. `content/site.ts` — your identity

Replace every value marked `TODO`:

| Field | What it is |
|---|---|
| `title` | The job title shown under your name, FR and EN |
| `positioning` | The one sentence a recruiter reads first. Say what you ship, not what you know |
| `email` | Your real address — it drives the primary call to action |
| `github`, `linkedin` | Full URLs. **Empty (`""`) means the link is not rendered at all** — that is why the hero ships with one button until you fill these in |
| `location` | Your city, or `""` to hide it |
| `cv` | Paths to your CV PDFs (see below). Empty means no download button — a button that 404s is a defect, not a placeholder |
| `url` | The domain you deploy to — used for canonical URLs and Open Graph |

### 2. `content/projects.ts` — your freelance missions and personal projects

**Every project in there right now is invented.** Names, dates, employers, numbers and outcomes are fiction and must be replaced before this site goes near a recruiter.

Keep the shape, change the words. One entry per project:

- `kind: "freelance" | "perso"` drives the filter. Employment is not here: it is told in chapters from `content/cv.ts`. Both kinds are shown at the same quality — that is deliberate.
- `order` is the sort key, highest first. It can be a decimal (`2023.5`) to slot a project between two years.
- `summary` is the line read in the index. Say the **outcome**, not the category.
- `context` / `role` / `approach` / `outcome` are arrays of paragraphs. This order is the argument: the problem, what you owned, what you decided, what changed.
- `sample: true` marks an entry as placeholder content. **Delete it once the entry is real.**
- `links.live` / `links.source` are optional and render only when present.

### 3. `content/cv.ts` — your history and skills

`ROLES`, `STUDIES` and `SKILLS`. `STUDIES[0]` is what the Education panel shows: `school` becomes the big word, and `city`, `period`, `title`, `note` are the four facts under it. Set `current: true` on your present position to get the live marker. `org`, `school` and the skill `items` are per-language: a real company name is simply written twice. Group skills by *what they let you do*, not by category — that is why the group titles are sentences.

### Then: turn the notice off

Once the sample content is gone, set `SHOW_PLACEHOLDER_BANNER = false` at the bottom of `content/site.ts`. That removes the notice bar from every page.

---

## Adding real assets

**Project screenshots** — drop a file at `public/work/<slug>.png` (1600×1000 works well) and set `cover: "/work/<slug>.png"` on that project. A thumbnail appears in the index row and a full-width image at the top of the project page. Without a cover, the entry is purely typographic — which is honest, and fast.

**Your CV** — put the PDFs at `public/cv/shiron-beskiwin-cv.pdf` and `public/cv/shiron-beskiwin-cv-en.pdf`, then set the two `cv` paths in `content/site.ts`. Until you do, the download button simply does not render.

**The notice bar tells you what is still missing.** It lists the unconfigured fields by name and disappears on its own once the sample content is gone and every field is filled.

---

## How it is built

- **Two root layouts**, `app/(fr)/` and `app/(en)/`, so the `lang` attribute is correct in the served HTML for both languages without any client-side patching or middleware. `/` redirects to `/fr`.
- **Routes** are `/fr/projets/<slug>` and `/en/projects/<slug>` — both really generated, with `hreflang` alternates between them. The language switch keeps you on the same page.
- **Design tokens** live at the top of `app/globals.css`. Light and dark are the same world inverted — bone over ink, or ink over bone — and both are written by hand.
- **Three typefaces, each with one job**, all self-hosted in `public/fonts/`: **Bricolage Grotesque** for display, **Hanken Grotesk** for text, and **Bodoni Moda italic** for exactly one word per headline. That second voice is the point; do not use it for more than a word or two.
- **Colour is a field, not an accent.** `--drench` (deep tobacco, palette "Tabac") owns whole sections and the hovered project row. `--live` (pale sky) only ever means live or interactive. `--drench` is a *background* colour first; text uses `--link`, which is the field in light and the sky in dark.
- **Theme**: an inline script sets `data-theme` before first paint, so there is no flash. The choice persists in `localStorage`; until a choice is made, the site follows the OS.
- **The education panel is built by the scroll**. `components/Scrub.tsx` writes `--p` (progress, 0→1) on the section and nothing else; the CSS in the "Built by the scroll" block of `app/globals.css` does the rest, and its default (no JS, reduced motion) is the finished state: the school name at full size, every fact visible. Scrolling up reverses everything, because it is the same function at a smaller input.
- **Experience is one chapter per role**: the years pinned on the left while the full story — paragraphs, missions, stack — scrolls on the right. Fill `description`, `missions` and `stack` in `content/cv.ts`; there is no length limit.
- **Entrances**: the hero's name rises line by line into clipped boxes on load (after the counter, when it plays), and the statement band plays once when it scrolls into view — hairlines draw, the portrait wipes up, the sentence rises word by word. All CSS; `components/Reveal.tsx` only sets two attributes. The base styles are always the finished state, so nothing depends on a script to be visible.
- **Wheel scrolling glides.** `components/SmoothScroll.tsx` turns wheel notches into an eased target the page follows; touch, keyboard, scrollbar and anchors stay native, and any scroll that is not the wheel re-syncs it. Off under reduced motion and on coarse pointers. Delete the component and the line in `RootShell.tsx` to go back to native scrolling.
- **Motion**, all of it disabled under `prefers-reduced-motion`: the entrance counter (on every arrival), the marquee (paused on hover), the rotating badge, hover response, and the hero fluid.
- **The hero fluid**: the name is dragged like ink by the cursor's *velocity* — a WebGL2 fluid simulation written by hand, no library. A still cursor does nothing; a stroke smears the glyphs along its path with an R/G/B fringe and decays to rest in under a second. It never runs on touch, under reduced motion, without WebGL2, while the hero is off-screen, or in a background tab — and at rest, which is most of the time, the heading is the plain live `<h1>` it has always been. The texture is rasterized from that live text at its computed size, never a pre-rendered image, so the name still sizes itself. Nothing is created until a mouse comes near the hero, and setup runs under a 200ms deadline so it is ready by the time the cursor arrives.
- **The header measures itself** and publishes `--header-h`, so the hero and project pages always clear it however the notice bar wraps. Below 900px the section links live in a full-screen menu behind a "Menu" pill.
- **No client-side data fetching, no backend, no images to load.** The site is static HTML and can be hosted anywhere.

### Your photo

`public/portrait/shiron.webp` (plus a 640px sibling) is the one photograph on the site. It sits in the statement band as a **specimen on the grid**: a 13rem column ruled top and bottom, with a two-line label beside the sentence. It is a documented object, not a backdrop — so nothing overlaps it and it needs no shape, mask or ornament.

Two things make it work, and both are worth keeping if you change the image:

**The size and the label are the idea.** Both are one edit each:

| What | Where | Current |
|---|---|---|
| Column width | `.statement-grid` in `app/globals.css` | `13rem` (and `max-width: 13rem` under 900px) |
| Crop | `.portrait img` | `aspect-ratio: 4 / 5`, `object-position: 58% 12%` |
| Label | `portrait` in `lib/i18n.ts` | `Fig. 01 — Portrait` / `Bichromie ink / bone` |

Resist enlarging it. At this size it reads as a documented specimen; at column width it becomes the ambient portrait the design rejects, and the sentence stops being the loudest thing in the band.

**The photo carries no foreign background.** It is duotoned into the site's own two colours and gently vignetted, so it reads as part of the ink band rather than a beige rectangle pasted onto it. To swap the image, apply the same treatment:

```bash
magick your-photo.jpg -gravity east -crop <square>+0+0 +repage \
  -colorspace Gray -sigmoidal-contrast 3.6,47% \
  \( -size 2x1 gradient:'#f7f5f0-#2a2a2c' -rotate 180 \) -clut \
  -resize 1000x1400^ -gravity north -extent 1000x1400 \
  \( -size 1000x1400 radial-gradient:'#ffffff'-'#b8b8b8' -resize 1000x1400^ \) \
  -compose multiply -composite -quality 90 public/portrait/shiron.webp
magick public/portrait/shiron.webp -resize 640x -quality 88 public/portrait/shiron-640.webp
```

Keep the vignette gentle, and judge it at 13rem rather than at full resolution — that is the only size it is ever seen at. If your new photo faces the other way, adjust `object-position` in `.portrait img` — the subject should look *into* the sentence, never off the page. Each file has a `.json` sidecar recording where it came from.

### Turning the hero fluid off

Delete `components/HeroFluid.tsx`, `lib/fluid.ts` and `lib/heroType.ts`, unwrap the `<h1>` in `components/Home.tsx`, and delete the `Hero fluid` block in `app/globals.css`. Nothing else depends on any of it — the heading is already the resting state.

To keep it but change its feel, the constants at the top of `lib/fluid.ts` are the whole vocabulary: `DISPLACE` (how far a given speed drags the glyphs), `DECAY` (how fast it returns to rest), `RADIUS` (how much of the name one stroke disturbs), `SPLIT` (the width of the chromatic fringe). `VMAX` caps the worst case and also sizes the canvas bleed, so raising it widens the canvas.

### Turning the entrance counter off

It lives in `components/Preloader.tsx` and is rendered from `components/RootShell.tsx`. Delete the `<Preloader />` line and it is gone; nothing else depends on it.

## Accessibility

Skip link, keyboard-operable everything, visible focus rings drawn from the palette, and text contrast verified at ≥4.5:1 for body copy in both themes. Keep that bar when you edit `--accent`.
