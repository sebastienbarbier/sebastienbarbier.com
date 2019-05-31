import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreelanceComponent } from './freelance.component';

const routes: Routes = [
  {
    path: '',
    component: FreelanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelanceRoutingModule { }
