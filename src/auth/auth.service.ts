import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
      private readonly userRepository: UserRepository,
      private readonly jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
    const result = await this.userRepository.validateUser(authCredentialDto);
    if (result === 'NOT_EXISTS') {
      throw new UnauthorizedException('Not found user');
    }
    if (result === 'WRONG_PASSWORD') {
      throw new UnauthorizedException('Incorrect password');
    }

    const username = result.username;
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
