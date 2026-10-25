#!/usr/bin/env node
/**
 * Build-time og:image generator (Satori + sharp).
 * Reads route `data.og` via scripts/collect-route-pages.js and tokens from _tokens.scss.
 * Spec: content/guidelines/og-image.md
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { collectOgPages } = require('./collect-route-pages');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_FILE = path.join(ROOT, 'src', 'assets', 'scss', '_tokens.scss');
const LOGO_FILE = path.join(ROOT, 'scripts', 'og', 'assets', 'sebastienbarbier_logo.svg');
const OUT_DIR = path.join(ROOT, 'static', 'og');
const MANIFEST_FILE = path.join(ROOT, 'static', 'og-manifest.json');
const GENERATED_TS = path.join(ROOT, 'src', 'app', 'og-share-manifest.generated.ts');
const SITE_ORIGIN = 'https://sebastienbarbier.com';

const SIZE = { width: 1200, height: 630 };
const PAD = 80;
const LIMITS = { eyebrow: 40, title: 40, description: 120 };

function extractBalanced(source, startIndex) {
  let depth = 0;
  for (let i = startIndex; i < source.length; i++) {
    const ch = source[i];
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) {
        return source.slice(startIndex + 1, i);
      }
    }
  }
  return '';
}

function parseTokensFromScss(scss) {
  function block(selector) {
    const idx = scss.indexOf(selector);
    if (idx < 0) return '';
    const brace = scss.indexOf('{', idx);
    return extractBalanced(scss, brace);
  }

  function readVars(section) {
    const vars = {};
    for (const line of section.split('\n')) {
      const m = line.match(/(--[\w-]+):\s*(#[0-9a-fA-F]{3,8});/);
      if (m) vars[m[1]] = m[2].toLowerCase();
    }
    return vars;
  }

  const light = readVars(block(':root'));
  const dark = readVars(block('html.dark'));

  function theme(vars) {
    return {
      background: vars['--sys-color-background'],
      text: vars['--sys-color-on-background'],
      accent: vars['--sys-color-secondary'],
      rule: vars['--sys-color-primary'],
    };
  }

  const lightTheme = theme(light);
  const darkTheme = theme(dark);
  for (const [name, t] of [
    ['light', lightTheme],
    ['dark', darkTheme],
  ]) {
    for (const key of Object.keys(t)) {
      if (!t[key]) {
        throw new Error(`Missing token ${key} for ${name} theme in _tokens.scss`);
      }
    }
  }

  return { light: lightTheme, dark: darkTheme };
}

function font(pkg, file) {
  return fs.readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`));
}

const FONTS = [
  {
    name: 'Open Sans',
    data: font('open-sans', 'open-sans-latin-400-normal.woff'),
    weight: 400,
    style: 'normal',
  },
  {
    name: 'Open Sans',
    data: font('open-sans', 'open-sans-latin-600-normal.woff'),
    weight: 600,
    style: 'normal',
  },
  {
    name: 'Source Serif',
    data: font('source-serif-4', 'source-serif-4-latin-600-normal.woff'),
    weight: 600,
    style: 'normal',
  },
];

function clamp(text, max) {
  if (!text) return '';
  const clean = text.trim().replace(/\s+/g, ' ');
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > 0 ? space : cut.length).replace(/[,;:.]$/, '')}…`;
}

function checkLimits(page) {
  const errors = [];
  for (const key of Object.keys(LIMITS)) {
    if (page[key] && page[key].length > LIMITS[key]) {
      errors.push(`${page.slug}: ${key} is ${page[key].length} chars, limit ${LIMITS[key]}`);
    }
  }
  if (/[\u2013\u2014]/.test(JSON.stringify(page))) {
    errors.push(`${page.slug}: em or en dash found, use a hyphen`);
  }
  if (!page.title) {
    errors.push(`${page.slug}: missing title`);
  }
  return errors;
}

function h(type, style, children) {
  return { type, props: { style, children } };
}

function logoDataUri(theme) {
  const svg = fs
    .readFileSync(LOGO_FILE, 'utf8')
    .replace(
      '<g fill-rule="nonzero">',
      `<g fill="${theme.text}" fill-rule="nonzero">`,
    );
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function cover(page, theme) {
  const titleSize = page.title.length > 28 ? 64 : 76;
  return h(
    'div',
    {
      width: SIZE.width - PAD * 2,
      height: SIZE.height - PAD * 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: PAD,
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: 'Open Sans',
    },
    [
      {
        type: 'img',
        props: {
          src: logoDataUri(theme),
          width: 320,
          height: 40,
          style: { width: 320, height: 40 },
        },
      },
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        [
          page.eyebrow
            ? h(
                'div',
                {
                  fontSize: 28,
                  fontWeight: 600,
                  color: theme.accent,
                  marginBottom: 16,
                },
                clamp(page.eyebrow, LIMITS.eyebrow),
              )
            : null,
          h(
            'div',
            {
              fontFamily: 'Source Serif',
              fontWeight: 600,
              fontSize: titleSize,
              lineHeight: 1.15,
              maxWidth: SIZE.width - PAD * 2,
            },
            clamp(page.title, LIMITS.title),
          ),
          page.description
            ? h(
                'div',
                {
                  fontSize: 30,
                  lineHeight: 1.45,
                  marginTop: 24,
                  maxWidth: 960,
                },
                clamp(page.description, LIMITS.description),
              )
            : null,
        ].filter(Boolean),
      ),
      h('div', { display: 'flex', flexDirection: 'row', alignItems: 'center' }, [
        h(
          'div',
          { width: 120, height: 2, backgroundColor: theme.rule, marginRight: 20 },
          '',
        ),
        h(
          'div',
          { fontSize: 26, fontWeight: 600, color: theme.accent },
          'sebastienbarbier.com',
        ),
      ]),
    ],
  );
}

function ogAlt(page) {
  const parts = [page.title];
  if (page.eyebrow) parts.push(page.eyebrow);
  return parts.join(', ');
}

function writeGeneratedTs(manifest) {
  const body = `/** Generated by scripts/generate-og-images.js. Do not edit. */
