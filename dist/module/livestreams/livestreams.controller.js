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
exports.LivestreamsController = void 0;
const common_1 = require("@nestjs/common");
const livestreams_service_1 = require("./livestreams.service");
const response_dto_1 = require("../../common/dto/response.dto");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const constants_1 = require("../auth/constants");
const livestream_dto_1 = require("./dto/livestream.dto");
let LivestreamsController = class LivestreamsController {
    constructor(livestreamsService) {
        this.livestreamsService = livestreamsService;
    }
    async createLivestream(body) {
        try {
            const livestream = await this.livestreamsService.createNewLivestream(body.email);
            return new response_dto_1.ResponseSuccess("Success", new livestream_dto_1.LivestreamDto(livestream));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async getLivestream(body) {
        try {
            const livestream = await this.livestreamsService.findByLivestreamId(body.userId);
            return new response_dto_1.ResponseSuccess("Success", new livestream_dto_1.LivestreamDto(livestream));
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
    async deleteCourse(body) {
        try {
            const livestream = await this.livestreamsService.deleteLivestream(body.userId);
            return new response_dto_1.ResponseSuccess("Course deleted successfully", null);
        }
        catch (error) {
            return new response_dto_1.ResponseError("Error: generic error", error);
        }
    }
};
__decorate([
    (0, common_1.Post)("create"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LivestreamsController.prototype, "createLivestream", null);
__decorate([
    (0, common_1.Post)("get"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.student, constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LivestreamsController.prototype, "getLivestream", null);
__decorate([
    (0, common_1.Post)("delete"),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(constants_1.role.teacher),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LivestreamsController.prototype, "deleteCourse", null);
LivestreamsController = __decorate([
    (0, common_1.Controller)("livestreams"),
    __metadata("design:paramtypes", [livestreams_service_1.LivestreamsService])
], LivestreamsController);
exports.LivestreamsController = LivestreamsController;
//# sourceMappingURL=livestreams.controller.js.map