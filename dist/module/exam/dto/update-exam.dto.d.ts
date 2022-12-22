import { QuestionDto } from "./question-exam.dto";
import { ResultExamDto } from "./result-exam.dto";
export declare class UpdateExamDto {
    constructor(object: any);
    examId: string;
    examTitle: string;
    userId: string;
    lessonId: string;
    questions: [QuestionDto];
    results: [ResultExamDto];
}
