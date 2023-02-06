import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';

export const providers = [
    // ... your shared services here
];

@NgModule({
  declarations: [
    FooterComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    FooterComponent,
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
