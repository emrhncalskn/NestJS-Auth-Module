import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt-strategy';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register(
      {
        secret: 'secret', // secret key for JWT
      }),
    PassportModule
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  controllers: [AuthController]
})
export class AuthModule { }
