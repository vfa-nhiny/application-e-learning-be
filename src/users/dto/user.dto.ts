import { SettingsDto } from "./settings.dto";

export class UserDto {
  constructor(object: any) {
    this.user_id = object.user_id;
    this.name = object.name;
    this.email = object.email;
    this.phone = object.phone;
    this.birthday = object.birthday;
    this.gender = object.gender;
    this.settings = new SettingsDto(object.settings);
    this.avatar = object.avatar;
    this.role = object.role;
  }

  readonly user_id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly birthday: string;
  readonly gender: string;
  readonly role: string;
  settings: SettingsDto;
  avatar: string;
}
