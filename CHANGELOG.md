# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

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

## [2.6.0] - 2026-08-23

### 🚨 Changed

- Rename Twitter to X
- Migrate from npm to pnpm
- Deploy to GitHub Pages only
- Generate `static.paths.txt` and `sitemap.xml` from Angular routes before prerender

### 🛠 Improvements

- Improve SEO by keeping prerendered HTML visible (remove noscript wrapper) and skipping first-load enter animations to avoid a hydrate flash
- Shorten meta descriptions and fix missing image alt attributes on work pages
- Add Open Graph and Twitter Card tags, per-page canonical URLs, and richer Person JSON-LD
- Strengthen the home page title for search click-through

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
