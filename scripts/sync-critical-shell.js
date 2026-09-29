#!/usr/bin/env node
/**
 * Inlines src/critical-shell.css into src/index.html (id="critical-shell").
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const cssPath = path.join(root, 'src/critical-shell.css');
const indexPath = path.join(root, 'src/index.html');

let css = fs.readFileSync(cssPath, 'utf8');
const headerEnd = css.indexOf('*/');
if (css.trimStart().startsWith('/**') && headerEnd !== -1) {
  css = css.slice(headerEnd + 2).trim();
}

let index = fs.readFileSync(indexPath, 'utf8');
const openTag = '<style id="critical-shell">';
const closeTag = '</style>';
const start = index.indexOf(openTag);
const end = index.indexOf(closeTag, start);
if (start === -1 || end === -1) {
  console.error('sync-critical-shell: missing critical-shell style block in index.html');
  process.exit(1);
}

const before = index.slice(0, start + openTag.length);
const after = index.slice(end);
const next = `${before}${css}${after}`;

if (next !== index) {
  fs.writeFileSync(indexPath, next);
  console.log('sync-critical-shell: updated src/index.html');
}
