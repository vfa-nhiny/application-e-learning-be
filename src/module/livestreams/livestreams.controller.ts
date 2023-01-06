import { Controller, Post, Body, UseGuards, UseInterceptors, Req, Res, Get, Redirect } from "@nestjs/common";
import { LivestreamsService } from "./livestreams.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { role } from "src/module/auth/constants";
import { LivestreamDto } from "./dto/livestream.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";
import { TransformInterceptor } from "src/common/interceptors/transform.interceptor";

@Controller("livestreams")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class LivestreamsController {
  constructor(private readonly livestreamsService: LivestreamsService) {}

  @Post("create")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async createLivestream(@Body() body): Promise<IResponse> {
    try {
      console.log(body);
      const livestream = await this.livestreamsService.createNewLivestream(body);
      return new ResponseSuccess("Success", new LivestreamDto(livestream));
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Get("get")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async getLivestream(): Promise<IResponse> {
    try {
      const livestream = await this.livestreamsService.findLivestream();
      return new ResponseSuccess("Success", livestream);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }

  @Post("delete")
  @UseGuards(RolesGuard)
  @Roles(role.teacher)
  async deleteCourse(@Body() body): Promise<IResponse> {
    try {
      const livestream = await this.livestreamsService.deleteLivestream(body.userId);
      return new ResponseSuccess("Course deleted successfully", null);
    } catch (error) {
      return new ResponseError("Error: generic error", error);
    }
  }
}
