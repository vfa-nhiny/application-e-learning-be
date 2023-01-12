import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const ScoreSchema = new mongoose.Schema(
  {
    lessonId: String,
    userId: String,
    score: Number,
  },
  {
    timestamps: true,
  },
);
