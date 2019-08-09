import { Component, OnInit, HostBinding } from '@angular/core';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

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

  const locationTransition = trigger('locationTransition', [
    transition(':enter', [
      query('section', style({ opacity: 0 }), {optional: true}),
      query('section', stagger(100, [
        style({ transform: 'translateY(20px)' }),
        animate('800ms cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
        ]), {optional: true}),
      ]),
    transition(':leave', [
      query('section', stagger(100, [
        style({ transform: 'translateY(0px)', opacity: 1 }),
        animate('600ms cubic-bezier(.75,-0.48,.26,1.52)', style({opacity: 0})),
        ]), {optional: true}),
      ])
    ]);

  @Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
    animations: [ locationTransition ]
  })
  export class LocationComponent implements OnInit {

    width = Math.min(window.innerWidth, 1280);
    height = Math.min(Math.round(this.width * (window.innerHeight / window.innerWidth)), 1280);

    constructor() {}

    @HostBinding('@locationTransition') '';

    ngOnInit() {
      var size = 100;

      var pulsingDot = {
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
          context.fillStyle = 'rgba(200, 200, 255,' + (1 - t) + ')';
          context.fill();

          // draw inner circle
          context.beginPath();
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          context.fillStyle = 'rgba(100, 100, 255, 1)';
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

      mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXN0aWVuYmFyYmllciIsImEiOiJjanoxdnNqZWMwcGs3M25sb3h2YmdkbDZ3In0.-dJlheQDJc4rl34gH8a0-A';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v9',
        interactive: false,
        zoom: 3,
        center: [98.9858313, 18.7888472]
      });
      map.on('load', function () {

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
                  "coordinates": [98.9858313, 18.7888472]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "pulsing-dot"
          }
        });
      });
    }

  }
