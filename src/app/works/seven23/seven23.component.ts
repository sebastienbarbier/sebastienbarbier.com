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

const seven23Transition = trigger('seven23Transition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-seven23',
  templateUrl: './seven23.component.html',
  styleUrls: ['./seven23.component.scss'],
  animations: [ seven23Transition ],
  standalone: false
})
export class Seven23Component implements OnInit {

  constructor() {
  }

  @HostBinding('@seven23Transition') '': string;

  ngOnInit(): void {
  }
  
}
