---
title: Writing guidelines
description: Voice, tone, punctuation, and review rules for copy on sebastienbarbier.com.
version: 0.1.0
status: draft
---

These rules cover every word on [sebastienbarbier.com](https://sebastienbarbier.com): page copy, headings, buttons, `alt` text, route titles and descriptions in `src/app/**/*.routes.ts` and `*-routing.module.ts`, `static/llms.txt`, and the text on og:images. The site exists to get Sébastien hired or contacted for senior engineering work, so every page should say who he is, what he is good at, and what to do next.

Agents: load this file before writing or reviewing copy. The `version` field in the frontmatter is the guidelines version. This is a draft: rules marked **Open question** are not decided yet, see `README.md`.

## How to use this file

- **Humans**: read this file in the repo under `content/guidelines/writing.md`
- **Agents**: read this file before editing any `.html` template, route `data`, `resume.data.ts`, or `llms.txt`
- **Siblings**: [design.md](design.md) for layout and components, [brand.md](brand.md) for logo, palette, type, and imagery, [og-image.md](og-image.md) for share images
- **Modeled on**: the Shellui writing guidelines (`https://shellui.com/guidelines/writing.md`), adapted for a personal site written in the first person

Review files against every rule below. Output concise findings. Sacrifice grammar for brevity.

## Identity

The facts below are the only identity claims copy may make. Add new ones here first, with a source.

- **Name**: Sébastien Barbier, with the accent, everywhere a font supports it. `Sebastien Barbier` only in URLs, handles, and the JSON-LD `alternateName`. The footer currently says "Sebastien Barbier"; fix it
- **Wordmark text**: `sebastienbarbier`, lowercase, one word. Only inside the logo, never typed as a name in prose
- **Role**: Staff Software Engineer (page `<title>`, JSON-LD `jobTitle`, resume `h1`). Use the same role on every surface
- **Place**: Zürich, Switzerland. **Open question**: the resume says "Zurich" and the meta tags say "Zürich". Pick one spelling and use it everywhere
- **Experience**: 16+ years ("sixteen years" in the home `h1`, "16+ years" on the resume). Use numerals: `16+ years`
- **Current work**: building [Shellui](https://shellui.com), an open-source microfrontend shell and CLI (TypeScript, React, Python/Django)
- **Proof to name**: frontend lead for an agentic AI platform at Unique AG (2023 to 2025, Staff Frontend Engineer), SAP FSM extensibility concept (Associate Development Architect, 2020 to 2021), Mozilla Test Pilot (Notes by Firefox), Chefclub, Seven23
- **Availability**: **Open question**. Not stated anywhere today. Do not write "open to work", "available from", or a rate until Sébastien decides

## Positioning and headlines

The audit scored value proposition 4/10 and audience 4/10 because the home `h1` states tenure only ("a full-stack developer with over sixteen years of work experience"). It names no role, speciality, or next step, and it contradicts the "Staff Software Engineer" title.

- The home `h1` answers three questions in one or two sentences: what role, what speciality, where. Tenure is supporting detail, not the headline
- Role in the `h1` matches the `<title>` and JSON-LD `jobTitle`. Never "full-stack developer" in one place and "Staff Software Engineer" in another
- Lead with the strongest verifiable proof: a named company or project, not an adjective
- One line under the `h1` says what you can ask for and links to it (see [Calls to action](#calls-to-action))
- Each page `h1` names the page job ("Resume", "Projects", "Contact"). Each project `h1` is the project name. The small headline above it (`h1 span`) gives the context ("Personal project", "Client work") and must be accurate
- Write for two readers in this order: a hiring manager or recruiter scanning for 10 seconds, then an engineer checking depth

Example built only from facts already on the site:

```text
Before: Hi, I'm Sébastien, I am a full-stack developer with over sixteen years of work experience.
After:  I'm Sébastien, a staff software engineer in Zürich. I led frontend for an agentic AI platform at Unique AG and now build Shellui, an open-source microfrontend shell.
```

## Voice and tone

The site speaks as Sébastien, in the first person. Calm, precise, friendly, and specific.

- First person singular: `I`, `my`. Never "we" unless a named team did the work ("we shipped Notes with the Test Pilot team")
- Address the reader as `you` when giving an instruction ("Email me at…")
- Active voice. Test: append "by monkeys". If the sentence still parses, rewrite it
- Present tense for what is true now, past tense for past roles. Never describe an ended role in the present
- Target sentences under 20 words. Paragraphs 2 to 4 sentences
- Contractions are fine (`I'm`, `don't`)
- No rhetorical questions
- Evidence over adjectives: name the company, product, stack, number, or result
- Professional first. Personal interests (travel, photography, Web3) stay on `/contact` under "About life" and never in the home hero, resume summary, or project openers
- Humour and emoji: never in headings, buttons, meta descriptions, or og:images. The footer line "Developed with ❤️ and lots of ☕️" is the one existing exception. **Open question**: keep it or not

### Tone by page

- **Home**: confident and short. Role, speciality, proof, one action
- **Resume**: neutral and factual. Dates, titles, results. No self-praise adjectives
- **Project pages**: case study order: problem, your role, what you built, result, stack. Stack last, not first
- **Contact**: direct and warm. Say what to contact you about and how fast you reply only if that is true
- **Resources and Legal**: plain reference text

## Proof and results

The audit scored proof 5/10: logos sit three screens down, and project pages list stacks instead of outcomes.

- Every project page states your role in the first paragraph ("I led the frontend", "I was the only developer")
- Every project page gives at least one result in numbers where one exists (tests in CI, users, time saved). Use only numbers you can source. Never estimate
- Write results as `verb + what + number`: "Added 1,000+ tests in CI", not "Robust test coverage"
- Name employers and clients exactly as on the resume: `Unique AG`, `SAP (Schweiz) AG, FSM`, `Mozilla`, `Chefclub`
- Testimonials: **Open question**. None exist on the site. Never invent or paraphrase a quote. Only publish a quote with the person's name, role, and written consent

## Calls to action

The audit scored conversion 3.5/10: the only action on the home page is an 11.2 px uppercase "Contact me" link.

- One primary action per page. On home and project pages it is "Email me" or "Contact me" linking to `/contact` or `mailto:contact@sebastienbarbier.com`
- Button labels are a verb plus an object: "Email me", "Download resume (PDF)", "See all projects". Never "Click here", "Learn more", or "More about it"
- Rename "More about it" on project cards to "Read the case study" or "View <project name>". Keep one label for all cards
- The resume offers a download only when a PDF exists. **Open question**: there is no resume PDF today
- Sentence case for buttons and links in body copy. The existing `text-transform: uppercase` on `.btn` is a style decision in [design.md](design.md), not a copy rule. Write the label in sentence case in the template

## Banned words

- `easy`, `simple`, `quick`, `just`, `simply`, `really`, `very`: filler or pressure on the reader. Cut, or give a concrete fact
- `passionate`, `ninja`, `rockstar`, `guru`, `wizard`, `10x`: self-description that proves nothing. Name the work instead
- `seamless`, `robust`, `powerful`, `cutting-edge`, `next-generation`, `leverage`, `unlock`, `world-class`: marketing fog. Name the behaviour
- `etc.` and `and more` at the end of a skills list: list the items or stop
- Weasel quantifiers without a figure: `many`, `several`, `significantly`, `often`. Give the number or drop the claim
- Vendor slang tied to a moment ("thanks to ChatGPT and Copilot") in professional copy: it dates fast. Say what you do now

## Punctuation and typography

- Never use em dashes (U+2014) or en dashes (U+2013). Not in copy, titles, meta descriptions, alt text, code comments, or commit messages for this site
- For a pause, use a hyphen with spaces (` - `), a comma, a colon, or a new sentence. The footer and contact copy already use ` - `
- Ranges: write `2023 to 2025` in prose. In compact UI such as the project card date (`2026 - Present`), keep the spaced hyphen
- Hyphens in compound words stay: `full-stack`, `open-source`, `microfrontend`
- No space before `!`, `?`, `:`, or `;`. "Let's connect !" becomes "Let's connect"
- Avoid exclamation marks in headings
- Ellipsis is one character `…`, not three dots
- Apostrophes: templates use typographic `’` today and route data uses straight `'`. **Open question**: pick one convention. Until then, do not mix styles inside one file
- Brand casing: `GitHub`, `LinkedIn`, `X`, `Instagram`, `Stack Overflow`, `JavaScript`, `TypeScript`, `Django REST Framework`. The footer currently writes "Linkedin" and "Github"; fix them
- Numbers: numerals for counts and years (`16+ years`, `98 hours`, `1,000+ tests`). Comma as thousands separator in English copy
- Units: number, space, unit: `110 KB`, `250 ms`. Seconds may be bare: `9.7s`
- `&` only where space is tight (nav, footer). "Legal & copyright" is fine in the footer and the route title

## Headings

- Sentence case for `h1` to `h6`: "Work experience", "Relevant skills". Proper nouns keep their case
- One `h1` per page
- Headings describe the content. "We worked together" is fine; "Full stack" on the Shellui page should say what was built
- The small context label inside a heading (`<h1><span>…</span>Title</h1>`) is 1 to 4 words, sentence case in source

## Meta titles, descriptions, and llms.txt

The audit scored SEO 7/10 and AI readiness 4/10. Titles and descriptions are the copy most people see first, in search results and link previews.

- `<title>` pattern: `Page - Sébastien Barbier`, set by `updatePageSeo()` in `app.component.ts`. Home: `Sébastien Barbier | Staff Software Engineer in Zürich`
- Route `data.title`: 1 to 4 words, the page name
- Route `data.description`: 160 characters at most, one or two sentences, starts with the subject, includes role and place on home, resume, and contact. The home description is 182 characters today; shorten it
- Every prerendered route in `static.paths.txt` has a title and a description, except `/404`
- `static/llms.txt` repeats the identity facts above, word for word. Update it in the same PR as any identity change
- og:image text follows [og-image.md](og-image.md): eyebrow up to 40, title up to 40, description up to 120 characters

## Alt text

- Describe what the image shows and why it is there: "Shellui documentation site on a laptop screen", not "screenshot"
- Logos: the company name only ("SAP"). Not "SAP Company logo"
- Decorative icons next to a text label get `alt=""`
- Never start with "Image of" or "Picture of"

## Source formatting

- One sentence or paragraph per line in markdown. Don't hard-wrap
- No `---` rules between sections in markdown, apart from frontmatter
- Copy lives in templates and `*.data.ts`. Do not duplicate a fact in two places when one can import the other

## Anti-patterns (flag these)

- Em dash or en dash anywhere
- Home `h1` without role, speciality, or place
- Role mismatch between `h1`, `<title>`, JSON-LD, and `llms.txt`
- "full-stack developer" as the headline role
- Personal or Web3 content in the home hero, resume summary, or project opener
- Project page whose first paragraph lists a stack instead of the problem and your role
- Claims without a source, invented numbers, invented quotes
- Buttons labelled "Click here", "Learn more", "More about it"
- Space before `!` or `?`
- "Linkedin", "Github", "Sebastien" without the accent in prose
- Banned words from the list above
- Rhetorical questions
- Stale tool references in professional copy
- Paragraphs over 4 sentences
- Missing route description on a prerendered page

## Review output

Group by file. Use `file:line`. Terse findings.

```text
## src/app/home/home.component.html

src/app/home/home.component.html:4 - h1 states tenure only; add role, speciality, place
src/app/home/home.component.html:10 - "Contact me" is the only action; see design.md Buttons

## src/app/shared/footer/footer.component.html

src/app/shared/footer/footer.component.html:6 - "Linkedin" → "LinkedIn"
src/app/shared/footer/footer.component.html:7 - "Github" → "GitHub"
src/app/shared/footer/footer.component.html:13 - "Sebastien" → "Sébastien"
```

State the issue and the location. Skip explanation unless the fix is not obvious.
