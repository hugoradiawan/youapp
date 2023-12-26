import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Room } from './interfaces/room.interface';
import { Message } from './interfaces/messgae.interface';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createRoom')
  async handleCreateRoom(
    @MessageBody() data: Room & { roomId: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    console.log(data);
    // await this.chatService.createRoom(data.roomId, data.users);
    client.join(data.roomId);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(data);
    client.join(data.roomId);
    // this.chatService.joinRoom(data);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: Message): void {
    console.log(data);
    this.server.to(data.roomId).emit('message', data);
    // this.chatService.saveMessage(data);
  }
}
