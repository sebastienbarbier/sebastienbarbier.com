import { Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { HomeComponent } from './home/home.component';
import { FreelanceComponent } from './freelance/freelance.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhotographyComponent } from './photography/photography.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: null, theme: 'light', state: 'home' }
  },
  {
    path: 'freelance',
    component: FreelanceComponent,
    data: { title: 'nav.freelance', theme: 'light', state: 'freelance' }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'nav.projects', theme: 'light', state: 'projects' }
  },
  {
    path: 'photography',
    component: PhotographyComponent,
    data: { title: 'nav.photography', theme: 'dark', state: 'photography' }
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'nav.contact', theme: 'light', state: 'contact' }
  },
  {
    path: 'legal',
    component: LegalComponent,
    data: { title: 'nav.legal', theme: 'light', state: 'legal' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, theme: 'light', state: '404' }
  }
];
