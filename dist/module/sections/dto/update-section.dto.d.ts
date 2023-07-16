import { LessonDto } from "./lesson.dto";
export declare class UpdateSectionDto {
    sectionId: string;
    courseId: string;
    title: string;
    order: number;
    lessons: LessonDto[];
}
