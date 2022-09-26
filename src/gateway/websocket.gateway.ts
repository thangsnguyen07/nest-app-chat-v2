import { OnEvent } from '@nestjs/event-emitter';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MessagingGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('handleConnected');
  }

  handleDisconnect() {
    console.log('handleDisconnect');
  }

  @SubscribeMessage('createMessage')
  handleCreateMessage(@MessageBody() data: any) {
    console.log('Created message');
  }

  @OnEvent('message.create')
  handleMessageCreateEvent(payload: any) {
    console.log('NestJS: ', payload);
    this.server.emit('onMessage', payload);
  }
}
