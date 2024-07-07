import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { LogosComponent } from './logos/logos.component';
import { ProjectsComponent } from './projects/projects.component';

import { ComponentsModule } from '../../components/components.module';

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
    ComponentsModule,
  ],
  exports: [
    FooterComponent,
    LogosComponent,
    ProjectsComponent,
    ComponentsModule,
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
