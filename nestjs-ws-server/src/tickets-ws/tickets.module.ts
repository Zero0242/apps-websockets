import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsGateway } from './tickets.gateway';
import { TicketsService } from './tickets.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsGateway, TicketsService],
})
export class TicketsModule {}
