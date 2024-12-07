import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function _(str: string) {
  return str;
}

const DESCRIPTION = {
  'home': `Welcome on Sebastien Barbier's personal portfolio. He is a software engineer based in Zurich Switzerland, currently working at Unique AG building a platform using AI for the financial industry. Sebastien Barbier worked as a full-stack web developer for companies like SAP, Chefclub, Mozilla, or Mila. His latest projects are Seven23.io or FromEdwin.com.`,
  'resume': `Working as a Software Engineer, this is a short resume of my past experiences, introducing technologies I like, my work experiences, educations, and conferences I attended.`,
  'contact': `You can reach to me by email or using any of my social network account. Best is probably twitter.`,
  'resources': `Set of resources which might be useful to create content and communicate about myself. I mostly use this as a way to quickly access some assets when not at home.`,
  'legal': `The author of this website is Sebastien Barbier. It is hosted by OVH. Code is under licence MIT, and its content under creative commons.`,
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
