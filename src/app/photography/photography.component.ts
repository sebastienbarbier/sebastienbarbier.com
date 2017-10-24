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
  photos = [
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/001 - Long Beach Koh Lanta.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/001 - Long Beach Koh Lanta.jpg',
      alt: 'Long beach Ko Lanta' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/002 - That feeling.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/002 - That feeling.jpg',
      alt: 'That feeling' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/003 - Reggae bar.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/003 - Reggae bar.jpg',
      alt: 'Reggae bar' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/004 - Kohub.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/004 - Kohub.jpg',
      alt: 'Kohub' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/005 - Kohub 2.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/005 - Kohub 2.jpg',
      alt: 'Kohub' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/006 - Taken road.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/006 - Taken road.jpg',
      alt: 'Taken road' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/007 - Family boat.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/007 - Family boat.jpg',
      alt: 'Family boat' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/008 - Gorgeous Petronas.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/008 - Gorgeous Petronas.jpg',
      alt: 'Gorgeous Petronas' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/009 - Petronas again.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/009 - Petronas again.jpg',
      alt: 'Petronas again' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/010 - Good Morning Manila.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/010 - Good Morning Manila.jpg',
      alt: 'Good Morning Manila' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/011 - Mini Basket.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/011 - Mini Basket.jpg',
      alt: 'Mini Basket' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/012 - Nagtabon.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/012 - Nagtabon.jpg',
      alt: 'Nagtabon' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/013 - Modessa Sand.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/013 - Modessa Sand.jpg',
      alt: 'Modessa' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/014 - Modessa Sand 2.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/014 - Modessa Sand 2.jpg',
      alt: 'Modessa' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/015 - Hammock guy.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/015 - Hammock guy.jpg',
      alt: 'Hammock guy' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/016 - Moonrise.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/016 - Moonrise.jpg',
      alt: 'Moonrise' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/017 - Tokyo Tower.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/017 - Tokyo Tower.jpg',
      alt: 'Tokyo Tower' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/018 - Torii.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/018 - Torii.jpg',
      alt: 'Torii' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/019 - Meiji Jingu.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/019 - Meiji Jingu.jpg',
      alt: 'Meiji Jingu' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/020 - Prayer.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/020 - Prayer.jpg',
      alt: 'Prayer' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/023 - Golden Pavillion.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/023 - Golden Pavillion.jpg',
      alt: 'Golden Pavillion' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/024 - Red Torii.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/024 - Red Torii.jpg',
      alt: 'Red Torii' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/025 - Fort bloque.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/025 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/026 - Fort bloque.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/026 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/027 - Fort bloque.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/027 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/028 - Fort bloque.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/028 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/029 - Dreamy Glenan.JPG',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/029 - Dreamy Glenan.JPG',
      alt: 'Dreamy Glenan' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/030 - Morning Glenan.JPG',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/030 - Morning Glenan.JPG',
      alt: 'Morning Glenan' },
    { thumbnail: 'https://public.sebastienbarbier.com/images/instagram/031 - Peaceful Giant.jpg',
      source: 'https://public.sebastienbarbier.com/images/instagram/large/031 - Peaceful Giant.jpg',
      alt: 'Peaceful Giant' }
  ];

  constructor() {
    this.photos = this.photos.reverse();
    this.selectedPhoto = null;
  }

  @HostBinding('@photosTransition') '';

  ngOnInit() {
  }

  view(event, photo = null) {
    this.selectedPhoto = photo;
    // Disable href if javascript is activated
    event.preventDefault();
  }

}
