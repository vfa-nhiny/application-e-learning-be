import * as mongoose from "mongoose";
import { LessonDto } from "../dto/lesson.dto";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const SectionSchema = new mongoose.Schema(
  {
    sectionId: String,
    courseId: String,
    title: String,
    order: Number,
    lessons: { type: Array<LessonDto>, default: [] },
  },
  {
    timestamps: true,
  },
);
