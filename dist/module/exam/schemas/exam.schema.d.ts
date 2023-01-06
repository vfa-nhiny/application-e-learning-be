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
    examId?: string;
    examTitle?: string;
    lessonId?: string;
    userId?: string;
    time?: number;
}>;
