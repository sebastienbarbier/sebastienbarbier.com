import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BLOG_POSTS } from './blog-posts.generated';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogListComponent {
  readonly posts = [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}
