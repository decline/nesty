import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { INITIAL_OPTIONS, StoreDevtoolsModule, StoreDevtoolsOptions } from '@ngrx/store-devtools';
import { CustomRouteSerializer } from './ngrx/custom-route-serializer';
import { StorageService } from './storage/storage.service';

interface Config {
  storage: Type<StorageService>;
  storeDevtoolsOptions: StoreDevtoolsOptions;
}

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({ router: routerReducer }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomRouteSerializer }),
    StoreDevtoolsModule.instrument(),
  ],
})
export class SharedDataAccessModule {
  static forRoot(config: Config): ModuleWithProviders<SharedDataAccessModule> {
    return {
      ngModule: SharedDataAccessModule,
      providers: [
        {
          provide: INITIAL_OPTIONS,
          useValue: config.storeDevtoolsOptions,
        },
        {
          provide: StorageService,
          useClass: config.storage,
        },
      ],
    };
  }
}
