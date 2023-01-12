export class RateDto {
  constructor(object: any) {
    this.rateId = object.rateId;
    this.userId = object.userId;
    this.courseId = object.courseId;
    this.teacherId = object.teacherId;
    this.comment = object.comment;
    this.score = object.score;
  }

  rateId: string;
  userId: string;
  courseId: string;
  teacherId: string;
  comment: string;
  score: number;
}
