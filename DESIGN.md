---
name: Shiron Beskiwin — Showcase
description: Display type as the content at the scale it has in life, with colour arriving as full-bleed fields that own whole sections.
colors:
  stencil: "#000000"  # alpha stencil for mask gradients, never painted
  bone: "#f1efe8"
  bone-sunk: "#e6e3d9"
  ink: "#0c0c0d"
  ink-sunk: "#1a1a1c"
  drench-blue: "#241fe6"
  drench-blue-dark: "#3a34ff"
  acid: "#d8ff4a"
  muted-light: "#4d4c48"
  faint-light: "#605e57"
  muted-dark: "#9d9a92"
  faint-dark: "#8d8a83"
  rule-light: "#cbc7ba"
  rule-dark: "#2c2c2e"
  edge-light: "#807b6d"
  edge-dark: "#6a665f"
  on-drench-dark: "#f4f2ec"
typography:
  hero:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "min(17.6vw, 17rem, max(2.75rem, calc((100vw - 2 * var(--gutter)) / (var(--hero-ch) * 0.58))))"
    fontWeight: 700
    lineHeight: 0.8
    letterSpacing: "-0.055em"
    fontVariation: "'wdth' 100"
  display-1:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 7.2vw, 7.5rem)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.045em"
  display-2:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  display-3:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 2.1vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  count:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 17vw, 15rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.06em"
    note: "Retired 2026-09-11: the entrance counter is now the monogram filling up; the number is a tag-label."
  marquee:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 5.4vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
    note: "The band ticker. --d-marquee."
  row-title:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.7vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
    note: "A project title in the work index. --d-row."
  mail:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4.4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
    note: "The address in the close. --d-mail."
  timeline-title:
    fontFamily: "Bricolage, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
    note: "A role or study in the timeline. --d-tl."
  mark:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
    note: "The sample marker. --t-2xs. Leaves with the sample content."
  badge-ring:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "7.4px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.24em"
    note: "SVG user units inside the badge's 100x100 viewBox, not a page size — it scales with the badge. The ring's character capacity is computed from it in RotatingBadge.tsx."
  emphasis:
    fontFamily: "Bodoni Moda, Georgia, 'Times New Roman', serif"
    fontSize: "inherit"
    fontWeight: 500
    lineHeight: "inherit"
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.0625rem, 0.95rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Hanken, ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: "0"
  pill: "999px"
spacing:
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4.5rem"
  s-9: "clamp(4rem, 2rem + 7vw, 9rem)"
  gutter: "clamp(1.25rem, 0.5rem + 3.2vw, 3.5rem)"
components:
  hero-fluid:
    note: "The hero heading, dragged by pointer velocity. Constants live in lib/fluid.ts."
    displace: "0.022"     # seconds of velocity per uv of displacement
    split: "0.2"          # chromatic split, as a fraction of the displacement
    decay: "6.5"          # 1/s — exp(-6.5 * 0.7) = 0.011, so 99% gone in 0.7s
    radius: "0.11"        # cursor radius, uv-x units
    vmax: "1"             # force clamp, uv-x/s; also sizes the canvas bleed
    tuningModel: "displacement_px ~= cursor_speed_px_per_s * displace"
    simGrid: "canvas width / 8, clamped 64-256, aspect-matched"
    armMargin: "400px from the hero"
    armDeadline: "200ms — the idle callback's timeout, not a delay"
    velocityFormat: "RGBA16F half-float, ping-ponged"
    typeFormat: "ALPHA 8-bit, rasterized from the live <h1>"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.15rem"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  button-fill:
    backgroundColor: "{colors.drench-blue}"
    textColor: "{colors.bone}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.15rem"
  button-fill-hover:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.ink}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted-light}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.95rem"
  filter-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.28rem 0.6rem"
  seg:
    backgroundColor: "transparent"
    textColor: "{colors.faint-light}"
    rounded: "{rounded.pill}"
    height: "1.9rem"
    width: "1.9rem"
  seg-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
  nav-roll:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "0 0.85rem"
    height: "1.35em"
  mark:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 0.75rem 0.35rem 0.4rem"
  work-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.1rem, 2.2vw, 2rem) 0"
  work-row-hover:
    backgroundColor: "{colors.drench-blue}"
    textColor: "{colors.bone}"
  notice-bar:
    backgroundColor: "{colors.acid}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.45rem var(--gutter)"
  entrance-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    size: "100vw × 100dvh"
---

# Design System: Shiron Beskiwin — Showcase

## Overview

**Creative North Star: "The Poster That Reads Back"**

This is a poster you can scroll. The name is set edge to edge at the scale it would have on a wall, and the page is built from full-width horizontal bands that each take a whole colour — never a neutral page with accents sprinkled over it. There are no cards, no shadows, no floating containers and no boxed layouts. Depth is made from grounds against each other and from hairline rules, nothing else. Where the reference sites use photography to carry the visual weight, this system uses colour arriving at page scale and type set larger than seems reasonable.

The build ships **no imagery at all** and there is no image generation available for it. That is the governing constraint, not a temporary gap: the creative load rests entirely on typography, colour fields, motion and layout. Two slots (`.row-thumb` in the work index, `.proj-media` on the project page) are wired to `project.cover` and stay inert until real screenshots arrive; adding one must not change the world around it.

This design **replaces** a first build that executed the developer-portfolio category standard and was rejected outright by the user ("On y est pas du tout", "beaucoup trop générique"). The rejected system — a neutral page, a hairline index, one small accent colour — is the confirmed anti-reference. Four sites were pinned in its place (gusta.studio, dineshrevunuru.com, huuuuue.agency, ryanritzenthaler.com), and their shared mechanism binds future work: display type as the primary content at absurd scale, two typefaces inside one headline, full-bleed colour fields, a marquee band, a rotating badge, and media treated as an object rather than a card.

**Key Characteristics:**
- Display type at poster scale, edge to edge, uppercase for the name
- Full-bleed colour fields that own entire sections and entire index rows
- Bone over ink, or ink over bone — the same world inverted, both authored by hand
- Exactly one didone italic word per headline, never two
- Zero shadows, zero cards, zero intermediate corner radii
- Every motion has a complete `prefers-reduced-motion` off-switch
- The hero name is dragged like ink by the cursor's velocity, and is plain live text at rest

## Colors

