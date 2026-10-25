import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppModule } from './app/app.module';
import { appRoutes } from './app/app.routes';
import { browserRouterFeatures } from './app/app-router.config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () =>
  platformBrowserDynamic().bootstrapModule(AppModule, {
    applicationProviders: [
      provideZoneChangeDetection(),
      provideRouter(appRoutes, ...browserRouterFeatures),
      provideClientHydration(withEventReplay()),
    ],
  });

bootstrap().catch((err) => console.error(err));
