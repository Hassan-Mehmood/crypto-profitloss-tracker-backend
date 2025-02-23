import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async signUp(username: string, email: string, password: string) {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const userExists = await this.findUser(email, username);

      console.log('User exists: ', userExists ? true : false);

      if (userExists) {
        throw new Error('User already exists');
      }

      const user = await this.prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });

      const { password, ...newUser } = user;

      console.log('Password: ', password);

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findUser(email: string, username: string) {
    console.log('Checking for existing user');
    return this.prisma.user.findUnique({
      where: {
        email: email,
        username: username,
      },
    });
  }
}
