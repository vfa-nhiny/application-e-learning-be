import { Document } from "mongoose";

export interface Comment extends Document {
  lessonId: string;
  comment: [
    {
      commentId: string;
      userId: string;
      clientId: string;
      image: string;
      content: string;
      createdAt: Date;
    },
  ];
}