Four materials only: two grounds that trade places between themes, one electric ultramarine that arrives as a field, one acid green that only ever means live.

### Primary
- **Electric Ultramarine** (`drench-blue`, dark theme `drench-blue-dark`): the drench. It fills the contact close, the ink band's counterpart, and the whole width of a hovered work row. It is a **background colour only**. As text on the dark ground it measures 2.9:1 and fails; that is why `--link` exists as the separate text role (blue on bone, acid on ink). It is also the caret, accent-colour and badge-star fill.

### Secondary
- **Acid Green** (`acid`): the live signal. In content it marks exactly two things — the current role (`.dot`) and an open-ended project (`.row-live`). Elsewhere it appears only as the counter-response *inside* a drenched or ink field: the row's index number and arrow on hover, the entrance progress rule, the skip link, the placeholder notice bar, and `::selection`. On bone it measures 1.00:1 and must never be text on a light ground.

### Neutral
- **Bone** (`bone`) and **Sunk Bone** (`bone-sunk`): the light ground and its recessed band (`.band--sunk`). Sunk bone is the only tonal step in the whole system.
- **Ink** (`ink`) and **Sunk Ink** (`ink-sunk`): the dark ground and its recessed band.
- **Muted / Faint** (`muted-light` `#4d4c48`, `faint-light` `#605e57`, and their dark counterparts): secondary prose and tertiary metadata respectively. Faint is the label and small-numeral colour, muted is running body copy.
- **Rule** (`rule-light`, `rule-dark`): hairline dividers between index rows and timeline entries. Non-interactive, so it does not need to clear 3:1.
- **Edge** (`edge-light`, `edge-dark`): the border on anything interactive and self-contained — buttons, chips, filters, the header pills. 3.67:1 light, 3.43:1 dark.
- **On-Drench** (`bone` light, `on-drench-dark` in dark): the text colour that rides on a drenched field.

### Named Rules

**The Field Rule.** Colour arrives as a field that owns a whole band or a whole row, edge to edge across the viewport. `--drench` is never an accent, never a border, never a small fill, never a hover tint on a corner. The work row proves the rule: its `::before` is 100vw wide with a −50vw offset so the band escapes the container and runs the real width of the page.

**The Acid Means Live Rule.** `--acid` has exactly one semantic in content: *this is currently running*. A live role, an open-ended project. Anything else that wants attention uses `--link` or the drench. Using acid as a decorative highlight destroys the only signal in the system that carries meaning by colour alone.

**The Background-Only Rule.** `--drench` is a background. Text never takes it. Three separate roles exist because the same value cannot do all three jobs: `--drench` (field), `--link` (text — blue on bone, acid on ink), `--focus` (ring — ink on bone, acid on ink, because acid on bone is 1.00:1). Do not collapse them.

**The Inversion Rule.** Light and dark are the same world with the grounds swapped, both written by hand — dark is not a filter over light. `.band--ink` therefore *inverts* in dark (bone ground, ink text) so that a field stays a field instead of collapsing into the page ground it would otherwise match.

**The 4.5 Floor.** Every text pair in both themes clears 4.5:1, the lowest measuring 4.64:1. Interactive borders use `--edge` at 3.67:1 light and 3.43:1 dark. Anyone who changes `--blue` or `--acid` re-verifies every pair in both themes before shipping — those two values are load-bearing for the whole contrast budget.

## Typography

**Display Font:** Bricolage Grotesque (variable, `wdth` 75–100, weight 200–800) with `ui-sans-serif, system-ui, sans-serif`
**Body Font:** Hanken Grotesk (variable, weight 300–800) with `ui-sans-serif, system-ui, -apple-system, sans-serif`
**Emphasis Font:** Bodoni Moda italic (400–700) with `Georgia, "Times New Roman", serif`

All three are self-hosted woff2 in `public/fonts/`, subset to Latin, `font-display: swap`. Bricolage and Hanken are preloaded in `<head>`; Bodoni is not, because it is a handful of glyphs below the fold.

**Character:** A wide, tightly-tracked grotesque set at poster scale, cut once per headline by a single didone italic word. The grotesque is the voice; the didone is the breath. Body copy is a quiet neutral that gets out of the way — it exists so the display type has something to be large *against*.

### Hierarchy
- **Hero** (700, `--d-hero`, line-height 0.8, tracking −0.055em, uppercase): the name only, at the top of the home page, and the ghosted repeat at the close. Sizes itself — see the rule below.
- **Display 1** (700, clamp 2.5rem→7.5rem, line-height 0.88, tracking −0.045em): the statement in the ink band, the contact headline, project page titles. This is where `.em` lives.
- **Display 2** (700, clamp 1.75rem→3.5rem, line-height 0.94, tracking −0.035em): section headings (Work, Path, Skills).
- **Display 3** (700, clamp 1.375rem→2rem, line-height 1.02, tracking −0.028em): skills-group titles, project pagination targets, empty-state headline.
- **Emphasis** (Bodoni Moda italic 500, tracking −0.01em, 0.06em trailing pad): exactly one word inside a Display 1 headline.
- **Lead** (clamp 1.0625rem→1.375rem, line-height 1.45, max 34ch): the sentence directly under a display headline. `.hero-lead` runs to 38ch, `.proj-lead` to 44ch.
- **Body** (1.0625rem, line-height 1.55, max `--measure` 62ch): running prose in project blocks and timeline summaries.
- **Small** (0.9375rem, weight 600): buttons, filters, nav labels, row summaries, footer.
- **Label** (0.75rem, weight 600, tracking 0.14em, uppercase, faint): every metadata line — role/location under the name, block headings on project pages, section kickers in the entrance panel, dates.

Titles that carry an organisation name (`.row-title`, `.tl-title`) set the org inline in the **body** face at small size with zero tracking, so one line holds two voices without a second row.

### Named Rules

**The One Italic Word Rule.** `.em` is exactly one word per headline. Not a phrase, not two words, not a whole clause. The build uses it twice on the whole site — "produits *entiers*" and "Travaillons *ensemble*" — and that restraint *is* the rule. A second `.em` inside the same headline is a defect, not a variation.

**The Three Jobs Rule.** Three faces, one job each: Bricolage displays, Hanken reads, Bodoni emphasises. No face takes a second job, and there is no fourth face. Labels and metadata are Hanken tracked out, never a mono or a condensed cut.

