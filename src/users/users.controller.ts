import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '../pipes/zodValidationPipe';
import { SignupUserDto, signupUserSchema } from './dto/signupUserDto';
import { LocalAuthGuard } from 'src/auth/gaurds/local.auth.gaurd';
import { AuthenticatedGuard } from 'src/auth/gaurds/authenticated.gaurd';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupUserSchema))
  async signUp(@Body() body: SignupUserDto) {
    const response = await this.userService.signUp(body);
    console.log('Signup response', response);
    return response;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  // @UsePipes(new ZodValidationPipe(signinUserSchema))
  signIn(@Request() req) {
    const response = this.userService.signin(req);

    return response;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Get('/logout')
  logout(@Request() req) {
    req.session.destroy();

    return {
      msg: 'User logged out',
    };
  }
}
