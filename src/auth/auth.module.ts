import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategies';
import { UsersService } from 'src/users/users.service';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    UsersService,
    SessionSerializer,
  ],
})
export class AuthModule {}
