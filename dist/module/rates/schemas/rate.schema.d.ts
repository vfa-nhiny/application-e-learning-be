import * as mongoose from "mongoose";
export declare const RateSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    comment: string;
    userId?: string;
    courseId?: string;
    rateId?: string;
    teacherId?: string;
    score?: number;
}>;
