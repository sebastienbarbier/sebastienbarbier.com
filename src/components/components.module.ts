import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Badge } from './badge/badge.component';

@NgModule({
  declarations: [
    Badge
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Badge
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
