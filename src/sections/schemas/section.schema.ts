import * as mongoose from "mongoose";
import { LessonDto } from "../dto/lesson.dto";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const SectionSchema = new mongoose.Schema({
  section_id: String,
  course_id: String,
  title: String,
  lessons: { type: Array<LessonDto>(), default: [] },
});