**The Name Sizes Itself Rule.** `--hero-ch` is computed in `Home.tsx` from the longest line of the name (`Math.max(first.length, last.length, 5)`) and feeds `--d-hero`, which takes the smallest of 17.6vw, 17rem, and the width that actually fits between the gutters. A longer name shrinks; it is never clipped by `overflow-x: hidden`. Never hardcode a hero font-size, and never remove the inline `--hero-ch`.

**The Tight-Tracking Rule.** Display type is negatively tracked and its line-height sits below 1 (0.8 at hero, 0.88 at Display 1). Label type is the opposite: positively tracked at 0.14em and uppercase. There is no neutral middle — type is either packed or spaced out.

## Layout

The whole page is horizontal bands. `.band` is full-width with `--gutter` inline padding; `.band > .inner` caps content at 1400px and centres it. Vertical rhythm comes from `.band--pad` (`--s-9`, clamping 4rem→9rem). Colour, when a section takes it, goes on the band — never on the inner — so the field runs the full viewport width while the type stays measured.

The spacing scale is a single geometric ramp (`--s-2` 0.5rem through `--s-9`), with `--gutter` scaling from 1.25rem to 3.5rem and `--measure` fixed at 62ch for prose.

**Grid shapes actually used:**
- Hero under-block: `minmax(0, 1fr) auto`, bottom-aligned, badge on the right — collapses to one column below 860px.
- Section head: `minmax(0, 1fr) minmax(0, 26rem)`, bottom-aligned — one column below 860px.
- Work row: `3.5rem | 0.9fr | 1fr | 2.75rem` (number, title block, summary, arrow) — becomes `2.5rem | 1fr | 2.5rem` below 1000px with the summary moved under the title and clamped to two lines, then `1fr | auto` below 640px with the number dropped.
- Timeline entry: `11rem | minmax(0, 1fr)` — one column below 720px.
- Project page: `minmax(0, 1fr) 15rem` main/aside — one column below 900px; inner blocks are `8rem | minmax(0, 1fr)` label/prose, one column below 720px.
- Skills: `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))`.

Breakpoints in use: 640, 720, 860, 900, 1000px. There is no named breakpoint system; each component collapses at the width its own content actually breaks at.

### Named Rules

**The Measured Header Rule.** The header is fixed and **measures itself**: a `ResizeObserver` in `Header.tsx` publishes `el.offsetHeight` as `--header-h` on `<html>` (falling back to a `resize` listener, with a 5.5rem first-paint default in `:root`). The hero and the project page reserve exactly `calc(var(--header-h) + …)`, and `scroll-padding-top` uses it too. This exists because the placeholder notice bar's height changes with text wrapping and language. Never hardcode a top offset; always spend `--header-h`.

**The Band Rule.** A new section is a `.band` with an `.inner`. If it takes colour it takes `.band--drench`, `.band--sunk` or `.band--ink` on the band element. A section that needs its own background but sits inside another band is a mistake — nest a `.band` inside a plain coloured wrapper instead, the way the ink band wraps the marquee and the statement.

**The Nothing-Disappears Rule.** Narrow viewports rearrange; they do not hide. Below 900px the header nav becomes its own horizontally-scrollable row inside the fixed bar rather than folding into a menu, so no section is unreachable. Below 1000px the row summary moves under the title and line-clamps rather than vanishing. A responsive rule that deletes content is a bug.

## Elevation & Depth

**There are no shadows in this system. Zero.** Nothing is lifted, nothing floats, nothing has a drop shadow, an inner shadow, or a glow. Depth is made three ways and only three ways:

1. **Ground against ground** — `--bg` vs `--bg-2` (`.band--sunk`), and the two full inversions `.band--ink` and `.band--drench`.
2. **Hairlines** — 1px `--rule` between index rows, timeline entries and above the footer; 1px `--edge` around interactive pills.
3. **Stacking order alone** — the fixed header (z-index 100), the notice bar inside it (110), the skip link (200), the entrance panel (300). No shadow marks these layers; they are simply in front.

The single exception to "no box-shadow" is the focus ring, where `box-shadow: 0 0 0 6px` draws a *halo of the current background* around the outline so the ring stays visible when it lands on a drenched or ink field. That is a legibility device, not elevation.

**The chromatic fringe is not a glow.** The hero fluid separates the heading's alpha into three channels while the field is in motion, which reads as a red/cyan edge on the smear. It is adjudicated here rather than left ambiguous: it is a *transport artifact of the simulation*, it is exactly zero at rest, it is never attached to an element as decoration, and it cannot be applied to anything that is not moving. That is what distinguishes it from a glow, which the zero-shadow rule still forbids everywhere.

### Named Rules

**The No-Card Rule.** Nothing is a card. Content is never wrapped in a bordered, radiused, shadowed, background-filled box to group it. Grouping is done by hairline, by band colour, or by grid position. A project entry is a row on a rule, not a tile; a project image is an object in the flow, not a thumbnail in a frame.

## Shapes

Two radii exist and nothing between them.

- **Pill** (`999px`): everything interactive and self-contained — buttons, filter buttons, chips, segmented theme/language controls, the header nav shell and controls shell, the wordmark, the row's arrow disc. The live dots use `99px`, which is the same intent at 9px.
- **Square** (`0`): everything structural — bands, work rows, timeline entries, project media, the entrance panel, the notice bar, the footer.

Borders are always 1px. Interactive borders take `--edge`; structural dividers take `--rule`; inside a drenched or ink field, chip borders switch to `color-mix(currentColor 35%)` so they read against a coloured ground instead of a fixed grey.

The recurring silhouette is the **four-point star** (`Star` in `icons.tsx`): filled, no stroke, used as the wordmark glyph, the marquee separator, the badge centre and the sign-off at the bottom of the contact field. It is the only decorative form in the system.

### Named Rules

**The Two Radii Rule.** 999px or 0. There is no 4px, no 8px, no 12px. If a new element needs a corner, decide whether it is an interactive control (pill) or a structural surface (square) — there is no third answer.

**The One Icon System Rule.** Icons are drawn in a 16px box, 1.6 stroke, round caps and joins, `currentColor`, from the shared `base` spread in `components/icons.tsx`. No icon font, no icon package, no glyph characters, no mixed stroke weights. A new icon is added to that file with the same base.

