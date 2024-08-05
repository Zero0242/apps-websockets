import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BandsWsModule } from './bands-ws/bands-ws.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BandsWsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
