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
import { Course } from "./interfaces/course.interface";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Section } from "src/module/sections/interfaces/section.interface";
import { CreateCourseSectionLessonDto } from "./dto/create-course-section-lesson.dto";
import { SectionsService } from "../sections/sections.service";
import { UsersService } from "../users/users.service";
import { HttpService } from "@nestjs/axios";
export declare class CoursesService {
    private readonly courseModel;
    private readonly sectionModel;
    private readonly sectionService;
    private readonly userService;
    private readonly httpService;
    constructor(courseModel: Model<Course>, sectionModel: Model<Section>, sectionService: SectionsService, userService: UsersService, httpService: HttpService);
    findAll(): Promise<Course[]>;
    getLastedCourses(): Promise<Course[]>;
    getTopRateCourses(): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    findByUserId(id: string): Promise<Course[]>;
    findByListCourseId(listCourseId: string[]): Promise<(Course & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    searchCourses(content: string): Promise<Course[]>;
    filterCourseByCategories(content: string): Promise<Course[]>;
    createNewCourse(newCourse: CreateCourseDto): Promise<Course>;
    createNewCourseWithSectionLesson(newCourse: CreateCourseSectionLessonDto): Promise<Course>;
    updateCourse(courseDto: CreateCourseDto): Promise<Course>;
    deleteCourse(id: string): Promise<Course & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    joinCourse(id: string): Promise<Course & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    publishCourse(id: string, isPublished: boolean): Promise<Course & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    recommendationCourse(id: string): Promise<(Course & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
