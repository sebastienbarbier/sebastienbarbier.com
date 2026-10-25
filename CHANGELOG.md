# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### 🛠 Improvements

- Dark mode logo fixes: transparent Mozilla wordmark with a white variant in the partner row; resume, contact, and project watermark logos adjusted so dark-on-white assets no longer show as white boxes
- Route navigation scrolls to top on new pages (`withInMemoryScrolling`, View Transition aware); back/forward restores position; single router config for browser and SSR
- Recommendations meta no longer shows dates on the site (dates remain in `testimonials.data.ts`)


- Home availability line and primary CTAs (Download resume, Contact); same CTAs in the footer
- Recommendations on home and resume: Greg Tappero (CTO, Chefclub), Florian Rüegg (Houzy), and Derek Smith (2020-11-06); English default for Greg with an accessible French toggle; minimalist section styling
- Blog at `/blog` with Markdown posts in `content/blog/`, RSS at `/rss.xml`, prerender, og covers, and BlogPosting JSON-LD
- First post: "Why I am starting a blog when AI writes everything" (marked `draft_review` in source)
- Navigation link to Blog; spell place as Zürich across site copy and resume presentation
- Guidelines README updated with Sébastien's decisions (audience, no analytics, testimonials, blog, Zürich)

- Draft v1 content guidelines under `content/guidelines/` (writing, design, brand, og:image, README)
- Build-time og:image covers (Satori + sharp): route `data.og`, content-hashed PNGs in `static/og/`, `og:image` / `twitter:image` with width, height, type, and alt on every page
- Muted and border design tokens; og generator reads palette from `_tokens.scss`
- Dark mode fixes: header wordmark contrast, footer and mobile menu on `$color-surface`, social icon variants, Unique/Chefclub logo band contrast
- Restored minimalist `.btn` links (Open Sans, ~15px, sentence case); calmer page heading scale; Source Serif loading/rendering aligned with `main`; blog post bodies embedded at build time for prerender; two `draft: true` sample posts for layout review (excluded from RSS/sitemap)
- Renamed misnamed `*_gold.svg` social icons to `*_dark.svg`

- Public resume PDF at `/sebastien-barbier-resume.pdf` with a download link on the resume page
- Desktop primary navigation links in the header; mobile keeps the fullscreen menu
- Document-level scrolling (removed nested `.wrapper` scroll container)
- SSR client hydration with event replay; home prerender marked `ngSkipHydration` so the hero H1 stays the LCP element
- Router View Transitions (subtle main slide/fade; fixed header)
- Light/dark theme toggle (system default, localStorage, no-flash head script; Shellui-style circular reveal)
- Subset variable fonts (Latin) and preload only Open Sans for first paint
- Darkened gold accent for WCAG 2.1 AA contrast; larger tap targets on home actions
- Added `/llms.txt` and `rel="describedby"` for LLM crawlers
- Fixed invalid `</li>` markup on the home social list
- Remove per-route Angular enter animations and `BrowserAnimationsModule` (fixes LCP with hydration)
- Split serif fonts into async `/serif-fonts.css`; main bundle loads Open Sans only (~100 KB)
- Disable critical CSS re-inlining that duplicated the stylesheet in HTML
- Responsive `srcset`/`sizes` for project thumbnails; generated 600w/900w variants
- Move page eyebrows out of `h1` for screen readers; fix projects heading order
- Desktop nav from 768px; mobile hero starts below header (same hero copy)
- Audit copy fixes (Vue.js, Web extension, grammar, LinkedIn/GitHub, punctuation)
- JSON-LD `knowsAbout` and `alumniOf`; expanded `llms.txt`; root `favicon.ico`
- Project detail nav: “All projects” + “Next project” labels
- Post-process prerender HTML: defer Angular bootstrap until `load`, load app CSS non-blocking, dedupe stylesheets
- Critical shell uses system serif for the hero H1 until async `/serif-fonts.css` loads (faster LCP)
- Production `namedChunks` for lazy route bundles; Seven23 gallery `srcset` on key screenshots
- Legal page privacy note (no analytics; theme in localStorage only)

