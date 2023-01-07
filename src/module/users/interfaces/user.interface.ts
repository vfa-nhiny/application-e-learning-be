import { Document } from "mongoose";

export interface User extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  password: string;
  role: string;
  gender: string;
  auth: {
    email: {
      valid: boolean;
    };
    facebook: {
      userid: string;
    };
    gmail: {
      userid: string;
    };
  };
  settings: {
    //TODO: add setting
  };
  ratingNumber: number;
  ratingScore: number;
  avatar: string;
  isPremium: boolean;
  startUsingPremiumDate: string;
  courseJoined: string[];
}
