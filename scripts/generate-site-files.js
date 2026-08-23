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
  const blocks = [];
  const re = /path:\s*['"]([^'"]*)['"]/g;
  let match;
  while ((match = re.exec(source))) {
    const window = source.slice(match.index, match.index + 800);
    const load = window.match(/import\(\s*['"]\.\/([^'"]+)\.module['"]\s*\)/);
    blocks.push({
      path: match[1],
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
  const urls = routes
    .map((route) => {
      const loc = route === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${route}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
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

const routes = collectRoutes();
writePaths(routes);
writeSitemap(routes);

console.log(`Generated ${routes.length} routes:`);
for (const route of routes) {
  console.log(`  ${route}`);
}
console.log(`Wrote ${path.relative(ROOT, PATHS_FILE)}`);
console.log(`Wrote ${path.relative(ROOT, SITEMAP_FILE)}`);
