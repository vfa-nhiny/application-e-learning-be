export class ResultExamDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.score = object.record;
  }
  userId: string;
  score: number;
}
