import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { SectionDto } from "./dto/section.dto";
import { SectionsService } from "./sections.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/auth/constants";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { CreateLessonDto } from "./dto/create-lesson.dto";

@Controller("sections")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post("course")
  @UseGuards(RolesGuard)
  @Roles(role.teacher, role.student)
  async findByIdCourse(@Body() body): Promise<IResponse> {
    try {
      const section = await this.sectionService.findSections(body.courseId);
      return new ResponseSuccess("COMMON.SUCCESS", section);
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async createNewSection(@Body() body: CreateSectionDto): Promise<IResponse> {
    console.log(body);
    try {
      const section = await this.sectionService.createNewSection(body);
      return new ResponseSuccess("COMMON.SUCCESS", new SectionDto(section));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("update")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async updateSection(@Body() body): Promise<IResponse> {
    try {
      const section = await this.sectionService.updateSection(body);
      return new ResponseSuccess("COMMON.SUCCESS", new SectionDto(section));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("delete")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async deleteSection(@Body() body): Promise<IResponse> {
    try {
      await this.sectionService.deleteSection(body.sectionId);
      return new ResponseSuccess("COMMON.SUCCESS", null);
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("createLesson")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async createNewLesson(@Body() body: CreateLessonDto): Promise<IResponse> {
    console.log(body);
    try {
      const section = await this.sectionService.createNewLesson(body);
      return new ResponseSuccess("COMMON.SUCCESS", new SectionDto(section));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("updateLesson")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async updateLesson(@Body() body: UpdateLessonDto): Promise<IResponse> {
    console.log(body);
    try {
      const section = await this.sectionService.updateLesson(body);
      return new ResponseSuccess("COMMON.SUCCESS", new SectionDto(section));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("deleteLesson")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async deleteLesson(@Body() body: UpdateLessonDto): Promise<IResponse> {
    console.log(body);
    try {
      const section = await this.sectionService.deleteLesson(body);
      return new ResponseSuccess("COMMON.SUCCESS", new SectionDto(section));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }
}
