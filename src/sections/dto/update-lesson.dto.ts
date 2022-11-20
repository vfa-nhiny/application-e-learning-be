import { IsNotEmpty } from "class-validator";
import { LessonDto } from "./lesson.dto";

export class UpdateLessonDto {
  @IsNotEmpty()
  lesson_id: string;
  section_id: string;
  url: string;
  title: string;
}
