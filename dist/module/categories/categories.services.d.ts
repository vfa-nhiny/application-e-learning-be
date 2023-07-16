import { Model } from "mongoose";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { DeleteCategoryDto } from "./dto/delete-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./interfaces/category.interface";
export declare class CategoryServices {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    createCategory(category: CreateCategoryDto): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    updateCategory(category: UpdateCategoryDto): Promise<Category>;
    deleteCategory(category: DeleteCategoryDto): Promise<Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
