import { ObjectId } from 'mongoose';
import { Message } from './messgae.interface';

export interface Room {
  _id: ObjectId;
  users: string[];
  message: Message[];
}

export interface RoomDocument extends Document, Room {}
