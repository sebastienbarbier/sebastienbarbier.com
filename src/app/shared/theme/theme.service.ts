import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  get resolvedTheme(): ThemeMode {
    return this.document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  }

  applyTheme(mode: ThemeMode): void {
    const html = this.document.documentElement;
    const isDark = mode === 'dark';
    html.classList.toggle('dark', isDark);
    html.style.colorScheme = isDark ? 'dark' : 'light';

    const themeColor = this.document.querySelector(
      'meta[name="theme-color"]',
    ) as HTMLMetaElement | null;
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#121110' : '#f8f5f2');
    }

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        /* ignore */
      }
    }
  }

  toggleTheme(event?: MouseEvent): void {
    const next: ThemeMode = this.resolvedTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next, event);
  }

  setTheme(mode: ThemeMode, event?: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.applyTheme(mode);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const startViewTransition = (
      this.document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;

    const apply = () => this.applyTheme(mode);

    if (!startViewTransition || prefersReducedMotion) {
      apply();
      return;
    }

    if (event) {
      this.document.documentElement.style.setProperty(
        '--x',
        `${event.clientX}px`,
      );
      this.document.documentElement.style.setProperty(
        '--y',
        `${event.clientY}px`,
      );
    }

    startViewTransition.call(this.document, apply);
  }
}
