import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkComponent } from './work.component';
import { WorkRoutingModule } from './work-routing.module';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WorkComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkRoutingModule,
    TranslateModule.forChild()
  ]
})
export class WorkModule { }
