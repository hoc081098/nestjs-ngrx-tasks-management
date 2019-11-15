import { Action } from '@ngrx/store';
import { ActionTypes } from './auth.actions';
import { User } from '../../model/user';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export const reducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
    case ActionTypes.LOGIN_USER:
    case ActionTypes.LOGOUT:
    default:
      return state;
  }
};
