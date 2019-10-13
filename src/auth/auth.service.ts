import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<void> {
    const result = await this.userRepository.validateUser(authCredentialDto);
    if (result === 'NOT_EXISTS') {
      throw new UnauthorizedException('Not found user');
    }
    if (result === 'WRONG_PASSWORD') {
      throw new UnauthorizedException('Incorrect password');
    }
  }
}
