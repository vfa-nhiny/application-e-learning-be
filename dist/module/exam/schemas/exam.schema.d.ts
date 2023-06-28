import * as mongoose from "mongoose";
export declare const ExamSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    questions: {
        options: string[];
        id?: string;
        title?: string;
        answer?: string;
    }[];
    results: {
        userId?: string;
        score?: number;
    }[];
    userId?: string;
    lessonId?: string;
    examId?: string;
    examTitle?: string;
    time?: number;
}>;
