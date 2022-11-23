import { IsNotEmpty } from "class-validator";

export class CreateRateDto {
  constructor(object: any) {
    this.rateId = object.rateId;
    this.userId = object.userId;
    this.courseId = object.courseId;
    this.teacherId = object.teacherId;
    this.score = object.score;
    this.comment = object.comment;
  }

  readonly rateId: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly courseId: string;

  @IsNotEmpty()
  readonly teacherId: string;

  @IsNotEmpty()
  readonly score: number;
  readonly comment: string;
}
