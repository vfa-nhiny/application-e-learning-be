import { IsNotEmpty } from "class-validator";
import { LessonDto } from "./lesson.dto";

export class UpdateSectionDto {
  @IsNotEmpty()
  sectionId: string;
  courseId: string;
  title: string;
  order: number;
  lessons: LessonDto[];
}
