"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamSchema = void 0;
const mongoose = require("mongoose");
exports.ExamSchema = new mongoose.Schema({
    examId: String,
    examTitle: String,
    lessonId: String,
    userId: String,
    questions: [
        {
            id: String,
            title: String,
            options: [String],
            answer: String,
        },
    ],
    results: {
        type: [{ userId: String, score: Number }],
        default: [],
    },
    time: Number,
}, {
    timestamps: true,
});
//# sourceMappingURL=exam.schema.js.map