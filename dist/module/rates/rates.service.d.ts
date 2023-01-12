import { Model } from "mongoose";
import { Rate } from "./interfaces/rate.interface";
import { CreateRateDto } from "./dto/create-rate.dto";
import { Course } from "../courses/interfaces/course.interface";
import { User } from "../users/interfaces/user.interface";
export declare class RatesService {
    private readonly rateModel;
    private readonly courseModel;
    private readonly userModel;
    constructor(rateModel: Model<Rate>, courseModel: Model<Course>, userModel: Model<User>);
    createNewRate(newRate: CreateRateDto): Promise<Rate>;
    findRateByUserId(userId: string, courseId: string): Promise<Rate>;
    findRateByCourseId(courseId: string): Promise<Rate[]>;
}
