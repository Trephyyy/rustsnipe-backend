import { Get, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(private dataSource: DataSource, private jwtService: JwtService) {}

  getUserJwt(id) {
    const payload = { id };
    return this.jwtService.signAsync(payload);
  }
}
