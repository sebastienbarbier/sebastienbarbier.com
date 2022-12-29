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
  ]),
  transition(':leave', [
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
