import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { HistoriesService } from "./histories.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/auth/constants";
import { HistoryDto } from "./dto/history.dto";

@Controller("histories")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Post("history")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findById(@Body() body): Promise<IResponse> {
    try {
      const history = await this.historiesService.findByEmail(body.email);
      return new ResponseSuccess("COMMON.SUCCESS", new HistoryDto(history));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }
}
