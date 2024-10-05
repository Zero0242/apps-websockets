import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

type DecoratorArgs = keyof User | undefined;

export const GetUser = createParamDecorator(
  (key: DecoratorArgs, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User | undefined;
    if (!user) throw new UnauthorizedException('Usuario no autenticado');
    return !key ? user : user[key];
  },
);
