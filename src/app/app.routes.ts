import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const DESCRIPTION = {
  'home': `Sébastien Barbier is a staff software engineer in Zürich and founder of Shellui. Portfolio spanning agentic AI at Unique AG, SAP FSM extensibility, Mozilla, and open-source projects.`,
  'resume': `Resume of Sébastien Barbier, staff software engineer in Zürich: TypeScript, React, and Python skills, work experience, education, and conferences.`,
  'contact': `Get in touch with Sébastien Barbier by email, or find him on X, GitHub, LinkedIn, Instagram, and other social networks.`,
  'resources': `Photos, logos, and brand assets you can download when sharing or writing about Sébastien Barbier online.`,
  'legal': `Legal information for sebastienbarbier.com, covering copyright, MIT licence terms, and site hosting details.`,
  'blog': `Blog posts by Sébastien Barbier on engineering, clarity, and building software from Zürich.`,
};

// State is use to bind animation
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    data: {
      title: null,
      description: DESCRIPTION.home,
      state: 'home',
      og: {
        eyebrow: 'Staff Software Engineer in Zürich',
        title: 'Sébastien Barbier',
        description:
          'Founder of Shellui. Agentic AI at Unique AG, SAP FSM extensibility, Mozilla, and open-source projects.',
      },
    },
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
    data: {
      title: 'Contact',
      description: DESCRIPTION.contact,
      state: 'contact',
      og: {
        eyebrow: 'Contact',
        description:
          'Email Sébastien Barbier, or find him on X, GitHub, LinkedIn, Instagram, and other social networks.',
      },
    },
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources.module').then(mod => mod.ResourcesModule),
    data: {
      title: 'Resources',
      description: DESCRIPTION.resources,
      state: 'resources',
      og: {
        eyebrow: 'Resources',
        description:
          'Photos, logos, and brand assets for sharing or writing about Sébastien Barbier online.',
      },
    },
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(mod => mod.LegalModule),
    data: {
      title: 'Legal & copyright',
      description: DESCRIPTION.legal,
      state: 'legal',
      og: {
        eyebrow: 'Legal',
        description:
          'Copyright, MIT licence terms, and hosting details for sebastienbarbier.com.',
      },
    },
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((mod) => mod.BlogModule),
    data: {
      title: 'Blog',
      description: DESCRIPTION.blog,
      state: 'blog',
      og: {
        eyebrow: 'Blog',
        description:
          'Writing on engineering and software by Sébastien Barbier, staff engineer in Zürich.',
      },
    },
  },
  {
    path: 'resume',
    loadChildren: () => import('./resume/resume.module').then(mod => mod.ResumeModule),
    data: {
      title: 'Resume',
      description: DESCRIPTION.resume,
      state: 'resume',
      og: {
        eyebrow: 'Resume',
        title: 'Staff software engineer in Zürich',
        description:
          'TypeScript, React, and Python skills, work experience, education, and conferences.',
      },
    },
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found',
      description: 'This page does not exist on sebastienbarbier.com. Try the home page, projects, or contact.',
      state: '404',
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found',
      description: 'This page does not exist on sebastienbarbier.com. Try the home page, projects, or contact.',
      state: '404',
    },
  },
];
