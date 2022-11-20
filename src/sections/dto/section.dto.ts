import { LessonDto } from "./lesson.dto";

export class SectionDto {
  constructor(object: any) {
    this.section_id = object.section_id;
    this.course_id = object.course_id;
    this.title = object.title;
    this.lessons = object.lessons;
  }
  section_id: string;
  course_id: string;
  title: string;
  lessons: LessonDto[];
}
