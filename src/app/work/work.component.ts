import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import {
  sequence,
  trigger,
  stagger,
  animate,
  style,
  group,
  query,
  transition,
  keyframes,
  animateChild } from '@angular/animations';

const workTransition = trigger('workTransition', [
  transition(':enter', [
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(200, [
      animate('0.3s ease-in', style({opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.block', stagger(200, [
      style({ opacity: 1 }),
      animate('0.3s ease-out', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  animations: [ workTransition ]
})
export class WorkComponent implements OnInit {

  photos = [
    { thumbnail: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/small/01-dashboard-desktop-light.png',
      source: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/large/01-dashboard-desktop-light.png',
      alt: 'Seven23 Dashboard' },
    { thumbnail: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/small/01-transactions-desktop-light.png',
      source: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/large/01-transactions-desktop-light.png',
      alt: 'Seven23 Transactions' },
    { thumbnail: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/small/01-change-desktop-light.png',
      source: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/large/01-change-desktop-light.png',
      alt: 'Seven23 Changes' },
    { thumbnail: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/small/01-categories-desktop-light.png',
      source: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/large/01-categories-desktop-light.png',
      alt: 'Seven23 Categories' },
    { thumbnail: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/small/01-report-desktop-light.png',
      source: 'https://cellar-c2.services.clever-cloud.com/cdn.seven23.io/static/images/screenshots/large/01-report-desktop-light.png',
      alt: 'Seven23 Report' }
  ];

  constructor(@Inject(DOCUMENT) private d ) {
  }

  @HostBinding('@workTransition') '';

  ngOnInit() {
  }

  disableScrolling(value) {
    if (this.d) {
      if (value) {
        this.d.body.style.overflow = "hidden";
      } else {
        this.d.body.style.overflow = "auto";
      }
    }
  }

}
