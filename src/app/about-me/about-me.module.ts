import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { AboutMeComponent } from './about-me.component';
import { AboutMeRoutingModule } from './about-me-routing.module';


@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    TranslateModule.forChild()
  ]
})
export class AboutMeModule { }
