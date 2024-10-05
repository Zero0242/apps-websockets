import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto';
import { AuthResponse, JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  revalidate(user: User): AuthResponse {
    const token = this.signToken({ id: user.id });
    return { user: user.sanitize(), token };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const { password, ...values } = createUserDto;
    const hashed: string = bcrypt.hashSync(password, 10);
    const user = await this.userService.createUser({
      password: hashed,
      ...values,
    });
    const token = this.signToken({ id: user.id });
    return { user: user.sanitize(), token };
  }

  async loginUser({ email, password }: LoginUserDto): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException();
    const comparation = bcrypt.compareSync(password, user.password);
    if (!comparation) throw new UnauthorizedException();
    const token = this.signToken({ id: user.id });
    return { user: user.sanitize(), token };
  }

  private signToken(payload: JWTPayload): string {
    return this.jwtService.sign(payload);
  }
}
