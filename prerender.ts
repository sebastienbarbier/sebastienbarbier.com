// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { chdir } from 'process';

import { enableProdMode } from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { renderModuleFactory } from '@angular/platform-server';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Get route paths to prerender only static pages
const PATHS = require('./static.paths');

//
// ENGLISH
//

const BROWSER_FOLDER = join(process.cwd(), 'en');
const BROWSER_FOLDER2 = join(process.cwd(), 'fr');
// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('en', 'index.html'), 'utf8');
const index2 = readFileSync(join('fr', 'index.html'), 'utf8');

let prom = Promise.resolve();
let prom2 = Promise.resolve();

// Iterate each route path
PATHS.forEach(function (route) {
  // Changes current directory to ./dist/en
  chdir(BROWSER_FOLDER);

  // Creates new directories (if not exists) and changes current directory for the nested one
  route.split('/').filter(val => val !== '')
    .forEach(function (dir) {
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
      chdir(dir);
    });

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  prom = prom.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  })).then(html => writeFileSync(join(BROWSER_FOLDER, route, 'index.html'), html));
});


//
// FRENCH
//

// Iterate each route path
PATHS.forEach(function (route) {
  // Changes current directory to ./dist/fr
  chdir(BROWSER_FOLDER2);

  // Creates new directories (if not exists) and changes current directory for the nested one
  route.split('/').filter(val => val !== '')
    .forEach(function (dir) {
      if (!existsSync(dir)) {
        mkdirSync(dir);
      }
      chdir(dir);
    });

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  prom2 = prom2.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
    document: index2,
    url: route,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  })).then(html => writeFileSync(join(BROWSER_FOLDER2, route, 'index.html'), html));
});
