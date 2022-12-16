import { UserTeacherDto } from "./user-teacher.dto";

export class ListTeacherDto {
  constructor(object: any) {
    this.listTeacher = object.listTeacher;
  }

  readonly listTeacher: [UserTeacherDto];
}
