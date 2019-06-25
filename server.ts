import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
// No use of this, just check if templates are here.
const templateEnglish = readFileSync(join(DIST_FOLDER, 'browser', 'index_en.html')).toString();
const templateFrench = readFileSync(join(DIST_FOLDER, 'browser', 'index_fr.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/robots.txt', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'static', `robots.txt`), {
    req
  });
});

app.get('/sitemap.xml', (req, res) => {
  const lang = req.get('host').includes('sebastienbarbier.fr') ? 'fr' : 'en';
  res.sendFile(join(DIST_FOLDER, 'static', `sitemap.${lang}.xml`), {
    req
  });
});

app.get('/keybase.txt', (req, res) => {
  const lang = req.get('host').includes('sebastienbarbier.fr') ? 'fr' : 'en';
  res.sendFile(join(DIST_FOLDER, 'static', `keybase.${lang}.txt`), {
    req
  });
});

app.get('/assets/i18n/en.*.json', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'browser', 'assets', 'i18n', 'en.json'), {
    req
  });
});


app.get('/assets/i18n/fr.*.json', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'browser', 'assets', 'i18n', 'fr.json'), {
    req
  });
});

app.get('/robots.txt', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'static', `robots.txt`), {
    req
  });
});

app.get('/freelance', (req, res) => res.redirect(301, '/about-me'));
app.get('/projects', (req, res) => res.redirect(301, '/work'));

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  const lang = req.get('host').includes('sebastienbarbier.fr') ? 'fr' : 'en';
  res.render(`index_${lang}`, {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

