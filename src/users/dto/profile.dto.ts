export class ProfileDto {
  constructor(object: any) {
    this.user_id = object.user_id;
    this.email = object.email;
    this.name = object.name;
    this.birthday = object.birthday;
    this.phone = object.phone;
    this.avatar = object.avatar;
    this.gender = object.gender;
  }
  readonly user_id: string;
  readonly email: string;
  readonly name: string;
  readonly birthday: string;
  readonly phone: string;
  readonly avatar: string;
  readonly gender: string;
}