### Lighthouse (local mobile simulated, `dist/en`)

- Before audit baseline: performance 57 (LCP 13.0 s), accessibility 96
- After this phase: performance **97** (LCP **2.6 s**, FCP 1.0 s), accessibility **100**, SEO 100, best practices 100

<!---
## [Unreleased] - yyyy-mm-dd

### ✨ Feature – for new features
### 🛠 Improvements – for general improvements
### 🚨 Changed – for changes in existing functionality
### ⚠️ Deprecated – for soon-to-be removed features
### 📚 Documentation – for documentation update
### 🗑 Removed – for removed features
### 🐛 Bug Fixes – for any bug fixes
### 🔒 Security – in case of vulnerabilities
### 🏗 Chore – for tidying code

See for sample https://raw.githubusercontent.com/favoloso/conventional-changelog-emoji/master/CHANGELOG.md
-->

## [2.7.3] - 2026-10-23

### 🛠 Improvements

- Move AI skills to first on resume relevant skills and add autonomous systems
- GraphQL added to resume skills

### 🏗 Chore

- Bump `@angular/router` to 22.2.1

## [2.7.2] - 2026-10-19

### 🐛 Bug Fixes

- Keep the home hero at full viewport height in Safari

## [2.7.1] - 2026-10-14

### 🐛 Bug Fixes

- Float the top nav and menu control over page content with a transparent header bar
- Left align the resume conferences list at natural width instead of stretching full width

## [2.7.0] - 2026-10-14

### 🛠 Improvements

- Align resume page and site copy with the current resume (SAP role, education, layout, and experience bullets)
- Reorder home and footer social links to LinkedIn, GitHub, X, Instagram
- Shorten the projects page subtitle to On the side
- Add prerendered `/404` route and GitHub Pages `404.html` for missing URLs
- Keep the site footer at the bottom on short pages

### 🚨 Changed

- Simplify the not-found page to a single title

### 🏗 Chore

- Bump `@angular/router` to 22.2.0, `@angular/ssr` to 22.1.7, and sharp to 0.35.5

## [2.6.1] - 2026-09-29

### 🛠 Improvements

- Reduce home page flash of unstyled content with critical shell CSS inlined in `index.html`, a build-time sync script, and Angular critical CSS inlining
- Restructure Person JSON-LD as an `@graph` linking Shellui, FromEdwin, and Seven23, with an unaccented primary name and `alternateName` for Sébastien Barbier
- Point FromEdwin project links to the GitHub organization instead of the retired site
- Update Seven23 project thumbnail corner radius and refresh layout preview images

### 🐛 Bug Fixes

- Fix footer "Get in touch" heading contrast on the dark background
- Set FromEdwin project dates to 2022-2024 on the projects list and project page
- Remove duplicate upcoming DjangoCon Europe 2026 entry from the resume conferences list

## [2.6.0] - 2026-08-23

### ✨ Feature

- Add Shellui to the projects list, ahead of Seven23, and move FromEdwin to the full projects page

### 🚨 Changed

- Rename Twitter to X
- Migrate from npm to pnpm
- Deploy to GitHub Pages only
- Generate `static.paths.txt` and `sitemap.xml` from Angular routes before prerender
- Rename the Works page to Projects (`/works` → `/projects`) and redirect the old URLs

### 🛠 Improvements

- Improve SEO by keeping prerendered HTML visible (remove noscript wrapper) and skipping first-load enter animations to avoid a hydrate flash
- Shorten meta descriptions and fix missing image alt attributes on work pages
- Add Open Graph and Twitter Card tags, per-page canonical URLs, and richer Person JSON-LD
- Strengthen the home page title for search click-through
- Add lastmod to the generated sitemap, update legal hosting to GitHub Pages, and use project images for work-page social previews
- Compress and resize large work screenshots, serve WebP via picture elements, and exclude unused full-resolution assets from the build
- Shrink the main JS bundle by lazy-loading Sentry, scoping markdown to the resume route, and dropping unused polyfills/deps (aos, web-animations-js, mapbox, katex)

