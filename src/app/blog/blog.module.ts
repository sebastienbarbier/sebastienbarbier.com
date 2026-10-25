import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list.component';
import { BlogPostComponent } from './blog-post.component';

@NgModule({
  declarations: [BlogListComponent, BlogPostComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MarkdownModule.forChild(),
    BlogRoutingModule,
  ],
})
export class BlogModule {}
