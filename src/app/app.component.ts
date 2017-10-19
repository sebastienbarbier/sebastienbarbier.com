import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, Inject, Renderer2, ElementRef, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { routerTransition } from './router.animations';

 import { isPlatformBrowser, isPlatformServer } from '@angular/common';

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

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private element: ElementRef,
      private renderer: Renderer2,
      @Inject(PLATFORM_ID) private platformId: Object
    ) {
    this.headerState = 'hide';
    this.navigationMenuStatus = false;
    this.element = element;
    this.renderer = renderer;
    this.platformId = platformId;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
      if (event instanceof NavigationEnd) {
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
  }

  getState(outlet) {
   if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.renderer.setAttribute(this.element.nativeElement.parentElement, 'class', outlet.activatedRouteData.theme);
   }
   if (isPlatformServer(this.platformId)) {
     // Server only code.
      this.renderer.setAttribute(this.element.nativeElement.parent, 'class', outlet.activatedRouteData.theme);
   }
    return outlet.activatedRouteData.state;
  }

}
