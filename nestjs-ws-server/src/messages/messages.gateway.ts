import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JWTPayload } from 'src/auth/types';
import { CreateMessageDto } from './dto';
import { MessagesService } from './messages.service';

@WebSocketGateway({ namespace: 'chat' })
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly server: Server;
  private readonly logger = new Logger('MessagesGateway');

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    // Desconectar si no existe el token ni el jwtpayload
    const token = client.handshake.auth['ws-token'];
    if (!token) {
      return client.disconnect();
    }
    const jwtPayload = this.jwtService.decode<JWTPayload>(token);
    if (!jwtPayload) {
      return client.disconnect();
    }
    const uid = jwtPayload.id;
    const usuario = await this.messagesService.connectUser(uid);
    this.logger.log(`Usuario: ${usuario.name}`);
    client.join(usuario.id);

    this.server.emit(
      'chat:usuarios',
      await this.messagesService.getConnectedUsers(),
    );

    client.on('disconnect', async () => {
      await this.messagesService.disconnectUser(uid);
      this.server.emit(
        'chat:usuarios',
        await this.messagesService.getConnectedUsers(),
      );
    });
  }

  @SubscribeMessage('chat:mensaje-personal')
  async onMessageSent(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const mensaje = await this.messagesService.createMessage(createMessageDto);
    console.log({ createMessageDto, mensaje });

    this.server
      .to(createMessageDto.to)
      .to(createMessageDto.from)
      .emit('chat:mensaje-personal', {
        id: mensaje.id,
        senderId: createMessageDto.from,
        recipientId: createMessageDto.to,
        message: createMessageDto.message,
        ...mensaje,
      });
  }
}
