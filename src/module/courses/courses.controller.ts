import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { CourseDto } from "./dto/course.dto";
import { CoursesService } from "./courses.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller("courses")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get("courses")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async findAll(): Promise<IResponse> {
    try {
      const course = await this.courseService.findAll();
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("course")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async findById(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.findById(body.courseId);
      return new ResponseSuccess("Success", new CourseDto(course));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async createNewCourse(@Body() body: CreateCourseDto): Promise<IResponse> {
    console.log(body);
    try {
      const course = await this.courseService.createNewCourse(body);
      return new ResponseSuccess("Course created successfully", new CourseDto(course));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("update")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async updateCourse(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.updateCourse(body);
      return new ResponseSuccess("Course updated successfully", new CourseDto(course));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("delete")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async deleteCourse(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.deleteCourse(body.courseId);
      return new ResponseSuccess("Course deleted successfully", null);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
