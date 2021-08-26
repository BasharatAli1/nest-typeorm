import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Promise<{ token: string }> {
    return this.authService.login(user).then((jwt: string) => ({ token: jwt }));
  }

  // @Post('login')
  // login(@Body() user: User): Promise<{ token: string }> {
  //   return this.authService.login(user).then((jwt: string) => ({ token: jwt }))
  // }
}
