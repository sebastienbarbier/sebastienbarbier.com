import { Component, OnInit, Inject, Renderer2, ElementRef, PLATFORM_ID, Optional } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations';

import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, Location } from '@angular/common';
import { Routes } from '@angular/router';

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
  /**
   * AppComponent define the general layout common to all pages.
   * It include header, navigation, and footer.
   * It also include some logic regarding Angular for smooth transitions between pages.
   **/

  navigationMenuStatus: Boolean;
  lang: string;
  path: string;
  headerState: string;
  hideMenuAnimation: Boolean;
  // Boolean to toggle the logo opacity effect
  contentIsScrolledTop: Boolean;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private element: ElementRef,
      private renderer: Renderer2,
      private titleService: Title,
      private metaService: Meta,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(DOCUMENT) private _document: Document,
      @Optional() @Inject('serverUrl') protected serverUrl: string
    ) {
    this.navigationMenuStatus = false;
    this.hideMenuAnimation = true;
    this.contentIsScrolledTop = false;

    this.lang = 'en';
    this.path = '';
    this.headerState = '';
    // if (isPlatformBrowser(platformId) && d.location.hostname.endsWith('sebastienbarbier.fr')) {
    //   this.lang = 'en';
    // } else if (isPlatformServer(platformId) && serverUrl.split(':')[1].endsWith('sebastienbarbier.fr')) {
    //   this.lang = 'en';
    // }
    // translate.setDefaultLang(this.lang);
    // translate.use(this.lang);

  }

  closeNavigation() {
    this.navigationMenuStatus = false;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // Main instanceof event:
      // NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
      if (event instanceof NavigationStart) {
        // On page change, we close navigation menu
        if (this.navigationMenuStatus === true) {
          this.navigationMenuStatus = !this.navigationMenuStatus;
        }
      }
      // Start loading animation on menu icon
      if (event instanceof RouteConfigLoadStart && !this.hideMenuAnimation) {
          this._document.getElementById('navigation__button')?.classList.add('isLoading');
      }
      // Stop loading animation on menu icon
      if (event instanceof RouteConfigLoadEnd && !this.hideMenuAnimation) {
        this._document.getElementById('navigation__button')?.classList.remove('isLoading');
      }
      if (event instanceof NavigationEnd) {

        this.path = event.url;
        // If home page, we hide header
        // if (event.url === '/') {
        //   this.headerState = 'home';
        // } else if (event.url === '/about-me') {
        //   this.headerState = 'aboutMe';
        // } else if (event.url === '/work') {
        //   this.headerState = 'work';
        // } else if (event.url === '/resume') {
        //   this.headerState = 'resume';
        // } else {
        //   this.headerState = 'notHome';
        // }
        // We enable overflow on body if fullscreen action had disabled it
        this._document.body.style.overflow = "auto";

        if (this.hideMenuAnimation) {
          this.hideMenuAnimation = false;
        }

        /**
         * Handle header animation on scroll to avoid overlapping content together
         *
         **/
        const SCROLL_PX_TRIGGER_HEADER_ANIMATION = 40;
        const wrappers = this._document.getElementsByClassName('wrapper');
        if (wrappers.length != 0) {
          const element = wrappers[wrappers.length - 1];

          if (element.scrollTop < SCROLL_PX_TRIGGER_HEADER_ANIMATION) {
            setTimeout(() => {
              this.contentIsScrolledTop = true;
            }, 400);
          }

          // Add listenner to hider with opacity te header logo
          element.addEventListener("scroll", (event) => {
            if (element.scrollTop < SCROLL_PX_TRIGGER_HEADER_ANIMATION) {
              this.contentIsScrolledTop = true;
            } else {
              this.contentIsScrolledTop = false;
            }
          });
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

  getState(outlet: RouterOutlet) {
    /**
     * Will be triggered on every page navigation
     **/

    // Update page title, different on every page
    if (outlet.activatedRouteData.title) {
      this.titleService.setTitle(`${outlet.activatedRouteData.title} - Sebastien Barbier`);
    } else {
      this.titleService.setTitle(`Sebastien Barbier`);
    }

    // Update metadata description field

    this.metaService.removeTag('name="description"');
    if (outlet.activatedRouteData.description) {
      // Update title and meta data
      this.metaService.addTag({ name: 'description', content: outlet.activatedRouteData.description }, false);
    }

    // Add noindex on page 404 to avoid browser referencing it
    this.metaService.removeTag('name=robots');
    if (outlet.activatedRouteData.state === '404') {
      this.metaService.addTag({ name: 'robots', content: 'noindex'});
    }

    // Update theme value (light/dark) based on route description
    this.renderer.setAttribute(this.renderer.parentNode(this.element.nativeElement), 'class', outlet.activatedRouteData.theme);

    // Return state
    return outlet.activatedRouteData.state;
  }
}
