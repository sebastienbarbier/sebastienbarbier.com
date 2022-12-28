import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LegalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LegalRoutingModule,
  ]
})
export class LegalModule { }
