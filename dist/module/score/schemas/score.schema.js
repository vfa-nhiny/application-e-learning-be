"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreSchema = void 0;
const mongoose = require("mongoose");
exports.ScoreSchema = new mongoose.Schema({
    lessonId: String,
    userId: String,
    score: Number,
}, {
    timestamps: true,
});
//# sourceMappingURL=score.schema.js.map