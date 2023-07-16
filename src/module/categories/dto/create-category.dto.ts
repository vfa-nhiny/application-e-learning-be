export class CreateCategoryDto {
  constructor(object: any) {
    this.categoryId = object.categoryId;
    this.title = object.title;
    this.imageUrl = object.imageUrl;
    this.color = object.color;
  }

  readonly categoryId?: string;
  readonly title: string;
  readonly imageUrl: string;
  readonly color: string;
}
