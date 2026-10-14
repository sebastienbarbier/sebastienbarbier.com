import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const DESCRIPTION = {
  'home': `Sébastien Barbier is a staff software engineer in Zürich and founder of Shellui. Portfolio spanning agentic AI at Unique AG, SAP FSM extensibility, Mozilla, and open-source projects.`,
  'resume': `Resume of Sébastien Barbier, staff software engineer in Zürich: TypeScript, React, and Python skills, work experience, education, and conferences.`,
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
    path: 'projects',
    loadChildren: () => import('./projects/projects.module').then(mod => mod.ProjectsModule),
  },
  {
    path: 'works',
    redirectTo: '/projects',
    pathMatch: 'full',
  },
  {
    path: 'works/:project',
    redirectTo: '/projects/:project',
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
