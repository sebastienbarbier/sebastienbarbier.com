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

import instagram from '../../assets/json/instagram_feed.json';
import nomadlist from '../../assets/json/nomadlist_feed.json';

const homeTransition = trigger('homeTransition', [
  transition(':enter', group([
    query('.block', style({ opacity: 0 }), {optional: true}),
    query('.block', stagger(100, [
      style({ transform: 'translateY(60px)' }),
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
  instagram = { data: instagram.data.slice(0, 8) };
  nomadlist = nomadlist;

  constructor() {
    this.hasIntersectionObservable = IntersectionObserver != undefined;
  }


  @HostBinding('@homeTransition') '';

  ngOnInit() {
    if (this.hasIntersectionObservable) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !entry.target.classList.contains('show')) {
            entry.target.classList.add('show');
          }
        });
      }, { threshold: [0] });

      observer.observe(document.querySelector("#observer1"));
      observer.observe(document.querySelector("#observer2"));
      observer.observe(document.querySelector("#observer3"));

      mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWVuYmFyYmllciIsImEiOiJjanoxdnNqZWMwcGs3M25sb3h2YmdkbDZ3In0.-dJlheQDJc4rl34gH8a0-A';
      setTimeout(() => {
        var map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
          center: [nomadlist.location.now.longitude, nomadlist.location.now.latitude], // starting position [lng, lat]
          zoom: 2 // starting zoom
        });
        map.scrollZoom.disable();
        map.on('load', function () {
          var size = 50;
          const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),

            onAdd: function() {
              var canvas = document.createElement('canvas');
              canvas.width = this.width;
              canvas.height = this.height;
              this.context = canvas.getContext('2d');
            },

            render: function() {
              var duration = 1000;
              var t = (performance.now() % duration) / duration;

              var radius = size / 2 * 0.3;
              var outerRadius = size / 2 * 0.7 * t + radius;
              var context = this.context;

              // draw outer circle
              context.clearRect(0, 0, this.width, this.height);
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
              context.fillStyle = 'rgba(219, 183, 120,' + (1 - t) + ')';
              context.fill();

              // draw inner circle
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
              context.fillStyle = 'rgba(219, 183, 120, 1)';
              context.strokeStyle = 'white';
              context.lineWidth = 2 + 4 * (1 - t);
              context.fill();
              context.stroke();

              // update this image's data with data from the canvas
              this.data = context.getImageData(0, 0, this.width, this.height).data;

              // keep the map repainting
              map.triggerRepaint();

              // return `true` to let the map know that the image was updated
              return true;
            }
          };

          map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
          map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [nomadlist.location.now.longitude, nomadlist.location.now.latitude]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": "pulsing-dot"
            }
          });
        });
      }, 600);

    }
  }

}
