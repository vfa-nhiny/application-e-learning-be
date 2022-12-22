import { Model } from "mongoose";
import { Course } from "./interfaces/course.interface";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Section } from "src/sections/interfaces/section.interface";
export declare class CoursesService {
    private readonly courseModel;
    private readonly sectionModel;
    constructor(courseModel: Model<Course>, sectionModel: Model<Section>);
    findAll(): Promise<Course[]>;
    findById(id: string): Promise<Course>;
    createNewCourse(newCourse: CreateCourseDto): Promise<Course>;
    updateCourse(courseDto: CreateCourseDto): Promise<Course>;
    deleteCourse(id: string): Promise<Course & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
