import { Model } from "mongoose";
import { Comment } from "./interfaces/comment.interface";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentLessonDto } from "./dto/update-comment-lesson.dto";
import { User } from "../users/interfaces/user.interface";
export declare class CommentsService {
    private readonly commentModel;
    private readonly userModel;
    constructor(commentModel: Model<Comment>, userModel: Model<User>);
    createNewComment(newComment: CreateCommentDto): Promise<Comment>;
    getCommentOfLesson(lessonId: string): Promise<Comment>;
    getCommentOfLessonHaveUsername(lessonId: string): Promise<{
        username: string;
        commentId: string;
        userId: string;
        clientId: string;
        content: string;
        createdAt: Date;
    }[]>;
    createNewCommentLesson(lessonId: string, newCommentLesson: UpdateCommentLessonDto): Promise<Comment>;
}
