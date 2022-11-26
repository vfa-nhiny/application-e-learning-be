import { SettingsDto } from "./settings.dto";

export class UserDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.name = object.name;
    this.email = object.email;
    this.phone = object.phone;
    this.birthday = object.birthday;
    this.gender = object.gender;
    this.settings = new SettingsDto(object.settings);
    this.avatar = object.avatar;
    this.role = object.role;
    this.isPremium = object.isPremium;
    this.startUsingPremiumDate = object.startUsingPremiumDate;
  }

  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly birthday: string;
  readonly gender: string;
  readonly role: string;
  readonly isPremium: boolean;
  readonly startUsingPremiumDate: string;
  settings: SettingsDto;
  avatar: string;
}
