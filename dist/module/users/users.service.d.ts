import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { SettingsDto } from "./dto/settings.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserTeacherDto } from "./dto/user-teacher.dto";
import { Course } from "../courses/interfaces/course.interface";
export declare class UsersService {
    private readonly userModel;
    private readonly courseModel;
    constructor(userModel: Model<User>, courseModel: Model<Course>);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    findTeacher(): Promise<UserTeacherDto[]>;
    findByUserId(userId: string): Promise<User>;
    createNewUser(newUser: CreateUserDto): Promise<User>;
    setPassword(email: string, newPassword: string): Promise<boolean>;
    updateProfile(profileDto: UpdateUserDto): Promise<User>;
    updateCourse(userId: string, courseId: string): Promise<User>;
    writeFile(dir: string, filename: string, base64Data: string): Promise<any>;
    removeFile(dir: string, filename: string): Promise<any>;
    guid(): string;
    updateSettings(settingsDto: SettingsDto): Promise<User>;
}
