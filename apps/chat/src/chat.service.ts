import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './interfaces/messgae.interface';
import { JoinRoomDto } from './dto/join-room.dto';
import { Room } from './interfaces/room.interface';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Room') private readonly roomModel: Model<Room>) {}

  async createRoom(roomId: string, userIds: string[]): Promise<void> {
    const room = await this.roomModel.findOne({ _id: roomId });
    if (room) {
      return;
    }
    const newRoom = new this.roomModel({ roomId, users: userIds });
    await newRoom.save();
  }

  async saveMessage(message: Message): Promise<boolean> {
    const room = await this.roomModel.findOne({ _id: message.roomId });
    if (!room) {
      return false;
    }
    room.message.push(message);
    await room.save();
    return true;
  }

  async joinRoom(data: JoinRoomDto): Promise<void> {
    const room = await this.roomModel.findOne({ _id: data.roomId });
    if (!room) {
      return;
    }
    if (!room.users.includes(data.userId)) {
      room.users.push(data.userId);
    }
    await room.save();
  }
}
