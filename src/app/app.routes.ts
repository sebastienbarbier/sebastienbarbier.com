import { Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { HomeComponent } from './home/home.component';
// import { FreelanceComponent } from './freelance/freelance.component';
import { ProjectsComponent } from './projects/projects.component';
import { PhotographyComponent } from './photography/photography.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function _(str: string) {
  return str;
}
// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: null, description: _('description.home'), theme: 'light', state: 'home' }
  },
  {
    path: 'freelance',
    // component: FreelanceComponent,
    loadChildren: () => import('./freelance/freelance.module').then(mod => mod.FreelanceModule),
    data: { title: 'nav.freelance', description: _('description.freelance'), theme: 'light', state: 'freelance' }
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'nav.projects', description: _('description.projects'), theme: 'light', state: 'projects' }
  },
  // {
  //   path: 'photography',
  //   component: PhotographyComponent,
  //   data: { title: 'nav.photography', description: _('description.photography'), theme: 'dark', state: 'photography' }
  // },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'nav.contact', description: _('description.contact'), theme: 'light', state: 'contact' }
  },
  {
    path: 'legal',
    component: LegalComponent,
    data: { title: 'nav.legal', description: _('description.legal'), theme: 'light', state: 'legal' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, theme: 'light', state: '404' }
  }
];
