#!/usr/bin/env node
/**
 * Reads Angular route files and writes:
 *   - static.paths.txt  (prerender list)
 *   - static/sitemap.xml
 *
 * Run automatically via `pnpm run build` (prebuild).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'src', 'app');
const APP_ROUTES = path.join(APP_DIR, 'app.routes.ts');
const PATHS_FILE = path.join(ROOT, 'static.paths.txt');
const SITEMAP_FILE = path.join(ROOT, 'static', 'sitemap.xml');
const SITE_ORIGIN = 'https://sebastienbarbier.com';

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function joinUrl(...parts) {
  const url = '/' + parts
    .flatMap((part) => String(part).split('/'))
    .filter(Boolean)
    .join('/');
  return url;
}

function extractRouteBlocks(source) {
  const matches = [];
  const re = /path:\s*['"]([^'"]*)['"]/g;
  let match;
  while ((match = re.exec(source))) {
    matches.push({ path: match[1], index: match.index });
  }

  const blocks = [];
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i + 1 < matches.length ? matches[i + 1].index : start + 800;
    const block = source.slice(start, end);
    if (/redirectTo:/.test(block)) {
      continue;
    }
    const load = block.match(/import\(\s*['"]\.\/([^'"]+)\.module['"]\s*\)/);
    blocks.push({
      path: matches[i].path,
      loadChildren: load ? load[1] : null,
    });
  }
  return blocks;
}

function routingModulesFor(loadChildren) {
  const dir = path.join(APP_DIR, path.dirname(loadChildren));
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('-routing.module.ts'))
    .map((name) => path.join(dir, name));
}

function collectRoutes() {
  const urls = new Set();
  const appRoutes = extractRouteBlocks(read(APP_ROUTES));

  for (const route of appRoutes) {
    if (route.path === '**') {
      continue;
    }

    const parent = joinUrl(route.path);
    urls.add(parent);

    if (!route.loadChildren) {
      continue;
    }

    for (const routingFile of routingModulesFor(route.loadChildren)) {
      for (const child of extractRouteBlocks(read(routingFile))) {
        if (child.path === '**') {
          continue;
        }
        urls.add(joinUrl(parent, child.path));
      }
    }
  }

  if (urls.size === 0) {
    throw new Error('No routes found in Angular route files.');
  }

  // Put "/" last. Angular prerender renames index.html → index.original.html when
  // rendering the home route; doing that after other routes avoids a parallel race.
  return [...urls].sort((a, b) => {
    if (a === '/') return 1;
    if (b === '/') return -1;
    return a.localeCompare(b);
  });
}

function writePaths(routes) {
  const lines = routes.join('\n') + '\n';
  fs.writeFileSync(PATHS_FILE, lines);
}

function writeSitemap(routes) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated from Angular routes. Do not edit. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.mkdirSync(path.dirname(SITEMAP_FILE), { recursive: true });
  fs.writeFileSync(SITEMAP_FILE, xml);
}

function writeDistRedirects(routes) {
  const distEn = path.join(ROOT, 'dist', 'en');
  if (!fs.existsSync(distEn)) {
    console.log('Skipped dist/en redirects (folder not found).');
    return;
  }

  const projectRoutes = routes.filter(
    (route) => route === '/projects' || route.startsWith('/projects/'),
  );
  for (const dest of projectRoutes) {
    const from = dest.replace(/^\/projects/, '/works');
    const dir = path.join(distEn, ...from.slice(1).split('/'));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'index.html'),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Redirecting…</title>
  <link rel="canonical" href="${SITE_ORIGIN}${dest}">
  <meta http-equiv="refresh" content="0; url=${dest}">
  <script>location.replace(${JSON.stringify(dest)} + location.search + location.hash);</script>
</head>
<body>
  <p>This page has moved to <a href="${dest}">${dest}</a>.</p>
</body>
</html>
`,
    );
  }
  console.log(`Wrote ${projectRoutes.length} /works → /projects redirects in dist/en`);
}

const routes = collectRoutes();
writePaths(routes);
writeSitemap(routes);

console.log(`Generated ${routes.length} routes:`);
for (const route of routes) {
  console.log(`  ${route}`);
}
console.log(`Wrote ${path.relative(ROOT, PATHS_FILE)}`);
console.log(`Wrote ${path.relative(ROOT, SITEMAP_FILE)}`);

if (process.argv.includes('--dist-redirects')) {
  writeDistRedirects(routes);
}
