import { Model } from "mongoose";
import { Score } from "./interfaces/score.interface";
import { CreateScoreDto } from "./dto/create-score.dto";
import { Course } from "../courses/interfaces/course.interface";
import { User } from "../users/interfaces/user.interface";
export declare class ScoresService {
    private readonly scoreModel;
    private readonly courseModel;
    private readonly userModel;
    constructor(scoreModel: Model<Score>, courseModel: Model<Course>, userModel: Model<User>);
    createNewScore(newScore: CreateScoreDto): Promise<Score>;
    findScoreByUserId(userId: string, lessonId: string): Promise<Score>;
    findScoreByCourseId(courseId: string): Promise<Score>;
}
