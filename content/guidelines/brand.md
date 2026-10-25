---
title: Brand guidelines
description: Wordmark, palette with light and dark mode, type, and imagery for sebastienbarbier.com.
version: 0.1.0
status: draft
---

These rules cover the visual identity of [sebastienbarbier.com](https://sebastienbarbier.com): the `sebastienbarbier` wordmark, the warm neutral palette with one gold accent, Open Sans and Source Serif type, and the portrait and project imagery. They apply to the site, the og:images, and any slide, talk, or article that uses the files from [/resources](https://sebastienbarbier.com/resources). Values come from `src/assets/scss/_tokens.scss` on the PR #146 branch. Anything not decided is marked **Open question**.

Agents: load this file before touching logos, colors, fonts, or images. Pair it with [design.md](design.md) for layout and [og-image.md](og-image.md) for share images.

## How to use this file

- **Humans**: download files from [/resources](https://sebastienbarbier.com/resources) and follow the rules below
- **Agents**: read this file before editing `_tokens.scss`, `critical-shell.css`, `_fonts.scss`, `src/assets/images/ressources/`, or `src/assets/favicon/`
- **Siblings**: [writing.md](writing.md), [design.md](design.md), [og-image.md](og-image.md)

## Principles

- **Minimal**: one canvas color, one text color, one accent. Whitespace before decoration
- **Warm neutral**: off-white `#f8f5f2` in light, near-black `#121110` in dark. Never pure white or pure black as the page background
- **Gold is scarce**: links, the primary button, focus, and the active nav item. Nothing else
- **Flat**: no gradients, glows, glass, or textures. The only shadow is the device frame shadow in [design.md](design.md#project-cards-app-projects)
- **Real**: real portrait, real product screenshots, real employer logos. No stock photos, no AI-generated people or fake UI

## Wordmark

The logo is a wordmark: `sebastienbarbier`, lowercase, one line, one weight, drawn as SVG paths (no live font). The resources page describes it as "Wordmark of my first and last name, collapsed into a single line."

### Files

All in `src/assets/images/ressources/`:

- `sebastienbarbier_logo.svg` and `.png`: dark wordmark for light backgrounds. Same file as `sebastienbarbier_logo_v2.*`
- `sebastienbarbier_logo_white.svg` and `.png`: white wordmark (`fill="#fff"`) for dark backgrounds. Same file as `sebastienbarbier_logo_white_v2.*`
- `sebastienbarbier_logo_v1.*` and `sebastienbarbier_logo_white_v1.*`: previous version. Do not use
- `sebastienbarbier_logo_v2.afdesign`: Affinity Designer source

The header inlines the same paths in `app.component.html` so it can recolor through CSS.

### Geometry

- `viewBox="0 0 1900 235"`, a ratio of about 8.1 to 1. Always scale proportionally
- Header: 240 px wide, 190 px below 600 px. og:image: 320 px wide
- Minimum width: 120 px on screen (about 15 px high). **New rule**
- Clear space: at least the wordmark height on every side. **New rule**. **Open question**: no clear space is defined today
- **Open question**: the typeface the wordmark was drawn from is not recorded in the repo. Record it before redrawing or extending the mark

### Color

- On the light background: `$color-on-background` (`#202124`). The header uses `$color-shadow` (`#16161d`) today, and the download file has no fill (renders black). **Open question**: pick one dark value for both
- On the dark background: `$color-on-background` in dark (`#e8eaed`), or the white file. Never `$color-shadow` in dark: it resolves to `#000000`, 1.11:1 on `#121110`
- Never gold, never a gradient, never outlined, never with a drop shadow
- Contrast: 4.5:1 minimum against whatever it sits on

### Misuse

- Do not retype the wordmark in a font
- Do not add the accent (`sébastien`), capitals, spaces, or a dot between the names inside the mark. The accent and capitals belong to the name in text, see [writing.md](writing.md#identity)
- Do not stretch, rotate, crop, or put it on a busy photo
- Do not lock it up with the Shellui, Seven23, or employer logos

## Favicon and app icons

- Today the favicons and Apple touch icon are crops of the portrait (`src/assets/favicon/`). The portrait is unreadable at 16 px. **Open question**: keep the portrait or design a monogram
- `site.webmanifest` has empty `name` and `short_name` and `theme_color` `#000000`. Set `name` to "Sébastien Barbier", `theme_color` to `#f8f5f2`, `background_color` to `#f8f5f2`
- `mask-icon` color `#5bbad5` and `msapplication-TileColor` `#2b5797` are generator defaults, not brand colors. Replace with `#202124` or remove

## Palette

Two themes, switched by `html.dark`. Use the token names; hex values are for reference and for non-CSS surfaces (og:images, slides).

### Light

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| `--sys-color-background` | `#f8f5f2` | Page canvas | |
| `--sys-color-on-background` | `#202124` | Body text, headings | 14.82:1 on background |
| `--sys-color-surface` | `#f2edea` | Bands, badges | |
| `--sys-color-on-surface` | `#202124` | Text on surface | 13.86:1 on surface |
| `--sys-color-primary` | `#1f1d1d` | Footer and mobile menu background, nav text, rules | 15.45:1 on background |
| `--sys-color-on-primary` | `#e8eaed` | Text on primary | 13.92:1 on primary |
| `--sys-color-secondary` | `#865500` | Gold: links, primary button, focus | 5.84:1 on background, 5.46:1 on surface |
| `--sys-color-on-secondary` | `#fff9eb` | Text on gold | 6.04:1 on `#865500` |
| `--sys-color-secondary-variant` | `#c9922e` | Gold on dark panels, selection | 6.10:1 on primary, 2.53:1 on background (do not use there) |
| `--sys-color-on-secondary-variant` | `#202124` | Text on `#c9922e` | 5.85:1 |
| `--sys-color-shadow` | `#16161d` | Shadows, header wordmark today | |

The light gold moved from the previous accent to `#865500` in PR #146 to reach WCAG 2.1 AA (4.5:1) for normal text. The audit measured the old gold "Contact me" link at 3.89:1.

### Dark

| Token | Hex | Role | Contrast |
| --- | --- | --- | --- |
| `--sys-color-background` | `#121110` | Page canvas | |
| `--sys-color-on-background` | `#e8eaed` | Body text, headings | 15.65:1 on background |
| `--sys-color-surface` | `#1a1816` | Bands, badges | |
| `--sys-color-on-surface` | `#e8eaed` | Text on surface | 14.69:1 on surface |
| `--sys-color-primary` | `#e8eaed` | Inverted panels (footer, mobile menu) | |
| `--sys-color-on-primary` | `#121110` | Text on primary | 15.65:1 |
| `--sys-color-secondary` | `#d4a84b` | Gold: links, primary button, focus | 8.53:1 on background, 8.01:1 on surface |
| `--sys-color-on-secondary` | `#121110` | Text on gold | 8.53:1 |
| `--sys-color-secondary-variant` | `#e8c878` | Light gold, selection | 11.64:1 on background, 1.34:1 on primary (do not use there) |
| `--sys-color-on-secondary-variant` | `#121110` | Text on `#e8c878` | 11.64:1 |
| `--sys-color-shadow` | `#000000` | Shadows only, never text or logos | 1.11:1 on background |

Dark component overrides: badges use `#1a1816` with `#e8eaed`; selection inside titles uses `#865500` with `#fff9eb`.

### Palette rules

- Gold is the only hue. Do not add blues, greens, or reds for decoration. **Open question**: there is no error or success color; the site has no forms today
- Do not add a muted gray by eye. **Open question**: the site needs a muted text token (for the footer credit, dates, captions) and a border token (for `nav.end_page`, today `#BBB`), defined for both themes and checked at 4.5:1 and 3:1
- Every new token is defined in light and dark, in `_tokens.scss` and `critical-shell.css`, with its contrast ratio in this table

## Type

Two families, both self-hosted variable fonts in `src/assets/fonts/`, Latin subset (PR #146), `font-display: swap`.

| Family | Files | Use |
| --- | --- | --- |
| Open Sans Variable | `OpenSans-Variable.woff2` (110 KB), `OpenSans-Italic-Variable.woff2` (124 KB) | Body, UI, nav, badges, context labels, buttons |
| Source Serif Variable (Source Serif 4) | `SourceSerif4-Variable.woff2` (145 KB), `SourceSerif4-Italic-Variable.woff2` (153 KB) | `h1` to `h6`, footer email, mobile menu links |

- Weights: 400 and 600 in use, 700 available. No other weights
- Source Serif uses `font-variation-settings: "opsz" 24`
- Fallbacks: `"Open Sans", Helvetica, sans-serif` and `"Source Serif", ui-serif, Georgia, "Times New Roman", Times, serif`. `critical-shell.css` lists `Arial, serif` as the serif fallback; align it with `_tokens.scss`
- Licenses: Open Sans (`OpenSans-LICENSE.txt`) and Source Serif 4 (`SourceSerif4-OFL.txt`, SIL Open Font License) ship with the fonts
- No third font family. No Google Fonts or other font CDN
- **Open question**: the brief for these guidelines says "Open Sans", and headings use Source Serif today. Confirm that the serif headings stay. If they go, the home page saves 145 KB of fonts

## Imagery

### Portrait

- Source: `sebastienbarbier_profile_full.jpg`, with 1024, 512, and 256 px square versions (JPEG, plus WebP at 1024). Taken in New York, lying on a wooden deck at dusk with the skyline behind
- Alt text: "Portrait of Sébastien lying on a wooden deck at dusk, with the New York skyline in the background."
- Use the original when space allows, as the resources page asks. Square crops only. No filters, frames, or background removal
- Today it is the default `og:image` for pages without their own `shareImage`. [og-image.md](og-image.md) replaces that with generated covers
- **Open question**: a second, more formal portrait for recruiters and conference programs

### Project images

- Real screenshots only, shown in the browser frame (`.thumbnail.browser`) or device shells (`.thumbnail.devices`, Seven23) from `app-projects`
- Export at 1800 px and 600 px (`*.1800.jpg`, `*.600.jpg`) plus WebP, as the Chefclub set does. Run `pnpm run optimize:images`
- Every image has `width`, `height`, and descriptive `alt`

### Employer and client logos

- Use the official files in `src/assets/images/<company>/`. Grayscale on the site
- Provide a dark-mode variant for every logo (see [design.md](design.md#logo-band-we-worked-together))

### Icons

- Social icons in `src/assets/images/logos/`. Each has a dark (`*_gold.svg`, despite the name `#1f1d1d`) and a `*_white.svg` version for dark mode. **Open question**: rename the `*_gold.svg` files, since none of them is gold
- UI icons (theme toggle) are inline SVG, 24 px grid, `stroke-width: 1.75`, `currentColor`

## Anti-patterns (flag these)

- Gradients, glows, or textures anywhere
- Any hue other than the gold accent
- Hex values that are not in the palette tables
- Wordmark retyped, recolored gold, stretched, or below 120 px wide
- `$color-shadow` used for text or logos in dark mode
- Stock photography or AI-generated images of people or products
- A third font family or a font CDN
- Images without dimensions or alt text
