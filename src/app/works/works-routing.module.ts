import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksComponent } from './works.component';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';
import { MozillaComponent } from './mozilla/mozilla.component';
import { ChefclubComponent } from './chefclub/chefclub.component';

const DESCRIPTION = {
  'work': `I am currently working on two projects: Seven23, a fully manual budget app to track personal expenses, and FromEdwin, an opinionated no code monitoring tool for web projects.`,
  'seven23': `Seven23 is designed to answer the very simple question: 'How much did I spend on something this month'. The idea is not to track your portfolio, how much you saved or is left, but to understand where money goes and identify potential cognitive biases. With privacy by design, the app provide secure end-to-end encryption within an open source code base to protect data confidentiality. This ensures that only its owner can access and read them.`,
  'fromedwin': `FromEdwin is an opinionated no code monitoring tool for web projects. It is currently under development and will be released later this year.`,
  'mozilla': `Displays a sidebar that lets you take notes on web pages.`,
  'chefclub': ``,
};

const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
    data: { title: 'Works', description: DESCRIPTION.work, state: 'works' },
  },
  {
    path: 'seven23',
    component: Seven23Component,
    data: { title: 'Seven23', description: DESCRIPTION.seven23, state: 'seven23' },
  },
  {
    path: 'fromedwin',
    component: FromedwinComponent,
    data: { title: 'FromEdwin', description: DESCRIPTION.fromedwin, state: 'fromedwin' },
  },
  {
    path: 'mozilla',
    component: MozillaComponent,
    data: { title: 'Notes by Firefox', description: DESCRIPTION.fromedwin, state: 'mozilla' },
  },
  {
    path: 'chefclub',
    component: ChefclubComponent,
    data: { title: 'Chefclub', description: DESCRIPTION.chefclub, state: 'chefclub' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
