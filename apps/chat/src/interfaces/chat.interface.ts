export interface Chat {
  name: string;
  profileId: string;
  roomId: string;
  lastMesage: string;
}

export interface ChatDocument extends Document, Chat {}
