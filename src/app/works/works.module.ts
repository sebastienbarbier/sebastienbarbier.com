import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksComponent } from './works.component';
import { WorksRoutingModule } from './works-routing.module';

import { SharedModule } from '../shared/shared.module';
import { Seven23Component } from './seven23/seven23.component';
import { FromedwinComponent } from './fromedwin/fromedwin.component';
import { MozillaComponent } from './mozilla/mozilla.component';
import { ChefclubComponent } from './chefclub/chefclub.component';

@NgModule({
  declarations: [
    WorksComponent,
    Seven23Component,
    FromedwinComponent,
    MozillaComponent,
    ChefclubComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorksRoutingModule,
  ]
})
export class WorksModule { }
