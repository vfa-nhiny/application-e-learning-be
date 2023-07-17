import { ExamsService } from "./exams.service";
import { IResponse } from "../../common/interfaces/response.interface";
export declare class ExamsController {
    private readonly examsService;
    constructor(examsService: ExamsService);
    findExamByLessonId(body: any): Promise<IResponse>;
    createNewExam(body: any): Promise<IResponse>;
    updateExam(body: any): Promise<IResponse>;
}
