import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'seven23',
    component: Seven23Component,
  },
  {
    path: 'fromedwin',
    component: FromedwinComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
