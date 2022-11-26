import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const CourseSchema = new mongoose.Schema(
  {
    courseId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    ratingScore: { type: Number, default: null },
    ratingNumber: { type: Number, default: null },
    image: { type: String, default: null },
    category: { type: [], default: null },
    price: { type: Number, default: null },
    sale: { type: Number, default: null },
    authorId: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
