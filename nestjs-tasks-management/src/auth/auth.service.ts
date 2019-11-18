import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string; username: string }> {
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

    this.logger.debug(`Generate JWT token with payload=${JSON.stringify(payload)}`);
    return { accessToken, username };
  }
}
