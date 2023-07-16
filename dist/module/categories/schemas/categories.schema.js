"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    categoryId: { type: String, default: null },
    title: { type: String, default: null },
    imageUrl: { type: String, default: null },
    color: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=categories.schema.js.map