import { CommentLessonDto } from "./comment-lesson.dto";
export declare class CreateCommentDto {
    constructor(object: any);
    readonly lessonId: string;
    readonly comment: {
        type: CommentLessonDto[];
        default: [];
    };
}
