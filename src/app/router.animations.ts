/**
 * Code is from https://medium.com/google-developer-experts/
 * angular-supercharge-your-router-transitions-using-new-animation-features-v4-3-3eb341ede6c8
 */
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

export const routerTransition = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), {optional: true}),
    query(':enter', style({ opacity: 0 }), {optional: true}),
    sequence([
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          style({ opacity: 1 }),
          animate('200ms ease-out',
          style({ opacity: 0 }))
        ], {optional: true}),
        query(':enter', [
          style({ opacity: 0 }),
          animate('200ms 50ms ease-in',
          style({ opacity: 1 }))
        ], {optional: true}),
      ]),
      query(':enter', animateChild(), {optional: true})
    ])
  ])
]);
