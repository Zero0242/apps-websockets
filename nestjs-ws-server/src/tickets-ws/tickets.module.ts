import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsGateway } from './tickets.gateway';

@Module({
  providers: [TicketsGateway, TicketsService],
})
export class TicketsModule {}
