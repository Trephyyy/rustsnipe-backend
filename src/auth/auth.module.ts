import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SteamStrategy } from './steam.strategy';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { JWTSecret } from 'src/utils/consts';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
    JwtModule.register({
      secret: JWTSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SteamStrategy, UsersService, JwtStrategy],
})
export class AuthModule {}
