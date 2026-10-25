import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideRouter } from '@angular/router';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { serverRouterFeatures } from './app-router.config';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [provideRouter(appRoutes, ...serverRouterFeatures)],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
