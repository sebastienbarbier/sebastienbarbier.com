import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeComponent } from './resume.component';
import { ResumeRoutingModule } from './resume-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DurationPipe } from './duration.pipe';

import { MarkdownModule } from 'ngx-markdown';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [
    ResumeComponent,
    DurationPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ResumeRoutingModule,
    MarkdownModule.forChild(),
    NgxEchartsModule.forRoot({
     /**
      * This will import all modules from echarts.
      * If you only need custom modules,
      * please refer to [Custom Build] section.
      */
     echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
   }),
  ]
})
export class ResumeModule { }
