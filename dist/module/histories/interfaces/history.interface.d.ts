import { Document } from "mongoose";
export interface History extends Document {
    historyId: string;
    userId: string;
    recentCourseId: string[];
    recentCommentId: string[];
    recentRateId: string[];
}
