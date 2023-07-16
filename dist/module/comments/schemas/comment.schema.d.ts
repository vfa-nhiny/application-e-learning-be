import * as mongoose from "mongoose";
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    comment: {
        userId: string;
        createdAt: Date;
        image: string;
        clientId: string;
        commentId: string;
        content: string;
    }[];
    lessonId: string;
}>;
