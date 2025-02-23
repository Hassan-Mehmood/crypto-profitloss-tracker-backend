import {
  ConflictException,
  UnauthorizedException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { SignupUserDto } from './schemas/signupUserSchema';
import { SigninUserDto } from './schemas/signinUserSchema';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async signUp({ username, email, password }: SignupUserDto) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2002: Unique constraint failed
        // Throwing error if user already exists
        if (error.code === 'P2002') {
          throw new ConflictException('User already exists');
        }
      }

      console.error('Error during signup:', error);
      throw new InternalServerErrorException('Failed to create user account');
    }
  }

  async signin({ username, password }: SigninUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Username does not exists');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Username or password is incorrect');
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('Error during signin:', error);
      throw new InternalServerErrorException('Failed to sign in');
    }
  }
}
