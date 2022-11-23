export class CommentDto {
  constructor(object: any) {
    this.lessonId = object.lessonId;
    this.comment = object.comment;
  }

  lessonId: string;
  comment: [
    {
      commentId: string;
      userId: string;
      clientId: string;
      image: string;
      content: string;
      createdAt: Date;
    },
  ];
}
