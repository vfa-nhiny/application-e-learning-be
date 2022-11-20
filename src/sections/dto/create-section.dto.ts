import { LessonDto } from "./lesson.dto";

export class CreateSectionDto {
  section_id: string;
  course_id: string;
  title: string;
  lessons: LessonDto[];
}
