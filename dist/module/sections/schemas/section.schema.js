"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionSchema = void 0;
const mongoose = require("mongoose");
exports.SectionSchema = new mongoose.Schema({
    sectionId: String,
    courseId: String,
    title: { type: String, default: null },
    order: { type: Number, default: null },
    lessons: { type: (Array), default: [] },
}, {
    timestamps: true,
});
//# sourceMappingURL=section.schema.js.map