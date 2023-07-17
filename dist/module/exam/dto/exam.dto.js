"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamDto = void 0;
class ExamDto {
    constructor(object) {
        this.examId = object.examId;
        this.examTitle = object.examTitle;
        this.userId = object.userId;
        this.lessonId = object.lessonId;
        this.questions = object.questions;
        this.results = object.results;
        this.time = object.time;
    }
}
exports.ExamDto = ExamDto;
//# sourceMappingURL=exam.dto.js.map