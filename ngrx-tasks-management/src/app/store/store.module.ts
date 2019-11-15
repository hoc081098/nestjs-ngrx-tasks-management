import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducerMap, MetaReducer, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { AuthState, reducer as authReducer } from './auth';

interface AppState {
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
    })
  ]
})
export class StoreModule {
}
