import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function _(str: string) {
  return str;
}

// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: { title: null, description: _('description.home'), theme: 'light', state: 'home' }
  },
  {
    path: 'aboutme',
    loadChildren: () => import('./aboutme/aboutme.module').then(mod => mod.AboutmeModule),
    data: { title: 'nav.aboutme', description: _('description.aboutme'), theme: 'light', state: 'aboutme' }
  },
  {
    path: 'work',
    loadChildren: () => import('./work/work.module').then(mod => mod.WorkModule),
    data: { title: 'nav.work', description: _('description.work'), theme: 'light', state: 'work' }
  },
  {
    path: 'freelance',
    loadChildren: () => import('./freelance/freelance.module').then(mod => mod.FreelanceModule),
    data: { title: 'nav.freelance', description: _('description.freelance'), theme: 'light', state: 'freelance' }
  },
  {
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(mod => mod.ProjectsModule),
    data: { title: 'nav.projects', description: _('description.projects'), theme: 'light', state: 'projects' }
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule),
    data: { title: 'nav.contact', description: _('description.contact'), theme: 'light', state: 'contact' }
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(mod => mod.LegalModule),
    data: { title: 'nav.legal', description: _('description.legal'), theme: 'light', state: 'legal' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, theme: 'light', state: '404' }
  }
];
