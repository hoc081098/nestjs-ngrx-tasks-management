import { AppState } from '../store.module';
import { createSelector } from '@ngrx/store';

export const selectAuth = (state: AppState) => state.auth;
export const selectAuthUser = createSelector(selectAuth, authState => authState.user);
export const selectAuthIsLoading = createSelector(selectAuth, authState => authState.isLoading);
export const selectAuthError = createSelector(selectAuth, authState => authState.error);


