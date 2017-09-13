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
  { path: '', component: HomeComponent },
  { path: 'photography', component: PhotographyComponent, data: { title: 'Photography' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects' } },
  { path: 'blog', component: BlogComponent, data: { title: 'Blog' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact', theme: 'dark' } },
  { path: 'legal', component: LegalComponent, data: { title: 'Legal & copyright' } },
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
