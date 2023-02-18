import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeComponent } from './resume.component';
import { ResumeRoutingModule } from './resume-routing.module';

import { SharedModule } from '../shared/shared.module';
import { DurationPipe } from './duration.pipe';

import { MarkdownModule } from 'ngx-markdown';

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
  ]
})
export class ResumeModule { }
