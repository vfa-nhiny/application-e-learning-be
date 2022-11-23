import { IsNotEmpty } from "class-validator";

export class UpdateCommentLessonDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.clientId = object.clientId;
    this.image = object.image;
    this.content = object.content;
    this.createdAt = object.createdAt;
  }

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  clientId: string;
  image: string;
  content: string;
  createdAt: Date;
}
