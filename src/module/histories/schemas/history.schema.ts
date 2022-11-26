import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const HistorySchema = new mongoose.Schema(
  {
    historyId: { type: String, default: null },
    userId: { type: String, default: null },
    recentCourseId: { type: String, default: null },
    recentCommentId: { type: String, default: null },
    recentRateId: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
