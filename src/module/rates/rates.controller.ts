import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { RatesService } from "./rates.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { role } from "src/auth/constants";
import { RateDto } from "./dto/rate.dto";

@Controller("rates")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  // @Post("rate")
  // @UseGuards(RolesGuard)
  // @Roles(role.student, role.teacher)
  // async findById(@Body() body): Promise<IResponse> {
  //   try {
  //     const rate = await this.ratesService.findByEmail(body.email);
  //     return new ResponseSuccess("COMMON.SUCCESS", new RateDto(rate));
  //   } catch (error) {
  //     return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
  //   }
  // }
}
