---
title: Design guidelines
description: Layout, spacing, components, motion, and light and dark mode rules for sebastienbarbier.com.
version: 0.1.0
status: draft
---

These rules cover how pages on [sebastienbarbier.com](https://sebastienbarbier.com) are composed and styled. The identity stays minimalist: a warm off-white canvas, Open Sans for text, Source Serif headings, generous whitespace, and a single scarce gold accent. Every value below comes from the repo (`src/assets/scss/_tokens.scss`, `_variables.scss`, `theme.scss`, `_baseline.scss`, and component styles on the PR #146 branch) unless it is marked **New rule** or **Open question**.

Agents: load this file before changing templates or SCSS. Pair it with [writing.md](writing.md) for copy and [brand.md](brand.md) for logo, palette, and type.

## How to use this file

- **Humans**: read this file in the repo under `content/guidelines/design.md`
- **Agents**: read this file before editing `src/app/**/*.html`, `*.scss`, `src/critical-shell.css`, or `src/index.html`
- **Siblings**: [writing.md](writing.md), [brand.md](brand.md), [og-image.md](og-image.md)
- **Modeled on**: the Shellui design and web design guidelines (`https://shellui.com/design.md`, `https://shellui.com/guidelines/web-design.md`)

Review changes against every rule below. Output concise findings with `file:line`.

## Stack

Design changes must fit the existing stack. No new framework, CSS library, or design-system package.

- Angular 22 with prerendering (`ng run sebastienbarbier:prerender`), routes listed in `static.paths.txt`, published as static files to GitHub Pages
- Styles: SCSS. Tokens in `src/assets/scss/_tokens.scss` as CSS custom properties (`--sys-*`, `--comp-*`). SCSS aliases in `_variables.scss` (`$color-background`, `$color-secondary`, …). Use the aliases in component SCSS, never raw hex
- `src/critical-shell.css` is inlined into `index.html` by `scripts/sync-critical-shell.js` for first paint. Any token change goes into `_tokens.scss` and `critical-shell.css` in the same commit
- Theme: `html.dark` class, set by the inline head script in `index.html` and by `ThemeService` (`src/app/shared/theme/theme.service.ts`), stored in `localStorage.theme`, defaulting to `prefers-color-scheme`
- One header (`app.component.html`), one footer (`route-footer`), one theme toggle (`app-theme-toggle`). Do not add a second nav, an announcement bar, or another theme switch

## Layout

Pages are single-column reading layouts inside one centred container.

- **Container**: `.wrapper .container`, `max-width: 1200px` (`$container_width`), centred
- **Narrow container**: `.container.centered`, `max-width: 700px`, for reading pages (Resources, Contact, Legal)
- **Gutters**: 80 px at 900 px and up, 50 px from 600 to 899 px, 20 px below 600 px, plus `env(safe-area-inset-left/right)`
- **Breakpoints** (mixins in `_variables.scss`): phone below 600 px, tablet portrait 600 px, tablet landscape 900 px, desktop 1200 px, big desktop 1800 px. Use the mixins, never a raw media query
- **Header**: fixed, transparent, 30 px by 50 px padding (20 px below 900 px). Wordmark left, nav and theme toggle right. The wordmark hides after 40 px of scroll (`scrollTriggerPx`)
- **Top offset**: inner pages use `.wrapper.pt` (`padding-top: 130px`) so the fixed header never covers the `h1`
- **Home hero**: fills the first viewport (`100dvh`), content centred vertically on desktop and bottom-aligned below 900 px
- **Bands**: full-width `section` elements use `$color-surface` with 55 px top and 50 px bottom padding inside the container. Use a band only to separate a different kind of content (logos, footer), not every block
- **Footer**: full-width, `$color-primary` background, 6 rem vertical padding on "Get in touch"
- **Measure**: body copy stays under about 75 characters per line. Long prose goes in `.container.centered`. **New rule**
- **Scroll**: document-level scrolling only. Do not reintroduce a nested scroll container (removed in PR #146)

## Spacing

The repo uses a small set of recurring values. Reuse them; do not add new ones without a reason.

- **Base**: `16px` root font size, `line-height: 1.6`
- **Section rhythm**: 50 px (`.mt`, `.mb`, `nav.end_page` margin), 55 px (band top), 60 px (`.pb`), 130 px (page top), 6 rem (footer contact block)
- **Headings**: `margin-top: 1.2em`, `margin-bottom: 0.8em`, `padding: 4px 0`, `line-height: 1.2em`
- **Inline gaps**: 4 px (nav items), 5 px (badges, skills), 8 px (header actions), 10 px and 20 px (home social rule), 24 px (footer links)
- **Hit targets**: 44 px minimum height and width for every link styled as a button, nav link, icon link, and the theme toggle. Already applied in PR #146; keep it
- Prefer more whitespace over a border or a box. Never add a border to fix weak hierarchy

## Typography

Type rules are summarised here and specified in [brand.md](brand.md#type).

- **Body**: Open Sans Variable, 16 px, weight 400, `line-height: 1.6`
- **Headings `h1` to `h6`**: Source Serif Variable, weight 600, `font-variation-settings: "opsz" 24`
- **Heading sizes (desktop)**: `h1` 4.2em, `h2` 2.8em, `h3` 2.2em, `h4` 2em, `h5` 1.8em, `h6` 1.6em. They step down at 900 px and 600 px as defined in `theme.scss`. The home `h1` uses 3.5em at 1200 px and below, 2.8em below 900 px, 2.2em below 600 px
- **Context label** (`h1 span`, `h3 span`): Open Sans, 0.4em of the heading (0.23em on `h1`), uppercase, weight 400, opacity 0.8. It sits above the heading
- **UI labels** (nav): Open Sans 600, 0.95rem, `letter-spacing: 0.02em`
- **Minimum size**: no visible text below 14 px on any viewport. **New rule**. It fixes the home "Contact me" link, which renders at 11.2 px (`a.btn.small`, `font-size: 0.7em`)
- One `h1` per page, headings in order, no skipped levels

## Color use

Palette values and contrast ratios live in [brand.md](brand.md#palette). Use roles, not hex.

- **Background**: `$color-background`. **Text**: `$color-on-background`
- **Surface bands and badges**: `$color-surface` with `$color-on-surface`
- **Accent (gold)**: `$color-secondary` for links, active nav, the primary button, and focus rings. Gold is scarce: one primary action per viewport, no gold headings, no gold body paragraphs
- **Accent on dark surfaces**: `$color-secondary-variant` (`#c9922e` light, `#e8c878` dark) only on `$color-primary` or dark surfaces. Never `$color-secondary-variant` on the light background (2.53:1)
- **Selection**: `$color-secondary-variant` background with `$color-on-secondary-variant` text, as today
- **No gradients**: no `linear-gradient`, `radial-gradient`, or `conic-gradient` fills, washes, glows, or text effects. The hard-stop `linear-gradient` in the `device-phone-buttons` and `device-tablet-buttons` mixins only draws device button notches and is the one allowed use. **Open question**: replace it with plain elements
- **No hardcoded colors** in templates or component SCSS. Replace `#999` (footer credit, 2.62:1 on light and 2.36:1 on the dark-mode footer) and `#BBB` (`nav.end_page` borders) with tokens. **Open question**: there is no muted text or border token yet, see `README.md`
- Contrast: body text and links 4.5:1 minimum, large text (24 px, or 18.66 px bold) and UI borders 3:1 minimum, in both themes

## Components

Reuse the components below. A new component needs a reason a current one cannot cover.

### Buttons

`a.btn` today is a transparent, uppercase, gold text link (`letter-spacing: 1.2px`, `padding: 16px 40px`). The audit found the primary action too small and too quiet (conversion 3.5/10).

- **Primary button** (**New rule**): one per page. Filled `$color-secondary` background with `$color-on-secondary` text (`#fff9eb` on `#865500`, 6.04:1 in light; `#121110` on `#d4a84b`, 8.53:1 in dark). 16 px Open Sans 600, minimum 44 px high, padding 12 px by 24 px, radius 8 px (the radius already used by nav links and the theme toggle)
- **Secondary button**: the current text style `a.btn`, 16 px minimum. Use for "See more projects" and similar
- **Do not use `a.btn.small`** for a primary action. Keep it only for low-priority inline actions, at 14 px minimum
- Buttons that navigate are `<a routerLink>` or `<a href>`. Actions are `<button>`. Remove `role="button"` from links that navigate
- Hover and focus increase contrast. Focus ring: `outline: 2px solid $color-secondary; outline-offset: 2px`, as on the theme toggle. Never remove an outline without this replacement
- **Open question**: keep uppercase tracked labels on buttons or move to sentence case

### Home hero

- Contents, in order: `h1` (role, speciality, place, see [writing.md](writing.md#positioning-and-headlines)), one supporting sentence, the primary button, then the social icon row
- The 1 px rule before the social icons (`ul:before`, `border-top: solid 1px $color-primary`, 30 px or 200 px wide) is a brand motif. Keep it
- Social icons: 44 px hit area, icon 1.6em, opacity 0.7 to 1 on hover. In dark mode use the `*_white.svg` variants (the `*_gold.svg` files are actually `#1f1d1d` and disappear on `#121110`)
- Proof moves up (**New rule**): the "We worked together" logo band appears within the first two viewports of the home page, before the project list or directly after the first project. The audit found it three screens down

### Project cards (`app-projects`)

- Thumbnail (browser frame or device shells), `h3` with a date range label, one-paragraph summary, badges, one link
- Summary sentence states the outcome or role before the stack (see [writing.md](writing.md#proof-and-results))
- Link label: one consistent verb phrase for all cards, not "More about it"
- Radii follow the existing nesting: frame 12 px, screen 10 px; phone 16 px or 28 px outer with 12 px or 24 px inner. Child radius is never larger than the parent
- The only shadow in the system is the device or browser frame shadow `0 10px 28px rgba(22, 22, 29, 0.1)`. No other shadows

### Badges

- `ul.badges li` or `.badge`: `--comp-badge-*` tokens, padding 4 px by 8 px, radius 3 px, 0.8em
- Badges list technologies only. Five per card at most. **New rule**

### Logo band ("We worked together")

- Grayscale logos (`filter: grayscale(100%)`), `max-height: 80px`, four per row on desktop, two per row below 900 px
- Dark mode (**New rule**): every logo must reach 3:1 against `$color-surface`. Use the white variant where one exists (`unique-logo-white.svg`) and a light version for the others. Today the Unique and Chefclub logos are nearly invisible in dark mode
- The caption links to `/resume` with an underlined link, as today

### Navigation

- Desktop (900 px and up): inline links Home, Projects, Resume, Contact, then the theme toggle. Active link: gold text on a 12 % gold tint (`color-mix(in srgb, $color-secondary 12%, transparent)`)
- Below 900 px: hamburger (46 px) opening a full-screen menu on `$color-primary` with Source Serif links at 3em to 3.6em
- Nav labels are Title Case single words. Do not add items without updating both the desktop and mobile lists
- `nav.end_page` (previous and next project) stays at the bottom of project pages

### Footer

- "Get in touch" label, the email as a large Source Serif link (2.8em, 1.5em below 900 px), social links, then the credit line with Resources and Legal links
- The email address is the main contact path. Keep it visible on every page
- Links in the footer reach 4.5:1 against the footer background in both themes

### Theme toggle

- `app-theme-toggle`: 44 px square, radius 8 px, sun icon in light and moon icon in dark, `aria-label` "Switch to dark mode" or "Switch to light mode"
- The circular reveal (`theme-reveal`, 0.4 s) runs through the View Transitions API and is skipped under `prefers-reduced-motion`

## Light and dark mode

Both themes are first-class. Preview every change in both before merging.

- Light is the default when the system has no preference and nothing is stored
- Tokens switch on `html.dark`. Components must use tokens so they switch for free. No `@media (prefers-color-scheme)` in component SCSS; the head script already resolves it
- `color-scheme` and `<meta name="theme-color">` match the background: `#f8f5f2` light, `#121110` dark (set by `ThemeService.applyTheme`)
- The inline head script must stay before the stylesheet so there is no flash of the wrong theme
- `$color-primary` inverts between themes (`#1f1d1d` light, `#e8eaed` dark). Anything painted with `$color-primary` as a background (footer, mobile menu) becomes a light panel in dark mode. Check text on it

### Dark mode defects found on the PR #146 build

Fix these before dark mode ships. Measured on a local prerender of PR #146 on 25 October 2026.

- **Header wordmark**: `fill: $color-shadow` resolves to `#000000` in dark, 1.11:1 on `#121110`. Use `$color-on-background` for the wordmark fill in both themes (`#202124` light is 14.82:1, `#e8eaed` dark is 15.65:1). **Open question**: light mode currently uses `#16161d`; switching to `#202124` is a visible change
- **Footer and mobile menu**: in dark they render on `#e8eaed`. Footer social links use `$color-secondary-variant` (`#e8c878`), 1.34:1, and the credit line uses `#999`, 2.36:1. The active mobile menu link has the same 1.34:1 problem. **Open question**: keep these panels inverted (light in dark mode) with dark text and `$color-secondary` links, or render them on `$color-surface` (`#1a1816`, where `#e8c878` reaches 10.93:1)
- **Home social icons**: `*_gold.svg` icons are `#1f1d1d`, invisible on `#121110`. Swap to `*_white.svg` in dark
- **Logo band**: the Unique and Chefclub logos lose contrast on `#1a1816`. See [Logo band](#logo-band-we-worked-together)

## Motion

- Route changes: `site-main` fades and slides (280 ms out, 320 ms in) through View Transitions. The header does not animate
- Animate `opacity` and `transform` only. Never `transition: all`. Replace the existing `transition: all` on the hamburger spans, mobile menu links, and header logo `svg`
- Every animation has a `prefers-reduced-motion: reduce` path that disables it, as `_view-transitions.scss` does
- Prefer `<video>` (muted, `playsinline`) over animated GIF. `src/assets/images/animations/` holds `.gif` and `.mp4` copies of the Notes by Firefox animations, unused today; if they come back, use the `.mp4` with a poster frame

## Performance budget

The audit scored performance 7/10 and found that no Largest Contentful Paint (LCP) was recorded on any page, with 603 KB of fonts. On the PR #146 build the home `h1` is recorded as LCP at about 250 ms (unthrottled, local), and the home page loads 255 KB of fonts (Open Sans 110 KB and Source Serif 145 KB). PR #146 reports a Lighthouse mobile LCP of 9.7 s under simulated throttling.

- The LCP element on every page is server-rendered text (the `h1`) or an image with `fetchpriority="high"`. Never hide prerendered content until hydration
- Do not fade in, translate, or set `opacity: 0` on the `h1` or hero during first load
- Fonts (**New rule**): at most two families (Open Sans, Source Serif), Latin subset, `font-display: swap`, preload only Open Sans. Load italics only on pages that use them. Budget: 260 KB of fonts on the home page
- Images: explicit `width` and `height`, `loading="lazy"` below the fold, WebP with a PNG or JPEG fallback through `<picture>`, as on project cards
- Budget (**New rule**): Lighthouse mobile LCP under 2.5 s on home, resume, and every project page, measured on the prerendered build. **Open question**: the reported 9.7 s is dominated by JavaScript startup, so the 2.5 s target may need a change in how the app boots
- Third-party scripts: Sentry only. No analytics or tag managers without a decision. **Open question**: the audit found no analytics, so there is no way to measure the CTA rules above

## Accessibility

- Landmarks: `header`, `nav` with `aria-label`, `main`, `footer`
- One `h1`, ordered headings, a skip link to `main` before the header. **New rule**
- Icon-only links and buttons have an `aria-label`. Decorative images get `alt=""`
- Visible focus on every interactive element, never color alone for state
- Text contrast as in [Color use](#color-use), checked in both themes
- The hamburger checkbox is `aria-hidden`; the label must still be reachable and announce "Open menu"

## Anti-patterns (flag these)

- Raw hex values in component SCSS or inline `style` attributes
- Gradients of any kind, apart from the device notch mixins
- Text under 14 px, or a primary action styled as `a.btn.small`
- More than one primary button in a viewport
- Gold body text, gold headings, or `$color-secondary-variant` on the light background
- New shadows, new radii, or borders used to fix hierarchy
- `transition: all`
- Animation without a reduced-motion path
- Content hidden until hydration, or an `h1` that animates in
- New font families or weights outside Open Sans and Source Serif
- `role="button"` on navigation links
- Components that only work in one theme
- A second nav, footer, or theme toggle

## Review output

```text
## src/app/home/home.component.html

src/app/home/home.component.html:10 - primary action uses a.btn.small (11.2 px); use the primary button
src/app/home/home.component.html:7 - github_logo_gold.svg is #1f1d1d; invisible in dark mode

## src/app/app.component.scss

src/app/app.component.scss:73 - wordmark fill $color-shadow is #000000 in dark (1.11:1)
```

State the issue and the location. Skip explanation unless the fix is not obvious.
