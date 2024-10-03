import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMarkerDto, UpdateMarkerDto } from './dto';
import { MarkersService } from './markers.service';

@WebSocketGateway({ namespace: 'markers' })
export class MarkersGateway implements OnModuleInit {
  constructor(private readonly markersService: MarkersService) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
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

  @SubscribeMessage('marker:move')
  updateMarker(
    @MessageBody() updateDto: UpdateMarkerDto,
    @ConnectedSocket() client: Socket,
  ) {
    this.markersService.update(updateDto);
    client.broadcast.emit('marker:move', updateDto);
  }
}
