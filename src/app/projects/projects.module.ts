import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsPageComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';

import { SharedModule } from '../shared/shared.module';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';
import { MozillaComponent } from './mozilla/mozilla.component';
import { ChefclubComponent } from './chefclub/chefclub.component';
import { ShelluiComponent } from './shellui/shellui.component';

@NgModule({
  declarations: [
    ProjectsPageComponent,
    ShelluiComponent,
    Seven23Component,
    FromedwinComponent,
    MozillaComponent,
    ChefclubComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
  ]
})
export class ProjectsModule { }
