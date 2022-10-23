import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '../../node_modules/@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';
import { SettingsDto } from './dto/settings.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user/:email')
  @UseGuards(RolesGuard)
  @Roles('Student', 'Teacher')
  async findById(@Param() params): Promise<IResponse> {
    try {
      const user = await this.usersService.findByEmail(params.email);
      return new ResponseSuccess('COMMON.SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('profile/update')
  @UseGuards(RolesGuard)
  @Roles('Student', 'Teacher')
  async updateProfile(@Body() profileDto: ProfileDto): Promise<IResponse> {
    try {
      const user = await this.usersService.updateProfile(profileDto);
      return new ResponseSuccess('PROFILE.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Post('gallery/update')
  @UseGuards(RolesGuard)
  @Roles('Student', 'Teacher')
  async updateGallery(
    @Body() galleryRequest: UpdateGalleryDto,
  ): Promise<IResponse> {
    try {
      const user = await this.usersService.updateGallery(galleryRequest);
      return new ResponseSuccess('PROFILE.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Post('settings/update')
  @UseGuards(RolesGuard)
  @Roles('Student', 'Teacher')
  async updateSettings(@Body() settingsDto: SettingsDto): Promise<IResponse> {
    try {
      const user = await this.usersService.updateSettings(settingsDto);
      return new ResponseSuccess('SETTINGS.UPDATE_SUCCESS', new UserDto(user));
    } catch (error) {
      return new ResponseError('SETTINGS.UPDATE_ERROR', error);
    }
  }
}
