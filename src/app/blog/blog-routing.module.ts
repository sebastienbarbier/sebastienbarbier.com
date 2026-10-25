import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list.component';
import { BlogPostComponent } from './blog-post.component';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: ':slug',
    component: BlogPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
