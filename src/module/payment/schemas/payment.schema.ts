import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const PaymentSchema = new mongoose.Schema(
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
