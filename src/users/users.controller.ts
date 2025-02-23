import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { SignupUserDto, signupUserSchema } from './schemas/signupUserSchema';

@Controller('users')
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupUserSchema))
  async signUp(@Body() body: SignupUserDto) {
    const response = await this.userService.signUp(
      body.email,
      body.username,
      body.password,
    );

    return response;
  }
}
