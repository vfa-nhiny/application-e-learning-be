import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const UserSchema = new mongoose.Schema(
  {
    userId: String,
    date: { type: Date, default: Date.now },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    password: { type: String, default: null },
    avatar: { type: String, default: null },
    birthday: { type: String, default: null },
    role: { type: String, default: null },
    gender: { type: String, default: null },
    ratingNumber: { type: String, default: 0 },
    ratingScore: { type: String, default: 0 },
    isPremium: { type: Boolean, default: false },
    startUsingPremiumDate: { type: String, default: null },
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
  },
  {
    timestamps: true,
  },
);
