import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign_up')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/sign_in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }
}
