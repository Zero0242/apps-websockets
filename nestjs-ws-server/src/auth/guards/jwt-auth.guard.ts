import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * Para tener el authguard en modo JWT
 */
export class JWTAuthGuard extends AuthGuard('jwt') {}
