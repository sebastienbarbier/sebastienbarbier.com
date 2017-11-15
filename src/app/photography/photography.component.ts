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
    { thumbnail: '/assets/images/instagram/001 - Long Beach Koh Lanta.jpg',
      source: '/assets/images/instagram/large/001 - Long Beach Koh Lanta.jpg',
      alt: 'Long beach Ko Lanta' },
    { thumbnail: '/assets/images/instagram/002 - That feeling.jpg',
      source: '/assets/images/instagram/large/002 - That feeling.jpg',
      alt: 'That feeling' },
    { thumbnail: '/assets/images/instagram/003 - Reggae bar.jpg',
      source: '/assets/images/instagram/large/003 - Reggae bar.jpg',
      alt: 'Reggae bar' },
    { thumbnail: '/assets/images/instagram/004 - Kohub.jpg',
      source: '/assets/images/instagram/large/004 - Kohub.jpg',
      alt: 'Kohub' },
    { thumbnail: '/assets/images/instagram/005 - Kohub 2.jpg',
      source: '/assets/images/instagram/large/005 - Kohub 2.jpg',
      alt: 'Kohub' },
    { thumbnail: '/assets/images/instagram/006 - Taken road.jpg',
      source: '/assets/images/instagram/large/006 - Taken road.jpg',
      alt: 'Taken road' },
    { thumbnail: '/assets/images/instagram/007 - Family boat.jpg',
      source: '/assets/images/instagram/large/007 - Family boat.jpg',
      alt: 'Family boat' },
    { thumbnail: '/assets/images/instagram/008 - Gorgeous Petronas.jpg',
      source: '/assets/images/instagram/large/008 - Gorgeous Petronas.jpg',
      alt: 'Gorgeous Petronas' },
    { thumbnail: '/assets/images/instagram/009 - Petronas again.jpg',
      source: '/assets/images/instagram/large/009 - Petronas again.jpg',
      alt: 'Petronas again' },
    { thumbnail: '/assets/images/instagram/010 - Good Morning Manila.jpg',
      source: '/assets/images/instagram/large/010 - Good Morning Manila.jpg',
      alt: 'Good Morning Manila' },
    { thumbnail: '/assets/images/instagram/011 - Mini Basket.jpg',
      source: '/assets/images/instagram/large/011 - Mini Basket.jpg',
      alt: 'Mini Basket' },
    { thumbnail: '/assets/images/instagram/012 - Nagtabon.jpg',
      source: '/assets/images/instagram/large/012 - Nagtabon.jpg',
      alt: 'Nagtabon' },
    { thumbnail: '/assets/images/instagram/013 - Modessa Sand.jpg',
      source: '/assets/images/instagram/large/013 - Modessa Sand.jpg',
      alt: 'Modessa' },
    { thumbnail: '/assets/images/instagram/014 - Modessa Sand 2.jpg',
      source: '/assets/images/instagram/large/014 - Modessa Sand 2.jpg',
      alt: 'Modessa' },
    { thumbnail: '/assets/images/instagram/015 - Hammock guy.jpg',
      source: '/assets/images/instagram/large/015 - Hammock guy.jpg',
      alt: 'Hammock guy' },
    { thumbnail: '/assets/images/instagram/016 - Moonrise.jpg',
      source: '/assets/images/instagram/large/016 - Moonrise.jpg',
      alt: 'Moonrise' },
    { thumbnail: '/assets/images/instagram/017 - Tokyo Tower.jpg',
      source: '/assets/images/instagram/large/017 - Tokyo Tower.jpg',
      alt: 'Tokyo Tower' },
    { thumbnail: '/assets/images/instagram/018 - Torii.jpg',
      source: '/assets/images/instagram/large/018 - Torii.jpg',
      alt: 'Torii' },
    { thumbnail: '/assets/images/instagram/019 - Meiji Jingu.jpg',
      source: '/assets/images/instagram/large/019 - Meiji Jingu.jpg',
      alt: 'Meiji Jingu' },
    { thumbnail: '/assets/images/instagram/020 - Prayer.jpg',
      source: '/assets/images/instagram/large/020 - Prayer.jpg',
      alt: 'Prayer' },
    { thumbnail: '/assets/images/instagram/023 - Golden Pavillion.jpg',
      source: '/assets/images/instagram/large/023 - Golden Pavillion.jpg',
      alt: 'Golden Pavillion' },
    { thumbnail: '/assets/images/instagram/024 - Red Torii.jpg',
      source: '/assets/images/instagram/large/024 - Red Torii.jpg',
      alt: 'Red Torii' },
    { thumbnail: '/assets/images/instagram/025 - Fort bloque.jpg',
      source: '/assets/images/instagram/large/025 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: '/assets/images/instagram/026 - Fort bloque.jpg',
      source: '/assets/images/instagram/large/026 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: '/assets/images/instagram/027 - Fort bloque.jpg',
      source: '/assets/images/instagram/large/027 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: '/assets/images/instagram/028 - Fort bloque.jpg',
      source: '/assets/images/instagram/large/028 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { thumbnail: '/assets/images/instagram/029 - Dreamy Glenan.JPG',
      source: '/assets/images/instagram/large/029 - Dreamy Glenan.JPG',
      alt: 'Dreamy Glenan' },
    { thumbnail: '/assets/images/instagram/030 - Morning Glenan.JPG',
      source: '/assets/images/instagram/large/030 - Morning Glenan.JPG',
      alt: 'Morning Glenan' },
    { thumbnail: '/assets/images/instagram/031 - Peaceful Giant.jpg',
      source: '/assets/images/instagram/large/031 - Peaceful Giant.jpg',
      alt: 'Peaceful Giant' },
    { thumbnail: '/assets/images/instagram/032 - Loy Kratong.JPG',
      source: '/assets/images/instagram/large/032 - Loy Kratong.JPG',
      alt: 'Loy Kratong' }
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
