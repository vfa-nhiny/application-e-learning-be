import { Document } from "mongoose";
export interface Score extends Document {
    lessonId: string;
    userId: string;
    score: number;
}
