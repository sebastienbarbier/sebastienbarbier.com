#!/usr/bin/env node
/**
 * Resize oversized screenshots and write WebP (+ JPEG or PNG fallback).
 * PNGs with alpha stay PNG (JPEG would paint a black background).
 * Run: pnpm run optimize:images
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'src', 'assets');

const jobs = [
  { rel: 'images/chefclub/chefclub-screens.1800.jpg', max: 1800 },
  { rel: 'images/mozilla/galery_1_screens.1800.jpg', max: 1800 },
  { rel: 'images/mozilla/galery_1_5_screens.1800.png', max: 1800 },
  { rel: 'images/mozilla/galery_2_list.1800.jpg', max: 1800 },
  { rel: 'images/mozilla/galery_3_note.1800.jpg', max: 1800 },
  { rel: 'images/mozilla/galery_4_app.1800.jpg', max: 1800 },
  { rel: 'images/seven23/screens/1-dashboard.png', max: 1600 },
  { rel: 'images/seven23/screens/7-transactions.png', max: 900 },
  { rel: 'images/seven23/screens/5-report.png', max: 1200 },
  { rel: 'images/seven23/screens/9-changes.png', max: 900 },
  { rel: 'images/fromedwin/screenshots/dashboard.png', max: 1200 },
  { rel: 'images/fromedwin/screenshots/availability.png', max: 1200 },
  { rel: 'images/fromedwin/screenshots/report.png', max: 1200 },
  { rel: 'images/fromedwin/screenshots/performances.png', max: 1200 },
  { rel: 'images/chefclub/chefclub-thumbnail.png', max: 1400 },
  { rel: 'images/mozilla/note_thumbnail.png', max: 1200 },
  { rel: 'images/fromedwin/fromedwin_layout.png', max: 1280 },
  { rel: 'images/seven23/seven23_layout.png', max: 1280 },
  { rel: 'images/ressources/sebastienbarbier_profile_1024.jpg', max: 1024 },
];

async function optimize({ rel, max }) {
  const inputPath = path.join(root, rel);
  if (!fs.existsSync(inputPath)) {
    console.warn('skip missing', rel);
    return;
  }

  const before = fs.statSync(inputPath).size;
  const meta = await sharp(inputPath).metadata();
  const ext = path.extname(inputPath).toLowerCase();
  const keepPng = ext === '.png' && meta.hasAlpha;
  const outExt = keepPng ? '.png' : (ext === '.png' ? '.jpg' : ext);
  const base = inputPath.slice(0, -ext.length);
  const outPath = `${base}${outExt}`;
  const webpPath = `${base}.webp`;
  const tmpPath = `${outPath}.tmp`;

  let pipeline = sharp(inputPath)
    .rotate()
    .resize({
      width: max,
      height: max,
      fit: 'inside',
      withoutEnlargement: true,
    });

  if (keepPng) {
    await pipeline.png({ compressionLevel: 9 }).toFile(tmpPath);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(tmpPath);
  }
  fs.renameSync(tmpPath, outPath);

  // Drop stale JPEG fallback if we restored a transparent PNG
  if (keepPng && outPath !== inputPath) {
    /* same path */
  }
  if (keepPng) {
    const staleJpg = `${base}.jpg`;
    if (fs.existsSync(staleJpg)) fs.unlinkSync(staleJpg);
  } else if (ext === '.png' && outPath !== inputPath && fs.existsSync(inputPath)) {
    fs.unlinkSync(inputPath);
  }

  await sharp(outPath)
    .webp({ quality: 78, effort: 4, alphaQuality: 90 })
    .toFile(webpPath);

  const after = fs.statSync(outPath).size;
  const webp = fs.statSync(webpPath).size;
  const dim = await sharp(outPath).metadata();
  console.log(
    `${rel} → ${path.relative(root, outPath)}: ${(before / 1024).toFixed(0)}K → ${(after / 1024).toFixed(0)}K` +
      ` + webp ${(webp / 1024).toFixed(0)}K (${dim.width}x${dim.height}` +
      `${dim.hasAlpha ? ', alpha' : ''})`
  );
}

(async () => {
  for (const job of jobs) {
    await optimize(job);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
