"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentSchema = void 0;
const mongoose = require("mongoose");
exports.CommentSchema = new mongoose.Schema({
    lessonId: { type: String, default: null },
    comment: [
        {
            commentId: { type: String, default: null },
            userId: { type: String, default: null },
            clientId: { type: String, default: null },
            image: { type: String, default: null },
            content: { type: String, default: null },
            createdAt: { type: Date, default: Date.now() },
        },
    ],
}, {
    timestamps: true,
});
//# sourceMappingURL=comment.schema.js.map