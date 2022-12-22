import * as mongoose from "mongoose";
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    comment: {
        userId: string;
        image: string;
        commentId: string;
        clientId: string;
        content: string;
        createdAt: Date;
    }[];
    lessonId: string;
}>;
