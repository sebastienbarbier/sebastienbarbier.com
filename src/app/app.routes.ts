import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const DESCRIPTION = {
  'home': `Sébastien Barbier is a software engineer in Zurich. Portfolio of full-stack work for Unique AG, SAP, Mozilla, and personal projects.`,
  'resume': `Resume of Sébastien Barbier, software engineer in Zurich: skills, work experience, education, and conferences attended over the years.`,
  'contact': `Get in touch with Sébastien Barbier by email, or find him on X, GitHub, LinkedIn, Instagram, and other social networks.`,
  'resources': `Photos, logos, and brand assets you can download when sharing or writing about Sébastien Barbier online.`,
  'legal': `Legal information for sebastienbarbier.com, covering copyright, MIT licence terms, and site hosting details.`,
};

// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: { title: null, description: DESCRIPTION.home, state: 'home' }
  },
  {
    path: 'works',
    loadChildren: () => import('./works/works.module').then(mod => mod.WorksModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule),
    data: { title: 'Contact', description: DESCRIPTION.contact, state: 'contact' }
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then(mod => mod.ResourcesModule),
    data: { title: 'Resources', description: DESCRIPTION.resources, state: 'resources' }
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(mod => mod.LegalModule),
    data: { title: 'Legal & copyright', description: DESCRIPTION.legal, state: 'legal' }
  },
  {
    path: 'resume',
    loadChildren: () => import('./resume/resume.module').then(mod => mod.ResumeModule),
    data: { title: 'Resume', description: DESCRIPTION.resume, state: 'resume' }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: null, description: null, state: '404' }
  }
];
