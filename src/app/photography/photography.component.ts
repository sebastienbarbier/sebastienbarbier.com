import { Component, OnInit, HostBinding, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
  photos = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.photos = this.photos.reverse();
    this.selectedPhoto = null;
  }

  @HostBinding('@photosTransition') '';

  ngOnInit() {

    this.getInstagramPhotos().subscribe(data => {
      // Read the result field from the JSON response.
      this.photos = data['data'].slice(0, 16);
      console.log(data);
    },
    err => {
      this.getInstagramPhotos(true).subscribe(data => {
        // Read the result field from the JSON response.
        this.photos = data['data'].slice(0, 16);
        console.log(data);
      });
    });
  }

  /** GET heroes from the server */
  getInstagramPhotos (forceLocal = false) {
    const token = '487407.1677ed0.5b1098a0ca864bb09da9ba6f1b480270';
    const INSTAGRAM_URL = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`;
    if (!forceLocal && isPlatformBrowser(this.platformId)) {
      return this.http.get<Object>(INSTAGRAM_URL);
    } else if (forceLocal || isPlatformServer(this.platformId)) {
      return this.http.get<Object>('/static/instagram_feed.json');
    }

  }

  view(event, photo = null) {
    this.selectedPhoto = photo;
    // Disable href if javascript is activated
    event.preventDefault();
  }

}
