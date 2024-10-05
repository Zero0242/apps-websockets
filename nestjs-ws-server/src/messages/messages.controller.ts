import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JWTAuthGuard } from 'src/auth/guards';
import { MessagesService } from './messages.service';

@UseGuards(JWTAuthGuard)
@Controller('mensajes')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Get(':from')
  obtenerMensajes(
    @Param('from', ParseUUIDPipe) fromId: string,
    @GetUser('id') id: string,
  ) {
    return this.messageService.getMessages(id, fromId);
  }
}
