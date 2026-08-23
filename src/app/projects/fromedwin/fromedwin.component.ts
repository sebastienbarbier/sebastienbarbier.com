import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';

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

const fromEdwinTransition = trigger('fromEdwinTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-fromedwin',
  templateUrl: './fromedwin.component.html',
  styleUrls: ['./fromedwin.component.scss'],
  animations: [ fromEdwinTransition ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FromedwinComponent {
  constructor() {
  }

  @HostBinding('@fromEdwinTransition') '': string;

  ngOnInit(): void {
  }
}
