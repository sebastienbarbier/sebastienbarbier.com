import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TESTIMONIALS } from './testimonials.data';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TestimonialsComponent {
  readonly testimonials = TESTIMONIALS;
}
