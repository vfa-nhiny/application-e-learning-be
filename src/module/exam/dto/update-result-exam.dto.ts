export class UpdateResultExamDto {
  constructor(object: any) {
    this.examId = object.examId;
    this.userId = object.userId;
    this.score = object.record;
  }
  examId: string;
  userId: string;
  score: number;
}
