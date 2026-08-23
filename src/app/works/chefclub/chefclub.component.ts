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

const chefclubTransition = trigger('chefclubTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-chefclub',
  templateUrl: './chefclub.component.html',
  styleUrls: ['./chefclub.component.scss'],
  animations: [ chefclubTransition ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class ChefclubComponent {
  constructor() {
  }

  @HostBinding('@chefclubTransition') '': string;

  ngOnInit(): void {
  }
}
