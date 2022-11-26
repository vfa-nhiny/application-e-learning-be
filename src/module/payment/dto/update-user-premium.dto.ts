import { IsNotEmpty } from "class-validator";

export class UpdateUserPremiumDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.isPremium = object.isPremium;
    this.startUsingPremiumDate = object.startUsingPremiumDate;
  }

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly isPremium: boolean;

  @IsNotEmpty()
  readonly startUsingPremiumDate: string;
}
