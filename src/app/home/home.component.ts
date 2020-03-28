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

// import instagram from '../../assets/json/instagram_feed.json';
// import nomadlist from '../../assets/json/nomadlist_feed.json';

const homeTransition = trigger('homeTransition', [
  transition(':enter', group([
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(100, [
      style({ transform: 'translateY(10px)' }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ]), {optional: true}),
    query('.scrollHelper', sequence([
      style({ opacity: 0 }),
      animate('150ms', style({ opacity: 1 })),
    ]), {optional: true}),
  ])),
  transition(':leave', group([
    query('.block', stagger(100, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('0.6s cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(60px)', opacity: 0})),
    ]), {optional: true}),
    query('.scrollHelper', sequence([
      style({ opacity: 1 }),
      animate('0.3s', style({ opacity: 0 })),
    ]), {optional: true}),
  ]))
]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ homeTransition ]
})
export class HomeComponent implements OnInit {

  hasIntersectionObservable: Boolean;
  // instagram = { data: instagram.data.slice(0, 8) };
  // nomadlist = nomadlist;
  // now: Date = new Date(new Date().toLocaleString("en-US", {timeZone: nomadlist.location.now.timezone}));
  // diff: number =(new Date().getUTCHours() - new Date(new Date().toLocaleString("en-US", {timeZone: nomadlist.location.now.timezone})).getHours()) * -1;

  constructor() {
    // this.hasIntersectionObservable = IntersectionObserver != undefined;
  }

  @HostBinding('@homeTransition') '';

  ngOnInit() {
    // if (this.hasIntersectionObservable) {
    //   var observer = new IntersectionObserver(function(entries) {
    //     entries.forEach(function(entry) {
    //       if (entry.isIntersecting && !entry.target.classList.contains('show')) {
    //         entry.target.classList.add('show');
    //       }
    //     });
    //   }, { threshold: [0] });

    //   observer.observe(document.querySelector("#observer1"));
    //   observer.observe(document.querySelector("#observer2"));
    //   observer.observe(document.querySelector("#observer3"));
    //   observer.observe(document.querySelector("#observer4"));

    // }
  }

}
