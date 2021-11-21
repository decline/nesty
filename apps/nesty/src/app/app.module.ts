import { AuthDataAccessModule } from '@angular-nest/auth/data-access';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule, authRootPath } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

    AppRoutingModule,
    AuthDataAccessModule.forRoot(authRootPath),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
