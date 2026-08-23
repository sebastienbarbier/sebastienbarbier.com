import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsPageComponent } from './projects.component';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';
import { MozillaComponent } from './mozilla/mozilla.component';
import { ChefclubComponent } from './chefclub/chefclub.component';

const DESCRIPTION = {
  'projects': `Projects by Sébastien Barbier, including FromEdwin monitoring, Seven23 expenses, Chefclub, and Notes by Firefox.`,
  'seven23': `Seven23 is an open-source, privacy-first personal expense tracker with secure end-to-end encryption built in by design.`,
  'fromedwin': `FromEdwin is an opinionated no-code monitoring tool for web projects. It is currently under development and coming soon.`,
  'mozilla': `Freelance frontend work at Mozilla's Test Pilot team: building Notes by Firefox and validating the Firefox Sync stack.`,
  'chefclub': `Frontend work at Chefclub focused on UX improvements and web performance for the cooking brand's public website.`,
};

const routes: Routes = [
  {
    path: '',
    component: ProjectsPageComponent,
    data: {
      title: 'Projects',
      description: DESCRIPTION.projects,
      state: 'projects',
      shareImage: '/assets/images/fromedwin/fromedwin_layout.png',
    },
  },
  {
    path: 'seven23',
    component: Seven23Component,
    data: {
      title: 'Seven23',
      description: DESCRIPTION.seven23,
      state: 'seven23',
      shareImage: '/assets/images/seven23/seven23_layout.png',
    },
  },
  {
    path: 'fromedwin',
    component: FromedwinComponent,
    data: {
      title: 'FromEdwin',
      description: DESCRIPTION.fromedwin,
      state: 'fromedwin',
      shareImage: '/assets/images/fromedwin/fromedwin_layout.png',
    },
  },
  {
    path: 'mozilla',
    component: MozillaComponent,
    data: {
      title: 'Notes by Firefox',
      description: DESCRIPTION.mozilla,
      state: 'mozilla',
      shareImage: '/assets/images/mozilla/note_thumbnail.png',
    },
  },
  {
    path: 'chefclub',
    component: ChefclubComponent,
    data: {
      title: 'Chefclub',
      description: DESCRIPTION.chefclub,
      state: 'chefclub',
      shareImage: '/assets/images/chefclub/chefclub-thumbnail.png',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
