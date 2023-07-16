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
import { CreateCourseSectionLessonDto } from "./dto/create-course-section-lesson.dto";

@Controller("courses")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get("courses")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async findAll(): Promise<IResponse> {
    try {
      const course = await this.courseService.findAll();
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Get("lastedCourses")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async getLastedCourse(): Promise<IResponse> {
    try {
      const course = await this.courseService.getLastedCourses();
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("course")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async findById(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.findById(body.courseId);
      return new ResponseSuccess("Success", new CourseDto(course));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("getCourseByTeacher")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async findByUserId(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.findByUserId(body.authorId);
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("getCourseByList")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async findByListCourseId(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.findByListCourseId(body.listCourseId);
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("search")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async searchCourses(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.searchCourses(body.content);
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("searchCategories")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async filterCourseByCategories(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.filterCourseByCategories(body.content);
      return new ResponseSuccess("Success", course);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("join")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async joinCourse(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.joinCourse(body.courseId);
      return new ResponseSuccess("Success", new CourseDto(course));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("publish")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async publishCourse(@Body() body): Promise<IResponse> {
    try {
      const course = await this.courseService.publishCourse(body.courseId, body.isPublished);
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

  @Post("createCourseWithSectionAndLesson")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async createNewCourseWithSectionAndLesson(@Body() body: CreateCourseSectionLessonDto): Promise<IResponse> {
    console.log(body);
    try {
      const course = await this.courseService.createNewCourseWithSectionLesson(body);

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
  @Post("recommend")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async recommendationCourse(@Body() body): Promise<IResponse> {
    console.log("in");
    try {
      const course = await this.courseService.recommendationCourse(body.userId);
      return new ResponseSuccess("Success", course);
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
