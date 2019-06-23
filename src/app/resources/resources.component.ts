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

const resourcesTransition = trigger('resourcesTransition', [
  transition(':enter', [
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(100, [
      style({ transform: 'translateY(10px)' }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.block', stagger(100, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(10px)', opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  animations: [ resourcesTransition ]
})
export class ResourcesComponent implements OnInit {

  constructor() { }

  @HostBinding('@resourcesTransition') '';

  ngOnInit() {
  }

}
