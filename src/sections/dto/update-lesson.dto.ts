import { IsNotEmpty } from "class-validator";
import { LessonDto } from "./lesson.dto";

export class UpdateLessonDto {
  @IsNotEmpty()
  lessonId: string;

  sectionId: string;
  order: number;
  date: Date;
  url: string;
  title: string;
}
