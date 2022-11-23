import { IsNotEmpty } from "class-validator";

export class CommentLessonDto {
  constructor(object: any) {
    this.commentId = object.commentId;
    this.userId = object.userId;
    this.clientId = object.clientId;
    this.image = object.image;
    this.content = object.content;
    this.createdAt = object.createdAt;
  }

  commentId: string;
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  clientId: string;
  image: string;
  content: string;
  createdAt: Date;
}
