"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
    courseId: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    ratingScore: { type: Number, default: 0 },
    ratingNumber: { type: Number, default: 0 },
    image: { type: String, default: null },
    category: { type: [], default: null },
    price: { type: Number, default: null },
    sale: { type: Number, default: null },
    authorId: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=course.schema.js.map