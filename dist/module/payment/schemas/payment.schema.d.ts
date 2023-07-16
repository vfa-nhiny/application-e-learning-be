import * as mongoose from "mongoose";
export declare const PaymentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userId: string;
    courseId: string;
    comment: string;
    score: number;
    rateId: string;
    teacherId: string;
}>;
