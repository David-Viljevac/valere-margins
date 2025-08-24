import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';


@Module({
  imports: [
    // UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' }, // Token expires in 24 hours
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, UsersRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}