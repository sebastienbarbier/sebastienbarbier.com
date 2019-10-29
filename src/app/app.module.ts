import 'zone.js';
import 'reflect-metadata';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

import * as Sentry from "@sentry/browser";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    (environment.production ? '.' + Math.floor(Math.random() * 100000) + '.json' : '.json'));
}

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}

const providers = [];
if (environment.production) {

  Sentry.init({
    dsn: "https://c36d29ca446044659f503c09282f68b5@sentry.io/1488195"
  });

  providers.push({ provide: ErrorHandler, useClass: SentryErrorHandler });
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {onSameUrlNavigation: 'ignore',}
    ),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
