export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.name = object.name;
    this.birthdayDate = object.birthdayDate;
    this.phone = object.phone;
    this.profilePicture = object.profilePicture;
    this.gender = object.gender;
  }
  readonly email: string;
  readonly name: string;
  readonly birthdayDate: string;
  readonly phone: string;
  readonly profilePicture: string;
  readonly gender: string;
}
