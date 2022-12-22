import * as mongoose from "mongoose";
export declare const HistorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    recentCourseId: any[];
    recentCommentId: any[];
    recentRateId: any[];
    historyId?: string;
    userId?: string;
}>;
