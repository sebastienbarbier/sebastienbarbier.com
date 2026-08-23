import 'zone.js';
import 'reflect-metadata';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

const SENTRY_DSN = 'https://c36d29ca446044659f503c09282f68b5@sentry.io/1488195';

/** Lazy-loads Sentry only when an error is reported (keeps it out of the main bundle). */
@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  private sentryPromise: Promise<typeof import('@sentry/browser')> | null = null;

  private loadSentry() {
    if (!this.sentryPromise) {
      this.sentryPromise = import('@sentry/browser').then((Sentry) => {
        Sentry.init({ dsn: SENTRY_DSN });
        return Sentry;
      });
    }
    return this.sentryPromise;
  }

  handleError(error: any) {
    console.error(error);
    this.loadSentry().then((Sentry) => {
      const eventId = Sentry.captureException(error?.originalError || error);
      Sentry.showReportDialog({ eventId });
    });
  }
}

const providers = [];
if (environment.production) {
  providers.push({ provide: ErrorHandler, useClass: SentryErrorHandler });
}


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'ignore' }),
    SharedModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
