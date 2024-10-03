import { Module } from '@nestjs/common';
import { MarkersService } from './markers.service';
import { MarkersGateway } from './markers.gateway';

@Module({
  providers: [MarkersGateway, MarkersService],
})
export class MarkersModule {}
