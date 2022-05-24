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

const resumeTransition = trigger('resumeTransition', [
  transition(':enter', [
  ]),
  transition(':leave', [
  ])
]);

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  animations: [ resumeTransition ]
})
export class ResumeComponent implements OnInit {

  constructor() { }

  @HostBinding('@resumeTransition') '': string;

  ngOnInit(): void {
  }

}
