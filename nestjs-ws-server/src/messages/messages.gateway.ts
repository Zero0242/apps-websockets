import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({ namespace: 'chat' })
export class MessagesGateway {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer() server: Server;
}
