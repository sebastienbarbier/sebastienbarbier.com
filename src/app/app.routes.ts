import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function _(str: string) {
  return str;
}

const DESCRIPTION = {
  'contact': 'You can reach to me by email hello@sebastienbarbier.com or any of my social network account.',
  'home': 'My name is Sébastien Barbier, I am a web developer from France, currently working at SAP and based in Zurich Switzerland',
  'legal': 'This website is edited as individual and private content. It is not attached to any company of any kind.',
  'resources': 'Set of resources which might be useful to create content and communicate about myself'
};

// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: { title: null, description: DESCRIPTION.home, theme: 'light', state: 'home' }
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule),
    data: { title: 'Contact', description: DESCRIPTION.contact, theme: 'light', state: 'contact' }
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then(mod => mod.ResourcesModule),
    data: { title: 'Resources', description: DESCRIPTION.resources, theme: 'light', state: 'resources' }
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(mod => mod.LegalModule),
    data: { title: 'Legal & copyright', description: DESCRIPTION.legal, theme: 'light', state: 'legal' }
  },
  // Legacy permalink
  // { path: 'freelance',   redirectTo: '/about-me', pathMatch: 'full' },
  // { path: 'projects',   redirectTo: '/work', pathMatch: 'full' },
  // 404
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, theme: 'light', state: '404' }
  }
];
