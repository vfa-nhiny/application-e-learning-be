"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSchema = void 0;
const mongoose = require("mongoose");
const question_exam_dto_1 = require("../dto/question-exam.dto");
const result_exam_dto_1 = require("../dto/result-exam.dto");
exports.ExamSchema = new mongoose.Schema({
    examId: String,
    examTitle: String,
    lessonId: String,
    userId: String,
    questions: [question_exam_dto_1.QuestionDto],
    results: {
        type: [result_exam_dto_1.ResultExamDto],
        default: null,
    },
    time: Number,
}, {
    timestamps: true,
});
//# sourceMappingURL=exam.schema.js.map