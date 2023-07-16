/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
    createNewLessonWithoutOrder(lessonDto: CreateLessonDto): Promise<Section>;
    updateLesson(lessonDto: UpdateLessonDto): Promise<Section>;
    deleteLesson(lessonDto: UpdateLessonDto): Promise<Section>;
    deleteSection(id: string): Promise<Section & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getOrderLessonCreated(data: any, arrayData: any): Promise<[]>;
}
