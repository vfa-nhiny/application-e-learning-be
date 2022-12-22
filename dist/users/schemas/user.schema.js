"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    userId: String,
    date: { type: Date, default: Date.now },
    name: String,
    email: String,
    phone: String,
    password: String,
    avatar: String,
    birthday: String,
    role: String,
    gender: String,
    auth: {
        email: {
            valid: { type: Boolean, default: false },
        },
        facebook: {
            userid: String,
        },
        gmail: {
            userid: String,
        },
    },
    settings: {},
}, {
    timestamps: true,
});
//# sourceMappingURL=user.schema.js.map