import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const CommentSchema = new mongoose.Schema(
  {
    lessonId: String,
    comment: [
      {
        commentId: String,
        userId: String,
        clientId: String,
        image: { type: String, default: "" },
        content: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  },
);
