import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationComponent } from './location.component';
import { LocationRoutingModule } from './location-routing.module';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    TranslateModule.forChild()
  ]
})
export class LocationModule { }
