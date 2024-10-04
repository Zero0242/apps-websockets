import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get('ultimos')
  traerUltimos() {
    return this.ticketService.ultimos13;
  }
}
