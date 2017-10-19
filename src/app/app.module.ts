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
import { ProjectsComponent } from './projects/projects.component';
import { PhotographyComponent } from './photography/photography.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// State is use to bind animation
const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: null, theme: 'light', state: 'home' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects', theme: 'light', state: 'projects' } },
  { path: 'photography', component: PhotographyComponent, data: { title: 'Photography', theme: 'dark', state: 'photography' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact', theme: 'light', state: 'contact' } },
  { path: 'legal', component: LegalComponent, data: { title: 'Legal & copyright', theme: 'light', state: 'legal' } },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Page not found', theme: 'light', state: '404' }  }
];

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
    PhotographyComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
