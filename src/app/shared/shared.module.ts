import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { LogosComponent } from './logos/logos.component';
import { ProjectsComponent } from './projects/projects.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

export const providers = [
    // ... your shared services here
];

@NgModule({
  declarations: [
    FooterComponent,
    LogosComponent,
    ProjectsComponent,
    ThemeToggleComponent,
    TestimonialsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    FooterComponent,
    LogosComponent,
    ProjectsComponent,
    ThemeToggleComponent,
    TestimonialsComponent,
  ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [...providers],
        };
    }
}
