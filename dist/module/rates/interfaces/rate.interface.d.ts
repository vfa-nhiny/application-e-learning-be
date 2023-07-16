import { Document } from "mongoose";
export interface Rate extends Document {
    rateId: string;
    userId: string;
    courseId: string;
    teacherId: string;
    score: number;
    comment: string;
}
