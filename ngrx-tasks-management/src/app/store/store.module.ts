import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, MetaReducer, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { AuthEffects, AuthState, reducer as authReducer } from './auth';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';

export interface AppState {
  auth: AuthState;
}

const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
const metaReducers: MetaReducer<AppState>[] = [];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgRxStoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ]
})
export class StoreModule {
}
