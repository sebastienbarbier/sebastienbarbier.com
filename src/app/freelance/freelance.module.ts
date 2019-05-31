import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { FreelanceComponent } from './freelance.component';
import { FreelanceRoutingModule } from './freelance-routing.module';

import { environment } from '../../environments/environment';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',
    (environment.production ? '.' + Math.floor(Math.random() * 100000) + '.json' : '.json'));
}

@NgModule({
  declarations: [
    FreelanceComponent
  ],
  imports: [
    CommonModule,
    FreelanceRoutingModule,
    TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    })
  ]
})
export class FreelanceModule { }
