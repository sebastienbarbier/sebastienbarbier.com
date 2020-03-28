import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';


export const providers = [
    // ... your shared services here
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavigationComponent,
  ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...providers],
        };
    }
}
