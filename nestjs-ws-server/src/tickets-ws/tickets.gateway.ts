import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TicketsService } from './tickets.service';

@WebSocketGateway({ namespace: 'colas' })
export class TicketsGateway {
  @WebSocketServer()
  private readonly wss: Server;

  constructor(private readonly ticketsService: TicketsService) {}

  @SubscribeMessage('ticket:siguiente')
  getNextTicket(@MessageBody() { payload, callback }: any) {
    const nuevoTicket = this.ticketsService.crearTicket();
    // ? Ejecutamos un callback del frontend
    callback(nuevoTicket);
  }

  @SubscribeMessage('ticket:solicitar')
  getNewTicket(@MessageBody() { payload, callback }: any) {
    const { agente, escritorio } = payload as {
      agente: string;
      escritorio: number;
    };
    const suTicket = this.ticketsService.asignarTicket(agente, +escritorio);
    // * Tomar el callback
    callback(suTicket);
    // * Notificar usuario
    this.wss.emit('ticket:listado', this.ticketsService.ultimos13);
  }
}
