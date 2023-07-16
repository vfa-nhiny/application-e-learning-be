import * as mongoose from "mongoose";
export declare const HistorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userId: string;
    historyId: string;
    recentCourseId: string;
    recentCommentId: string;
    recentRateId: string;
}>;
