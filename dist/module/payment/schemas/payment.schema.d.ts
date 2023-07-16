import * as mongoose from "mongoose";
export declare const PaymentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userId: string;
    comment: string;
    courseId: string;
    rateId: string;
    teacherId: string;
    score: number;
}>;
