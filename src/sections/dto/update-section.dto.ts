import { IsNotEmpty } from "class-validator";
import { LessonDto } from "./lesson.dto";

export class UpdateSectionDto {
  @IsNotEmpty()
  section_id: string;
  course_id: string;
  title: string;
  lessons: LessonDto[];
}
