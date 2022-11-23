export class HistoryDto {
  constructor(object: any) {
    this.historyId = object.historyId;
    this.userId = object.userId;
    this.recentCourseId = object.recentCourseId;
    this.recentCommentId = object.recentCommentId;
    this.recentRateId = object.recentRateId;
  }

  historyId: string;
  userId: string;
  recentCourseId: string[];
  recentCommentId: string[];
  recentRateId: string[];
}
