import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, Inject, Renderer2, ElementRef, PLATFORM_ID, Optional } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { routerTransition } from './router.animations';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT, Title, Meta } from '@angular/platform-browser';
import { Location } from '@angular/common';

// AOT issue : https://github.com/ngx-translate/core/issues/537
import { TranslateService } from '@ngx-translate/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  headerState: string;
  navigationMenuStatus: Boolean;
  lang: string;
  path: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private element: ElementRef,
      private renderer: Renderer2,
      private translate: TranslateService,
      private titleService: Title,
      private metaService: Meta,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(DOCUMENT) private d,
      @Optional() @Inject('serverUrl') protected serverUrl: string
    ) {
    this.headerState = 'hide';
    this.navigationMenuStatus = false;

    this.lang = 'en';
    if (isPlatformBrowser(platformId) && d.location.hostname.endsWith('sebastienbarbier.fr')) {
      this.lang = 'fr';
    } else if (isPlatformServer(platformId) && serverUrl.split(':')[1].endsWith('sebastienbarbier.fr')) {
      this.lang = 'fr';
    }
    translate.setDefaultLang(this.lang);
    translate.use(this.lang);

  }

  ngOnInit() {


    this.router.events.subscribe(event => {
      // NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
      if (event instanceof NavigationEnd) {

        this.path = event.url;
        // If home page, we hide header
        if (event.url === '/') {
          this.headerState = 'hide';
        } else {
          this.headerState = 'show';
        }
        // On page change, we close navigation menu
        if (this.navigationMenuStatus === true) {
          this.navigationMenuStatus = !this.navigationMenuStatus;
        }
      }
    });

    // Handle noscript tag for SEO
    if (isPlatformServer(this.platformId)) {
      const wrap = this.renderer.createElement('noscript');
      const toWrap = this.element.nativeElement;
      this.renderer.appendChild(wrap, toWrap.children[0]);
      this.renderer.appendChild(toWrap, wrap);
    }

  }

  getState(outlet) {
    const accent = this.lang === 'en' ? 'e' : 'é';
    // meta title
    if (outlet.activatedRouteData.title) {
      // Update title and meta data
      this.translate.get(outlet.activatedRouteData.title).subscribe((res: string) => {
          this.titleService.setTitle(`S${accent}bastien Barbier - ${res}`);
      });
    } else {
      this.titleService.setTitle(`S${accent}bastien Barbier`);
    }

    if (outlet.activatedRouteData.description) {
      // Update title and meta data
      this.translate.get(outlet.activatedRouteData.description).subscribe((res: string) => {
        this.metaService.removeTag('name="description"');
        this.metaService.addTag({ name: 'description', content: res }, false);
      });
    } else {
      this.metaService.removeTag('name="description"');
    }

    // meta robots
    this.metaService.removeTag('name=robots');
    if (outlet.activatedRouteData.state === '404') {
      this.metaService.addTag({ name: 'robots', content: 'noindex'});
    }

    // Changing meta with name="description"
    // const tag = { name: 'description', content: event['metaDescription'] };
    // const attributeSelector = 'name="description"';
    // this.metaService.removeTag(attributeSelector);
    // this.metaService.addTag(tag, false);

    this.renderer.setAttribute(this.renderer.parentNode(this.element.nativeElement), 'class', outlet.activatedRouteData.theme);
    return outlet.activatedRouteData.state;
  }
}
