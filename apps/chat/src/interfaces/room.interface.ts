import { Message } from './messgae.interface';

export interface Room {
  users: string[];
  message: Message[];
}

export interface ProfileDocument extends Document, Room {}
