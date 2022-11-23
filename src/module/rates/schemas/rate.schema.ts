import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const RateSchema = new mongoose.Schema(
  {
    rateId: String,
    userId: String,
    courseId: String,
    teacherId: String,
    score: Number,
    comment: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);
