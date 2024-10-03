import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BandsWsService } from './bands-ws.service';
import { UpdateBandsDTO } from './dto';

@WebSocketGateway({ namespace: 'bands' })
export class BandsWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private readonly logger = new Logger('BandsWebSocket');

  constructor(private readonly bandsWsService: BandsWsService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Se ha conectado ${client.id}`);
    this.wss.emit('current-bands', this.bandsWsService.findAll());
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Se ha desconectado ${client.id}`);
  }

  @SubscribeMessage('add-band')
  crearBanda(@MessageBody() nombre: string) {
    this.bandsWsService.create(nombre);
    this.wss.emit('current-bands', this.bandsWsService.findAll());
  }

  @SubscribeMessage('update-band')
  actualizar(@MessageBody() updateDto: UpdateBandsDTO) {
    this.bandsWsService.changeBandName(updateDto);
    this.wss.emit('current-bands', this.bandsWsService.findAll());
  }

  @SubscribeMessage('vote-band')
  votarBanda(@MessageBody() id: string) {
    this.bandsWsService.increaseVotes(id);
    this.wss.emit('current-bands', this.bandsWsService.findAll());
  }

  @SubscribeMessage('delete-band')
  eliminarBanda(@MessageBody() id: string) {
    this.bandsWsService.remove(id);
    this.wss.emit('current-bands', this.bandsWsService.findAll());
  }
}
