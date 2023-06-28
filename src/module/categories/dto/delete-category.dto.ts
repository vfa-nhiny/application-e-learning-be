export class DeleteCategoryDto {
  constructor(object: any) {
    this.categoryId = object.categoryId;
  }

  readonly categoryId: string;
}
