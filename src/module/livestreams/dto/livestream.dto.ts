export class LivestreamDto {
  constructor(object: any) {
    this.userId = object.userId;
    this.userName = object.userName;
  }

  userId: string;
  userName: string;
}
