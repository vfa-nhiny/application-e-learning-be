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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const users_service_1 = require("./users.service");
const response_dto_1 = require("../common/dto/response.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const logging_interceptor_1 = require("../common/interceptors/logging.interceptor");
const transform_interceptor_1 = require("../common/interceptors/transform.interceptor");
const passport_1 = require("../../node_modules/@nestjs/passport");
const settings_dto_1 = require("./dto/settings.dto");
const constants_1 = require("../auth/constants");
const update_user_dto_1 = require("./dto/update-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findById(body) {
        try {
            const user = await this.usersService.findByEmail(body.email);
            return new response_dto_1.ResponseSuccess("COMMON.SUCCESS", new user_dto_1.UserDto(user));
        }
        catch (error) {
            return new response_dto_1.ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
        }
    }
    async updateProfile(profileDto) {
        console.log(profileDto);
        try {
            const user = await this.usersService.updateProfile(profileDto);
            return new response_dto_1.ResponseSuccess("PROFILE.UPDATE_SUCCESS", new user_dto_1.UserDto(user));
        }
        catch (error) {
            return new response_dto_1.ResponseError("PROFILE.UPDATE_ERROR", error);
        }
    }
    async updateSettings(settingsDto) {
        try {
            const user = await this.usersService.updateSettings(settingsDto);
            return new response_dto_1.ResponseSuccess("SETTINGS.UPDATE_SUCCESS", new user_dto_1.UserDto(user));
        }
        catch (error) {
            return new response_dto_1.ResponseError("SETTINGS.UPDATE_ERROR", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("user"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)("profile/update"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)("settings/update"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_dto_1.SettingsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateSettings", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.UseInterceptors)(logging_interceptor_1.LoggingInterceptor, transform_interceptor_1.TransformInterceptor),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map