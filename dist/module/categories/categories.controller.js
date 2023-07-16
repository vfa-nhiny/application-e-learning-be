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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const response_dto_1 = require("../../common/dto/response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const logging_interceptor_1 = require("../../common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("../../common/interceptors/transform.interceptor");
const constants_1 = require("../auth/constants");
const categories_services_1 = require("./categories.services");
const category_dto_1 = require("./dto/category.dto");
let CategoriesController = class CategoriesController {
    constructor(categoryServices) {
        this.categoryServices = categoryServices;
    }
    async getCategories() {
        try {
            const categories = await this.categoryServices.getAllCategories();
            return new response_dto_1.ResponseSuccess("Success", categories);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async createCategory(body) {
        try {
            const category = await this.categoryServices.createCategory(body);
            return new response_dto_1.ResponseSuccess("Success", new category_dto_1.CategoryDto(category));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async updateCategory(body) {
        try {
            const category = await this.categoryServices.updateCategory(body);
            return new response_dto_1.ResponseSuccess("Success", category);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async deleteCategory(body) {
        try {
            await this.categoryServices.deleteCategory(body);
            return new response_dto_1.ResponseSuccess("Delete category successfully!", null);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Get)("get"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)("update"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Post)("delete"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
CategoriesController = __decorate([
    (0, common_1.Controller)("categories"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor, transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [categories_services_1.CategoryServices])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map