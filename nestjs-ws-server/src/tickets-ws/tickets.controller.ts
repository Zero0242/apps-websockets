import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get('ultimos')
  traerUltimos() {
    return this.ticketService.ultimos13;
  }
}
