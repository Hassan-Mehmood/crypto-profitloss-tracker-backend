import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { SignupUserDto, signupUserSchema } from './schemas/signupUserSchema';
import { SigninUserDto, signinUserSchema } from './schemas/signinUserSchema';

@Controller('users')
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupUserSchema))
  async signUp(@Body() body: SignupUserDto) {
    const response = await this.userService.signUp(body);

    return response;
  }

  @Post('/signin')
  @UsePipes(new ZodValidationPipe(signinUserSchema))
  async signIn(@Body() body: SigninUserDto) {
    const response = await this.userService.signin(body);

    return response;
  }
}
