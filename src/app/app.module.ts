import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { HomeComponent } from './home/home.component';
import { FreelanceComponent } from './freelance/freelance.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhotographyComponent } from './photography/photography.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    (environment.production ? '.' + Math.floor(Math.random() * 100000) + '.json' : '.json'));
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
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
    ContactComponent,
    LegalComponent,
    HomeComponent,
    ProjectsComponent,
    FreelanceComponent,
    PhotographyComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
