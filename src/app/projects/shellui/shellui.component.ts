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

const shelluiTransition = trigger('shelluiTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-shellui',
  templateUrl: './shellui.component.html',
  styleUrls: ['./shellui.component.scss'],
  animations: [ shelluiTransition ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ShelluiComponent {
  constructor() {
  }

  @HostBinding('@shelluiTransition') '': string;

  ngOnInit(): void {
  }
}
