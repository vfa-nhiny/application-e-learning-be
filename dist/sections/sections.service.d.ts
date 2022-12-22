import { Model } from "mongoose";
import { Section } from "./interfaces/section.interface";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";
export declare class SectionsService {
    private readonly sectionModel;
    constructor(sectionModel: Model<Section>);
    findSections(id: string): Promise<Section[]>;
    createNewSection(newSection: CreateSectionDto): Promise<Section>;
    updateSection(sectionDto: UpdateSectionDto): Promise<Section>;
    createNewLesson(lessonDto: CreateLessonDto): Promise<Section>;
    updateLesson(lessonDto: UpdateLessonDto): Promise<Section>;
    deleteLesson(lessonDto: UpdateLessonDto): Promise<Section>;
    deleteSection(id: string): Promise<Section & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrderLessonCreated(data: any, arrayData: any): Promise<[]>;
}
