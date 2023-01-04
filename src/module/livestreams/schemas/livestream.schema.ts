import * as mongoose from "mongoose";
// import { PhotoSchema } from 'common/schemas/photo.schema';

export const LivestreamSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },
    userName: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);
