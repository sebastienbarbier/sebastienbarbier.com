import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';

import { AppModule } from './app/app.module';
import { appRoutes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const bootstrap = () =>
  platformBrowserDynamic().bootstrapModule(AppModule, {
    applicationProviders: [
      provideZoneChangeDetection(),
      provideRouter(
        appRoutes,
        withViewTransitions({ skipInitialTransition: true }),
        withInMemoryScrolling({
          scrollPositionRestoration: 'enabled',
          anchorScrolling: 'enabled',
        }),
      ),
      provideClientHydration(withEventReplay()),
    ],
  });

bootstrap().catch((err) => console.error(err));