### 🏗 Chore

- Upgrade Angular from 20 to 22 and bump remaining dependencies
- Replace deprecated TSLint with ESLint
- Remove deprecated Protractor, Codelyzer, and ecstatic packages

### 🗑 Removed

- Remove `@sebastienbarbier/design-system` and keep the theme locally in the site


## [2.5.2] - 2026-01-02

### 🛠 Improvements

- Add ZurichJS Conf 2026 (#120)

## [2.5.1] - 2026-01-01

### 🛠 Improvements

- Add DjangoCon 2026 (#118)

## [2.5.0] - 2025-11-16

### 🛠 Improvements

- Rename nomadlist social network to nomads (#114)
- Add Front conference 2026 (#115)
- Update resume (#117)

### 🔒 Security

- Update dependencies (#107)

## [2.4.1] - 2024-12-07

### 🛠 Improvements

- Add missing link to sitemap (#110)
- Fix wrong description on Notes by Firefox (#111)
- Fix minor typos (#112)

## [2.4.0] - 2024-06-17

### 🛠 Improvements

- Use @sebastienbarbier/design-system package for defining theming (#105)
- Add DjangoCon 2024 in conferences list (#104)

### 🐛 Bug Fixes

- Remove temporary fix for Firefox variable font bug (#97)

## [2.4.0] - 2024-06-17

### 🛠 Improvements

- Use @sebastienbarbier/design-system package for defining theming (#105)
- Add DjangoCon 2024 in conferences list (#104)

### 🐛 Bug Fixes

- Remove temporary fix for Firefox variable font bug (#97)

## [2.3.0] - 2024-04-20

### 🛠 Improvements

- Update resume with latest position at Unique (#102)

### 🔒 Security

- Security update (#92)

## [2.2.2] - 2023-10-03

### 🐛 Bug Fixes

- Fix wrong description within resume (#94)
- Fix wrong spacing on homepage in Chrome (#95)
- Fix wrong font on Firefox (#96)

## [2.2.1] - 2023-09-27

### 🛠 Improvements

- Add contrast to resume graph to be more visible (#87)
- Improve descrition text for resume experiences (#88)
- Improve skill section with more precise terms (#89)

## [2.2.0] - 2023-09-15

### 🛠 Improvements

- Update seven23's presentation (#77)
- Update fromEdwin's presentation (#78)
- Add version number in app (#80)
- Add radar graph for resume to introduice skills (#83)
- Update projects with better screens (#84)

## [2.1.0] - 2023-06-16

### 🛠 Improvements

- Fix typos (#68)
- Improve performance based on lighthouse reports (#69)
- Improve SEO (#71)
- Update dependencies (#74)
- Update resume (#75)
- Print of webpage cut content (#76)

### 🔒 Security

- Bump engine.io and socket.io (#70)

## [2.0.3] - 2023-04-12

### 🛠 Improvements

- Improve responsiveness and styling (#66)
- Minor changes in footer (#65)

### 🔒 Security

- Security update (#64)

## [2.0.2] - 2023-04-03

### 🛠 Improvements

- Add current position in resume (#--)

### 🔒 Security

- Security update (#--)

## [2.0.1] - 2023-02-26

### ✨ Feature

- Add missing sitemap link to robots.txt (#56)
- Improve SEO (#59)

### 🐛 Bug Fixes

- Fix header alignment with text on mobile (#57)

### 🏗 Chore

- Remove duplicated code with different styling (#58)

## [2.0.0] - 2023-02-20

### ✨ Feature

- New design layout

## [1.1.0] - 2022-09-014

### ✨ Feature

- Add resume page

## [1.0.0] - 2021-08-03

### ✨ Feature

- Initial commit
