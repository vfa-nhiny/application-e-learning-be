export class UserTeacherDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.name = object.name;
    this.email = object.email;
    this.phone = object.phone;
    this.birthday = object.birthday;
    this.gender = object.gender;
    this.avatar = object.avatar;
    this.role = object.role;
  }

  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly birthday: string;
  readonly gender: string;
  readonly role: string;
  avatar: string;
}
