import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksComponent } from './works.component';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';
import { MozillaComponent } from './mozilla/mozilla.component';
import { ChefclubComponent } from './chefclub/chefclub.component';

const DESCRIPTION = {
  'work': `I’ve had the privilege of working with diverse teams and technologies across various projects. At Mozilla’s Test Pilot team, I developed a minimalist notepad Firefox add-on and validated cutting-edge syncing technologies. At Chefclub, I focused on enhancing user experience and performance to support the brand’s online presence. At Seven23, I helped build a privacy-focused expense tracking app, ensuring secure, end-to-end encrypted data handling. Each of these experiences has strengthened my skills in front-end development, collaboration, and delivering user-centric digital solutions.`,
  'seven23': `Seven23 simplifies expense tracking by answering, “How much did I spend this month?” With privacy by design, open-source code, and secure end-to-end encryption, it ensures only you can access and understand where your money goes.`,
  'fromedwin': `FromEdwin is an opinionated no code monitoring tool for web projects. It is currently under development and will be released later this year.`,
  'mozilla': `As a freelance frontend developer at Mozilla’s Test Pilot team, I created a minimalist notepad Firefox add-on while validating the Firefox Sync and Kinto stack. I also optimized the UI, integrated a native note-taking feature, and collaborated closely with designers to ensure a seamless user experience.`,
  'chefclub': `As a freelance front-end developer at Chefclub, I focused on enhancing the website’s user experience and optimizing overall performance. I also collaborated closely with the team to ensure a cohesive, visually appealing website that aligned with the brand’s marketing objectives.`,
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
    data: { title: 'Notes by Firefox', description: DESCRIPTION.mozilla, state: 'mozilla' },
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
