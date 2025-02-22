import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async signUp(username: string, email: string, password: string) {
    return { username, email, password };
  }
}
