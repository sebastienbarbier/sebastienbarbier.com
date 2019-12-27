import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { WorkComponent } from './work.component';
import { WorkRoutingModule } from './work-routing.module';

import { TranslateModule } from '@ngx-translate/core';


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
