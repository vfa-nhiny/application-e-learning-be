import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";
export declare class ExamDto {
    constructor(object: any);
    examId: string;
    examTitle: string;
    lessonId: string;
    userId: string;
    time: number;
    questions: [QuestionDto];
    results: [ResultExamDto];
}
