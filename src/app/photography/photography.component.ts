import { Component, OnInit, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

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

const photosTransition = trigger('photosTransition', [
  transition(':enter', [
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(100, [
      style({ opacity: 0 }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.block', stagger(100, [
      style({ opacity: 1 }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss'],
  animations: [ photosTransition ]
})
export class PhotographyComponent implements OnInit {

  selectedPhoto;
  source = '/assets/images/';
  photos = [
  ];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.photos = this.photos.reverse();
    this.selectedPhoto = null;
  }

  @HostBinding('@photosTransition') '';

  ngOnInit() {

  }

  // Show event.
  view(event, photo = null) {
    this.selectedPhoto = photo;
    // Disable href if javascript is activated
    event.preventDefault();
  }

}
