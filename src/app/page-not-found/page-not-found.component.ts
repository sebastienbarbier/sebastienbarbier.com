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

const pageNotFoundTransition = trigger('pageNotFoundTransition', []);

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: false
})
export class PageNotFoundComponent {

  constructor() { }

  @HostBinding('@pageNotFoundTransition') '': string;

}
