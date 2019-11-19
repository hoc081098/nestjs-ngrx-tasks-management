import {Actions, ActionTypes} from './auth.actions';
import {User} from '../../model/user';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: any;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const reducer = (state: AuthState = initialState, action: Actions): AuthState => {
  switch (action.type) {
    case ActionTypes.LISTEN_AUTH_STATE:
      return state;
    case ActionTypes.AUTH_STATE_CHANGED:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.REGISTER_USER:
      return state;
    case ActionTypes.LOGIN_USER:
      return state;
    case ActionTypes.LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        user: null,
      };
    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      return state;
    case ActionTypes.LOGOUT_ERROR:
      return state;
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: null
      };
    case ActionTypes.CHECK_AUTH:
      return state;
    case ActionTypes.CHECK_AUTH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isLoading: false,
      };
    case ActionTypes.CHECK_AUTH_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
