import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function _(str: string) {
  return str;
}

const DESCRIPTION = {
  'home': 'My name is Sébastien Barbier, I am a web developer from France, currently working at SAP and based in Zurich Switzerland',
  'about': 'My name is Sébastien Barbier, I am a web developer from France, currently working at SAP and based in Zurich Switzerland',
  'legal': 'This website is edited as individual and private content. It is not attached to any company of any kind.',
  'work': 'List of projects I currenty work on.',
  'resume': 'Summary of my work and exprience.',
  'resources': 'Set of resources which might be useful to create content and communicate about myself',
  'contact': 'You can reach to me by email hello@sebastienbarbier.com or any of my social network account.',
};

// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: { title: null, description: DESCRIPTION.home, theme: 'light', state: 'home' }
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(mod => mod.AboutModule),
    data: { title: 'About', description: DESCRIPTION.about, theme: 'light', state: 'about' },
  },
  {
    path: 'works',
    loadChildren: () => import('./works/works.module').then(mod => mod.WorksModule),
    data: { title: 'Works', description: DESCRIPTION.work, theme: 'light', state: 'works' },
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
  {
    path: 'resume',
    loadChildren: () => import('./resume/resume.module').then(mod => mod.ResumeModule),
    data: { title: 'Resume', description: DESCRIPTION.resume, theme: 'light', state: 'resume' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, theme: 'light', state: '404' }
  }
];
