import * as mongoose from "mongoose";
export declare const ExamSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    questions: {
        prototype?: {
            options: unknown[];
            id?: unknown;
            title?: unknown;
            answer?: unknown;
        };
    }[];
    examId?: string;
    examTitle?: string;
    lessonId?: string;
    userId?: string;
    time?: number;
    results?: {
        prototype?: {
            userId?: unknown;
            score?: unknown;
        };
    }[];
}>;
