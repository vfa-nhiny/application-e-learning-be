import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";
import { RedisService } from "nestjs-redis";
import { Model } from "mongoose";
export declare class RecommendationService {
    private readonly courseModel;
    private readonly rateModel;
    private readonly redisService;
    private redisClient;
    constructor(courseModel: Model<Course>, rateModel: Model<Rate>, redisService: RedisService);
    getUserRatings(userId: string): Promise<Record<string, Record<string, number>>>;
    getAllCourses(): Promise<Course[]>;
    getUserSimilarityMatrix(): Promise<Record<string, Record<string, number>>>;
    train(data: {
        courses: Course[];
        rates: Rate[];
    }): void;
    private prepareUserRatings;
    recommendCoursesForUser(userId: string, courses: Course[], userRatings: Record<string, Record<string, number>>, userSimilarityMatrix: Record<string, Record<string, number>>): Course[];
    private calculateUserSimilarityMatrix;
    private calculateUserSimilarity;
    private saveUserSimilarityMatrix;
    private saveUserRatings;
}
