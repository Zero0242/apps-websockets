import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { BandsWsModule } from './bands-ws/bands-ws.module';
import { envs } from './config';
import { MarkersModule } from './markers-ws/markers.module';
import { MessagesModule } from './messages/messages.module';
import { TicketsModule } from './tickets-ws/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: envs.DATABASE_URL,
      // * Tablas
      entities: [__dirname + '**/*.entity{.ts,.js}'],
      // * Solo en modo dev
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BandsWsModule,
    MarkersModule,
    TicketsModule,
    MessagesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
