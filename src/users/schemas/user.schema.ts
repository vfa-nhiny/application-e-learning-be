import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  },
);
