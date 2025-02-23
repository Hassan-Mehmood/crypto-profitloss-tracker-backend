import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/users/schemas/signinUserSchema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() body: SigninUserDto) {
    const response = await this.authService.signin(body);

    return response;
  }
}
