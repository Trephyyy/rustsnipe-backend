import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async findOrCreateUser(userData: User) {
    const { steamId, username, avatar } = userData;
    const isUser = this.userRepository.findOneBy({ steamId: steamId });
    const payload = { steamId: steamId };

    if (isUser) {
      const payload = { steamId: steamId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    const data = this.userRepository.create({
      steamId,
      username,
      avatar,
    });
    const user = await this.userRepository.save(data);
    return user;
  }
  async findUser(id: number) {
    const isUser = this.userRepository.findOneBy({ steamId: id });
    if (!isUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const { data } = await this.httpService.axiosRef.get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=D153A08ABBD226B1D4E47BA3F1C77608&steamids=${id}`,
    );
    const playerdata = data.response.players[0];
    const username = playerdata.personaname;
    const avatarfull = playerdata.avatarfull;
    return { username, avatarfull };
  }
}
