import { UsersService } from "./users.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { SettingsDto } from "./dto/settings.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { RecommendationService } from "./recommendation.service";
import { Course } from "../courses/interfaces/course.interface";
export declare class UsersController {
    private readonly usersService;
    private readonly recommendationService;
    constructor(usersService: UsersService, recommendationService: RecommendationService);
    getRecommendations(userId: string): Promise<Course[]>;
    findByEmail(body: any): Promise<IResponse>;
    findById(body: any): Promise<IResponse>;
    findTeacher(): Promise<IResponse>;
    updateProfile(profileDto: UpdateUserDto): Promise<IResponse>;
    updateJoinCourse(body: any): Promise<IResponse>;
    updateSettings(settingsDto: SettingsDto): Promise<IResponse>;
}
