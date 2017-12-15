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

const projectTransition = trigger('projectTransition', [
  transition(':enter', [
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(200, [
      animate('0.3s ease-in', style({opacity: 1})),
    ]), {optional: true}),
  ]),
  transition(':leave', [
    query('.block', stagger(200, [
      style({ opacity: 1 }),
      animate('0.3s ease-out', style({opacity: 0})),
    ]), {optional: true}),
  ])
]);

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [ projectTransition ]
})
export class ProjectsComponent implements OnInit {

  selectedPhoto;
  photos = [
    { thumbnail: 'https://public.sebastienbarbier.com/images/seven23/screenshots/1-dashboard.png',
      source: 'https://public.sebastienbarbier.com/images/seven23/screenshots/large/1-dashboard.png',
      alt: 'Seven23 Dashboard' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/seven23/screenshots/2-transactions.png',
      source: 'https://public.sebastienbarbier.com/images/seven23/screenshots/large/2-transactions.png',
      alt: 'Seven23 Transactions' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/seven23/screenshots/3-changes.png',
      source: 'https://public.sebastienbarbier.com/images/seven23/screenshots/large/3-changes.png',
      alt: 'Seven23 Changes' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/seven23/screenshots/4-categories.png',
      source: 'https://public.sebastienbarbier.com/images/seven23/screenshots/large/4-categories.png',
      alt: 'Seven23 Categories' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/seven23/screenshots/5-settings.png',
      source: 'https://public.sebastienbarbier.com/images/seven23/screenshots/large/5-settings.png',
      alt: 'Seven23 Settings' }
  ];

  constructor() {
    this.selectedPhoto = null;
  }

  @HostBinding('@projectTransition') '';

  ngOnInit() {
  }

  view(event, photo = null) {
    this.selectedPhoto = photo;
    // Disable href if javascript is activated
    event.preventDefault();
  }

}
