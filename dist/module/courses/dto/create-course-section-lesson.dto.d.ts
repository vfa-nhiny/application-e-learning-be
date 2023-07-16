import { CreateSectionDto } from "src/module/sections/dto/create-section.dto";
export declare class CreateCourseSectionLessonDto {
    courseId: string;
    title: string;
    description: string;
    ratingScore: number;
    ratingNumber: number;
    image: string;
    price: number;
    sale: number;
    authorId: string;
    category: string[];
    sections: CreateSectionDto[];
}
