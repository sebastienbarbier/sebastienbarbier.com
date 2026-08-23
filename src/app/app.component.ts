import { Component, OnInit, Inject, Renderer2, ElementRef, PLATFORM_ID, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd, RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations';

import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  animations: [ routerTransition ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class AppComponent implements OnInit {
  /**
   * AppComponent define the general layout common to all pages.
   * It include header, navigation, and footer.
   * It also include some logic regarding Angular for smooth transitions between pages.
   **/

  navigationMenuStatus: Boolean;
  path: string;
  headerState: string;
  hideMenuAnimation: Boolean;
  // Boolean to toggle the logo opacity effect
  contentIsScrolledTop: Boolean;

  // Skip enter animations on first paint / hydration so prerendered HTML does not flash.
  @HostBinding('@.disabled')
  animationsDisabled = true;

  constructor(
      private router: Router,
      private element: ElementRef,
      private renderer: Renderer2,
      private titleService: Title,
      private metaService: Meta,
      @Inject(PLATFORM_ID) private platformId: Object,
      @Inject(DOCUMENT) private _document: Document
    ) {
    this.navigationMenuStatus = false;
    this.hideMenuAnimation = true;
    this.contentIsScrolledTop = false;

    this.path = '';
    this.headerState = '';
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
        // We enable overflow on body if fullscreen action had disabled it
        this._document.body.style.overflow = "auto";

        if (this.hideMenuAnimation) {
          this.hideMenuAnimation = false;
          // Re-enable route/page animations after the first paint.
          if (isPlatformBrowser(this.platformId)) {
            this.animationsDisabled = false;
          }
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
