// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
// import { renderModuleFactory } from '@angular/platform-server';
// import { enableProdMode } from '@angular/core';

// import * as express from 'express';
// import { join } from 'path';
// import { readFileSync } from 'fs';

// // Faster server renders w/ Prod mode (dev mode never needed)
// enableProdMode();

// // Express server
// const app = express();

// const PORT = process.env.PORT || 4000;
// const DIST_FOLDER = join(process.cwd(), 'dist');

// // Our index.html we'll use as our template
// // const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// // * NOTE :: leave this as require() since this file is built Dynamically from webpack
// const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// // Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

// app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'browser'));

// /* - Example Express Rest API endpoints -
//   app.get('/api/**', (req, res) => { });
// */

// // Server static files from /browser
// app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
//   maxAge: '1y'
// }));

// // ALl regular routes use the Universal engine
// app.get('*', (req, res) => {
//   res.sendFile(join(DIST_FOLDER, 'browser', 'index.en.html'), {
//     req,
//     res,
//     providers: [{
//       provide: 'serverUrl',
//       useValue: `${req.protocol}://${req.get('host')}`
//     }]
//   });
// });

// // Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });


import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import * as vhost from 'vhost';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
// No use of this, just check if templates are here.
const templateEnglish = readFileSync(join(DIST_FOLDER, 'browser', 'index.en.html')).toString();
const templateFrench = readFileSync(join(DIST_FOLDER, 'browser', 'index.fr.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

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

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser

const appEnglish = express();
appEnglish.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
appEnglish.get('*', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'browser', 'index.en.html'), {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
});

const appFrench = express();
appFrench.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// ALl regular routes use the Universal engine
appFrench.get('*', (req, res) => {
  res.sendFile(join(DIST_FOLDER, 'browser', 'index.fr.html'), {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
});

app.use(vhost('*.sebastienbarbier.com', appEnglish));
app.use(vhost('*.sebastienbarbier.fr', appFrench));
app.use(vhost('localhost', appEnglish));

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

