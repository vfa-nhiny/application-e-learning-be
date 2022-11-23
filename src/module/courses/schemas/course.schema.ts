import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const CourseSchema = new mongoose.Schema(
  {
    courseId: String,
    title: String,
    description: String,
    ratingScore: Number,
    ratingNumber: Number,
    image: String,
    category: [],
    price: Number,
    sale: Number,
    authorId: String,
  },
  {
    timestamps: true,
  },
);
