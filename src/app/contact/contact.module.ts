import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
  ]
})
export class ContactModule { }
