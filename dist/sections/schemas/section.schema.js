"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionSchema = void 0;
const mongoose = require("mongoose");
exports.SectionSchema = new mongoose.Schema({
    sectionId: String,
    courseId: String,
    title: String,
    order: Number,
    lessons: { type: (Array), default: [] },
}, {
    timestamps: true,
});
//# sourceMappingURL=section.schema.js.map