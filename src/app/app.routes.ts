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
    path: 'about-me',
    loadChildren: () => import('./about-me/about-me.module').then(mod => mod.AboutMeModule),
    data: { title: 'nav.about_me', description: _('description.about_me'), theme: 'light', state: 'about_me' }
  },
  {
    path: 'work',
    loadChildren: () => import('./work/work.module').then(mod => mod.WorkModule),
    data: { title: 'nav.work', description: _('description.work'), theme: 'light', state: 'work' }
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule),
    data: { title: 'nav.contact', description: _('description.contact'), theme: 'light', state: 'contact' }
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then(mod => mod.ResourcesModule),
    data: { title: 'nav.resources', description: _('description.resources'), theme: 'light', state: 'resources' }
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(mod => mod.LegalModule),
    data: { title: 'nav.legal', description: _('description.legal'), theme: 'light', state: 'legal' }
  },
  // Legacy permalink
  { path: 'freelance',   redirectTo: '/about-me', pathMatch: 'full' },
  { path: 'projects',   redirectTo: '/work', pathMatch: 'full' },
  // 404
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, theme: 'light', state: '404' }
  }
];
