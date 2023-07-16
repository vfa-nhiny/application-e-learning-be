"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto = require("crypto");
let CategoryServices = class CategoryServices {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async createCategory(category) {
        const categoryDto = new this.categoryModel(Object.assign({ categoryId: crypto.randomUUID() }, category));
        console.log(category);
        return await categoryDto.save();
    }
    async getAllCategories() {
        return await this.categoryModel.find().exec();
    }
    async updateCategory(category) {
        const categoryFromDb = await this.categoryModel.findOne({ categoryId: category.categoryId });
        if (!categoryFromDb) {
            throw new common_1.HttpException("Cannot find category!", common_1.HttpStatus.NOT_FOUND);
        }
        if (categoryFromDb.title)
            categoryFromDb.title = category.title;
        if (categoryFromDb.imageUrl)
            categoryFromDb.imageUrl = category.imageUrl;
        if (categoryFromDb.color)
            categoryFromDb.color = category.color;
        return await categoryFromDb.save();
    }
    async deleteCategory(category) {
        const categoryFromDb = await this.categoryModel.findOne({ categoryId: category.categoryId });
        if (!categoryFromDb) {
            throw new common_1.HttpException("Cannot find category!", common_1.HttpStatus.NOT_FOUND);
        }
        return await categoryFromDb.remove();
    }
};
CategoryServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Category")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryServices);
exports.CategoryServices = CategoryServices;
//# sourceMappingURL=categories.services.js.map