import { Document } from "mongoose";
export interface Livestream extends Document {
    userId: string;
    userName: string;
}
