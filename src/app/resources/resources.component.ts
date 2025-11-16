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
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  animations: [ resourcesTransition ],
  standalone: false
})
export class ResourcesComponent implements OnInit {

  constructor() { }

  @HostBinding('@resourcesTransition') '': string;

  ngOnInit() {
  }

}
