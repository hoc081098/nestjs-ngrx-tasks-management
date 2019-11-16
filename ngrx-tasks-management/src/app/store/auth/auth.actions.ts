import { Action } from '@ngrx/store';
import { AuthDto } from '../../model/auth';
import { User } from '../../model/user';

export enum ActionTypes {
  LOGIN_USER = '[Auth] LOGIN_USER',

  REGISTER_USER = '[Auth] REGISTER_USER',

  LOGOUT = '[Auth] LOGOUT',

  CHECK_AUTH = '[Auth] CHECK_AUTH',
  CHECK_AUTH_START = '[Auth] CHECK_AUTH_START',
  CHECK_AUTH_SUCCESS = '[Auth] CHECK_AUTH_SUCCESS',
  CHECK_AUTH_ERROR = '[Auth] CHECK_AUTH_ERROR',
}

export class LoginUser implements Action {
  readonly type = ActionTypes.LOGIN_USER;

  constructor(public readonly payload: AuthDto) {}
}

export class RegisterUser implements Action {
  readonly type = ActionTypes.REGISTER_USER;

  constructor(public readonly payload: AuthDto) {}
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class CheckAuth implements Action {
  readonly type = ActionTypes.CHECK_AUTH;
}

export class CheckAuthStart implements Action {
  readonly type = ActionTypes.CHECK_AUTH_START;
}

export class CheckAuthSuccess implements Action {
  readonly type = ActionTypes.CHECK_AUTH_SUCCESS;

  constructor(public readonly payload: User | null) {}
}

export class CheckAuthError implements Action {
  readonly type = ActionTypes.CHECK_AUTH_ERROR;

  constructor(public readonly payload: any) {}
}

export type Actions =
  LoginUser
  | RegisterUser
  | Logout
  | CheckAuth
  | CheckAuthStart
  | CheckAuthSuccess
  | CheckAuthError;
