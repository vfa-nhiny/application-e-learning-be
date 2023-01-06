import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { ExamsService } from "./exams.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { ExamDto } from "./dto/exam.dto";

@Controller("exams")
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post("exam")
  async findExamByLessonId(@Body() body): Promise<IResponse> {
    try {
      const exam = await this.examsService.findExamById(body.lessonId);
      return new ResponseSuccess("Success", new ExamDto(exam));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("create")
  async createNewExam(@Body() body): Promise<IResponse> {
    try {
      const exam = await this.examsService.createNewExam(body);
      return new ResponseSuccess("Success", new ExamDto(exam));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("updateExam")
  async updateExam(@Body() body): Promise<IResponse> {
    try {
      const exam = await this.examsService.updateExam(body.examId);
      return new ResponseSuccess("Success", new ExamDto(exam));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
