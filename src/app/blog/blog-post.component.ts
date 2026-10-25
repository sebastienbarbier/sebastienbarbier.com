import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { of, Subscription, switchMap } from 'rxjs';
import { blogPostBySlug } from './blog-posts.generated';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogPostComponent implements OnInit, OnDestroy {
  markdown = '';
  post = blogPostBySlug('');
  private sub?: Subscription;
  private jsonLdEl?: HTMLScriptElement;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit() {
    this.sub = this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug') || '';
          this.post = blogPostBySlug(slug);
          if (!this.post) {
            this.markdown = '';
            return of('');
          }
          return this.http.get(`/assets/blog/${slug}.md`, { responseType: 'text' });
        }),
      )
      .subscribe({
        next: (text) => {
          this.markdown = typeof text === 'string' ? text : '';
          this.setJsonLd();
          this.cdr.markForCheck();
        },
        error: () => {
          this.markdown = '';
          this.cdr.markForCheck();
        },
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.jsonLdEl?.remove();
  }

  private setJsonLd() {
    if (!isPlatformBrowser(this.platformId) || !this.post) {
      return;
    }
    this.jsonLdEl?.remove();
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: this.post.title,
      description: this.post.description,
      datePublished: this.post.date,
      author: {
        '@type': 'Person',
        name: 'Sébastien Barbier',
        jobTitle: 'Staff Software Engineer',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://sebastienbarbier.com/blog/${this.post.slug}`,
      },
    });
    this.document.head.appendChild(script);
    this.jsonLdEl = script;
  }
}
