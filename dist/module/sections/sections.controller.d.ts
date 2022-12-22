import { SectionsService } from "./sections.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { CreateLessonDto } from "./dto/create-lesson.dto";
export declare class SectionsController {
    private readonly sectionService;
    constructor(sectionService: SectionsService);
    findByIdCourse(body: any): Promise<IResponse>;
    createNewSection(body: CreateSectionDto): Promise<IResponse>;
    updateSection(body: any): Promise<IResponse>;
    deleteSection(body: any): Promise<IResponse>;
    createNewLesson(body: CreateLessonDto): Promise<IResponse>;
    updateLesson(body: UpdateLessonDto): Promise<IResponse>;
    deleteLesson(body: UpdateLessonDto): Promise<IResponse>;
}
