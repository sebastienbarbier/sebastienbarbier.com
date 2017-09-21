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
    { url: '../../assets/images/instagram/001 - Long Beach Koh Lanta.jpg', alt: '' },
    { url: '../../assets/images/instagram/002 - That feeling.jpg', alt: '' },
    { url: '../../assets/images/instagram/003 - Reggae bar.jpg', alt: '' },
    { url: '../../assets/images/instagram/004 - Kohub.jpg', alt: '' },
    { url: '../../assets/images/instagram/005 - Kohub 2.jpg', alt: '' },
    { url: '../../assets/images/instagram/006 - Taken road.jpg', alt: '' },
    { url: '../../assets/images/instagram/007 - Family boat.jpg', alt: '' },
    { url: '../../assets/images/instagram/008 - Gorgeous Petronas.jpg', alt: '' },
    { url: '../../assets/images/instagram/009 - Petronas again.jpg', alt: '' },
    { url: '../../assets/images/instagram/010 - Good Morning Manila.jpg', alt: '' },
    { url: '../../assets/images/instagram/011 - Mini Basket.jpg', alt: '' },
    { url: '../../assets/images/instagram/012 - Nagtabon.jpg', alt: '' },
    { url: '../../assets/images/instagram/013 - Modessa Sand.jpg', alt: '' },
    { url: '../../assets/images/instagram/014 - Modessa Sand 2.jpg', alt: '' },
    { url: '../../assets/images/instagram/015 - Hammock guy.jpg', alt: '' },
    { url: '../../assets/images/instagram/016 - Moonrise.jpg', alt: '' },
    { url: '../../assets/images/instagram/017 - Tokyo Tower.jpg', alt: '' },
    { url: '../../assets/images/instagram/018 - Torii.jpg', alt: '' },
    { url: '../../assets/images/instagram/019 - Meiji Jingu.jpg', alt: '' },
    { url: '../../assets/images/instagram/020 - Prayer.jpg', alt: '' },
    { url: '../../assets/images/instagram/023 - Golden Pavillion.jpg', alt: '' },
    { url: '../../assets/images/instagram/024 - Red Torii.jpg', alt: '' },
    { url: '../../assets/images/instagram/025 - Fort bloque.jpg', alt: '' },
    { url: '../../assets/images/instagram/026 - Fort bloque.jpg', alt: '' },
    { url: '../../assets/images/instagram/027 - Fort bloque.jpg', alt: '' },
    { url: '../../assets/images/instagram/028 - Fort bloque.jpg', alt: '' },
    { url: '../../assets/images/instagram/029 - Dreamy Glenan.JPG', alt: '' },
    { url: '../../assets/images/instagram/030 - Morning Glenan.JPG', alt: '' },
    { url: '../../assets/images/instagram/031 - Peaceful Giant.jpg', alt: '' }
  ];

  constructor() { }

  @HostBinding('@photosTransition') '';

  ngOnInit() {
  }

}
