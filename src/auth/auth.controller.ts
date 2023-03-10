import { Controller, Get, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { frontEndUrl } from 'src/utils/consts';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SteamStrategy } from './steam.strategy';
import { Profile } from 'passport-steam';
import { JwtService } from '@nestjs/jwt';

interface SteamUser extends Profile {
  steamid: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('steam'))
  steamLogin() {}
  @Get('jwt')
  async steamReturn(@Req() req: Request) {
    console.log(req.user);
    const payload = await this.authService.getUserJwt(req.user);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @Get('return')
  @UseGuards(AuthGuard('steam'))
  //@Redirect(frontEndUrl)
  steamR() {}
}
