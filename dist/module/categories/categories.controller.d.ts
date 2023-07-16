import { IResponse } from "src/common/interfaces/response.interface";
import { CategoryServices } from "./categories.services";
export declare class CategoriesController {
    private readonly categoryServices;
    constructor(categoryServices: CategoryServices);
    getCategories(): Promise<IResponse>;
    createCategory(body: any): Promise<IResponse>;
    updateCategory(body: any): Promise<IResponse>;
    deleteCategory(body: any): Promise<IResponse>;
}
