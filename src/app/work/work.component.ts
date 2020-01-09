import { Component, OnInit, Inject, HostBinding, Renderer2 } from '@angular/core';
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
    { thumbnail: '/assets/images/seven23/screenshots/small/01-dashboard-desktop-light.png',
      source: '/assets/images/seven23/screenshots/large/01-dashboard-desktop-light.png',
      alt: 'Seven23 Dashboard desktop' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-dashboard-mobile-light.png',
      source: '/assets/images/seven23/screenshots/large/01-dashboard-mobile-light.png',
      alt: 'Seven23 Dashboard mobile' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-transactions-desktop-light.png',
      source: '/assets/images/seven23/screenshots/large/01-transactions-desktop-light.png',
      alt: 'Seven23 Transactions desktop' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-transactions-mobile-light.png',
      source: '/assets/images/seven23/screenshots/large/01-transactions-mobile-light.png',
      alt: 'Seven23 Transactions mobile' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-change-desktop-light.png',
      source: '/assets/images/seven23/screenshots/large/01-change-desktop-light.png',
      alt: 'Seven23 Changes desktop' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-change-mobile-light.png',
      source: '/assets/images/seven23/screenshots/large/01-change-mobile-light.png',
      alt: 'Seven23 Changes mobile' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-categories-desktop-light.png',
      source: '/assets/images/seven23/screenshots/large/01-categories-desktop-light.png',
      alt: 'Seven23 Categories desktop' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-categories-mobile-light.png',
      source: '/assets/images/seven23/screenshots/large/01-categories-mobile-light.png',
      alt: 'Seven23 Categories mobile' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-report-desktop-light.png',
      source: '/assets/images/seven23/screenshots/large/01-report-desktop-light.png',
      alt: 'Seven23 Report desktop' },
    { thumbnail: '/assets/images/seven23/screenshots/small/01-report-mobile-light.png',
      source: '/assets/images/seven23/screenshots/large/01-report-mobile-light.png',
      alt: 'Seven23 Report mobile' }
  ];

  constructor(private renderer: Renderer2,
              @Inject(DOCUMENT) private d ) {
  }

  @HostBinding('@workTransition') '';

  ngOnInit() {
  }

  disableScrolling(value) {
    if (this.d) {
      if (value) {
        this.renderer.setAttribute(this.d.getElementById('navigation__button'), 'class', 'hide');
        this.d.body.style.overflow = "hidden";
      } else {
        this.renderer.setAttribute(this.d.getElementById('navigation__button'), 'class', 'show');
        this.d.body.style.overflow = "auto";
      }
    }
  }

}
