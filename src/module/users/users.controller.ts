import { Controller, Post, Body, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";
import { IResponse } from "../../common/interfaces/response.interface";
import { ResponseSuccess, ResponseError } from "../../common/dto/response.dto";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { LoggingInterceptor } from "../../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../../common/interceptors/transform.interceptor";
import { AuthGuard } from "@nestjs/passport";
import { ProfileDto } from "./dto/profile.dto";
import { SettingsDto } from "./dto/settings.dto";
import { role } from "src/auth/constants";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("user")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async findById(@Body() body): Promise<IResponse> {
    try {
      const user = await this.usersService.findByEmail(body.email);
      return new ResponseSuccess("COMMON.SUCCESS", new UserDto(user));
    } catch (error) {
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Post("profile/update")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateProfile(@Body() profileDto: UpdateUserDto): Promise<IResponse> {
    console.log(profileDto);
    try {
      const user = await this.usersService.updateProfile(profileDto);
      return new ResponseSuccess("PROFILE.UPDATE_SUCCESS", new UserDto(user));
    } catch (error) {
      return new ResponseError("PROFILE.UPDATE_ERROR", error);
    }
  }

  @Post("settings/update")
  @UseGuards(RolesGuard)
  @Roles(role.student, role.teacher)
  async updateSettings(@Body() settingsDto: SettingsDto): Promise<IResponse> {
    try {
      const user = await this.usersService.updateSettings(settingsDto);
      return new ResponseSuccess("SETTINGS.UPDATE_SUCCESS", new UserDto(user));
    } catch (error) {
      return new ResponseError("SETTINGS.UPDATE_ERROR", error);
    }
  }
}
