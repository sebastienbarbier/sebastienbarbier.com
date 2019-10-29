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
    query('header .animate', style({ opacity: 0, transform: 'translateY(-10px) scale(0.9)', position: 'relative' }), {optional: true}),
    query('section', style({ opacity: 0 }), {optional: true}),
    query('header .animate', stagger(200, [animate('0.3s', style({opacity: 1, transform: 'translateY(0px) scale(1)'}))]), {optional: true}),
    query('section', stagger(200, [
      animate('0.3s ease-in', style({opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('section, header', stagger(200, [
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
  ];

  constructor(@Inject(DOCUMENT) private d ) {
    console.log('WorkComponent', d);
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
