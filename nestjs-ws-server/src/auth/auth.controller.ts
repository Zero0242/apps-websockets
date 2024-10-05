import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './decorators';
import { LoginUserDto } from './dto';
import { JWTAuthGuard } from './guards';
import { AuthResponse } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  @Get()
  revalidateToken(@GetUser() user: User): AuthResponse {
    return this.authService.revalidate(user);
  }

  @Post('register')
  registerAccount(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    return this.authService.loginUser(loginUserDto);
  }
}
