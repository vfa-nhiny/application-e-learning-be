import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { ScoresService } from "./scores.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { ScoreDto } from "./dto/score.dto";

@Controller("scores")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post("score")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findScoreByUserId(@Body() body): Promise<IResponse> {
    try {
      const score = await this.scoresService.findScoreByUserId(body.userId, body.courseId);
      return new ResponseSuccess("Success", new ScoreDto(score));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("scoreByCourse")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findScoreByCourseId(@Body() body): Promise<IResponse> {
    try {
      const score = await this.scoresService.findScoreByCourseId(body.courseId);
      return new ResponseSuccess("Success", new ScoreDto(score));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async createNewScore(@Body() body): Promise<IResponse> {
    try {
      const score = await this.scoresService.createNewScore(body);
      return new ResponseSuccess("Success", new ScoreDto(score));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
