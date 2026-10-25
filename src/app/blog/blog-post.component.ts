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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { Subscription } from 'rxjs';
import { blogPostBodyBySlug, blogPostBySlug } from './blog-posts.generated';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BlogPostComponent implements OnInit, OnDestroy {
  markdown = '';
  htmlContent: SafeHtml | null = null;
  post = blogPostBySlug('');
  private activeSlug = '';
  private sub?: Subscription;
  private jsonLdEl?: HTMLScriptElement;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    this.applySlug(this.route.snapshot.paramMap.get('slug') || '');
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      if (slug !== this.activeSlug) {
        this.applySlug(slug);
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.jsonLdEl?.remove();
  }

  private applySlug(slug: string) {
    this.activeSlug = slug;
    this.post = blogPostBySlug(slug);
    this.markdown = slug ? blogPostBodyBySlug(slug) : '';
    this.htmlContent = this.markdown
      ? this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.markdown, { async: false }) as string)
      : null;
    this.setJsonLd();
    this.cdr.markForCheck();
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
