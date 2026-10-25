import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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
  /** When true, show the French original for bilingual entries (default is English). */
  private readonly showFrenchById = new Set<string>();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  isFrench(id: string): boolean {
    return this.showFrenchById.has(id);
  }

  toggleLocale(id: string): void {
    if (this.showFrenchById.has(id)) {
      this.showFrenchById.delete(id);
    } else {
      this.showFrenchById.add(id);
    }
    this.cdr.markForCheck();
  }

  toggleLabel(id: string): string {
    return this.isFrench(id) ? 'Show English' : 'Show original in French';
  }

  quoteText(item: (typeof TESTIMONIALS)[number]): string {
    if (item.quoteFr && item.quoteEn) {
      return this.isFrench(item.id) ? item.quoteFr : item.quoteEn;
    }
    return item.quote ?? item.quoteEn ?? item.quoteFr ?? '';
  }

  quoteLang(item: (typeof TESTIMONIALS)[number]): string {
    if (item.quoteFr && item.quoteEn) {
      return this.isFrench(item.id) ? 'fr' : 'en';
    }
    return 'en';
  }
}
