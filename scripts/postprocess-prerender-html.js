#!/usr/bin/env node
/**
 * Post-process prerendered HTML: defer Angular bootstrap, non-blocking stylesheets,
 * dedupe stylesheet links, fix serif noscript.
 */
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist', 'en');

const scriptRe =
  /<script src="(runtime[^"]+\.js)" type="module"><\/script><script src="(polyfills[^"]+\.js)" type="module"><\/script><script src="(main[^"]+\.js)" type="module"><\/script>/;

function deferBootstrap(html, runtime, polyfills, main) {
  const loader = `<script type="module">
addEventListener('load', function () {
  var s1 = document.createElement('script');
  s1.type = 'module';
  s1.src = '${runtime}';
  document.body.appendChild(s1);
  s1.onload = function () {
    var s2 = document.createElement('script');
    s2.type = 'module';
    s2.src = '${polyfills}';
    document.body.appendChild(s2);
    s2.onload = function () {
      var s3 = document.createElement('script');
      s3.type = 'module';
      s3.src = '${main}';
      document.body.appendChild(s3);
    };
  };
});
</script>`;
  return html.replace(scriptRe, loader);
}

function deferAppStylesheet(html) {
  return html.replace(
    /<link rel="stylesheet" href="(styles\.[^"]+\.css)">/g,
    (match, href) =>
      `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${href}"></noscript>`,
  );
}

function dedupeStylesheets(html) {
  const seen = new Set();
  return html.replace(
    /<link rel="stylesheet" href="(styles\.[^"]+\.css)"[^>]*>/g,
    (match, href) => {
      if (seen.has(href)) {
        return '';
      }
      seen.add(href);
      return match;
    },
  );
}

function fixSerifNoscript(html) {
  return html.replace(
    /<noscript>&lt;link rel="stylesheet" href="\/serif-fonts\.css"\s*\/?&gt;<\/noscript>/,
    '<noscript><link rel="stylesheet" href="/serif-fonts.css"></noscript>',
  );
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(scriptRe);
  if (match) {
    html = deferBootstrap(html, match[1], match[2], match[3]);
  }
  html = deferAppStylesheet(html);
  html = dedupeStylesheets(html);
  html = fixSerifNoscript(html);
  fs.writeFileSync(filePath, html);
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (name.endsWith('.html') && name !== 'index.original.html') {
      processFile(full);
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('postprocess-prerender-html: dist/en not found');
  process.exit(1);
}

walk(distDir);
console.log('postprocess-prerender-html: deferred bootstrap and styles on prerendered HTML');
