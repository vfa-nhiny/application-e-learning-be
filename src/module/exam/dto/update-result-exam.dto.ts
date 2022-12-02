export class UpdateResultExamDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.userId = object.userId;
    this.score = object.record;
  }
  lessonId: string;
  userId: string;
  score: number;
}
