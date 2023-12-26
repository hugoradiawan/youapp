import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  users: [String],
  message: [
    {
      text: String,
      roomId: String,
      user: {
        id: String,
        profileImage: String,
        firstName: String,
        customProperties: [],
      },
    },
  ],
});
