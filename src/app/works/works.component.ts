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

const worksTransition = trigger('worksTransition', [
  transition(':enter', [
    query('.project_thumbnail', style({ opacity: 0 }), {optional: true}),
    query('.project_thumbnail', stagger(100, [
      style({ transform: 'translateY(20px)' }),
      animate('800ms cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.project_thumbnail', stagger(100, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('600ms cubic-bezier(.75,-0.48,.26,1.52)', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
  animations: [ worksTransition ]
})
export class WorksComponent implements OnInit {

  constructor() {
  }

  @HostBinding('@worksTransition') '': string;

  ngOnInit(): void {
  }

}
