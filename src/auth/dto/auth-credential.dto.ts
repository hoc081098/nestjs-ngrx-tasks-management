import { MinLength } from 'class-validator';

export class AuthCredentialDto {
  @MinLength(3)
  username: string;

  @MinLength(6)
  password: string;
}
