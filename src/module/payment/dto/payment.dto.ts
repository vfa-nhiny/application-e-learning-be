export class PaymentDto {
  constructor(object: any) {
    this.rateId = object.rateId;
    this.userId = object.userId;
    this.courseId = object.courseId;
    this.teacherId = object.teacherId;
    this.score = object.score;
    this.comment = object.comment;
  }

  rateId: string;
  userId: string;
  courseId: string;
  teacherId: string;
  score: number;
  comment: string;
}
