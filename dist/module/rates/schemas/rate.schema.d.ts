import * as mongoose from "mongoose";
export declare const RateSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    comment: string;
    userId?: string;
    courseId?: string;
    teacherId?: string;
    score?: number;
    rateId?: string;
}>;
