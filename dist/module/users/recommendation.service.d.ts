import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";
import { Model } from "mongoose";
export declare class RecommendationService {
    private readonly courseModel;
    private readonly rateModel;
    constructor(courseModel: Model<Course>, rateModel: Model<Rate>);
    getUserRatings(courses: Course[], rates: Rate[], userId: string): Promise<Record<string, Record<string, number>>>;
    getAllCourses(): Promise<Course[]>;
    getAllRating(): Promise<Rate[]>;
    splitToObject: (inputObj: any) => {};
    train(data: {
        courses: Course[];
        rates: Rate[];
    }): {
        userSimilarityMatrix: Record<string, Record<string, number>>;
        userRatings: Record<string, Record<string, number>>;
    };
    private prepareUserRatings;
    calculateAverageRating: (userRatings: any, userId: any) => number;
    recommendCoursesForUser(userId: string, courses: Course[], userRatings: Record<string, Record<string, number>>, userCourseRatings: Record<string, Record<string, number>>, userSimilarityMatrix: Record<string, Record<string, number>>): Promise<Course[]>;
    private calculateUserSimilarityMatrix;
    private calculateUserSimilarity;
}
