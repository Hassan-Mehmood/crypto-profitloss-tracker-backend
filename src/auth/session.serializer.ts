import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    console.log('User', user);
    done(null, user);
  }
  deserializeUser(
    payload: any,
    done: (err: Error | null, payload: string) => void,
  ): any {
    console.log('Payload', payload);
    done(null, payload);
  }
}
