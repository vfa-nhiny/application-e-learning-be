import { Document } from "mongoose";
import { LessonDto } from "../dto/lesson.dto";

export interface Section extends Document {
  sectionId: string;
  courseId: string;
  title: string;
  order: number;
  lessons: LessonDto[];
}
