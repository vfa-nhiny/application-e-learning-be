"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestreamSchema = void 0;
const mongoose = require("mongoose");
exports.LivestreamSchema = new mongoose.Schema({
    userId: { type: String, default: null },
    userName: { type: String, default: null },
}, {
    timestamps: true,
});
//# sourceMappingURL=livestream.schema.js.map