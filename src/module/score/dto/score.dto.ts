export class ScoreDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.userId = object.userId;
    this.score = object.score;
  }

  lessonId: string;
  userId: string;
  score: number;
}