## Components

### Buttons
- **Shape:** pill (999px), 1px border, `0.7rem 1.15rem` padding, small type at weight 600, 0.5rem gap to a 16px icon.
- **Outline (default):** transparent ground, `--fg` border and text.
- **Hover:** a `::before` panel in `--fg` **wipes up** from `translateY(101%)` to 0 over 420ms `--ease-io`, and the label flips to `--bg`. Isolated with `isolation: isolate` and `z-index: -1`, so nothing is repainted, only revealed.
- **Fill (`.btn--fill`):** drenched ground, `--on-drench` label — used for the single primary action (email). Its wipe panel is `--acid` and its hover label goes `--ink`.
- **The wipe is the hover.** Buttons do not lift, scale, shadow or change opacity.

### Chips
- **Style:** pill, 1px `--edge`, no background, label-size type at weight 600, `0.28rem 0.6rem`, `white-space: nowrap`.
- Inside a drenched or ink band the border becomes `color-mix(in srgb, currentColor 35%, transparent)`.
- Chips are non-interactive labels. Interactive selection is a **filter**, not a chip.

### Filters (work index)
- **Style:** pill, 1px `--edge`, `--fg-2` label, trailing tabular count in `--fg-3`, `0.45rem 0.95rem`.
- **Hover:** label and border both go to `--fg`.
- **Pressed** (`aria-pressed="true"`): solid `--fg` ground, `--bg` label, count mixed to 70% background over foreground so it stays subordinate inside the inverted pill.
- State is carried on `aria-pressed`, and CSS reads that attribute directly. Do not add a parallel `.is-active` class.

### Navigation
- Fixed, transparent header with `pointer-events: none` on the shell and `auto` on its children, so the page stays clickable beside the pills.
- Three pill clusters: the wordmark, the section nav, the controls. Each is a `--bg` pill with a 1px `--edge` border — the *pill* is the header chrome; there is no header bar background.
- **The text roll:** each nav label is rendered twice in an `inline-grid` with `overflow: hidden` and a 1.35em height; on hover the first copy slides to `-100%` and the second (in `--link`) slides in from `100%`, 420ms `--ease`. The duplicate is `aria-hidden`.
- **Segmented controls** (`.seg`): 1.9rem discs inside the controls pill, carrying no chrome of their own; `.seg--text` widens for the FR/EN labels. Current state is `aria-pressed`/`aria-current`, rendering as a solid `--fg` disc with `--bg` glyph. Groups are divided by a 1px `--edge` inline start border.
- Below 900px the nav drops to its own full-width scroll row inside the bar, loses its pill chrome, and hides its scrollbar.

### Work Index Row — signature component
The mechanism that replaces photography.

- A row is a hairline-separated grid link. At rest: `--fg-3` index number, display-face title, body-face org, muted summary, outlined 2.5rem arrow disc.
- **On `:hover` or `:focus-within`, the whole viewport width drenches.** The `::before` pseudo-element is 100vw wide with `margin-left: -50vw` from `left: 50%`, escaping the 1400px container, and scales from `scaleY(0)` to `scaleY(1)` over 520ms `--ease-io` — growing from the **top** on entry, retracting to the **bottom** on exit, so the field reads as directional rather than as a fade.
- Simultaneously: text goes `--on-drench`, index number and `.sample-mark` go `--acid`, the title translates 0.5rem right, and the arrow disc fills acid, takes `--ink`, and rotates −45° while sliding 0.35rem right. Org and summary use `color-mix` against `--on-drench` (78% / 85%) to hold a hierarchy inside the field.
- `:focus-within` gets the identical treatment, so keyboard reaches the same state as the mouse.

### Marquee — signature component
- A full-bleed band inside an ink section: `border-block: 1px currentColor`, display-face uppercase at clamp 1.75rem→4.5rem, items separated by a filled four-point star at 0.42em.
- The track is duplicated (`[...items, ...items]`, rendered twice) and animated `translateX(-50%)` over 38s linear infinite, so the loop is seamless.
- **Pauses on hover** via `animation-play-state`, stops entirely under reduced motion, and is `aria-hidden` — it is texture, never the only place information appears.

### Rotating Badge — signature component
- SVG text on a 37-unit-radius circle, rotating 360° over 24s linear, with the four-point star at the centre.
- **The ring counts its own capacity:** circumference ≈ 232 units, a glyph at 7.4px with 0.24em tracking costs ≈ 5.6 units, so ≈ 41 characters fit; the component repeats the phrase only `floor(41 / unit.length)` times so the ring never overruns itself. If you change the font size or tracking, change `capacity`.
- `aria-hidden`, and stopped under reduced motion.

### Entrance Panel — signature component
- Full-viewport ink panel, bone digits at clamp 4rem→15rem tabular display type with a 0.28em superscript `%`, name and role as labels along the bottom, and an acid 3px progress rule whose `scaleX` tracks the count.
- **Plays on every arrival, refresh included** (changed 2026-09-11; it was once per session), and only when the pre-paint boot script in `RootShell.tsx` set `data-enter="1"` on `<html>` — so it is present from the very first frame or never, and never drops onto an already-painted page.
- **Its exit is a CSS keyframe**, `enter-exit` 1150ms `--ease-io`, holding until 74% then wiping up to `translateY(-101%)`. JavaScript owns the digits and nothing else.
- Never gates content: no scroll lock, no focus trap, the page is complete underneath it the whole time. Skipped entirely under reduced motion.

### Hero Fluid — signature component

The one photograph is a still specimen; the one piece of live matter on the site is the name. The cursor drags it like ink.

