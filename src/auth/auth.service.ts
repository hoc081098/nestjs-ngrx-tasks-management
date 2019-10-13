import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }
}
