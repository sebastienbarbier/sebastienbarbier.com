import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourcesComponent } from './resources.component';
import { ResourcesRoutingModule } from './resources-routing.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ResourcesComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    TranslateModule.forChild()
  ]
})
export class ResourcesModule { }
