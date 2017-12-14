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

const projectTransition = trigger('projectTransition', [
  transition(':enter', [
    query('.line', style({ opacity: 0 }), {optional: true}),
    query('.line', stagger(200, [
      animate('0.3s ease-in', style({opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.line', stagger(200, [
      style({ opacity: 1 }),
      animate('0.3s ease-out', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [ projectTransition ]
})
export class ProjectsComponent implements OnInit {

  constructor() {

  }

  @HostBinding('@projectTransition') '';

  ngOnInit() {
  }

}
