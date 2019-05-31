import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FreelanceComponent } from './freelance.component';
import { FreelanceRoutingModule } from './freelance-routing.module';


@NgModule({
  declarations: [
    FreelanceComponent
  ],
  imports: [
    CommonModule,
    FreelanceRoutingModule,
    TranslateModule.forChild()
  ]
})
export class FreelanceModule { }
