import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { SteamUserParams } from 'src/utils/types';
import { steamAPIKey } from 'src/utils/consts';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      returnURL: 'http://localhost:3001/auth/return',
      realm: 'http://localhost:3001/',
      apiKey: steamAPIKey,
    });
  }

  async validate(identifier: string, profile: any, done: Function) {
    const profileJSON = profile._json;

    const userData = {
      steamId: profileJSON.steamid,
      username: profileJSON.personaname,
      avatar: profileJSON.avatarhash,
    };
    const id = profileJSON.steamid;
    const user = await this.usersService.findOrCreateUser(userData);
    const jwt = await this.authService.getUserJwt(userData.steamId);

    done(null, id);
  }

  verified() {}
}
