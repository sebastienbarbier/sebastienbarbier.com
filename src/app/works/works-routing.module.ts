import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksComponent } from './works.component';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';

const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
  },
  {
    path: 'seven23',
    component: Seven23Component,
    data: { title: 'Projects Seven23', description: '', theme: 'light', state: 'seven23' },
  },
  {
    path: 'fromedwin',
    component: FromedwinComponent,
    data: { title: 'Projects FromEdwin', description: '', theme: 'light', state: 'fromedwin' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
