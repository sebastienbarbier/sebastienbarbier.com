import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhotographyComponent } from './photography/photography.component';
import { BlogComponent } from './blog/blog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home', theme: 'light', state: 'home' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects', theme: 'light', state: 'projects' } },
  { path: 'photography', component: PhotographyComponent, data: { title: 'Photography', theme: 'dark', state: 'photography' } },
  { path: 'blog', component: BlogComponent, data: { title: 'Blog', theme: 'light', state: 'blog' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact', theme: 'light', state: 'contact' } },
  { path: 'legal', component: LegalComponent, data: { title: 'Legal & copyright', theme: 'light', state: 'legal' } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LegalComponent,
    HomeComponent,
    ProjectsComponent,
    PhotographyComponent,
    BlogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
