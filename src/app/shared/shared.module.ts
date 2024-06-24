import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { LogosComponent } from './logos/logos.component';
import { ProjectsComponent } from './projects/projects.component';

export const providers = [
    // ... your shared services here
];

@NgModule({
  declarations: [
    FooterComponent,
    LogosComponent,
    ProjectsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    FooterComponent,
    LogosComponent,
    ProjectsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [...providers],
        };
    }
}
