export interface AuthDto {
  username: string;
  password: string;
}

export type AuthType = 'login' | 'register';
