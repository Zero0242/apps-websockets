import { User } from 'src/users/entities/user.entity';

export interface AuthResponse {
  user: Omit<User, 'password' | 'sanitize'>;
  token: string;
}
