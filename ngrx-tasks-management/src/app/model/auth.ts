export interface AuthDto {
  username: string;
  password: string;
}

export type AuthType = 'sign_in' | 'sign_up';
