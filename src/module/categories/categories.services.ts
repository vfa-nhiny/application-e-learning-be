import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./interfaces/category.interface";
import * as crypto from "crypto";

@Injectable()
export class CategoryServices {
  constructor(@InjectModel("Category") private readonly categoryModel: Model<Category>) {}

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const categoryDto = new this.categoryModel({ categoryId: crypto.randomUUID(), ...category });
    console.log(category);

    return await categoryDto.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async updateCategory(category: UpdateCategoryDto): Promise<Category> {
    const categoryFromDb = await this.categoryModel.findOne({ categoryId: category.categoryId });
    if (!categoryFromDb) {
      throw new HttpException("Cannot find category!", HttpStatus.NOT_FOUND);
    }
    if (categoryFromDb.title) categoryFromDb.title = category.title;
    if (categoryFromDb.imageUrl) categoryFromDb.imageUrl = category.imageUrl;
    if (categoryFromDb.color) categoryFromDb.color = category.color;

    return await categoryFromDb.save();
  }

  async deleteCategory(category: DeleteCategoryDto) {
    const categoryFromDb = await this.categoryModel.findOne({ categoryId: category.categoryId });
    if (!categoryFromDb) {
      throw new HttpException("Cannot find category!", HttpStatus.NOT_FOUND);
    }
    return await categoryFromDb.remove();
  }
}
