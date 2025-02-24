import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
        email: user.email,
      };
    }

    return null;
  }
}
