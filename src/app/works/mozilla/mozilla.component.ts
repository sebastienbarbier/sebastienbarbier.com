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

const mozillaTransition = trigger('mozillaTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-mozilla',
  templateUrl: './mozilla.component.html',
  styleUrls: ['./mozilla.component.scss'],
  animations: [ mozillaTransition ],
  standalone: false
})
export class MozillaComponent {
  constructor() {
  }

  @HostBinding('@mozillaTransition') '': string;

  ngOnInit(): void {
  }
}
