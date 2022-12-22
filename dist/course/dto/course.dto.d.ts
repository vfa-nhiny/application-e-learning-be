export declare class CourseDto {
    constructor(object: any);
    readonly courseId: string;
    readonly title: string;
    readonly description: string;
    readonly ratingScore: number;
    readonly ratingNumber: number;
    readonly image: string;
    readonly date: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly category: string[];
    readonly price: number;
    readonly sale: number;
    readonly authorId: string;
}
