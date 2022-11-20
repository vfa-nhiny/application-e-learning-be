export class LessonDto {
  constructor(object: any) {
    this.lesson_id = object.lesson_id;
    this.url = object.url;
    this.title = object.title;
  }

  url: string;
  title: string;
  lesson_id: string;
}
