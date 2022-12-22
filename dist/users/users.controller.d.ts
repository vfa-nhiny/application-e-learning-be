import { UsersService } from "./users.service";
import { IResponse } from "../common/interfaces/response.interface";
import { SettingsDto } from "./dto/settings.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findById(body: any): Promise<IResponse>;
    updateProfile(profileDto: UpdateUserDto): Promise<IResponse>;
    updateSettings(settingsDto: SettingsDto): Promise<IResponse>;
}
