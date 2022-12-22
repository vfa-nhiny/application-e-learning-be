import { Document } from "mongoose";
import { QuestionDto } from "../dto/question-exam.dto";
import { ResultExamDto } from "../dto/result-exam.dto";
export interface Exam extends Document {
    examId: string;
    examTitle: string;
    lessonId: string;
    userId: string;
    questions: [QuestionDto];
    results: [ResultExamDto];
    time: number;
}
