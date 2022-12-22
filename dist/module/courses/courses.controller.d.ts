import { CoursesService } from "./courses.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { CreateCourseDto } from "./dto/create-course.dto";
import { CreateCourseSectionLessonDto } from "./dto/create-course-section-lesson.dto";
export declare class CoursesController {
    private readonly courseService;
    constructor(courseService: CoursesService);
    findAll(): Promise<IResponse>;
    findById(body: any): Promise<IResponse>;
    joinCourse(body: any): Promise<IResponse>;
    publishCourse(body: any): Promise<IResponse>;
    createNewCourse(body: CreateCourseDto): Promise<IResponse>;
    createNewCourseWithSectionAndLesson(body: CreateCourseSectionLessonDto): Promise<IResponse>;
    updateCourse(body: any): Promise<IResponse>;
    deleteCourse(body: any): Promise<IResponse>;
}
