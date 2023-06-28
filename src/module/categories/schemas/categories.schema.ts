import * as mongoose from "mongoose";

export const CategorySchema = new mongoose.Schema(
  {
    categoryId: { type: String, default: null },
    title: { type: String, default: null },
    imageUrl: { type: String, default: null },
    color: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
