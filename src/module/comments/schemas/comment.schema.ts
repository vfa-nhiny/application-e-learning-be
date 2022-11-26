import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const CommentSchema = new mongoose.Schema(
  {
    lessonId: { type: String, default: null },
    comment: [
      {
        commentId: { type: String, default: null },
        userId: { type: String, default: null },
        clientId: { type: String, default: null },
        image: { type: String, default: null },
        content: { type: String, default: null },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  },
);
