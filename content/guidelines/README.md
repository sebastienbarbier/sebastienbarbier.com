# sebastienbarbier.com guidelines, draft v1

Draft v1 of the writing, design, brand, and og:image guidelines for [sebastienbarbier.com](https://sebastienbarbier.com), modeled on the Shellui guidelines (`shellui/website`, `content/guidelines/`). Prepared on 25 October 2026 by Wilson; integrated on `develop` by Atlas.

## Contents

```text
content/guidelines/
  README.md                      this file: sources, audit mapping, open questions
  writing.md                     voice, tone, punctuation, banned words, examples
  design.md                      layout, spacing, components, light and dark mode, motion, performance
  brand.md                       wordmark, palette (light and dark), type, imagery
  og-image.md                    spec for one generated 1200x630 share image per page
scripts/
  generate-og-images.js          Satori + sharp build-time og:image generator
  og/assets/sebastienbarbier_logo.svg
static/og/                       generated PNGs (content-hashed names, not committed)
```

## Sources

Every value comes from one of these, read on 25 October 2026:

- `sebastienbarbier/sebastienbarbier.com`, branch `develop` (after PR #146 merged): `_tokens.scss`, `_variables.scss`, `theme.scss`, `_baseline.scss`, `_fonts.scss`, `_view-transitions.scss`, `critical-shell.css`, `index.html`, component templates and SCSS, route files, `resume.data.ts`, `static/llms.txt`, `src/assets/`
- A local prerender (`ng run sebastienbarbier:prerender`, Node 24), screenshotted in light and dark at 1440x900 and 390x844, with computed styles and fonts loaded measured in Chrome
- Contrast ratios computed with the WCAG 2.1 relative luminance formula
- Shellui guidelines: `content/guidelines/writing.md`, `design.md`, `web-design.md` in `shellui/website`
- Audit draft: `/workspace/sebastienbarbier-website-audit-v1-draft.1.pdf` (overall 5.0/10)

Rules marked **New rule** are proposals that do not exist in the code yet. Rules marked **Open question** need a decision from Sébastien.

## What PR #146 and follow-up work fix

- Light gold moved to `#865500` / `#8a6100` (>= 4.5:1 on the background), dark mode added with `#121110`
- Desktop nav links shown inline, 44 px hit targets on the home actions
- Document-level scrolling, hydration, and a measurable LCP on the home `h1`
- Lighthouse mobile on `dist/en` (local simulated): performance **97**, LCP **2.6 s**, accessibility **100**, SEO 100, best practices 100
- Latin font subsets: the home page loads about 255 KB of fonts (audit baseline: 603 KB)
- `static/llms.txt`
- Public resume PDF at `/sebastien-barbier-resume.pdf` (download on the resume page; may land in a parallel PR on `develop`)

## Dark mode fixes shipped with this integration

- Header wordmark uses `$color-on-background` (`#202124` light, `#e8eaed` dark)
- Footer and mobile menu use `$color-surface` (`#1a1816`) in dark mode with `$color-on-surface` text and `$color-secondary` links
- Home social icons: `*_dark.svg` (formerly misnamed `*_gold.svg`) in light, `*_white.svg` in dark
- Unique logo: white variant in dark; Chefclub: invert filter in dark; SAP and Mozilla brightened in dark
- Muted and border tokens replace `#999` and `#BBB` (see `_tokens.scss`)

## Decisions recorded by Atlas (25 October 2026)

These were open in draft v1; they are now the default until Sébastien changes them:

1. **Serif headings**: keep Source Serif 4 for `h1` to `h6`
2. **Primary button**: filled gold (`$color-secondary` background, `$color-on-secondary` text), sentence-case labels (no uppercase tracking on `.btn`)
3. **Apostrophes**: typographic `’` in templates and user-facing copy
4. **Wordmark color (light)**: `#202124` (`$color-on-background`), including the header SVG fill
5. **Muted and border tokens**: `--sys-color-muted`, `--sys-color-muted-on-primary`, `--sys-color-border` in `_tokens.scss` (4.5:1 / 3:1 checked in both themes)
6. **Dark footer and mobile menu**: render on `$color-surface` (`#1a1816`), not inverted light panels
7. **Social icon names**: rename misnamed `*_gold.svg` files to `*_dark.svg`
8. **og:image data**: route `data.og` (eyebrow, optional title, short description); generator reads routes via `scripts/collect-route-pages.js`
9. **og:image files**: build-time only under `static/og/` with an 8-character content hash in the file name; `static/og-manifest.json` and `src/app/og-share-manifest.generated.ts` committed; PNGs gitignored
10. **og:image theme**: light covers only, text-only layout (no screenshot slot yet)
11. **Token sync**: `scripts/generate-og-images.js` reads palette tokens from `_tokens.scss` automatically

## Audit categories and the rules that address them

The target is 9+ in every category. Guidelines set the rules; several categories also need new content or a decision, noted below.

| Audit category (weight, score) | Rules that address it | Also needed beyond the rules |
| --- | --- | --- |
| Value proposition (12, 4) | writing.md: Positioning and headlines (role, speciality, place in the `h1`; before and after example). design.md: Home hero | Sébastien approves the new `h1` |
| Audience fit (10, 4) | writing.md: Identity (one role everywhere), Voice and tone (professional first, personal content only on `/contact`), Positioning (two readers in order) | Decide the target: hiring, freelance, or both (open question 1) |
| Conversion and CTAs (12, 3.5) | writing.md: Calls to action (verb plus object labels, one primary action). design.md: Buttons (filled gold primary button, 16 px, 44 px high), Typography (14 px minimum), Home hero (action before icons), Footer | Availability statement, analytics (open questions 2, 9) |
| Proof and credibility (12, 5) | writing.md: Proof and results (role and number in every project opener, exact employer names, no invented quotes). design.md: Logo band moved into the first two viewports, Project cards outcome-first | Real numbers per project, testimonials with consent (open question 4) |
| Resume (8, 7) | writing.md: Identity, Tone by page (resume), Proof and results. design.md: Buttons (download action) | Title of the 2021 to 2023 period; 2026 entry (open question 5) |
| Content and writing (8, 2) | writing.md covers voice for any new page. design.md: Measure and narrow container for reading pages | A notes or writing section with RSS. No rule can create content (open question 6) |
| Visual design (7, 6.5) | design.md: all sections. brand.md: Principles, Palette, Type, Imagery. No gradients, scarce gold, token-only colors | Dark mode defects addressed in this integration |
| Navigation and IA (6, 5) | design.md: Navigation (desktop inline links, identical mobile list), Footer (email on every page), `nav.end_page` | |
| Performance (5, 7) | design.md: Performance budget (no hidden prerendered content, two font families, 260 KB font budget, italics only where used, LCP under 2.5 s). brand.md: Type. og-image.md: File budget | Mobile LCP now 2.6 s locally; keep perf >= 95 on changes (open question 8) |
| Accessibility (5, 7.5) | design.md: Color use (4.5:1 and 3:1 in both themes), Typography (14 px minimum), Accessibility (skip link, focus rings, labels), Motion (reduced motion), dark fixes. brand.md: contrast tables. writing.md: Alt text | Muted and border tokens shipped |
| SEO (6, 7) | writing.md: Meta titles, descriptions, and llms.txt. og-image.md: one cover per page, `og:image:width`, `height`, `alt`. brand.md: manifest and favicon fixes | Generated og covers wired in this integration |
| Mobile (4, 7) | design.md: Layout (breakpoint mixins, gutters, safe areas), Spacing (44 px hit targets), Typography (14 px minimum), Navigation | |
| AI readiness (2, 4) | writing.md: `llms.txt` repeats the identity facts word for word, one role across `h1`, `<title>`, JSON-LD, and `llms.txt`. og-image.md: `og:image:alt` | |
| Copy quality (3, 5) | writing.md: Punctuation and typography (no em or en dashes, no space before `!`, brand casing), Banned words, Headings, Anti-patterns | Fix the existing typos and casing ("Linkedin", "Github", "Let's connect !", "Sebastien") |

## Open questions

1. **Audience and availability**: is the site for a staff-level job search, freelance work, or both? Nothing on the site states availability, location preference, or work type, and the guidelines forbid inventing one
2. **Analytics**: the site has no analytics, so the CTA and proof rules cannot be measured. Add privacy-friendly analytics or not
3. **Testimonials**: none exist. Collect quotes with name, role, and consent, or leave proof to logos and numbers
4. **Resume content**: how to title the 2021 to 2023 DeFi period, and what to list for 2026 beyond Shellui
5. **Writing section**: add notes, posts, or talks with RSS (content scored 2/10). Format and cadence are undecided
6. **Mobile LCP target**: local Lighthouse mobile LCP is 2.6 s with performance 97. Is 2.5 s still the hard target for every change?
7. **Wordmark spec**: clear space and minimum size are proposed, not decided. The source typeface of the wordmark is not recorded
8. **Favicon**: keep the portrait crop or design a monogram. Replace the generator default colors `#5bbad5` and `#2b5797`
9. **Place spelling**: "Zürich" (meta tags, JSON-LD context) or "Zurich" (resume)
10. **Footer credit**: keep "Developed with ❤️ and lots of ☕️" or replace it
11. **Gradient exception**: the device notch mixins use a hard-stop `linear-gradient`. Keep as the one exception or redraw with plain elements
12. **og:image theme and slot**: publish dark covers anywhere, and add a screenshot slot on project covers or keep covers text-only

## Checks run

- No em or en dashes in any file in this folder
- Every hex value in the guidelines appears in the repo or is a computed contrast pair
- `scripts/generate-og-images.js` runs on Node 22 and 24 and writes 11 light covers; worst-case strings at the text limits stay inside the safe zone
