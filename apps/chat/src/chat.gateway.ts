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
    const room = await this.chatService.createRoom(data.users);
    console.log(room);
    client.join(room._id.toString());
    const messages = await this.chatService.getMessage(room._id.toString());
    this.server.to(room._id.toString()).emit('getMessages', messages);
    this.server.to(room._id.toString()).emit('getRoomId', room._id.toString());
  }

  @SubscribeMessage('sentMessage')
  handleMessage(@MessageBody() data: Message): void {
    this.server.to(data.roomId).emit('onMessage', data);
    this.chatService.saveMessage(data);
  }

  @SubscribeMessage('quitRoom')
  async handleQuitRoom(
    @MessageBody() data: { userId: string; roomId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(data);
    const list = await this.chatService.getList(data.userId);
    client.send(list);
    client.leave(data.roomId);
  }

  @SubscribeMessage('requestList')
  async addChatList(
    @MessageBody() data: { userId: string; roomId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const list = await this.chatService.getList(data.userId);
    client.send(list);
  }
}
