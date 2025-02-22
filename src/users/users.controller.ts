import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() body: { email: string; username: string; password: string },
  ) {
    const response = await this.userService.signUp(
      body.email,
      body.username,
      body.password,
    );

    return response;
  }
}
