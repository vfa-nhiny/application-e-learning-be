import { Document } from "mongoose";
export interface Exam extends Document {
    examId: string;
    examTitle: string;
    lessonId: string;
    userId: string;
    questions: [
        {
            id: string;
            title: string;
            options: string[];
            answer: string;
        }
    ];
    results: [{
        userId: string;
        score: number;
    }];
    time: number;
}
