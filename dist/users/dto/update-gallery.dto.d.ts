import { CreatePhotoDto } from 'src/common/dto/create-photo.dto';
export declare class UpdateGalleryDto {
    readonly email: string;
    newPhoto: CreatePhotoDto;
    readonly photoId: string;
    readonly action: string;
}
