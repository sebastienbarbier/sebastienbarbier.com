import { Component, OnInit, HostBinding } from '@angular/core';

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

const contactTransition = trigger('contactTransition', [
  transition(':enter', [
    query('section', style({ opacity: 0 }), {optional: true}),
    query('section', stagger(100, [
      style({ transform: 'translateY(20px)' }),
      animate('800ms cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('section', stagger(100, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('600ms cubic-bezier(.75,-0.48,.26,1.52)', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [ contactTransition ]
})
export class ContactComponent implements OnInit {

  constructor() { }

  @HostBinding('@contactTransition') '': string;

  ngOnInit() {
  }

}
