export class LessonDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.url = object.url;
    this.date = object.date;
    this.title = object.title;
    this.order = object.order;
  }

  url: string;
  title: string;
  date: Date;
  lessonId: string;
  order: number;
}
