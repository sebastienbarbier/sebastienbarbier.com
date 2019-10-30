import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


export const providers = [
    // ... your shared services here
];

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
  ]
})
export class SharedModule {
    static forRoot() : ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [...providers],
        };
    }
}
