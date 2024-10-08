import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NextTicketDto } from './dto';
import { TicketsService } from './tickets.service';

@WebSocketGateway({ namespace: 'tickets', cors: '*' })
export class TicketsGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly wss: Server;
  private readonly logger = new Logger('TicketsWebSocket');

  constructor(private readonly ticketsService: TicketsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Se ha conectado ${client.id}`);
  }

  @SubscribeMessage('ticket:solicitar')
  getNextTicket() {
    const nuevoTicket = this.ticketsService.crearTicket();
    return nuevoTicket;
  }

  @SubscribeMessage('ticket:siguiente')
  getNewTicket(@MessageBody() payload: NextTicketDto) {
    const { agente, escritorio } = payload;
    const suTicket = this.ticketsService.asignarTicket(agente, +escritorio);
    // * Notificar usuario
    this.wss.emit('ticket:listado', this.ticketsService.ultimos13);

    return suTicket;
  }
}
