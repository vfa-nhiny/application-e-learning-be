import { IsNotEmpty } from "class-validator";
import { CommentLessonDto } from "./comment-lesson.dto";

export class CreateCommentDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.comment = object.comment;
  }

  @IsNotEmpty()
  readonly lessonId: string;

  @IsNotEmpty()
  readonly comment: { type: CommentLessonDto[]; default: [] };
}
