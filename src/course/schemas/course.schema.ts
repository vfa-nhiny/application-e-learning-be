import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const CourseSchema = new mongoose.Schema({
  course_id: String,
  title: String,
  description: String,
  rates_point: Number,
  rates_number: Number,
  image: String,
  category: [],
  price: Number,
  sale: Number,
  author_id: String,
});
