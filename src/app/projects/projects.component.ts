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

const projectsTransition = trigger('projectsTransition', [
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
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [ projectsTransition ]
})
export class ProjectsComponent implements OnInit {

  constructor() {
  }

  @HostBinding('@projectsTransition') '': string;

  ngOnInit(): void {
  }

}
