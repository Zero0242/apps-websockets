import { Module } from '@nestjs/common';
import { BandsWsService } from './bands-ws.service';
import { BandsWsGateway } from './bands-ws.gateway';

@Module({
  providers: [BandsWsGateway, BandsWsService],
})
export class BandsWsModule {}
