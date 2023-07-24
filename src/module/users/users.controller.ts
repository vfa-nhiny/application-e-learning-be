import { Controller, Post, Body, UseGuards, UseInterceptors, Get, Param } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { ProfileDto } from "./dto/profile.dto";
import { SettingsDto } from "./dto/settings.dto";
import { role } from "src/module/auth/constants";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ListTeacherDto } from "./dto/list-teacher";
import { RecommendationService } from "./recommendation.service";
import { Course } from "../courses/interfaces/course.interface";
import { Rate } from "../rates/interfaces/rate.interface";

@Controller("users")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly recommendationService: RecommendationService) {}

  @Get(":userId/recommendations")
  async getRecommendations(@Param("userId") userId: string): Promise<Course[]> {
    const courses = await this.recommendationService.getAllCourses();

    const rates = await this.recommendationService.getAllRating();
    const userRating = await this.recommendationService.getUserRatings(courses, rates, userId);
    const { userRatings, userSimilarityMatrix } = this.recommendationService.train({ courses, rates });
    const recommendedCourses = this.recommendationService.recommendCoursesForUser(userId, courses, userRating, userRatings, userSimilarityMatrix);
    return recommendedCourses;
  }
  @Post("user")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findByEmail(@Body() body): Promise<IResponse> {
    try {
      const user = await this.usersService.findByEmail(body.email);
      return new ResponseSuccess("Success", new UserDto(user));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("userById")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findById(@Body() body): Promise<IResponse> {
    try {
      const user = await this.usersService.findByUserId(body.userId);
      return new ResponseSuccess("Success", new UserDto(user));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Get("teacher")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findTeacher(): Promise<IResponse> {
    try {
      const users = await this.usersService.findTeacher();
      console.log(users);
      return new ResponseSuccess("Success", users);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("profile/update")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateProfile(@Body() profileDto: UpdateUserDto): Promise<IResponse> {
    console.log(profileDto);
    try {
      const user = await this.usersService.updateProfile(profileDto);
      return new ResponseSuccess("Profile updated successfully", new UserDto(user));
    } catch (error) {
      return new ResponseError("Profile update error", error);
    }
  }

  @Post("joinCourse")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateJoinCourse(@Body() body): Promise<IResponse> {
    try {
      const user = await this.usersService.updateCourse(body.userId, body.courseId);
      return new ResponseSuccess("Profile updated successfully", new UserDto(user));
    } catch (error) {
      return new ResponseError("Profile update error", error);
    }
  }

  @Post("settings/update")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateSettings(@Body() settingsDto: SettingsDto): Promise<IResponse> {
    try {
      const user = await this.usersService.updateSettings(settingsDto);
      return new ResponseSuccess("Setting updated successfully", new UserDto(user));
    } catch (error) {
      return new ResponseError("Setting update error", error);
    }
  }
}
