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
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {optional: true}),
    query(':enter', style({ transform: 'translateX(100%)' }), {optional: true}),
    sequence([
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
          style({ transform: 'translateX(-100%)' }))
        ], {optional: true}),
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
          style({ transform: 'translateX(0%)' }))
        ], {optional: true}),
      ]),
      query(':enter', animateChild(), {optional: true})
    ])
  ])
]);
