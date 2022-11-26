export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.name = object.name;
    this.birthday = object.birthday;
    this.phone = object.phone;
    this.avatar = object.avatar;
    this.gender = object.gender;
    this.isPremium = object.isPremium;
    this.startUsingPremiumDate = object.startUsingPremiumDate;
  }
  email: string;
  name: string;
  birthday: string;
  phone: string;
  avatar: string;
  gender: string;
  isPremium: boolean;
  startUsingPremiumDate: string;
}