export type OgShareEntry = {
  imagePath: string;
  absoluteUrl: string;
  alt: string;
  width: number;
  height: number;
};

export const OG_SHARE_MANIFEST: Record<string, OgShareEntry> = ${JSON.stringify(manifest, null, 2)} as const;
`;
  fs.mkdirSync(path.dirname(GENERATED_TS), { recursive: true });
  fs.writeFileSync(GENERATED_TS, body);
}

async function main() {
  const scss = fs.readFileSync(TOKENS_FILE, 'utf8');
  const themes = parseTokensFromScss(scss);
  const theme = themes.light;

  const pages = collectOgPages();
  if (pages.length === 0) {
    throw new Error('No og pages collected from routes');
  }

  let errors = [];
  for (const page of pages) {
    errors = errors.concat(checkLimits(page));
  }
  if (errors.length) {
    console.error('og:image validation failed:\n' + errors.join('\n'));
    process.exit(1);
  }

  const { default: satori } = await import('satori');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {};
  const usedHashes = new Set();

  for (const page of pages) {
    const svg = await satori(cover(page, theme), { ...SIZE, fonts: FONTS });
    const png = await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9 })
      .toBuffer();

    const hash = crypto.createHash('sha256').update(png).digest('hex').slice(0, 8);
    if (usedHashes.has(hash)) {
      throw new Error(`Hash collision for ${page.slug}`);
    }
    usedHashes.add(hash);

    const fileName = `${page.slug}.${hash}.png`;
    const filePath = path.join(OUT_DIR, fileName);
    fs.writeFileSync(filePath, png);

    const imagePath = `/og/${fileName}`;
    manifest[page.path] = {
      imagePath,
      absoluteUrl: `${SITE_ORIGIN}${imagePath}`,
      alt: ogAlt(page),
      width: SIZE.width,
      height: SIZE.height,
    };

    console.log(
      `Wrote static/og/${fileName} (${Math.round(png.length / 1024)} KB) for ${page.path}`,
    );
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n');
  writeGeneratedTs(manifest);
  console.log(`Wrote ${path.relative(ROOT, MANIFEST_FILE)} and og-share-manifest.generated.ts`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
