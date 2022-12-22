import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";
export declare class CreateExamDto {
    constructor(object: any);
    examId: string;
    userId: string;
    examTitle: string;
    lessonTitle: string;
    lessonId: string;
    time: number;
    questions: [QuestionDto];
    results: [ResultExamDto];
}
