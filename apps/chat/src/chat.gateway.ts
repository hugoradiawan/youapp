import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from './interfaces/messgae.interface';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('openRoom')
  async handleCreateRoom(
    @MessageBody() data: { users: string[] },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(data);
    const room = await this.chatService.createRoom(data.users);
    console.log(room);
    client.join(room._id.toString());
    const messages = await this.chatService.getMessage(room._id.toString());
    this.server.to(room._id.toString()).emit('getMessages', messages);
    this.server.to(room._id.toString()).emit('getRoomId', room._id.toString());
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: Message): void {
    console.log(data);
    this.server.to(data.roomId).emit('message', data);
    // this.chatService.saveMessage(data);
  }
}
