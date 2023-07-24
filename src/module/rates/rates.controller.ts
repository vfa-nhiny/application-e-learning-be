import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { RatesService } from "./rates.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/module/auth/constants";
import { RateDto } from "./dto/rate.dto";

@Controller("rates")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post("rate")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findRateByUserId(@Body() body): Promise<IResponse> {
    try {
      const rate = await this.ratesService.findRateByUserId(body.userId, body.courseId);
      return new ResponseSuccess("Success", new RateDto(rate));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("rateByCourse")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findRateByCourseId(@Body() body): Promise<IResponse> {
    try {
      const rate = await this.ratesService.findRateByCourseId(body.courseId);
      return new ResponseSuccess("Success", rate);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async createNewRate(@Body() body): Promise<IResponse> {
    try {
      const rateOld = await this.ratesService.findRateByUserId(body.userId, body.courseId);
      if (rateOld) {
        return new ResponseError("This course has already been rate by user!");
      } else {
        const rate = await this.ratesService.createNewRate(body);
        return new ResponseSuccess("Success", rate);
      }
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
