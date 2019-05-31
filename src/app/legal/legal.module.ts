import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LegalComponent
  ],
  imports: [
    CommonModule,
    LegalRoutingModule,
    TranslateModule.forChild()
  ]
})
export class LegalModule { }
