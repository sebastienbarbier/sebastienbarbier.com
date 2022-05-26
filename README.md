# sebastienbarbier.com

[![Build action badge](https://github.com/sebastienbarbier/sebastienbarbier.com/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/sebastienbarbier/sebastienbarbier.com/actions/) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/sebastienbarbier/sebastienbarbier.com/blob/main/LICENCE)

This repository host my personnal website, [sebastienbarbier.com](https://sebastienbarbier.com).

It is powered by [angular framework](https://angular.io), and published with [angular universal](https://github.com/angular/universal) for server rendering.

## Install

```
git clone git@github.com:sebastienbarbier/sebastienbarbier.com.git
cd sebastienbarbier.com
npm install
```

## Run locally for development purpose

```
ng serve (npx ng serve to run local @angular/cli)
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Following angular universal practice, you can build the app on static or dynamic mode.

### Dymanic mode

Using `npm run dev:ssr` generate an expressjs server to deploy and deliver the app.

Deploying dynamic more require to build then start server
```
npm run build:ssr
npm run serve:ssr
```

### Prerender mode

Using `npm run prerender` render all pages in static html, and can be publish on a static site hosting service like [github page](https://pages.github.com/). 
This method currently require to manually keep a list of urls to generate, saved in `static.paths.js` file.

You can use `npm run prerender && npm run serve:prerender` for testing locally before deploying

## Unit tests and end-to-end tests

Can be run using `ng test` and `ng e2e`.

## Internationalization

Translation use managed using [ngx-translate](http://www.ngx-translate.com/), and is defined by domain name. 
To run locally, you can add the following domains in your `host` file.

```
echo '127.0.0.1 local.sebastienbarbier.fr' | sudo tee -a /etc/hosts
echo '127.0.0.1 local.sebastienbarbier.com' | sudo tee -a /etc/hosts
```

Then serve your local server with one of those.

```
ng serve --host local.sebastienbarbier.fr
```

## Deploy to production

```
npm run deploy
```

Required to define env var `OS_TENANT_ID`, `OS_TENANT_NAME`, `OS_USERNAME`, `OS_PASSWORD`

## Licence

[MIT Licence](https://opensource.org/licenses/MIT), please feel free to share, copy, and republish for your own use.

## Inspired

- https://www.giacomomottin.com/  
- https://www.devonstank.com/  
- https://damirkotoric.com/  
- https://rameerez.com/
- https://alitwotimes.com/
