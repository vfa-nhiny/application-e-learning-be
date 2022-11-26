import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const PaymentSchema = new mongoose.Schema(
  {
    rateId: { type: String, default: null },
    userId: { type: String, default: null },
    courseId: { type: String, default: null },
    teacherId: { type: String, default: null },
    score: { type: Number, default: null },
    comment: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
