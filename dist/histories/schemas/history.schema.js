"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
const mongoose = require("mongoose");
exports.HistorySchema = new mongoose.Schema({
    historyId: String,
    userId: String,
    recentCourseId: (Array),
    recentCommentId: (Array),
    recentRateId: (Array),
}, {
    timestamps: true,
});
//# sourceMappingURL=history.schema.js.map