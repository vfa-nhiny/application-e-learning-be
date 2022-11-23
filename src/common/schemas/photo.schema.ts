import * as mongoose from "mongoose";

export const PhotoSchema = new mongoose.Schema({
  url: String,
  photo: String,
  tags: { type: Array<string>(), default: [] },
  date: { type: Date, default: Date.now },
});
