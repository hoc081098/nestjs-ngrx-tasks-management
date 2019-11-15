import { Action } from '@ngrx/store';
import { AuthDto } from '../../model/auth';

export enum ActionTypes {
  LOGIN_USER = '[Auth] LOGIN_USER',
  REGISTER_USER = '[Auth] REGISTER_USER',
  LOGOUT = '[Auth] LOGOUT',
}

export class LoginUser implements Action {
  public readonly type = ActionTypes.LOGIN_USER;

  constructor(public payload: AuthDto) {}
}

export class RegisterUser implements Action {
  public readonly type = ActionTypes.REGISTER_USER;

  constructor(public payload: AuthDto) {}
}

export class Logout implements Action {
  public readonly type = ActionTypes.REGISTER_USER;
}

export type Actions = LoginUser | RegisterUser | Logout;
