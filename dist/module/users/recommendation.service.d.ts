import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { Model } from "mongoose";
export declare class RecommendationService {
    private readonly courseModel;
    private readonly rateModel;
    private readonly redisService;
    private redisClient;
    constructor(courseModel: Model<Course>, rateModel: Model<Rate>, redisService: RedisService);
    getUserRatings(courses: Course[], rates: Rate[], userId: string): Promise<Record<string, Record<string, number>>>;
    getAllCourses(): Promise<Course[]>;
    getAllRating(): Promise<Rate[]>;
    getUserSimilarityMatrix(): Promise<Record<string, Record<string, number>>>;
    splitToObject: (inputObj: any) => {};
    train(data: {
        courses: Course[];
        rates: Rate[];
    }): void;
    private prepareUserRatings;
    calculateAverageRating: (userRatings: any, userId: any) => number;
    recommendCoursesForUser(userId: string, courses: Course[], userRatings: Record<string, Record<string, number>>): Promise<Course[]>;
    private calculateUserSimilarityMatrix;
    private calculateUserSimilarity;
    private saveUserSimilarityMatrix;
    private saveUserRatings;
}
