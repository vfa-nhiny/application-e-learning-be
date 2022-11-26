import { Injectable } from "@nestjs/common";
import { UpdateUserPremiumDto } from "./dto/update-user-premium.dto";
import { UsersService } from "../users/users.service";
import { UserDto } from "../users/dto/user.dto";

@Injectable()
export class PaymentsService {
  constructor(private readonly usersService: UsersService) {}

  async updateUserPremium(updateUserPremium: UpdateUserPremiumDto): Promise<UserDto> {
    const userDto = await this.usersService.updateProfile({
      userId: updateUserPremium.userId,
      isPremium: updateUserPremium.isPremium,
      startUsingPremiumDate: updateUserPremium.startUsingPremiumDate,
    });
    return new UserDto(userDto);
  }
}
