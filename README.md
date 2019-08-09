# sebastienbarbier.com

This repository host my personnal website, [sebastienbarbier.com](https://sebastienbarbier.com).

It is powered by [angular framework](https://angular.io), and published with [angular universal](https://github.com/angular/universal) for server rendering.

## Install

```
git clone git@github.com:sebastienbarbier/sebastienbarbier.com.git
cd sebastienbarbier.com
npm install
ng serve (npx ng serve to run local @angular/cli)
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Following angular universal practice, you can build the app on static or dynamic mode.

### Static mode

Using `npm run build:static` render all pages in html, and be published on a a static site hosting service like [github page](https://pages.github.com/). 
This method currently require to manually keep a list of urls to generate, saved in `static.paths.js` file.

You can use `npm run build:static && npm run serve:static` for testing locally before deploying

### Dymanic mode

Using `npm run build:dynamic` generate an expressjs server to deploy and deliver the app.

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

## Licence

[MIT Licence](https://opensource.org/licenses/MIT), please feel free to share, copy, and republish for your own use.

## Inspired

https://www.giacomomottin.com/
