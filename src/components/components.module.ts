import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [
    BadgeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
