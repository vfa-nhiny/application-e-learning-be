import { LessonDto } from "./lesson.dto";
export declare class SectionDto {
    constructor(object: any);
    sectionId: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    order: number;
    lessons: LessonDto[];
}
