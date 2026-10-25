import {
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

/** NgModule / server bootstrap (no View Transitions). */
export const rootRouterOptions = {
  onSameUrlNavigation: 'ignore' as const,
  scrollPositionRestoration: 'enabled' as const,
  anchorScrolling: 'enabled' as const,
};

/** Browser bootstrap via `provideRouter` in main.ts. */
export const browserRouterFeatures = [
  withViewTransitions({
    skipInitialTransition: true,
    onViewTransitionCreated: ({ transition }) => {
      const router = inject(Router);
      if (router.getCurrentNavigation()?.trigger === 'popstate') {
        return;
      }
      const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
      if (transition?.finished) {
        void transition.finished.then(scrollToTop);
      } else {
        scrollToTop();
      }
    },
  }),
  withInMemoryScrolling({
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  }),
  withRouterConfig({ onSameUrlNavigation: 'ignore' }),
];

export const serverRouterFeatures = [
  withInMemoryScrolling({
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  }),
  withRouterConfig({ onSameUrlNavigation: 'ignore' }),
];
