"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const mongoose = require("mongoose");
exports.PaymentSchema = new mongoose.Schema({
    rateId: { type: String, default: null },
    userId: { type: String, default: null },
    courseId: { type: String, default: null },
    teacherId: { type: String, default: null },
    score: { type: Number, default: null },
    comment: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=payment.schema.js.map