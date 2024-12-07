# sebastienbarbier.com

[![Build action badge](https://github.com/sebastienbarbier/sebastienbarbier.com/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/sebastienbarbier/sebastienbarbier.com/actions/) [![Status](https://status.sebastienbarbier.com/badge.svg)](https://status.sebastienbarbier.com) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/sebastienbarbier/sebastienbarbier.com/blob/main/LICENCE)

This repository host my personnal website, [sebastienbarbier.com](https://sebastienbarbier.com).

It is powered by [angular framework](https://angular.io), and published with [angular universal](https://github.com/angular/universal) for server rendering.

## Install

```
git clone git@github.com:sebastienbarbier/sebastienbarbier.com.git
cd sebastienbarbier.com
npm install
```

## Serve locally

```
npx ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Default build will prerender static file for each page specified in `static.paths.txt`.

```
npm run build
```

## Deploy to production

```
npm run deploy
```

Required to define env var `OS_TENANT_ID`, `OS_TENANT_NAME`, `OS_USERNAME`, `OS_PASSWORD`

## Licence

[MIT Licence](https://opensource.org/licenses/MIT), please feel free to share, copy, and republish for your own use.

## Inspired

New:
- https://www.adebayosegun.com/

Old 2024.08:
- https://www.justinfarrugia.com/
- https://www.andybudd.com/
- https://zhenyary.com/
- https://davidhellmann.com/
- https://www.mkosowska.com/
- https://xpdesignsystem.com/

Old:
- https://www.giacomomottin.com/  
- https://www.devonstank.com/  
- https://damirkotoric.com/  
- https://rameerez.com/
- https://alitwotimes.com/

## Helpful links

- https://foxleytalent.com/blog/tips-to-secure-your-first-django-developer-job/
