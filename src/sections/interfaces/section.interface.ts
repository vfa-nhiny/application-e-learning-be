import { Document } from "mongoose";
import { LessonDto } from "../dto/lesson.dto";

export interface Section extends Document {
  section_id: string;
  course_id: string;
  title: string;
  lessons: LessonDto[];
}
