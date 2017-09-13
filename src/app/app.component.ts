import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  headerState: string;
  navigationMenuStatus: Boolean;
  title = 'app';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.headerState = 'hide';
    this.navigationMenuStatus = false;
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

    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => this.title = event['title']);
  }
}
