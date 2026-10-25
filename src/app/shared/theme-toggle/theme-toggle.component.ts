import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ThemeToggleComponent {
  constructor(private readonly theme: ThemeService) {}

  onClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      const rect = target.getBoundingClientRect();
      const fromPointer = event.clientX !== 0 || event.clientY !== 0;
      if (!fromPointer) {
        event = new MouseEvent('click', {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          bubbles: true,
        });
      }
    }
    this.theme.toggleTheme(event);
  }

  get ariaLabel(): string {
    return this.theme.resolvedTheme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';
  }
}
