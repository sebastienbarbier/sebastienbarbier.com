import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list.component';
import { BlogPostComponent } from './blog-post.component';

@NgModule({
  declarations: [BlogListComponent, BlogPostComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
  ],
})
export class BlogModule {}
