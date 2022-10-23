import { Document } from 'mongoose';
import { Photo } from 'src/common/interfaces/photo.interface';

export interface User extends Document {
  name: string;
  email: string;
  phone: string;
  birthdayDate: string;
  password: string;
  roles: string[];
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
  settings: {};
  photos: {
    profilePic: Photo;
    gallery: Photo[];
  };
}
