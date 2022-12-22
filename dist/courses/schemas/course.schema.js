"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
const mongoose = require("mongoose");
exports.CourseSchema = new mongoose.Schema({
    courseId: String,
    title: String,
    description: String,
    ratingScore: Number,
    ratingNumber: Number,
    image: String,
    category: [],
    price: Number,
    sale: Number,
    authorId: String,
}, {
    timestamps: true,
});
//# sourceMappingURL=course.schema.js.map