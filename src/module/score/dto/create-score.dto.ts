import { IsNotEmpty } from "class-validator";

export class CreateScoreDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.userId = object.userId;
    this.score = object.score;
  }

  readonly lessonId: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly score: number;
}
