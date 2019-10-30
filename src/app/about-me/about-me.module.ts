import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

import { AboutMeComponent } from './about-me.component';
import { AboutMeRoutingModule } from './about-me-routing.module';


@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutMeRoutingModule,
    TranslateModule.forChild()
  ]
})
export class AboutMeModule { }
