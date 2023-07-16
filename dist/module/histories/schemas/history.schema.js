"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorySchema = void 0;
const mongoose = require("mongoose");
exports.HistorySchema = new mongoose.Schema({
    historyId: { type: String, default: null },
    userId: { type: String, default: null },
    recentCourseId: { type: String, default: null },
    recentCommentId: { type: String, default: null },
    recentRateId: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=history.schema.js.map