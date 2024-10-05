import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from 'src/config';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { JWTPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.JWT_SECRET,
    });
  }

  async validate({ id }: JWTPayload): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) throw new UnauthorizedException(`Usuario no autorizado`);
    return user;
  }
}
