# sebastienbarbier.com guidelines, draft v1

Draft v1 of the writing, design, brand, and og:image guidelines for [sebastienbarbier.com](https://sebastienbarbier.com), modeled on the Shellui guidelines (`shellui/website`, `content/guidelines/`). Prepared on 25 October 2026 by Wilson; integrated on `develop` by Atlas; updated with Sébastien's decisions on 25 October 2026.

## Contents

```text
content/guidelines/
  README.md                      this file: sources, audit mapping, open questions
  writing.md                     voice, tone, punctuation, banned words, examples
  design.md                      layout, spacing, components, light and dark mode, motion, performance
  brand.md                       wordmark, palette (light and dark), type, imagery
  og-image.md                    spec for one generated 1200x630 share image per page
content/blog/                    Markdown blog posts (build copies to src/assets/blog/)
scripts/
  generate-og-images.js          Satori + sharp build-time og:image generator
  generate-blog-files.js         blog index, RSS, og pages, assets
static/og/                       generated PNGs (content-hashed names, not committed)
static/rss.xml                   generated RSS feed
```

## Sources

Every value comes from one of these, read on 25 October 2026:

- `sebastienbarbier/sebastienbarbier.com`, branch `develop`: `_tokens.scss`, routes, templates, `content/blog/`, `static/llms.txt`
- Local prerender and Lighthouse on `dist/en` (performance 97, LCP 2.6 s, accessibility 100)
- Shellui guidelines and audit draft v1

Rules marked **New rule** are proposals that do not exist in the code yet. Rules marked **Open question** need a decision from Sébastien.

## Decisions recorded by Atlas (25 October 2026, technical integration)

See prior README section for serif headings, buttons, wordmark, tokens, dark footer, social icon names, og pipeline.

## Decisions by Sébastien (25 October 2026, content and product)

1. **Audience and availability**: the site targets **staff-level engineering roles and freelance work, both**. Sébastien is **available to hire now**. The home page shows a short availability line below the hero `h1` (the `h1` text is unchanged). Primary CTAs: **Download resume** (PDF at `/sebastien-barbier-resume.pdf`) and **Contact** (`contact@sebastienbarbier.com`), repeated in the footer.
2. **Analytics**: **no** analytics on the site.
3. **Testimonials**: a **Recommendations** section on the home page (after the logo band) and on the resume page. Quotes live in `src/app/shared/testimonials/testimonials.data.ts` (Greg Tappero / Chefclub, Florian Rüegg / Houzy). No photos; name, role, company, source. French quote stays primary with a labeled English translation.
4. **Blog**: `/blog` with list and post pages, Markdown in `content/blog/`, prerendered routes, RSS at `/rss.xml` with autodiscovery in `index.html`, sitemap entries, og:image per post, JSON-LD `BlogPosting`, and a **Blog** nav link. First post published with `<!-- draft_review: true -->` in the Markdown source for Sébastien to review.
5. **Place spelling**: **Zürich** everywhere in site text, meta, JSON-LD, and resume presentation (event names like ZurichJS Conf stay as proper nouns).

## Open questions

1. **Home `h1` rewrite**: guidelines still recommend a role-led hero; Sébastien kept the existing tenure-led `h1` and added availability below it instead.
2. **Resume content**: how to title the 2021 to 2023 DeFi period, and what to list for 2026 beyond Shellui.
3. **Mobile LCP target**: local Lighthouse mobile LCP is 2.6 s with performance 97. Is 2.5 s still the hard target for every change?
4. **Wordmark spec**: clear space and minimum size are proposed, not decided. The source typeface of the wordmark is not recorded.
5. **Favicon**: keep the portrait crop or design a monogram. Replace the generator default colors `#5bbad5` and `#2b5797`.
6. **Footer credit**: keep "Developed with ❤️ and lots of ☕️" or replace it.
7. **Gradient exception**: the device notch mixins use a hard-stop `linear-gradient`. Keep as the one exception or redraw with plain elements.
8. **og:image theme and slot**: publish dark covers anywhere, and add a screenshot slot on project covers or keep covers text-only.

## Checks run

- No em or en dashes in guideline files
- `pnpm run build` on `develop` after blog and testimonials integration
- Testimonial quotes match approved sources verbatim (with allowed [Chefclub] and [il] markers only)
