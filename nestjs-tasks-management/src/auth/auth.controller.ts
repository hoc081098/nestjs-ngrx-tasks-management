import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {AuthCredentialDto} from './dto/auth-credential.dto';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {GetUser} from './get-user.decorator';
import {User} from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/sign_up')
  signUp(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/sign_in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  test(@GetUser() user: User) {
    return {username: user.username};
  }
}
