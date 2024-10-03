import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BandsWsModule } from './bands-ws/bands-ws.module';
import { MarkersModule } from './markers-ws/markers.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    BandsWsModule,
    MarkersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
