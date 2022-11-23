import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const HistorySchema = new mongoose.Schema(
  {
    historyId: String,
    userId: String,
    recentCourseId: Array<string>,
    recentCommentId: Array<string>,
    recentRateId: Array<string>,
  },
  {
    timestamps: true,
  },
);
