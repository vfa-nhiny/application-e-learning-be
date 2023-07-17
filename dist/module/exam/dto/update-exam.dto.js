"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamDto = void 0;
class UpdateExamDto {
    constructor(object) {
        this.examId = object.examId;
        this.examTitle = object.examTitle;
        this.userId = object.userId;
        this.lessonId = object.lessonId;
        this.questions = object.questions;
        this.results = object.results;
    }
}
exports.UpdateExamDto = UpdateExamDto;
//# sourceMappingURL=update-exam.dto.js.map