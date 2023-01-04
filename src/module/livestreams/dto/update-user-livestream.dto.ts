import { IsNotEmpty } from "class-validator";

export class UpdateLiveStreamDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.userName = object.userName;
  }

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly userName: string;
}
