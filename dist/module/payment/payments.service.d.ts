import { UpdateUserPremiumDto } from "./dto/update-user-premium.dto";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/dto/user.dto";
export declare class PaymentsService {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateUserPremium(updateUserPremium: UpdateUserPremiumDto): Promise<UserDto>;
}
