import { Model } from "mongoose";
import { Exam } from "./interfaces/exam.interface";
import { CreateExamDto } from "./dto/create-exam.dto";
import { UpdateExamDto } from "./dto/update-exam.dto";
import { UpdateResultExamDto } from "./dto/update-result-exam.dto";
export declare class ExamsService {
    private readonly examModel;
    constructor(examModel: Model<Exam>);
    createNewExam(newExam: CreateExamDto): Promise<Exam>;
    updateExam(exam: UpdateExamDto): Promise<Exam>;
    updateResultExam(exam: UpdateResultExamDto): Promise<{
        userId: string;
        score: number;
    }>;
    findExamById(lessonId: string): Promise<Exam>;
}
