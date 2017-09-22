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

  photos = [
    { url: '../../assets/images/instagram/001 - Long Beach Koh Lanta.jpg',
      alt: 'Long beach Ko Lanta' },
    { url: '../../assets/images/instagram/002 - That feeling.jpg',
      alt: 'That feeling' },
    { url: '../../assets/images/instagram/003 - Reggae bar.jpg',
      alt: 'Reggae bar' },
    { url: '../../assets/images/instagram/004 - Kohub.jpg',
      alt: 'Kohub' },
    { url: '../../assets/images/instagram/005 - Kohub 2.jpg',
      alt: 'Kohub' },
    { url: '../../assets/images/instagram/006 - Taken road.jpg',
      alt: 'Taken road' },
    { url: '../../assets/images/instagram/007 - Family boat.jpg',
      alt: 'Family boat' },
    { url: '../../assets/images/instagram/008 - Gorgeous Petronas.jpg',
      alt: 'Gorgeous Petronas' },
    { url: '../../assets/images/instagram/009 - Petronas again.jpg',
      alt: 'Petronas again' },
    { url: '../../assets/images/instagram/010 - Good Morning Manila.jpg',
      alt: 'Good Morning Manila' },
    { url: '../../assets/images/instagram/011 - Mini Basket.jpg',
      alt: 'Mini Basket' },
    { url: '../../assets/images/instagram/012 - Nagtabon.jpg',
      alt: 'Nagtabon' },
    { url: '../../assets/images/instagram/013 - Modessa Sand.jpg',
      alt: 'Modessa' },
    { url: '../../assets/images/instagram/014 - Modessa Sand 2.jpg',
      alt: 'Modessa' },
    { url: '../../assets/images/instagram/015 - Hammock guy.jpg',
      alt: 'Hammock guy' },
    { url: '../../assets/images/instagram/016 - Moonrise.jpg',
      alt: 'Moonrise' },
    { url: '../../assets/images/instagram/017 - Tokyo Tower.jpg',
      alt: 'Tokyo Tower' },
    { url: '../../assets/images/instagram/018 - Torii.jpg',
      alt: 'Torii' },
    { url: '../../assets/images/instagram/019 - Meiji Jingu.jpg',
      alt: 'Meiji Jingu' },
    { url: '../../assets/images/instagram/020 - Prayer.jpg',
      alt: 'Prayer' },
    { url: '../../assets/images/instagram/023 - Golden Pavillion.jpg',
      alt: 'Golden Pavillion' },
    { url: '../../assets/images/instagram/024 - Red Torii.jpg',
      alt: 'Red Torii' },
    { url: '../../assets/images/instagram/025 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { url: '../../assets/images/instagram/026 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { url: '../../assets/images/instagram/027 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { url: '../../assets/images/instagram/028 - Fort bloque.jpg',
      alt: 'Fort Bloque' },
    { url: '../../assets/images/instagram/029 - Dreamy Glenan.JPG',
      alt: 'Dreamy Glenan' },
    { url: '../../assets/images/instagram/030 - Morning Glenan.JPG',
      alt: 'Morning Glenan' },
    { url: '../../assets/images/instagram/031 - Peaceful Giant.jpg',
      alt: 'Peaceful Giant' }
  ];

  constructor() {
    this.photos = this.photos.reverse();
  }

  @HostBinding('@photosTransition') '';

  ngOnInit() {
  }

}
