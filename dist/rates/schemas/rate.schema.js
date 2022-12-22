"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateSchema = void 0;
const mongoose = require("mongoose");
exports.RateSchema = new mongoose.Schema({
    rateId: String,
    userId: String,
    courseId: String,
    teacherId: String,
    score: Number,
    comment: { type: String, default: "" },
}, {
    timestamps: true,
});
//# sourceMappingURL=rate.schema.js.map