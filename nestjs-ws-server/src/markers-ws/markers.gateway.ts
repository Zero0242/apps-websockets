import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMarkerDto, UpdateMarkerDto } from './dto';
import { MarkersService } from './markers.service';

@WebSocketGateway({ namespace: 'markers', cors: '*' })
export class MarkersGateway implements OnGatewayConnection {
  constructor(private readonly markersService: MarkersService) {}
  @WebSocketServer()
  server: Server;

  handleConnection() {
    this.server.emit('marker:get', this.markersService.findAll());
  }

  @SubscribeMessage('marker:create')
  createMarker(
    @MessageBody() createDto: CreateMarkerDto,
    @ConnectedSocket() client: Socket,
  ) {
    const marker = this.markersService.create(createDto);
    client.broadcast.emit('marker:create', marker);
  }

  @SubscribeMessage('marker:update')
  updateMarker(
    @MessageBody() marker: UpdateMarkerDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.markersService.update(marker);
    client.broadcast.emit('marker:update', marker);
  }
}
