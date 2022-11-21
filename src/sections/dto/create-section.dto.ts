import { LessonDto } from "./lesson.dto";

export class CreateSectionDto {
  sectionId: string;
  courseId: string;
  title: string;
  order: number;
  lessons: LessonDto[];
}
