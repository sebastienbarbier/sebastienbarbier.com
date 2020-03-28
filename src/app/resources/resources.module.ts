import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesComponent } from './resources.component';
import { ResourcesRoutingModule } from './resources-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ResourcesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResourcesRoutingModule,
    TranslateModule.forChild()
  ]
})
export class ResourcesModule { }
