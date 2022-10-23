import { SettingsDto } from './settings.dto';
import { PhotoDto } from '../../common/dto/photo.dto';

export class UserDto {
  constructor(object: any) {
    this.name = object.name;
    this.email = object.email;
    this.phone = object.phone;
    this.birthdayDate = object.birthdayDate;
    this.gender = object.gender;
    this.settings = new SettingsDto(object.settings);
    this.photos = {
      profilePic: new PhotoDto(object.photos.profilePic),
      gallery: [],
    };
    if (object.photos && object.photos.gallery) {
      object.photos.gallery.forEach((photo) => {
        this.photos.gallery.push(new PhotoDto(photo));
      });
    }
  }
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly birthdayDate: string;
  readonly gender: string;
  settings: SettingsDto;
  photos: {
    profilePic: PhotoDto;
    gallery: PhotoDto[];
  };
}
