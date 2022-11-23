import { LessonDto } from "./lesson.dto";

export class SectionDto {
  constructor(object: any) {
    this.sectionId = object.sectionId;
    this.courseId = object.courseId;
    this.createdAt = object.createdAt;
    this.updatedAt = object.updatedAt;
    this.title = object.title;
    this.order = object.order;
    this.lessons = object.lessons;
  }
  sectionId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  order: number;
  lessons: LessonDto[];
}