- **It follows velocity, not position.** A still cursor does nothing at all. The pointer's frame-to-frame delta is splatted as a force into a velocity field (`lib/fluid.ts`), the field advects itself and dissipates, and the heading's stencil is sampled with its UVs offset by that field. The trail therefore curls behind a stroke and returns to rest by itself — the decay *is* the effect, not a cleanup.
- **Three passes, no library and no dependency.** Splat, semi-Lagrangian advection with `exp(-decay * dt)` dissipation, and one draw. The divergence + Jacobi pressure solve of a full Stable-Fluids solver is deliberately omitted: 20-40 extra passes per frame, replacing 2, on the first viewport, to buy incompressible curl on a field that is 98% gone in 0.8s. If the trail ever reads too straight, add vorticity confinement (2 passes), never pressure.
- **Tuning it has one equation, and it is worth knowing before touching anything:** the response is very nearly linear in cursor speed, so `displacement in px ~= cursor speed in px/s x DISPLACE`. This was measured, not assumed. It also records a real mistake: the first shipped value was the reference's `uFluidStrength` of 0.01, verified only against synthetic sweeps at 2000-4500 px/s. A hand moves at 500-1200 px/s, where 0.01 buys 5-12px on a 272px cap height — 2-4%, indistinguishable from nothing. **Calibrate motion against the speed a hand actually moves, never against the speed a test harness can generate.** `VMAX` is the other half of the pair: with a linear response it is what stops a fast flick from tearing the word apart, and it is usually the constant that decides whether the effect reads as elegant. A settled stroke and a violent one are two different judgements — at `DISPLACE 0.045 / VMAX 1.8` the baseline was fine while a flick displaced half a cap height, which is what made it coarse. The shipped pair puts a natural stroke at 6% of cap height and caps everything at 14%.
- **`RADIUS` is the other elegance knob, and it is not about size.** At the reference's 0.16 the disturbance is wide enough that the whole word wobbles together; at 0.11 it stays a pinch travelling with the cursor. A precise local smear reads as craft, a broad soft one reads as a filter.
- **The chromatic fringe** comes from sampling the stencil's *alpha* three times at slightly different offsets — correct for a solid glyph on transparency. See Elevation & Depth for why this is not a glow.
- **The loop is self-terminating.** The field's peak energy is modelled on the CPU (splats raise it, dissipation lowers it by a known factor, advection can only spread it) rather than read back from the GPU, which would stall the pipeline every frame. The model is a strict upper bound, so the loop can stop late but never early. The threshold is derived from a sub-pixel criterion: `0.35 / (DISPLACE * width)`.
- **Arming failures are retried, not fatal.** A transient miss — a font not settled, a raster taken mid-layout — used to kill the effect for the life of the page, silently. It now costs a stroke; only a missing WebGL2 context or float target, which cannot change, is permanent.
- **The canvas's rect is derived, never measured.** The canvas is `display: none` at rest, and a `display: none` element reports an all-zero rect — so measuring it during arming gave a zero width, the pointer mapping divided by zero, every splat landed at infinity, and the falloff `1 - min(length, 1)` evaluated to exactly zero. The field stayed empty forever while every gate reported the effect running, and it only came alive if a scroll happened to re-measure while the canvas was displayed. The geometry is fully known from the hero's live rect plus the stored box, so it is computed from those. **Never measure an element that the resting state hides.**
- **The heading is handed over only after the canvas has painted.** `data-fluid="on"` is set at the end of the first frame that actually drew, not when the loop starts — otherwise the `<h1>` goes transparent one frame early, and if that frame never arrives the name is simply missing until the watchdog fires.
- **The canvas tracks the heading's position, not just its size.** `ResizeObserver` fires on size changes only, and `.hero` pads itself with `calc(var(--header-h) + …)`, so the notice bar rewrapping moves the heading down while its box stays identical. Each wake compares the heading's current offset against the one the raster was taken at and rebuilds if it drifted.
- **Arming is lazy but bounded.** No WebGL context exists until a fine pointer comes within 400px of the hero — so a phone, a keyboard-only visit or a reader who never approaches the name costs nothing at all. The work is then scheduled on an idle callback *with a 200ms deadline*: `requestIdleCallback` with no timeout waits for the main thread to go idle, and the main thread is at its busiest exactly when the first pointer move arrives, which made the effect sit unarmed long enough to read as broken. The effect also arms *underneath* the entrance panel and only refuses to run, so it is live on the first move after the panel lifts rather than starting its setup then.
- **It does not engage** under reduced motion, on a coarse pointer, without WebGL2 or float render targets, before the font has loaded, while the entrance panel is up, when the hero is off-screen, in a background tab, on a name whose line wrapped, or if the raster cannot be registered on the live text. In every one of those cases the page is exactly what it was before the effect existed.

### Named Rules

**The Live Type Rule.** The canvas is a redraw of the live `<h1>` at its computed size, measured with a `Range` over each line's text — never a pre-rendered image. This is what keeps The Name Sizes Itself Rule true. The site this effect is modelled on ships a WebP of its heading; this build refuses to, because an image cannot participate in `--d-hero`. Measured registration is exact: canvas and DOM ink widths agree to within 0.007% at both 67px and 272px, so the axes (`wdth`, `opsz`) do not diverge between canvas and layout.

**The Flat Ground Rule.** Three per-channel alphas cannot be composited by ordinary alpha blending — one alpha applies to all three channels, and a canvas cannot read the page behind it — so the draw shader pre-composites against `--bg`. The hero must therefore stay on a flat `--bg` ground. Giving `.hero` a band colour or a gradient would break the fringe, and only the fringe: the failure would be a thin wrong-coloured trailing edge, which is easy to miss and hard to diagnose.

**The Fade, Never Remove Rule.** While the effect runs, the `<h1>` is hidden by `opacity: 0` and nothing else — never `display: none`, never `visibility`, never `aria-hidden`, never detached. Opacity does not reflow, so nothing jumps when it engages; the heading stays in the accessibility tree, and is in the served HTML at full opacity for crawlers and Ctrl+F in every path.

### Notice Bar
- Acid ground, ink text, label-size, sitting *inside* the fixed header above the bar (z-index 110) so its height is included in the measured `--header-h`.
- `role="note"`, renders `null` when it has nothing to report. It is placeholder scaffolding for the sample-content phase, not a permanent design element.

### Contact Close
- A full-bleed `.band--drench` field: Display 1 headline with its one italic word, lead at 0.85 opacity, the email address set as display type at clamp 1.5rem→3.5rem (hovering to acid), a row of underlined links, then the name repeated at **hero scale at 0.16 opacity** as a ghosted watermark (`aria-hidden`, `pointer-events: none`, `user-select: none`), closed by the four-point star.

## Do's and Don'ts

