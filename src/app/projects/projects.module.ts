import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    Seven23Component,
    FromedwinComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
  ]
})
export class ProjectsModule { }
