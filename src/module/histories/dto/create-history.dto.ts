import { IsNotEmpty } from "class-validator";

export class CreateHistoryDto {
  constructor(object: any) {
    this.historyId = object.historyId;
    this.userId = object.userId;
    this.courseId = object.courseId;
    this.commentId = object.commentId;
    this.rateId = object.rateId;
  }
  readonly historyId: string;
  @IsNotEmpty()
  readonly userId: string;
  readonly courseId: string;
  readonly commentId: string;
  readonly rateId: string;
}
