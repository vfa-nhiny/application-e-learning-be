import * as mongoose from "mongoose";
export declare const ScoreSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userId?: string;
    score?: number;
    lessonId?: string;
}>;
