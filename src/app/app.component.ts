import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { routerTransition } from './router.animations';

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
    @Inject(DOCUMENT) private document
  ) {
    this.headerState = 'hide';
    this.navigationMenuStatus = false;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
      if (event instanceof NavigationEnd) {
        // If home page, we hide header
        if (event.url === '/' || event.url === '/home') {
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
    this.document.getElementById('body').setAttribute('class', outlet.activatedRouteData.theme);
    return outlet.activatedRouteData.state;
  }

}
