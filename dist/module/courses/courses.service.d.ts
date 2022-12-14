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
    findById(id: string): Promise<Course>;
    findByUserId(id: string): Promise<Course[]>;
    findByListCourseId(listCourseId: string[]): Promise<(Course & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
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