### Do:
- **Do** put colour on a `.band`, at full viewport width, owning the whole section — the Field Rule.
- **Do** reserve header space with `calc(var(--header-h) + …)` on any page that starts at the top of the viewport — the Measured Header Rule.
- **Do** use exactly one `.em` word per headline, in Bodoni Moda italic — the One Italic Word Rule.
- **Do** reach for `--link` when blue needs to be text, and `--focus` when it needs to be a ring; `--drench` is a background only.
- **Do** give every animation a `prefers-reduced-motion: reduce` branch that turns it fully off, and make an entrance-style overlay *skip*, not shorten.
- **Do** let CSS own the exit of anything that covers the page. JavaScript may drive the contents; it must never be the only way out.
- **Do** gate every JavaScript-driven motion directly on `matchMedia("(prefers-reduced-motion: reduce)")`. The blanket duration rule in the stylesheet zeroes CSS durations and does not reach JavaScript at all.
- **Do** give any JS-driven transient visual state a way back to rest that is not a `requestAnimationFrame` callback. The hero fluid has four, one of which is a `setTimeout` watchdog re-armed every frame, because rAF is throttled in background tabs and low-power modes.
- **Do** keep all rules that control one element's `display` in a single contiguous block, `.preloader`-style.
- **Do** mirror every `:hover` state onto `:focus-within` / `:focus-visible`, as the work row does.
- **Do** collapse a grid to one column at the width its own content breaks at, and move content rather than hiding it.
- **Do** add new icons to `components/icons.tsx` on the shared 16px / 1.6-stroke base.

### Don't:
- **Don't** add a shadow. Not on hover, not on a "card", not as a glow. The only `box-shadow` in the system is the focus-ring halo.
- **Don't** pre-render the hero to an image asset to make an effect easier. The name must stay live text at its computed size — the Live Type Rule.
- **Don't** let the hero effect reach `.close-name`. The watermark shares the `d-hero` token and is deliberately still; the fluid's canvas lives inside `.hero` and its only DOM handle is the subtree it was given, so this holds structurally rather than by discipline.
- **Don't** wrap content in a bordered, radiused, filled box to group it — the No-Card Rule.
- **Don't** introduce a corner radius between 0 and 999px — the Two Radii Rule.
- **Don't** use `--acid` for anything except *live* in content, or as the counter-colour inside a drenched/ink field. It is never text on bone (1.00:1).
- **Don't** set `--drench` as a text colour (2.9:1 on the dark ground), and don't change `--blue` or `--acid` without re-verifying every text pair in both themes against the 4.5:1 floor.
- **Don't** add a fourth typeface, and don't give an existing one a second job.
- **Don't** hardcode a hero font-size or drop the inline `--hero-ch`; the name must be able to shrink instead of clipping.
- **Don't** hide navigation or content at narrow widths — rearrange it.
- **Don't** treat imagery as a thumbnail in a frame. `.row-thumb` and `.proj-media` are wired for real screenshots; an image arrives as an object in the flow, filling its slot with `object-fit: cover` and no border, radius or shadow.
- **Don't** re-introduce the rejected category standard: a neutral page with a hairline index and a single small accent colour is the confirmed anti-reference for this project.


## The portrait (added 2026-09-08, recomposed 2026-09-08)

The site's one photograph is a **specimen on the grid**: small, ruled top and bottom, carrying its own label. It is a documented object, not atmosphere behind the words — which is why the sentence never has to cross it and why no contour, mask, fade or ornament is involved at all. The grid does the work.

Two earlier versions are **rejected, not shelved** — do not restore either:

1. An **arch** cut with the pill radius (`border-radius: 999px 999px 0 0`). Correct by the radius rule and still a decorative silhouette.
2. A **collage** of a hard rectangle, an offset ultramarine block and an acid rule terminating in the seal. More composed, still decoration arranged *around* the photograph.

**The structure.** `.statement-band` is a `.band`, so it inherits the gutter and the 1400px measure. Inside, `.statement-grid` is a two-column grid — `13rem` for the specimen, `1fr` for the sentence — ruled `border-block` and padded inside those rules. Columns are `align-items: start`: the two are set on a shared top line and are free to end wherever their content ends. That unequal bottom is the idiom, not a bug to pad out.

**The label.** `.portrait-cap` is a `<figcaption>` in `--tag-label` at 58% bone, two lines: `t.portrait.fig` and `t.portrait.note` (both in `lib/i18n.ts`). It is what makes the picture a specimen rather than a small photo; drop it and the composition loses its reason.

**The hairline exception.** The rules on `.statement-grid` are `color-mix(in srgb, var(--bone) 22%, transparent)`, not `--rule`. This band is pinned ink in *both* themes, so the theme-following `--rule` would vanish in one of them. Bone at 22% is the band-local equivalent; use it for anything else ruled inside this band.

**The size is fixed on purpose.** `13rem`, and `max-width: 13rem` again when the columns stack below 900px. Shrinking it makes a thumbnail; growing it to the column width makes the ambient image this composition rejects.

**The Defined Contour Rule.** The photograph is an object with an edge. It is never faded, masked into the ground, or dissolved at its boundary. Two of the earliest versions were rejected for exactly that: a plain rectangle carrying its own background, then a rectangle blurred out on all four sides. A fade is not a form.

**The Gentle Vignette Rule.** The raster carries a duotone (shadows `#2a2a2c`, highlights `#f7f5f0`) and a mild radial vignette so the subject reads inside the frame. Judge any regrade at the size the picture is actually used — 13rem — not at full resolution.

**The band is pinned.** `.statement-band` is ink in *both* themes, alone among the fields, because the photograph is graded to sit on ink and cannot survive an inverted ground. The marquee band above it keeps its own inversion and is what separates the two in dark.

**No overlap.** The sentence never crosses the photograph. Bone type over the near-white shirt measured 1.34:1 in an earlier overlapping version; here the grid makes overlap structurally impossible, at every width.

## Built by the scroll (added 2026-09-08)

