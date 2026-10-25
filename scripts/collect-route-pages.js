/**
 * Collect prerendered routes and optional `data.og` blocks from Angular route files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, 'src', 'app');
const APP_ROUTES = path.join(APP_DIR, 'app.routes.ts');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function joinUrl(...parts) {
  const url =
    '/' +
    parts
      .flatMap((part) => String(part).split('/'))
      .filter(Boolean)
      .join('/');
  return url === '/' ? '/' : url.replace(/\/$/, '') || '/';
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
    const end = i + 1 < matches.length ? matches[i + 1].index : start + 1200;
    const block = source.slice(start, end);
    if (/redirectTo:/.test(block)) {
      continue;
    }
    const load = block.match(/import\(\s*['"]\.\/([^'"]+)\.module['"]\s*\)/);
    blocks.push({
      path: matches[i].path,
      loadChildren: load ? load[1] : null,
      block,
    });
  }
  return blocks;
}

function extractBalanced(source, startIndex, openChar, closeChar) {
  let depth = 0;
  let i = startIndex;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (ch === openChar) depth++;
    if (ch === closeChar) {
      depth--;
      if (depth === 0) {
        return source.slice(startIndex, i + 1);
      }
    }
  }
  return null;
}

function parseStringLiteral(raw) {
  const m = raw.match(/^(['"`])([\s\S]*)\1$/);
  if (!m) return raw.trim();
  return m[2].replace(/\\'/g, "'");
}

function parseRouteData(block) {
  const dataIdx = block.indexOf('data:');
  if (dataIdx < 0) return {};
  const braceStart = block.indexOf('{', dataIdx);
  if (braceStart < 0) return {};
  const dataBlock = extractBalanced(block, braceStart, '{', '}');
  if (!dataBlock) return {};

  const out = {};
  const title = dataBlock.match(/title:\s*(null|['"][^'"]*['"]|DESCRIPTION\.\w+)/);
  if (title) {
    out.title =
      title[1] === 'null'
        ? null
        : title[1].startsWith('DESCRIPTION.')
          ? null
          : parseStringLiteral(title[1].trim());
  }

  const desc = dataBlock.match(/description:\s*(DESCRIPTION\.\w+|['"][^'"]*['"])/);
  if (desc) {
    out.descriptionRef = desc[1].startsWith('DESCRIPTION.') ? desc[1] : null;
    if (!out.descriptionRef) {
      out.description = parseStringLiteral(desc[1].trim());
    }
  }

  const state = dataBlock.match(/state:\s*['"]([^'"]+)['"]/);
  if (state) out.state = state[1];

  const ogIdx = dataBlock.indexOf('og:');
  if (ogIdx >= 0) {
    const ogBrace = dataBlock.indexOf('{', ogIdx);
    const ogBlock = extractBalanced(dataBlock, ogBrace, '{', '}');
    if (ogBlock) {
      out.og = {};
      for (const key of ['eyebrow', 'title', 'description']) {
        const re = new RegExp(`${key}:\\s*['"]([^'"]*)['"]`);
        const hit = ogBlock.match(re);
        if (hit) out.og[key] = hit[1];
      }
    }
  }

  return out;
}

function resolveDescriptions(source, data) {
  if (data.description) return data.description;
  if (!data.descriptionRef) return '';
  const key = data.descriptionRef.replace('DESCRIPTION.', '');
  const constRe = new RegExp(
    `'${key}':\\s*\`([\\s\\S]*?)\`|'${key}':\\s*['"]([^'"]*)['"]`,
  );
  const hit = source.match(constRe);
  if (!hit) return '';
  return (hit[1] || hit[2] || '').trim();
}

function routingModulesFor(loadChildren) {
  const dir = path.join(APP_DIR, path.dirname(loadChildren));
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('-routing.module.ts'))
    .map((name) => path.join(dir, name));
}

function slugForPath(urlPath) {
  if (urlPath === '/') return 'home';
  return urlPath.replace(/^\//, '').replace(/\//g, '-');
}

function collectOgPages() {
  const appSource = read(APP_ROUTES);
  const pages = [];
  const appRoutes = extractRouteBlocks(appSource);

  for (const route of appRoutes) {
    if (route.path === '**' || route.path === '404') continue;

    const parentPath = joinUrl(route.path);
    const parentData = parseRouteData(route.block);

    if (!route.loadChildren) {
      pages.push(buildPage(appSource, parentPath, parentData));
      continue;
    }

    for (const routingFile of routingModulesFor(route.loadChildren)) {
      const childSource = read(routingFile);
      for (const child of extractRouteBlocks(childSource)) {
        if (child.path.includes(':')) {
          continue;
        }
        const url = joinUrl(parentPath, child.path);
        const childData = parseRouteData(child.block);
        const merged = {
          ...parentData,
          ...childData,
          og: { ...(parentData.og || {}), ...(childData.og || {}) },
        };
        pages.push(buildPage(childSource + appSource, url, merged));
      }
    }
  }

  return pages.filter((p) => p.path !== '/404');
}

function buildPage(sources, urlPath, data) {
  const description = resolveDescriptions(sources, data);
  const og = data.og || {};
  const title =
    og.title ||
    data.title ||
    (data.state === 'home' ? 'Sébastien Barbier' : 'Sébastien Barbier');

  return {
    slug: slugForPath(urlPath),
    path: urlPath,
    state: data.state || slugForPath(urlPath),
    title,
    eyebrow: og.eyebrow || '',
    description: og.description || description,
    routeTitle: data.title,
  };
}

module.exports = { collectOgPages, slugForPath };
