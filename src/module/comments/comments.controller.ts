import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";

@Controller("comments")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post("comments")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async getCommentOfLesson(@Body() body): Promise<IResponse> {
    try {
      const comment = await this.commentsService.getCommentOfLesson(body.lessonId);
      return new ResponseSuccess("Success", comment.comment);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