The education panel between the statement and the experience chapters is a pure function of the scroll position, modelled on the "The Device" section of luminouslabs.health/commercial, which the user pinned as the reference. (The experience section was briefly a scroll-driven horizontal track modelled on the same page's "More than a device"; it was replaced by chapters the same day — see below.)

**The mechanism — `components/Scrub.tsx`.** A client `<section>` that writes three things and nothing else: `data-scrub="on"`, `--p` (progress through the section, 0→1, recomputed inside the scroll event — no rAF loop) and `--over` (a `[data-track]` child's horizontal overflow in px, measured from its last child's right edge). Every visual decision is in CSS as `clamp(0, (p − start) / length, 1)` segments, so scrolling up reverses the motion for free. **The Rest Contract:** the un-attributed CSS is the *finished* state (name at full size, every fact visible, the track a plain snap scroller). No JavaScript, reduced motion, or a dead effect all land there — there is no rest to return to because `--p` simply stops changing.

**Education (`components/Education.tsx`, `.edu`).** One inset panel, ink in light and bone in dark (the Inversion Rule), pinned for 320svh. The school's name is set from the panel width and its own length (`--edu-ch`, inline, like the hero) and rests at 80% of the panel width and opens at 1.25× — exactly the panel width, the whole name legible in every frame, never blurred, faded or cropped; it settles into place over the first 52% of the scroll with a hand-written (1−t)² ease, then the four facts (city, years, degree, programme) rise in from 54%, staggered 7% apart.

**Experience (`components/Experience.tsx`, `.xp`) — one chapter per role (recomposed 2026-09-08).** The horizontal carousel is gone: it forced every role into three lines, and the user wants each mission told in full. Each role is now a ruled two-column spread inside a `.band--pad`: on the left the years *field* (ink, or the drench for the current role, with the live dot and a `01 / 03` counter), `position: sticky` under the header for as long as its chapter scrolls; on the right the story, led by the **company name** at Display 2 with the role under it at Display 3 (the company is also set uppercase at the top of the field, because it is the name a reader scans for) — a lead paragraph, running prose at `--measure`, the missions as a ruled list with the four-point star as bullet, and the stack as a middot line, the same treatment the project page gives its stack. Each chapter plays its entrance once through `Reveal` (`as="li"`): the field wipes up out of its bottom edge and the text fades up beside it. Below 900px the spread is one column, the field first and no longer pinned, because a pinned block above the text would cover it. The role data (`content/cv.ts`) carries `description` paragraphs, `missions`, `stack`, and optional `months` and `location`.

**The one radius exception.** `.edu-panel` carries `border-radius: clamp(1.25rem, 3vw, 2.5rem)`. The Two Radii Rule forbids it; the user asked for the reference's encart explicitly, and this is the single element allowed to have it. It is still a field — no border, no shadow, one whole colour inside its insets. Do not extend it to anything else.

**Removed.** The vertical timeline (`.tl*`, `.subhead`) that used to hold roles and education is gone with them; `content/cv.ts` `Study` gained `city` and `note`.

## Entrances (added 2026-09-08)

Two time-based entrances, both CSS, in the "Entrances" block of `app/globals.css`. The rule that keeps them safe: every base declaration is the **resting** state; the hidden state lives only in a keyframe's `from` (hero) or behind `[data-reveal="armed"]` (statement). `animation: none` under reduced motion is therefore the finished page, and no JavaScript frame is ever the only way to it.

**Hero, on load.** Each line of the name is a clipped box (`.hero-name > span`, `clip-path` with a little room for the ink that line-height 0.8 lets out) and the text (`.hero-line`) rises into it, second line 120ms after the first. Then the role label, the positioning line and the actions fade up in turn (`.hero-in`, `--i` stagger), and the badge scales and turns into place. When the entrance counter plays, the boot script also sets `--enter-delay` inline on `<html>` — it outlives `data-enter`, which the counter removes as it leaves — and every hero delay is offset by it, so the name rises exactly as the panel clears. HeroFluid waits for any animation in the heading's subtree to finish before it rasterizes, because the raster registers on the live ink rects and those move with the transform.

**Statement, on view.** `components/Reveal.tsx` sets `data-reveal="armed"` on mount and `data-in="1"` once 18% of the band is in view (once, then it disconnects). The two hairlines of `.statement-grid` are pseudo-elements now, so they can draw from the left; the portrait wipes up out of its bottom edge while settling from 1.12× to 1; each word of the sentence rises inside its own clipped box (`.st-w`, 75ms apart, the italic word last); the lead, the now-line and the caption fade up after. Word boxes are separated by real whitespace outside the boxes — inside an inline-block a trailing space collapses and the sentence would set solid.

**Named rule — The Resting Base Rule.** A revealed element's base CSS is its finished state. Hidden starting positions go in keyframes or behind a JavaScript-set attribute, never in the base rule, so the page that ships without scripts is the page after every animation has played.


## Palette "Tabac" (chosen 2026-09-10)

The user found the original bone / ink / electric ultramarine / acid green too close to the current run of agency sites. Ten alternatives were painted on the site's own components (light and dark, with computed contrasts) and **09 — Tabac** was chosen, with the brown deepened at the user's request. The four materials, same roles as before:

- **Kraft** `#E9DFCD` (light ground; sunk `#DFD3BC`) and **Brown-black ink** `#1B1710` (dark ground; sunk `#27211A`).
- **Tobacco** `#3B2513` — the field (`--field`, `--drench`), a step lighter in dark (`#4F3519`) so it stays a field against the brown-black ground. Kraft on tobacco measures 10.9:1; tobacco as text on kraft 10.9:1, so `--link` can be the field in light.
- **Sky** `#9AD1FF` — the live signal (`--live`): 11.0:1 on ink, 8.9:1 on tobacco. It is the only cold note in the palette; as before it is never text on the light ground, and in dark it is `--link` and `--focus`.
- Secondary text `#584D3E` / `#A89D8E` (6.3 / 6.7), tertiary `#665A4A` / `#998E7F` (5.1 / 5.6), rules `#CCC1AB` / `#2C261D`, edges `#86785F` / `#6F6353` (3.3 / 3.1).

The token names changed with the palette: `--blue` → `--field`, `--blue-deep` → `--field-deep`, `--acid` → `--live`. Every rule in this document that reads "ultramarine" or "acid" now means tobacco and sky; the Field Rule, the Acid-Means-Live Rule (now the Live Rule), the Background-Only Rule and the 4.5 Floor all hold unchanged.


## Experience: the fold (added 2026-09-11)

At rest a chapter shows the field, the date, the company, the role, the lead sentence, the missions and the stack. The rest of the story sits behind a native `<details>` whose summary is a pill button ("Lire le récit" / "Replier", the arrow turning). No script: it opens without JavaScript; where the browser can animate `::details-content` with `interpolate-size`, it slides, elsewhere it appears. The button takes the same rising fill as every other button.

An odometer that rolled the years from one chapter's field into the next's was built the same day and removed at the user's request: it did not earn its place.


## Three registers: the story and the catalogue (added 2026-09-11)

Shiron's work comes in three kinds: roles in companies, freelance missions, personal projects. From a board of five structures the user chose **the story and the catalogue**: employment stays as chapters (the Experience section, `content/cv.ts`), and the index becomes the catalogue of everything delivered outside employment (`content/projects.ts`, `kind: "freelance" | "perso"`, filters Freelance / Personnel, one page per entry). The section is named "Réalisations" / "Work" and the nav follows the page order: Parcours, Réalisations, Compétences, Contact.

Under the statement, three counters name the registers and link to their sections (`.st-counts`): a number at Display 2 over a label, ruled above, one per register. They are computed from the content, never typed. The catalogue ships with two sample entries marked `sample: true` until the real missions and projects arrive.


## Skills as a ledger (recomposed 2026-09-11)

The four-column grid of groups ("eyes wander everywhere") is replaced by a ruled ledger, one row per group: the group's title, Display 3, in a fixed 18rem left column; the tools on one line at lead size on the right; hairlines between rows. One reading path, top to bottom, the same grammar as the missions list. Below 720px the title stacks above its line. Tools never break inside themselves: each item is `white-space: nowrap`, the middot is bound to the tool it precedes with a non-breaking space, and a real space between items gives the line its break opportunities. The stack line on project pages uses the same markup.


**Recomposed again the same day: capabilities, not tools.** The user found the tool ledger "trop en surface": it did not show a developer who understands the business need and talks to the people who have it. Each row is now a capability (Display 3, left), then on the right one first-person sentence on how it shows in the work, a "Prouvé chez" line linking to the chapters and project pages that prove it, and the tools last, in small faint type. `SkillGroup` gained `statement` and `proof` (a role by org name or a project by slug, resolved to links in Home.tsx). The order is the argument: understanding the need first, building end to end, keeping products alive, automating, data, steering, languages.


**Two columns (same day).** The single ledger asked for too much scrolling. The capabilities now sit in two columns of ruled cells, title over sentence over proof over tools, the hairline above each cell keeping the rows aligned across columns; the languages row runs across both columns on one line. Section height went from about 1 800px to 1 250px at 1680 wide. One column below 900px.


**Phones (2026-09-11).** Below 720px the Education panel is no longer pinned nor viewport-tall: a full-height panel on a phone was empty ground around a small word, and the facts were clipped at the bottom. The panel takes its content's height, the word takes the panel's width, and every scrub value is forced to its finished state.


**Texture on the fields (2026-09-11).** A random scatter of twinkling stars was built first and rejected the same hour ("trop moche"). What replaced it: a regular lattice of the four-point star, 44px pitch, cut out of the field's own text colour by a CSS mask at 7% opacity, so it reads as paper grain; over it a second layer carries the same lattice under a soft diagonal light that crosses the field in 11s, so the stars catch it row after row. Glitter, in order. No script, no per-star elements; both layers sit under the text and take no pointer events; reduced motion keeps the lattice and drops the light. Still the only place the star is texture rather than mark.


## The logo (added 2026-09-11)

Shiron supplied a hand-drawn "SB" monogram (a black S, a grey B) with the wordmark "shiron beskiwin" under it, in two versions: dark for light grounds, light for dark grounds. Exports live in `public/brand/`: `sb-mark-*.png` (the monogram alone, 200px tall, transparent) and `sb-logo-*.png` (monogram plus wordmark, 640px wide). Both variants are rendered and CSS shows the one that matches the theme (`.mark-img--dark` / `--light`), so the swap needs no script.

Where it appears: the header pill, replacing the star-and-"SB" wordmark (monogram at 1.5rem); the footer (full logo at 4rem); and the favicons, `app/icon.png` (512) and `app/apple-icon.png` (180), the monogram on a white square as in the favicon Shiron drew, plus `public/favicon.ico` (32). In the hero, the monogram sits at the centre of the rotating badge (34% of its size, still while the ring turns), which is where a visitor's eye lands after the name. The four-point star stays the site's own mark everywhere else: marquee separator, missions bullet, the sign-off of the close, the texture of the fields.

The entrance (added 2026-09-11, recomposed the same evening): the light monogram at the centre of the ink panel, clamp 6rem→13rem tall, drawn twice — a ghost at 14% and the full mark over it, clipped from the top by the progress so it fills from the foot up as the count runs. It settles in over 720ms on `--ease` from 0.6rem below. The number is no longer display type: it sits small in the bottom row between the name and the role, because the mark is the counter now. A first version put the mark top-left on the header's box as a hand-off; the user asked for it at the centre, loading. The panel is ink in both themes, so only the light file is rendered here — no theme pair.


## The mobile menu (added 2026-09-11)

Below 900px the section row used to sit under the header pills with no ground, and wrote over the page as it scrolled. The user chose a full-screen menu from a board of five (a pill row, a bottom bar, a frosted band, a hiding header, the menu). The bar keeps one row: the mark, the controls, and a "Menu" pill. The menu is an ink veil (bone in dark, the `.band--ink` inversion) with the four sections in display type, the one under the reader at full colour and the others at 38%, the monogram top-left, a round close top-right, the e-mail at the bottom. It wipes down from the top and the links rise in after it; reduced motion shows it at once. While it is open the page behind is locked, focus moves to the close button and returns to the Menu pill on close, Escape closes, and a section link closes it as it jumps.

This lifts the Nothing-Disappears Rule for navigation on narrow screens, by the user's decision. Content still never hides; only the section links wait behind one tap.

## The cursor (added 2026-09-11)

One disc of pure white (`#fff`, the one colour outside the palette: difference against white is the exact negative, against bone it would be tinted), 14px, `mix-blend-mode: difference`, so whatever it crosses is printed in negative under it: bone on ink, ink on bone, the field turned inside out. It trails the pointer on an exponential ease (time constant 80ms, `components/Cursor.tsx`) and swells to 40px over anything clickable (56px was tried first and read as too much), 10px while the button is down. The native cursor is hidden only once the component has mounted on a fine pointer; a touch screen, reduced motion, or a script that never ran keep the browser's own cursor, and the loop runs only while the disc is still catching up, then stops. The blend and the transform sit on the same element, because a transformed parent would isolate the disc from the page and it would invert nothing.
